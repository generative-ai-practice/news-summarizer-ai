# ニュースソースのデータ取得方法

各プロバイダー（OpenAI、Anthropic、Gemini）のニュースソースがどのようにデータを取得・整形しているかをまとめたドキュメント。

## 概要

本プロジェクトでは、3つのAIプロバイダーからニュース・更新情報を収集している。各ソースに応じて RSS、HTML スクレイピング、Markdown 直接取得など、最適な方法を使い分けている。

すべてのソースで共通して **Gemini API (gemini-2.5-flash)** を使用し、日本語での要約生成を行っている。

---

## プロバイダー別データ取得方法

### OpenAI（3ソース）

| ソース | 取得方法 | パース方法 | LLM使用 |
|--------|----------|------------|---------|
| **News** | RSS (`openai.com/news/rss.xml`) | Cheerio (XML) | 要約生成 |
| **Changelog** | HTML スクレイピング (`platform.openai.com/docs/changelog`) | Cheerio (DOM) + 正規表現 | 要約生成 |
| **Deprecations** | HTML スクレイピング | Cheerio (DOM) | 要約生成 |

### Anthropic（3ソース）

| ソース | 取得方法 | パース方法 | LLM使用 |
|--------|----------|------------|---------|
| **News** | HTML スクレイピング (`anthropic.com/news`) | **Gemini API でJSON抽出** → フォールバック: Cheerio DOM | リスト抽出 + 要約生成 |
| **Release Notes** | Markdown (`platform.claude.com/.../overview.md`) | markdown-it (トークン化) | 要約生成 |
| **Model Deprecations** | Markdown (`platform.claude.com/.../model-deprecations.md`) | 正規表現 (`^###\s*(.+)$`) | 要約生成 |

### Gemini（2ソース）

| ソース | 取得方法 | パース方法 | LLM使用 |
|--------|----------|------------|---------|
| **News** | RSS (`blog.google/products/gemini/rss/`) | Cheerio (XML) | 要約生成 |
| **Changelog** | Markdown (`ai.google.dev/.../changelog.md.txt`) | 正規表現 + Markdownパース | 要約生成 |

---

## 使用技術まとめ

| 技術 | 用途 |
|------|------|
| **RSS** | OpenAI News, Gemini News |
| **HTML スクレイピング** | Anthropic News, OpenAI Changelog/Deprecations |
| **Markdown 直接取得** | Anthropic Release Notes/Deprecations, Gemini Changelog |
| **Cheerio** | HTML/XML パース（全プロバイダー共通） |
| **markdown-it** | Markdown トークン化（Anthropic Release Notes） |
| **正規表現** | 日付抽出、URL抽出、メタデータ抽出 |
| **Gemini API (gemini-2.5-flash)** | リスト抽出（Anthropicのみ）、全ソースの日本語要約生成 |

---

## 特徴的なポイント

### 1. Anthropic News だけが LLM でリスト抽出
Anthropic の News ページには RSS フィードが存在しないため、HTML から記事一覧を Gemini API で JSON 形式で抽出している。抽出失敗時は Cheerio による DOM パースにフォールバックする。

### 2. RSS vs HTML vs Markdown
- **RSS**: OpenAI/Gemini のニュースは RSS で取得（構造化されている）
- **HTML スクレイピング**: Anthropic のニュースは RSS がないため HTML スクレイピング
- **Markdown 直接取得**: Changelog/Release Notes は公式が Markdown を公開しているケースが多い

### 3. 全ソース共通で Gemini API による日本語要約
最終的な記事要約はすべて `gemini-2.5-flash` で生成。出力は日本語 Markdown 形式。

### 4. フォールバック戦略
Anthropic News では Gemini API での抽出が失敗した場合、Cheerio DOM パースへ自動フォールバックする堅牢な設計になっている。

---

## 関連ファイル

### Provider Fetchers
```
scripts/lib/provider-fetchers/
├── base-provider.ts                    # 抽象基底クラス
├── news-provider.ts                    # Anthropic News (HTML + Gemini)
├── openai-news-provider.ts             # OpenAI News (RSS + Gemini)
├── gemini-news-provider.ts             # Gemini News (RSS + Gemini)
├── release-notes-provider.ts           # Anthropic Release Notes (Markdown)
├── openai-changelog-provider.ts        # OpenAI Changelog (HTML)
├── gemini-changelog-provider.ts        # Gemini Changelog (Markdown)
├── deprecations-provider.ts            # Anthropic Deprecations (Markdown)
└── openai-deprecations-provider.ts     # OpenAI Deprecations (HTML)
```

### 共通ライブラリ
```
scripts/lib/
├── gemini-extractor.ts                 # Gemini LLM 統合（抽出・要約）
├── rate-limiter.ts                     # レート制限・リトライ管理
└── storage.ts                          # ファイル I/O ユーティリティ
```

---

## 比較表

| 項目 | OpenAI | Anthropic | Gemini |
|------|--------|-----------|--------|
| **ニュース取得方法** | RSS | HTML スクレイピング | RSS |
| **HTML パース** | Cheerio XML | Cheerio DOM + Gemini API | Cheerio XML |
| **Changelog 取得** | HTML | Markdown | Markdown |
| **Changelog パース** | Cheerio + 正規表現 | markdown-it | 正規表現 + Markdown パース |
| **Deprecations** | HTML | Markdown | なし |
| **LLM 使用箇所** | 要約生成 | リスト抽出・要約生成 | 要約生成 |
| **LLM モデル** | Gemini 2.5 Flash | Gemini 2.5 Flash | Gemini 2.5 Flash |
| **日本語化** | YES | YES | YES |
