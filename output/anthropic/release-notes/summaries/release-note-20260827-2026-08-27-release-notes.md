---
title: "2026-08-27 release notes"
published: "2026-08-27"
collected_at: "2026-08-28T01:14:24.195Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#august-27-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-08-27 リリースノート

- Python SDK 1.2.0、TypeScript SDK 0.122.0、Go SDK 1.68.0、Java SDK 2.59.0、Ruby SDK 1.67.0、および C# SDK 12.44.0 において、`client.beta.files` および `client.beta.skills` は `files-api-2025-04-14` および `skills-2025-10-02` ベータヘッダーを送信しなくなり、`client.files` および `client.skills` と同じ形状を返します。この変更により、`client.beta.skills.delete()` はスキルとそのすべてのバージョンを一緒に削除し、ベータ版の Messages タイプ `BetaSkill`（コンテナースキル参照）は `BetaContainerSkill` に名称変更されます。ベータヘッダーを依然として送信するリクエストは、引き続きベータ版の形状を受け取ります。詳細については、[files-api-2025-04-14 からの移行](https://platform.claude.com/docs/en/build-with-claude/files#migrate-from-files-api-2025-04-14) および [skills-2025-10-02 からの移行](https://platform.claude.com/docs/en/build-with-claude/skills-guide#migrate-from-skills-2025-10-02) を参照してください。
- Claude コンソールで個人キーとサービスアカウントキーを作成できるようになりました。これらはあなたまたは[サービスアカウント](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation#service-accounts)として、同じ権限で機能し、リンクされたアカウントが組織から削除されると機能しなくなります。これにより、組織管理者は各アカウントの利用状況をより簡単に追跡し、キーの使用が正当であることを確認できます。これらのAPIキーは、特定のワークスペースにスコープ設定することも、アカウントがアクセスできる[管理者エンドポイントおよび任意のワークスペースで機能](https://platform.claude.com/docs/en/manage-claude/authentication#select-a-workspace)させることもできます。ワークスペースAPIキーは、レガシーオプションとして引き続きサポートされます。詳細については、[APIキー](https://platform.claude.com/docs/en/manage-claude/authentication#api-keys)を参照してください。