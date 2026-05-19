import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllRepositories, aggregateLanguages } from '../../lib/github';
import {
  formatLanguageStats,
  sanitizeUsername,
  getCacheTTL,
} from '../../lib/utils';
import { generateSVG } from '../../lib/svg-generator';
import { cache, getCacheHeaders } from '../../lib/cache';
import { UserLanguages } from '../../lib/types';

/**
 * Main API handler for /api/languages
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {

  // Allow only GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      error: 'Method not allowed',
    });
    return;
  }

  try {
    // Query parameters
    const {
      username,
      theme = 'dark',
      columns = '4',
      compact = 'false',
      title = 'All Languages Used',
      exclude = '',
      include_private = 'false',
      include_archived = 'false',
      format = 'svg',
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

    // Validate theme
    if (!['light', 'dark'].includes(theme as string)) {
      res.status(400).json({
        success: false,
        error: 'Invalid theme. Use "light" or "dark"',
      });
      return;
    }

    // Parse options
    const numColumns = Math.max(
      1,
      Math.min(6, parseInt(columns as string) || 4)
    );

    const isCompact = compact === 'true';
    const isPrivate = include_private === 'true';
    const isArchived = include_archived === 'true';

    const excludedLangs = (exclude as string)
      .split(',')
      .map((l) => l.trim().toLowerCase())
      .filter(Boolean);

    // Cache key
    const cacheKey =
      `${sanitizedUsername}:${theme}:${numColumns}:` +
      `${isCompact}:${isPrivate}:${isArchived}`;

    // Check cache
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      const svg = generateSVG(cachedData, {
        theme: theme as 'light' | 'dark',
        columns: numColumns,
        compact: isCompact,
        title: title as string,
      });

      const headers = getCacheHeaders(true);

      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      res.status(200).send(svg);
      return;
    }

    // Fetch repositories
    const repositories = await fetchAllRepositories(
      sanitizedUsername,
      isPrivate,
      isArchived
    );

    // No repositories
    if (repositories.length === 0) {
      res.status(404).json({
        success: false,
        error: `No repositories found for user "${sanitizedUsername}"`,
      });
      return;
    }

    // Aggregate languages
    const languageMap = await aggregateLanguages(repositories);

    // Filter excluded languages
    for (const excluded of excludedLangs) {
      for (const [lang] of languageMap) {
        if (lang.toLowerCase() === excluded) {
          languageMap.delete(lang);
        }
      }
    }

    // No languages left
    if (languageMap.size === 0) {
      res.status(404).json({
        success: false,
        error: 'No languages found after applying filters',
      });
      return;
    }

    // Format stats
    const languages = formatLanguageStats(languageMap);

    // User response object
    const userData: UserLanguages = {
      username: sanitizedUsername,
      totalLanguages: languages.length,
      languages,
      totalRepositories: repositories.length,
      generatedAt: new Date().toISOString(),
    };

    // Cache result
    (cache as any)["set"](
  cacheKey,
  userData,
  getCacheTTL()
);

    // JSON mode
    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader(
        'Cache-Control',
        'public, max-age=43200'
      );

      res
        .status(200)
        .send(JSON.stringify(userData, null, 2));

      return;
    }

    // Generate SVG
    const svg = generateSVG(userData, {
      theme: theme as 'light' | 'dark',
      columns: numColumns,
      compact: isCompact,
      title: title as string,
    });

    // Cache headers
    const headers = getCacheHeaders(false);

    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // SVG content type
    res.setHeader('Content-Type', 'image/svg+xml');

    // Send SVG
    res.status(200).send(svg);

    return;

  } catch (error) {
    console.error('API Error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error';

    // Not found
    if (message.includes('not found')) {
      res.status(404).json({
        success: false,
        error: message,
      });

      return;
    }

    // Validation error
    if (message.includes('Invalid')) {
      res.status(400).json({
        success: false,
        error: message,
      });

      return;
    }

    // Generic error
    res.status(500).json({
      success: false,
      error:
        'Internal server error. Please try again later.',
    });

    return;
  }
}
