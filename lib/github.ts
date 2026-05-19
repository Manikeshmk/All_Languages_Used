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

    const data = await response.json();

    if (data.length === 0) break;

    repos = [...repos, ...data];

    page++;
  }

  return repos.filter(
    (repo) => !repo.fork && !repo.archived
  );
}

export async function aggregateLanguages(username: string) {
  const repos = await fetchAllRepositories(username);

  const languageMap = new Map();

  for (const repo of repos) {
    const response = await fetch(repo.languages_url);

    if (!response.ok) continue;

    const languages = await response.json();

    Object.entries(languages).forEach(
      ([language, bytes]: any) => {
        if (!languageMap.has(language)) {
          languageMap.set(language, {
            name: language,
            size: 0,
            repos: 0
          });
        }

        const current = languageMap.get(language);

        current.size += bytes;
        current.repos += 1;
      }
    );
  }

  return Array.from(languageMap.values());
}
