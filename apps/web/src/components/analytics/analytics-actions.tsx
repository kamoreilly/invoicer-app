import type * as React from "react";
import { ActionBar } from "@/components/common/page-header";
import { cn } from "@/lib/utils";

interface AnalyticsAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "default" | "ghost";
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AnalyticsActionBarProps {
  actions: AnalyticsAction[];
  className?: string;
}

export function AnalyticsActionBar({
  actions,
  className,
}: AnalyticsActionBarProps) {
  return (
    <ActionBar className={className}>
      {actions.map((action, index) => (
        <button
          className={cn(
            "inline-flex items-center gap-2 border border-landing-border px-4 py-2 font-medium font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50",
            action.variant === "primary" &&
              "border-landing-accent bg-landing-accent text-landing-bg hover:bg-landing-accent-dark",
            action.variant === "default" &&
              "bg-landing-surface-alt text-landing-text hover:bg-landing-border",
            action.variant === "ghost" &&
              "border-transparent bg-transparent text-landing-text hover:border-landing-border hover:bg-landing-surface-alt"
          )}
          disabled={action.disabled}
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
