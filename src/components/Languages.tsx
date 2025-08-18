import { formatBytes } from "@/app/actions/formatBytes";
import React, { useEffect, useState } from "react";
import { SkeletonLanguages } from "./Skeleton";

type LanguageCount = {
  language: string;
  bytes: number;
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
    if (!repos.length) {
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
        .map(([language, bytes]) => ({ language, bytes }));

      setLanguages(sortedLanguages);
      setLoading(false);
    };

    if (repos.length > 0) {
      fetchLanguages();
    }
  }, [repos]);

  return (
    <aside className="languages-aside hide-mobile w-3xs p-4 border rounded-sm border-gray-700">
      <h2 className="text-center">Top 10 Languages</h2>
      {loading ? (
        <SkeletonLanguages />
      ) : (
        <ul className="p-2">
          {languages.map((lang) => (
            <li
              key={lang.language}
              className="language flex justify-between text-sm  py-1"
            >
              <span className="text-gray-400">{lang.language}</span>
              <span className="text-gray-500">{formatBytes(lang.bytes)}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
