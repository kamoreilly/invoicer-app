import type * as React from "react";
import { cn } from "@/lib/utils";

interface InvoiceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  className?: string;
}

export function InvoiceFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  className,
}: InvoiceFiltersProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="font-mono text-landing-text-muted text-xs uppercase tracking-wider">
          FILTER_OPTIONS:
        </div>
        <div className="font-mono text-landing-text-muted text-xs">
          {searchTerm && `Search: "${searchTerm}"`}
          {statusFilter !== "all" && ` | Status: ${statusFilter.toUpperCase()}`}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent sm:w-64"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search invoices..."
          type="text"
          value={searchTerm}
        />

        <select
          className="w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent sm:w-auto"
          onChange={(e) => onStatusFilterChange(e.target.value)}
          value={statusFilter}
        >
          <option value="all">ALL_STATUS</option>
          <option value="draft">DRAFT</option>
          <option value="sent">SENT</option>
          <option value="paid">PAID</option>
          <option value="overdue">OVERDUE</option>
          <option value="partial">PARTIAL</option>
        </select>
      </div>
    </div>
  );
}
