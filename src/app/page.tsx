"use client";
import { RepoCard } from "@/components/Card";
import { Languages } from "@/components/Languages";
import { useSearch } from "@/context/SearchContext";
import { RepoType } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const { search, currentPage, setCurrentPage } = useSearch();
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [loading, setLoading] = useState(true);

  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetch(`http://localhost:3000/api/repos`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched repos:", data.repos); // Add this line for debugging
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

  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [currentPage]);

  return (
    <main className="font-sans flex gap-4 justify-evenly">
      <div className="flex flex-col items-center gap-5 p-4">
        <h1>Most Liked Repos List</h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
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
      <Languages repos={filteredRepos} />
    </main>
  );
}
