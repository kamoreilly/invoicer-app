import type * as React from "react";
import { cn } from "@/lib/utils";

interface PaymentFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  className?: string;
}

export function PaymentFilters({
  statusFilter,
  onStatusFilterChange,
  className,
}: PaymentFiltersProps) {
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
        {statusFilter !== "all" && (
          <div className="font-mono text-landing-text-muted text-xs">
            Filter: {statusFilter.toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          className="w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent sm:w-auto"
          onChange={(e) => onStatusFilterChange(e.target.value)}
          value={statusFilter}
        >
          <option value="all">ALL_PAYMENTS</option>
          <option value="completed">COMPLETED</option>
          <option value="pending">PENDING</option>
          <option value="failed">FAILED</option>
          <option value="refunded">REFUNDED</option>
        </select>
      </div>
    </div>
  );
}
