---
title: "Why Codex Security Doesn’t Include a SAST Report"
published: "2026-03-16"
collected_at: "2026-03-16T18:54:38.976Z"
url: "https://openai.com/index/why-codex-security-doesnt-include-sast"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Why Codex Security Doesn’t Include a SAST Report

## Key Points
- Codex Securityは、従来のSASTレポートから開始せず、リポジトリのアーキテクチャ、信頼境界、意図された振る舞いからAI駆動の制約推論と検証を用いて脆弱性を特定します。
- 従来のSASTはデータフローの問題に最適化されていますが、多くの脆弱性はセキュリティチェックが実際に意図したプロパティを保証しているか、または変換チェーンを通じて制約が正しく伝播するかどうかに起因し、SASTが判断しにくい領域です。
- Codex Securityは「チェックが存在する」だけでなく、「不変条件が保持されるか否か、そしてその証拠」を重視し、コードパスの完全なコンテキスト読解、小さなコードスライスのテスト、変換全体の制約推論、サンドボックス環境での仮説実行を通じて脆弱性を検証します。
- SASTレポートを起点としないのは、早期の分析の狭まり、ツール固有の暗黙的な判断の混入、およびエージェント自身の発見能力の正確な評価が困難になるためです。
- SASTツールはセキュアコーディング標準の適用や既知のデータフロー問題の検出に依然として重要ですが、Codex Securityはデータフロー以外の状態や不変条件に関する複雑な脆弱性の特定と検証に焦点を当てています。