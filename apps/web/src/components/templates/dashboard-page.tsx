import type * as React from "react";
import { ActionBar, PageHeader } from "@/components/common/page-header";
import { AppPage } from "@/components/layouts/app-layout";
import { TerminalStatsGrid } from "@/components/ui/terminal-stats";
import { cn } from "@/lib/utils";

interface DashboardPageProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showHeader?: boolean;
  showTime?: boolean;
  actions?: React.ReactNode;
  stats?: React.ReactNode;
  padding?: "none" | "sm" | "default" | "lg";
}

function DashboardPage({
  children,
  className,
  title = "DASHBOARD",
  showHeader = true,
  showTime = true,
  actions,
  stats,
  padding = "default",
}: DashboardPageProps) {
  return (
    <AppPage className={className} padding={padding}>
      {showHeader && (
        <PageHeader actions={actions} showTime={showTime} title={title} />
      )}

      {stats && <div className="mb-6">{stats}</div>}

      {children}
    </AppPage>
  );
}

// Quick stats section for dashboard
interface DashboardStatsProps {
  stats: Array<{
    header: string;
    value: string | number;
    meta?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    variant?:
      | "default"
      | "elevated"
      | "accent"
      | "success"
      | "warning"
      | "error";
  }>;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

function DashboardStats({
  stats,
  columns = 4,
  className,
}: DashboardStatsProps) {
  return (
    <TerminalStatsGrid className={className} columns={columns}>
      {stats.map((stat, index) => (
        <div
          className={cn(
            "rounded-md border border-landing-border bg-landing-surface p-4",
            stat.variant === "elevated" && "bg-landing-surface-alt",
            stat.variant === "accent" && "border-landing-accent",
            stat.variant === "success" && "border-landing-success",
            stat.variant === "warning" && "border-landing-warning",
            stat.variant === "error" && "border-landing-error"
          )}
          key={index}
        >
          <div className="mb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
            {stat.header}
          </div>
          <div className="mb-1 font-bold text-2xl text-landing-accent">
            {stat.value}
          </div>
          {(stat.meta || stat.trend) && (
            <div className="text-landing-text-muted text-xs">
              {stat.meta}
              {stat.trend && stat.trendValue && (
                <span
                  className={cn(
                    "ml-2",
                    stat.trend === "up" && "text-landing-success",
                    stat.trend === "down" && "text-landing-error",
                    stat.trend === "neutral" && "text-landing-text-muted"
                  )}
                >
                  {stat.trend === "up" && "↗"}
                  {stat.trend === "down" && "↘"}
                  {stat.trend === "neutral" && "→"}
                  {" " + stat.trendValue}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </TerminalStatsGrid>
  );
}

// Dashboard action buttons
interface DashboardActionsProps {
  actions: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "default" | "ghost";
    icon?: React.ReactNode;
  }>;
  className?: string;
}

function DashboardActions({ actions, className }: DashboardActionsProps) {
  return (
    <ActionBar className={className}>
      {actions.map((action, index) => (
        <button
          className={cn(
            "inline-flex items-center gap-2 border border-landing-border px-4 py-2 font-medium font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
            action.variant === "primary" &&
              "border-landing-accent bg-landing-accent text-landing-bg hover:bg-landing-accent-dark",
            action.variant === "default" &&
              "bg-landing-surface-alt text-landing-text hover:bg-landing-border",
            action.variant === "ghost" &&
              "border-transparent bg-transparent text-landing-text hover:border-landing-border hover:bg-landing-surface-alt"
          )}
          key={index}
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </ActionBar>
  );
}

export { DashboardPage, DashboardStats, DashboardActions };
