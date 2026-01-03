/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cheerio from "cheerio";
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

type ParsedSections = {
  articles: Article[];
  entriesBySlug: Map<string, { date: string; items: { text: string }[] }>;
};

export class OpenAIChangelogProvider extends BaseProvider {
  private readonly provider = "openai";
  private readonly pageUrl = "https://platform.openai.com/docs/changelog";
  private readonly cutoffDate = "2025-12-01";
  private readonly dryRun: boolean;
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
    log(`[openai-changelog] fetch => ${this.pageUrl}`);
    const html = await this.fetchHtml(this.pageUrl);

    await ensureDir(buildOutputPath(this.provider, "changelog"));
    await saveText(
      buildOutputPath(this.provider, "changelog", "overview.html"),
      html,
    );

    const parsed = this.parseHtml(html);
    const filtered = this.applyDateFilter(parsed.articles);
    const slugCount = new Map<string, number>();
    this.currentEntries = this.applySlugNormalization(filtered, slugCount);
    this.entriesBySlug = parsed.entriesBySlug;

    await saveJSON(
      buildOutputPath(this.provider, "changelog", "overview-links.json"),
      { fetchedAt: generateTimestamp(), links: this.currentEntries },
    );

    log(
      `[openai-changelog] parsed count=${this.currentEntries.length} ms=${
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
      log("[openai-changelog] dry-run: latest-changelog.json not written");
    }

    log(`[openai-changelog] processData done in ${Date.now() - startedAt}ms`);
  }

  async generateReport(): Promise<void> {
    if (this.newEntries.length === 0) {
      log(
        `[openai-changelog] no new entries. total tracked=${this.currentEntries.length}`,
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

  private parseHtml(html: string): ParsedSections {
    const $ = cheerio.load(html);
    const content = $("main").length ? $("main") : $("body");
    const entriesByDate = new Map<string, { items: string[] }>();

    content.find("h2, h3, h4").each((_, heading) => {
      const headingText = $(heading).text().trim();
      const detectedDate = this.normalizeDate(headingText);
      if (!detectedDate) return;

      const section = $(heading).nextUntil("h2, h3, h4");
      const items: string[] = [];

      section.each((__, node) => {
        const tag = node.tagName?.toLowerCase() ?? "";
        if (tag === "ul" || tag === "ol") {
          $(node)
            .find("li")
            .each((___, li) => {
              const text = this.serializeInline(
                $(li),
                "https://platform.openai.com",
              );
              if (text) items.push(`- ${text}`);
            });
        } else if (tag === "p") {
          const text = this.serializeInline(
            $(node),
            "https://platform.openai.com",
          );
          if (text) items.push(`- ${text}`);
        } else if (tag === "table") {
          this.tableToMarkdown($(node), "https://platform.openai.com").forEach(
            (line) => items.push(line),
          );
        }
      });

      if (items.length > 0) {
        entriesByDate.set(detectedDate, { items });
      }
    });

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
        url: `${this.pageUrl}#${date}`,
        publishedDate: date,
        source: "changelog",
        slug,
        language: "en",
        summaryLanguage: "ja",
      });
      const wrapped = items.map((text) => ({ text }));
      entriesBySlug.set(slug, { date, items: wrapped });
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
      `source: "changelog"`,
      `source_medium: "OpenAI Platform Docs"`,
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
      await saveText(rawPath, updatesMarkdown);
      await saveText(summaryPath, summary);
    }
  }

  private serializeInline(
    el: cheerio.Cheerio<unknown>,
    baseUrl: string,
  ): string {
    type NodeLike = { type?: string; data?: string; tagName?: string };
    const wrap = (node: NodeLike) => {
      const ctor = el.constructor as unknown as (
        input: unknown,
      ) => cheerio.Cheerio<unknown>;
      return ctor(node);
    };

    const walk = (node: NodeLike): string => {
      if (!node || typeof node !== "object") return "";
      if (node.type === "text") {
        return (node.data ?? "").toString().trim();
      }
      if (node.type !== "tag") return "";
      const $node = wrap(node) as any;
      const tag = (
        ($node.get(0) as NodeLike | undefined)?.tagName ?? ""
      ).toLowerCase();
      if (tag === "a") {
        const hrefRaw = ($node as any).attr("href") ?? "";
        const href = this.toAbsoluteUrl(hrefRaw, baseUrl);
        const text = (($node as any).text() || hrefRaw || "").trim();
        return href ? `[${text}](${href})` : text;
      }
      if (tag === "code") {
        return `\`${($node as any).text().trim()}\``;
      }
      const parts = ($node as any)
        .contents()
        .map((_: unknown, child: unknown) => walk(child as NodeLike))
        .toArray();
      return parts.join("").replace(/\s+/g, " ").trim();
    };

    const first = el.get(0) as unknown as NodeLike | undefined;
    return first ? walk(first) : "";
  }

  private tableToMarkdown(
    table: cheerio.Cheerio<unknown>,
    baseUrl: string,
  ): string[] {
    const rows: string[][] = [];
    const t = table as unknown as cheerio.Cheerio<any>;
    t.find("tr").each((rowIdx: number) => {
      const cells: string[] = [];
      const $row = t.find("tr").eq(rowIdx);
      const selector = $row.find("th").length > 0 ? "th" : "td";
      $row.find(selector as any).each((cellIdx: number) => {
        const $cell = $row.find(selector).eq(cellIdx);
        cells.push(this.serializeInline($cell, baseUrl));
      });
      if (cells.length > 0) rows.push(cells);
    });
    if (rows.length === 0) return [];

    const header = rows[0];
    const separator = header.map(() => "---");
    const body = rows.slice(1);
    const lines = [
      `| ${header.join(" | ")} |`,
      `| ${separator.join(" | ")} |`,
      ...body.map((cells) => `| ${cells.join(" | ")} |`),
    ];
    return lines;
  }

  private toAbsoluteUrl(href: string, baseUrl: string): string {
    if (!href) return "";
    try {
      const url = new URL(href, baseUrl);
      return url.toString();
    } catch {
      return href;
    }
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
      // fallback via jina ai proxy to bypass challenge/403
      if (response.status === 403 || response.status === 503) {
        const proxyUrl = `https://r.jina.ai/${url}`;
        const alt = await fetch(proxyUrl, { headers });
        if (alt.ok) return alt.text();
      }
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
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

  private buildSlug(title: string, publishedDate?: string): string {
    return generateSlug(title, publishedDate);
  }
}
