---
title: "Introducing OpenAI Privacy Filter"
published: "2026-04-22"
collected_at: "2026-04-22T16:05:15.704Z"
url: "https://openai.com/index/introducing-openai-privacy-filter"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Introducing OpenAI Privacy Filter

## Key Points
- OpenAI Privacy Filterは、テキスト内の個人を特定できる情報（PII）を検出・匿名化するためのオープンウェイトモデルで、AIエコシステムのプライバシー保護強化を目的としています。
- このモデルは、フロンティアレベルの個人データ検出能力を持ち、高スループットのプライバシーワークフロー向けに設計されており、ローカルでの効率的な実行が可能です。
- PII-Masking-300kベンチマークでは、97.43%のF1スコアを達成し、コンテキスト認識型の検出により、幅広いPIIカテゴリをカバーします（例：private_person、account_number、secret）。
- 開発者は、このモデルを自身の環境で実行し、ユースケースに合わせてファインチューニングして、トレーニング、インデックス作成、ロギング、レビューのパイプラインに強力なプライバシー保護を組み込むことができます。
- 本日よりApache 2.0ライセンスでHugging FaceとGithubで利用可能であり、モデルアーキテクチャ、ラベル分類体系、制限事項などの詳細なドキュメントも提供されています。