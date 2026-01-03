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

export class DeprecationsProvider extends BaseProvider {
  private readonly provider = "anthropic";
  private readonly markdownUrl =
    "https://platform.claude.com/docs/en/about-claude/model-deprecations.md";
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
    log(`[deprecations] fetch markdown => ${this.markdownUrl}`);
    const mdSource = await this.fetchMarkdown(this.markdownUrl);

    await ensureDir(buildOutputPath(this.provider, "deprecations"));
    await saveText(
      buildOutputPath(this.provider, "deprecations", "overview.md"),
      mdSource,
    );

    const parsed = this.parseMarkdown(mdSource);
    const filtered = this.applyDateFilter(parsed.articles);
    const slugCount = new Map<string, number>();
    this.currentEntries = this.applySlugNormalization(filtered, slugCount);
    this.entriesBySlug = parsed.entriesBySlug;

    await saveJSON(
      buildOutputPath(this.provider, "deprecations", "overview-links.json"),
      { fetchedAt: generateTimestamp(), links: this.currentEntries },
    );

    log(
      `[deprecations] parsed count=${this.currentEntries.length} ms=${
        Date.now() - startedAt
      }`,
    );
  }

  async processData(): Promise<void> {
    const startedAt = Date.now();
    const latest =
      (await loadJSON<ArticleList>(
        buildOutputPath(
          this.provider,
          "deprecations",
          "latest-deprecations.json",
        ),
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
      await ensureDir(buildOutputPath(this.provider, "deprecations"));
      await saveJSON(
        buildOutputPath(
          this.provider,
          "deprecations",
          "latest-deprecations.json",
        ),
        latestData,
      );
    } else {
      log("[deprecations] dry-run: latest-deprecations.json not written");
    }

    log(`[deprecations] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    if (this.newEntries.length === 0) {
      log(
        `[deprecations] no new entries. total tracked=${this.currentEntries.length}`,
      );
      return;
    }
    const lines = [
      `Provider: ${this.provider} (model deprecations)`,
      `New entries: ${this.newEntries.length}`,
      ...this.newEntries.map(
        (p) => `- [OK] ${p.title} → release-note-${p.slug}.md`,
      ),
    ];
    console.log(lines.join("\n"));
  }

  private parseMarkdown(mdSource: string): {
    articles: Article[];
    entriesBySlug: Map<
      string,
      { date: string; items: { text: string }[] }
    >;
  } {
    const tokens = this.md.parse(mdSource, {});
    const results: Article[] = [];
    let currentDate: string | null = null;
    let skipHeadingInline = false;
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
          skipHeadingInline = true;
        }
        continue;
      }

      if (token.type === "heading_close") {
        continue;
      }

      if (token.type !== "inline" || !token.children || !currentDate) {
        continue;
      }

      if (skipHeadingInline) {
        skipHeadingInline = false;
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
      const title = `${date} model deprecations`;
      const slug = this.buildSlug(title, undefined, date);
      results.push({
        title,
        url: `${this.markdownUrl}#${date}`,
        publishedDate: date,
        source: "model-deprecations",
        slug,
        language: "en",
        summaryLanguage: "ja",
      });
      entriesBySlug.set(slug, { date, items });
    }

    return { articles: results, entriesBySlug };
  }

  private async writeEntryFiles(article: Article) {
    const entry = this.entriesBySlug.get(article.slug);
    const items = entry?.items ?? [];
    const updatesMarkdown = items.map((item) => item.text).join("\n");
    const translated = await this.extractor.translateReleaseNoteUpdates(
      updatesMarkdown,
      { title: article.title },
    );
    const summary = [
      "---",
      `title: "${article.title.replace(/"/g, '\\"')}"`,
      `published: "${article.publishedDate || "N/A"}"`,
      `url: "${article.url}"`,
      `source: "model-deprecations"`,
      `source_medium: "Claude Developer Platform"`,
      `language: "ja"`,
      "---",
      "",
      "## Updates (translated)",
      translated,
    ].join("\n");

    const rawPath = buildOutputPath(
      this.provider,
      "deprecations",
      "raw",
      `deprecation-${article.slug}.md`,
    );
    const summaryPath = buildOutputPath(
      this.provider,
      "deprecations",
      "summaries",
      `deprecation-${article.slug}.md`,
    );

    if (!this.dryRun) {
      await ensureDir(buildOutputPath(this.provider, "deprecations", "raw"));
      await ensureDir(
        buildOutputPath(this.provider, "deprecations", "summaries"),
      );
      await saveText(rawPath, updatesMarkdown);
      await saveText(summaryPath, summary);
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

  private buildSlug(title: string, url?: URL, publishedDate?: string): string {
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
    let currentHref: string | null = null;
    let currentText: string[] = [];

    const pushText = (text: string) => {
      if (!text) return;
      if (currentHref !== null) {
        currentText.push(text);
      } else {
        parts.push(text);
      }
    };

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.type === "link_open") {
        const href =
          child.attrs?.find((tuple) => tuple[0] === "href")?.[1] ?? "";
        try {
          currentHref = new URL(href, baseUrl).toString();
        } catch {
          currentHref = href;
        }
        currentText = [];
        continue;
      }

      if (child.type === "link_close") {
        const text = currentText.join("") || currentHref || "";
        if (text) {
          const href = currentHref ?? "";
          parts.push(href ? `[${text}](${href})` : text);
        }
        currentHref = null;
        currentText = [];
        continue;
      }

      if (child.type === "code_inline") {
        pushText(`\`${child.content ?? ""}\``);
        continue;
      }

      if (child.type === "softbreak" || child.type === "hardbreak") {
        pushText(" ");
        continue;
      }

      if (child.type === "text") {
        pushText(child.content ?? "");
        continue;
      }

      // fallback
      pushText(child.content ?? "");
    }

    if (currentHref !== null && currentText.length > 0) {
      const text = currentText.join("") || currentHref;
      parts.push(`[${text}](${currentHref})`);
    }

    return parts.join("").trim();
  }
}
