---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T12:47:00.072Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、2026年3月31日にサードパーティ開発ツールAxiosのセキュリティ問題（広範なサプライチェーン攻撃の一部）を特定しました。これは、macOSアプリ署名プロセスで使用されるGitHub Actionsワークフローの誤設定に起因します。
- このインシデントにより、macOSアプリケーション（ChatGPT Desktop、Codex、Codex-cli、Atlas）の署名に使用される証明書と公証資料へのアクセスが疑われました。
- 調査の結果、OpenAIのユーザーデータ、システム、知的財産、またはソフトウェアの改ざんの証拠は見つかっていません。
- 予防措置として、OpenAIはmacOSコード署名証明書をローテーションし、影響を受けるすべてのmacOSアプリの新しいビルドを公開しています。
- 2026年5月8日以降、古いmacOSデスクトップアプリのバージョンは更新やサポートを受けられなくなり、機能しなくなる可能性があるため、ユーザーは最新版にアップデートする必要があります。