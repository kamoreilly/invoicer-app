import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const terminalCardVariants = cva(
  "border border-landing-border bg-landing-surface font-mono",
  {
    variants: {
      variant: {
        default: "bg-landing-surface",
        elevated: "bg-landing-surface-alt",
        accent: "border-landing-accent bg-landing-surface",
      },
      size: {
        default: "p-4",
        sm: "p-3",
        lg: "p-6",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

interface TerminalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof terminalCardVariants> {}

function TerminalCard({
  className,
  variant,
  size,
  rounded,
  ...props
}: TerminalCardProps) {
  return (
    <div
      className={cn(
        terminalCardVariants({ variant, size, rounded, className })
      )}
      data-slot="terminal-card"
      {...props}
    />
  );
}

function TerminalCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "-mx-4 -mt-4 mb-4 flex items-center justify-between border-landing-border border-b bg-landing-surface-alt px-4 py-3",
        className
      )}
      data-slot="terminal-card-header"
      {...props}
    />
  );
}

function TerminalCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-semibold text-landing-accent text-xs uppercase tracking-wider",
        className
      )}
      data-slot="terminal-card-title"
      {...props}
    />
  );
}

function TerminalCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-landing-text", className)}
      data-slot="terminal-card-content"
      {...props}
    />
  );
}

function TerminalCardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "-mx-4 -mb-4 mt-4 flex items-center justify-between border-landing-border border-t px-4 pt-4 pb-4",
        className
      )}
      data-slot="terminal-card-footer"
      {...props}
    />
  );
}

// Terminal window controls (red, yellow, green dots)
function TerminalCardControls({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex gap-1.5", className)}
      data-slot="terminal-card-controls"
      {...props}
    >
      <div className="h-3 w-3 rounded-full bg-landing-error" />
      <div className="h-3 w-3 rounded-full bg-landing-warning" />
      <div className="h-3 w-3 rounded-full bg-landing-success" />
    </div>
  );
}

export {
  TerminalCard,
  TerminalCardHeader,
  TerminalCardTitle,
  TerminalCardContent,
  TerminalCardFooter,
  TerminalCardControls,
  terminalCardVariants,
};
