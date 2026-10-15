---
title: "2026-09-17 changelog"
published: "2026-09-17"
collected_at: "2026-10-15T12:30:44.976Z"
url: "https://ai.google.dev/gemini-api/docs/changelog.md#2026-09-17"
source: "changelog"
source_medium: "Google Gemini API Docs"
language: "ja"
---

## Updates (translated)
# 2026-09-17 変更履歴

- **Antigravity Agent 09-2026** : `antigravity-preview-09-2026` をリリースしました。
- これは `antigravity-preview-05-2026` を置き換え、非推奨とします。
- リモートサンドボックス (`environment: "remote"`) で実行し、かつ
- `output_text` または `model_output` のステップのみを読み取る場合は、エージェント文字列を更新するだけで、
- その他は何も変更されません。
- ツールをローカル (`local_environment`) で実行するか、`function_call`
- ステップを解析する場合は、組み込みツールが変更されました。パラメーターは `snake_case` の代わりに
- `PascalCase` を使用し、ファイル編集は完全な書き換えではなく行範囲置換を使用します。
- | 機能 | 05-2026 | 09-2026 |
- |---|---|---|
- | ファイル作成 | `write_file(path, content)` | `write_to_file(TargetFile, CodeContent, Overwrite, Description)` |
- | ファイル編集 | `write_file(path, content)`、完全書き換え | `replace_file_content(TargetFile, StartLine, EndLine, TargetContent, ReplacementContent)` |
- | ファイル読み取り | `read_file(path, offset, limit)`、バイトオフセット | `view_file(AbsolutePath, StartLine, EndLine, ContentOffset)` |
- | ディレクトリ一覧表示 | `list_files(path)` | `list_dir(DirectoryPath)` |
- | ファイルとコード検索 | なし、エージェントはシェルコマンドを使用 | `find_by_name(SearchDirectory, Pattern, MaxDepth)` および `grep_search(SearchPath, Query, IsRegex)` |
- | シェル実行 | `code_execution(command, timeout_seconds)` | 変更なし |
- | ウェブ検索 | `google_search(queries)` | 変更なし |
- [Antigravity Agent](https://ai.google.dev/gemini-api/docs/antigravity-agent) ガイドを参照してください。
- `antigravity-preview-05-2026` は2026年10月5日にシャットダウンします。これは
- [非推奨](https://ai.google.dev/gemini-api/docs/deprecations#managed-agents) ページで追跡されています。