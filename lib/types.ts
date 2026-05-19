export interface Repository {
  name: string;
  url: string;
  isPrivate: boolean;
  isArchived: boolean;
  languages: {
    [key: string]: number;
  };
}

export interface LanguageStats {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface UserLanguages {
  username: string;
  totalLanguages: number;
  languages: LanguageStats[];
  totalRepositories: number;
  generatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data?: UserLanguages;
  error?: string;
  cached?: boolean;
}

export interface CacheEntry {
  data: UserLanguages;
  timestamp: number;
  ttl: number;
}

export interface GitHubLanguage {
  [key: string]: number;
}

export interface QueryVariables {
  login: string;
  after?: string;
  first?: number;
}
