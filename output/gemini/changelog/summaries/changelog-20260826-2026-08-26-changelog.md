---
title: "2026-08-26 changelog"
published: "2026-08-26"
collected_at: "2026-10-15T17:41:08.199Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-08-26"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026年8月26日 変更履歴

- **Gemini 3.5 Transcribe 一般提供開始 (GA)**: Geminiの音声理解に基づく2つの専用音声テキスト変換モデルをリリースしました。
    - **Gemini 3.5 Transcribe** (`gemini-3.5-transcribe`): 85以上の言語に対応した発話単位の言語検出、話者分離、単語レベルのタイムスタンプ、およびカスタム語彙バイアス（最大1,000語）を備えた、高精度・低遅延の非ストリーミング音声テキスト変換。
    - **Gemini 3.5 Transcribe Live** (`gemini-3.5-transcribe-live`): Live APIを使用してWebSockets経由で実現される、低遅延・双方向ストリーミング音声テキスト変換。中間および最終的な文字起こしイベント、スマート文字起こしモード、および複数の音声活動検出 (VAD) 戦略をサポートします。
- 開始するには、以下をご覧ください。
    - [音声文字起こしガイド](https://ai.google.dev/gemini-api/docs/transcribe)
    - [ライブ文字起こしガイド](https://ai.google.dev/gemini-api/docs/live-api/live-transcribe)
    - [Gemini 3.5 Transcribe モデルページ](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-transcribe)