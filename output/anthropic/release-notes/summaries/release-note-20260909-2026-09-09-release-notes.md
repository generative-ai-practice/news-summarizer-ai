---
title: "2026-09-09 release notes"
published: "2026-09-09"
collected_at: "2026-09-24T18:05:33.116Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-9-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-09-09 release notes

- [キャッシュ診断](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics)について、APIは、リクエストに`diagnostics`オブジェクトが含まれている場合にのみ、そのリクエストのフィンガープリントを保存するようになりました。`cache-diagnosis-2026-04-07`ベータヘッダーのみを送信するリクエストは引き続き受け入れられますが、フィンガープリントは保存されません。後続のターンで`previous_message_id`をそれに向けた場合、`previous_message_not_found`が報告されます。すべてのターンで`diagnostics`を含めてください。最初のターンでは`"previous_message_id": null`としてください。