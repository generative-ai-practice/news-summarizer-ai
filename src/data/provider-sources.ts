export const providerSources = [
  {
    id: "openai-news",
    provider: "openai",
    category: "news",
    label: "OpenAI News (RSS)",
    url: "https://openai.com/news/rss.xml",
    order: 1,
  },
  {
    id: "openai-changelog",
    provider: "openai",
    category: "changelog",
    label: "OpenAI Platform Changelog",
    url: "https://platform.openai.com/docs/changelog",
    order: 2,
  },
  {
    id: "openai-deprecations",
    provider: "openai",
    category: "platform-deprecations",
    label: "OpenAI Platform Deprecations",
    url: "https://platform.openai.com/docs/deprecations",
    order: 3,
  },
  {
    id: "anthropic-news",
    provider: "anthropic",
    category: "news",
    label: "Anthropic News",
    url: "https://www.anthropic.com/news",
    order: 4,
  },
  {
    id: "anthropic-release-notes",
    provider: "anthropic",
    category: "release-notes",
    label: "Claude Release Notes",
    url: "https://platform.claude.com/docs/en/release-notes/overview",
    fetchUrl: "https://platform.claude.com/docs/en/release-notes/overview.md",
    order: 5,
  },
  {
    id: "anthropic-model-deprecations",
    provider: "anthropic",
    category: "model-deprecations",
    label: "Claude Model Deprecations",
    url: "https://platform.claude.com/docs/en/about-claude/model-deprecations.md",
    order: 6,
  },
  {
    id: "gemini-news",
    provider: "gemini",
    category: "news",
    label: "Google Gemini Blog (RSS)",
    url: "https://blog.google/products/gemini/rss/",
    order: 7,
  },
  {
    id: "gemini-changelog",
    provider: "gemini",
    category: "changelog",
    label: "Gemini API Changelog",
    url: "https://ai.google.dev/gemini-api/docs/changelog.md.txt",
    order: 8,
  },
] as const;

export type ProviderSource = (typeof providerSources)[number];
export type ProviderSourceId = ProviderSource["id"];

const providerSourceMap = new Map(
  providerSources.map((source) => [source.id, source]),
);

export const getProviderSource = (id: ProviderSourceId): ProviderSource => {
  const source = providerSourceMap.get(id);
  if (!source) {
    throw new Error(`Unknown provider source: ${id}`);
  }
  return source;
};

export const getProviderSourceUrl = (id: ProviderSourceId) => {
  const source = getProviderSource(id);
  return source.fetchUrl ?? source.url;
};
