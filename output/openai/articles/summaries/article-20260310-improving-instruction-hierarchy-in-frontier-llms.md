---
title: "Improving instruction hierarchy in frontier LLMs"
published: "2026-03-10"
collected_at: "2026-03-10T18:40:00.233Z"
url: "https://openai.com/index/instruction-hierarchy-challenge"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Improving instruction hierarchy in frontier LLMs

## Key Points
- LLMが複数の情報源からの指示を優先順位付けする際、信頼できない指示に従うことによる安全性・信頼性の問題に対処するため、命令階層の改善が不可欠である。
- OpenAIのモデルは「System > developer > user > tool」という命令階層に従うよう訓練され、この訓練には、単純で客観的に評価可能、かつ安易なショートカットを排除した強化学習データセット「IH-Challenge」が使用される。
- IH-Challengeで訓練されたモデル「GPT-5 Mini-R」は、命令階層ベンチマークおよび敵対的テストで性能が向上し、過剰な拒否に陥ることなく全体の有用性を維持する。
- 命令階層の強化により、安全性ステアリングが向上し、システムプロンプトの安全ポリシーにより適切に対応できるようになり、また悪意のあるツール出力からのプロンプトインジェクション攻撃への堅牢性も高まる。
- AIシステムがより自律的になるにつれて、信頼された指示を優先する能力は中核的な安全特性となり、OpenAIはさらなる研究を支援するためにIH-Challengeデータセットを公開している。