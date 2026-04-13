---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-13T05:36:07.423Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、広く報じられたAxios開発者ツールへのサプライチェーン攻撃により、macOSアプリの署名プロセスが影響を受けたことを確認しました。
- このインシデントにおいて、OpenAIのユーザーデータ、システム、知的財産が侵害された、またはソフトウェアが改ざんされた証拠は見つかっていません。
- 予防措置として、OpenAIはmacOSコード署名証明書を更新し、すべてのmacOSアプリユーザーに対し、公式ウェブサイトまたはアプリ内更新を通じて最新バージョンへのアップデートを求めています。
- 2026年5月8日以降、以前の証明書で署名された古いmacOSデスクトップアプリ（ChatGPT Desktop, Codex App, Codex CLI, Atlasなど）はアップデートやサポートを受けられなくなり、機能が停止する可能性があります。
- この問題の根本原因はGitHub Actionsワークフローの誤設定であり、OpenAIはこれを修正済みです。