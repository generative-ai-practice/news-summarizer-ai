---
title: "2026-08-20 release notes"
published: "2026-08-20"
collected_at: "2026-08-21T20:16:51.611Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#august-20-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-08-20 リリースノート

- [Python SDK](https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/python)のv1.0をリリースしました。SDKのHTTP層が`httpx`から、メンテナンスされておりAPI互換性のあるフォークである[httpx2](https://httpx2.pydantic.dev/)に移行しました。カスタムの`http_client`、`Timeout`、およびトランスポートオブジェクトを`httpx2`から構築してください（`DefaultHttpxClient`ヘルパーは変更されていません）。`httpx`をパッチするトレースライブラリやモックライブラリに依存している場合は、起動時に`httpx2.alias_httpx()`を呼び出してください。v1.0はPython 3.10以降を必要とし、レガシーなText Completions API、Messagesメソッドにおける`temperature`、`top_p`、`top_k`パラメーター、およびツールランナーのクライアントサイドの`compaction_control`を含む、長らく非推奨であった機能群を削除します。非同期クライアントでは、`.with_raw_response`の結果が`await response.parse()`を必要とするようになりました。`AnthropicBedrock`は、AWSリージョンが設定されていない場合に、`us-east-1`にデフォルト設定する代わりにエラーを発生させるようになりました。変更点とビフォーアフターのコードスニペットについては、[v1移行ガイド](https://github.com/anthropics/anthropic-sdk-python/blob/main/MIGRATION.md)を参照してください。