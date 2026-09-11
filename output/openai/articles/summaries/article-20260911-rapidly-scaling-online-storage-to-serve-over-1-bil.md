---
title: "Rapidly scaling online storage to serve over 1 billion ChatGPT users"
published: "2026-09-11"
collected_at: "2026-09-11T18:05:16.872Z"
url: "https://openai.com/index/scaling-storage-one-billion-users-part-one"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Rapidly scaling online storage to serve over 1 billion ChatGPT users

## Key Points
- Habitatは、OpenAI製品向けに構築されたオンラインストレージプラットフォームで、2026年9月11日現在、週に10億人以上のユーザーをサポートし、毎秒7000万件以上のリクエストと500ペタバイト以上のデータを処理しています。
- 2024年半ばにシンプルなPythonライブラリとして開始されたHabitatは、急成長に伴う複雑性と運用上の課題から、2025年半ばには独立したサービスへと移行し、デプロイメントとプラットフォーム強化を一元化しました。
- Pythonサービスとして大規模運用する際の主な課題は、asyncioスケジューリング遅延と接続プールの負荷分散の偏りであり、これらはCPUプロファイリング、FIFO接続再利用、およびEnvoyの活用によって改善されました。
- 2026年第2四半期には、わずか2人のエンジニアとCodex、GPT-5.5の助けを借りてサービス全体をRustで書き換え、Python版と比較してCPU効率が6倍、メモリ効率が15倍向上し、レイテンシも大幅に削減されました。
- Habitatは、予測可能で一定の負荷のリクエストに最適化された制約のあるNoSQL APIを採用しており、複雑なクエリはRocksetを介したオフラインのセカンダリビューで処理することで、オンラインストレージの安定性とスケーラビリティを確保しています。