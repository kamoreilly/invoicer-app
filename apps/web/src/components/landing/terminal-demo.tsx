"use client";

import { useEffect, useState } from "react";

interface TerminalLine {
  type: "command" | "output";
  content: string;
  prompt?: string;
}

const terminalLines: TerminalLine[] = [
  { type: "command", content: "npm start", prompt: "user@localhost:~$" },
  { type: "output", content: "✓ Starting Invoicer App v2.1.4..." },
  { type: "output", content: "✓ Database initialized successfully" },
  { type: "output", content: "✓ Web server running on http://localhost:3000" },
  {
    type: "command",
    content: "open http://localhost:3000",
    prompt: "user@localhost:~$",
  },
  { type: "output", content: "✓ Opening Invoicer App in browser..." },
  {
    type: "output",
    content: "✓ Dashboard loaded - 247 invoices, $127,450 total value",
  },
  {
    type: "command",
    content: "# Ready to manage invoices!",
    prompt: "user@localhost:~$",
  },
  {
    type: "output",
    content: "🎯 Create, send, track, and manage all your invoices",
  },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          return 0; // Reset animation
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-landing-surface-alt bg-landing-surface">
      <div className="flex items-center justify-between border-landing-border border-b bg-landing-surface-alt px-4 py-3">
        <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
          INVOICER_APP_DEMO.SH
        </div>
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-landing-error" />
          <div className="h-3 w-3 rounded-full bg-landing-warning" />
          <div className="h-3 w-3 rounded-full bg-landing-success" />
        </div>
      </div>

      <div className="p-6 font-mono text-xs leading-relaxed">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <div className="mb-2" key={index}>
            {line.type === "command" ? (
              <div className="flex">
                <span className="text-landing-accent">{line.prompt}</span>
                <span className="ml-2 text-landing-text">{line.content}</span>
              </div>
            ) : (
              <div className="ml-5 text-landing-success">{line.content}</div>
            )}
          </div>
        ))}

        {visibleLines > 0 && visibleLines <= terminalLines.length && (
          <div className="ml-5 flex">
            <span className="h-4 w-2 animate-pulse bg-landing-accent" />
          </div>
        )}
      </div>
    </div>
  );
}
