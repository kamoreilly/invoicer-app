import type * as React from "react";
import { cn } from "@/lib/utils";

interface ClientSegment {
  segment: string;
  revenueShare: number;
  growthRate: number;
  paymentBehavior: string;
  riskScore: "LOW" | "MEDIUM" | "HIGH";
  trend: "GROWING" | "STABLE" | "DECLINING";
}

interface ClientAnalysisTableProps {
  segments: ClientSegment[];
  className?: string;
}

function TrendIndicator({ trend }: { trend: ClientSegment["trend"] }) {
  const getIndicatorProps = (trend: ClientSegment["trend"]) => {
    switch (trend) {
      case "GROWING":
        return {
          icon: "▲",
          color: "text-landing-success",
          label: "GROWING",
        };
      case "DECLINING":
        return {
          icon: "▼",
          color: "text-landing-error",
          label: "DECLINING",
        };
      case "STABLE":
        return {
          icon: "→",
          color: "text-landing-warning",
          label: "STABLE",
        };
    }
  };

  const { icon, color, label } = getIndicatorProps(trend);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold text-xs",
        color
      )}
    >
      {icon} {label}
    </span>
  );
}

function RiskBadge({ riskScore }: { riskScore: ClientSegment["riskScore"] }) {
  const getRiskProps = (risk: ClientSegment["riskScore"]) => {
    switch (risk) {
      case "LOW":
        return "text-landing-success";
      case "MEDIUM":
        return "text-landing-warning";
      case "HIGH":
        return "text-landing-error";
    }
  };

  return (
    <span className={cn("font-semibold text-xs", getRiskProps(riskScore))}>
      {riskScore}
    </span>
  );
}

export function ClientAnalysisTable({
  segments,
  className,
}: ClientAnalysisTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-landing-border border-b bg-landing-surface-alt">
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              CLIENT_SEGMENT
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              REVENUE_SHARE
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              GROWTH_RATE
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              PAYMENT_BEHAVIOR
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              RISK_SCORE
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              TREND
            </th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment, index) => (
            <tr
              className="border-landing-border border-b transition-colors hover:bg-landing-surface-alt/50"
              key={index}
            >
              <td className="p-3 font-semibold text-landing-accent text-xs">
                {segment.segment}
              </td>
              <td className="p-3 text-landing-text text-xs">
                {segment.revenueShare}%
              </td>
              <td
                className={cn(
                  "p-3 font-medium text-xs",
                  segment.growthRate > 0
                    ? "text-landing-success"
                    : "text-landing-error"
                )}
              >
                {segment.growthRate > 0 ? "+" : ""}
                {segment.growthRate}%
              </td>
              <td className="p-3 text-landing-text text-xs">
                {segment.paymentBehavior}
              </td>
              <td className="p-3 text-xs">
                <RiskBadge riskScore={segment.riskScore} />
              </td>
              <td className="p-3 text-xs">
                <TrendIndicator trend={segment.trend} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
