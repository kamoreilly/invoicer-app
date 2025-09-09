import type * as React from "react";
import {
  ActionBar,
  Breadcrumb,
  PageHeader,
} from "@/components/common/page-header";
import { AppPage } from "@/components/layouts/app-layout";
import {
  TerminalCard,
  TerminalCardContent,
  TerminalCardHeader,
  TerminalCardTitle,
} from "@/components/ui/terminal-card";
import { cn } from "@/lib/utils";

interface ListPageProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle?: string;
  showHeader?: boolean;
  showTime?: boolean;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  searchBar?: React.ReactNode;
  padding?: "none" | "sm" | "default" | "lg";
}

function ListPage({
  children,
  className,
  title,
  subtitle,
  showHeader = true,
  showTime = false,
  breadcrumbs,
  actions,
  filters,
  searchBar,
  padding = "default",
}: ListPageProps) {
  return (
    <AppPage className={className} padding={padding}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

      {showHeader && (
        <PageHeader actions={actions} showTime={showTime} title={title} />
      )}

      {subtitle && (
        <p className="mb-6 font-mono text-landing-text-muted text-sm">
          {subtitle}
        </p>
      )}

      {(searchBar || filters) && (
        <div className="mb-6 space-y-4">
          {searchBar}
          {filters}
        </div>
      )}

      {children}
    </AppPage>
  );
}

// List container with terminal styling
interface ListContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showTerminalHeader?: boolean;
  itemCount?: number;
}

function ListContainer({
  children,
  title,
  className,
  showTerminalHeader = true,
  itemCount,
}: ListContainerProps) {
  return (
    <TerminalCard className={cn("max-w-none", className)}>
      {showTerminalHeader && title && (
        <TerminalCardHeader>
          <TerminalCardTitle>
            {title}
            {itemCount !== undefined && (
              <span className="ml-2 text-landing-text-muted">
                ({itemCount} items)
              </span>
            )}
          </TerminalCardTitle>
        </TerminalCardHeader>
      )}

      <TerminalCardContent className="p-0">{children}</TerminalCardContent>
    </TerminalCard>
  );
}

// List item with consistent styling
interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  actions?: React.ReactNode;
}

function ListItem({
  children,
  className,
  selected = false,
  onClick,
  actions,
}: ListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-landing-border border-b p-4 transition-colors",
        onClick && "cursor-pointer hover:bg-landing-surface-alt",
        selected && "border-landing-accent bg-landing-surface-alt",
        className
      )}
      onClick={onClick}
    >
      <div className="flex-1">{children}</div>
      {actions && <div className="ml-4 flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Empty state for lists
interface ListEmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

function ListEmptyState({
  title = "No items found",
  description = "There are no items to display at the moment.",
  action,
  icon,
  className,
}: ListEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className
      )}
    >
      {icon && <div className="mb-4 text-landing-text-muted">{icon}</div>}
      <h3 className="mb-2 font-mono font-semibold text-landing-text text-sm uppercase tracking-wider">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-landing-text-muted text-xs">
        {description}
      </p>
      {action}
    </div>
  );
}

// List pagination
interface ListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function ListPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: ListPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "flex items-center justify-between border-landing-border border-t p-4",
        className
      )}
    >
      <div className="font-mono text-landing-text-muted text-xs">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="border border-landing-border px-3 py-1 font-mono text-xs transition-colors hover:border-landing-accent disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ← Prev
        </button>

        {pages.map((page) => (
          <button
            className={cn(
              "border px-3 py-1 font-mono text-xs transition-colors",
              page === currentPage
                ? "border-landing-accent bg-landing-accent text-landing-bg"
                : "border-landing-border hover:border-landing-accent"
            )}
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="border border-landing-border px-3 py-1 font-mono text-xs transition-colors hover:border-landing-accent disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export { ListPage, ListContainer, ListItem, ListEmptyState, ListPagination };
