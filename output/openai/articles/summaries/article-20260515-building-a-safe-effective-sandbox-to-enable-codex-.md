---
title: "Building a safe, effective sandbox to enable Codex on Windows"
published: "2026-05-15"
collected_at: "2026-05-13T19:46:19.920Z"
url: "https://openai.com/index/building-codex-windows-sandbox"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Building a safe, effective sandbox to enable Codex on Windows

## Key Points
- Windows版Codexはサンドボックス実装が不足しており、非効率なコマンド承認か、監視なしのフルアクセスの選択をユーザーに強いるため、安全で効果的なサンドボックスが必要とされた。
- 既存のWindows隔離ツール（AppContainer、Windows Sandbox、Mandatory Integrity Control）は、Codexの汎用的な開発ワークフロー要件や互換性の問題により、いずれも採用されなかった。
- 最初のプロトタイプ「unelevated sandbox」は、SIDと書き込み制限トークンを組み合わせてファイル書き込みを制限したが、ネットワーク保護が不十分であり、悪意のあるコードに容易に迂回されるリスクがあった。
- 再設計された「elevated sandbox」は、セットアップ時に管理者権限を必要とし、CodexSandboxOfflineおよびCodexSandboxOnlineという専用のローカルユーザーとWindows Firewallを導入することで、ファイルアクセスとネットワークアクセスを厳格に制御する。
- 最終的なサンドボックスアーキテクチャは、複数の専用バイナリと非同期プロセスを組み合わせた複雑なシステムであり、安全性と開発ワークフローにおける実用性のバランスをとるために必要に応じて複雑性が追加された。