---
title: "2026-09-22 release notes"
published: "2026-09-22"
collected_at: "2026-09-22T17:51:22.471Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-22-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-09-22 リリースノート

- 長期にわたるエージェント的なコーディングおよびナレッジワーク向けのモデルであるClaude Opus 5.5 (`claude-opus-5-5`) をリリースしました。デフォルトで[1Mトークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows)を持ち、最大出力トークンは128k、常時オンの[適応型思考](https://platform.claude.com/docs/en/build-with-claude/thinking)を備え、料金は1Mトークンあたり4ドル / 20ドル（Claude Opus 5は5ドル / 25ドル）です。Claude Opus 5.5は、Claude API、[Amazon BedrockのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock)、[AWS上のClaudeプラットフォーム](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws)、[Google CloudのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai)、および[Microsoft FoundryのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry)で利用可能です。機能、APIの変更点、移行ガイダンスについては、[Claude Opus 5.5の新機能](https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5)を参照してください。
- Claude Opus 5.5では、思考を無効にすることはできません。`thinking: {"type": "disabled"}` および `thinking: {"type": "enabled", ...}` は400エラーを返します。`thinking` フィールドを省略し、[effortパラメーター](https://platform.claude.com/docs/en/build-with-claude/effort)で思考の深さを制御してください。Claude Fable 5.1と同様に、`tool_choice` のタイプ `any` および `tool` も400エラーを返します。[厳密なツール使用](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use)では `auto` を使用してください。Claude APIおよびGoogle Cloudでは、このモデルでの[コンピューター利用](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)には `computer_toolset_20260801` ツールセットが必要であり、以前の `computer_20251124` ツールは400エラーを返します。Amazon Bedrockでは `computer_20251124` は引き続き機能します。[移行ガイド](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide#migrating-from-claude-opus-5)を参照してください。
- Claude APIのClaude Opus 5.5で、[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)（研究プレビュー）が利用可能になりました。
- ツールは、Claude APIで `inline-tools-2026-09-15` ベータヘッダーを使用してベータ版で利用可能な[会話中のシステムメッセージ](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#define-tools-in-a-message-beta)内に定義できるようになりました。`tool_addition` ブロックはツールの完全な定義（`tool: {"type": "tool_definition", "definition": {...}}`）を保持できるため、`tools` を編集したりプロンプトキャッシュを無効にしたりすることなく、ツールを追加したり、そのスキーマを変更したり、サーバーツールを新しいバージョンに移行したりできます。同じヘッダーが、参照によるツールの追加と削除をカバーしています。MCPコネクターの `mcp-client-2026-09-15` ベータヘッダーも使用すると、定義はMCPツールセットになり、応答は各サーバーが取得したツールリストを `mcp_tool_listing` ブロックに記録します。これは、そのリストを返送する際に固定します。