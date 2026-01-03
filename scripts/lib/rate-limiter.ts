import { RateLimiterConfig } from "../types/provider-info";

const DEFAULT_CONFIG: Required<RateLimiterConfig> = {
  delayMs: 2000,
  maxRetries: 3,
  backoffFactor: 2,
  maxDelayMs: 30000,
};

export class RateLimiter {
  private readonly config: Required<RateLimiterConfig>;

  constructor(config: RateLimiterConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private isRateLimitError(error: unknown): boolean {
    const maybeError = error as {
      status?: number;
      response?: { status?: number };
    };
    return maybeError?.status === 429 || maybeError?.response?.status === 429;
  }

  async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    let attempt = 0;
    let delay = this.config.delayMs;

    while (true) {
      try {
        if (attempt > 0) {
          await this.wait(Math.min(delay, this.config.maxDelayMs));
          delay = Math.min(
            delay * this.config.backoffFactor,
            this.config.maxDelayMs,
          );
        }
        return await fn();
      } catch (error) {
        attempt += 1;
        if (attempt > this.config.maxRetries) {
          throw error;
        }
        if (!this.isRateLimitError(error)) {
          // Retry non-429 errors as well, but keep the same backoff path.
        }
      }
    }
  }
}
