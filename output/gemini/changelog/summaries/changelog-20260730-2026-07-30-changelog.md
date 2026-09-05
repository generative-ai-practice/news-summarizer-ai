---
title: "2026-07-30 changelog"
published: "2026-07-30"
collected_at: "2026-09-05T11:09:30.712Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-07-30"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026-07-30 変更履歴

- **Gemini Robotics ER 2 が公開プレビューに**: ロボティクス向けに2つの新しい具象推論モデルのエンドポイントをリリースしました:
- `gemini-robotics-er-2-preview`: 高度な空間推論、エージェント的なコード実行、多段階ツールオーケストレーション、動画の特定モーメントの検出、進捗分類、複数ロボットの協調。
- `gemini-robotics-er-2-streaming-preview`: Live API を利用したリアルタイムテキストストリーミングに最適化されており、双方向の音声および動画入力を持つ低レイテンシーのロボットエージェントを可能にします。
- 両モデルのエンドポイントは、テキスト、画像、動画、音声の入力を受け入れ、
- 物理的なロボットアクションに対するブロッキング動作を伴う関数呼び出しをサポートしています。
- 開始するには、
- [Gemini Robotics ER の概要](https://ai.google.dev/gemini-api/docs/robotics-overview)をご覧ください。リアルタイムストリーミングのユースケースについては、
- [ストリーミングによるロボティクス](https://ai.google.dev/gemini-api/docs/robotics-streaming)をご覧ください。
- **非推奨のお知らせ**: `gemini-robotics-er-1.6-preview` モデルは
- 2026年8月31日に[シャットダウンされます](https://ai.google.dev/gemini-api/docs/deprecations)。