---
title: "Keeping your data safe when an AI agent clicks a link"
published: "2026-01-28"
collected_at: "2026-01-28T21:25:09.265Z"
url: "https://openai.com/index/ai-agent-link-safety"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Keeping your data safe when an AI agent clicks a link

## Key Points
- AIエージェントがリンクをクリックする際に発生する、URLベースのデータ漏洩やプロンプトインジェクション攻撃のリスクについて解説している。
- 攻撃者は、AIモデルに秘密情報を含むURLをリクエストさせることで、ユーザーデータを不正に取得しようとする可能性がある。
- OpenAIは、URLが「ユーザーの会話とは独立してウェブ上で公開されている」と独立したウェブインデックスによって確認された場合にのみ、AIエージェントによる自動フェッチを許可する。
- 単純な「信頼サイトリスト」は、リダイレクトやユーザー体験の悪化といった理由から、十分な対策ではないとしている。
- 未検証のURLに対しては、ユーザーに警告が表示され、リンクを開く前に信頼性を確認するよう求められることで、ユーザーが制御を維持できるようになっている。