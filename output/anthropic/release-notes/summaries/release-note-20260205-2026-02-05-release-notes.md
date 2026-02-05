---
title: "2026-02-05 release notes"
published: "2026-02-05"
collected_at: "2026-02-05T17:43:03.413Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#february-5-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-02-05 リリースノート

- 当社は、複雑なエージェントタスクや長期的な作業のための最もインテリジェントなモデルである[Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6)をリリースしました。Opus 4.6では[適応的思考](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking) (`thinking: {type: "adaptive"}`)を推奨しており、手動思考 (`type: "enabled"` with `budget_tokens`) は非推奨となりました。Opus 4.6はアシスタントメッセージの事前入力に対応していません。[Claude 4.6の新機能](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-6)で詳細をご確認ください。
- [effortパラメーター](https://platform.claude.com/docs/en/build-with-claude/effort)が正式リリースされ（ベータ版ヘッダーは不要）、Claude Opus 4.6をサポートします。Effortは、新しいモデルでの思考の深さを制御するために`budget_tokens`を置き換えます。
- [compaction API](https://platform.claude.com/docs/en/build-with-claude/compaction)をベータ版としてリリースしました。これは、実質的に無限の会話のためのサーバーサイドのコンテキスト要約を提供します。Opus 4.6で利用可能です。
- [データレジデンシー制御](https://platform.claude.com/docs/en/build-with-claude/data-residency)を導入しました。これにより、`inference_geo`パラメーターを使用してモデルの推論を実行する場所を指定できます。2026年2月1日以降にリリースされたモデルでは、米国のみでの推論が1.1倍の価格で利用可能です。
- [100万トークンコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows#1m-token-context-window)が、Sonnet 4.5およびSonnet 4に加え、Claude Opus 4.6でもベータ版として利用可能になりました。20万入力トークンを超えるリクエストには[ロングコンテキスト料金](https://platform.claude.com/docs/en/about-claude/pricing#long-context-pricing)が適用されます。
- [きめ細かいツールストリーミング](https://platform.claude.com/docs/en/agents-and-tools/tool-use/fine-grained-tool-streaming)が、すべてのモデルとプラットフォームで正式リリースされました（ベータ版ヘッダーは不要）。[構造化出力](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)の`output_format`パラメーターは`output_config.format`に移動しました。