import * as cheerio from "cheerio";
import { BaseProvider } from "./base-provider";
import { Article, ArticleList } from "../../types/provider-info";
import { GeminiExtractor } from "../gemini-extractor";
import { RateLimiter } from "../rate-limiter";
import {
  buildOutputPath,
  ensureDir,
  generateSlug,
  generateTimestamp,
  loadJSON,
  saveJSON,
  saveText,
} from "../storage";

type ProcessedResult = {
  article: Article;
  summaryPath?: string;
  rawPath?: string;
  error?: unknown;
};

const log = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

export class GeminiNewsProvider extends BaseProvider {
  private readonly provider = "gemini";
  private readonly rssUrl = "https://blog.google/products/gemini/rss/";
  private readonly cutoffDate = "2025-12-01";
  private readonly dryRun: boolean;
  private readonly rssHtmlByUrl = new Map<string, string>();
  private currentNews: Article[] = [];
  private previousNews: Article[] = [];
  private newArticles: Article[] = [];
  private processed: ProcessedResult[] = [];

  constructor(
    private readonly extractor: GeminiExtractor,
    private readonly rateLimiter: RateLimiter,
    options?: { dryRun?: boolean },
  ) {
    super();
    this.dryRun = options?.dryRun ?? false;
  }

  async fetchRawData(): Promise<void> {
    const startedAt = Date.now();
    log(`[gemini-news] fetch RSS => ${this.rssUrl}`);
    const rss = await this.fetchRss(this.rssUrl);
    const parsed = this.parseRss(rss);
    const filtered = this.applyDateFilter(parsed);
    const slugCount = new Map<string, number>();
    this.currentNews = this.applySlugNormalization(filtered, slugCount);
    log(
      `[gemini-news] parsed articles=${this.currentNews.length} ms=${
        Date.now() - startedAt
      }`,
    );
  }

  async processData(): Promise<void> {
    const startedAt = Date.now();
    const latestNews =
      (await loadJSON<ArticleList>(
        buildOutputPath(this.provider, "articles", "latest-articles.json"),
      )) ?? undefined;
    this.previousNews = latestNews?.articles ?? [];
    const prevUrls = new Set(this.previousNews.map((a) => a.url));
    this.newArticles = this.currentNews.filter((a) => !prevUrls.has(a.url));
    log(`[gemini-news] new articles: ${this.newArticles.length}`);

    for (const article of this.newArticles) {
      const result = await this.fetchAndSummarize(article);
      this.processed.push(result);
    }

    const latestData: ArticleList = {
      provider: this.provider,
      lastChecked: generateTimestamp(),
      articles: this.currentNews,
    };

    if (!this.dryRun) {
      await ensureDir(buildOutputPath(this.provider, "articles"));
      await saveJSON(
        buildOutputPath(this.provider, "articles", "latest-articles.json"),
        latestData,
      );
    } else {
      log("[gemini-news] dry-run: latest-articles.json not written");
    }
    log(`[gemini-news] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    const startedAt = Date.now();
    if (this.newArticles.length === 0) {
      log(
        `[gemini-news] no new articles. total tracked=${this.currentNews.length}`,
      );
      log(`[gemini-news] generateReport done in ${Date.now() - startedAt}ms`);
      return;
    }
    const lines = [
      `Provider: ${this.provider} (news)`,
      `New articles: ${this.newArticles.length}`,
      ...this.processed.map((p) => {
        if (p.error) {
          return `- [FAILED] ${p.article.title} (${p.article.url})`;
        }
        return `- [OK] ${p.article.title} → summary: ${p.summaryPath ?? "dry-run"}, raw: ${p.rawPath ?? "dry-run"}`;
      }),
    ];
    console.log(lines.join("\n"));
    log(`[gemini-news] generateReport done in ${Date.now() - startedAt}ms`);
  }

  private parseRss(xml: string): Article[] {
    const $ = cheerio.load(xml, { xmlMode: true });
    const results: Article[] = [];
    $("item").each((_, el) => {
      const title = $(el).find("title").first().text().trim();
      const link = $(el).find("link").first().text().trim();
      const pub = $(el).find("pubDate").first().text().trim();
      const content = $(el).find("content\\:encoded").first().text().trim();
      if (!title || !link) return;
      const publishedDate = this.normalizeDate(pub) ?? "";
      if (content) this.rssHtmlByUrl.set(link, content);
      results.push({
        title,
        url: link,
        publishedDate,
        source: "news",
        slug: "",
        language: "en",
        summaryLanguage: "ja",
      });
    });
    return results;
  }

  private normalizeDate(raw: string): string | null {
    if (!raw) return null;
    const iso = raw.match(/(\d{4}-\d{2}-\d{2})/);
    if (iso) return iso[1];
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return null;
    const year = parsed.getUTCFullYear();
    const month = String(parsed.getUTCMonth() + 1).padStart(2, "0");
    const day = String(parsed.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private applyDateFilter(articles: Article[]): Article[] {
    return articles.filter((article) => {
      if (!article.publishedDate) return false;
      const dateStr = article.publishedDate.trim().split("T")[0] ?? "";
      if (dateStr.length !== 10) return false;
      return dateStr >= this.cutoffDate;
    });
  }

  private applySlugNormalization(
    articles: Article[],
    slugCount = new Map<string, number>(),
  ): Article[] {
    return articles.map((article) => {
      const baseSlug =
        article.slug && article.slug.length > 0
          ? article.slug
          : generateSlug(article.title, article.publishedDate);
      const count = slugCount.get(baseSlug) ?? 0;
      slugCount.set(baseSlug, count + 1);
      const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
      return {
        ...article,
        slug,
        summaryLanguage: article.summaryLanguage ?? "ja",
        language: article.language ?? "en",
      };
    });
  }

  private async fetchAndSummarize(article: Article): Promise<ProcessedResult> {
    try {
      const startedAt = Date.now();
      log(`[gemini-news] process: ${article.title} (${article.url})`);
      let html: string | null = null;
      try {
        html = await this.fetchHtml(article.url);
      } catch (fetchErr) {
        const fallback = this.rssHtmlByUrl.get(article.url);
        if (fallback) {
          log(
            `[gemini-news] fetch failed (${article.url}), using RSS content as fallback`,
          );
          html = fallback;
        } else {
          throw fetchErr;
        }
      }

      const updatedArticle: Article = {
        ...article,
        slug: generateSlug(article.title, article.publishedDate),
      };

      const summary = await this.extractor.generateArticleSummary(html, {
        title: updatedArticle.title,
        url: updatedArticle.url,
        publishedDate: updatedArticle.publishedDate,
        source: updatedArticle.source,
      });
      const cleanedSummary = this.stripMetaLines(summary);

      const rawPath = buildOutputPath(
        this.provider,
        "articles",
        "raw",
        `article-${updatedArticle.slug}.html`,
      );
      const summaryPath = buildOutputPath(
        this.provider,
        "articles",
        "summaries",
        `article-${updatedArticle.slug}.md`,
      );

      const header = [
        "---",
        `title: "${updatedArticle.title.replace(/"/g, '\\"')}"`,
        `published: "${updatedArticle.publishedDate || "N/A"}"`,
        `url: "${updatedArticle.url}"`,
        `source: "news"`,
        `source_medium: "Google Gemini Blog"`,
        `language: "ja"`,
        "---",
      ].join("\n");

      if (!this.dryRun) {
        await ensureDir(buildOutputPath(this.provider, "articles", "raw"));
        await ensureDir(
          buildOutputPath(this.provider, "articles", "summaries"),
        );
        await saveText(rawPath, html ?? "");
        await saveText(summaryPath, [header, "", cleanedSummary].join("\n"));
      }

      log(
        `[gemini-news] done: ${updatedArticle.title} ms=${
          Date.now() - startedAt
        }`,
      );
      return { article: updatedArticle, summaryPath, rawPath };
    } catch (error) {
      log("[gemini-news] failed to process article:", error);
      return { article, error };
    }
  }

  private stripMetaLines(content: string): string {
    const metaPatterns = [
      /^\*\*Published:\*\*/i,
      /^\*\*URL:\*\*/i,
      /^\*\*Source:\*\*/i,
      /^\*\*Language:\*\*/i,
      /^\*\*Source-Medium:\*\*/i,
    ];
    const lines = content.split("\n");
    const filtered = lines.filter((line) => {
      return !metaPatterns.some((re) => re.test(line.trim()));
    });
    while (filtered.length && filtered[0].trim() === "") filtered.shift();
    while (filtered.length && filtered[filtered.length - 1].trim() === "")
      filtered.pop();
    return filtered.join("\n");
  }

  private async fetchRss(url: string): Promise<string> {
    return this.rateLimiter.withRetry(async () => {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status}`);
      }
      return res.text();
    });
  }

  private async fetchHtml(url: string): Promise<string> {
    return this.rateLimiter.withRetry(async () => {
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      };
      const response = await fetch(url, { headers });
      if (response.ok) {
        return response.text();
      }
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    });
  }
}
