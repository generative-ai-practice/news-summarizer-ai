---
title: "Harness engineering: leveraging Codex in an agent-first world"
published: "2026-02-11"
collected_at: "2026-02-11T18:55:28.244Z"
url: "https://openai.com/index/harness-engineering"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Harness engineering: leveraging Codex in an agent-first world

## Key Points
- OpenAIチームは、過去5ヶ月間で手動でコードが書かれていないソフトウェア製品（Codexエージェントがすべてのコードを生成）の社内ベータ版を開発・出荷し、開発時間を約1/10に短縮しました。
- エンジニアの役割は、コードを直接書くことから、Codexエージェントが効果的に作業できる環境の設計、意図の明確化、およびフィードバックループの構築へと変化しました。
- CodexエージェントがアプリケーションUI、ログ、アプリメトリクスを直接読み取れるようにすることで、バグの再現、修正の検証、UI動作の推論といったアプリケーションの可読性を高めました。
- リポジトリ内の知識を、巨大なマニュアルではなく、`AGENTS.md`を「目次」とする構造化された`docs/`ディレクトリを主要な情報源として扱い、エージェントのコンテキスト管理を最適化しました。
- 厳格な階層型ドメインアーキテクチャとカスタムリンターによる制約を導入し、コードベースの一貫性と品質を機械的に維持するとともに、「黄金の原則」と定期的なクリーンアッププロセスを通じて技術的負債を継続的に解消しています。