---
title: "2026-10-15 release notes"
published: "2026-10-15"
collected_at: "2026-10-16T00:55:37.781Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#october-15-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-10-15 リリースノート

- [Compliance API](https://platform.claude.com/docs/en/manage-claude/compliance-api)が、各組織メンバーがclaude.aiでClaudeへの指示として保存したテキスト、およびCoworkでグローバル指示として保存したテキストを返すようになりました。これはClaude Enterprise組織向けにベータ版として提供されます。既存のCompliance Access Keyと`read:compliance_user_data`スコープを使用して`GET /v1/compliance/organizations/{org_uuid}/user_preferences`を呼び出してください。[ユーザー設定をリスト表示する](https://platform.claude.com/docs/en/manage-claude/compliance-org-data#list-user-preferences)を参照してください。
- Claude Opus 5.5の[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)は研究プレビューを終了し、アクセスをリクエストする必要がなくなりました。Claude Opus 5.5へのリクエストでは`fast-mode-2026-02-01`ベータヘッダーが不要になり、引き続き送信されるリクエストも機能し続けます。Claude Opus 5.5には、Start、Build、Scaleの利用ティアでデフォルトの高速モードレート制限が設定されました。Claude Opus 5およびClaude Opus 4.8の高速モードは研究プレビューのままです。これらのモデルへの高速モードリクエストにはベータヘッダーを送信し続けてください。
- Claude Opus 5.5の[高速モード](https://platform.claude.com/docs/en/build-with-claude/fast-mode)が、Azureでホストされているデプロイメント向けに[Microsoft FoundryのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry)で利用可能になりました。