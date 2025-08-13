import React, { useEffect, useState } from "react";

type LanguageCount = {
  language: string;
  count: number;
};

type Repo = {
  id: number;
  languages_url: string; // URL to fetch languages
};

type LanguagesProps = {
  repos: Repo[];
};

export const Languages = ({ repos }: LanguagesProps) => {
  const [languages, setLanguages] = React.useState<LanguageCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (repos.length === 0) {
      setLanguages([]);
      return;
    }
    const fetchLanguages = async () => {
      setLoading(true);

      const headers = {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent": "moz-repo-finder",
      };

      const languageCount: Record<string, number> = {};

      await Promise.all(
        repos.map(async (repo) => {
          try {
            const response = await fetch(repo.languages_url, { headers });
            const data = await response.json();

            for (const [lang, bytes] of Object.entries(data)) {
              languageCount[lang] =
                (languageCount[lang] || 0) + (bytes as number);
            }
          } catch (error) {
            console.error(
              `Failed to fetch languages for repo ${repo.id}:`,
              error
            );
          }
        })
      );

      const sortedLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([language, count]) => ({ language, count }));

      setLanguages(sortedLanguages);
      setLoading(false);
    };

    if (repos.length > 0) {
      fetchLanguages();
    }
  }, [repos]);

  return (
    <aside className="w-3xs max-h-fit p-4 mt-20 border rounded-sm border-gray-500">
      <h2>Top 10 Languages</h2>
      {loading ? (
        <p className="text-gray-500 text-center py-2">Loading languages...</p>
      ) : (
        <ul className="p-2">
          {languages.map((lang) => (
            <li
              key={lang.language}
              className="language flex justify-between text-sm text-gray-400 py-1"
            >
              <span>{lang.language}</span>
              <span>{lang.count}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
