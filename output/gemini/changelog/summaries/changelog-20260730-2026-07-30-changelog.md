---
title: "2026-07-30 changelog"
published: "2026-07-30"
collected_at: "2026-10-16T00:14:12.102Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-07-30"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026年7月30日 変更ログ

- **Gemini Robotics ER 2がパブリックプレビューで公開**: ロボット工学向けの2つの新しい身体的推論モデルエンドポイントをリリースしました:
- `gemini-robotics-er-2-preview`: 高度な空間推論、エージェント的なコード実行、多段階のツールオーケストレーション、ビデオの特定瞬間検索、進行状況の分類、および複数ロボットの協調。
- `gemini-robotics-er-2-streaming-preview`: Live APIを使用したリアルタイムテキストストリーミングに最適化されており、双方向の音声およびビデオ入力に対応した低遅延のロボットエージェントを可能にします。
- これらの両モデルエンドポイントは、テキスト、画像、ビデオ、および音声入力に対応しており、物理的なロボットアクションに対するブロッキング挙動を持つ関数呼び出しをサポートしています。
- 開始するには、
- [Gemini Robotics ER の概要](https://ai.google.dev/gemini-api/docs/robotics-overview)をご覧ください。リアルタイムストリーミングのユースケースについては、
- [ストリーミングによるロボット工学](https://ai.google.dev/gemini-api/docs/robotics-streaming)をご覧ください。
- **非推奨のお知らせ**: `gemini-robotics-er-1.6-preview` モデルは、2026年8月31日に[シャットダウン](https://ai.google.dev/gemini-api/docs/deprecations)されます。