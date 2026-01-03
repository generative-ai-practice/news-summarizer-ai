export type ArticleSourceType = "news" | "release-notes" | "blog" | "other";

export type Article = {
  title: string;
  slug: string;
  url: string;
  publishedDate: string;
  source: ArticleSourceType;
  language?: string;
  summaryLanguage?: string;
};

export type ArticleList = {
  provider: string;
  lastChecked: string;
  articles: Article[];
};

export type ExtractedArticles = {
  fetchedAt: string;
  source: string;
  extractedBy: string;
  data: Article[];
};

export type ProviderSource = {
  type: ArticleSourceType;
  url: string;
};

export type ProviderConfig = {
  provider: string;
  enabled: boolean;
  language?: string;
  summaryLanguage?: string;
  sources: ProviderSource[];
  slugRule?: (title: string, publishedDate?: string) => string;
};

export type RateLimiterConfig = {
  delayMs?: number;
  maxRetries?: number;
  backoffFactor?: number;
  maxDelayMs?: number;
};
