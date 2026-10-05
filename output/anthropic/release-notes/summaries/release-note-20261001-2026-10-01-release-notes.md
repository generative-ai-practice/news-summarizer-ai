---
title: "2026-10-01 release notes"
published: "2026-10-01"
collected_at: "2026-10-05T19:32:29.302Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#october-1-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-10-01 リリースノート

- [Models API](https://platform.claude.com/docs/en/api/models/list)に`line`フィールドを追加しました。`GET /v1/models`および`GET /v1/models/{model_id}`は、各モデルが属するモデルラインを返すようになりました。例えば、Claude Opus 4.5とClaude Opus 4.6は両方とも`opus`を報告します。IDを解析せずにモデルをグループ化するには、`line`を使用してください。どのラインにも属さないモデルの場合、`line`は`null`です。[Models APIの使用](https://platform.claude.com/docs/en/models/overview#using-the-models-api)を参照してください。