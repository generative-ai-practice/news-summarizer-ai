---
title: "Our approach to EU text provenance rules"
published: "2026-10-05"
collected_at: "2026-10-08T18:19:14.919Z"
url: "https://openai.com/index/eu-text-provenance"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Our approach to EU text provenance rules

## Key Points
- OpenAIは、EU AI Actの要求に応えるため、AI生成テキストの来歴を機械可読にする「textGrain」ウォーターマーキング技術を導入します。これは、モデルの単語選択に不可視の統計的信号を追加するものです。
- API顧客は一部のモデルでウォーターマーキングをオプトイン可能であり、2026年10月5日から数週間以内に、EU圏内のChatGPTおよびCodexのテキスト出力に不可視のウォーターマークが追加される予定です。
- textGrainは他の検出方法より優れているものの、200トークン以下の短いテキストや、単語選択の柔軟性が低い内容（数学など）では検出が難しく、10%の単語置換で検出率が92%から66%に、25%の置換で17%に低下するなど、編集に弱いという限界があります。
- テキストウォーターマークは、人間の貢献度、コンテンツの所有権、ユーザーの特定、情報の正確性を保証するものではなく、検出されなくても人間が作成したと証明するものではありません。
- 技術、基準、証拠の進化に合わせてアプローチを継続的に改善し、検出器へのアクセスは当初、信頼性と責任ある利用法を評価・改善する承認された研究者や専門機関に限定されます。