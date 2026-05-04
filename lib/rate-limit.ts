interface RateBucket {
  count: number;
  reset: number;
}

const buckets = new Map<string, RateBucket>();

/** Simple in-memory throttle per-route (fine for starters; migrate to KV for clusters). */
export function assertWithinRate(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || now > existing.reset) {
    buckets.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

export function clientIpFromHeaders(headerList: Headers) {
  return (
    headerList.get("x-forwarded-for")?.split(",").shift()?.trim() ??
    headerList.get("x-real-ip") ??
    headerList.get("cf-connecting-ip") ??
    "unknown"
  );
}
