---
title: "Unlocking the Codex harness: how we built the App Server"
published: "2026-02-04"
collected_at: "2026-02-04T21:28:16.750Z"
url: "https://openai.com/index/unlocking-the-codex-harness"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Unlocking the Codex harness: how we built the App Server

## Key Points
- Codex App Serverは、OpenAIのコーディングエージェントCodexの基盤となる双方向JSON-RPC APIであり、Web、CLI、IDE拡張、macOSアプリなど、多様なCodexクライアント体験を支えます。
- App Serverのアーキテクチャは、Codexコアのロジックをクライアントに公開し、スレッドライフサイクル、設定・認証、ツール実行・拡張といったエージェントの全機能を提供します。
- クライアントとサーバー間のプロトコルは完全に双方向で、「Item」（入出力の最小単位）、「Turn」（ユーザー入力に始まるエージェント作業の単位）、「Thread」（継続的なCodexセッションの永続コンテナ）という3つのコアプリミティブを使用します。
- クライアントは、ローカルバイナリとしてApp Serverをバンドルするか（IDEなど）、コンテナ環境で実行中のApp Serverに接続する（Web）ことでCodexと統合し、ストリーミングイベントと承認プロセスを受け取ります。
- Codex App Serverは、Codexの全機能を安定したUIフレンドリーなイベントストリームとして公開する第一級の統合方法であり、JSONスキーマとドキュメントを利用して多言語でのクライアントバインディング生成を容易にします。