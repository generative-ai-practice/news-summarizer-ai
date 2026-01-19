import { promises as fs } from "node:fs";
import path from "node:path";

type TimelineItem = {
  id: string;
  title: string;
  published: string;
  collectedAt: string;
  url: string;
  provider: string;
  category: string;
  source: string;
  sourceMedium: string;
  summary: string;
  summaryLines: string[];
};

type Frontmatter = Record<string, string>;

const OUTPUT_ROOT = path.resolve(process.cwd(), "output");
const PUBLIC_ROOT = path.resolve(process.cwd(), "public");
const DATA_PATH = path.join(PUBLIC_ROOT, "data.json");

const readFile = async (filePath: string) => {
  const raw = await fs.readFile(filePath, "utf8");
  return raw.replace(/\r\n/g, "\n");
};

const walk = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

const parseFrontmatter = (
  content: string,
): { fm: Frontmatter; body: string } => {
  if (!content.startsWith("---\n")) {
    return { fm: {}, body: content };
  }
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { fm: {}, body: content };

  const fmLines = match[1].split("\n");
  const fm: Frontmatter = {};
  for (const line of fmLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const pair = trimmed.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!pair) continue;
    const key = pair[1];
    let value = pair[2].trim();
    value = value.replace(/^["']/, "").replace(/["']$/, "");
    fm[key] = value;
  }
  const body = content.slice(match[0].length);
  return { fm, body };
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderInline = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let out = "";

  while ((match = regex.exec(text)) !== null) {
    const [full, label, url] = match;
    out += escapeHtml(text.slice(lastIndex, match.index));
    out += `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="text-tide underline decoration-tide/70 underline-offset-2 hover:text-ink">${escapeHtml(label)}</a>`;
    lastIndex = match.index + full.length;
  }

  out += escapeHtml(text.slice(lastIndex));
  return out;
};

const collectSections = (body: string) => {
  const lines = body.split("\n");
  const sections: Record<string, string[]> = {};
  let current = "body";
  let inCodeBlock = false;
  sections[current] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (line.startsWith("## ")) {
      current = line.replace(/^##\s+/, "").toLowerCase();
      if (!sections[current]) sections[current] = [];
      continue;
    }
    if (!line) continue;
    sections[current].push(line);
  }

  return sections;
};

const isTableLine = (line: string) => {
  if (!line.startsWith("|")) return false;
  const pipeCount = (line.match(/\|/g) || []).length;
  return pipeCount >= 2;
};

const isSeparatorLine = (line: string) =>
  /^\|[:\-\s|]+\|$/.test(line.replace(/\t/g, " "));

const splitRow = (line: string) =>
  line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const buildTableHtml = (lines: string[]) => {
  if (!lines.length) return "";
  const headerCells = splitRow(lines[0]);
  let bodyStart = 1;
  if (lines[1] && isSeparatorLine(lines[1])) {
    bodyStart = 2;
  }
  const rows = lines.slice(bodyStart).map(splitRow);

  const head = `<thead><tr>${headerCells
    .map(
      (cell) =>
        `<th class="border border-ink/20 bg-ink/5 px-3 py-2 text-left">${renderInline(cell)}</th>`,
    )
    .join("")}</tr></thead>`;
  const body = `<tbody>${rows
    .map(
      (cells) =>
        `<tr>${cells
          .map(
            (cell) =>
              `<td class="border border-ink/10 px-3 py-2">${renderInline(cell)}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("")}</tbody>`;

  return `<div class="overflow-x-auto"><table class="min-w-full border-collapse text-xs sm:text-sm">${head}${body}</table></div>`;
};

const buildLinesWithTables = (lines: string[]) => {
  const output: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i].trim();
    if (raw.startsWith("```") || raw.startsWith("## ")) {
      i += 1;
      continue;
    }
    if (isTableLine(raw)) {
      const tableLines: string[] = [raw];
      let j = i + 1;
      while (j < lines.length && isTableLine(lines[j].trim())) {
        tableLines.push(lines[j].trim());
        j += 1;
      }
      const html = buildTableHtml(tableLines);
      if (html) output.push(`__TABLE__${html}`);
      i = j;
      continue;
    }

    const cleaned = raw.replace(/^\s*[-*]\s+/, "").trim();
    if (cleaned) {
      output.push(cleaned.replace(/^[#]+\s*/, "").trim());
    }
    i += 1;
  }
  return output.filter(Boolean);
};

const extractSummaryLines = (body: string): string[] => {
  const sections = collectSections(body);
  const keys = ["key points", "summary", "updates (translated)", "body"];
  for (const key of keys) {
    const lines = sections[key] ?? [];
    const cleaned = buildLinesWithTables(lines);
    if (cleaned.length > 0) return cleaned.slice(0, 6);
  }
  return [];
};

const extractSummary = (body: string): string => {
  const sections = collectSections(body);
  const candidates = ["summary", "updates (translated)", "body"];
  for (const key of candidates) {
    const lines = sections[key] ?? [];
    for (const line of lines) {
      const cleaned = line.replace(/^\s*[-*]\s+/, "").trim();
      if (!cleaned || cleaned.startsWith("#")) continue;
      return cleaned.replace(/\s+/g, " ").slice(0, 240);
    }
  }
  return "";
};

const extractDateFromFilename = (filename: string): string | null => {
  const match = filename.match(/-(\d{4})(\d{2})(\d{2})-/);
  if (!match) return null;
  return `${match[1]}-${match[2]}-${match[3]}`;
};

const buildItem = (
  filePath: string,
  content: string,
  collectedAt: string,
): TimelineItem | null => {
  const normalized = filePath.split(path.sep).join("/");
  const parts = normalized.split("/output/")[1]?.split("/") ?? [];
  if (parts.length < 4) return null;
  const provider = parts[0];
  const category = parts[1];
  const filename = parts[parts.length - 1];

  const { fm, body } = parseFrontmatter(content);
  const published =
    fm.published || extractDateFromFilename(filename) || "unknown";
  const effectiveCollectedAt =
    collectedAt && collectedAt !== "n/a" ? collectedAt : published;
  const title = fm.title || filename.replace(/\.md$/, "");
  const summaryLines = extractSummaryLines(body);
  const summary = extractSummary(body);

  return {
    id: `${provider}-${category}-${filename}`,
    title,
    published,
    collectedAt: effectiveCollectedAt,
    url: fm.url || "",
    provider,
    category,
    source: fm.source || category,
    sourceMedium: fm.source_medium || "",
    summary,
    summaryLines,
  };
};

const isCollectedAtValid = (value: string) => {
  if (!value || value === "n/a") return false;
  const parsed = Date.parse(value);
  return !Number.isNaN(parsed);
};

const sortItems = (items: TimelineItem[]) => {
  return items.sort((a, b) => {
    const aHasCollected = isCollectedAtValid(a.collectedAt);
    const bHasCollected = isCollectedAtValid(b.collectedAt);

    if (aHasCollected && bHasCollected) {
      if (a.collectedAt === b.collectedAt) {
        return a.title.localeCompare(b.title);
      }
      return a.collectedAt < b.collectedAt ? 1 : -1;
    }

    if (!aHasCollected && !bHasCollected) {
      if (a.published === b.published) {
        return a.title.localeCompare(b.title);
      }
      return a.published < b.published ? 1 : -1;
    }

    if (aHasCollected && !bHasCollected) return -1;
    return 1;
  });
};

const main = async () => {
  try {
    const files = (await walk(OUTPUT_ROOT)).filter(
      (file) =>
        file.includes(`${path.sep}summaries${path.sep}`) &&
        file.endsWith(".md"),
    );
    const items: TimelineItem[] = [];

    for (const filePath of files) {
      const content = await readFile(filePath);
      const { fm } = parseFrontmatter(content);
      const collectedAt = fm.collected_at || "";
      const item = buildItem(filePath, content, collectedAt);
      if (item) items.push(item);
    }

    const payload = {
      generatedAt: new Date().toISOString(),
      items: sortItems(items),
    };
    await fs.mkdir(PUBLIC_ROOT, { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(payload, null, 2));
    console.log(`[timeline] wrote ${items.length} items to ${DATA_PATH}`);
  } catch (error) {
    console.error("[timeline] failed to build data.json", error);
    process.exit(1);
  }
};

main();
