# Anthropic News のデータ取得方法改善計画

## 概要

Anthropic News ページからの記事リスト抽出を、現在の LLM (Gemini API) 依存から、Cheerio による直接 DOM パースに変更する。

## 現状の問題

1. **LLM 依存による非決定性**: 同じ HTML でも異なる出力が生成される（例: "well-being" vs "wellbeing"）
2. **不要なコスト**: 構造化されたテーブルデータに対して LLM を使用する必要がない
3. **レイテンシ**: API 呼び出しによる遅延

## 発見した事実

Anthropic News ページは **`<table>` 構造** を使用している:

```html
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Category</th>
      <th>Title</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jan 22, 2026</td>
      <td>Announcements</td>
      <td><a href="/news/claude-new-constitution">Claude's new constitution</a></td>
    </tr>
    ...
  </tbody>
</table>
```

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

テーブル構造から DATE、CATEGORY、TITLE を直接抽出するロジックを追加:

```typescript
private extractNewsFromHtml(html: string): Article[] {
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  const results: Article[] = [];

  // 新しい: テーブル構造からの抽出（Primary）
  $("table tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 3) return;

    const dateText = $(cells[0]).text().trim();       // DATE
    const category = $(cells[1]).text().trim();       // CATEGORY (将来の拡張用)
    const titleCell = $(cells[2]);
    const link = titleCell.find("a");
    const title = link.text().trim() || titleCell.text().trim();
    const href = link.attr("href") ?? "";
    const url = this.normalizeUrl(href);

    if (!url || seen.has(url)) return;
    if (!title) return;

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

  // 既存のフォールバック: リンクベースの抽出
  if (results.length === 0) {
    // 既存のロジックを維持
  }

  return results;
}
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

## リスク

- ⚠️ Anthropic がページ構造を変更した場合、パースが失敗する可能性
  - → 既存のフォールバックロジックで対応可能
