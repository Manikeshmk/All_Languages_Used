import { UserLanguages, CacheEntry } from './types';

/**
 * Simple in-memory cache for serverless functions
 * Note: This doesn't persist across serverless function invocations.
 * For production, consider using Redis or similar.
 */
class MemoryCache {
  private cache: Map<string, CacheEntry> = new Map();

  set(key: string, data: UserLanguages, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): UserLanguages | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if cache has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

export const cache = new MemoryCache();

/**
 * Alternative: Using HTTP headers for caching
 * This relies on CDN/browser caching instead of in-memory
 */
export function getCacheHeaders(cached: boolean, ttl: number = 43200) {
  return {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': `public, max-age=${ttl}`,
    'X-Cached': cached ? 'true' : 'false',
    'X-Cache-TTL': ttl.toString(),
  };
}
