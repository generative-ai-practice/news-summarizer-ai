---
title: "2026-06-18 release notes"
published: "2026-06-18"
collected_at: "2026-06-25T21:24:33.581Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-18-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年6月18日 リリースノート

- Python、TypeScript、Go、Java、Ruby、PHP、C#のSDKが、REPLステートの永続性を追加し、[プログラムによるツール呼び出し](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)の最小バージョンである[コード実行ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)のバージョンである`code_execution_20260120`のサポートを含むようになりました。これを導入するには、ツールの`type`を`code_execution_20260120`に設定してください。ベータヘッダーは不要です。これはClaude Fable 5、Claude Mythos 5、Claude Opus 4.5以降、およびClaude Sonnet 4.5以降で利用可能です。[モデル互換性表](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#model-compatibility)を参照してください。