import { BaseProvider } from "./base-provider";
import { Article, ArticleList } from "../../types/provider-info";
import { RateLimiter } from "../rate-limiter";
import { GeminiExtractor } from "../gemini-extractor";
import {
  buildOutputPath,
  ensureDir,
  generateSlug,
  generateTimestamp,
  loadJSON,
  saveJSON,
  saveText,
} from "../storage";

type ParsedSections = {
  articles: Article[];
  entriesBySlug: Map<string, { date: string; items: { text: string }[] }>;
};

const log = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

export class GeminiChangelogProvider extends BaseProvider {
  private readonly provider = "gemini";
  private readonly pageUrl =
    "https://ai.google.dev/gemini-api/docs/changelog.md.txt";
  private readonly cutoffDate = "2025-11-01";
  private readonly dryRun: boolean;

  private currentEntries: Article[] = [];
  private previousEntries: Article[] = [];
  private newEntries: Article[] = [];
  private entriesBySlug: Map<
    string,
    { date: string; items: { text: string }[] }
  > = new Map();

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
    log(`[gemini-changelog] fetch => ${this.pageUrl}`);
    const markdown = await this.fetchMarkdown(this.pageUrl);

    await ensureDir(buildOutputPath(this.provider, "changelog"));
    await saveText(
      buildOutputPath(this.provider, "changelog", "overview.md"),
      markdown,
    );

    const parsed = this.parseMarkdown(markdown);
    const filtered = this.applyDateFilter(parsed.articles);
    const slugCount = new Map<string, number>();
    this.currentEntries = this.applySlugNormalization(filtered, slugCount);
    this.entriesBySlug = parsed.entriesBySlug;

    await saveJSON(
      buildOutputPath(this.provider, "changelog", "overview-links.json"),
      { fetchedAt: generateTimestamp(), links: this.currentEntries },
    );

    log(
      `[gemini-changelog] parsed count=${this.currentEntries.length} ms=${
        Date.now() - startedAt
      }`,
    );
  }

  async processData(): Promise<void> {
    const startedAt = Date.now();
    const latest =
      (await loadJSON<ArticleList>(
        buildOutputPath(this.provider, "changelog", "latest-changelog.json"),
      )) ?? undefined;
    this.previousEntries = latest?.articles ?? [];

    const prevUrls = new Set(this.previousEntries.map((a) => a.url));
    this.newEntries = this.currentEntries.filter((a) => !prevUrls.has(a.url));

    for (const entry of this.newEntries) {
      await this.writeEntryFiles(entry);
    }

    const latestData: ArticleList = {
      provider: this.provider,
      lastChecked: generateTimestamp(),
      articles: this.currentEntries,
    };

    if (!this.dryRun) {
      await ensureDir(buildOutputPath(this.provider, "changelog"));
      await saveJSON(
        buildOutputPath(this.provider, "changelog", "latest-changelog.json"),
        latestData,
      );
    } else {
      log("[gemini-changelog] dry-run: latest-changelog.json not written");
    }

    log(`[gemini-changelog] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    if (this.newEntries.length === 0) {
      log(
        `[gemini-changelog] no new entries. total tracked=${this.currentEntries.length}`,
      );
      return;
    }
    const lines = [
      `Provider: ${this.provider} (changelog)`,
      `New entries: ${this.newEntries.length}`,
      ...this.newEntries.map(
        (p) => `- [OK] ${p.title} → changelog-${p.slug}.md`,
      ),
    ];
    console.log(lines.join("\n"));
  }

  private parseMarkdown(markdown: string): ParsedSections {
    const lines = markdown.split(/\r?\n/);
    const entriesByDate = new Map<string, { items: string[] }>();

    const toIso = (raw: string): string | null => {
      const iso = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
      if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
      const long = raw.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
      if (long) {
        const monthMap: Record<string, string> = {
          january: "01",
          february: "02",
          march: "03",
          april: "04",
          may: "05",
          june: "06",
          july: "07",
          august: "08",
          september: "09",
          october: "10",
          november: "11",
          december: "12",
        };
        const month =
          monthMap[long[1].toLowerCase()] ??
          monthMap[long[1].slice(0, 3).toLowerCase()];
        if (!month) return null;
        return `${long[3]}-${month}-${long[2].padStart(2, "0")}`;
      }
      return null;
    };

    let currentDate: string | null = null;
    let buffer: string[] = [];

    const flush = () => {
      if (!currentDate || buffer.length === 0) return;
      const existing = entriesByDate.get(currentDate)?.items ?? [];
      entriesByDate.set(currentDate, {
        items: [...existing, ...buffer],
      });
      buffer = [];
    };

    for (const line of lines) {
      const heading = line.match(/^#{2,3}\s+(.*)$/);
      if (heading) {
        const iso = toIso(heading[1]);
        if (iso) {
          flush();
          currentDate = iso;
          continue;
        }
      }
      if (!currentDate) continue;
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        buffer.push(trimmed.replace(/^\*\s*/, "- "));
      } else {
        buffer.push(`- ${trimmed}`);
      }
    }
    flush();

    const results: Article[] = [];
    const entriesBySlug = new Map<
      string,
      { date: string; items: { text: string }[] }
    >();

    for (const [date, { items }] of entriesByDate) {
      const title = `${date} changelog`;
      const slug = this.buildSlug(title, date);
      results.push({
        title,
        url: `${this.pageUrl.replace(".md.txt", ".md")}#${date}`,
        publishedDate: date,
        source: "changelog",
        slug,
        language: "en",
        summaryLanguage: "ja",
      });
      entriesBySlug.set(slug, {
        date,
        items: items.map((text) => ({ text })),
      });
    }

    return { articles: results, entriesBySlug };
  }

  private async writeEntryFiles(article: Article) {
    const entry = this.entriesBySlug.get(article.slug);
    const items = entry?.items ?? [];
    const rawMarkdown = items.map((item) => item.text).join("\n");
    const translated = await this.extractor.translateReleaseNoteUpdates(
      rawMarkdown,
      { title: article.title },
    );
    const summary = [
      "---",
      `title: "${article.title.replace(/"/g, '\\"')}"`,
      `published: "${article.publishedDate || "N/A"}"`,
      `url: "${article.url}"`,
      `source: "changelog"`,
      `source_medium: "Google Gemini API Docs"`,
      `language: "ja"`,
      "---",
      "",
      "## Updates (translated)",
      translated,
    ].join("\n");

    const rawPath = buildOutputPath(
      this.provider,
      "changelog",
      "raw",
      `changelog-${article.slug}.md`,
    );
    const summaryPath = buildOutputPath(
      this.provider,
      "changelog",
      "summaries",
      `changelog-${article.slug}.md`,
    );

    if (!this.dryRun) {
      await ensureDir(buildOutputPath(this.provider, "changelog", "raw"));
      await ensureDir(buildOutputPath(this.provider, "changelog", "summaries"));
      await saveText(rawPath, rawMarkdown);
      await saveText(summaryPath, summary);
    }
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

  private buildSlug(title: string, publishedDate?: string): string {
    return generateSlug(title, publishedDate);
  }

  private async fetchMarkdown(url: string): Promise<string> {
    return this.rateLimiter.withRetry(async () => {
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/plain, text/markdown;q=0.9, */*;q=0.8",
      };
      try {
        const res = await fetch(url, { headers });
        if (res.ok) return res.text();
      } catch (err) {
        log(
          `[gemini-changelog] primary fetch failed, try jina proxy: ${String(err)}`,
        );
      }

      const proxyUrl = `https://r.jina.ai/${url}`;
      const proxied = await fetch(proxyUrl, { headers });
      if (!proxied.ok) {
        throw new Error(`Failed to fetch ${url}: ${proxied.status}`);
      }
      return proxied.text();
    });
  }
}
