"use client";

import Link from "next/link";
import React from "react";
import { SearchBar } from "./SearchBar";
import { useSearch } from "@/context/SearchContext";

export default function Nav() {
  const { setCurrentPage } = useSearch();
  return (
    <nav className="flex justify-between items-center p-4 ">
      <div>
        <Link
          href="/"
          onClick={() => setCurrentPage(1)}
          className="text-lg font-bold"
        >
          <h2>Home</h2>
        </Link>
      </div>
      <SearchBar />
    </nav>
  );
}
