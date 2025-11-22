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

      try {
        const response = await fetch("api/languages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repos }),
          next: { revalidate: 3600 },
        });

        const data = await response.json();
        setLanguages(data.languages);
      } catch (error) {
        console.error("Failed to fetch languages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [repos]);

  return (
    <aside className="languages-aside hide-mobile w-3xs mt-15 p-4 border rounded-sm border-gray-600">
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
