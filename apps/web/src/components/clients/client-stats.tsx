import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ClientStatsData {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  averageInvoiceValue: number;
  activeRate: number;
  monthlyGrowth: number;
}

interface ClientStatsProps {
  stats: ClientStatsData;
  className?: string;
}

export function ClientStats({ stats, className }: ClientStatsProps) {
  const statsCards = [
    {
      label: "TOTAL_CLIENTS",
      value: stats.totalClients.toLocaleString(),
      meta: `+${stats.monthlyGrowth} this_month`,
      variant: "default" as const,
    },
    {
      label: "ACTIVE_CLIENTS",
      value: stats.activeClients.toString(),
      meta: `${stats.activeRate}% active_rate`,
      variant: "success" as const,
    },
    {
      label: "TOTAL_REVENUE",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      meta: "lifetime_value",
      variant: "default" as const,
    },
    {
      label: "AVG_INVOICE_VALUE",
      value: `$${stats.averageInvoiceValue.toLocaleString()}`,
      meta: "per_client",
      variant: "default" as const,
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {statsCards.map((stat, index) => (
        <Card
          className={cn(
            "relative overflow-hidden border-landing-border bg-landing-surface",
            stat.variant === "success" && "border-landing-success",
            stat.variant === "warning" && "border-landing-warning",
            stat.variant === "error" && "border-landing-error"
          )}
          key={index}
        >
          <div className="absolute top-0 left-0 h-0.5 w-full bg-landing-accent" />
          <div className="p-4">
            <div className="mb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
              {stat.label}
            </div>
            <div className="mb-1 font-bold text-2xl text-landing-accent">
              {stat.value}
            </div>
            <div className="text-landing-success text-xs">{stat.meta}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
