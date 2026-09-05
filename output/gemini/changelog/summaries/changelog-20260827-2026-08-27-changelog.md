---
title: "2026-08-27 changelog"
published: "2026-08-27"
collected_at: "2026-09-05T11:09:09.455Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-08-27"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026年8月27日 変更履歴

- **Gemini Omni Flash が一般提供（GA）開始** : リリースされました
- `gemini-omni-1.1-flash` は、高速で会話型の動画生成および編集モデルのGAバージョンです。このリリースには、重要な新機能が含まれています。
- **動画の拡張** : `extend` タスクを使用するか、プロンプトで直接、クリップの最後に続きを生成することで、既存の動画をシームレスに拡張できます。
- **補間（最初と最後のフレーム）** : 最大2つの画像で `image_to_video` タスクを使用して、2つの画像間を遷移する動画を生成します。
- **解像度制御** : `video_config` の新しい `resolution` パラメータは、`360p`、`720p`（デフォルト）、`1080p`、`4k` の出力をサポートします。1080p および 4K 出力はアップスケーリングを使用して生成されます。
- 既存の `gemini-omni-flash-preview` エンドポイントは、2026年9月30日に非推奨になります。
- 開始するには、
- [Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash) モデルページ
- と [omni ガイド](https://ai.google.dev/gemini-api/docs/omni)
- を参照してください。