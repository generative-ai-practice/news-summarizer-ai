import { promises as fs } from "node:fs";
import path from "node:path";

type TimelineItem = {
  id: string;
  title: string;
  published: string;
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

const parseFrontmatter = (content: string): { fm: Frontmatter; body: string } => {
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
    if (inCodeBlock) continue;
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

const extractSummaryLines = (body: string): string[] => {
  const sections = collectSections(body);
  const keys = ["key points", "summary", "updates (translated)"];
  for (const key of keys) {
    const lines = sections[key] ?? [];
    const bullets = lines
      .map((line) => line.replace(/^\s*[-*]\s+/, "").trim())
      .filter(Boolean);
    if (bullets.length > 0) return bullets.slice(0, 6);
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

const buildItem = (filePath: string, content: string): TimelineItem | null => {
  const normalized = filePath.split(path.sep).join("/");
  const parts = normalized.split("/output/")[1]?.split("/") ?? [];
  if (parts.length < 4) return null;
  const provider = parts[0];
  const category = parts[1];
  const filename = parts[parts.length - 1];

  const { fm, body } = parseFrontmatter(content);
  const published =
    fm.published || extractDateFromFilename(filename) || "unknown";
  const title = fm.title || filename.replace(/\.md$/, "");
  const summaryLines = extractSummaryLines(body);
  const summary = extractSummary(body);

  return {
    id: `${provider}-${category}-${filename}`,
    title,
    published,
    url: fm.url || "",
    provider,
    category,
    source: fm.source || category,
    sourceMedium: fm.source_medium || "",
    summary,
    summaryLines,
  };
};

const sortItems = (items: TimelineItem[]) => {
  return items.sort((a, b) => {
    if (a.published === b.published) return a.title.localeCompare(b.title);
    return a.published < b.published ? 1 : -1;
  });
};

const main = async () => {
  try {
    const files = (await walk(OUTPUT_ROOT)).filter(
      (file) =>
        file.includes(`${path.sep}summaries${path.sep}`) && file.endsWith(".md"),
    );
    const items: TimelineItem[] = [];

    for (const filePath of files) {
      const content = await readFile(filePath);
      const item = buildItem(filePath, content);
      if (item) items.push(item);
    }

    const payload = { generatedAt: new Date().toISOString(), items: sortItems(items) };
    await fs.mkdir(PUBLIC_ROOT, { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(payload, null, 2));
    console.log(`[timeline] wrote ${items.length} items to ${DATA_PATH}`);
  } catch (error) {
    console.error("[timeline] failed to build data.json", error);
    process.exit(1);
  }
};

main();
