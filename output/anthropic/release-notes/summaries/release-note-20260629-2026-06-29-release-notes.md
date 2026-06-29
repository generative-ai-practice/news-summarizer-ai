---
title: "2026-06-29 release notes"
published: "2026-06-29"
collected_at: "2026-06-29T23:56:48.419Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-29-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年6月29日 リリースノート

- Claude Opus 4.6向けに[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)を廃止しました。`speed: "fast"`を指定した`claude-opus-4-6`へのリクエストは、高速モードやプレミアム料金では実行されなくなります。それらは標準速度で実行され、標準料金で課金され、エラーは返されません。レスポンスの`usage.speed`フィールドが使用された速度を報告します。高速モードの使用を継続するには、[Claude Opus 4.8](https://platform.claude.com/docs/en/about-claude/models/migration-guide)に移行してください。詳細については、[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode#supported-models)をご覧ください。