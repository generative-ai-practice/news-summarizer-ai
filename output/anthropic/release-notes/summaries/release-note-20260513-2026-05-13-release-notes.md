---
title: "2026-05-13 release notes"
published: "2026-05-13"
collected_at: "2026-05-18T18:27:38.542Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#may-13-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-05-13 リリースノート

- [キャッシュ診断](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics)をパブリックベータとして公開しました。Messagesリクエストで `diagnostics.previous_message_id` を渡すと、APIはプロンプトキャッシュプレフィックスが前回のターンからどこで分岐したかを説明する `cache_miss_reason` を報告します。リクエストには `cache-diagnosis-2026-04-07` ベータヘッダーを含めてください。