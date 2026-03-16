---
title: "2026-03-16 release notes"
published: "2026-03-16"
collected_at: "2026-03-16T20:31:12.992Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#march-16-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年3月16日 リリースノート

- 拡張思考用の `display` フィールドを導入しました。これにより、レスポンスから思考内容を省略して、より高速なストリーミングが可能になります。`thinking.display: "omitted"` を設定すると、空の `thinking` フィールドを持ち、複数ターンの連続性のために `signature` が保持された思考ブロックを受け取ります。料金に変更はありません。[思考表示の制御](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#controlling-thinking-display)で詳細をご確認ください。