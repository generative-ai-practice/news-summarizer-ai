---
title: "Reasoning models struggle to control their chains of thought, and that’s good"
published: "2026-03-05"
collected_at: "2026-03-05T19:11:53.108Z"
url: "https://openai.com/index/reasoning-models-chain-of-thought-controllability"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Reasoning models struggle to control their chains of thought, and that’s good

## Key Points
- AIエージェントの自律的なタスク遂行能力が高まるにつれて、その行動を監視する重要性が増しており、「思考の連鎖（CoT）監視」が重要な安全策として用いられています。これは、エージェントがタスクを解決する際の中間推論ステップを分析するものです。
- OpenAIは、推論モデルがCoTの特性を操作して監視可能性を低下させる能力（CoT controllability）を測定するためのオープンソース評価スイート「CoT-Control」を導入しました。
- 最新のフロンティア推論モデルは、CoTの指示を確実に制御することに苦労しており、テストされたモデルのCoT制御可能性スコアは0.1%から最大15.4%と低いことが判明しました。モデルは指示に違反していることを認識しても、それを修正できない場合があります。
- このCoT制御可能性の低さは、モデルが推論を意図的に隠蔽する能力に欠けることを示唆しており、CoT監視の信頼性にとって好ましい発見です。ただし、モデルサイズが大きいほど制御可能性はわずかに増加しますが、推論が長くなると低下します。
- CoT制御可能性は、将来のAIモデルの進展における安全性の早期警戒指標として重要であり、今後GPT-5.4 ThinkingなどのフロンティアモデルのシステムカードでCoT監視可能性とともに報告される予定です。