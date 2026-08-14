---
title: "How Claude’s text watermark works"
published: "2026-08-14"
collected_at: "2026-08-14T20:23:32.130Z"
url: "https://www.anthropic.com/news/claude-text-watermark"
source: "news"
source_medium: "Anthropic News"
language: "ja"
---

# How Claude’s text watermark works

## Key Points
- 将来のClaudeモデルはEU AI Act遵守のためテキストに透かしを生成する予定で、これはClaudeがテキスト作成に関与した可能性を判断する方法です。この変更は2026年8月2日からのEUの要件に対応するもので、他の主要なAIプロバイダーも同様の措置を講じます。
- この透かしは、Claudeが単語を選択する際のランダム性の「源」を変更することでパターンを残し、テキストの品質や内容、読者の可読性には実質的な影響を与えません。隠し文字や追加トークンはなく、モデルの速度やコストにも影響はありません。
- 透かしはGoogle DeepMindが2024年に発表したSynthID-Textアプローチのバージョンを使用しており、個別のユーザーや組織、チャットを特定する情報は含まれません。
- 透かしはClaudeが単語を選択する箇所に適用されるため、人間が書いたテキストの軽微な校正や、正確な出力が求められるコード本体、事実に基づいた記述などでは検出が限定的になる場合があります。
- Anthropicは透かし検出APIの提供を予定しており、画像などのファイルにはC2PAというオープンな業界標準のコンテンツクレデンシャルがメタデータに付加されます。