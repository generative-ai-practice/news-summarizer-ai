---
title: "2026-09-03 release notes"
published: "2026-09-03"
collected_at: "2026-09-04T21:59:34.755Z"
url: "https://platform.claude.com/docs/en/release-notes/overview#september-3-2026"
source: "release-notes"
source_medium: "Claude Developer Platform"
language: "ja"
---

## Updates (translated)
# 2026-09-03 リリースノート

- ant CLIのバージョン1.30.0では、リポジトリ内のファイルからエージェント、環境、スキル、メモリストア、デプロイメントを作成および更新する`ant apply`が追加されました。各リソースをファイルに記述し、`ant apply`を実行し、表示されるプランを承認します。`claude-lock.json`ロックファイルをコミットすることで、後続の実行時に、自身のマシン上またはCIにおいて、新しいリソースを作成するのではなく、同じリソースを更新できるようになります。詳細については、[ant applyでリソースをコードとして管理する](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/apply)を参照してください。