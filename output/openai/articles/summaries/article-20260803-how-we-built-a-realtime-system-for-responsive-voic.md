---
title: "How we built a realtime system for responsive voice AI in six months"
published: "2026-08-03"
collected_at: "2026-08-03T22:02:13.118Z"
url: "https://openai.com/index/continuous-voice-interaction-with-gpt-live"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# How we built a realtime system for responsive voice AI in six months

## Key Points
- GPT-Liveは、従来のターン検出器を廃止し、AIが同時に聞き取りと発話を行うフルデュプレックス音声モデルを採用することで、より即時的で自然な会話を実現しました。
- システムアーキテクチャは、オーディオメディアの流れを専用の高速パスで処理し、より深い推論やツール使用などのアプリケーションロジックは非同期で委譲することで、低遅延を実現しています。
- 会話のコンテキスト管理やモデルインスタンスのハンドオフをシームレスに行う仕組みを構築し、コンテキスト圧縮が必要な場合でもメディアの中断なく長時間の会話をサポートします。
- WebRTC Abridged Roundtrip Protocol (WARP)とInstant Connectを開発し、メディアセッションの確立に必要なネットワークラウンドトリップを6回から1回に削減することで、セッション起動時間を劇的に短縮しました。
- サイレントテストを通じて本番環境でシステムを安全に検証し、GPUスループット以外のボトルネックや地理的要因による遅延などを特定・解決することで、システムの堅牢性と応答性を向上させました。