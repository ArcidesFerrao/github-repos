import React from "react";
type TopLanguagesProps = {
  language: string;
  count: number;
};
export const TopLanguages = ({ language, count }: TopLanguagesProps) => {
  return (
    <li className="language flex justify-between text-sm text-gray-400 py-1">
      <span>{language}</span>
      <span>{count}</span>
    </li>
  );
};
