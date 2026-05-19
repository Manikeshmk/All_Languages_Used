import axios from 'axios';
import { Repository, GitHubLanguage, QueryVariables } from './types';

const GITHUB_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.warn('⚠️ GITHUB_TOKEN not set. API will have lower rate limits.');
}

/**
 * GraphQL query to fetch repositories with language information
 */
const REPOS_QUERY = `
  query($login: String!, $after: String, $first: Int = 100) {
    user(login: $login) {
      repositories(first: $first, after: $after, orderBy: {field: UPDATED_AT, direction: DESC}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            name
            url
            isPrivate
            isArchived
            languages(first: 50) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Validate GitHub username format
 */
export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
  return usernameRegex.test(username) && username.length <= 39;
}

/**
 * Fetch all repositories for a GitHub user
 */
export async function fetchAllRepositories(
  username: string,
  includePrivate: boolean = false,
  includeArchived: boolean = false
): Promise<Repository[]> {
  if (!validateUsername(username)) {
    throw new Error(`Invalid GitHub username: ${username}`);
  }

  const repositories: Repository[] = [];
  let hasNextPage = true;
  let afterCursor: string | null = null;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops

  while (hasNextPage && attempts < maxAttempts) {
    attempts++;
    
    try {
      const variables: QueryVariables = {
        login: username,
        first: 100,
        ...(afterCursor && { after: afterCursor }),
      };

      const response = await axios.post(
        GITHUB_API,
        {
          query: REPOS_QUERY,
          variables,
        },
        {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      // Handle GraphQL errors
      if (response.data.errors) {
        const errorMsg = response.data.errors
          .map((e: any) => e.message)
          .join(', ');
        throw new Error(`GraphQL Error: ${errorMsg}`);
      }

      const userData = response.data.data?.user;
      if (!userData) {
        throw new Error(`User "${username}" not found`);
      }

      const repoEdges = userData.repositories.edges;

      for (const edge of repoEdges) {
        const repo = edge.node;

        // Filter based on parameters
        if (!includePrivate && repo.isPrivate) continue;
        if (!includeArchived && repo.isArchived) continue;

        // Extract language names
        const languages: GitHubLanguage = {};
        for (const langEdge of repo.languages.edges) {
          const langName = langEdge.node.name;
          languages[langName] = (languages[langName] || 0) + 1;
        }

        repositories.push({
          name: repo.name,
          url: repo.url,
          isPrivate: repo.isPrivate,
          isArchived: repo.isArchived,
          languages,
        });
      }

      // Pagination
      hasNextPage = userData.repositories.pageInfo.hasNextPage;
      afterCursor = userData.repositories.pageInfo.endCursor;

      // Rate limit respect
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid GitHub token');
        }
        if (error.response?.status === 404) {
          throw new Error(`User "${username}" not found`);
        }
      }
      throw error;
    }
  }

  return repositories;
}

/**
 * Extract and aggregate all languages from repositories
 */
export function aggregateLanguages(repositories: Repository[]): Map<string, number> {
  const languageMap = new Map<string, number>();

  for (const repo of repositories) {
    for (const [lang, count] of Object.entries(repo.languages)) {
      const current = languageMap.get(lang) || 0;
      languageMap.set(lang, current + count);
    }
  }

  return languageMap;
}
