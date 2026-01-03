import MarkdownIt from "markdown-it";
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

const log = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

export class ReleaseNotesProvider extends BaseProvider {
  private readonly provider = "anthropic";
  private readonly releaseNotesMarkdownUrl =
    "https://platform.claude.com/docs/en/release-notes/overview.md";
  private readonly cutoffDate = "2025-11-01";
  private readonly dryRun: boolean;
  private readonly md = new MarkdownIt();
  private readonly monthIndex: Record<string, string> = {
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

  private currentReleaseNotes: Article[] = [];
  private previousReleaseNotes: Article[] = [];
  private newReleaseNotes: Article[] = [];
  private processed: {
    article: Article;
    summaryPath?: string;
    rawPath?: string;
    error?: unknown;
  }[] = [];
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
    log(
      `[release-notes] fetch overview (markdown) => ${this.releaseNotesMarkdownUrl}`,
    );
    const mdSource = await this.fetchMarkdown(this.releaseNotesMarkdownUrl);

    await ensureDir(buildOutputPath(this.provider, "release-notes"));
    await saveText(
      buildOutputPath(this.provider, "release-notes", "overview.md"),
      mdSource,
    );

    const parsed = this.parseReleaseNotes(mdSource);
    const filtered = this.applyDateFilter(parsed.articles);
    const slugCount = new Map<string, number>();
    this.currentReleaseNotes = this.applySlugNormalization(filtered, slugCount);
    this.entriesBySlug = parsed.entriesBySlug;

    await saveJSON(
      buildOutputPath(this.provider, "release-notes", "overview-links.json"),
      { fetchedAt: generateTimestamp(), links: this.currentReleaseNotes },
    );

    log(
      `[release-notes] parsed count=${this.currentReleaseNotes.length} ms=${
        Date.now() - startedAt
      }`,
    );
  }

  async processData(): Promise<void> {
    const startedAt = Date.now();
    const latestRelease =
      (await loadJSON<ArticleList>(
        buildOutputPath(
          this.provider,
          "release-notes",
          "latest-release-notes.json",
        ),
      )) ?? undefined;
    this.previousReleaseNotes = latestRelease?.articles ?? [];

    const prevUrls = new Set(this.previousReleaseNotes.map((a) => a.url));
    this.newReleaseNotes = this.currentReleaseNotes.filter(
      (a) => !prevUrls.has(a.url),
    );

    for (const article of this.newReleaseNotes) {
      const result = await this.summarizeInline(article);
      this.processed.push(result);
    }

    const latestReleaseData: ArticleList = {
      provider: this.provider,
      lastChecked: generateTimestamp(),
      articles: this.currentReleaseNotes,
    };

    if (!this.dryRun) {
      await ensureDir(buildOutputPath(this.provider, "release-notes"));
      await saveJSON(
        buildOutputPath(
          this.provider,
          "release-notes",
          "latest-release-notes.json",
        ),
        latestReleaseData,
      );
    } else {
      log("[release-notes] dry-run: latest-release-notes.json not written");
    }

    log(`[release-notes] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    if (this.newReleaseNotes.length === 0) {
      log(
        `[release-notes] no new links. total tracked=${this.currentReleaseNotes.length}`,
      );
      return;
    }
    const lines = [
      `Provider: ${this.provider} (release-notes)`,
      `New links: ${this.newReleaseNotes.length}`,
      ...this.processed.map((p) => {
        if (p.error) {
          return `- [FAILED] ${p.article.title} (${p.article.url})`;
        }
        return `- [OK] ${p.article.title} → summary: ${p.summaryPath ?? "dry-run"}, raw: ${p.rawPath ?? "dry-run"}`;
      }),
    ];
    console.log(lines.join("\n"));
  }

  private parseReleaseNotes(mdSource: string): {
    articles: Article[];
    entriesBySlug: Map<
      string,
      { date: string; items: { text: string }[] }
    >;
  } {
    const tokens = this.md.parse(mdSource, {});
    const results: Article[] = [];
    let currentDate: string | null = null;
    const entriesByDate: Map<
      string,
      { items: { text: string }[] }
    > = new Map();

    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];

      if (token.type === "heading_open") {
        const content = tokens[i + 1]?.content ?? "";
        const detected = this.normalizeDate(content);
        if (detected) {
          currentDate = detected;
        }
        continue;
      }

      if (token.type !== "inline" || !token.children || !currentDate) {
        continue;
      }

      const lineMarkdown = this.renderInlineWithAbsoluteLinks(
        token.children,
        "https://platform.claude.com",
      );
      if (!lineMarkdown) continue;
      const dateKey = currentDate ?? "unknown-date";
      const bucket = entriesByDate.get(dateKey) ?? { items: [] };
      bucket.items.push({ text: `- ${lineMarkdown}` });
      entriesByDate.set(dateKey, bucket);
    }

    const entriesBySlug = new Map<
      string,
      { date: string; items: { text: string }[] }
    >();

    for (const [date, { items }] of entriesByDate) {
      const title = `${date} release notes`;
      const slug = this.buildReleaseSlug(title, undefined, date);
      results.push({
        title,
        url: `${this.releaseNotesMarkdownUrl}#${date}`,
        publishedDate: date,
        source: "release-notes",
        slug,
        language: "en",
        summaryLanguage: "ja",
      });
      entriesBySlug.set(slug, { date, items });
    }

    return { articles: results, entriesBySlug };
  }

  private async summarizeInline(article: Article) {
    try {
      const startedAt = Date.now();
      const entry = this.entriesBySlug.get(article.slug);
      const items = entry?.items ?? [];
      const updatesMarkdown = items.map((item) => item.text).join("\n");
      const translated = await this.extractor.translateReleaseNoteUpdates(
        updatesMarkdown,
        { title: article.title },
      );
      const summary = [
        `# ${article.title}`,
        "",
        `**Published:** ${article.publishedDate || "N/A"}`,
        `**URL:** ${article.url}`,
        `**Source:** release-notes`,
        `**Language:** ja`,
        "",
        "## Updates (translated)",
        translated,
      ].join("\n");

      const rawPath = buildOutputPath(
        this.provider,
        "release-notes",
        "raw",
        `release-note-${article.slug}.md`,
      );
      const summaryPath = buildOutputPath(
        this.provider,
        "release-notes",
        "summaries",
        `release-note-${article.slug}.md`,
      );

      if (!this.dryRun) {
        await ensureDir(buildOutputPath(this.provider, "release-notes", "raw"));
        await ensureDir(
          buildOutputPath(this.provider, "release-notes", "summaries"),
        );
        await saveText(
          rawPath,
          updatesMarkdown,
        );
        await saveText(summaryPath, summary);
      }
      log(
        `[release-notes] done (inline only): ${article.title} ms=${
          Date.now() - startedAt
        }`,
      );
      return { article, rawPath, summaryPath };
    } catch (error) {
      log(`[release-notes] failed: ${article.title}`, error);
      return { article, error };
    }
  }

  private async fetchMarkdown(url: string): Promise<string> {
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

  private normalizeDate(raw: string): string | null {
    if (!raw) return null;
    const clean = raw.trim();
    if (!clean) return null;
    const iso = clean.match(/(\d{4}-\d{2}-\d{2})/);
    if (iso) return iso[1];
    const long = clean.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
    if (!long) return null;
    const month = this.monthIndex[long[1].toLowerCase()];
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

  private buildReleaseSlug(
    title: string,
    url?: URL,
    publishedDate?: string,
  ): string {
    const pathParts = url?.pathname.split("/").filter(Boolean) ?? [];
    const last = pathParts[pathParts.length - 1] ?? "";
    const base = [title, last].filter(Boolean).join(" ");
    return generateSlug(base || title || last, publishedDate);
  }

  private renderInlineWithAbsoluteLinks(
    children: Array<{
      type: string;
      content?: string;
      attrs?: [string, string][] | null;
    }>,
    baseUrl: string,
  ): string {
    const parts: string[] = [];
    let skipNextText = false;
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.type === "link_open") {
        const href =
          child.attrs?.find((tuple) => tuple[0] === "href")?.[1] ?? "";
        const text = children[i + 1]?.content ?? "";
        skipNextText = true;
        try {
          const abs = new URL(href, baseUrl).toString();
          parts.push(`[${text}](${abs})`);
        } catch {
          parts.push(text || href);
        }
        continue;
      }
      if (skipNextText && child.type === "text") {
        skipNextText = false;
        continue;
      }
      if (child.type === "text") {
        parts.push(child.content ?? "");
      }
    }
    return parts.join("").trim();
  }
}
