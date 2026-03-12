---
title: "2026-03-12 changelog"
published: "2026-03-12"
collected_at: "2026-03-12T18:44:34.043Z"
url: "https://platform.openai.com/docs/changelog#2026-03-12"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026-03-12 変更履歴

- Sora APIを、再利用可能なキャラクターリファレンス、最大`20`秒までのより長い生成、`sora-2-pro`向けの`1080p`出力、ビデオ拡張機能、および`POST /v1/videos`のバッチAPIサポートで拡張しました。`sora-2-pro`での`1080p`生成は1秒あたり`$0.70`で課金されます。詳細はこちら[here](https://platform.openai.com/api/docs/guides/video-generation)をご覧ください。
- 既存の動画を編集するための`POST /v1/videos/edits`を追加しました。これは`POST /v1/videos/{video_id}/remix`を置き換えるもので、`6`か月後に非推奨となります。詳細はこちら[here](https://platform.openai.com/api/docs/guides/video-generation#edit-existing-videos)をご覧ください。