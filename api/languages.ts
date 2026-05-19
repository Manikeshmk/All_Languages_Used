import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllRepositories, aggregateLanguages } from '../lib/github';
import { formatLanguageStats, sanitizeUsername, getCacheTTL } from '../lib/utils';
import { generateSVG, generateJSON } from '../lib/svg-generator';
import { cache, getCacheHeaders } from '../lib/cache';
import { UserLanguages } from '../lib/types';

/**
 * Main API handler for /api/languages
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract and validate query parameters
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

    // Validate required parameter
    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Username parameter is required',
      });
    }

    const sanitizedUsername = sanitizeUsername(username);

    // Validate parameters
    if (!['light', 'dark'].includes(theme as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid theme. Use "light" or "dark"',
      });
    }

    const numColumns = Math.max(1, Math.min(6, parseInt(columns as string) || 4));
    const isCompact = compact === 'true';
    const isPrivate = include_private === 'true';
    const isArchived = include_archived === 'true';
    const excludedLangs = (exclude as string)
      .split(',')
      .map((l) => l.trim().toLowerCase())
      .filter(Boolean);

    // Check cache
    const cacheKey = `${sanitizedUsername}:${theme}:${numColumns}:${isCompact}:${isPrivate}:${isArchived}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      const svg = generateSVG(cachedData, {
        theme: theme as 'light' | 'dark',
        columns: numColumns,
        compact: isCompact,
        title: title as string,
      });

      return res
        .status(200)
        .set(getCacheHeaders(true))
        .send(svg);
    }

    // Fetch repositories
    const repositories = await fetchAllRepositories(
      sanitizedUsername,
      isPrivate,
      isArchived
    );

    if (repositories.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No repositories found for user "${sanitizedUsername}"`,
      });
    }

    // Aggregate languages
    const languageMap = aggregateLanguages(repositories);

    // Filter excluded languages
    for (const excluded of excludedLangs) {
      for (const [lang] of languageMap) {
        if (lang.toLowerCase() === excluded) {
          languageMap.delete(lang);
        }
      }
    }

    if (languageMap.size === 0) {
      return res.status(404).json({
        success: false,
        error: 'No languages found after applying filters',
      });
    }

    // Format language statistics
    const languages = formatLanguageStats(languageMap);

    // Create user data response
    const userData: UserLanguages = {
      username: sanitizedUsername,
      totalLanguages: languages.length,
      languages,
      totalRepositories: repositories.length,
      generatedAt: new Date().toISOString(),
    };

    // Cache the result
    cache.set(cacheKey, userData, getCacheTTL());

    // Return based on format
    if (format === 'json') {
      return res
        .status(200)
        .set({
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=43200',
        })
        .send(JSON.stringify(userData, null, 2));
    }

    // Default: SVG format
    const svg = generateSVG(userData, {
      theme: theme as 'light' | 'dark',
      columns: numColumns,
      compact: isCompact,
      title: title as string,
    });

    return res
      .status(200)
      .set(getCacheHeaders(false))
      .send(svg);

  } catch (error) {
    console.error('API Error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    // Return appropriate error response
    if (message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: message,
      });
    }

    if (message.includes('Invalid')) {
      return res.status(400).json({
        success: false,
        error: message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.',
    });
  }
}
