---
title: "2026-08-27 changelog"
published: "2026-08-27"
collected_at: "2026-10-15T12:31:59.449Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-08-27"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026年8月27日 変更履歴

- **Gemini Omni Flash 一般提供開始 (GA)** : リリース
- `gemini-omni-1.1-flash`、当社の高速で対話型のビデオ
- 生成および編集モデルのGAバージョンです。このリリースには、重要な新機能が
- 含まれています:
- **ビデオ拡張** : `extend`タスクを使用するか、プロンプトで直接、クリップの最後に続きを生成することで、既存のビデオをシームレスに拡張します。
- **補間 (最初 + 最後フレーム)** : `image_to_video`タスクを使用して、最大2つの画像で2つの画像の間の遷移ビデオを生成します。
- **解像度制御** : `video_config`の新しい`resolution`パラメーターは、`360p`、`720p` (デフォルト)、`1080p`、および`4k`の出力をサポートします。1080pおよび4K出力はアップスケーリングを使用して生成されます。
- 既存の`gemini-omni-flash-preview`エンドポイントは、
- 2026年9月30日に非推奨となります。
- 開始するには、以下のページを参照してください。
- [Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash) モデルページ
- および[omniガイド](https://ai.google.dev/gemini-api/docs/omni)。