---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-12T02:02:55.823Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- 2026年3月31日（UTC）にサードパーティの開発ツールAxiosが侵害され、OpenAIのmacOSアプリ署名プロセスに影響がありました。
- OpenAIは、ユーザーデータへのアクセス、システムや知的財産の侵害、またはソフトウェアの改ざんの証拠は発見していません。
- 予防措置として、macOSコード署名証明書をローテーションし、すべてのmacOSアプリユーザーに最新版への更新を求めています。
- 2026年5月8日以降、旧バージョンのmacOSデスクトップアプリ（ChatGPT Desktop、Codex App、Codex CLI、Atlas）はアップデートやサポートを受けられなくなり、機能しない可能性があります。
- このインシデントの根本原因は、GitHub Actionsワークフローの誤設定（浮動タグの使用と`minimumReleaseAge`の未設定）であり、既に対処済みです。