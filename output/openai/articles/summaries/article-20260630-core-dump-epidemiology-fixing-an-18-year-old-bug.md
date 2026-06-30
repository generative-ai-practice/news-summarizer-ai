---
title: "Core dump epidemiology: fixing an 18-year-old bug"
published: "2026-06-30"
collected_at: "2026-06-30T17:01:23.725Z"
url: "https://openai.com/index/core-dump-epidemiology-data-infrastructure-bug"
source: "news"
source_medium: "OpenAI News"
language: "ja"
---

# Core dump epidemiology: fixing an 18-year-old bug

## Key Points
- OpenAIのデータインフラストラクチャであるRocksetで発生した稀なクラッシュは、当初原因不明であったが、大規模なコアダンプ分析によって解決されました。
- この分析により、クラッシュは特定のAzureホストでの「ハードウェア障害」と、GNU libunwindに18年前から存在した「レースコンディションバグ」という2つの独立した原因によるものであることが判明しました。
- ハードウェア障害は問題のあるホストを隔離することで解決され、libunwindのバグは例外処理中のごく短いレースウィンドウでシグナル配信によりスタックデータが破損する問題でした。これは、高い例外発生率とシグナル配信頻度によって最近顕在化し、libgccへの切り替えと修正パッチの適用で対処されました。
- この経験は、個別のデバッグを超え、クラッシュの集団データを高品質に分析する「疫学的」アプローチが、複雑なインフラストラクチャの問題を診断し解決する上で非常に強力であることを示しました。