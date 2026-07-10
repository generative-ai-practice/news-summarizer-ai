---
title: "2026-07-02 release notes"
published: "2026-07-02"
collected_at: "2026-07-10T05:57:35.090Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#july-2-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-07-02 リリースノート

- `agent-memory-2026-07-22`ベータヘッダーを追加しました。これにより、[メモリーのリスト表示](https://platform.claude.com/docs/en/managed-agents/memory#list-memories)（`GET /v1/memory_stores/{memory_store_id}/memories`）の動作が変更されます。結果は安定したサーバー定義の順序で返され、`order_by`および`order`パラメーターは無視されます。`depth`は`0`、`1`、または省略のみを受け入れ（その他の値は`400`エラーを返します）、`path_prefix`は`/`で終わる必要があり、部分文字列ではなくパスセグメント全体に一致します。このヘッダーなしで発行されたページカーソルは、このヘッダーでは有効ではないため、採用する際は最初のページからやり直してください。メモリーストアのエンドポイントでは、`agent-memory-2026-07-22`が`managed-agents-2026-04-01`を置き換えます。両方を送信すると`400`エラーが返されます。2026年7月22日には、`managed-agents-2026-04-01`ヘッダーも同じリスト動作を採用します。[ベータヘッダー](https://platform.claude.com/docs/en/api/beta-headers#endpoint-specific-headers)を参照してください。
- Python (0.116.0)、TypeScript (0.110.0)、Go (1.56.0)、Java (2.48.0)、Ruby (1.55.0)、PHP (0.36.0)、C# (12.35.0)、およびCLI (1.16.0) のSDKは、`managed-agents-2026-04-01`の代わりに、すべてのメモリーストア呼び出しで`agent-memory-2026-07-22`を送信するようになりました。もしコードがメモリーストア呼び出しで`betas`を明示的に渡している場合、2つ目の値を追加するのではなく、`managed-agents-2026-04-01`を`agent-memory-2026-07-22`に置き換えてください。