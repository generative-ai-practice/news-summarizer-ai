---
title: "2026-08-26 changelog"
published: "2026-08-26"
collected_at: "2026-09-05T11:09:16.629Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-08-26"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026-08-26 変更履歴

- **Gemini 3.5 Transcribe 一般提供 (GA)**: Geminiの音声理解に基づく2つの専用音声テキスト変換モデルをリリースしました。
  - **Gemini 3.5 Transcribe** (`gemini-3.5-transcribe`): 85以上の言語に対応する発話ベースの言語検出、話者分離、単語レベルのタイムスタンプ、カスタム語彙バイアス（最大1,000語）を備えた、高精度・低遅延の非ストリーミング音声テキスト変換。
  - **Gemini 3.5 Transcribe Live** (`gemini-3.5-transcribe-live`): Live APIを使用し、WebSockets経由で提供される低遅延の双方向ストリーミング音声テキスト変換。暫定および最終の文字起こしイベント、スマート文字起こしモード、複数の音声活動検出（VAD）戦略をサポートします。
- 開始するには、以下をご覧ください。
  - [音声文字起こしガイド](https://ai.google.dev/gemini-api/docs/transcribe)、
  - [ライブ文字起こしガイド](https://ai.google.dev/gemini-api/docs/live-api/live-transcribe)、および
  - [Gemini 3.5 Transcribe モデルページ](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-transcribe)。