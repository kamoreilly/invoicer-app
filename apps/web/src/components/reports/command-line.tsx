import type * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CommandLineEntry {
  type: "command" | "output" | "error";
  content: string;
  timestamp?: Date;
}

interface CommandLineProps {
  entries?: CommandLineEntry[];
  showCursor?: boolean;
  className?: string;
}

export function CommandLine({
  entries = [],
  showCursor = true,
  className,
}: CommandLineProps) {
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor) return;

    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [showCursor]);

  const defaultEntries: CommandLineEntry[] = [
    {
      type: "command",
      content:
        "report --generate --type=revenue --period=monthly --format=json",
    },
    {
      type: "output",
      content: "✓ Report generated successfully: revenue_2024-01.json",
    },
  ];

  const displayEntries = entries.length > 0 ? entries : defaultEntries;

  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-bg p-3 font-mono text-xs",
        className
      )}
    >
      {displayEntries.map((entry, index) => (
        <div className="mb-1 last:mb-0" key={index}>
          {entry.type === "command" ? (
            <div className="text-landing-success">
              <span className="text-landing-accent">
                invoicer@app-terminal:~$
              </span>{" "}
              <span className="text-landing-text">{entry.content}</span>
            </div>
          ) : entry.type === "error" ? (
            <div className="text-landing-error">✗ {entry.content}</div>
          ) : (
            <div className="text-landing-success">✓ {entry.content}</div>
          )}
        </div>
      ))}

      {showCursor && (
        <div className="text-landing-success">
          <span className="text-landing-accent">invoicer@app-terminal:~$</span>{" "}
          <span
            className={cn(
              "bg-landing-accent px-1 text-landing-bg",
              cursorVisible ? "opacity-100" : "opacity-0"
            )}
          >
            █
          </span>
        </div>
      )}
    </div>
  );
}

interface ReportCommandLineProps {
  lastCommand?: string;
  lastOutput?: string;
  isGenerating?: boolean;
  className?: string;
}

export function ReportCommandLine({
  lastCommand,
  lastOutput,
  isGenerating = false,
  className,
}: ReportCommandLineProps) {
  const entries: CommandLineEntry[] = [];

  if (lastCommand) {
    entries.push({
      type: "command",
      content: lastCommand,
    });
  }

  if (isGenerating) {
    entries.push({
      type: "output",
      content: "⚡ Generating report...",
    });
  } else if (lastOutput) {
    entries.push({
      type: "output",
      content: lastOutput,
    });
  }

  return (
    <CommandLine
      className={className}
      entries={entries}
      showCursor={!isGenerating}
    />
  );
}

// Utility functions for generating command outputs
export const generateReportCommand = (
  type: string,
  period = "monthly",
  format = "json"
) => {
  return `report --generate --type=${type} --period=${period} --format=${format}`;
};

export const generateReportOutput = (type: string, filename?: string) => {
  const timestamp = new Date().toISOString().split("T")[0];
  const defaultFilename = `${type}_${timestamp}.json`;
  return `✓ Report generated successfully: ${filename || defaultFilename}`;
};

export const generateExportCommand = (format = "pdf", filename?: string) => {
  const timestamp = new Date().toISOString().split("T")[0];
  const defaultFilename = `report_${timestamp}.${format}`;
  return `export --format=${format} --output=${filename || defaultFilename}`;
};

export const generateExportOutput = (format: string, filename?: string) => {
  const timestamp = new Date().toISOString().split("T")[0];
  const defaultFilename = `report_${timestamp}.${format}`;
  return `✓ Export completed: ${filename || defaultFilename}`;
};
