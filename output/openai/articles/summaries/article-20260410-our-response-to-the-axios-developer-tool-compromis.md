---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-12T18:39:02.998Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- 2026年3月31日(UTC)にサードパーティの開発者ツールAxiosが広範なサプライチェーン攻撃の一環として侵害され、OpenAIのmacOSアプリ署名プロセスに影響を与えました。
- このインシデントによるOpenAIのユーザーデータ、システム、知的財産の侵害、またはソフトウェアの改変の証拠は発見されていません。
- 予防措置として、OpenAIはmacOSコード署名証明書をローテーションし、すべてのmacOSユーザーは最新バージョンのOpenAIアプリに更新する必要があります。
- 2026年5月8日以降、ChatGPT Desktop (1.2026.051)、Codex App (26.406.40811)、Codex CLI (0.119.0)、Atlas (1.2026.84.2) 以前のmacOSデスクトップアプリはサポートが終了し、機能しなくなる可能性があります。
- この問題の根本原因はGitHub Actionsワークフローの誤設定（浮動タグの使用およびminimumReleaseAgeの未設定）であり、既に修正済みです。