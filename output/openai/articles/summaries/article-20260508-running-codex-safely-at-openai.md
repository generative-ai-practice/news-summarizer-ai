---
title: "Running Codex safely at OpenAI"
published: "2026-05-08"
collected_at: "2026-05-08T21:54:38.490Z"
url: "https://openai.com/index/running-codex-safely"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Running Codex safely at OpenAI

## Key Points
- OpenAIは、Codexをサンドボックス、承認ポリシー、ネットワークポリシーなどの厳格な技術的境界内で運用し、低リスクなアクションは円滑に進め、高リスクなアクションは明示的にレビューを求める。
- Codexは、自動レビューモードにより、低リスクな要求を自動承認することでユーザーの中断を減らし、指定された開発ディレクトリでの書き込みを許可するよう設定されている。
- ネットワークアクセスは管理されたポリシーで制御され、既知の宛先は許可し、望ましくない宛先はブロックし、不明なドメインには承認が必要となる。
- 認証情報はOSキーリングに安全に保存され、ChatGPT経由でのログインが強制され、Codexの活動はChatGPTコンプライアンスログプラットフォームで監査可能となっている。
- Codexはエージェントネイティブのテレメトリーと監査証跡を提供し、ユーザープロンプトやツール実行結果などのイベントをOpenTelemetry形式でエクスポートすることで、セキュリティチームがエージェントの意図を理解し、行動を監査できるようにする。