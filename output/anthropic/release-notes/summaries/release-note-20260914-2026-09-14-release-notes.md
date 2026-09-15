---
title: "2026-09-14 release notes"
published: "2026-09-14"
collected_at: "2026-09-15T17:51:14.068Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-14-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026年9月14日 リリースノート

- Messages APIは、`compact-2026-09-04`ベータヘッダーを用いてベータ版として、Claude APIで[オンデマンドで会話を要約](https://platform.claude.com/docs/en/build-with-claude/compaction#compact-on-demand-with-the-compaction-parameter)できるようになりました。トップレベルの`compaction`パラメーターを送信すると、APIは、送信したメッセージを要約した署名付き`compaction`ブロックを返します。以降のリクエストでは、それらのメッセージの代わりにそのブロックを最初に送信します。要約のタイミングは任意であり、リクエストはバックグラウンドで実行でき、要約後も最近のやり取りを逐語的に維持できます。思考が保存されるモデルでは、維持されたやり取りの思考は有効なままです。