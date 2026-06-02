---
title: "2026-06-02 release notes"
published: "2026-06-02"
collected_at: "2026-06-02T22:18:27.451Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#june-2-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-06-02 リリースノート

-   [advisorツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool)は、アドバイザーモデルの呼び出しごとの出力を制限する `max_tokens` パラメーターをサポートするようになりました。これにより、完全な長さのアドバイザー応答を必要としないワークロードのレイテンシーと出力トークンコストを削減します。アドバイザー ツールの定義で `tools[].max_tokens` を設定してください。詳細については、[アドバイザー出力の制限](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#capping-advisor-output)を参照してください。
-   Claude APIでは、Claudeが何も出力を生成せずに `stop_reason: "refusal"` を返すリクエストに対しては、料金が請求されなくなりました。拒否の検出と処理については、[ストリーミング拒否](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/handle-streaming-refusals)を参照してください。