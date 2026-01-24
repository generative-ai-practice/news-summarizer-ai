import * as cheerio from "cheerio";
import { BaseProvider } from "./base-provider";
import { Article, ArticleList } from "../../types/provider-info";
import { GeminiExtractor } from "../gemini-extractor";
import { RateLimiter } from "../rate-limiter";
import { getProviderSourceUrl } from "../../../src/data/provider-sources";
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

export class OpenAINewsProvider extends BaseProvider {
  private readonly provider = "openai";
  private readonly rssUrl = getProviderSourceUrl("openai-news");
  private readonly cutoffDate = "2025-12-01";
  private readonly dryRun: boolean;
  private readonly rssHtmlByUrl = new Map<string, string>();
  private currentNews: Article[] = [];
  private previousNews: Article[] = [];
  private newArticles: Article[] = [];
  private processed: ProcessedResult[] = [];

  constructor(
    private readonly geminiExtractor: GeminiExtractor,
    private readonly rateLimiter: RateLimiter,
    options?: { dryRun?: boolean },
  ) {
    super();
    this.dryRun = options?.dryRun ?? false;
  }

  async fetchRawData(): Promise<void> {
    const startedAt = Date.now();
    log(`[openai-news] fetch RSS => ${this.rssUrl}`);
    const rss = await this.fetchRss(this.rssUrl);
    const parsed = this.parseRss(rss);
    const filtered = this.applyDateFilter(parsed);
    const slugCount = new Map<string, number>();
    this.currentNews = this.applySlugNormalization(filtered, slugCount);
    log(
      `[openai-news] parsed articles=${this.currentNews.length} ms=${
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
    const previousNewsUrls = new Set(this.previousNews.map((a) => a.url));
    this.newArticles = this.currentNews.filter(
      (article) => !previousNewsUrls.has(article.url),
    );
    log(`[openai-news] new articles: ${this.newArticles.length}`);

    for (const article of this.newArticles) {
      const result = await this.fetchAndSummarize(article);
      this.processed.push(result);
    }

    const failed = this.processed.filter((item) => item.error);
    const hasFailures = failed.length > 0;
    if (hasFailures) {
      log(
        "[openai-news] one or more articles failed; latest-articles.json not updated",
      );
      failed.forEach((item) => {
        log(
          `[openai-news] failed article: ${item.article.title} (${item.article.url})`,
        );
      });
    } else {
      const latestNewsData: ArticleList = {
        provider: this.provider,
        lastChecked: generateTimestamp(),
        articles: this.currentNews,
      };

      if (!this.dryRun) {
        await ensureDir(buildOutputPath(this.provider, "articles"));
        await saveJSON(
          buildOutputPath(this.provider, "articles", "latest-articles.json"),
          latestNewsData,
        );
      } else {
        log("[openai-news] dry-run: latest-articles.json not written");
      }
    }
    log(`[openai-news] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    const startedAt = Date.now();
    if (this.newArticles.length === 0) {
      log(
        `[openai-news] no new articles. total tracked=${this.currentNews.length}`,
      );
      log(`[openai-news] generateReport done in ${Date.now() - startedAt}ms`);
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
    log(`[openai-news] generateReport done in ${Date.now() - startedAt}ms`);
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
      if (content) {
        this.rssHtmlByUrl.set(link, content);
      }
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
      log(`[openai-news] process: ${article.title} (${article.url})`);
      let html: string | null = null;
      try {
        html = await this.fetchHtml(article.url);
      } catch (fetchErr) {
        const fallback = this.rssHtmlByUrl.get(article.url);
        if (fallback) {
          log(
            `[openai-news] fetch failed (${article.url}), using RSS content as fallback`,
          );
          html = fallback;
        } else {
          throw fetchErr;
        }
      }
      // HTML側の日付はRSSと大きくズレることがあるため、RSS日付を優先し、未設定の場合のみHTMLから補完する
      const refinedDate =
        !article.publishedDate && html
          ? this.refinePublishedDateFromHtml(html)
          : null;
      const finalDate = refinedDate ?? article.publishedDate;
      const updatedArticle: Article = {
        ...article,
        publishedDate: finalDate ?? "",
      };
      const baseSlug = generateSlug(
        updatedArticle.title,
        updatedArticle.publishedDate,
      );
      let slug = baseSlug;
      let counter = 1;
      while (
        this.currentNews.some(
          (a) => a.slug === slug && a.url !== updatedArticle.url,
        )
      ) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
      }
      updatedArticle.slug = slug;
      const idx = this.currentNews.findIndex((a) => a.url === article.url);
      if (idx >= 0) this.currentNews[idx] = updatedArticle;

      const summary = await this.geminiExtractor.generateArticleSummary(html, {
        title: updatedArticle.title,
        url: updatedArticle.url,
        publishedDate: updatedArticle.publishedDate,
        source: updatedArticle.source,
      });
      const cleanedSummary = this.stripMetaLines(summary);
      const safeTitle = article.title.replace(/"/g, '\\"');
      const collectedAt = generateTimestamp();
      const summaryWithFrontmatter = [
        "---",
        `title: "${safeTitle}"`,
        `published: "${updatedArticle.publishedDate || "N/A"}"`,
        `collected_at: "${collectedAt}"`,
        `url: "${updatedArticle.url}"`,
        `source: "news"`,
        `source_medium: "OpenAI News"`,
        `language: "ja"`,
        "---",
        "",
        cleanedSummary,
      ].join("\n");

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

      if (!this.dryRun) {
        await ensureDir(buildOutputPath(this.provider, "articles", "raw"));
        await ensureDir(
          buildOutputPath(this.provider, "articles", "summaries"),
        );
        await saveText(rawPath, html ?? "");
        await saveText(summaryPath, summaryWithFrontmatter);
      }

      log(`[openai-news] done: ${article.title} ms=${Date.now() - startedAt}`);
      return { article: updatedArticle, rawPath, summaryPath };
    } catch (error) {
      log(`[openai-news] Failed to process article: ${article.title}`, error);
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
      const response = await fetch(url, {
        headers: { "User-Agent": "provider-news-monitor/1.0" },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
        );
      }
      return response.text();
    });
  }

  private async fetchHtml(url: string): Promise<string> {
    return this.rateLimiter.withRetry(async () => {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
        );
      }
      return response.text();
    });
  }

  private refinePublishedDateFromHtml(html: string): string | null {
    const $ = cheerio.load(html);
    const candidates: string[] = [];
    const add = (v?: string | null) => {
      if (v && v.trim()) candidates.push(v.trim());
    };

    add($("time[datetime]").first().attr("datetime"));
    add($("time").first().text());

    [
      'meta[property="article:published_time"]',
      'meta[name="article:published_time"]',
      'meta[name="pubdate"]',
      'meta[name="publish-date"]',
      'meta[name="published"]',
      'meta[property="og:published_time"]',
    ].forEach((sel) => add($(sel).attr("content")));

    $('script[type="application/ld+json"]').each((_, el) => {
      const text = $(el).text();
      if (!text) return;
      try {
        const data = JSON.parse(text);
        const scan = (node: unknown) => {
          if (!node) return;
          if (Array.isArray(node)) {
            node.forEach(scan);
            return;
          }
          if (typeof node === "object") {
            const obj = node as Record<string, unknown>;
            const val =
              obj.datePublished ?? obj.dateCreated ?? obj.dateModified;
            if (typeof val === "string") add(val);
            Object.values(obj).forEach(scan);
          }
        };
        scan(data);
      } catch {
        // ignore JSON parse errors
      }
    });

    const regexIso = /datePublished["']?\s*[:=]\s*["']([^"']+)["']/i;
    const matchIso = html.match(regexIso);
    if (matchIso) add(matchIso[1]);

    const plainIso = html.match(
      /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[^"'\\s<]*)/,
    );
    if (plainIso) add(plainIso[1]);

    const jpDates = [...html.matchAll(/(\d{4})年(\d{1,2})月(\d{1,2})日/g)].map(
      (m) => `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`,
    );
    jpDates.forEach((d) => add(d));

    let best: { date: string; ms: number } | null = null;
    const asJstDate = (raw: string): string | null => {
      if (!raw.includes("T")) return null;
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) return null;
      const fmt = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return fmt.format(parsed);
    };
    const toMillis = (date: string): number =>
      Date.parse(`${date}T00:00:00Z`) ?? Number.NaN;

    for (const raw of candidates) {
      const normalized = this.normalizeDate(raw);
      if (normalized) {
        const ms = toMillis(normalized);
        if (!Number.isNaN(ms) && (!best || ms > best.ms)) {
          best = { date: normalized, ms };
        }
      }
      const jst = asJstDate(raw);
      if (jst) {
        const ms = toMillis(jst);
        if (!Number.isNaN(ms) && (!best || ms > best.ms)) {
          best = { date: jst, ms };
        }
      }
    }
    return best?.date ?? null;
  }
}
