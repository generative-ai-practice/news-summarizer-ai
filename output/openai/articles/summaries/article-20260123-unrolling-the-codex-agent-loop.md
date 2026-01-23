---
title: "Unrolling the Codex agent loop"
published: "2026-01-23"
collected_at: "2026-01-23T21:16:30.496Z"
url: "https://openai.com/index/unrolling-the-codex-agent-loop"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Unrolling the Codex agent loop

## Key Points
- Codex CLIは、ユーザー、モデル、ツール間の相互作用を調整する「エージェントループ」を核とするクロスプラットフォームのローカルソフトウェアエージェントです。
- エージェントループは、ユーザーからの入力、モデル推論、ツール呼び出しを繰り返し、最終的にアシスタントメッセージでユーザーに結果を返します。
- モデル推論はResponses APIを通じて行われ、`instructions`、`tools`、`input`などのJSONペイロードパラメータからプロンプトが構築されます。
- 会話が続くとプロンプトの長さが増大するため、パフォーマンス向上のためにプロンプトキャッシングが活用され、文脈ウィンドウの限界を超える場合は「コンパクション」によって会話が効率的に要約されます。
- キャッシュミスを防ぐため、ツールや環境設定の変更は、既存のプロンプトを修正するのではなく、会話に新しいメッセージとして追加されるよう設計されています。