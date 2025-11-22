"use client";
import { RepoCard } from "@/components/Card";
import { Languages } from "@/components/Languages";
import { SkeletonList } from "@/components/Skeleton";
import { useSearch } from "@/context/SearchContext";
import { RepoType } from "@/types";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { search, currentPage, setCurrentPage } = useSearch();
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"stars" | "forks" | "updated">("stars");

  const itemsPerPage = 15;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data.repos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch repos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sortedRepos = useMemo(() => {
    const sorted = [...repos];

    const sortFunctions: Record<string, (a: RepoType, b: RepoType) => number> =
      {
        stars: (a, b) => b.stargazers_count - a.stargazers_count,
        forks: (a, b) => b.forks_count - a.forks_count,
        updated: (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      };
    return sorted.sort(sortFunctions[sortBy]);
  }, [repos, sortBy]);

  const filteredRepos = sortedRepos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  return (
    <main className=" flex gap-4 justify-around px-4">
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="flex justify-between gap-4 w-full">
          <p className="self-start font-light">
            A list of the most starred repos
          </p>
          <div className="radio-group flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sort"
                value="stars"
                checked={sortBy === "stars"}
                onChange={(e) =>
                  setSortBy(e.target.value as "stars" | "forks" | "updated")
                }
                className="accent-gray-600"
              />
              Stars
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sort"
                value="forks"
                checked={sortBy === "forks"}
                onChange={(e) =>
                  setSortBy(e.target.value as "stars" | "forks" | "updated")
                }
                className="accent-gray-600"
              />
              Forks
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sort"
                value="updated"
                checked={sortBy === "updated"}
                onChange={(e) =>
                  setSortBy(e.target.value as "stars" | "forks" | "updated")
                }
                className="accent-gray-600"
              />
              Updated
            </label>
          </div>
        </div>
        {loading ? (
          <SkeletonList />
        ) : filteredRepos.length === 0 ? (
          <p className="text-gray-500">No repositories found.</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {currentRepos.map((repo: RepoType) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
            <div className="flex gap-4 ">
              {currentPage > 1 && (
                <button
                  className="text-gray-400 text-sm"
                  onClick={() => {
                    setCurrentPage(1);
                  }}
                >{`First Page`}</button>
              )}
              <button
                className="text-gray-300 text-sm"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >{`<< Prev`}</button>
              <span className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="text-gray-300 text-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >{`Next >>`}</button>
              {currentPage !== totalPages && (
                <button
                  className="text-gray-400 text-sm"
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                >{`Last Page`}</button>
              )}
            </div>
          </>
        )}
      </div>

      {repos && repos.length > 0 ? (
        <Languages repos={repos} />
      ) : (
        <Languages repos={[]} />
      )}
    </main>
  );
}
