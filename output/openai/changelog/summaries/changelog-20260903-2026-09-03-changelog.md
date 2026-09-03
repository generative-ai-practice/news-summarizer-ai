---
title: "2026-09-03 changelog"
published: "2026-09-03"
collected_at: "2026-09-03T22:55:49.002Z"
url: "https://platform.openai.com/docs/changelog#2026-09-03"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026-09-03 changelog

- [GPT-6 Astra](https://platform.openai.com/api/docs/models/gpt-6-astra)をリリースしました。これは、最も困難なエンドツーエンドの作業のために構築された、当社の最も高性能なモデルです。
- GPT-6 Astraは、推論、コーディング、コンピュータ利用、研究、ドキュメント作成に活用できます。これらの機能を組み合わせて、最初の要求から最終的な結果まで複雑なタスクを実行し、提供されたコンテキストとツールを利用します。
- 移行時に考慮すべき主な変更点：
- 機能、プロンプト、移行のガイダンスについては、まず[GPT-6 Astraの使用](https://platform.openai.com/api/docs/guides/latest-model)から始めてください。ブラウザおよびデスクトップのワークフローについては[コンピュータ利用](https://platform.openai.com/api/docs/guides/tools-computer-use)を、利用可能な推論ティアについては[料金](https://platform.openai.com/api/docs/pricing)をご覧ください。
- GPT-6 Astraは、`none`の推論努力レベルをサポートしていません。
- GPT-6 Astraは、カスタムの`temperature`または`top_p`値、およびログ確率（`logprobs`）をサポートしていません。
- ツール呼び出しにはResponses APIが必要です。Chat Completionsでツールを使用している場合は、[Responses移行ガイド](https://platform.openai.com/api/docs/guides/migrate-to-responses)に従ってください。
- [ミスマッチ監視](https://platform.openai.com/api/docs/guides/safety-checks/misalignment-monitoring)は、サポートされているResponses APIリクエストでのエージェント作業中に潜在的な問題を非同期でチェックします。チェックにより、安全アラートがトリガーされたり、会話がレビューのために停止されたりする場合があります。
- Responses APIにおけるGPT-6 Astraとの長時間実行作業のための新しいコントロールを追加しました：
- [非同期ツール呼び出し](https://platform.openai.com/api/docs/guides/async-tool-calling)：アプリケーションが関数またはカスタムツールを実行している間もモデルが作業を継続できるようにし、結果が利用可能になり次第返します。
- [応答中の指示（Mid-turn steering）](https://platform.openai.com/api/docs/guides/steering)：応答が進行中にWebSocketを介して追加の指示を送信し、モデルが修正や変更された要件を組み込めるようにします。
- [会話中の推論努力の変更](https://platform.openai.com/api/docs/guides/reasoning#change-reasoning-mid-conversation)：困難な作業では努力を増やし、ルーチン的なフォローアップでは努力を減らし、キャッシュされたプロンプトプレフィックスを保持します。