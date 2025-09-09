import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaymentStatsData {
  totalPayments: number;
  paymentsReceived: number;
  pendingPayments: number;
  failedPayments: number;
  failedAmount: number;
  pendingTransactions: number;
  monthlyGrowth: number;
}

interface PaymentStatsProps {
  stats: PaymentStatsData;
  className?: string;
}

export function PaymentStats({ stats, className }: PaymentStatsProps) {
  const statsCards = [
    {
      label: "TOTAL_PAYMENTS",
      value: stats.totalPayments.toLocaleString(),
      meta: `+${stats.monthlyGrowth} this_month`,
      variant: "default" as const,
    },
    {
      label: "PAYMENTS_RECEIVED",
      value: `$${stats.paymentsReceived.toLocaleString()}`,
      meta: "this_month",
      variant: "success" as const,
    },
    {
      label: "PENDING_PAYMENTS",
      value: `$${stats.pendingPayments.toLocaleString()}`,
      meta: `${stats.pendingTransactions} transactions`,
      variant: "warning" as const,
    },
    {
      label: "FAILED_PAYMENTS",
      value: stats.failedPayments.toString(),
      meta: `$${stats.failedAmount.toLocaleString()} amount`,
      variant: "error" as const,
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
