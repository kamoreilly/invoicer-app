import type * as React from "react";
import { cn } from "@/lib/utils";

interface ExportAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "default" | "danger";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

interface ExportActionsProps {
  actions: ExportAction[];
  className?: string;
}

export function ExportActions({ actions, className }: ExportActionsProps) {
  return (
    <div
      className={cn(
        "export-actions flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
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

interface ExportCommandLineProps {
  lastCommand?: string;
  lastOutput?: string;
  isProcessing?: boolean;
  className?: string;
}

export function ExportCommandLine({
  lastCommand,
  lastOutput,
  isProcessing = false,
  className,
}: ExportCommandLineProps) {
  return (
    <div
      className={cn(
        "export-command-line rounded border border-landing-border bg-landing-bg p-3 font-mono text-xs",
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
        <div className="mb-1 text-landing-warning">⚡ Processing export...</div>
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

// Utility functions for generating export commands and outputs
export const generateExportCommand = (
  action: string,
  options?: Record<string, string>
) => {
  let command = `export --${action}`;
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      command += ` --${key}=${value}`;
    });
  }
  return command;
};

export const generateExportOutput = (
  action: string,
  success = true,
  details?: string
) => {
  const actionMap: Record<string, string> = {
    start: "Export process started",
    preview: "Preview generated",
    "save-template": "Export template saved",
    "load-template": "Export template loaded",
    validate: "Configuration validated",
    cancel: "Export cancelled",
    download: "Download initiated",
  };

  const message = actionMap[action] || `${action} completed`;
  const prefix = success ? "✓" : "✗";
  const suffix = details ? `: ${details}` : "";

  return `${prefix} ${message}${suffix}`;
};

// Predefined action configurations
export const createExportActions = (
  handlers: {
    onStartExport: () => void;
    onPreviewData: () => void;
    onSaveTemplate: () => void;
    onLoadTemplate: () => void;
  },
  states: {
    isExporting?: boolean;
    isPreviewing?: boolean;
    isSaving?: boolean;
    isLoading?: boolean;
  } = {}
): ExportAction[] => [
  {
    label: "START_EXPORT",
    onClick: handlers.onStartExport,
    variant: "primary",
    loading: states.isExporting,
    disabled: states.isExporting,
  },
  {
    label: "PREVIEW_DATA",
    onClick: handlers.onPreviewData,
    variant: "default",
    loading: states.isPreviewing,
    disabled: states.isExporting || states.isPreviewing,
  },
  {
    label: "SAVE_TEMPLATE",
    onClick: handlers.onSaveTemplate,
    variant: "default",
    loading: states.isSaving,
    disabled: states.isExporting || states.isSaving,
  },
  {
    label: "LOAD_TEMPLATE",
    onClick: handlers.onLoadTemplate,
    variant: "default",
    loading: states.isLoading,
    disabled: states.isExporting || states.isLoading,
  },
];

// Export template management
interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  config: any;
  createdAt: Date;
  updatedAt: Date;
}

export const saveExportTemplate = (
  name: string,
  config: any
): ExportTemplate => {
  const template: ExportTemplate = {
    id: `template_${Date.now()}`,
    name,
    description: `Export template for ${config.type || "unknown"} data`,
    config,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Save to localStorage (in a real app, this would be saved to a backend)
  const existingTemplates = getExportTemplates();
  const updatedTemplates = [...existingTemplates, template];
  localStorage.setItem("export_templates", JSON.stringify(updatedTemplates));

  return template;
};

export const getExportTemplates = (): ExportTemplate[] => {
  try {
    const templates = localStorage.getItem("export_templates");
    return templates ? JSON.parse(templates) : [];
  } catch {
    return [];
  }
};

export const loadExportTemplate = (
  templateId: string
): ExportTemplate | null => {
  const templates = getExportTemplates();
  return templates.find((t) => t.id === templateId) || null;
};

export const deleteExportTemplate = (templateId: string): boolean => {
  try {
    const templates = getExportTemplates();
    const updatedTemplates = templates.filter((t) => t.id !== templateId);
    localStorage.setItem("export_templates", JSON.stringify(updatedTemplates));
    return true;
  } catch {
    return false;
  }
};

// Export validation utilities
export const validateExportRequest = (
  config: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.type) {
    errors.push("Export type is required");
  }

  if (!config.format) {
    errors.push("Output format is required");
  }

  if (!config.dateRange?.start) {
    errors.push("Start date is required");
  }

  if (!config.dateRange?.end) {
    errors.push("End date is required");
  }

  if (config.dateRange?.start && config.dateRange?.end) {
    const startDate = new Date(config.dateRange.start);
    const endDate = new Date(config.dateRange.end);

    if (startDate > endDate) {
      errors.push("Start date must be before end date");
    }

    const daysDiff =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff > 365) {
      errors.push("Date range cannot exceed 365 days");
    }
  }

  if (config.delivery?.emailAddress) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(config.delivery.emailAddress)) {
      errors.push("Invalid email address format");
    }
  } else {
    errors.push("Email address is required");
  }

  if (!config.delivery?.filenamePrefix) {
    errors.push("Filename prefix is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export type { ExportAction, ExportTemplate };
