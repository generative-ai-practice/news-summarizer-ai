import "dotenv/config";
import { GeminiExtractor } from "./lib/gemini-extractor";
import { RateLimiter } from "./lib/rate-limiter";
import { NewsProvider } from "./lib/provider-fetchers/news-provider";
import { ReleaseNotesProvider } from "./lib/provider-fetchers/release-notes-provider";
import { DeprecationsProvider } from "./lib/provider-fetchers/deprecations-provider";
import { OpenAINewsProvider } from "./lib/provider-fetchers/openai-news-provider";
import { OpenAIDeprecationsProvider } from "./lib/provider-fetchers/openai-deprecations-provider";
import { OpenAIChangelogProvider } from "./lib/provider-fetchers/openai-changelog-provider";
import { GeminiNewsProvider } from "./lib/provider-fetchers/gemini-news-provider";
import { GeminiChangelogProvider } from "./lib/provider-fetchers/gemini-changelog-provider";

type CliArgs = {
  provider: "anthropic" | "openai" | "gemini" | "all";
  dryRun: boolean;
};

const parseArgs = (): CliArgs => {
  const args = process.argv.slice(2);
  const providerArg = args.find((arg) => arg.startsWith("--provider="));
  const dryRun = args.includes("--dry-run");
  const providerStr = providerArg ? providerArg.split("=")[1] : "anthropic";
  const provider = (
    ["anthropic", "openai", "gemini", "all"].includes(providerStr)
      ? providerStr
      : "anthropic"
  ) as CliArgs["provider"];
  return { provider, dryRun };
};

const log = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

const main = async () => {
  const { provider, dryRun } = parseArgs();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is required.");
    process.exit(1);
  }

  log(`[provider-news] start: provider=${provider}, dryRun=${dryRun}`);

  const rateLimiter = new RateLimiter({ delayMs: 2000, maxRetries: 3 });
  const extractor = new GeminiExtractor(apiKey, rateLimiter);

  const runners: Array<() => Promise<void>> = [];

  const addAnthropic = () => {
    const newsProvider = new NewsProvider(extractor, rateLimiter, { dryRun });
    const releaseNotesProvider = new ReleaseNotesProvider(
      extractor,
      rateLimiter,
      {
        dryRun,
      },
    );
    const deprecationsProvider = new DeprecationsProvider(
      extractor,
      rateLimiter,
      {
        dryRun,
      },
    );
    runners.push(
      () => newsProvider.run(),
      () => releaseNotesProvider.run(),
      () => deprecationsProvider.run(),
    );
  };

  const addOpenAI = () => {
    const newsProvider = new OpenAINewsProvider(extractor, rateLimiter, {
      dryRun,
    });
    const deprecationsProvider = new OpenAIDeprecationsProvider(
      extractor,
      rateLimiter,
      { dryRun },
    );
    const changelogProvider = new OpenAIChangelogProvider(
      extractor,
      rateLimiter,
      { dryRun },
    );
    runners.push(
      () => newsProvider.run(),
      () => deprecationsProvider.run(),
      () => changelogProvider.run(),
    );
  };

  const addGemini = () => {
    const newsProvider = new GeminiNewsProvider(extractor, rateLimiter, {
      dryRun,
    });
    const changelogProvider = new GeminiChangelogProvider(
      extractor,
      rateLimiter,
      { dryRun },
    );
    runners.push(
      () => newsProvider.run(),
      () => changelogProvider.run(),
    );
  };

  if (provider === "anthropic") addAnthropic();
  else if (provider === "openai") addOpenAI();
  else if (provider === "gemini") addGemini();
  else {
    addAnthropic();
    addOpenAI();
    addGemini();
  }

  try {
    for (const run of runners) {
      await run();
    }
    log(`[provider-news] done: provider=${provider}, dryRun=${dryRun}`);
  } catch (error) {
    log("[provider-news] failed:", error);
    process.exit(1);
  }
};

main();
