---
title: "Gemini API tooling updates: context circulation, tool combos and Maps grounding for Gemini 3"
published: "2026-03-17"
collected_at: "2026-03-18T17:01:06.338Z"
url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tooling-updates/"
source: "news"
source_medium: "Google Gemini Blog"
language: "ja"
---

# Gemini API tooling updates: context circulation, tool combos and Maps grounding for Gemini 3

## Key Points
- 開発者は、Google Searchなどの組み込みツールとカスタム関数を単一のGemini API呼び出し内で組み合わせ、エージェント的で複雑なツール使用アプリケーションを構築できるようになりました。
- 組み込みツール間でコンテキストを循環させる機能が追加され、モデルは多段階のワークフローにおいて、あるツールの出力を別のツールの入力として使用し、より複雑な推論を行うことができます。
- 非同期ツール実行時のデバッグと正確なマッピングのために、各ツール呼び出しに一意の呼び出し識別子（`id`）が導入されました。
- Gemini 3モデルファミリー向けにGrounding with Google Mapsのサポートが開始され、モデルは最新の空間データ、地域ビジネス情報、通勤時間、場所の詳細にアクセスできるようになりました。
- これらの機能には新しいInteractions APIの使用が推奨されており、サーバーサイドの状態管理と統一された推論トレースを活用できます。