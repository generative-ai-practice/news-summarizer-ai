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

export class NewsProvider extends BaseProvider {
  private readonly provider = "anthropic";
  private readonly newsUrl = "https://www.anthropic.com/news";
  private readonly dryRun: boolean;
  private readonly cutoffDate = "2025-11-01";
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
    log(`[news] fetching article list => ${this.newsUrl}`);
    const html = await this.fetchHtml(this.newsUrl);

    // Use direct DOM parsing instead of LLM
    const parsed = this.extractNewsFromHtml(html);

    if (parsed.length === 0) {
      throw new Error(
        "[news] no articles parsed from news page. The layout may have changed or the page failed to load.",
      );
    }
    const filtered = this.applyDateFilter(parsed);
    const slugCount = new Map<string, number>();
    this.currentNews = this.applySlugNormalization(filtered, slugCount);
    log(
      `[news] fetched articles=${this.currentNews.length} ms=${
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
    log(`[news] new articles: ${this.newArticles.length}`);

    for (const article of this.newArticles) {
      const result = await this.fetchAndSummarize(article);
      this.processed.push(result);
    }

    const failed = this.processed.filter((item) => item.error);
    const hasFailures = failed.length > 0;
    if (hasFailures) {
      log(
        "[news] one or more articles failed; latest-articles.json not updated",
      );
      failed.forEach((item) => {
        log(
          `[news] failed article: ${item.article.title} (${item.article.url})`,
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
        log("[news] dry-run: latest-articles.json not written");
      }
    }
    log(`[news] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    const startedAt = Date.now();
    if (this.newArticles.length === 0) {
      log(`[news] no new articles. total tracked=${this.currentNews.length}`);
      log(`[news] generateReport done in ${Date.now() - startedAt}ms`);
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
    log(`[news] generateReport done in ${Date.now() - startedAt}ms`);
  }

  private extractNewsFromHtml(html: string): Article[] {
    const $ = cheerio.load(html);
    const seen = new Set<string>();
    const results: Article[] = [];

    // Primary: Extract from table structure (DATE, CATEGORY, TITLE)
    $("table tbody tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length < 3) return;

      const dateText = $(cells[0]).text().trim(); // DATE column
      const titleCell = $(cells[2]); // TITLE column

      // Find link in title cell
      const link = titleCell.find("a");
      const title = link.text().trim() || titleCell.text().trim();
      const href = link.attr("href") ?? "";
      const url = this.normalizeUrl(href);

      if (!url || seen.has(url)) return;
      if (!title) return;

      const publishedDate = this.normalizeDate(dateText) ?? "";

      results.push({
        title,
        url,
        publishedDate,
        source: "news",
        slug: "",
        language: "en",
        summaryLanguage: "ja",
      });
      seen.add(url);
    });

    // Fallback: Extract from news and research links with heading tags for titles
    if (results.length === 0) {
      $("a[href*='/news/'], a[href*='/research/']").each((_, el) => {
      const href = $(el).attr("href") ?? "";
      const url = this.normalizeUrl(href);
      if (!url || seen.has(url)) return;

      // Try to extract title from heading tags first
      let title = $(el).find("h1, h2, h3, h4, h5, h6").first().text().trim();

      // If no heading found, try to get text excluding time/meta elements
      if (!title) {
        const fullText = $(el).text().trim();
        // Remove date patterns and common category labels
        title = fullText
          .replace(/[A-Za-z]{3}\s+\d{1,2},\s*\d{4}/g, "") // Remove dates
          .replace(
            /^(Announcements|Product|Policy|Case Study|Research)\s*/i,
            "",
          ) // Remove category prefix
          .trim()
          .replace(/\s+/g, " ");
      }

      if (!title) return;

      // Look for time element inside the link
      const timeElement = $(el).find("time").first();
      const dateText =
        timeElement.attr("datetime")?.trim() ?? timeElement.text().trim() ?? "";
      const publishedDate = this.normalizeDate(dateText) ?? "";

      results.push({
        title,
        url,
        publishedDate,
        source: "news",
        slug: "",
        language: "en",
        summaryLanguage: "ja",
      });
      seen.add(url);
      });
    }

    // Fallback 2: Regex scan for /news/ URLs if DOM parsing finds nothing
    if (results.length === 0) {
      const urlRegex = /https?:\/\/www\.anthropic\.com\/news\/[^\s"']+/g;
      const relativeRegex = /["']\/news\/([a-z0-9-]+)["']/gi;
      const urls = new Set<string>();
      let match: RegExpExecArray | null;
      while ((match = urlRegex.exec(html)) !== null) {
        urls.add(match[0]);
      }
      while ((match = relativeRegex.exec(html)) !== null) {
        urls.add(`https://www.anthropic.com/news/${match[1]}`);
      }
      for (const url of urls) {
        results.push({
          title: url.split("/").pop() ?? url,
          url,
          publishedDate: "",
          source: "news",
          slug: "",
          language: "en",
          summaryLanguage: "ja",
        });
      }
    }

    return results;
  }

  private async fetchAndSummarize(article: Article): Promise<ProcessedResult> {
    try {
      const startedAt = Date.now();
      log(`[news] process: ${article.title} (${article.url})`);
      const html = await this.fetchHtml(article.url);
      const refinedDate = this.refinePublishedDateFromHtml(html);
      const updatedArticle: Article = {
        ...article,
        publishedDate: refinedDate ?? article.publishedDate,
      };
      // regenerate slug if date changed to keep filename aligned with published date
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
        `source_medium: "Anthropic News"`,
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
        await saveText(rawPath, html);
        await saveText(summaryPath, summaryWithFrontmatter);
      }

      log(`[news] done: ${article.title} ms=${Date.now() - startedAt}`);
      return { article: updatedArticle, rawPath, summaryPath };
    } catch (error) {
      log(`[news] Failed to process article: ${article.title}`, error);
      return { article, error };
    }
  }

  private async fetchHtml(url: string): Promise<string> {
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

  private normalizeUrl(url: string): string {
    if (!url) return "";
    try {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      if (url.startsWith("//")) {
        return `https:${url}`;
      }
      if (url.startsWith("/")) {
        return `https://www.anthropic.com${url}`;
      }
      return `https://www.anthropic.com${url.startsWith(".") ? "" : "/"}${url}`;
    } catch {
      return url;
    }
  }

  private normalizeDate(raw: string): string | null {
    if (!raw) return null;
    const clean = raw.trim();
    if (!clean) return null;
    const iso = clean.match(/(\d{4}-\d{2}-\d{2})/);
    if (iso) return iso[1];
    const long = clean.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
    if (!long) return null;
    const monthIndex: Record<string, string> = {
      january: "01",
      jan: "01",
      february: "02",
      feb: "02",
      march: "03",
      mar: "03",
      april: "04",
      apr: "04",
      may: "05",
      june: "06",
      jun: "06",
      july: "07",
      jul: "07",
      august: "08",
      aug: "08",
      september: "09",
      sep: "09",
      october: "10",
      oct: "10",
      november: "11",
      nov: "11",
      december: "12",
      dec: "12",
    };
    const month = monthIndex[long[1].toLowerCase()];
    if (!month) return null;
    const day = long[2].padStart(2, "0");
    const year = long[3];
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
    // trim leading/trailing empty lines
    while (filtered.length && filtered[0].trim() === "") filtered.shift();
    while (filtered.length && filtered[filtered.length - 1].trim() === "")
      filtered.pop();
    return filtered.join("\n");
  }

  private refinePublishedDateFromHtml(html: string): string | null {
    const $ = cheerio.load(html);
    const candidates: string[] = [];
    const add = (v?: string | null) => {
      if (v && v.trim()) candidates.push(v.trim());
    };

    // time tags
    add($("time[datetime]").first().attr("datetime"));
    add($("time").first().text());

    // common meta tags
    [
      'meta[property="article:published_time"]',
      'meta[name="article:published_time"]',
      'meta[name="pubdate"]',
      'meta[name="publish-date"]',
      'meta[name="published"]',
      'meta[property="og:published_time"]',
    ].forEach((sel) => add($(sel).attr("content")));

    // JSON-LD blocks
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

    // regex fallback
    const regexIso = /datePublished["']?\s*[:=]\s*["']([^"']+)["']/i;
    const matchIso = html.match(regexIso);
    if (matchIso) add(matchIso[1]);

    const plainIso = html.match(
      /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[^"'\\s<]*)/,
    );
    if (plainIso) add(plainIso[1]);

    // Visible localized dates (e.g. 2025年12月20日) — prefer what the page shows to users.
    const jpDates = [...html.matchAll(/(\d{4})年(\d{1,2})月(\d{1,2})日/g)].map(
      (m) => `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`,
    );
    jpDates.forEach((d) => add(d));

    let best: { date: string; ms: number } | null = null;
    const asJstDate = (raw: string): string | null => {
      // If raw contains a time, convert to JST date (helps when the site adjusts by timezone).
      if (!raw.includes("T")) return null;
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) return null;
      const fmt = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return fmt.format(parsed); // YYYY-MM-DD
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
