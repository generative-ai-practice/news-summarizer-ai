---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T06:58:26.137Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- 2026年3月31日（UTC）に、OpenAIがmacOSアプリ署名プロセスで利用するサードパーティのAxios開発者ツールが、広範囲なソフトウェアサプライチェーン攻撃の一環として侵害されました。
- 調査の結果、OpenAIのユーザーデータ、システム、知的財産が侵害された、またはソフトウェアが改ざんされた証拠は見つかっていません。パスワードやAPIキーも影響を受けていません。
- 予防措置としてmacOSコード署名証明書をローテーションし、すべてのmacOSユーザーはChatGPT Desktop、Codex App、Codex CLI、Atlasの最新バージョンへのアップデートが必須となります。
- 2026年5月8日以降、旧証明書で署名されたmacOSデスクトップアプリのバージョン（ChatGPT Desktop 1.2026.051より古いものなど）は、更新やサポートを受けられなくなり、機能しなくなる可能性があります。
- このインシデントの根本原因はGitHub Actionsワークフローの誤設定（フローティングタグの使用など）であり、OpenAIはこれを修正し、Appleと連携して旧証明書での新規公証を阻止しています。