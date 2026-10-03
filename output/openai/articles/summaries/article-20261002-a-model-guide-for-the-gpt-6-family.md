---
title: "A model guide for the GPT-6 family"
published: "2026-10-02"
collected_at: "2026-10-03T10:57:05.446Z"
url: "https://openai.com/index/practical-guide-building-gpt-6"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# A model guide for the GPT-6 family

## Key Points
-   **本番環境での効率的な運用:** コンテキストとコスト管理のためにキャッシュとコンパクションを活用し、タスクの成功率、遅延、およびデータ制御の計画と監視が重要です。
-   **ワークロードに合わせたモデル選択:** タスクに応じて、GPT-6 Astra（最高知能）、GPT-6.1 Sol（複雑なコーディングや研究）、GPT-6 Luna（日常的な繰り返し作業）の中から最適なモデルを選び、推論レベルと速度（Fastモード、Ultrafast）を調整して能力、コスト、レイテンシーのバランスを取ります。
-   **プロンプトとスキルの最適化:** モデルが何を達成すべきか、独自に実行できること、そして「完了」の定義について、プロンプト、スキル、リポジトリの指示を一貫させる必要があります。
-   **長期実行タスクの管理:** APIではステアリング、非同期ツール、委譲を、Codexでは作業中の質問とステアリングを利用して、更新や独立した作業を効果的に処理し、ユーザー入力が必要なタイミングを明確にします。