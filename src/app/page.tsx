"use client";
import { RepoCard } from "@/components/Card";
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
type LanguageStat = {
  language: string;
  count: number;
};
type Repo = {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  login?: string; // Optional user name
  language?: string; // Optional language field
  avatar?: string; // Optional user avatar URL
  forks?: number; // Optional forks count
};

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");
  const [topLanguages, setTopLanguages] = useState<LanguageStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/repos`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched repos:", data.repos); // Add this line for debugging
        setRepos(data.repos);
        setTopLanguages(data.topLanguages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch repos:", err);
        setLoading(false);
      });
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="font-sans flex gap-4 justify-around ">
      <div className="flex flex-col items-center gap-5 p-4">
        <SearchBar search={search} setSearch={setSearch} />
        <h1>Most Liked Repos List</h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredRepos.length === 0 ? (
          <p className="text-gray-500">No repositories found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredRepos.map((repo: Repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
      <aside className="w-1/4 max-h-fit p-4 mt-10 border rounded-sm border-gray-500">
        <h2>Top 10 Languages</h2>
        <ul className="p-2">
          {topLanguages.map((lang) => (
            <li
              key={lang.language}
              className="flex justify-between text-sm text-gray-400 py-1"
            >
              <span>{lang.language}</span>
              <span>{lang.count}</span>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
