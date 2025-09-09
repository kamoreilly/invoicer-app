import type * as React from "react";
import { cn } from "@/lib/utils";

export interface ReportCardData {
  id: string;
  title: string;
  description: string;
  value: string | number;
  period: string;
  type: "revenue" | "clients" | "aging" | "tax" | "payments" | "forecast";
}

interface ReportCardProps {
  report: ReportCardData;
  onClick?: (reportType: string) => void;
  className?: string;
}

export function ReportCard({ report, onClick, className }: ReportCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(report.type);
    }
  };

  return (
    <div
      className={cn(
        "group cursor-pointer rounded border border-landing-border bg-landing-bg p-4 transition-all duration-200",
        "hover:border-landing-accent hover:bg-landing-surface hover:shadow-landing-accent/10 hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="mb-2 font-semibold text-landing-accent text-xs uppercase tracking-wider transition-colors group-hover:text-landing-accent-dark">
        {report.title}
      </div>
      <div className="mb-3 text-landing-text-muted text-xs leading-relaxed">
        {report.description}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-landing-success text-sm transition-colors group-hover:text-landing-success-dark">
          {report.value}
        </span>
        <span className="text-landing-text-muted text-xs transition-colors group-hover:text-landing-text">
          {report.period}
        </span>
      </div>
    </div>
  );
}

interface ReportCardsGridProps {
  reports: ReportCardData[];
  onReportClick?: (reportType: string) => void;
  className?: string;
}

export function ReportCardsGrid({
  reports,
  onReportClick,
  className,
}: ReportCardsGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {reports.map((report, index) => (
        <ReportCard
          className={cn("report-card-enter", `delay-${index * 100}`)}
          key={report.id}
          onClick={onReportClick}
          report={report}
        />
      ))}
    </div>
  );
}

// Predefined report configurations
export const createReportCards = (stats: {
  totalRevenue: number;
  activeClients: number;
  outstandingAmount: number;
  taxCollected: number;
  paymentSuccessRate: number;
  projectedRevenue: number;
}): ReportCardData[] => [
  {
    id: "revenue-analysis",
    title: "REVENUE_ANALYSIS",
    description: "Monthly revenue breakdown with growth trends and forecasting",
    value: `$${stats.totalRevenue.toLocaleString()}`,
    period: "THIS_MONTH",
    type: "revenue",
  },
  {
    id: "client-performance",
    title: "CLIENT_PERFORMANCE",
    description:
      "Top clients by revenue, payment history, and engagement metrics",
    value: `${stats.activeClients} CLIENTS`,
    period: "ACTIVE",
    type: "clients",
  },
  {
    id: "aging-report",
    title: "AGING_REPORT",
    description: "Outstanding invoices categorized by age and payment status",
    value: `$${stats.outstandingAmount.toLocaleString()}`,
    period: "OUTSTANDING",
    type: "aging",
  },
  {
    id: "tax-summary",
    title: "TAX_SUMMARY",
    description:
      "Tax collected, exemptions, and quarterly summaries for filing",
    value: `$${stats.taxCollected.toLocaleString()}`,
    period: "TAX_COLLECTED",
    type: "tax",
  },
  {
    id: "payment-analysis",
    title: "PAYMENT_ANALYSIS",
    description: "Payment methods, success rates, and processing times",
    value: `${stats.paymentSuccessRate}%`,
    period: "SUCCESS_RATE",
    type: "payments",
  },
  {
    id: "revenue-forecast",
    title: "REVENUE_FORECAST",
    description: "Predictive analysis based on historical data and trends",
    value: `$${stats.projectedRevenue.toLocaleString()}`,
    period: "PROJECTED",
    type: "forecast",
  },
];
