---
title: "2026-07-14 release notes"
published: "2026-07-14"
collected_at: "2026-07-14T23:44:28.562Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#july-14-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-07-14 リリースノート

- Claude Enterprise (claude.ai) 組織内のユーザーを、すべてのClaude Enterprise組織でベータ版として利用可能な[Admin API](https://platform.claude.com/docs/en/api/admin)で管理できるようになりました。これには、メンバーのリスト表示とメールアドレスによる検索、メンバーのロール変更、メンバーの削除、招待の送信と取り消し、グループとそのメンバーシップの管理、およびカスタムロールの読み取りが含まれます。グループおよびカスタムロールのリクエストには `anthropic-beta: ce-user-management-2026-07-13` ベータヘッダーが必要です。メンバーおよび招待のリクエストにはベータヘッダーは不要です。`read:org_audit` スコープを持つAdmin APIキーは、すべてのユーザー管理 `GET` エンドポイントも呼び出すことができます。詳細は[ユーザー管理](https://platform.claude.com/docs/en/manage-claude/user-management)をご覧ください。