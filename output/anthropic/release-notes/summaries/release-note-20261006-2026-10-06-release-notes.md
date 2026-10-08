---
title: "2026-10-06 release notes"
published: "2026-10-06"
collected_at: "2026-10-08T08:14:23.741Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#october-6-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-10-06 リリースノート

- [モデルAPI](https://platform.claude.com/docs/en/api/models/list)に`capabilities.server_tools`を追加しました。`GET /v1/models`と`GET /v1/models/{model_id}`は、各モデルがウェブ検索ツールとコード実行ツールを受け入れるかどうかを報告するようになりました。モデルがコード実行ツールを受け入れるかどうかを確認するには、`capabilities.server_tools.code_execution`を読み取ってください。トップレベルの`capabilities.code_execution`は、コードがリクエストの他のツールを呼び出せるかどうかを報告します。[モデルAPIの使用](https://platform.claude.com/docs/en/models/overview#using-the-models-api)を参照してください。