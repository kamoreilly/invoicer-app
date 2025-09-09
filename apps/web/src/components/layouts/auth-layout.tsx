import type * as React from "react";
import { AppLogo } from "@/components/common/app-logo";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  version?: string;
  showLogo?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

function AuthLayout({
  children,
  className,
  title = "INVOICER APP",
  subtitle = "Open Source Invoice Management",
  version = "Version 2.1.4 • Local Installation",
  showLogo = true,
  maxWidth = "md",
}: AuthLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-landing-bg p-5 font-mono text-landing-text",
        className
      )}
    >
      <div className={cn("w-full", maxWidthClasses[maxWidth])}>
        {showLogo && (
          <AuthHeader subtitle={subtitle} title={title} version={version} />
        )}
        {children}
      </div>
    </div>
  );
}

// Auth header with logo and app info
interface AuthHeaderProps {
  title: string;
  subtitle: string;
  version: string;
  className?: string;
}

function AuthHeader({ title, subtitle, version, className }: AuthHeaderProps) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      <div className="mb-4 flex items-center justify-center gap-3 font-bold text-2xl text-landing-accent">
        <AppLogo size="xl" text={title} />
      </div>
      <p className="mb-2 text-landing-text-muted text-sm">{subtitle}</p>
      <p className="text-landing-text-dimmed text-xs uppercase tracking-wider">
        {version}
      </p>
    </div>
  );
}

// Auth card wrapper
interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showTerminalHeader?: boolean;
}

function AuthCard({
  children,
  className,
  title,
  showTerminalHeader = false,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-landing-border bg-landing-surface",
        className
      )}
    >
      {showTerminalHeader && (
        <div className="flex items-center justify-between border-landing-border border-b bg-landing-surface-alt px-4 py-3">
          <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
            {title || "AUTH_TERMINAL.SH"}
          </div>
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-landing-error" />
            <div className="h-3 w-3 rounded-full bg-landing-warning" />
            <div className="h-3 w-3 rounded-full bg-landing-success" />
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

// Terminal command history display
interface TerminalHistoryProps {
  commands: string[];
  className?: string;
  maxHeight?: string;
}

function TerminalHistory({
  commands,
  className,
  maxHeight = "200px",
}: TerminalHistoryProps) {
  if (commands.length === 0) return null;

  return (
    <div
      className={cn(
        "mb-6 overflow-hidden rounded-md border border-landing-border bg-landing-surface-alt",
        className
      )}
    >
      <div className="flex items-center justify-between border-landing-border border-b bg-landing-surface px-4 py-2">
        <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
          TERMINAL_OUTPUT
        </div>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-landing-error" />
          <div className="h-2 w-2 rounded-full bg-landing-warning" />
          <div className="h-2 w-2 rounded-full bg-landing-success" />
        </div>
      </div>
      <div
        className="overflow-y-auto p-4 font-mono text-xs leading-relaxed"
        style={{ maxHeight }}
      >
        {commands.map((command, index) => (
          <div className="mb-1" key={index}>
            {command.startsWith("✓") ? (
              <div className="text-landing-success">{command}</div>
            ) : command.startsWith("✗") ? (
              <div className="text-landing-error">{command}</div>
            ) : command.startsWith("⚡") ? (
              <div className="text-landing-warning">{command}</div>
            ) : command.startsWith("💡") ? (
              <div className="text-landing-accent">{command}</div>
            ) : (
              <div className="text-landing-text-muted">{command}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { AuthLayout, AuthHeader, AuthCard, TerminalHistory };
