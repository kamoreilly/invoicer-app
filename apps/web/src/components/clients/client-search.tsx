import type * as React from "react";
import { cn } from "@/lib/utils";

interface ClientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

export function ClientSearch({
  searchTerm,
  onSearchChange,
  className,
}: ClientSearchProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="font-mono text-landing-text-muted text-xs uppercase tracking-wider">
          SEARCH_CLIENTS:
        </div>
        {searchTerm && (
          <div className="font-mono text-landing-text-muted text-xs">
            Search: "{searchTerm}"
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent sm:w-64"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="search clients..."
          type="text"
          value={searchTerm}
        />
        {searchTerm && (
          <button
            className="font-mono text-landing-text-muted text-xs uppercase tracking-wider transition-colors hover:text-landing-accent"
            onClick={() => onSearchChange("")}
          >
            CLEAR
          </button>
        )}
      </div>
    </div>
  );
}
