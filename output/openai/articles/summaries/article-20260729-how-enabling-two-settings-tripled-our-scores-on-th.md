---
title: "How enabling two settings tripled our scores on the ARC-AGI-3 benchmark"
published: "2026-07-29"
collected_at: "2026-07-30T01:51:54.057Z"
url: "https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# How enabling two settings tripled our scores on the ARC-AGI-3 benchmark

## Key Points
- GPT-5.6 Solは当初、2DパズルゲームのARC-AGI-3ベンチマークで7.8%と低いスコアだったが、これはモデル自体の問題ではなく、API設定とハーネス設計に起因していた。
- 「推論の保持 (retained reasoning)」と「文脈圧縮 (compaction)」という2つのAPI設定を有効にした結果、GPT-5.6 SolのARC-AGI-3スコアが3倍に向上した。
- これらの設定により、モデルは以前の思考やアクションを記憶し、ゲームをゼロから解釈する時間を短縮し、より一貫した戦略を効果的に採用できるようになった。
- 改善された設定を使用することで、出力トークンも6分の1に削減され、効率性が大幅に向上した。
- ベンチマーク評価は、API設定、ハーネス設計、プロンプトの選択に大きく左右されるため、実世界のChatGPTやCodexと同じ設定を使用することが推奨されている。