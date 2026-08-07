---
title: "2026-08-07 release notes"
published: "2026-08-07"
collected_at: "2026-08-07T17:41:55.835Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#august-7-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-08-07 リリースノート

- Claude Managed Agentsセッションに予算を設定できるようになりました。これは、セッションの支出に対する厳格な上限で、公開されている定価で計算されます。予算に達したセッションは、新しいモデルリクエストを開始する代わりに`budget_reached`という停止理由で一時停止します。予算を変更または削除すると再開されます。デプロイメントは同じ予算を受け入れ、開始する各セッションに適用します。[セッションの予算](https://platform.claude.com/docs/en/managed-agents/budgets)をご覧ください。
- Claude Managed Agentsセッションにアドバイザーを付与できるようになりました。アドバイザーは、エージェント自身のモデルと同等以上の能力を持つモデルで、セッションのプライマリスレッドがターン中に戦略的ガイダンスを求めて相談できます。エージェントのマルチエージェント名簿に`{"type": "advisor"}`エントリとして設定し、相談する`model`を指定します。[セッションにアドバイザーを付与する](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#give-the-session-an-advisor)をご覧ください。
- Claude Managed Agentsエージェントのモデル推論がどこで実行されるかを制御できるようになりました。[エージェントを作成する](https://platform.claude.com/docs/en/managed-agents/agent-setup#create-an-agent)際に`model`オブジェクト内に`inference_geo`を設定するか、単一セッションに対してオーバーライドできます。利用可能な地理的リージョンと料金については、[データレジデンシー](https://platform.claude.com/docs/en/manage-claude/data-residency)をご覧ください。
- Claude Managed Agentsセッションが[GitHubリポジトリからスキルをロードする](https://platform.claude.com/docs/en/managed-agents/skills#load-skills-from-a-github-repository)ことができるようになりました。セッションが[リポジトリをマウントする](https://platform.claude.com/docs/en/managed-agents/github)と、そのルート`.claude/skills`ディレクトリ内のすべてのスキルがセッション開始時に自動的に検出され、そのセッションのエージェントで利用可能になります。