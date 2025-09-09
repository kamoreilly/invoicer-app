import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const terminalButtonVariants = cva(
  "inline-flex items-center justify-center border border-landing-border px-5 py-2.5 font-medium font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-landing-surface-alt text-landing-text hover:bg-landing-border",
        primary:
          "border-landing-accent bg-landing-accent text-landing-bg hover:bg-landing-accent-dark",
        ghost:
          "border-transparent bg-transparent text-landing-text hover:border-landing-border hover:bg-landing-surface-alt",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface TerminalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof terminalButtonVariants> {}

const TerminalButton = React.forwardRef<HTMLButtonElement, TerminalButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(terminalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

TerminalButton.displayName = "TerminalButton";

export { TerminalButton, terminalButtonVariants };
