---
title: "2026-06-11 release notes"
published: "2026-06-11"
collected_at: "2026-06-19T00:20:46.022Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-11-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-06-11 リリースノート

- [コード実行ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)は、`code_execution_20260521`をサポートするようになりました。これにより、ツール説明に1セルあたり90秒の実行時間制限が開示され、Claudeが長時間実行されるセルの予算を立てられるようになります。ベータヘッダーは不要です。
- [ウェブ検索ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)と[ウェブフェッチツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)は、`web_search_20260318`と`web_fetch_20260318`をサポートするようになりました。これにより、エージェントワークフロー向けに、消費された結果ブロックをAPIレスポンスから除外するための`response_inclusion`パラメーターが追加されます。ベータヘッダーは不要です。