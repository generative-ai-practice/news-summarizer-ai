---
title: "Designing AI agents to resist prompt injection"
published: "2026-03-11"
collected_at: "2026-03-11T18:46:27.600Z"
url: "https://openai.com/index/designing-agents-to-resist-prompt-injection"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Designing AI agents to resist prompt injection

## Key Points
- プロンプトインジェクション攻撃は、単なる直接的な指示からソーシャルエンジニアリングの要素を含む複雑なものへと進化しており、AIファイアウォールのような入力フィルタリングだけでは不十分となっている。
- OpenAIは、人間に対するソーシャルエンジニアリングリスク管理と同様のアプローチをAIエージェントの設計に適用し、操作が成功した場合でもその影響を抑制するようにシステムを構築している。
- ChatGPTでは、ソーシャルエンジニアリングモデルと従来のソース-シンク分析を組み合わせることで、危険なアクションや機密情報の不正な送信を防止する防御策が取られている。
- 「Safe Url」という緩和策が開発されており、AIアシスタントが会話で得た情報を第三者に送信しようとする際にこれを検出し、ユーザーの確認を求めるか、またはアクションをブロックする。
- このセキュリティメカニズムは、Atlas、Deep Research、ChatGPT Canvas & Appsなどの他のOpenAIエージェントシステムにも適用され、潜在的なリスクに対するユーザーの同意が重視されている。