import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Article,
  ArticleSourceType,
  ExtractedArticles,
} from "../types/provider-info";
import { RateLimiter } from "./rate-limiter";

const log = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

type GeminiModelConfig = {
  model?: string;
};

const DEFAULT_MODEL = "gemini-2.5-flash";

const sanitizeJSON = (raw: string) => {
  const trimmed = raw.trim();
  if (trimmed.startsWith("```")) {
    return trimmed
      .replace(/^```[a-zA-Z]*\s*/, "")
      .replace(/```$/, "")
      .trim();
  }
  return trimmed;
};

const parseJSONSafe = <T>(raw: string): T => {
  const cleaned = sanitizeJSON(raw);
  try {
    return JSON.parse(cleaned) as T;
  } catch (error) {
    const salvageObjects = () => {
      const matches = cleaned.match(/{[^{}]*}/g);
      if (!matches || matches.length === 0) return null;
      try {
        return JSON.parse(`[${matches.join(",")}]`);
      } catch {
        return null;
      }
    };

    const salvaged = salvageObjects();
    if (salvaged && typeof salvaged === "object") {
      return { articles: salvaged } as T;
    }

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const sliced = cleaned.slice(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(sliced) as T;
      } catch {
        // fall through
      }
    }
    const snippet = cleaned.slice(0, 4000);
    throw new Error(
      `Failed to parse JSON from Gemini output: ${
        (error as Error).message
      }. snippet=${snippet}`,
    );
  }
};

export class GeminiExtractor {
  private readonly genAI: GoogleGenerativeAI;
  private readonly modelName: string;

  constructor(
    apiKey: string,
    private readonly rateLimiter: RateLimiter,
    config: GeminiModelConfig = {},
  ) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = config.model ?? DEFAULT_MODEL;
  }

  async extractArticleList(
    html: string,
    source: ArticleSourceType,
  ): Promise<ExtractedArticles> {
    const prompt = [
      "以下のHTMLから記事リストを抽出してください。",
      "有効なJSONのみを出力してください。末尾カンマ禁止。コードブロックや説明文は不要です。",
      'スキーマ: { "articles": [ { "title": string, "url": string, "publishedDate": "YYYY-MM-DD" | "", "source": source, "language": string } ] }',
      `source フィールドには指定された値をそのまま入れてください: "${source}".`,
      "publishedDate が不明なら空文字をセットしてください。",
      "記事は最新のものから並べ、最大50件までにしてください。",
      "publishedDate が 2025-12-01 より古い記事は含めないでください。",
      "title/description は200文字以内に簡潔にしてください（不要なコピーは省略）。",
    ].join("\n");

    const startedAt = Date.now();
    const result = await this.rateLimiter.withRetry(async () => {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: { responseMimeType: "application/json" },
      });
      const response = await model.generateContent([
        { text: prompt },
        { text: html },
      ]);
      return response.response.text();
    });

    let parsed: { articles: Article[] };
    try {
      parsed = parseJSONSafe<{ articles: Article[] }>(result);
    } catch (error) {
      log("[gemini] parse failed for article list", {
        source,
        error: (error as Error).message,
      });
      throw error;
    }
    log("[gemini] article list parsed", {
      source,
      articles: parsed.articles?.length ?? 0,
      ms: Date.now() - startedAt,
    });

    return {
      fetchedAt: new Date().toISOString(),
      source,
      extractedBy: this.modelName,
      data: parsed.articles ?? [],
    };
  }

  async generateReleaseNoteSummary(
    updatesMarkdown: string,
    meta: {
      title: string;
      url: string;
      publishedDate: string;
    },
  ) {
    const prompt = [
      "以下はリリースノートの更新項目です。与えられた文章とリンク以外の情報を推測せず、リンク先の本文も展開しないでください。",
      "リンクはそのままMarkdownリンクとして残してください。",
      "",
      "出力フォーマット:",
      `# ${meta.title}`,
      "",
      `**Published:** ${meta.publishedDate || "N/A"}`,
      `**URL:** ${meta.url}`,
      `**Source:** release-notes`,
      `**Language:** ja`,
      "",
      "## Summary",
      "上記の更新項目だけを使って、日本語で2-3文に要約してください（外部情報を付け足さない）。",
      "",
      "## Key Points",
      "- 箇条書きで3-5項目、日本語で簡潔にまとめてください（外部情報を付け足さない）。",
      "",
      "---",
      "",
      "更新項目（入力）:",
      updatesMarkdown,
    ].join("\n");

    const startedAt = Date.now();
    const content = await this.rateLimiter.withRetry(async () => {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const response = await model.generateContent([{ text: prompt }]);
      return response.response.text();
    });

    log("[gemini] release note summary generated", {
      title: meta.title,
      ms: Date.now() - startedAt,
    });

    return content.trim();
  }

  async translateReleaseNoteUpdates(updatesMarkdown: string, meta: {
    title: string;
  }) {
    const prompt = [
      "以下のMarkdownの箇条書きを日本語に翻訳してください。",
      "- 箇条書きやリンク構造はそのまま維持してください（リンク先URLも変更しない）。",
      "- 新しい情報を付け足したり要約したりしないでください。純粋に翻訳のみ行ってください。",
      "",
      `# ${meta.title}`,
      "",
      updatesMarkdown,
    ].join("\n");

    const startedAt = Date.now();
    const content = await this.rateLimiter.withRetry(async () => {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const response = await model.generateContent([{ text: prompt }]);
      return response.response.text();
    });

    log("[gemini] release note updates translated", {
      title: meta.title,
      ms: Date.now() - startedAt,
    });

    return content.trim();
  }

  async generateArticleSummary(
    html: string,
    meta: {
      title: string;
      url: string;
      publishedDate: string;
      source: ArticleSourceType;
    },
  ) {
    const prompt = [
      "以下の記事HTMLを読み、日本語でMarkdown要約を生成してください。",
      "必ずフォーマットを守ってください。",
      "フォーマット:",
      `# ${meta.title}`,
      "",
      `**Published:** ${meta.publishedDate || "N/A"}`,
      `**URL:** ${meta.url}`,
      `**Source:** ${meta.source}`,
      `**Language:** ja`,
      "",
      "## Summary",
      "記事内容の要約を日本語で2-3段落で書いてください。",
      "",
      "## Key Points",
      "- 箇条書きで3-5項目、日本語で重要点をまとめてください。",
      "",
      "---",
      "",
      "*Generated by Provider News Monitor using Gemini 2.5 Flash*",
      "",
      "上記のMarkdownのみ出力してください。余計な説明や前置きは不要です。",
    ].join("\n");

    const startedAt = Date.now();
    const content = await this.rateLimiter.withRetry(async () => {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const response = await model.generateContent([
        { text: prompt },
        { text: html },
      ]);
      return response.response.text();
    });

    log("[gemini] summary generated", {
      title: meta.title,
      source: meta.source,
      ms: Date.now() - startedAt,
    });

    return content.trim();
  }
}
