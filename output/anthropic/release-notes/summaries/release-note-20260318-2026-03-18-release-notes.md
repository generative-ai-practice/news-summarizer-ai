---
title: "2026-03-18 release notes"
published: "2026-03-18"
collected_at: "2026-03-18T20:29:00.899Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#march-18-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-03-18 リリースノート

- [Models API](https://platform.claude.com/docs/en/api/models/list) にモデル機能フィールドを追加しました。`GET /v1/models` および `GET /v1/models/{model_id}` は、`max_input_tokens`、`max_tokens`、および `capabilities` オブジェクトを返すようになりました。各モデルが何をサポートしているかを確認するには、APIをクエリしてください。