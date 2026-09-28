---
title: "2026-09-28 release notes"
published: "2026-09-28"
collected_at: "2026-09-28T18:19:45.120Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-28-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年9月28日 リリースノート

- Claude Sonnet 5.5 (`claude-sonnet-5-5`) をリリースしました。Claude API、[Amazon Bedrock の Claude](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock)、[AWS 上の Claude Platform](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws)、[Google Cloud の Claude](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai)、および[Microsoft Foundry の Claude](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry) で利用可能です。コンテキストウィンドウ、出力制限、価格については、[Claude Sonnet 5.5 モデルページ](https://platform.claude.com/docs/en/models/sonnet-5-5/overview)をご覧ください。
- Claude Sonnet 5 向けに書かれたコードは、Claude Sonnet 5.5 で5つの方法で動作しなくなる可能性があります。事前思考をオフにするには、`"disabled"` の代わりに `thinking: {"type": "between_tools"}` を `high` の労力以下で送信してください。強制ツール使用 (`tool_choice` タイプ `any` と `tool`) は 400 エラーを返します。思考ブロックはモデルと会話に紐付けられます。Claude API および Google Cloud では、以前の `computer_20251124` コンピューター使用ツールは受け入れられません。アドバイザーツールは、Claude Opus 4.8、Claude Opus 4.7、および Claude Sonnet 5 をアドバイザーとして拒否します。各変更点については[Claude Sonnet 5.5 の新機能](https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5)を、変更前後のリクエストについては[移行ガイド](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)をご覧ください。モデル固有のプロンプトパターンについては、[Claude Sonnet 5.5 のプロンプト作成](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5)をご覧ください。
- Claude Sonnet 5.5 が生成する思考ブロックは、それを生成したアカウント、またはそれとリンクされたアカウントでのみ機能します。別のアカウントがこれらのブロックのいずれかを送信すると、API はモデルがそれを見る前にそのブロックを破棄し、リクエストは成功します。以前のモデルからのブロックは影響を受けません。[思考の保存](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#account-bound-thinking)をご覧ください。