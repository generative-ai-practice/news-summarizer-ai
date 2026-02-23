---
title: "Why we no longer evaluate SWE-bench Verified"
published: "2026-02-23"
collected_at: "2026-02-23T18:55:31.523Z"
url: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Why we no longer evaluate SWE-bench Verified

## Key Points
- SWE-bench Verifiedは、自律型ソフトウェアエンジニアリングタスクにおけるモデルの進捗を測定するために広く利用されてきたが、現在ではフロンティアモデルの能力を正確に測れていない。
- 主な問題として、テストケースの欠陥（監査された問題の59.4%に欠陥があり、正しい解答を拒否するケースなど）と、訓練データへの汚染（モデルが訓練中に問題やその解答に触れてしまうこと）が挙げられる。
- この汚染により、モデルは訓練データからオリジナルのバグ修正（ゴールドパッチ）や問題記述の具体的な内容を逐語的に再現できることが判明した。
- そのため、SWE-bench Verifiedでのスコア改善は、モデルの実際のソフトウェア開発能力の向上ではなく、訓練時におけるベンチマークへの露出度を反映している。
- OpenAIはSWE-bench Verifiedのスコア報告を中止し、他の開発者にも同様の措置を推奨するとともに、より汚染の少ないSWE-bench Proの利用、または新たな評価方法の構築を提言している。