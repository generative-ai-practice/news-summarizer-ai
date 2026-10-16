---
title: "A model guide for the GPT-6 family"
published: "2026-10-02"
collected_at: "2026-10-16T07:51:08.517Z"
url: "https://openai.com/index/practical-guide-building-gpt-6"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# A model guide for the GPT-6 family

## Key Points
- GPT-6ファミリーは、GPT-6 Astra（最高の知能と高コスト）、GPT-6.1 Sol（Astraに近い知能で価格は5分の1）、GPT-6 Luna（大規模な日常業務向けに高速かつ効率的、低コスト）の3つのモデルを提供し、ワークロードに合わせて選択できる。
- 本番環境での効果的な運用には、プロンプトキャッシング（キャッシュされた入力トークンは最大95%安価）やコンパクションによるコストとコンテキストの管理、タスクの成功率と遅延の測定、および挙動の監視とデータ制御の計画が不可欠である。
- プロンプトとスキルを最適化するには、モデルに明確な指示（目的、対象、関連するコンテキストと制約、完了の定義）を与え、自律的な行動の範囲とユーザー入力が必要な境界線を設定する必要がある。
- 長時間実行される複雑なタスクでは、APIにおけるステアリング、非同期ツール、マルチエージェントワークフロー（GPT-6.1 Solでベータ版）を活用し、Codexでは作業中の質問への回答や要件変更時の指示修正が推奨される。
- GPT-6 Astra、GPT-6.1 Sol、GPT-6 Lunaはコンピュータ使用機能を持ち、APIがないアプリケーションでも直接ウェブサイトやデスクトップアプリと連携してタスクを自動化できる。