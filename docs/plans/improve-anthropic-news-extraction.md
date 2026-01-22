# Anthropic News のデータ取得方法改善計画

## 概要

Anthropic News ページからの記事リスト抽出を、現在の LLM (Gemini API) 依存から、Cheerio による直接 DOM パースに変更する。

## 現状の問題

1. **LLM 依存による非決定性**: 同じ HTML でも異なる出力が生成される（例: "well-being" vs "wellbeing"）
2. **不要なコスト**: 構造化されたテーブルデータに対して LLM を使用する必要がない
3. **レイテンシ**: API 呼び出しによる遅延

## 発見した事実

**重要: 当初の仮説（テーブル構造）は誤りでした。**

Anthropic News ページは **Next.js でレンダリングされたリンクリスト構造** を使用している:

```html
<!-- Featured articles -->
<a href="/news/claude-opus-4-5" class="...">
  <h2 class="...">Introducing Claude Opus 4.5</h2>
  <div class="...">
    <span class="...">Announcements</span>
    <time class="...">Nov 24, 2025</time>
  </div>
</a>

<!-- List articles -->
<a href="/news/claude-new-constitution" class="...">
  <time class="...">Jan 22, 2026</time>
  <span class="...">Announcements</span>
  <h3 class="...">Claude's new constitution</h3>
</a>
```

### 制約事項

1. **初期表示のみ取得可能**: "See more"ボタンで動的に読み込まれる記事は取得できない（JavaScript実行が必要）
2. **取得件数**: 初期HTMLには約13件のnews記事リンクのみ含まれる

## 変更内容

### 対象ファイル

- [news-provider.ts](../../scripts/lib/provider-fetchers/news-provider.ts)

### 変更点

#### 1. `fetchRawData()` メソッドの修正（45-85行目）

**Before:**
```typescript
async fetchRawData(): Promise<void> {
  // ...
  try {
    const extracted = await this.geminiExtractor.extractArticleList(html, "news");
    // ...
  } catch (error) {
    log("[news] Gemini extract failed, falling back to DOM parse", error);
    parsed = this.extractNewsFromHtml(html);
  }
}
```

**After:**
```typescript
async fetchRawData(): Promise<void> {
  // ...
  // LLM を使わず、直接 DOM パースを使用
  parsed = this.extractNewsFromHtml(html);
  // ...
}
```

#### 2. `extractNewsFromHtml()` メソッドの改善（159-217行目）

リンク構造から TITLE と DATE を直接抽出するロジックに改善:

```typescript
private extractNewsFromHtml(html: string): Article[] {
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  const results: Article[] = [];

  // newsリンクから抽出
  $("a[href*='/news/']").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    const url = this.normalizeUrl(href);
    if (!url || seen.has(url)) return;

    // 見出しタグからタイトルを抽出
    let title = $(el).find("h1, h2, h3, h4, h5, h6").first().text().trim();

    // 見出しがない場合は、テキストから日付とカテゴリを除外
    if (!title) {
      const fullText = $(el).text().trim();
      title = fullText
        .replace(/[A-Za-z]{3}\s+\d{1,2},\s*\d{4}/g, "") // 日付を削除
        .replace(/^(Announcements|Product|Policy|Case Study|Research)\s*/i, "") // カテゴリを削除
        .trim()
        .replace(/\s+/g, " ");
    }

    if (!title) return;

    // リンク内のtimeタグから日付を取得
    const timeElement = $(el).find("time").first();
    const dateText = timeElement.attr("datetime")?.trim() ?? timeElement.text().trim() ?? "";
    const publishedDate = this.normalizeDate(dateText) ?? "";

    results.push({
      title,
      url,
      publishedDate,
      source: "news",
      slug: "",
      language: "en",
      summaryLanguage: "ja",
    });
    seen.add(url);
  });

  // フォールバック: 正規表現でURLを抽出
  if (results.length === 0) {
    // 既存のロジックを維持
  }

  return results;
}
```

#### 3. `normalizeDate()` メソッドの拡張

短縮形の月名（Jan, Feb, Mar等）をサポート:

```typescript
const monthIndex: Record<string, string> = {
  january: "01", jan: "01",
  february: "02", feb: "02",
  // ... 他の月も同様
};
```

## 検証方法

1. **ユニットテスト**: テーブル HTML をモックしてパース結果を確認
2. **統合テスト**: 実際の Anthropic News ページを取得してパースを確認
3. **差分確認**: 既存の `latest-articles.json` との比較

```bash
# dry-run で実行して結果を確認
npx ts-node scripts/update-anthropic-news.ts --dry-run
```

## メリット

- ✅ LLM API 呼び出しが不要（コスト削減）
- ✅ 決定的な出力（同じ HTML = 同じ結果）
- ✅ 高速化（API レイテンシなし）
- ✅ 既存のフォールバックロジックは維持

## リスクと制約

- ⚠️ Anthropic がページ構造を変更した場合、パースが失敗する可能性
  - → 既存のフォールバックロジック（正規表現ベース）で対応可能
- ⚠️ "See more"ボタンの後ろにある記事は取得できない
  - 初期HTMLには約13件のみ含まれる
  - 動的に読み込まれる記事を取得するにはPlaywright等のブラウザ自動化が必要
  - → 現状: 定期実行により新しい記事は徐々に検出される想定

## 実装結果（2026-01-22）

### ✅ 実装完了

1. **LLM依存の除去**: Gemini API呼び出しを削除し、直接DOMパースを使用
2. **タイトル抽出の改善**: 見出しタグから正確にタイトルを抽出
3. **日付正規化の拡張**: 短縮形の月名に対応

### 📊 テスト結果

```bash
npm run fetch:providers:dry-run -- --provider=anthropic
```

- **取得記事数**: 13件（初期HTML内）
- **日付フィルタ後**: 9件（2025-11-01以降）
- **タイトル抽出**: ✅ 正常（例: "Introducing Claude Opus 4.5"）
- **日付正規化**: ✅ 正常（"Jan 22, 2026" → "2026-01-22"）
- **新規記事検出**: ✅ 正常（1件検出）

### ⚠️ 既知の制約

1. **取得可能記事数の制限**
   - 初期HTMLから取得: 約13件
   - "See more"後の記事: 取得不可（JavaScriptが必要）
   - 定期実行により新しい記事は徐々にカバーされる

2. **構造の前提**
   - 当初想定していたテーブル構造は存在しない
   - Next.jsでレンダリングされたリンクリスト構造を使用
   - 見出しタグ（h1-h6）がタイトルに使用されている
