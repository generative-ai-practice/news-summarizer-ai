---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-12T05:20:46.915Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- OpenAIは、サードパーティ製開発者ツールAxiosが侵害された広範な業界インシデントを確認しました。OpenAIのユーザーデータ、システム、知的財産が侵害されたり、ソフトウェアが改ざんされたりした証拠は見つかっていません。
- 予防措置として、macOSアプリケーションのコード署名証明書を更新しており、すべてのmacOSユーザーはOpenAIアプリを最新バージョンに更新する必要があります。これにより、OpenAIを装った偽アプリの配布リスクを防止します。
- 2026年5月8日以降、旧バージョンのmacOSデスクトップアプリ（ChatGPT Desktop: 1.2026.051、Codex App: 26.406.40811、Codex CLI: 0.119.0、Atlas: 1.2026.84.2以前のバージョン）は更新やサポートを受けられなくなり、機能しない可能性があります。
- 署名証明書が流出した可能性は低いものの、念のため侵害されたものとして扱い、取り消しと更新を進めています。ユーザーの混乱を最小限に抑えるため、30日間の更新猶予期間を設けています。
- このインシデントの根本原因は、GitHub Actionsワークフローにおける浮動タグの使用と`minimumReleaseAge`の未設定という誤設定であり、これらは既に対処済みです。