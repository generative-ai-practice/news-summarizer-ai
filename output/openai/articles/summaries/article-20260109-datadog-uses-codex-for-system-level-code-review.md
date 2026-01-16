---
title: "Datadog uses Codex for system-level code review"
published: "2026-01-09"
url: "https://openai.com/index/datadog"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Datadog uses Codex for system-level code review

## Key Points
- Datadogは、システムレベルのコードレビューにOpenAIのCodexを導入し、従来の静的解析ツールでは見逃されがちだったシステム全体にわたるコンテキストを考慮したリスク特定を実現しました。
- 過去のインシデントに繋がったプルリクエストをCodexで再評価した結果、調査対象のインシデントの約22%において、Codexが人間のレビュアーが見逃したリスクを特定できたことが確認されました。
- Codexは、Diff範囲外のモジュール間相互作用、クロスサービス結合におけるテストカバレッジ不足、下流リスクを伴うAPI契約変更など、人間が見落としがちな高品質なフィードバックを一貫して提供します。
- この導入により、1,000人以上のエンジニアが日常的にCodexを利用し、エンジニアは検出作業よりもアーキテクチャと設計に集中できるようになりました。
- Datadogのコードレビューは、エラー検出や開発速度向上だけでなく、システム全体の信頼性向上と顧客の信頼保護を目的としたパートナーとしての役割へと再定義されました。