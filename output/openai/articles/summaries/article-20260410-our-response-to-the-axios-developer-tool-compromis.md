---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T09:39:31.393Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、サードパーティ製開発ツール「Axios」が侵害された広範な業界インシデントに対し、macOSアプリ署名用コード署名証明書をローテーションして対応しました。
- 現在のところ、OpenAIユーザーデータ、システム、知的財産が侵害された、またはソフトウェアが改ざんされた証拠は発見されていません。パスワードやAPIキーへの影響もありません。
- すべてのmacOSユーザーは、ChatGPT Desktop、Codex App、Codex CLI、Atlasを含むOpenAI macOSアプリを最新バージョンに更新する必要があります。
- 2026年5月8日以降、古いバージョンのmacOSデスクトップアプリは更新やサポートを受けられなくなり、機能しない可能性があります。
- このインシデントの根本原因はGitHub Actionsワークフローの誤設定（フロートタグの使用など）であり、既に修正されています。ユーザーが混乱なく更新できるよう、証明書の失効には30日間の猶予期間が設けられています。