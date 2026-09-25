---
title: "2026-09-24 release notes"
published: "2026-09-24"
collected_at: "2026-09-25T01:04:10.195Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-24-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年9月24日 リリースノート

- `stop_details.category`が「`"bio"`」、「`"frontier_llm"`」、または「`"reasoning_extraction"`」である場合、出力前に発生する拒否も課金の対象を拡大します。これらのカテゴリでは、誤検出の量が少ないことを確認しています。ストリーム途中での拒否は既に課金されていました。新たに課金対象となる拒否は、それを実行したモデルの料金で、他のリクエストと同様に課金されます。他のカテゴリでの出力前の拒否は引き続き課金されず、フォールバッククレジットに変更はありません。この変更は全てのプラットフォームに適用されます。詳細は[拒否の課金方法](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#how-refusals-are-billed)をご覧ください。