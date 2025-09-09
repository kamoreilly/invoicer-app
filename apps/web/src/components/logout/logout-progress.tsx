import type * as React from "react";
import { cn } from "@/lib/utils";

interface LogoutProgressProps {
  progress: number;
  currentStep: string;
  className?: string;
}

export function LogoutProgress({
  progress,
  currentStep,
  className,
}: LogoutProgressProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-landing-surface-alt">
        <div
          className="h-full rounded-full bg-landing-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center">
        <div className="text-landing-text-muted text-xs">{currentStep}</div>
        <div className="mt-1 font-semibold text-landing-accent text-xs">
          {progress}% Complete
        </div>
      </div>
    </div>
  );
}
