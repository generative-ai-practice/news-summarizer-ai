# Claude ニュース取得の不安定な挙動の修正

## 問題の概要

PRで確認された問題:
1. **PR #169**: 記事の`publishedDate`とslugだけが変わっている（記事内容は同じ）
2. **PR #172**: titleの「well-being」→「wellbeing」変動でslugも変更
3. 全記事のメタデータが毎回変更されてしまう

## 根本原因（コード確認済み）

### 処理フロー
1. `fetchRawData()` (45-85行): Gemini APIで全記事リストを取得
2. `applySlugNormalization()` (371-390行): **全記事のslugを再生成**
3. `processData()` (87-136行):
   - 前回のJSONを読み込み（94行）
   - URLベースで新規記事を判定（96-99行）
   - **122行で`this.currentNews`全体を保存** ← 問題箇所

### 問題のコード（processData() 119-130行）
```typescript
const latestNewsData: ArticleList = {
  provider: this.provider,
  lastChecked: generateTimestamp(),
  articles: this.currentNews,  // ← 全記事が上書きされる
};
await saveJSON(..., latestNewsData);
```

### なぜメタデータが変わるのか
1. **Gemini APIの非決定性**: 同じHTMLでも「well-being」vs「wellbeing」等の揺れ
2. **slug再生成**: `applySlugNormalization()`で毎回全記事のslugを再計算
3. **全記事上書き**: 新規記事だけでなく既存記事も新しいメタデータで上書き

## 修正方針

**既存記事は前回のメタデータをそのまま使い、新規記事のみ新しいデータを使用する**

## 修正対象ファイル

[news-provider.ts](scripts/lib/provider-fetchers/news-provider.ts)

## 詳細な修正内容

### processData() の修正（87-136行付近）

```typescript
async processData(): Promise<void> {
  const startedAt = Date.now();
  const latestNews =
    (await loadJSON<ArticleList>(
      buildOutputPath(this.provider, "articles", "latest-articles.json"),
    )) ?? undefined;

  this.previousNews = latestNews?.articles ?? [];

  // 前回の記事をURLでマップ化
  const previousNewsMap = new Map(
    this.previousNews.map((a) => [a.url, a])
  );

  // 新規記事のみ抽出
  this.newArticles = this.currentNews.filter(
    (article) => !previousNewsMap.has(article.url),
  );
  log(`[news] new articles: ${this.newArticles.length}`);

  // ★ 既存記事はメタデータ（title, publishedDate, slug）のみ前回値を保持
  // それ以外のフィールドは新しい値を使用（本文更新等に対応）
  this.currentNews = this.currentNews.map((article) => {
    const previousArticle = previousNewsMap.get(article.url);
    if (previousArticle) {
      // 既存記事: メタデータのみ前回値で上書き
      return {
        ...article,  // 新しいデータをベースに
        title: previousArticle.title,
        publishedDate: previousArticle.publishedDate,
        slug: previousArticle.slug,
      };
    }
    return article; // 新規記事はそのまま
  });

  // 以降は既存のまま...
}
```

### ポイント
- `previousNewsMap.get(article.url)`で既存記事を検索
- 既存記事の場合は`previousArticle`をそのまま返す（メタデータ保持）
- 新規記事の場合のみ新しいデータを使用

## 追加修正: slugをURLベースに変更

### 問題
現在のslug生成はtitleに依存しているため、Geminiの出力揺れ（「well-being」vs「wellbeing」）でslugが変わってしまう。

### 修正方針
**URLの末尾 + 日付からslugを生成する**

例：
```
URL: https://www.anthropic.com/news/claude-for-nonprofits
日付: 2025-12-02
↓
slug: 20251202-claude-for-nonprofits
```

### storage.ts の generateSlug() 修正

```typescript
export const generateSlugFromUrl = (url: string, publishedDate?: string): string => {
  const datePrefix = formatDatePrefix(publishedDate);

  // URLからパス部分を抽出（クエリ・フラグメント除去）
  let urlPath = url;
  try {
    const parsed = new URL(url);
    urlPath = parsed.pathname;
  } catch {
    // URL解析失敗時はそのまま使用
  }

  // 末尾スラッシュを除去してから最後のセグメントを取得
  const segments = urlPath.replace(/\/+$/, "").split("/");
  const lastSegment = segments.pop() ?? "";

  // 正規化
  const normalized = lastSegment
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  // 空の場合はURLのハッシュを使用（衝突回避）
  if (!normalized) {
    const hash = url.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
    return `${datePrefix}article-${Math.abs(hash).toString(36)}`;
  }

  return `${datePrefix}${normalized}`;
};
```

### 補足
- `new URL()` でクエリ(`?ref=...`)やフラグメント(`#section`)を除去
- 末尾スラッシュ(`/news/foo/`)を除去してから最後のセグメントを取得
- 空文字の場合はURLのハッシュ値を使用して衝突を回避

### 呼び出し側の修正

news-provider.ts の呼び出しを `generateSlug(article.title, ...)` から `generateSlug(article.url, ...)` に変更

## 追加修正: 日付取得の安定化

### 問題
Anthropicのニュースページでは日付が `Dec 2, 2025` 形式で表示されているが、`refinePublishedDateFromHtml()` が複数のソース（meta, JSON-LD, time タグ等）から日付候補を収集し「最新の日付」を選ぶため、不安定になっている。

### 修正方針
**ページに表示されている `Dec 2, 2025` 形式の日付を優先的に使用する**

### refinePublishedDateFromHtml() の修正

```typescript
private refinePublishedDateFromHtml(html: string): string | null {
  const $ = cheerio.load(html);

  // 1. まず time タグの datetime 属性を確認
  const timeAttr = $("time[datetime]").first().attr("datetime");
  if (timeAttr) {
    const normalized = this.normalizeDate(timeAttr);
    if (normalized) return normalized;
  }

  // 2. time タグのテキスト内容 (例: "Dec 2, 2025")
  const timeText = $("time").first().text().trim();
  if (timeText) {
    const normalized = this.normalizeDate(timeText);
    if (normalized) return normalized;
  }

  // 3. meta タグ (フォールバック)
  const metaSelectors = [
    'meta[property="article:published_time"]',
    'meta[name="pubdate"]',
  ];
  for (const sel of metaSelectors) {
    const content = $(sel).attr("content");
    if (content) {
      const normalized = this.normalizeDate(content);
      if (normalized) return normalized;
    }
  }

  return null;
}
```

### ポイント
- 「最新の日付を選ぶ」ロジックを削除
- 優先順位を明確に: time[datetime] → time テキスト → meta タグ
- `Dec 2, 2025` 形式は既存の `normalizeDate()` でパース可能

## 検証方法

1. ローカルでスクリプトを実行
   ```bash
   npx ts-node scripts/fetch-news.ts claude
   ```

2. 既存記事のメタデータが変更されていないことを確認
   ```bash
   git diff data/claude/
   ```

3. 変更があるのは以下のみであることを確認:
   - `lastChecked`タイムスタンプ
   - 新規記事（もしあれば）

## 期待される結果

- 既存記事のtitle, publishedDate, slugは変更されない
- 新規記事のみが追加される
- 無駄なPR差分が発生しなくなる
