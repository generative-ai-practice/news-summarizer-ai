---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-13T07:55:01.002Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、2026年3月31日に発生したサードパーティ開発者ツールAxiosの侵害を受け、macOSアプリのコード署名証明書を更新し、全macOSユーザーに最新バージョンへのアップデートを要請しています。
- このインシデントは、macOSアプリ署名プロセスで使用されるGitHub Actionsワークフローの誤設定（悪意あるAxiosバージョン1.14.1の実行）が原因でした。
- 調査の結果、OpenAIのユーザーデータへのアクセス、システムや知的財産の侵害、またはソフトウェアの改ざんの証拠は確認されていません。
- 予防措置として証明書は侵害されたものとして扱われ、2026年5月8日以降、旧バージョンのmacOSデスクトップアプリはサポートや更新を受けられなくなり、機能しなくなる可能性があります。
- 影響を受けるのはChatGPT Desktop、Codex App、Codex CLI、AtlasなどのmacOSアプリのみであり、パスワードやAPIキー、iOS、Android、Linux、Windowsのアプリは影響を受けていません。