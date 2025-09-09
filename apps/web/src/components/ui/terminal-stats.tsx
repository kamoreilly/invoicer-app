import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const terminalStatsVariants = cva(
  "border border-landing-border bg-landing-surface p-4 font-mono",
  {
    variants: {
      variant: {
        default: "bg-landing-surface",
        elevated: "bg-landing-surface-alt",
        accent: "border-landing-accent",
        success: "border-landing-success",
        warning: "border-landing-warning",
        error: "border-landing-error",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

interface TerminalStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof terminalStatsVariants> {}

function TerminalStats({
  className,
  variant,
  size,
  rounded,
  ...props
}: TerminalStatsProps) {
  return (
    <div
      className={cn(
        terminalStatsVariants({ variant, size, rounded, className })
      )}
      data-slot="terminal-stats"
      {...props}
    />
  );
}

function TerminalStatsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider",
        className
      )}
      data-slot="terminal-stats-header"
      {...props}
    />
  );
}

function TerminalStatsValue({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-1 font-bold text-2xl text-landing-accent", className)}
      data-slot="terminal-stats-value"
      {...props}
    />
  );
}

function TerminalStatsMeta({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-landing-text-muted text-xs", className)}
      data-slot="terminal-stats-meta"
      {...props}
    />
  );
}

// Grid container for stats
interface TerminalStatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

function TerminalStatsGrid({
  className,
  columns = 4,
  ...props
}: TerminalStatsGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-4", gridCols[columns], className)}
      data-slot="terminal-stats-grid"
      {...props}
    />
  );
}

// Complete stat card component
interface TerminalStatCardProps extends TerminalStatsProps {
  header: string;
  value: string | number;
  meta?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

function TerminalStatCard({
  header,
  value,
  meta,
  trend,
  trendValue,
  className,
  ...props
}: TerminalStatCardProps) {
  const trendColors = {
    up: "text-landing-success",
    down: "text-landing-error",
    neutral: "text-landing-text-muted",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <TerminalStats className={className} {...props}>
      <TerminalStatsHeader>{header}</TerminalStatsHeader>
      <TerminalStatsValue>{value}</TerminalStatsValue>
      {(meta || trend) && (
        <TerminalStatsMeta>
          {meta}
          {trend && trendValue && (
            <span className={cn("ml-2", trendColors[trend])}>
              {trendIcons[trend]} {trendValue}
            </span>
          )}
        </TerminalStatsMeta>
      )}
    </TerminalStats>
  );
}

export {
  TerminalStats,
  TerminalStatsHeader,
  TerminalStatsValue,
  TerminalStatsMeta,
  TerminalStatsGrid,
  TerminalStatCard,
  terminalStatsVariants,
};
