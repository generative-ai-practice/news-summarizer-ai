---
title: "2026-09-23 release notes"
published: "2026-09-23"
collected_at: "2026-09-24T18:05:27.005Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-23-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-09-23 リリースノート

- [キャッシュ診断](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics)はClaude APIでベータ版を終了し、`cache-diagnosis-2026-04-07`ベータヘッダーを必要としなくなりました。オプトインするには、Messagesリクエストに`diagnostics`オブジェクトを含めてください。依然としてヘッダーを送信するリクエストはこれまで通り動作します。`POST /v1/messages`からの応答には、常に`diagnostics`フィールドが含まれるようになりましたが、リクエストに`diagnostics`オブジェクトが含まれていない場合は`null`となります。