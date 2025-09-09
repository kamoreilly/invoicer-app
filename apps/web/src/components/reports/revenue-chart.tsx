import type * as React from "react";
import { cn } from "@/lib/utils";

interface ChartData {
  label: string;
  value: number;
  displayValue?: string;
}

interface RevenueChartProps {
  data: ChartData[];
  className?: string;
  height?: number;
}

export function RevenueChart({
  data,
  className,
  height = 128,
}: RevenueChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-bg p-4",
        className
      )}
    >
      <div
        className="flex items-end justify-center gap-2"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 20); // Leave space for labels

          return (
            <div
              className="group relative flex flex-col items-center"
              key={index}
            >
              {/* Bar */}
              <div
                className="w-4 transform cursor-pointer rounded-t bg-landing-accent opacity-80 transition-all duration-300 hover:scale-x-110 hover:bg-landing-accent-dark hover:opacity-100"
                style={{
                  height: `${barHeight}px`,
                  animationDelay: `${index * 100}ms`,
                  animation: "slideUp 0.6s ease-out forwards",
                }}
                title={`${item.label}: ${item.displayValue || item.value}`}
              />

              {/* Tooltip on hover */}
              <div className="-top-8 -translate-x-1/2 pointer-events-none absolute left-1/2 z-10 transform whitespace-nowrap rounded border border-landing-border bg-landing-surface px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.displayValue || item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SummaryTableData {
  metric: string;
  currentMonth: string;
  previousMonth: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

interface SummaryTableProps {
  data: SummaryTableData[];
  className?: string;
}

export function SummaryTable({ data, className }: SummaryTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-landing-border border-b bg-landing-surface-alt">
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              METRIC
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              CURRENT_MONTH
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              PREVIOUS_MONTH
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              CHANGE
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              className="border-landing-border border-b transition-colors hover:bg-landing-surface-alt/50"
              key={index}
            >
              <td className="p-3 font-medium text-landing-text text-xs">
                {row.metric}
              </td>
              <td className="p-3 text-landing-text text-xs">
                {row.currentMonth}
              </td>
              <td className="p-3 text-landing-text text-xs">
                {row.previousMonth}
              </td>
              <td
                className={cn(
                  "p-3 font-medium text-xs",
                  row.changeType === "positive" && "text-landing-success",
                  row.changeType === "negative" && "text-landing-error",
                  row.changeType === "neutral" && "text-landing-text-muted"
                )}
              >
                {row.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Default chart data generator
export const generateChartData = (): ChartData[] => [
  { label: "Jan", value: 60, displayValue: "$24.5K" },
  { label: "Feb", value: 80, displayValue: "$31.2K" },
  { label: "Mar", value: 45, displayValue: "$18.7K" },
  { label: "Apr", value: 95, displayValue: "$37.8K" },
  { label: "May", value: 70, displayValue: "$35.4K" },
  { label: "Jun", value: 110, displayValue: "$42.1K" },
  { label: "Jul", value: 85, displayValue: "$39.9K" },
  { label: "Aug", value: 120, displayValue: "$46.3K" },
  { label: "Sep", value: 90, displayValue: "$41.2K" },
  { label: "Oct", value: 105, displayValue: "$44.7K" },
  { label: "Nov", value: 75, displayValue: "$38.1K" },
  { label: "Dec", value: 130, displayValue: "$52.3K" },
];

// Default summary table data
export const generateSummaryData = (): SummaryTableData[] => [
  {
    metric: "TOTAL_REVENUE",
    currentMonth: "$567,890",
    previousMonth: "$523,450",
    change: "+8.5%",
    changeType: "positive",
  },
  {
    metric: "INVOICES_SENT",
    currentMonth: "247",
    previousMonth: "231",
    change: "+6.9%",
    changeType: "positive",
  },
  {
    metric: "PAYMENT_RATE",
    currentMonth: "94.2%",
    previousMonth: "91.8%",
    change: "+2.4%",
    changeType: "positive",
  },
  {
    metric: "AVG_PAYMENT_TIME",
    currentMonth: "18.5 DAYS",
    previousMonth: "21.2 DAYS",
    change: "-2.7 DAYS",
    changeType: "positive",
  },
  {
    metric: "OVERDUE_AMOUNT",
    currentMonth: "$89,450",
    previousMonth: "$102,340",
    change: "-12.6%",
    changeType: "positive",
  },
];
