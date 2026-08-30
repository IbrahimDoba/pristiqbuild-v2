/**
 * Fixed-window rate limiter held in process memory.
 *
 * Honest about its limits: on Vercel each serverless instance keeps its own
 * counter, so the effective allowance is `limit x instanceCount`. That is
 * still a large improvement over no limit, and it costs nothing to run.
 *
 * When lead volume justifies it, swap the body of `rateLimit` for Upstash
 * Redis (`@upstash/ratelimit`). The call signature is designed not to change.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

/** Stop the map growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (windows.size < 5_000) return;
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. Sent as `Retry-After`. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { ok: true, remaining: limit - existing.count, retryAfter: 0 };
}

/**
 * Best-effort client IP.
 *
 * `x-forwarded-for` is spoofable in general, but on Vercel the edge overwrites
 * it, so the leftmost entry is trustworthy there. Falls back to a shared bucket
 * rather than failing open per-request.
 */
export function clientKey(headers: Headers, scope: string): string {
  const forwarded = headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    "unknown";

  return `${scope}:${ip}`;
}

/** Test seam. Not used in application code. */
export function __resetRateLimits() {
  windows.clear();
}
