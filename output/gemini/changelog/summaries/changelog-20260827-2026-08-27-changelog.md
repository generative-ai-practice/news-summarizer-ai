---
title: "2026-08-27 changelog"
published: "2026-08-27"
collected_at: "2026-10-16T00:13:39.845Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-08-27"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026-08-27 変更履歴

- **Gemini Omni Flashが一般提供 (GA)** : リリースされました
- 高速で会話型の動画生成および編集モデルのGAバージョンである
- `gemini-omni-1.1-flash`。このリリースには、以下の重要な新機能が含まれています。
- **動画の拡張** : `extend` タスクを使用するか、またはプロンプトで直接、クリップの最後に続きを生成することにより、既存の動画をシームレスに拡張します。
- **補間 (最初 + 最後フレーム)** : 最大2つの画像で`image_to_video`タスクを使用して、2つの画像間を遷移する動画を生成します。
- **解像度制御** : `video_config`の新しい`resolution`パラメータは、`360p`、`720p` (デフォルト)、`1080p`、および`4k`の出力をサポートします。1080pおよび4K出力は、アップスケーリングを使用して生成されます。
- 既存の`gemini-omni-flash-preview`エンドポイントは、
- 2026年9月30日に非推奨となります。
- 開始するには、
- [Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash) モデルページ
- および [omni ガイド](https://ai.google.dev/gemini-api/docs/omni) を参照してください。