import type * as React from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function TerminalWindow({
  children,
  title = "TERMINAL",
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-sm border border-landing-border bg-landing-surface",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-landing-border border-b bg-landing-surface-alt px-4 py-3">
        <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
          {title}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-landing-error" />
          <div className="h-2 w-2 rounded-full bg-landing-warning" />
          <div className="h-2 w-2 rounded-full bg-landing-success" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="bg-landing-surface">{children}</div>
    </div>
  );
}
