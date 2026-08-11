---
title: "2026-08-11 release notes"
published: "2026-08-11"
collected_at: "2026-08-11T17:51:45.970Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#august-11-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年8月11日 リリースノート

- [コンプライアンスAPI](https://platform.claude.com/docs/en/manage-claude/compliance-api)が、ユーザーのマシンで実行されるCoworkおよびClaude Codeセッションのトランスクリプトを返すようになりました。これはClaude Enterprise組織向けにベータ版として提供されます。`GET /v1/compliance/apps/sessions/local` は組織全体のセッションを一覧表示し、`GET /v1/compliance/apps/sessions/local/{session_id}` は1つのセッションのメタデータを取得し、`GET /v1/compliance/apps/sessions/local/{session_id}/messages` はそのトランスクリプトを返します。これらはすべて、既存のCompliance Access Keyと`read:compliance_user_data`スコープを使用します。詳細は[ローカルセッションの取得](https://platform.claude.com/docs/en/manage-claude/compliance-content-data#retrieve-local-sessions)を参照してください。