export async function fetchAllRepositories(username: string) {
  let page = 1;
  let repos: any[] = [];

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data: any[] = await response.json();

    if (data.length === 0) break;

    repos = [...repos, ...data];

    page++;
  }

  return repos.filter(
    (repo) => !repo.fork && !repo.archived
  );
}

export async function aggregateLanguages(
  repositories: any[]
): Promise<Map<string, number>> {

  const languageMap = new Map<string, number>();

  for (const repo of repositories) {
    const response = await fetch(repo.languages_url);

    if (!response.ok) continue;

    const languages: Record<string, number> =
      await response.json();

    Object.entries(languages).forEach(
      ([language, bytes]) => {

        const current =
          languageMap.get(language) || 0;

        languageMap.set(
          language,
          current + Number(bytes)
        );
      }
    );
  }

  return languageMap;
}
