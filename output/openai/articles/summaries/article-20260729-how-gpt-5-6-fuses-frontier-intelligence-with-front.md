---
title: "How GPT-5.6 fuses frontier intelligence with frontier efficiency"
published: "2026-07-29"
collected_at: "2026-07-29T21:54:23.439Z"
url: "https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# How GPT-5.6 fuses frontier intelligence with frontier efficiency

## Key Points
- GPT-5.6モデルファミリーは、能力とコストのバランスを重視して設計され、主力モデルのSolはClaude Fable 5を凌駕する性能を持ちながら半額以下のコストを実現しています。TerraはGPT-5.5と同等のインテリジェンスを半額で提供し、Lunaは最速かつ最も手頃な価格でSolの80%安いです。
- これらの効率性は、モデル、推論（モデル出力生成）、およびCodexやChatGPT Workで利用されるエージェントハーネスの主要な各層における最適化によって達成されました。
- 推論の高速化は、ロードバランシングの改善、GPT-5.6 Solによるカーネルの自律的な最適化（サービスコストを20%削減）、投機的デコーディングの効率化（トークン生成効率を15%以上向上）、およびKVキャッシュ管理のハイパー最適化によって実現されています。
- エージェントハーネスは、コンテキストの肥大化を防ぐためにツールやプラグインを必要に応じて表示し、ツール出力の上限を設けることで効率化されています。また、プロンプトキャッシングを最大限に活用するため、モデルの履歴は追記型として扱われ、正確なプレフィックスが維持されます。
- GPT-5.6 Solは、本稿で紹介された多くの最適化（カーネルの自動書き換え、投機的デコーディング用ドラフトモデルの改善、推論構成の最適化など）を自律的に推進し、効率化のペースを加速させる役割を担っています。