---
title: "2026-09-08 changelog"
published: "2026-09-08"
collected_at: "2026-09-08T23:08:02.089Z"
url: "https://platform.openai.com/docs/changelog#2026-09-08"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026-09-08 変更履歴

- [プロンプトキャッシュ診断](https://platform.openai.com/api/docs/guides/prompt-caching/diagnostics)が、GPT-5.6以降のサポート対象モデル向けにResponses APIで一般提供されました。
- 以前の応答に対するキャッシュの再利用を比較し、キャッシュミスの原因を特定し、キャッシュの再利用を改善するためのトラブルシューティングガイダンスに従ってください。
- Image APIおよびResponses APIの画像生成ツールを介した画像生成と編集のために、[GPT Image 2.5 Sunburst](https://platform.openai.com/api/docs/models/gpt-image-2.5-sunburst)と[GPT Image 2.5 Flare](https://platform.openai.com/api/docs/models/gpt-image-2.5-flare)をリリースしました。
- 編集の精度が最も重要なワークフローにはSunburstを、高速で高品質な日常の画像生成にはFlareを使用してください。両モデルは新しい`xhigh`および`max`品質設定をサポートしており、GPT Image 2のトークンレートを使用します。[画像生成ガイド](https://platform.openai.com/api/docs/guides/image-generation)と[料金](https://platform.openai.com/api/docs/pricing#image-generation)を参照してください。