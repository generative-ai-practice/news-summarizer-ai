import { BaseProvider } from "./base-provider";
import {
  Article,
  ArticleList,
  ArticleSourceType,
} from "../../types/provider-info";
import { GeminiExtractor } from "../gemini-extractor";
import { RateLimiter } from "../rate-limiter";
import {
  buildOutputPath,
  ensureDir,
  generateSlug,
  generateTimestamp,
  loadLatestArticles,
  saveLatestArticles,
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

export class AnthropicProvider extends BaseProvider {
  private readonly provider = "anthropic";
  private readonly baseUrl = "https://www.anthropic.com";
  private readonly newsUrl = "https://www.anthropic.com/news";
  private readonly releaseNotesMarkdownUrl =
    "https://platform.claude.com/docs/en/release-notes/overview.md";
  private readonly dryRun: boolean;
  private readonly cutoffDate = "2025-12-01";
  private currentArticles: Article[] = [];
  private previousArticles: Article[] = [];
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
    log(`[anthropic] fetching article lists (news, release-notes)...`);
    const news = await this.fetchArticleList(this.newsUrl, "news");
    const releaseNotes = await this.fetchReleaseNotesFromMarkdown(
      this.releaseNotesMarkdownUrl,
    );
    const merged = this.mergeArticles([...news, ...releaseNotes]);
    const filtered = this.applyDateFilter(merged);
    this.currentArticles = this.applySlugNormalization(merged);
    log(
      `[anthropic] fetched: news=${news.length}, releaseNotes=${releaseNotes.length}, merged=${merged.length}, afterCutoff=${filtered.length}, ms=${
        Date.now() - startedAt
      }`,
    );
    this.currentArticles = this.applySlugNormalization(filtered);
  }

  async processData(): Promise<void> {
    const startedAt = Date.now();
    const latest = (await loadLatestArticles(this.provider)) ?? undefined;
    this.previousArticles = latest?.articles ?? [];

    const previousUrls = new Set(this.previousArticles.map((a) => a.url));
    this.newArticles = this.currentArticles.filter(
      (article) => !previousUrls.has(article.url),
    );
    log(`[anthropic] new articles: ${this.newArticles.length}`);

    for (const article of this.newArticles) {
      const result = await this.fetchAndSummarize(article);
      this.processed.push(result);
    }

    const latestData: ArticleList = {
      provider: this.provider,
      lastChecked: generateTimestamp(),
      articles: this.currentArticles,
    };

    if (!this.dryRun) {
      await saveLatestArticles(this.provider, latestData);
    }
    if (this.dryRun) {
      log("[anthropic] dry-run: latest.json not written");
    }
    log(`[anthropic] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    const startedAt = Date.now();
    if (this.newArticles.length === 0) {
      log(
        `[anthropic] no new articles. total tracked=${this.currentArticles.length}`,
      );
      log(`[anthropic] generateReport done in ${Date.now() - startedAt}ms`);
      return;
    }
    const lines = [
      `Provider: ${this.provider}`,
      `New articles: ${this.newArticles.length}`,
      ...this.processed.map((p) => {
        if (p.error) {
          return `- [FAILED] ${p.article.title} (${p.article.url})`;
        }
        return `- [OK] ${p.article.title} → summary: ${p.summaryPath ?? "dry-run"}, raw: ${p.rawPath ?? "dry-run"}`;
      }),
    ];
    console.log(lines.join("\n"));
    log(`[anthropic] generateReport done in ${Date.now() - startedAt}ms`);
  }

  private async fetchArticleList(
    url: string,
    source: ArticleSourceType,
  ): Promise<Article[]> {
    const startedAt = Date.now();
    log(`[anthropic] fetch list: ${source} => ${url}`);
    const html = await this.fetchHtml(url);
    const extracted = await this.geminiExtractor.extractArticleList(
      html,
      source,
    );
    log(
      `[anthropic] list fetched: ${source} articles=${extracted.data.length} ms=${
        Date.now() - startedAt
      }`,
    );
    return extracted.data.map((article) => ({
      ...article,
      url: this.normalizeUrl(article.url),
      source,
      language: article.language ?? "en",
      summaryLanguage: "ja",
      publishedDate: article.publishedDate ?? "",
    }));
  }

  private async fetchAndSummarize(article: Article): Promise<ProcessedResult> {
    try {
      const startedAt = Date.now();
      log(`[anthropic] process: ${article.title} (${article.url})`);
      const html = await this.fetchHtml(article.url);
      const summary = await this.geminiExtractor.generateArticleSummary(html, {
        title: article.title,
        url: article.url,
        publishedDate: article.publishedDate,
        source: article.source,
      });

      const rawPath = buildOutputPath(
        this.provider,
        "raw",
        `article-${article.slug}.html`,
      );
      const summaryPath = buildOutputPath(
        this.provider,
        "summaries",
        `article-${article.slug}.md`,
      );

      if (!this.dryRun) {
        await ensureDir(buildOutputPath(this.provider, "raw"));
        await ensureDir(buildOutputPath(this.provider, "summaries"));
        await saveText(rawPath, html);
        await saveText(summaryPath, summary);
      }

      log(`[anthropic] done: ${article.title} ms=${Date.now() - startedAt}`);
      return { article, rawPath, summaryPath };
    } catch (error) {
      log(`Failed to process article: ${article.title}`, error);
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

  private async fetchReleaseNotesFromMarkdown(url: string): Promise<Article[]> {
    const startedAt = Date.now();
    log(`[anthropic] fetch release-notes (markdown) => ${url}`);
    const md = await this.fetchHtml(url);

    const lines = md.split("\n");
    const results: Article[] = [];
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const dateRegex = /(\d{4}-\d{2}-\d{2})/;

    for (const line of lines) {
      const dateMatch = line.match(dateRegex);
      if (!dateMatch) continue;
      const publishedDate = dateMatch[1];
      let linkMatch: RegExpExecArray | null;
      linkRegex.lastIndex = 0;
      while ((linkMatch = linkRegex.exec(line)) !== null) {
        const title = linkMatch[1].trim();
        const urlFound = linkMatch[2].trim();
        if (!title || !urlFound) continue;
        results.push({
          title,
          url: urlFound,
          publishedDate,
          source: "release-notes",
          slug: "",
          language: "en",
          summaryLanguage: "ja",
        });
      }
    }

    log(
      `[anthropic] release-notes parsed from markdown: count=${results.length}, ms=${
        Date.now() - startedAt
      }`,
    );
    return results;
  }

  private mergeArticles(articles: Article[]): Article[] {
    const seen = new Set<string>();
    const merged: Article[] = [];
    for (const article of articles) {
      if (seen.has(article.url)) continue;
      seen.add(article.url);
      merged.push(article);
    }
    return merged;
  }

  private applySlugNormalization(articles: Article[]): Article[] {
    const slugCount = new Map<string, number>();
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

  private applyDateFilter(articles: Article[]): Article[] {
    return articles.filter((article) => {
      if (!article.publishedDate) return false;
      const dateStr = article.publishedDate.trim().split("T")[0] ?? "";
      if (dateStr.length !== 10) return false;
      return dateStr >= this.cutoffDate;
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
        return `${this.baseUrl}${url}`;
      }
      return `${this.baseUrl}${url.startsWith(".") ? "" : "/"}${url}`;
    } catch {
      return url;
    }
  }
}
