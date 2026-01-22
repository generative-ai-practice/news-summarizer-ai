---
title: "Scaling PostgreSQL to power 800 million ChatGPT users"
published: "2026-01-22"
collected_at: "2026-01-22T21:17:56.284Z"
url: "https://openai.com/index/scaling-postgresql"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Scaling PostgreSQL to power 800 million ChatGPT users

## Key Points
- OpenAIはChatGPTおよびAPIのPostgreSQL負荷が過去1年で10倍以上に増加し、現在8億人のユーザーを支えています。
- 単一のAzure PostgreSQL Flexible Serverプライマリインスタンスと約50のリードレプリカからなるアーキテクチャで、毎秒数百万クエリ（QPS）を処理しています。
- 書き込み負荷の高いワークロードはAzure Cosmos DBのようなシャーディングシステムに移行し、PostgreSQLのプライマリ負荷を軽減しています。
- 負荷分散のために、PgBouncerによる接続プーリング、キャッシュのロック/リース機構、高・低優先度ワークロードの分離、多層でのレート制限などの最適化を導入しました。
- 今後、カスケードレプリケーションの導入によりリードレプリカをさらに拡大し、シャーディングされたPostgreSQLや代替の分散システムも検討していく予定です。