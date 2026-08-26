---
title: "2026-08-26 release notes"
published: "2026-08-26"
collected_at: "2026-08-26T18:51:23.531Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#august-26-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年8月26日 リリースノート

- [Compliance API](https://platform.claude.com/docs/en/manage-claude/compliance-api)のセッションエンドポイントが、CoworkおよびClaude Codeセッション向けにベータ版を終了しました。[セッションのトランスクリプトを取得する](https://platform.claude.com/docs/en/manage-claude/compliance-sessions)を参照してください。
- [Compliance API](https://platform.claude.com/docs/en/manage-claude/compliance-api)のローカルセッションエンドポイントが、既存のCompliance Access Keyと`read:compliance_user_data`スコープを使用して、Claude Enterprise組織向けにベータ版として、Claude Scienceセッション（`product_surface`値が`claude_science`）と、Excel、PowerPoint、Word、OutlookにおけるMicrosoft 365向けClaudeセッション（`product_surface`値が`office_agents`で始まるもの）のトランスクリプトも返すようになりました。[ユーザーのマシン上のセッション](https://platform.claude.com/docs/en/manage-claude/compliance-sessions#retrieve-local-sessions)を参照してください。
- [Admin API](https://platform.claude.com/docs/en/manage-claude/admin-api)が、`ant` CLIおよびPython、TypeScript、C#、Go、Java、PHP、RubyのSDKの`client.beta.organization`配下で利用可能になりました。これらは組織情報、メンバー、招待、ワークスペースとそのメンバー、APIキー、レート制限、サービスアカウント、ワークロードIDフェデレーションのIssuerとルール、および顧客管理の暗号化キーをカバーしています。使用状況とコストレポート、およびClaude Enterpriseのユーザー管理と分析のエンドポイントは、引き続きcurlのみで利用可能です。CLIとSDKは、`ANTHROPIC_API_KEY`からAdmin APIキーを、または`ANTHROPIC_AUTH_TOKEN`から`org:admin` OAuthトークンを読み取ります。