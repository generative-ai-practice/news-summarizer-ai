---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-12T15:31:34.979Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、2026年3月31日(UTC)に広範なサプライチェーン攻撃の一環として侵害されたサードパーティ開発者ツール「Axios」に関連するセキュリティ問題を特定しました。
- macOSアプリ署名プロセスで使用されるGitHub Actionsワークフローが悪意のあるAxiosバージョン (1.14.1) を実行し、macOSアプリケーション署名用の証明書や公証資料にアクセス可能でしたが、ユーザーデータ、システム、知的財産の侵害は確認されていません。
- 予防措置として、OpenAIはmacOSコード署名証明書をローテーションし、ChatGPT Desktop、Codex、Codex-cli、Atlasを含む全てのmacOSアプリの最新バージョンへの更新をユーザーに要請しています。
- 2026年5月8日以降、古いmacOSデスクトップアプリのバージョンは更新やサポートを受けられなくなり、機能しなくなる可能性があります。
- このインシデントの根本原因はGitHub Actionsワークフローの誤設定であり、すでに修正済みです。パスワードやOpenAI APIキーへの影響、またはiOS/Android/Linux/Windowsアプリへの影響はありません。