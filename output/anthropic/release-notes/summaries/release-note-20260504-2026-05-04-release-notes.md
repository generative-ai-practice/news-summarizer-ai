---
title: "2026-05-04 release notes"
published: "2026-05-04"
collected_at: "2026-06-23T16:23:18.778Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#may-4-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-05-04 リリースノート

- [Workload Identity Federation](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation) が一般提供開始となりました。長期間有効な静的APIキーの代わりに、お客様自身のIDプロバイダー（AWS IAM、Google Cloud、GitHub Actions、Kubernetes、Microsoft Entra ID、Okta、SPIFFEなど）から発行される短期間有効なOIDCトークンを使用して、ワークロードをClaude APIに認証できます。Claude Consoleで発行者とフェデレーションルールを設定すると、SDKがトークンの交換と更新を自動的に処理します。[認証](https://platform.claude.com/docs/en/manage-claude/authentication) を参照してください。