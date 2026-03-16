---
title: "2026-03-16 release notes"
published: "2026-03-16"
collected_at: "2026-03-16T23:25:25.170Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#march-16-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年3月16日 リリースノート

- 拡張思考のために `display` フィールドを導入しました。これにより、レスポンスから思考内容を省略して、より高速なストリーミングが可能になります。`thinking.display: "omitted"` を設定すると、空の `thinking` フィールドを持つ思考ブロックを受け取り、複数ターンでの連続性のために `signature` は保持されます。料金体系は変更ありません。詳細については、[思考表示の制御](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#controlling-thinking-display)をご覧ください。