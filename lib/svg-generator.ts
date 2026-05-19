import { LanguageStats, UserLanguages } from './types';
import { LANGUAGE_COLORS } from './utils';

interface SVGOptions {
  theme: 'light' | 'dark';
  columns: number;
  compact: boolean;
  title: string;
}

/**
 * Generate SVG image for language statistics
 */
export function generateSVG(
  data: UserLanguages,
  options: SVGOptions
): string {
  const {
    theme,
    columns,
    compact,
    title,
  } = options;

  // Sort languages by count (descending)
  const sortedLanguages = [...data.languages].sort((a, b) => b.count - a.count);

  // Calculate dimensions
  const itemWidth = 140;
  const itemHeight = compact ? 40 : 60;
  const padding = 20;
  const titleHeight = title ? 50 : 0;
  const rows = Math.ceil(sortedLanguages.length / columns);
  const width = columns * itemWidth + padding * 2;
  const height = titleHeight + rows * itemHeight + padding * 2 + 20;

  // Theme colors
  const colors = theme === 'dark'
    ? {
        background: '#0d1117',
        border: '#30363d',
        text: '#c9d1d9',
        subtext: '#8b949e',
      }
    : {
        background: '#ffffff',
        border: '#e5e7eb',
        text: '#1f2937',
        subtext: '#6b7280',
      };

  let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <style>
          .lang-name { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 500; }
          .lang-count { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; opacity: 0.7; }
          .lang-percent { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; opacity: 0.6; }
          .title-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: 600; }
        </style>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.border};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${colors.border};stop-opacity:0.1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${colors.background}"/>

      <!-- Border -->
      <rect width="${width}" height="${height}" fill="none" stroke="${colors.border}" stroke-width="1"/>
  `;

  // Add title
  if (title) {
    svg += `
      <text x="${padding}" y="${padding + 18}" class="title-text" fill="${colors.text}">${escapeXml(title)}</text>
      <line x1="${padding}" y1="${titleHeight - 5}" x2="${width - padding}" y2="${titleHeight - 5}" stroke="${colors.border}" stroke-width="1" opacity="0.3"/>
    `;
  }

  // Add language items
  let itemIndex = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (itemIndex >= sortedLanguages.length) break;

      const lang = sortedLanguages[itemIndex];
      const x = padding + col * itemWidth;
      const y = titleHeight + padding + row * itemHeight;

      svg += generateLanguageItem(lang, x, y, itemWidth, itemHeight, colors, compact);
      itemIndex++;
    }
  }

  svg += `</svg>`;

  return svg;
}

/**
 * Generate individual language item SVG
 */
function generateLanguageItem(
  lang: LanguageStats,
  x: number,
  y: number,
  width: number,
  height: number,
  colors: any,
  compact: boolean
): string {
  const cornerRadius = 6;
  const dotRadius = 3;
  const dotX = x + 8;
  const dotY = y + (height / 2);

  let svg = `
    <!-- Language: ${escapeXml(lang.name)} -->
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${cornerRadius}" fill="url(#grad)" stroke="${colors.border}" stroke-width="0.5"/>
      <circle cx="${dotX}" cy="${dotY}" r="${dotRadius}" fill="${lang.color}"/>
  `;

  if (compact) {
    svg += `
      <text x="${x + 20}" y="${y + 14}" class="lang-name" fill="${colors.text}">${escapeXml(lang.name)}</text>
      <text x="${x + 105}" y="${y + 14}" class="lang-count" fill="${colors.subtext}" text-anchor="end">${lang.count}</text>
    `;
  } else {
    svg += `
      <text x="${x + 20}" y="${y + 12}" class="lang-name" fill="${colors.text}">${escapeXml(lang.name)}</text>
      <text x="${x + 20}" y="${y + 28}" class="lang-percent" fill="${colors.subtext}">${lang.percentage.toFixed(1)}% (${lang.count})</text>
    `;
  }

  svg += `</g>`;
  return svg;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate JSON response
 */
export function generateJSON(data: UserLanguages): string {
  return JSON.stringify(data, null, 2);
}
