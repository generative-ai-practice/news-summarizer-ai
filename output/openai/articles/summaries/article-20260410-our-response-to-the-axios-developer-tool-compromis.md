---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T18:39:47.847Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- 2026年3月31日（UTC）に、サードパーティ開発者ツールAxiosのサプライチェーン攻撃により、OpenAIのmacOSアプリ署名プロセスが侵害された。
- ユーザーデータへのアクセス、システムや知的財産の侵害、ソフトウェアの改ざんの証拠は見つかっていない。
- 予防措置としてmacOSコード署名証明書をローテーションし、ChatGPT Desktop、Codex、Codex-cli、Atlasを含む全macOSアプリの最新バージョンへの更新をユーザーに求めている。
- 2026年5月8日以降、古いバージョンのmacOSアプリ（例: ChatGPT Desktop: 1.2026.051）はアップデートやサポートを受けられなくなり、機能しなくなる可能性がある。
- このインシデントの根本原因であるGitHub Actionsワークフローの誤設定（フローティングタグの使用など）は既に修正されている。