import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const terminalInputVariants = cva(
  "flex w-full border bg-landing-surface font-mono text-landing-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-landing-border bg-landing-surface",
        filled: "border-landing-border bg-landing-surface-alt",
        accent: "border-landing-accent bg-landing-surface",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

interface TerminalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof terminalInputVariants> {}

const TerminalInput = React.forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ className, variant, size, rounded, type = "text", ...props }, ref) => {
    return (
      <input
        className={cn(
          terminalInputVariants({ variant, size, rounded, className })
        )}
        data-slot="terminal-input"
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

TerminalInput.displayName = "TerminalInput";

// Terminal-styled textarea
interface TerminalTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof terminalInputVariants> {}

const TerminalTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TerminalTextareaProps
>(({ className, variant, size, rounded, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        terminalInputVariants({ variant, size, rounded }),
        "min-h-[80px] resize-y",
        className
      )}
      data-slot="terminal-textarea"
      ref={ref}
      {...props}
    />
  );
});

TerminalTextarea.displayName = "TerminalTextarea";

// Terminal-styled label
interface TerminalLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const TerminalLabel = React.forwardRef<HTMLLabelElement, TerminalLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "font-medium font-mono text-landing-text text-xs uppercase tracking-wider",
          className
        )}
        data-slot="terminal-label"
        ref={ref}
        {...props}
      />
    );
  }
);

TerminalLabel.displayName = "TerminalLabel";

// Terminal-styled form field wrapper
interface TerminalFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const TerminalField = React.forwardRef<HTMLDivElement, TerminalFieldProps>(
  ({ className, label, error, required, children, ...props }, ref) => {
    return (
      <div
        className={cn("space-y-2", className)}
        data-slot="terminal-field"
        ref={ref}
        {...props}
      >
        {label && (
          <TerminalLabel>
            {label}
            {required && <span className="ml-1 text-landing-error">*</span>}
          </TerminalLabel>
        )}
        {children}
        {error && (
          <div className="font-mono text-landing-error text-xs">✗ {error}</div>
        )}
      </div>
    );
  }
);

TerminalField.displayName = "TerminalField";

export {
  TerminalInput,
  TerminalTextarea,
  TerminalLabel,
  TerminalField,
  terminalInputVariants,
};
