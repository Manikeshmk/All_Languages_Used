import { LanguageStats } from './types';

/**
 * GitHub language colors mapping
 */
export const LANGUAGE_COLORS: { [key: string]: string } = {
  'TypeScript': '#3178c6',
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  'C': '#555555',
  'Go': '#00ADD8',
  'Rust': '#CE422B',
  'Ruby': '#CC342D',
  'PHP': '#777BB4',
  'Swift': '#FA7343',
  'Kotlin': '#F18E33',
  'SQL': '#336791',
  'CSS': '#563d7c',
  'SCSS': '#C6538C',
  'HTML': '#E34C26',
  'Dart': '#00B4AB',
  'Vue': '#2c3e50',
  'React': '#61dafb',
  'Shell': '#89e051',
  'Vim Script': '#199f4b',
  'YAML': '#CB171E',
  'JSON': '#292929',
  'Markdown': '#083fa1',
  'EJS': '#A91E50',
  'Perl': '#0298c3',
  'Clojure': '#db5855',
  'Elixir': '#6e4a7e',
  'Erlang': '#B83998',
  'Haskell': '#5E5086',
  'Lua': '#000080',
  'Groovy': '#4298B8',
  'Scala': '#DC322F',
  'ObjectiveC': '#438EFF',
  'R': '#198CE7',
  'Matlab': '#0E434C',
};

/**
 * Get color for a programming language
 */
export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] || '#858585';
}

/**
 * Format language statistics
 */
export function formatLanguageStats(
  languageMap: Map<string, number>
): LanguageStats[] {
  const total = Array.from(languageMap.values()).reduce((a, b) => a + b, 0);

  return Array.from(languageMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / total) * 100,
      color: getLanguageColor(name),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Generate cache key
 */
export function generateCacheKey(username: string, options: any): string {
  return `languages:${username}:${JSON.stringify(options)}`;
}

/**
 * Sanitize username
 */
export function sanitizeUsername(username: string): string {
  return username.toLowerCase().trim();
}

/**
 * Calculate cache TTL (12 hours)
 */
export function getCacheTTL(): number {
  return 12 * 60 * 60 * 1000; // 12 hours in milliseconds
}
