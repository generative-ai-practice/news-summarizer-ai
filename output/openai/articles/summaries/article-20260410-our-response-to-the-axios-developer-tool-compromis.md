---
title: "Our response to the Axios developer tool compromise"
published: "2026-04-10"
collected_at: "2026-04-12T07:07:11.504Z"
url: "https://openai.com/index/axios-developer-tool-compromise"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our response to the Axios developer tool compromise

## Key Points
- 2026年3月31日(UTC)に、広く利用されているサードパーティ開発ライブラリAxiosがソフトウェアサプライチェーン攻撃の一環として侵害されました。
- このインシデントにより、macOSアプリ署名プロセスで使用されるGitHub Actionsワークフローが不正なAxios（バージョン1.14.1）をダウンロード・実行し、macOSアプリケーションの署名に使用される証明書にアクセスされた可能性があります。
- OpenAIは、ユーザーデータ、システム、知的財産が侵害された証拠、またはソフトウェアが改ざんされた証拠は見つかっていないことを確認しました。パスワードやOpenAI APIキーも影響を受けていません。
- 予防措置として、OpenAIはmacOSコード署名証明書を無効化し、新しい証明書で署名された最新バージョン（ChatGPT Desktop: 1.2026.051、Codex App: 26.406.40811、Codex CLI: 0.119.0、Atlas: 1.2026.84.2以降）への更新をすべてのmacOSユーザーに要求しています。
- 2026年5月8日以降、古いバージョンのmacOSデスクトップアプリはアップデートやサポートを受けられなくなり、機能しなくなる可能性があります。