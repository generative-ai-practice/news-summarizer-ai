import "dotenv/config";
import { AnthropicProvider } from "./lib/provider-fetchers/anthropic-provider";
import { GeminiExtractor } from "./lib/gemini-extractor";
import { RateLimiter } from "./lib/rate-limiter";

type CliArgs = {
  provider: string;
  dryRun: boolean;
};

const parseArgs = (): CliArgs => {
  const args = process.argv.slice(2);
  const providerArg = args.find((arg) => arg.startsWith("--provider="));
  const dryRun = args.includes("--dry-run");
  const provider = providerArg ? providerArg.split("=")[1] : "anthropic";
  return { provider, dryRun };
};

const log = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

const main = async () => {
  const { provider, dryRun } = parseArgs();
  if (provider !== "anthropic") {
    console.error(
      `Unsupported provider: ${provider}. Only 'anthropic' is supported in Phase 1.`,
    );
    process.exit(1);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is required.");
    process.exit(1);
  }

  log(`[provider-news] start: provider=${provider}, dryRun=${dryRun}`);

  const rateLimiter = new RateLimiter({ delayMs: 2000, maxRetries: 3 });
  const extractor = new GeminiExtractor(apiKey, rateLimiter);
  const providerFetcher = new AnthropicProvider(extractor, rateLimiter, {
    dryRun,
  });

  try {
    await providerFetcher.run();
    log(`[provider-news] done: provider=${provider}, dryRun=${dryRun}`);
  } catch (error) {
    log("[provider-news] failed:", error);
    process.exit(1);
  }
};

main();
