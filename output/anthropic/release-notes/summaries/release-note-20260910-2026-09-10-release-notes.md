---
title: "2026-09-10 release notes"
published: "2026-09-10"
collected_at: "2026-09-10T22:09:07.806Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-10-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-09-10 リリースノート

- Claude マネージドエージェントのパーミッションポリシーに `auto` が追加されました。サーバーは各エージェントまたはMCPツール呼び出しを評価し、実行するか、拒否するか、承認のために一時停止します。`agent.tool_use` および `agent.mcp_tool_use` イベントは、各呼び出しが `evaluated_permission` とともに `evaluation` フィールドでどのように評価されたかを報告します。詳細については、[サーバーに `auto` で各呼び出しを評価させる](https://platform.claude.com/docs/en/managed-agents/permission-policies#let-the-server-evaluate-each-call-with-auto) を参照してください。
- `ant` CLIに `ant beta:sessions connect` が追加されました。これは、ターミナルをClaude マネージドエージェントのセッションに接続します。セッションをリアルタイムで追跡し、メッセージを送信し、承認待ちのツール呼び出しを許可または拒否できます。`--web` を渡すと、Claude Consoleのセッションビューアをローカルで提供し、代わりにそこでセッションを開きます。詳細については、[ターミナルからマネージドエージェントのセッションに接続する](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/sessions-connect) を参照してください。