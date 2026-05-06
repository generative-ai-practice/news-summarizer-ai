---
title: "Unlocking large scale AI training networks with MRC (Multipath Reliable Connection)"
published: "2026-05-05"
collected_at: "2026-05-06T13:53:26.567Z"
url: "https://openai.com/index/mrc-supercomputer-networking"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Unlocking large scale AI training networks with MRC (Multipath Reliable Connection)

## Key Points
- MRC (Multipath Reliable Connection) は、OpenAIがAMD、Broadcom、Intel、Microsoft、NVIDIAと共同開発した新しいスーパーコンピューターネットワーキングプロトコルで、大規模AIトレーニングにおけるGPUネットワークの性能と回復力を向上させます。
- このプロトコルは、各ネットワークインターフェースを複数の低速な並列プレーンに分割するマルチプレーンネットワーク設計を可能にし、100,000以上のGPUをわずか2層のスイッチで接続することで、コスト削減と消費電力低減を実現します。
- MRCは、単一のデータ転送のパケットをネットワーク内の数百の異なるパスに分散して送信する「適応型パケットスプレー」を採用し、ネットワークコアの輻輳をほぼ排除し、同期トレーニング中のスループットのばらつきを最小限に抑えます。
- 動的ルーティングを無効にし、IPv6セグメントルーティング (SRv6) を利用して送信者がパケットのパスを直接指定することで、ネットワーク障害発生時にマイクロ秒単位での迂回を可能にし、動的ルーティングの複雑性とそれに伴う障害を排除します。
- 実際のトレーニングでは、毎分のリンク障害やTier-1スイッチの再起動があっても、MRCにより同期プリトレーニングジョブへの影響はほとんどなく、トレーニングを中断することなく保守作業を実行できる高い回復力と効率性を示しています。