---
title: "2026-07-22 release notes"
published: "2026-07-22"
collected_at: "2026-07-22T18:04:26.202Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#july-22-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-07-22 リリースノート

- Claude Managed Agentsエージェントのモデル設定で`effort`レベルを設定できるようになりました。[エージェントを作成する際](https://platform.claude.com/docs/en/managed-agents/agent-setup#create-an-agent)に、`model`オブジェクト内に`effort`を渡してください。各レベルの機能については、[Effort levels](https://platform.claude.com/docs/en/build-with-claude/effort#effort-levels)を参照してください。
- Claude Managed AgentsのWebhooksが、環境およびメモリストアのライフサイクルをカバーするようになりました。`environment.*`イベントタイプが4種類、`memory_store.*`イベントタイプが3種類です。ポーリングなしで、環境とメモリストアのライフサイクル変更に反応できます。詳細については、[Webhooksの購読](https://platform.claude.com/docs/en/managed-agents/webhooks#supported-event-types)のEnvironment eventsタブとMemory store eventsタブを参照してください。
- Claude Managed Agentsセッションを作成する際、初期イベントを[シードとして設定できるようになりました](https://platform.claude.com/docs/en/managed-agents/sessions#seed-the-session-with-initial-events)。`POST /v1/sessions`で、最大50個の`user.message`および`user.define_outcome`イベントを含む`initial_events`を渡してください。空でないリストを渡すと、同じ呼び出し内でエージェントループが開始されるため、作業を開始するための個別のイベント送信リクエストは不要です。
- Claude Managed Agentsエージェントを[更新する際](https://platform.claude.com/docs/en/managed-agents/agent-setup#update-an-agent)、`version`フィールドはオプションになりました。楽観的並行性制御のために指定することも（不一致の場合409エラーを返します）、または無条件に更新を適用するために省略することもできます。詳細については、[更新セマンティクス](https://platform.claude.com/docs/en/managed-agents/agent-setup#update-semantics)を参照してください。
- Claude Managed Agentsのセッションスレッドイベントストリームが、[イベントデルタ](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#event-deltas)をサポートするようになりました。`GET /v1/sessions/{session_id}/threads/{thread_id}/stream`は、セッションレベルストリームと同じ`event_deltas[]`クエリパラメータを受け入れるため、モデルが生成するサブエージェントのテキストをプレビューできます。接続は、読み取っているスレッドのみをプレビューします。詳細については、[セッションスレッドイベントのプレビュー](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#preview-session-thread-events)を参照してください。