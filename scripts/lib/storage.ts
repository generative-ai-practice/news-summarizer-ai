import fs from "node:fs/promises";
import path from "node:path";
import { ArticleList } from "../types/provider-info";

export const buildOutputPath = (provider: string, ...segments: string[]) => {
  return path.join(process.cwd(), "output", provider, ...segments);
};

export const ensureDir = async (dirPath: string) => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const saveJSON = async (filePath: string, data: unknown) => {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const saveText = async (filePath: string, data: string) => {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, data, "utf-8");
};

export const loadJSON = async <T>(filePath: string): Promise<T | null> => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

export const generateTimestamp = () => {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().replace("Z", "+09:00");
};

const formatDatePrefix = (publishedDate?: string) => {
  if (!publishedDate) return "";
  const normalized = publishedDate.trim().split("T")[0] ?? "";
  if (!normalized) return "";
  const digits = normalized.replace(/-/g, "");
  if (digits.length === 8) return `${digits}-`;
  return "";
};

export const generateSlug = (title: string, publishedDate?: string): string => {
  const datePrefix = formatDatePrefix(publishedDate);
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
  return normalized ? `${datePrefix}${normalized}` : `${datePrefix}article`;
};

export const loadLatestArticles = async (
  provider: string,
): Promise<ArticleList | null> => {
  const latestPath = buildOutputPath(provider, "latest.json");
  return loadJSON<ArticleList>(latestPath);
};

export const saveLatestArticles = async (
  provider: string,
  data: ArticleList,
) => {
  const latestPath = buildOutputPath(provider, "latest.json");
  await saveJSON(latestPath, data);
};
