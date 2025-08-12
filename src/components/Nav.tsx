import Link from "next/link";
import React from "react";
import { SearchBar } from "./SearchBar";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center p-4 ">
      <div>
        <Link href="/" className="text-lg font-bold">
          <h2>Github Repos</h2>
        </Link>
      </div>
      <SearchBar />
    </nav>
  );
}
