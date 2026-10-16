---
title: "2026-10-09 release notes"
published: "2026-10-09"
collected_at: "2026-10-16T00:55:51.683Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#october-9-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-10-09 リリースノート

- Claude Managed Agents エージェントが、`managed-agents-2026-04-01` ベータヘッダーを使用するとベータ版で、[動的ワークフロー](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#dynamic-workflows)を使用できるようになりました。数百ものドキュメントをレビューするような、多数の作業を伴う場合、エージェントはワークフローを作成できます。ワークフローとは、多くのエージェントを段階的に実行し、その結果を結合するプログラムです。サーバーはそれをバックグラウンドでワークフロー実行として実行します。[動的ワークフローを有効にする](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#turn-on-dynamic-workflows)には、エージェントの`multiagent`フィールドを`{"type": "multiagent_20261001", "workflows": {"type": "enabled"}}`に設定します。エージェントを誘導するには、システムプロンプトでいつ実行を開始するかを伝えます。各実行は、セッションのイベントストリーム上の`workflow_run.*`イベントを介して追跡できます。[ワークフロー実行](https://platform.claude.com/docs/en/managed-agents/workflow-runs)を参照してください。