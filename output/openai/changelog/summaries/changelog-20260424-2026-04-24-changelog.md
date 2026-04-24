---
title: "2026-04-24 changelog"
published: "2026-04-24"
collected_at: "2026-04-24T21:42:06.328Z"
url: "https://platform.openai.com/docs/changelog#2026-04-24"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026-04-24 変更履歴

- 複雑な専門作業のための新しいフロンティアモデルである[GPT-5.5](https://platform.openai.com/api/docs/models/gpt-5.5)をチャット補完および応答APIにリリースし、より多くの計算資源から恩恵を受ける困難な問題に対する応答APIリクエスト向けに[GPT-5.5 pro](https://platform.openai.com/api/docs/models/gpt-5.5-pro)をリリースしました。
- GPT-5.5は、1Mトークンのコンテキストウィンドウ、画像入力、構造化出力、関数呼び出し、プロンプトキャッシュ、バッチ、ツール検索、組み込みコンピュータの使用、ホスト型シェル、パッチ適用、スキル、MCP、およびウェブ検索をサポートします。主な更新点は以下の通りです。
- 推論の労力は、現在デフォルトで`medium`になりました。
- `image_detail`が未設定または`auto`に設定されている場合、モデルは現在[元の動作](https://developers.openai.com/api/docs/guides/latest-model#behavioral-changes)を使用します。
- GPT-5.5のキャッシュは、拡張プロンプトキャッシュでのみ機能します。インメモリプロンプトキャッシュはサポートされていません。[詳細はこちら](https://developers.openai.com/api/docs/guides/latest-model#behavioral-changes)をご覧ください。