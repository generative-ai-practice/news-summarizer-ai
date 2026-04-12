---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-12T09:40:43.371Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、サードパーティ開発者ツール「Axios」に関連するセキュリティ問題（広範なサプライチェーン攻撃の一部）を特定しましたが、OpenAIユーザーデータ、システム、知的財産の侵害は確認されていません。
- macOSアプリケーションの正規性を保護するため、macOSコード署名証明書を更新し、すべてのmacOSユーザーにOpenAIアプリを最新バージョンにアップデートするよう求めています。
- 2026年5月8日以降、旧バージョンのmacOSデスクトップアプリ（ChatGPT Desktop: 1.2026.051、Codex App: 26.406.40811、Codex CLI: 0.119.0、Atlas: 1.2026.84.2より古いもの）はアップデートやサポートを受けられなくなり、機能しなくなる可能性があります。
- 2026年3月31日 (UTC) に、macOSアプリ署名プロセスで使用されるGitHub Actionsワークフローが、悪意のあるバージョンのAxios (1.14.1) をダウンロード・実行したことが判明しました。
- このインシデントの根本原因はGitHub Actionsワークフローの誤設定（フローティングタグの使用とminimumReleaseAgeの未設定）であり、既に修正されています。