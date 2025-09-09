import type * as React from "react";
import { cn } from "@/lib/utils";

interface TerminalCommandLineProps {
  command?: string;
  output?: string;
  isRunning?: boolean;
  className?: string;
}

export function TerminalCommandLine({
  command = "",
  output = "",
  isRunning = false,
  className,
}: TerminalCommandLineProps) {
  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-bg p-3 font-mono text-xs",
        className
      )}
    >
      {/* Previous command and output */}
      {command && (
        <>
          <div className="text-landing-success">
            <span className="text-landing-accent">
              invoicer@app-terminal:~$
            </span>{" "}
            {command}
          </div>
          {output && (
            <div
              className={cn(
                "mt-1",
                isRunning ? "text-landing-warning" : "text-landing-success"
              )}
            >
              {output}
            </div>
          )}
        </>
      )}

      {/* Current prompt */}
      <div className="mt-2 flex items-center">
        <span className="text-landing-accent">invoicer@app-terminal:~$</span>
        <span className="ml-2 inline-block h-3 w-2 animate-pulse bg-landing-accent" />
      </div>
    </div>
  );
}
