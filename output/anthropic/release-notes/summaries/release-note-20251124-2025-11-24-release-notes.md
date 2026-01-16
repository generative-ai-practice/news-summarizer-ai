---
title: "2025-11-24 release notes"
published: "2025-11-24"
url: "https://platform.claude.com/docs/en/release-notes/overview#november-24-2025"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2025年11月24日 リリースノート

-   当社は、最大限の能力と実用的なパフォーマンスを兼ね備えた、最もインテリジェントなモデルである[Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5)をリリースしました。複雑な専門タスク、プロのソフトウェアエンジニアリング、および高度なエージェントに最適です。以前のOpusモデルよりも手頃な価格で、ビジョン、コーディング、およびコンピューター使用において画期的な改善が特徴です。詳細については、[モデルと料金のドキュメント](https://platform.claude.com/docs/en/about-claude/models)をご覧ください。
-   当社は、[プログラムによるツール呼び出し](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)を公開ベータ版でリリースしました。これにより、Claudeはコード実行内からツールを呼び出すことができ、複数ツールワークフローにおけるレイテンシとトークン使用量を削減します。
-   当社は、[ツール検索ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)を公開ベータ版でリリースしました。これにより、Claudeは大規模なツールカタログからツールを動的に発見し、オンデマンドでロードできます。
-   当社は、Claude Opus 4.5向けに[エフォートパラメーター](https://platform.claude.com/docs/en/build-with-claude/effort)を公開ベータ版でリリースしました。これにより、応答の徹底性と効率性の間でトレードオフを行うことで、トークン使用量を制御できます。
-   当社は、PythonおよびTypeScript SDKに[クライアント側コンパクション](https://platform.claude.com/docs/en/build-with-claude/context-editing#client-side-compaction-sdk)を追加しました。これにより、`tool_runner`を使用する際に、要約を通じて会話コンテキストを自動的に管理します。