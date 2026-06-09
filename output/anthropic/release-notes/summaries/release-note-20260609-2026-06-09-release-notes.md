---
title: "2026-06-09 release notes"
published: "2026-06-09"
collected_at: "2026-06-09T19:13:44.128Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-9-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-06-09 release notes

- 当社は、これまでで最も高性能な広くリリースされたモデルであるClaude Fable 5 (`claude-fable-5`) を、Project Glasswing参加者向けのClaude Mythos 5 (`claude-mythos-5`) と共にリリースしました。両モデルは、デフォルトで[1Mトークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows)、128kの最大出力トークン、および常時オンの[アダプティブ思考](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking)をサポートしています。機能、APIの変更、利用可能性については、[Claude Fable 5とClaude Mythos 5の紹介](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)を参照してください。
- Claude Fable 5とClaude Mythos 5は、Claude Opus 4.7で導入されたトークナイザーを使用しています。Claude Opus 4.7以前のモデルと比較して、同じテキストでも約30%多くのトークンが生成されます。新しいトークナイザーでプロンプトを測定するには、`model: "claude-fable-5"`を指定して[トークンカウントAPI](https://platform.claude.com/docs/en/build-with-claude/token-counting#token-counts-on-claude-fable-5)を使用してください。
- Claude Fable 5は、リクエスト時および応答生成中に安全分類器を実行します。分類器がリクエストを拒否した場合、Messages APIは`stop_reason: "refusal"`を返します。出力が生成される前に拒否されたリクエストに対しては課金されません。オプトインの`fallbacks`パラメーター（Claude APIおよびAWS上のClaude Platformではベータ版。Message Batches APIではサポートされていません）は、拒否されたリクエストを別のモデルで再実行し、フォールバックモデルの料金で課金されます。[停止理由の処理](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons)を参照してください。
- 拒否応答の[`stop_details.category`](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response)フィールドに、Claude Fable 5では`"reasoning_extraction"`が含まれるようになりました。これは、Anthropicの利用規約によるモデル出力のリバースエンジニアリングまたは複製に関する制限の下でリクエストがブロックされた場合に返されます。既存の`"cyber"`および`"bio"`カテゴリは変更されていません。ベータヘッダーは不要です。
- Claude Fable 5とClaude Mythos 5では、[アダプティブ思考](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking)が唯一の思考モードです。`thinking: {"type": "disabled"}`はサポートされておらず、手動の拡張思考予算とアシスタントプリフィルはサポートされていません（どちらも400エラーを返します）。[Claude Mythos PreviewからClaude Mythos 5への移行](https://platform.claude.com/docs/en/about-claude/models/migration-guide#migrating-from-claude-mythos-preview)を参照してください。
- Claude Fable 5とClaude Mythos 5では、`thinking.display`はデフォルトで`"omitted"`であり、Claude Opus 4.8、Claude Opus 4.7、およびClaude Mythos Previewと同じです。読み取り可能な思考の要約を受け取るには、`display: "summarized"`を設定してください。生の思考連鎖は決して返されません。同じモデルでの複数ターンの会話では、思考ブロックをそのまま渡してください。[Claude Fable 5とClaude Mythos 5での思考出力](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking#thinking-output-on-claude-fable-5-and-claude-mythos-5)を参照してください。
- Claude Fable 5は、Claude APIでの30日間のデータ保持を必要とし、ゼロデータ保持では利用できません。[モデル固有のデータ保持要件](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements)を参照してください。