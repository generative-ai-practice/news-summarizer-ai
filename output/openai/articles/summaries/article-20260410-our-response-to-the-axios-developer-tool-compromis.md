---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T01:53:42.041Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、サードパーティ製開発ツールAxiosの侵害を受けて、macOSアプリ署名証明書の失効とローテーションを実施しました。
- 調査の結果、OpenAIのユーザーデータへのアクセス、システムや知的財産の侵害、およびソフトウェアの改ざんの証拠は見つかっていません。
- すべてのmacOSユーザーは、ChatGPT Desktop、Codex App、Codex CLI、Atlasを含むOpenAIアプリを最新バージョンに更新する必要があります。
- 2026年5月8日以降、古いバージョンのmacOSデスクトップアプリはアップデートやサポートを受けられなくなり、機能しなくなる可能性があります。
- このインシデントの根本原因はGitHub Actionsワークフローの誤設定であり、悪意のあるAxiosバージョンがダウンロードされ、macOSアプリ署名プロセスにアクセスしたことによるものです。