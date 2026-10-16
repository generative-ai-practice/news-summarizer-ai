---
title: "Our approach to EU text provenance rules"
published: "2026-10-05"
collected_at: "2026-10-16T13:44:25.793Z"
url: "https://openai.com/index/eu-text-provenance"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our approach to EU text provenance rules

## Key Points
- OpenAIはEU AI Actの要求に応えるため、API顧客向けに特定のモデルでテキスト透かしをオプトインで提供開始し、数週間以内にEU圏内のChatGPTおよびCodexのテキスト出力に不可視の透かしを追加します。
- OpenAIのテキスト透かし技術「textGrain」はモデルの単語選択に統計的信号を付与しますが、短いテキスト（例: 200トークンで検出率約80%）や編集（例: 400トークンで10%の単語を置換すると検出率が約92%から66%に低下）によって検出が困難になる場合があります。
- テキスト透かし検出ツールのアクセスは、その信頼性と責任ある利用法を評価・改善するため、現時点では承認された研究者および専門機関に限定されます。
- テキスト透かしは、人間の貢献度、コンテンツの所有権や責任、ユーザーの特定、情報の正確性を証明するものではなく、透かしが検出されないからといって人間が作成したことを意味しません。
- テキスト透かしは、オープンスタンダード、永続的な透かし、および画像や音声向けの既存検証ツール（openai.com/verify、Content Provenance API）を含む、OpenAIの多層的なコンテンツプロベナンスアプローチの一部です。