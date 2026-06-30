---
title: "2026-06-22 release notes"
published: "2026-06-22"
collected_at: "2026-06-30T18:51:57.718Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-22-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-06-22 リリースノート

- MCPトンネル（研究プレビュー）：管理APIは、Admin APIの`/v1/organizations/tunnels`からClaude APIの`/v1/tunnels`に移行しました。新しいインターフェースは、`anthropic-beta: mcp-tunnels-2026-06-22`ヘッダーと`workspace:manage_tunnels` WIFスコープを使用します。以前のインターフェースは、移行期間中も引き続き利用可能です。[トンネルAPIリファレンス](https://platform.claude.com/docs/en/api/beta/tunnels)を参照してください。