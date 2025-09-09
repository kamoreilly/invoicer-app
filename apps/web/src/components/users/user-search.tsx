import type * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: UserFilters) => void;
  className?: string;
}

interface UserFilters {
  role: "ALL" | "ADMIN" | "MANAGER" | "USER";
  status: "ALL" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
  department: "ALL" | "ACCOUNTING" | "SALES" | "MANAGEMENT" | "IT";
}

export function UserSearch({
  onSearch,
  onFilterChange,
  className,
}: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<UserFilters>({
    role: "ALL",
    status: "ALL",
    department: "ALL",
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
          SEARCH_USERS
        </label>
        <input
          className="border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent"
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by name, email, or user ID..."
          type="text"
          value={searchQuery}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
            FILTER_BY_ROLE
          </label>
          <select
            className="border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent"
            onChange={(e) => handleFilterChange("role", e.target.value)}
            value={filters.role}
          >
            <option value="ALL">ALL ROLES</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="USER">USER</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
            FILTER_BY_STATUS
          </label>
          <select
            className="border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent"
            onChange={(e) => handleFilterChange("status", e.target.value)}
            value={filters.status}
          >
            <option value="ALL">ALL STATUS</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
            FILTER_BY_DEPT
          </label>
          <select
            className="border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent"
            onChange={(e) => handleFilterChange("department", e.target.value)}
            value={filters.department}
          >
            <option value="ALL">ALL DEPARTMENTS</option>
            <option value="ACCOUNTING">ACCOUNTING</option>
            <option value="SALES">SALES</option>
            <option value="MANAGEMENT">MANAGEMENT</option>
            <option value="IT">IT_SUPPORT</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end">
        <button
          className="border border-landing-border bg-landing-surface-alt px-3 py-1 font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-border"
          onClick={() => {
            setSearchQuery("");
            setFilters({ role: "ALL", status: "ALL", department: "ALL" });
            onSearch("");
            onFilterChange({ role: "ALL", status: "ALL", department: "ALL" });
          }}
        >
          CLEAR_FILTERS
        </button>
      </div>
    </div>
  );
}
