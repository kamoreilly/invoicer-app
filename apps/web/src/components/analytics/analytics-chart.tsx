import type * as React from "react";
import { cn } from "@/lib/utils";

interface ChartData {
  month: string;
  value: number;
  displayValue: string;
}

interface AnalyticsChartProps {
  title: string;
  data: ChartData[];
  className?: string;
  height?: number;
}

export function AnalyticsChart({
  title,
  data,
  className,
  height = 200,
}: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-bg p-5",
        className
      )}
    >
      <div className="mb-4 font-semibold text-landing-accent text-xs uppercase tracking-wider">
        {title}
      </div>

      <div
        className="flex items-end gap-2 px-5 py-5"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 40); // Leave space for labels

          return (
            <div
              className="group relative flex flex-1 flex-col items-center"
              key={index}
            >
              {/* Bar */}
              <div
                className="relative w-full cursor-pointer rounded-t bg-landing-surface-alt transition-all duration-300 hover:bg-landing-accent"
                style={{
                  height: `${barHeight}px`,
                  animationDelay: `${index * 100}ms`,
                }}
                title={`${item.month}: ${item.displayValue}`}
              >
                {/* Value label on top of bar */}
                <div className="-top-5 -translate-x-1/2 absolute left-1/2 transform font-semibold text-landing-text-muted text-xs">
                  {item.displayValue}
                </div>
              </div>

              {/* Month label */}
              <div className="mt-2 font-medium text-landing-text-muted text-xs">
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
