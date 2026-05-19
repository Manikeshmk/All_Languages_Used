import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllRepositories, aggregateLanguages } from '../lib/github';
import {
  formatLanguageStats,
  sanitizeUsername,
  getCacheTTL,
} from '../lib/utils';
import { cache } from '../lib/cache';
import { UserLanguages } from '../lib/types';

/**
 * JSON API endpoint for /api/languages-json
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow GET
  if (req.method !== 'GET') {
    res.status(405).json({
      error: 'Method not allowed',
    });
    return;
  }

  try {
    const {
      username,
      include_private = 'false',
      include_archived = 'false',
    } = req.query;

    // Validate username
    if (!username || typeof username !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Username parameter is required',
      });
      return;
    }

    const sanitizedUsername = sanitizeUsername(username);

    const isPrivate = include_private === 'true';
    const isArchived = include_archived === 'true';

    // Cache key
    const cacheKey = `json:${sanitizedUsername}:${isPrivate}:${isArchived}`;

    // Check cache
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=43200');
      res.setHeader('X-Cached', 'true');

      res.status(200).json({
        ...cachedData,
        cached: true,
      });

      return;
    }

    // Fetch repositories
    const repositories = await fetchAllRepositories(
      sanitizedUsername,
      isPrivate,
      isArchived
    );

    // Aggregate languages
    const languageMap = await aggregateLanguages(repositories);

    // Format stats
    const languages = formatLanguageStats(languageMap);

    // Final response object
    const userData: UserLanguages = {
      username: sanitizedUsername,
      totalLanguages: languages.length,
      languages,
      totalRepositories: repositories.length,
      generatedAt: new Date().toISOString(),
    };

    // Store in cache
    (cache as any)["set"](
  cacheKey,
  userData,
  getCacheTTL()
);

    // Headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=43200');
    res.setHeader('X-Cached', 'false');

    // Send response
    res.status(200).json({
      ...userData,
      cached: false,
    });

    return;

  } catch (error) {
    console.error('JSON API Error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error';

    if (message.includes('not found')) {
      res.status(404).json({
        success: false,
        error: message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });

    return;
  }
}
