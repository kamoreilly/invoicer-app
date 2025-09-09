import type * as React from "react";
import { cn } from "@/lib/utils";

interface AnalyticsStats {
  revenueGrowth: number;
  collectionRate: number;
  avgPaymentTime: number;
  clientRetention: number;
  invoiceAccuracy: number;
  profitMargin: number;
}

interface AnalyticsKPIGridProps {
  stats: AnalyticsStats;
  className?: string;
}

interface KPICardProps {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  className?: string;
}

function KPICard({
  label,
  value,
  change,
  changeType,
  className,
}: KPICardProps) {
  return (
    <div
      className={cn(
        "relative rounded border border-landing-border bg-landing-bg p-4",
        className
      )}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 h-0.5 w-full bg-landing-accent" />

      <div className="mb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
        {label}
      </div>

      <div className="mb-1 font-bold text-landing-accent text-xl">{value}</div>

      <div
        className={cn(
          "flex items-center gap-1 text-xs",
          changeType === "up" ? "text-landing-success" : "text-landing-error"
        )}
      >
        <span>{changeType === "up" ? "▲" : "▼"}</span>
        {change}
      </div>
    </div>
  );
}

export function AnalyticsKPIGrid({ stats, className }: AnalyticsKPIGridProps) {
  const kpiData = [
    {
      label: "REVENUE_GROWTH",
      value: `+${stats.revenueGrowth}%`,
      change: "+5.2% vs last month",
      changeType: "up" as const,
    },
    {
      label: "COLLECTION_RATE",
      value: `${stats.collectionRate}%`,
      change: "+2.1% vs last month",
      changeType: "up" as const,
    },
    {
      label: "AVG_PAYMENT_TIME",
      value: `${stats.avgPaymentTime} days`,
      change: "+1.2 days vs last month",
      changeType: "down" as const,
    },
    {
      label: "CLIENT_RETENTION",
      value: `${stats.clientRetention}%`,
      change: "+3.4% vs last month",
      changeType: "up" as const,
    },
    {
      label: "INVOICE_ACCURACY",
      value: `${stats.invoiceAccuracy}%`,
      change: "+0.3% vs last month",
      changeType: "up" as const,
    },
    {
      label: "PROFIT_MARGIN",
      value: `${stats.profitMargin}%`,
      change: "+1.7% vs last month",
      changeType: "up" as const,
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {kpiData.map((kpi, index) => (
        <KPICard
          change={kpi.change}
          changeType={kpi.changeType}
          key={index}
          label={kpi.label}
          value={kpi.value}
        />
      ))}
    </div>
  );
}
