import type * as React from "react";
import { cn } from "@/lib/utils";

interface UserStats {
  totalUsers: number;
  adminUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  lastLoginTime: string;
  failedLogins: number;
}

interface UserStatsGridProps {
  stats: UserStats;
  className?: string;
}

interface StatCardProps {
  label: string;
  value: string | number;
  meta: string;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

function StatCard({
  label,
  value,
  meta,
  variant = "default",
  className,
}: StatCardProps) {
  const getVariantStyles = (variant: StatCardProps["variant"]) => {
    switch (variant) {
      case "success":
        return "border-landing-success";
      case "warning":
        return "border-landing-warning";
      case "error":
        return "border-landing-error";
      default:
        return "border-landing-border";
    }
  };

  const getMetaColor = (variant: StatCardProps["variant"]) => {
    switch (variant) {
      case "success":
        return "text-landing-success";
      case "warning":
        return "text-landing-warning";
      case "error":
        return "text-landing-error";
      default:
        return "text-landing-success";
    }
  };

  return (
    <div
      className={cn(
        "relative rounded border bg-landing-bg p-4",
        getVariantStyles(variant),
        className
      )}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 h-0.5 w-full bg-landing-accent" />

      <div className="mb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
        {label}
      </div>

      <div className="mb-1 font-bold text-landing-accent text-xl">{value}</div>

      <div className={cn("text-xs", getMetaColor(variant))}>{meta}</div>
    </div>
  );
}

export function UserStatsGrid({ stats, className }: UserStatsGridProps) {
  const statsCards = [
    {
      label: "TOTAL_USERS",
      value: stats.totalUsers,
      meta: "active_accounts",
      variant: "default" as const,
    },
    {
      label: "ADMIN_USERS",
      value: stats.adminUsers,
      meta: "full_access",
      variant: "warning" as const,
    },
    {
      label: "ACTIVE_USERS",
      value: stats.activeUsers,
      meta: "currently_online",
      variant: "success" as const,
    },
    {
      label: "LAST_LOGIN",
      value: stats.lastLoginTime,
      meta: "user_activity",
      variant: "default" as const,
    },
    {
      label: "FAILED_LOGINS",
      value: stats.failedLogins,
      meta: "security_status",
      variant: stats.failedLogins > 0 ? "error" : "success",
    },
    {
      label: "SUSPENDED_USERS",
      value: stats.suspendedUsers,
      meta: "requires_attention",
      variant: stats.suspendedUsers > 0 ? "error" : "success",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        className
      )}
    >
      {statsCards.map((card, index) => (
        <StatCard
          key={index}
          label={card.label}
          meta={card.meta}
          value={card.value}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
