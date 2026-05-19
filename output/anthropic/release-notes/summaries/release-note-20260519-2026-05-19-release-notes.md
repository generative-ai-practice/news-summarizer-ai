---
title: "2026-05-19 release notes"
published: "2026-05-19"
collected_at: "2026-05-19T10:56:18.441Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#may-19-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-05-19 リリースノート

-   [MCPトンネル](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview)がリサーチプレビューとして利用可能になりました。これにより、プライベートネットワーク内のMCPサーバーに接続できます。
-   Claudeマネージドエージェント向けに、自己ホスト型サンドボックスが利用可能になりました。これは、Anthropicのインフラストラクチャでツール実行を行う代替手段となります。[自己ホスト型サンドボックス](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes)を参照してください。
-   Claudeマネージドエージェントを使用すると、アクティブなセッションに関連付けられたエージェントのMCPサーバーとツール構成を更新できるようになりました。
-   Claudeマネージドエージェントでは、`agent_toolset`およびMCPツールからの10万トークンを超える大規模な出力が、サンドボックス内のファイルに自動的に書き出されるようになりました。モデルはファイルパスを含む切り詰められたプレビューを受け取り、そこから完全な内容を読み取ることができます。