import React from "react";
import Image from "next/image";
import { RepoType } from "@/types";

export const RepoCard = ({ repo }: { repo: RepoType }) => {
  return (
    <div
      key={repo.id}
      className="repo-card flex flex-col gap-4 p-4 border border-gray-600 rounded-md shadow-sm"
    >
      <div className="header-card flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-300">{repo.name}</h2>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-200 text-xs flex items-center hover:underline"
        >
          <span className="lets-icons--view-light"></span>
        </a>
      </div>
      <p className="text-sm text-gray-600">{repo.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={repo.owner.avatar_url || "/default-avatar.png"}
            className="rounded-full"
            width={24}
            height={24}
            alt="User Avatar"
          />
          <h3 className="text-gray-400">{repo.owner.login}</h3>
        </div>
        <span className="text-sm text-gray-500">
          Forks: {repo.forks_count || 0}
        </span>
        <span className="text-sm text-gray-500">
          Stars: {repo.stargazers_count}
        </span>
      </div>
    </div>
  );
};
