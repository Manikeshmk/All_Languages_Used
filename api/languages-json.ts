import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllRepositories, aggregateLanguages } from '../lib/github';
import { formatLanguageStats, sanitizeUsername, getCacheTTL } from '../lib/utils';
import { cache } from '../lib/cache';
import { UserLanguages } from '../lib/types';

/**
 * JSON API endpoint for /api/languages-json
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      username,
      include_private = 'false',
      include_archived = 'false',
      exclude = '',
    } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Username parameter is required',
      });
    }

    const sanitizedUsername = sanitizeUsername(username);
    const isPrivate = include_private === 'true';
    const isArchived = include_archived === 'true';

    // Check cache
    const cacheKey = `json:${sanitizedUsername}:${isPrivate}:${isArchived}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res
        .status(200)
        .set({
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=43200',
          'X-Cached': 'true',
        })
        .json({ ...cachedData, cached: true });
    }

    // Fetch and process
    const repositories = await fetchAllRepositories(
      sanitizedUsername,
      isPrivate,
      isArchived
    );

    const languageMap = aggregateLanguages(repositories);
    const languages = formatLanguageStats(languageMap);

    const userData: UserLanguages = {
      username: sanitizedUsername,
      totalLanguages: languages.length,
      languages,
      totalRepositories: repositories.length,
      generatedAt: new Date().toISOString(),
    };

    cache.set(cacheKey, userData, getCacheTTL());

    return res
      .status(200)
      .set({
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=43200',
        'X-Cached': 'false',
      })
      .json({ ...userData, cached: false });

  } catch (error) {
    console.error('JSON API Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('not found')) {
      return res.status(404).json({ success: false, error: message });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
