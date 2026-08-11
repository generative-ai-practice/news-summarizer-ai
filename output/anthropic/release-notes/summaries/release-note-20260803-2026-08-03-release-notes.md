---
title: "2026-08-03 release notes"
published: "2026-08-03"
collected_at: "2026-08-11T17:51:55.449Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#august-3-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年8月3日 リリースノート

- [Compliance API](https://platform.claude.com/docs/en/manage-claude/compliance-api) が、claude.aiのウェブまたはモバイルで開始されたCoworkセッションのトランスクリプトを返すようになりました（Claude Enterprise組織向けベータ版）。
- `GET /v1/compliance/apps/sessions/remote` はセッションを一覧表示し、`GET /v1/compliance/apps/sessions/remote/{session_id}/messages` は、`read:compliance_user_data` スコープを持つ既存のCompliance Access Keyを使用して、1つのセッションのトランスクリプトを返します。
- 詳細については、[リモートセッションの取得](https://platform.claude.com/docs/en/manage-claude/compliance-content-data#retrieve-remote-sessions)を参照してください。