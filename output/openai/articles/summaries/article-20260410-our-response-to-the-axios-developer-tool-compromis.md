---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T04:54:47.930Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、サードパーティ製開発ツールAxiosの侵害に関わるセキュリティ問題を特定しました。これはmacOSアプリ署名プロセスにおいて、悪意のあるAxiosバージョン1.14.1が実行されたことによるものです。
- ユーザーデータ、システム、知的財産の侵害、またはソフトウェアの改ざんの証拠は発見されていません。
- 予防的措置としてmacOSコード署名証明書を失効させ、更新しています。これにより、すべてのmacOSユーザーはOpenAIアプリを最新バージョンに更新する必要があります。
- 2026年5月8日以降、ChatGPT Desktop 1.2026.051、Codex App 26.406.40811、Codex CLI 0.119.0、Atlas 1.2026.84.2など、それ以前のmacOSデスクトップアプリのバージョンはアップデートやサポートを受けられなくなり、機能しない可能性があります。
- インシデントの根本原因はGitHub Actionsワークフローの誤設定（フローティングタグの使用とminimumReleaseAgeの未設定）であり、この問題は対処済みです。