---
title: "2026-05-28 changelog"
published: "2026-05-28"
collected_at: "2026-05-28T21:08:56.802Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-05-28"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026年5月28日 変更履歴

- `gemini-3.1-flash-image` (Nano Banana 2) と `gemini-3-pro-image` をリリースしました
- (Nano Banana Pro) は、当社のネイティブ
- 視覚モデルである [Gemini 3.1 Flash Image](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image)
- および [Gemini 3.1 Pro Image](https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image) の一般提供版（GA）バージョンです。
- **動画から画像への生成のサポート**: 動画ファイル（
  直接アップロードまたは公開YouTube URL経由）をテキストプロンプトとともにマルチモーダルコンテキストとして渡せるようになりました。
  これにより、高品質のサムネイル、映画のポスター、または要約インフォグラフィックを生成できます。この機能は
  `gemini-3.1-flash-image` モデルでのみサポートされています。詳細については、
  [動画から画像への生成](https://ai.google.dev/gemini-api/docs/image-generation#video-to-image)
  ガイドを参照してください。
- 非推奨のお知らせ: `gemini-3.1-flash-image-preview` および
  `gemini-3-pro-image-preview` モデルは非推奨となり、
  2026年6月25日に[シャットダウンされます](https://ai.google.dev/gemini-api/docs/deprecations)。