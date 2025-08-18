import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="flex justify-center gap-2">
      <span>2025</span>
      <span className="text-gray-500">©</span>
      <Link href="/about" className="text-gray-500 hover:text-gray-100">
        Moz Repo Finder
      </Link>
    </footer>
  );
};
