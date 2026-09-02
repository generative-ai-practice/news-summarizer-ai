---
title: "2026-09-02 changelog"
published: "2026-09-02"
collected_at: "2026-09-02T18:19:57.919Z"
url: "https://platform.openai.com/docs/changelog#2026-09-02"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026年9月2日 変更履歴

- アプリケーションが急激に増加するトラフィックと一時的なモデルの過負荷を区別できるように、APIエラーを更新しました。
- 急激に増加するトラフィックは、`slow_down`コードの`429`エラーを返すことがあります。一時的なモデルの過負荷は、`server_is_overloaded`コードの`503`エラーを返します。どちらのレスポンスにも`Retry-After`が含まれる場合があります。このヘッダーが存在する場合、指定された期間だけ待ってからリトライしてください。存在しない場合は、指数関数的バックオフを使用してください。詳細は、[エラーコードガイド](https://platform.openai.com/api/docs/guides/error-codes)と[レート制限ガイド](https://platform.openai.com/api/docs/guides/rate-limits)を参照してください。