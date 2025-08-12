"use client";
import React from "react";

type SearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="search-bar border border-gray-500 rounded px flex  items-center">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-sm p-2 min-w-xs text-gray-400"
      />
      <button className="flex px-2">
        <span className="line-md--search"></span>
      </button>
    </div>
  );
};
