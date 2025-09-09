import type * as React from "react";
import { cn } from "@/lib/utils";

interface PredictiveData {
  nextMonthRevenue: { value: string; confidence: string };
  churnRiskClients: { value: number; potentialLoss: string };
  latePaymentRisk: { value: string; invoicesAtRisk: number };
  growthOpportunity: { value: string; expansionTargets: number };
}

interface PredictiveAnalyticsProps {
  data: PredictiveData;
  className?: string;
}

interface PredictiveCardProps {
  label: string;
  value: string | number;
  meta: string;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

function PredictiveCard({
  label,
  value,
  meta,
  variant = "default",
  className,
}: PredictiveCardProps) {
  const getVariantStyles = (variant: PredictiveCardProps["variant"]) => {
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

  const getMetaColor = (variant: PredictiveCardProps["variant"]) => {
    switch (variant) {
      case "success":
        return "text-landing-success";
      case "warning":
        return "text-landing-warning";
      case "error":
        return "text-landing-error";
      default:
        return "text-landing-text-muted";
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

export function PredictiveAnalytics({
  data,
  className,
}: PredictiveAnalyticsProps) {
  const predictiveCards = [
    {
      label: "NEXT_MONTH_REVENUE",
      value: data.nextMonthRevenue.value,
      meta: `Confidence: ${data.nextMonthRevenue.confidence}`,
      variant: "success" as const,
    },
    {
      label: "CHURN_RISK_CLIENTS",
      value: data.churnRiskClients.value,
      meta: `Potential loss: ${data.churnRiskClients.potentialLoss}`,
      variant: "error" as const,
    },
    {
      label: "LATE_PAYMENT_RISK",
      value: data.latePaymentRisk.value,
      meta: `${data.latePaymentRisk.invoicesAtRisk} invoices at risk`,
      variant: "warning" as const,
    },
    {
      label: "GROWTH_OPPORTUNITY",
      value: data.growthOpportunity.value,
      meta: `${data.growthOpportunity.expansionTargets} expansion targets`,
      variant: "success" as const,
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {predictiveCards.map((card, index) => (
        <PredictiveCard
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
