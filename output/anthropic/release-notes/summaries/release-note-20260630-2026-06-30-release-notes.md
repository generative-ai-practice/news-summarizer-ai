---
title: "2026-06-30 release notes"
published: "2026-06-30"
collected_at: "2026-06-30T18:51:52.183Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-30-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年6月30日 リリースノート

- 当社は、Sonnetモデルファミリーの次世代モデルであるClaude Sonnet 5 (`claude-sonnet-5`) をローンチしました。導入価格は2026年8月31日まで1Mトークンあたり$2 / $10です（それ以降は標準価格$3 / $15）。Claude Sonnet 5は、[1Mトークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows)、128kの最大出力トークンをサポートし、Claude Sonnet 4.6と同じツールセットとプラットフォーム機能を備えています。ただし、[Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models)はClaude Sonnet 5では利用できません。移行時には3つの動作変更が適用されます：[アダプティブ思考](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking)がデフォルトでオンになりました。手動拡張思考 (`thinking: {type: "enabled", budget_tokens: N}`) は削除され、400エラーを返します（Sonnet 4.6で非推奨となっていました）。サンプリングパラメータ (`temperature`、`top_p`、`top_k`) をデフォルト以外の値に設定すると、400エラーが返されます。Claude Sonnet 5は、同じテキストに対して約30%多くのトークンを生成する新しいトークナイザーも使用しています。詳細および移行のガイダンスについては、[Claude Sonnet 5の新機能](https://platform.claude.com/docs/en/about-claude/models/whats-new-sonnet-5)をご覧ください。