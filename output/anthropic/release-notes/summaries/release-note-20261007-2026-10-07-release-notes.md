---
title: "2026-10-07 release notes"
published: "2026-10-07"
collected_at: "2026-10-08T08:14:20.240Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#october-7-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-10-07 リリースノート

- Claude Sonnet 5.5におけるプロンプトキャッシュの読み取り価格を、100万トークンあたり0.20米ドルから0.10米ドルに値下げしました。これは、基本入力価格の0.1倍ではなく0.05倍になります。キャッシュへの書き込みおよびその他の価格は変更ありません。[プロンプトキャッシングの料金](https://platform.claude.com/docs/en/about-claude/pricing#prompt-caching)を参照してください。
- 大量処理やレイテンシに敏感な作業向けに調整された、最も高性能なモデルであるClaude Haiku 5.5 (`claude-haiku-5-5`) をリリースしました。これは[1Mトークンのコンテキストウィンドウ](https://platform.claude.com/docs/en/build-with-claude/context-windows)、128kの最大出力トークン、および[effortパラメーター](https://platform.claude.com/docs/en/build-with-claude/effort)を用いた[アダプティブシンキング](https://platform.claude.com/docs/en/build-with-claude/thinking)を備えています。Claude API、[Amazon BedrockのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock)、[AWS上のClaudeプラットフォーム](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws)、[Google Cloud上のClaude](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai)、および[Microsoft FoundryのClaude](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry)で利用可能です。[Claude Haiku 5.5の新機能](https://platform.claude.com/docs/en/models/haiku-5-5/whats-new-haiku-5-5)を参照してください。
- Claude Haiku 4.5用に書かれたコードは、Claude Haiku 5.5では動作しなくなる可能性があります。手動の拡張思考 (`budget_tokens`) は400エラーを返し、アダプティブシンキングがデフォルトでオンになっているため、応答が`thinking`ブロックで始まることがあります。また、同じテキストでもより多くのトークンとしてカウントされます。[移行ガイド](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide)を参照してください。モデル固有のプロンプトパターンについては、[Claude Haiku 5.5のプロンプト作成](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5)を参照してください。
- PythonおよびTypeScript SDKには、ベータ版として[ブラウザ使用ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool)と[コンピュータ使用ツール](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)のクラスが追加されました。これらのいずれかをサブクラス化し、ご自身のブラウザまたはデスクトップ自動化に対してツールごとに1つのメソッドを記述します。SDKはツールループ、ブラウザ用に設定したURLおよびファイルポリシー、および承認コールバックを実行します。[SDKツールセットでのブラウザおよびコンピュータの使用](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-sdk)を参照してください。
- Claude MaxおよびTeamプランに月間APIクレジットが含まれるようになりました。それらの請求方法については、[MaxおよびTeamプランのAPIクレジット](https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers)を参照してください。
- Claude Managed Agentsにおいて、`limited`ネットワーキングを持つクラウド環境が、その`allowed_hosts`を`web_search`ツールと`web_fetch`ツールにも適用するようになりました。`allowed_hosts`に一致しないホスト上のURLに対する`web_fetch`呼び出しは、エージェントに`url_not_allowed`エラー結果を返します。`web_search`はそのようなホストからの結果を省略します。`allowed_hosts`にホストがリストされていない場合、どちらのツールもページや検索結果を返しません。`allow_package_managers`と`allow_mcp_servers`はこれらのツールにホストを追加しません。ツールがホストに到達できるようにするには、そのホストを`allowed_hosts`に追加してください。これにより、そのホストはサンドボックスにも開かれます。`unrestricted`ネットワーキングおよび自己ホスト型環境はこれらのツールを制限しません。[環境ネットワーキング](https://platform.claude.com/docs/en/managed-agents/environments#networking)を参照してください。
- `limited`ネットワーキングを使用する場合、有効なウェブツールの`allowed_domains`に`allowed_hosts`内にないエントリがある場合、セッションの作成は400エラーで失敗します。そのようなエントリを追加するセッション更新も同様です。`allowed_hosts`のエントリは、`*.`で始まらない限り、1つの正確なホストに一致します。したがって、`docs.example.com`は`["example.com"]`内にはありません。このエラーを修正するには、そのホストを`allowed_hosts`に追加するか、`allowed_domains`からエントリを削除してください。[ウェブ検索とウェブフェッチのドメインを制限する](https://platform.claude.com/docs/en/managed-agents/tools-web-restrictions)を参照してください。
- Claude Managed Agentsにおいて、[`web_fetch`ツール](https://platform.claude.com/docs/en/managed-agents/tools#available-tools)は、セッション中に既に現れたURLのみをフェッチするようになりました。例えば、ユーザーメッセージのテキスト内、`web_search`の結果内、または`web_fetch`が以前に返したページ内などです。これにより、データ漏洩のリスクが低減されます。Claude自身の出力、エージェントのシステムプロンプト、添付文書、または`bash`、`read`、MCPツールなどのツールの出力にのみ現れるURLはカウントされません。それに対する`web_fetch`呼び出しは、エージェントに`url_not_in_prior_context`エラー結果を返します。エージェントにURLをフェッチさせるには、`user.message`イベントのテキストでURLを送信してください。