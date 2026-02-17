---
title: "2026-02-17 release notes"
published: "2026-02-17"
collected_at: "2026-02-17T20:29:55.677Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#february-17-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年2月17日 リリースノート

- 日常的なタスクにおける速度と知性を兼ね備えた、当社の最新のバランスの取れたモデルである[Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6)をリリースしました。Sonnet 4.6は、エージェント的検索性能が向上し、消費トークン数が削減されています。Sonnet 4.6は[拡張思考](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)と[100万トークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows#1m-token-context-window)（ベータ版）をサポートしています。詳細は[モデルと料金](https://platform.claude.com/docs/en/about-claude/models)をご覧ください。
- APIの[コード実行](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)は、ウェブ検索またはウェブフェッチと併用する場合、現在無料です。サンドボックス化されたコード実行は、モデルの能力とトークン効率を向上させます。スタンドアロンでの利用については、[料金詳細](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#usage-and-pricing)をご覧ください。
- [ウェブ検索ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)と[プログラマティックツール呼び出し](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)が一般提供（ベータ版ヘッダー不要）を開始しました。ウェブ検索とウェブフェッチは、現在パブリックベータ版で[動的フィルタリング](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool#dynamic-filtering-with-opus-46-and-sonnet-46)をサポートしており、これはコード実行を使用して、結果がコンテキストウィンドウに到達する前にフィルタリングすることで、パフォーマンスを向上させ、トークンコストを削減します。
- [コード実行ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)、[ウェブフェッチツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)、[ツール検索ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)、[ツール使用例](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use#providing-tool-use-examples)、および[メモリツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)が一般提供（ベータ版ヘッダー不要）を開始しました。