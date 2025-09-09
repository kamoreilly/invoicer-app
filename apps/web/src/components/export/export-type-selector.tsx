import type * as React from "react";
import { cn } from "@/lib/utils";

export type ExportType =
  | "invoices"
  | "clients"
  | "payments"
  | "reports"
  | "tax"
  | "complete";
export type ExportFormat =
  | "csv"
  | "json"
  | "xml"
  | "pdf"
  | "xlsx"
  | "vcard"
  | "qif"
  | "iif"
  | "zip"
  | "tar.gz"
  | "sql";

interface ExportTypeData {
  id: ExportType;
  title: string;
  description: string;
  formats: ExportFormat[];
}

interface ExportTypeCardProps {
  exportType: ExportTypeData;
  isSelected: boolean;
  onSelect: (type: ExportType) => void;
  className?: string;
}

function ExportTypeCard({
  exportType,
  isSelected,
  onSelect,
  className,
}: ExportTypeCardProps) {
  return (
    <div
      className={cn(
        "export-card export-hover-effect cursor-pointer rounded-sm border border-landing-border bg-landing-bg p-5 transition-all duration-200",
        "hover:border-landing-accent hover:bg-landing-surface hover:shadow-landing-accent/10 hover:shadow-lg",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
        isSelected && "export-success border-landing-accent bg-landing-surface",
        className
      )}
      onClick={() => onSelect(exportType.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(exportType.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="export-title mb-2 font-semibold text-landing-accent text-sm uppercase tracking-wider">
        {exportType.title}
      </div>
      <div className="export-description mb-3 text-landing-text-muted text-xs leading-relaxed">
        {exportType.description}
      </div>
      <div className="export-formats flex flex-wrap gap-2">
        {exportType.formats.map((format) => (
          <span
            className="format-badge rounded-sm bg-landing-surface-alt px-2 py-1 font-medium text-landing-text text-xs uppercase tracking-wide transition-all duration-200 hover:bg-landing-accent hover:text-landing-bg"
            key={format}
          >
            {format}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ExportTypeSelectorProps {
  selectedType: ExportType | null;
  onTypeSelect: (type: ExportType) => void;
  className?: string;
}

export function ExportTypeSelector({
  selectedType,
  onTypeSelect,
  className,
}: ExportTypeSelectorProps) {
  return (
    <div
      className={cn(
        "export-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {exportTypes.map((exportType) => (
        <ExportTypeCard
          exportType={exportType}
          isSelected={selectedType === exportType.id}
          key={exportType.id}
          onSelect={onTypeSelect}
        />
      ))}
    </div>
  );
}

// Export type definitions
export const exportTypes: ExportTypeData[] = [
  {
    id: "invoices",
    title: "INVOICE_DATA",
    description:
      "Export all invoice records including line items, totals, and payment status",
    formats: ["csv", "json", "xml", "pdf"],
  },
  {
    id: "clients",
    title: "CLIENT_DATABASE",
    description:
      "Export client information, contact details, and billing addresses",
    formats: ["csv", "json", "vcard"],
  },
  {
    id: "payments",
    title: "PAYMENT_RECORDS",
    description:
      "Export payment transactions, methods, and reconciliation data",
    formats: ["csv", "json", "qif"],
  },
  {
    id: "reports",
    title: "FINANCIAL_REPORTS",
    description: "Export generated reports, analytics, and financial summaries",
    formats: ["pdf", "xlsx", "csv"],
  },
  {
    id: "tax",
    title: "TAX_DOCUMENTS",
    description: "Export tax-related data for accounting and filing purposes",
    formats: ["csv", "pdf", "iif"],
  },
  {
    id: "complete",
    title: "COMPLETE_BACKUP",
    description: "Export all system data including configurations and settings",
    formats: ["zip", "tar.gz", "sql"],
  },
];

// Format descriptions for UI
export const formatDescriptions: Record<ExportFormat, string> = {
  csv: "CSV - Comma Separated Values",
  json: "JSON - JavaScript Object Notation",
  xml: "XML - Extensible Markup Language",
  pdf: "PDF - Portable Document Format",
  xlsx: "XLSX - Excel Spreadsheet",
  vcard: "VCARD - Contact Card Format",
  qif: "QIF - Quicken Interchange Format",
  iif: "IIF - Intuit Interchange Format",
  zip: "ZIP - Compressed Archive",
  "tar.gz": "TAR.GZ - Compressed Tarball",
  sql: "SQL - Database Dump",
};

// Get available formats for a specific export type
export const getAvailableFormats = (exportType: ExportType): ExportFormat[] => {
  const typeData = exportTypes.find((t) => t.id === exportType);
  return typeData?.formats || [];
};

// Get format options for select component
export const getFormatOptions = (exportType: ExportType) => {
  const formats = getAvailableFormats(exportType);
  return formats.map((format) => ({
    value: format,
    label: formatDescriptions[format],
  }));
};
