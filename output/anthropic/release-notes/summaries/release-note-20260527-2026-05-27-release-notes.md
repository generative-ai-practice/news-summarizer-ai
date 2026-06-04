---
title: "2026-05-27 release notes"
published: "2026-05-27"
collected_at: "2026-06-04T16:52:23.626Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#may-27-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年5月27日 リリースノート

- Messages API のレスポンスに、課金対象の出力トークンのうち、どれだけが拡張思考であったかを報告する[`usage.output_tokens_details.thinking_tokens`](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#working-with-thinking-budgets)が含まれるようになりました。ストリーミング時には、この内訳は最終的な `message_delta` イベントにのみ表示されます。ベータヘッダーは不要です。