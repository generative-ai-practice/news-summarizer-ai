---
title: "2026-09-24 release notes"
published: "2026-09-24"
collected_at: "2026-09-24T18:05:21.761Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-24-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年9月24日 リリースノート

- 課金対象となる拒否の範囲を拡大し、`stop_details.category`が`"bio"`、`"frontier_llm"`、または`"reasoning_extraction"`の場合に、出力が行われる前に発生する拒否を含めるようにします。これらは、誤検知の発生量が少ないと測定されているカテゴリです。ストリーム中の拒否は既に課金されていました。新しく課金対象となる拒否は、他のリクエストと同様に、それを実行したモデルの料金で請求されます。その他のカテゴリで出力が行われる前の拒否は引き続き課金されず、フォールバッククレジットに変更はありません。この変更はすべてのプラットフォームに適用されます。[拒否の課金方法](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#how-refusals-are-billed)を参照してください。