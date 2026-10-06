---
title: "2026-10-05 release notes"
published: "2026-10-05"
collected_at: "2026-10-06T21:32:33.234Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#october-5-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-10-05 リリースノート

- [Models API](https://platform.claude.com/docs/en/api/models/list) に `capabilities.thinking.types.disabled` を追加しました。`GET /v1/models` および `GET /v1/models/{model_id}` は、各モデルが思考をオフにする `thinking: {type: "disabled"}` を受け入れるかどうかを報告するようになりました。詳細は [Models API の使用](https://platform.claude.com/docs/en/models/overview#using-the-models-api) を参照してください。