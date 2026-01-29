---
title: "Inside OpenAI’s in-house data agent"
published: "2026-01-29"
collected_at: "2026-01-29T18:36:40.010Z"
url: "https://openai.com/index/inside-our-in-house-data-agent"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Inside OpenAI’s in-house data agent

## Key Points
- OpenAIは、GPT-5.2やCodexなどの社内ツールを活用し、600ペタバイトを超える社内データから数分でインサイトを生成するカスタムAIデータエージェントを開発しました。このエージェントは、エンジニアリングから研究まで幅広いチームのデータ分析を支援します。
- エージェントは、テーブル利用状況、人間による注釈、Codexによるコードレベルのエンリッチメント、社内知識、記憶、ランタイムコンテキストといった多層的な情報源に基づいて推論を行います。また、中間結果に誤りがあれば自己修正を試みる「クローズドループの自己学習プロセス」を備えています。
- エージェントの品質は、OpenAI Evals APIを使用して、質問と「ゴールデン」SQLクエリのペアに基づき継続的に評価されます。セキュリティ面では、既存のアクセス制御モデルに直接組み込まれており、ユーザーは許可されたデータのみにアクセスでき、推論プロセスは透明に公開されます。
- 開発を通じて、「Less is More（機能は少ない方が良い）」、「Guide the Goal, Not the Path（目標を指示し、経路は任せる）」、「Meaning Lives in Code（意味はコードに宿る）」という3つの重要な教訓が得られました。これにより、エージェントの信頼性と堅牢性が向上しました。