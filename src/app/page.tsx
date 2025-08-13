"use client";
import { RepoCard } from "@/components/Card";
import { Languages } from "@/components/Languages";
// import { SearchBar } from "@/components/SearchBar";
import { useSearch } from "@/context/SearchContext";
import { RepoType } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const { search } = useSearch();
  const [repos, setRepos] = useState<RepoType[]>([]);
  // const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/repos`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched repos:", data.repos); // Add this line for debugging
        setRepos(data.repos);
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
    <main className="font-sans flex gap-4 justify-evenly">
      <div className="flex flex-col items-center gap-5 p-4">
        {/* <SearchBar search={search} setSearch={setSearch} /> */}
        <h1>Most Liked Repos List</h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredRepos.length === 0 ? (
          <p className="text-gray-500">No repositories found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredRepos.map((repo: RepoType) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
      <Languages repos={repos} />
    </main>
  );
}
