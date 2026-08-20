---
title: "2026-08-20 changelog"
published: "2026-08-20"
collected_at: "2026-08-20T21:21:20.225Z"
url: "https://platform.openai.com/docs/changelog#2026-08-20"
source: "changelog"
source_medium: "OpenAI Platform Docs"
language: "ja"
---

## Updates (translated)
# 2026年8月20日 変更履歴

- OpenAI APIプラットフォームで[プロンプトキャッシュダッシュボード](https://platform.openai.com/settings/organization/usage?usage_section=prompt-caching)をリリースしました。時間の経過に伴うキャッシュヒット率、書き込みあたりのキャッシュ読み取り回数、キャッシュ読み取り、キャッシュ書き込み、未キャッシュトークンの内訳を追跡し、キャッシュ効率を理解し、改善の機会を特定できます。メトリクスはモデルとサービスティアでフィルタリングできます。
- Images APIおよびResponses APIの画像生成ツールにおいて、`gpt-image-2`および`gpt-image-2-2026-04-21`で透明な背景がプレビューで利用可能になりました。`background`を`transparent`に設定し、`png`または`webp`出力を利用してください。`jpeg`は透明な背景をサポートしていません。詳細については、[画像生成ガイド](https://platform.openai.com/api/docs/guides/image-generation#customize-image-output)をご覧ください。