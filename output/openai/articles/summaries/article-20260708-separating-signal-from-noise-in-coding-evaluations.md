---
title: "Separating signal from noise in coding evaluations"
published: "2026-07-08"
collected_at: "2026-07-08T22:00:56.633Z"
url: "https://openai.com/index/separating-signal-from-noise-coding-evaluations"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Separating signal from noise in coding evaluations

## Key Points
- OpenAIの新たな分析により、主要なコーディングベンチマークであるSWE-Bench Proに信頼性と正確性に関する問題が明らかになりました。
- 詳細な監査の結果、SWE-Bench Proのタスクの約30%が破損していると推定されており、データポイント分析パイプラインで200件（27.4%）、人間によるアノテーションで249件（34.1%）の問題が特定されました。
- 問題は主に「過度に厳密なテスト」「不明確なプロンプト」「カバレッジの低いテスト」「誤解を招くプロンプト」の4つのカテゴリに分類されます。
- モデルの能力を正確に測定するためにはベンチマークを厳密にチェックすることが重要であり、今回の分析結果を受けてOpenAIはSWE-Bench Proの採用推奨を撤回しました。