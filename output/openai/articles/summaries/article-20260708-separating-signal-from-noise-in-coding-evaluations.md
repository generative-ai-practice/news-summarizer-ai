---
title: "Separating signal from noise in coding evaluations"
published: "2026-07-08"
collected_at: "2026-07-09T02:24:57.865Z"
url: "https://openai.com/index/separating-signal-from-noise-coding-evaluations"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Separating signal from noise in coding evaluations

## Key Points
- OpenAIの分析により、広く使用されているコーディングベンチマークSWE-Bench Proに広範なタスクの問題が発見され、AIモデル評価の信頼性と正確性について懸念が提起されています。
- 詳細な監査の結果、SWE-Bench Proのデータセットの約30%のタスクが「壊れている」と推定され、データポイント分析パイプラインでは27.4%、人間によるアノテーションキャンペーンでは34.1%のタスクに問題が見つかりました。
- 問題は主に、「過度に厳密なテスト」「仕様が不明確なプロンプト」「テストカバレッジが低いテスト」「誤解を招くプロンプト」の4つのカテゴリに分類されます。
- これらの発見は、公平で厳密なベンチマークのキュレーションが難しいことを示しており、モデル開発者には結果を慎重に検討するよう助言しています。
- 以前SWE-Bench Verifiedの代替としてSWE-Bench Proを推奨していましたが、この分析で問題が明らかになったため、OpenAIはその推奨を取り下げ、経験豊富なソフトウェア開発者によって構築された新しいベンチマークの開発を求めています。