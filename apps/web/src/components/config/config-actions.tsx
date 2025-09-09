import type * as React from "react";
import { cn } from "@/lib/utils";

interface ConfigAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "default" | "danger";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

interface ConfigActionsProps {
  actions: ConfigAction[];
  className?: string;
}

export function ConfigActions({ actions, className }: ConfigActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {actions.map((action, index) => (
        <button
          className={cn(
            "inline-flex items-center gap-2 border border-landing-border px-4 py-2 font-medium font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20 disabled:cursor-not-allowed disabled:opacity-50",
            "transform hover:scale-105 active:scale-95",
            action.variant === "primary" &&
              "border-landing-accent bg-landing-accent text-landing-bg hover:bg-landing-accent-dark hover:shadow-landing-accent/20 hover:shadow-lg",
            action.variant === "default" &&
              "bg-landing-surface-alt text-landing-text hover:bg-landing-border hover:shadow-md",
            action.variant === "danger" &&
              "border-landing-error bg-landing-error text-white hover:bg-red-600 hover:shadow-landing-error/20 hover:shadow-lg"
          )}
          disabled={action.disabled || action.loading}
          key={index}
          onClick={action.onClick}
        >
          {action.loading ? (
            <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
          ) : (
            action.icon
          )}
          {action.label}
        </button>
      ))}
    </div>
  );
}

interface ConfigCommandLineProps {
  lastCommand?: string;
  lastOutput?: string;
  isProcessing?: boolean;
  className?: string;
}

export function ConfigCommandLine({
  lastCommand,
  lastOutput,
  isProcessing = false,
  className,
}: ConfigCommandLineProps) {
  return (
    <div
      className={cn(
        "rounded border border-landing-border bg-landing-bg p-3 font-mono text-xs",
        className
      )}
    >
      {lastCommand && (
        <div className="mb-1 text-landing-success">
          <span className="text-landing-accent">invoicer@app-terminal:~$</span>{" "}
          <span className="text-landing-text">{lastCommand}</span>
        </div>
      )}

      {isProcessing && (
        <div className="mb-1 text-landing-warning">
          ⚡ Processing configuration...
        </div>
      )}

      {lastOutput && !isProcessing && (
        <div className="mb-1 text-landing-success">{lastOutput}</div>
      )}

      <div className="text-landing-success">
        <span className="text-landing-accent">invoicer@app-terminal:~$</span>{" "}
        <span
          className={cn(
            "bg-landing-accent px-1 text-landing-bg",
            !isProcessing && "animate-pulse"
          )}
        >
          █
        </span>
      </div>
    </div>
  );
}

// Utility functions for generating config commands and outputs
export const generateConfigCommand = (
  action: string,
  options?: Record<string, string>
) => {
  let command = `config --${action}`;
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      command += ` --${key}=${value}`;
    });
  }
  return command;
};

export const generateConfigOutput = (
  action: string,
  success = true,
  details?: string
) => {
  const actionMap: Record<string, string> = {
    save: "Configuration saved successfully",
    "load-defaults": "Default configuration loaded",
    export: "Configuration exported successfully",
    import: "Configuration imported successfully",
    reset: "All configuration reset to factory defaults",
    validate: "Configuration validation completed",
    backup: "Configuration backup created",
    restore: "Configuration restored from backup",
  };

  const message = actionMap[action] || `${action} completed`;
  const prefix = success ? "✓" : "✗";
  const suffix = details ? `: ${details}` : "";

  return `${prefix} ${message}${suffix}`;
};

// Predefined action configurations
export const createConfigActions = (
  handlers: {
    onSave: () => void;
    onLoadDefaults: () => void;
    onExport: () => void;
    onImport: () => void;
    onReset: () => void;
  },
  states: {
    isSaving?: boolean;
    isLoading?: boolean;
    isExporting?: boolean;
    isImporting?: boolean;
    isResetting?: boolean;
  } = {}
): ConfigAction[] => [
  {
    label: "SAVE_CONFIG",
    onClick: handlers.onSave,
    variant: "primary",
    loading: states.isSaving,
    disabled: states.isSaving,
  },
  {
    label: "LOAD_DEFAULTS",
    onClick: handlers.onLoadDefaults,
    variant: "default",
    loading: states.isLoading,
    disabled: states.isLoading,
  },
  {
    label: "EXPORT_CONFIG",
    onClick: handlers.onExport,
    variant: "default",
    loading: states.isExporting,
    disabled: states.isExporting,
  },
  {
    label: "IMPORT_CONFIG",
    onClick: handlers.onImport,
    variant: "default",
    loading: states.isImporting,
    disabled: states.isImporting,
  },
  {
    label: "RESET_ALL",
    onClick: handlers.onReset,
    variant: "danger",
    loading: states.isResetting,
    disabled: states.isResetting,
  },
];

// Configuration validation utilities
export const validateConfiguration = (
  config: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate general config
  if (!config.general?.companyName?.trim()) {
    errors.push("Company name is required");
  }

  // Validate invoice config
  if (!config.invoice?.invoicePrefix?.trim()) {
    errors.push("Invoice prefix is required");
  }
  if (
    !config.invoice?.nextInvoiceNumber ||
    config.invoice.nextInvoiceNumber < 1
  ) {
    errors.push("Next invoice number must be greater than 0");
  }
  if (
    config.invoice?.defaultTaxRate < 0 ||
    config.invoice?.defaultTaxRate > 100
  ) {
    errors.push("Tax rate must be between 0 and 100");
  }

  // Validate email config
  if (!config.email?.smtpServer?.trim()) {
    errors.push("SMTP server is required");
  }
  if (
    !config.email?.smtpPort ||
    config.email.smtpPort < 1 ||
    config.email.smtpPort > 65_535
  ) {
    errors.push("SMTP port must be between 1 and 65535");
  }
  if (!config.email?.emailUsername?.trim()) {
    errors.push("Email username is required");
  }
  if (!config.email?.emailPassword?.trim()) {
    errors.push("Email password is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
