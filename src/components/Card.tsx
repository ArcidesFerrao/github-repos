import React from "react";
import Image from "next/image";
import { RepoType } from "@/types";

export const RepoCard = ({ repo }: { repo: RepoType }) => {
  return (
    <div
      key={repo.id}
      className="repo-card flex flex-col gap-3 p-4 border border-gray-600 rounded-md shadow-sm"
    >
      <div className="header-card flex justify-between items-center">
        {repo.homepage !== "" ? (
          <a href={repo.homepage} target="_blank">
            <h2 className="text-lg font-bold text-gray-300">{repo.name}</h2>
          </a>
        ) : (
          <h2 className="text-lg font-bold text-gray-300">{repo.name}</h2>
        )}
        <div className="flex flex-col  items-end">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 text-xs flex items-center"
          >
            <span className="lets-icons--view-light"></span>
          </a>

          <div className="updated-time flex gap-1 text-xs text-gray-500">
            <p>updated at</p>
            <p>{new Date(repo.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 ">{repo.description}</p>
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
        <div className=" flex gap-1 items-center text-sm text-gray-500">
          <p>{repo.forks_count || 0}</p>
          <span className="iconoir--git-fork"></span>
        </div>
        <div className=" flex gap-1 items-center text-sm text-gray-500">
          <p>{repo.open_issues_count || 0}</p>
          <span className="mdi--git-issue"></span>
        </div>
        <div className=" flex gap-1 items-center text-sm text-gray-500">
          <p>{repo.stargazers_count}</p>
          <span className="ic--round-star"></span>
        </div>
      </div>
    </div>
  );
};
