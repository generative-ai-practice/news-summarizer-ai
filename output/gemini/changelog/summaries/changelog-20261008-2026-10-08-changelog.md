---
title: "2026-10-08 changelog"
published: "2026-10-08"
collected_at: "2026-10-15T12:29:58.735Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-10-08"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026-10-08 変更履歴

- **Gemini 3.7 Flash の非推奨化** : [`gemini-3.7-flash`](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.7) は非推奨となり、[`gemini-3.8-flash`](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.8) に置き換えられました。Google AI Studio で選択できなくなり、`gemini-3.7-flash` への API リクエストは自動的に `gemini-3.8-flash` にルーティングされます。モデル文字列を `gemini-3.8-flash` に更新し、[Gemini 3.8 Flash ガイド](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.8) を確認してください。
- **Gemini 3.5 Flash の非推奨化** : [`gemini-3.5-flash`](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.5) は非推奨となり、[`gemini-3.6-flash`](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.6) に置き換えられました。Google AI Studio で選択できなくなり、`gemini-3.5-flash` への API リクエストは自動的に `gemini-3.6-flash` にルーティングされます。モデル文字列を `gemini-3.6-flash` (または [`gemini-3.8-flash`](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.8)) に更新し、[Gemini 3.6 Flash ガイド](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.6) を確認してください。
- **Deep Research Agent `deep-research-pro-preview-12-2025` の非推奨化** :
- `deep-research-pro-preview-12-2025` エージェントは非推奨となり、
- **10月23日** に [シャットダウン](https://ai.google.dev/gemini-api/docs/deprecations#managed-agents) されます。
- 2026年**。
- リクエストを、より新しい [Deep Research](https://ai.google.dev/gemini-api/docs/deep-research) エージェントバージョンの一つに移行してください:
- [`deep-research-preview-04-2026`](https://ai.google.dev/gemini-api/docs/models/deep-research-preview-04-2026): 速度と効率性を考慮して設計されており、クライアント UI にストリーミングして戻すのに最適です。
- [`deep-research-max-preview-04-2026`](https://ai.google.dev/gemini-api/docs/models/deep-research-max-preview-04-2026): 自動コンテキスト収集と合成のための最大限の包括性。
- 移行するには、`interactions.create` リクエストの `agent` パラメータを `deep-research-pro-preview-12-2025` から `deep-research-preview-04-2026` (または `deep-research-max-preview-04-2026`) に更新してください。