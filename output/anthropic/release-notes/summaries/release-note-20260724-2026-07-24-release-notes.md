---
title: "2026-07-24 release notes"
published: "2026-07-24"
collected_at: "2026-07-24T18:13:06.814Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#july-24-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-07-24 リリースノート

- Claude Opus 4.8からの飛躍的な改善となるClaude Opus 5 (`claude-opus-5`) をリリースしました。Claude Opus 5は、[1Mトークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows)（デフォルトおよび最大の両方）、128kの最大出力トークン、および[思考](https://platform.claude.com/docs/en/build-with-claude/thinking)がデフォルトでオンになっています。料金はClaude Opus 4.8と同じくMTokあたり$5/$25です。これはClaude API、[Amazon BedrockのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock)、[Google CloudのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai)、および[Microsoft FoundryのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry)で利用可能です。新機能、動作変更、移行ガイドについては[Claude Opus 5の新機能](https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5)を、完全な仕様については[モデル概要](https://platform.claude.com/docs/en/about-claude/models/overview)をご覧ください。
- Claude Opus 5では、思考の無効化は`effort`が`high`以下の場合にのみ許可されます。`effort`が`xhigh`または`max`で`thinking: {"type": "disabled"}`を設定すると400エラーが返されます。これはClaude Opus 4.8からの破壊的変更です。詳細については、[Claude Opus 5の新機能](https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5#behavior-changes)をご覧ください。
- Claude Opus 5は、[effort](https://platform.claude.com/docs/en/build-with-claude/effort)の全段階（`low`、`medium`、`high`、`xhigh`、`max`）をサポートしており、能力が極めて重要な作業のための`max`レベルも含まれます。
- 会話途中でのツール変更がClaude Opus 5でベータ版になりました。プロンプトキャッシュを保持したまま、会話のターン間でツールを追加または削除できます。リクエストには`mid-conversation-tool-changes-2026-07-01`ベータヘッダーを含めてください。
- `fallbacks`パラメーターが`"default"`モードをサポートするようになりました。このモードは、拒否カテゴリ別にAnthropicが推奨するフォールバックモデルを適用します。サーバーサイドフォールバックはベータ版であり、`"default"`モードを使用するには`server-side-fallback-2026-07-01`ベータヘッダーが必要です。詳細については、[拒否とフォールバック](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback)をご覧ください。