import type * as React from "react";
import { cn } from "@/lib/utils";

interface DateRange {
  from: string;
  to: string;
}

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  className?: string;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const handleFromChange = (value: string) => {
    onDateRangeChange({ ...dateRange, from: value });
  };

  const handleToChange = (value: string) => {
    onDateRangeChange({ ...dateRange, to: value });
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-mono text-landing-text-muted text-xs">PERIOD:</span>
      <input
        className="rounded border border-landing-border bg-landing-surface px-2 py-1 font-mono text-landing-text text-xs focus:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onChange={(e) => handleFromChange(e.target.value)}
        type="date"
        value={dateRange.from}
      />
      <span className="font-mono text-landing-text-muted text-xs">TO</span>
      <input
        className="rounded border border-landing-border bg-landing-surface px-2 py-1 font-mono text-landing-text text-xs focus:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onChange={(e) => handleToChange(e.target.value)}
        type="date"
        value={dateRange.to}
      />
    </div>
  );
}

interface ReportAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "default" | "ghost";
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface ReportActionsProps {
  actions: ReportAction[];
  className?: string;
}

export function ReportActions({ actions, className }: ReportActionsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {actions.map((action, index) => (
        <button
          className={cn(
            "inline-flex items-center gap-2 border border-landing-border px-4 py-2 font-medium font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50",
            "button-press transform hover:scale-105 active:scale-95",
            action.variant === "primary" &&
              "border-landing-accent bg-landing-accent text-landing-bg hover:bg-landing-accent-dark hover:shadow-landing-accent/20 hover:shadow-lg",
            action.variant === "default" &&
              "bg-landing-surface-alt text-landing-text hover:bg-landing-border hover:shadow-md",
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
    </div>
  );
}

interface ReportActionBarProps {
  actions: ReportAction[];
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  className?: string;
}

export function ReportActionBar({
  actions,
  dateRange,
  onDateRangeChange,
  className,
}: ReportActionBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap",
        className
      )}
    >
      <ReportActions actions={actions} className="flex-shrink-0" />
      <DateRangePicker
        className="flex-shrink-0"
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
    </div>
  );
}

// Predefined action configurations
export const createReportActions = (handlers: {
  onGenerateReport: () => void;
  onExportPDF: () => void;
  onScheduleReport: () => void;
  onEmailReport: () => void;
}): ReportAction[] => [
  {
    label: "GENERATE_REPORT",
    onClick: handlers.onGenerateReport,
    variant: "primary",
  },
  {
    label: "EXPORT_PDF",
    onClick: handlers.onExportPDF,
    variant: "default",
  },
  {
    label: "SCHEDULE_REPORT",
    onClick: handlers.onScheduleReport,
    variant: "default",
  },
  {
    label: "EMAIL_REPORT",
    onClick: handlers.onEmailReport,
    variant: "default",
  },
];

// Quick date range presets
export const getDateRangePresets = () => {
  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  const currentYear = new Date(today.getFullYear(), 0, 1);
  const lastYear = new Date(today.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    thisMonth: {
      from: formatDate(currentMonth),
      to: formatDate(today),
    },
    lastMonth: {
      from: formatDate(lastMonth),
      to: formatDate(lastMonthEnd),
    },
    thisYear: {
      from: formatDate(currentYear),
      to: formatDate(today),
    },
    lastYear: {
      from: formatDate(lastYear),
      to: formatDate(lastYearEnd),
    },
  };
};
