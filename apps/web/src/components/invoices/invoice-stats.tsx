import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InvoiceStatsData {
  totalInvoices: number;
  totalValue: number;
  paidInvoices: number;
  overdueInvoices: number;
  outstandingAmount: number;
  overdueAmount: number;
  collectionRate: number;
  monthlyGrowth: number;
}

interface InvoiceStatsProps {
  stats: InvoiceStatsData;
  className?: string;
}

export function InvoiceStats({ stats, className }: InvoiceStatsProps) {
  const statsCards = [
    {
      label: "TOTAL_INVOICES",
      value: stats.totalInvoices.toLocaleString(),
      meta: `this_month: +${stats.monthlyGrowth}`,
      variant: "default" as const,
    },
    {
      label: "TOTAL_VALUE",
      value: `$${stats.totalValue.toLocaleString()}`,
      meta: `outstanding: $${stats.outstandingAmount.toLocaleString()}`,
      variant: "default" as const,
    },
    {
      label: "PAID_INVOICES",
      value: stats.paidInvoices.toString(),
      meta: `${stats.collectionRate}%_collection_rate`,
      variant: "success" as const,
    },
    {
      label: "OVERDUE_INVOICES",
      value: stats.overdueInvoices.toString(),
      meta: `$${stats.overdueAmount.toLocaleString()}_overdue`,
      variant: "warning" as const,
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
