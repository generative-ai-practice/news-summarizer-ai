---
title: "Better prompt caching for GPT-6"
published: "2026-09-22"
collected_at: "2026-09-22T23:25:02.951Z"
url: "https://openai.com/index/better-prompt-caching-for-gpt-6"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Better prompt caching for GPT-6

## Key Points
- GPT-6はプロンプトキャッシングシステムを改善し、キャッシュヒット率を向上させ、キャッシュされた入力トークンに対して最大90%の割引を提供します。これにより、レイテンシーとコストを削減します。
- 新しいPrompt Caching Dashboardと診断ツールにより、開発者はキャッシュパフォーマンスを監視し、モデル、ツール、設定、入力の変更によるキャッシュミスを特定できます。
- 明示的なキャッシュブレークポイントを使用することで、どのプロンプトプレフィックスを再利用するかを選択でき、GPT-6モデルではキャッシュを中断せずに推論の労力を調整できます。
- ツール定義やスキーマの安定化、または新しい開発者メッセージの利用により、ツールや指示が変更されてもキャッシュを維持できます。また、キャッシュを事前にウォームアップすることで、初期応答時間を短縮できます。
- GitHub CopilotやStrawberry Browserなどの事例では、OpenAIのプロンプトキャッシングにより、プロンプトトークンの処理が50%以上削減され、推論コストが最大20%削減されるなど、大幅な効率改善が報告されています。