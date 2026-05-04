---
title: "How OpenAI delivers low-latency voice AI at scale"
published: "2026-05-04"
collected_at: "2026-05-04T19:20:50.418Z"
url: "https://openai.com/index/delivering-low-latency-voice-ai-at-scale"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# How OpenAI delivers low-latency voice AI at scale

## Key Points
- OpenAIのボイスAIは、9億人以上の週間アクティブユーザーに対し、グローバルな到達性、セッション開始と同時に発話可能な高速接続設定、低ジッター・低パケットロスでの安定したメディア往復時間を実現する必要がある。
- スケーラビリティの問題に対応するため、OpenAIはWebRTCスタックを再構築し、「1セッションあたりのポート使用」モデル、ステートフルなICE/DTLSセッションの所有、グローバルルーティングの課題を解決した。
- 「リレー＋トランシーバー」アーキテクチャを導入し、パケットルーティングとプロトコル終端を分離。リレーは軽量なUDP転送層として機能し、トランシーバーがWebRTCセッション状態を管理することで、標準的なクライアント動作を維持しながらインフラ内のルーティングを変更した。
- ICEのユーザー名フラグメント (ufrag) にルーティングメタデータを埋め込むことで、最初のパケットから適切なトランシーバーへの決定論的なルーティングを実現。これにより、Global Relayと地理的に誘導されたシグナリングが組み合わさり、初回ホップの遅延を大幅に削減している。
- リレーサービスはGo言語で効率的に実装され、`SO_REUSEPORT`、スレッド固定、低アロケーション解析などの最適化により、カーネルバイパスなしでグローバルなリアルタイムメディアトラフィックを処理している。