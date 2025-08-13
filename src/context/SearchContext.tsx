"use client";

import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <SearchContext.Provider
      value={{ search, setSearch, currentPage, setCurrentPage }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
