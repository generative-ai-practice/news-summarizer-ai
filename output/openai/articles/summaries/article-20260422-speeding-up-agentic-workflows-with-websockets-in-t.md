---
title: "Speeding up agentic workflows with WebSockets in the Responses API"
published: "2026-04-22"
collected_at: "2026-04-22T19:05:30.205Z"
url: "https://openai.com/index/speeding-up-agentic-workflows-with-websockets"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Speeding up agentic workflows with WebSockets in the Responses API

## Key Points
- Codexエージェントループは、多数のAPIリクエストがボトルネックとなり、モデル推論の高速化に伴うAPIサービスオーバーヘッドが顕著な課題だった。
- 以前のAPI最適化により初回トークン生成時間は約45%改善されたが、会話履歴をリクエストごとに再処理する構造的な非効率性が残っていた。
- WebSocketsをResponses APIに導入することで、永続的な接続と接続スコープのインメモリキャッシュが可能になり、以前の応答状態を再利用することで冗長なAPI処理を排除した。
- この新しい設計により、安全性分類器の効率化、トークンキャッシュの利用、モデルルーティングロジックの再利用、非同期処理のオーバーラップなどの最適化が実現された。
- WebSocketモードの導入後、エージェントワークフローは最大40%高速化し、GPT-5.3-Codex-Sparkは目標の1,000 TPSを達成し、一時的に4,000 TPSを記録するなどの顕著なパフォーマンス向上が見られた。