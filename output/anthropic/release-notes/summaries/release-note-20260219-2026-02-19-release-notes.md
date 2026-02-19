---
title: "2026-02-19 release notes"
published: "2026-02-19"
collected_at: "2026-02-19T20:25:02.057Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#february-19-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-02-19 リリースノート

- Messages API向けに自動キャッシュを導入しました。リクエストボディに単一の `cache_control` フィールドを追加するだけで、システムが自動的に最後のキャッシュ可能なブロックをキャッシュし、会話が進むにつれてキャッシュポイントを前進させます。手動でのブレークポイント管理は不要です。既存のブロックレベルのキャッシュ制御と連携して、きめ細やかな最適化が可能です。Claude APIおよびAzure AI Foundry（プレビュー）で利用できます。詳細は[プロンプトキャッシュのドキュメント](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching)をご覧ください。
- Claude Sonnet 3.7モデル (`claude-3-7-sonnet-20250219`) およびClaude Haiku 3.5モデル (`claude-3-5-haiku-20241022`) を廃止しました。これらのモデルへのすべてのリクエストはエラーを返します。それぞれ[Claude Sonnet 4.6](https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison) および[Claude Haiku 4.5](https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison) へのアップグレードを推奨します。研究者は[外部研究者アクセスプログラム](https://support.claude.com/en/articles/9125743-what-is-the-external-researcher-access-program)を通じて継続的なアクセスをリクエストできます。
- Claude Haiku 3モデル (`claude-3-haiku-20240307`) の非推奨を発表しました。2026年4月19日に廃止予定です。[Claude Haiku 4.5](https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison) への移行を推奨します。詳細は[モデルの非推奨](https://platform.claude.com/docs/en/about-claude/model-deprecations)をご覧ください。