---
title: "2026-09-29 changelog"
published: "2026-09-29"
collected_at: "2026-09-29T21:48:11.804Z"
url: "https://platform.openai.com/docs/changelog#2026-09-29"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026-09-29 変更履歴

- Agents API に [computer use](https://platform.openai.com/api/docs/guides/agents-api/tools/computer-use) を追加しました。エージェントは、OpenAIがホストするブラウザでタスクを完了できます。ウェブサイトへのアクセス承認とサインインはアプリケーションによって処理されます。
- 複雑なコーディングとプロフェッショナルな作業向けに、GPT-6 Astraよりも低コストの [GPT-6.1 Sol](https://platform.openai.com/api/docs/models/gpt-6.1-sol) (`gpt-6.1-sol`) をリリースしました。
- 最大272K入力トークンを持つプロンプトの場合、100万トークンあたりの標準料金は、入力$2、キャッシュ済み入力$0.10、キャッシュ書き込み$2.50、出力$10です。
- GPT-6.1 Sol は、ベータ版で [Multi-agent](https://platform.openai.com/api/docs/guides/responses-multi-agent) もサポートしています。Responses API リクエストで、モデルがサブエージェントに作業を委任できるようにします。
- ツール呼び出しには Responses API を使用してください。推論設定については [GPT-6 モデルガイダンス](https://platform.openai.com/api/docs/guides/latest-model?model=gpt-6-astra#gpt-61-sol) を、利用可能な処理層については [料金](https://platform.openai.com/api/docs/pricing) を参照してください。
- Responses API の GPT-6 Astra に [Ultrafast mode](https://platform.openai.com/api/docs/guides/ultrafast-mode) を追加しました。`gpt-6-astra` を `service_tier: "ultrafast"` とともに使用して、生成される出力トークン間の時間を短縮します。これは、API顧客がレート制限に従い、グローバル処理と米国内のデータ常駐で利用可能です。EU およびその他の地域での推論常駐はサポートされていません。[Ultrafast 料金](https://platform.openai.com/api/docs/pricing?latest-pricing=ultrafast) を参照してください。