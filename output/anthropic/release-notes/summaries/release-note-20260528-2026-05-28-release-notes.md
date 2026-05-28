---
title: "2026-05-28 release notes"
published: "2026-05-28"
collected_at: "2026-05-28T17:32:12.340Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#may-28-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年5月28日リリースノート

- 一般提供されているモデルの中で最も高性能なClaude Opus 4.8 (claude-opus-4-8) をリリースしました。Claude Opus 4.8は、Claude API、Amazon Bedrock、Vertex AIではデフォルトで[1Mトークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows)（Microsoft Foundryでは200k）、最大128kの出力トークンをサポートし、Claude Opus 4.7と同じツールセットとプラットフォーム機能を備えています。機能改善、新機能、移行ガイダンスについては、[Claude Opus 4.8の新機能](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-8)をご覧ください。
- [会話途中のシステムメッセージ](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages)をリリースしました。Claude Opus 4.8では、ユーザーの発言の後（[配置ルール](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#limitations)に従う）、`messages`配列に`role: "system"`メッセージを送信できます。これにより、長期間にわたるセッション中に指示が変更された場合でも、プロンプトキャッシュのヒットを維持します。ベータヘッダーは不要です。
- 拒否応答の[`stop_details`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#refusal-categories)フィールドが公式に文書化されました。このフィールドは`category`（`cyber`、`bio`、または`null`）と人間が読める`explanation`を返し、アプリケーションが異なる種類の拒否を適切な次のステップにルーティングできるようになります。ベータヘッダーは不要です。
- Claude Opus 4.8では、Claude CodeとMessages APIを含むすべてのインターフェースで、[effortパラメータ](https://platform.claude.com/docs/en/build-with-claude/effort)のデフォルト値が`high`になりました。
- Claude Opus 4.8では、[プロンプトキャッシュ](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)の最小キャッシュ可能プロンプト長が1,024トークンとなり、Claude Opus 4.7よりも短くなりました。
- [適応型思考](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking)を有効にすると、Claude Opus 4.8はターンが必要な場合にのみ推論をトリガーし、同じ努力レベルのClaude Opus 4.7と比較して無駄な思考トークンを削減します。
- Claude Opus 4.8は、Claude Opus 4.7と同様に、[高解像度画像入力](https://platform.claude.com/docs/en/build-with-claude/vision#high-resolution-image-support-on-claude-opus-4-7)（長辺で最大2576ピクセル）をサポートしています。
- [タスク予算](https://platform.claude.com/docs/en/build-with-claude/task-budgets)がClaude Opus 4.8をサポートするようになりました。
- [アドバイザーツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool)がClaude Opus 4.8をサポートするようになりました。
- [コンピューター利用](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)がClaude Opus 4.8をサポートするようになりました。
- Claude Opus 4.8の[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)は、Claude APIのみで研究プレビューとして利用可能です。
- サンプリングパラメータ`temperature`、`top_p`、または`top_k`をデフォルト以外の値に設定すると、Claude Opus 4.7と同様にClaude Opus 4.8で400エラーが返されます。詳細は[移行ガイド](https://platform.claude.com/docs/en/about-claude/models/migration-guide)を参照してください。
- Claude Codeでは、長時間実行タスク向けにAutoモードをより多くのユーザーに拡大しました。[Claude Codeドキュメント](https://code.claude.com/docs)を参照してください。
- Claude Codeでは、MaxプランユーザーはClaude Opus 4.8でデフォルトで[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)を使用するようになりました。[Claude Codeドキュメント](https://code.claude.com/docs)を参照してください。
- Claude Codeでは、ワークフローが研究プレビューとして利用可能になり、複数ステップのエージェントプランを定義して実行できるようになります。[Claude Codeドキュメント](https://code.claude.com/docs)を参照してください。
- Claude Opus 4.6の[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)は非推奨となり、リリースから約30日後に削除されます。Claude Opus 4.8またはClaude Opus 4.7の高速モードに移行してください。[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode#supported-models)で詳細をご覧ください。
- 本リリースにおけるclaude.ai、Cowork、Claude for Microsoft 365、およびその他のClaudeアプリの更新については、[Claudeアプリのリリースノート](https://support.claude.com/en/articles/12138966-release-notes)を参照してください。