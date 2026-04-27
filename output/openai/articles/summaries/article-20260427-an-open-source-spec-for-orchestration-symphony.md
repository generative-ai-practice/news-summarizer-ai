---
title: "An open-source spec for orchestration: Symphony"
published: "2026-04-27"
collected_at: "2026-04-27T19:09:50.322Z"
url: "https://openai.com/index/open-source-codex-orchestration-symphony"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# An open-source spec for orchestration: Symphony

## Key Points
- SymphonyはCodexオーケストレーションのオープンソース仕様であり、イシュートラッカー（例: Linear）をコーディングエージェントのコントロールプレーンに変え、各オープンタスクにエージェントを継続的に割り当てて実行します。
- このシステム導入により、人間によるエージェントの直接監督によるコンテキストスイッチングのボトルネックが解消され、一部のチームではプルリクエストの完了数が500%増加するなど、開発生産性が大幅に向上しました。
- エージェントはタスクの分析、実装計画の作成、依存関係の定義、PRの管理、CIの監視など、より複雑な作業単位を自律的に処理し、新しい改善点を自らイシューとして起票することも可能です。
- Symphony自体もCodexによって構築され、Elixirを含む複数のプログラミング言語で実装が検証されており、その仕様は開発者が自身の環境に合わせたエージェントシステムを構築するための参照実装として公開されています。
- Symphonyはスタンドアロン製品として維持される予定はなく、Codex App Serverとさまざまなワークフローツールを連携させる例として、将来的なエージェント作業管理のボトルネックを解決する道筋を示しています。