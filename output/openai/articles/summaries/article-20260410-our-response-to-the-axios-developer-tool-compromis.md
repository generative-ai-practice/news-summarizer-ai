---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-11T21:28:45.273Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- 2026年3月31日（UTC）に、サードパーティ製開発ツールであるAxiosに対する広範なサプライチェーン攻撃の一環として、OpenAIのmacOSアプリ署名プロセスにセキュリティ問題が発生しました。
- macOSアプリケーション署名に使用される証明書と公証資料にアクセスがあったものの、OpenAIのユーザーデータ、システム、知的財産が侵害された、またはソフトウェアが改ざんされたという証拠は見つかっていません。
- 予防措置として、macOSコード署名証明書を更新し、ChatGPT Desktop、Codex、Codex-cli、Atlasを含むすべての関連macOS製品の新しいビルドを公開しました。
- 2026年5月8日以降、古いバージョンのmacOSデスクトップアプリはアップデートやサポートを受けられなくなり、機能しなくなる可能性があるため、ユーザーは公式リンクから最新版にアップデートする必要があります。
- この問題の根本原因は、GitHub Actionsワークフローにおける浮動タグの使用と`minimumReleaseAge`の未設定という誤設定であり、これは既に対処済みです。