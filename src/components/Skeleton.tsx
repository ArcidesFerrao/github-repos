import React from "react";

export const Skeleton = () => {
  return (
    <div
      className="skeleton border p-4 shadow-sm animate-pulse"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex w-full items-center justify-between">
        <div className="h-5 w-24 rounded-md bg-gray-700" />
        <div className="h-4 w-5 bg-gray-700 rounded" />
      </div>

      <div className="my-4 space-y-2 w-full">
        <div className="h-3 w-full bg-gray-700 rounded" />
        <div className="h-3 w-9/12 bg-gray-700 rounded" />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-700" />
        <div className="mt-4 h-5 w-full bg-gray-700 rounded" />
      </div>
      <span className="sr-only">Loading Repository</span>
    </div>
  );
};

export function SkeletonList() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}

export const SkeletonLanguages = () => {
  return (
    <div
      className="flex flex-col gap-2 p-2 animate-pulse"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="h-5 w-full bg-gray-700" />
      ))}
    </div>
  );
};
