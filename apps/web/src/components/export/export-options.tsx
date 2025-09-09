import type * as React from "react";
import {
  ConfigCheckbox,
  ConfigGrid,
  ConfigSection,
} from "@/components/config/form-components";
import { cn } from "@/lib/utils";
import type { ExportType } from "./export-type-selector";

interface ExportOptions {
  includeDeleted: boolean;
  includeDrafts: boolean;
  includeAttachments: boolean;
  anonymizeData: boolean;
  emailExport: boolean;
}

interface ExportOptionsProps {
  options: ExportOptions;
  onOptionsChange: (updates: Partial<ExportOptions>) => void;
  exportType: ExportType | null;
  className?: string;
}

export function ExportOptionsComponent({
  options,
  onOptionsChange,
  exportType,
  className,
}: ExportOptionsProps) {
  const handleOptionChange = (option: keyof ExportOptions, value: boolean) => {
    onOptionsChange({ [option]: value });
  };

  // Get relevant options based on export type
  const getRelevantOptions = () => {
    const baseOptions = [
      {
        id: "includeDeleted" as const,
        label: "INCLUDE_DELETED_RECORDS",
        description: "Include records that have been marked as deleted",
        relevantFor: ["invoices", "clients", "payments", "complete"],
      },
      {
        id: "emailExport" as const,
        label: "EMAIL_EXPORT_LINK",
        description: "Send download link via email when export is complete",
        relevantFor: [
          "invoices",
          "clients",
          "payments",
          "reports",
          "tax",
          "complete",
        ],
      },
    ];

    const typeSpecificOptions = {
      invoices: [
        {
          id: "includeDrafts" as const,
          label: "INCLUDE_DRAFT_INVOICES",
          description: "Include invoices that are still in draft status",
          relevantFor: ["invoices"],
        },
        {
          id: "includeAttachments" as const,
          label: "INCLUDE_ATTACHMENTS",
          description: "Include file attachments in the export",
          relevantFor: ["invoices"],
        },
      ],
      clients: [
        {
          id: "anonymizeData" as const,
          label: "ANONYMIZE_CLIENT_DATA",
          description:
            "Replace sensitive client information with placeholder data",
          relevantFor: ["clients"],
        },
      ],
      payments: [
        {
          id: "includeAttachments" as const,
          label: "INCLUDE_RECEIPTS",
          description: "Include payment receipts and transaction documents",
          relevantFor: ["payments"],
        },
      ],
      reports: [
        {
          id: "includeAttachments" as const,
          label: "INCLUDE_CHARTS",
          description: "Include chart images and visualizations",
          relevantFor: ["reports"],
        },
      ],
      tax: [
        {
          id: "anonymizeData" as const,
          label: "ANONYMIZE_TAX_DATA",
          description:
            "Remove personally identifiable information from tax records",
          relevantFor: ["tax"],
        },
      ],
      complete: [
        {
          id: "includeDrafts" as const,
          label: "INCLUDE_DRAFT_DATA",
          description: "Include all draft and temporary data",
          relevantFor: ["complete"],
        },
        {
          id: "includeAttachments" as const,
          label: "INCLUDE_ALL_FILES",
          description: "Include all uploaded files and attachments",
          relevantFor: ["complete"],
        },
        {
          id: "anonymizeData" as const,
          label: "ANONYMIZE_SENSITIVE_DATA",
          description: "Replace sensitive information with placeholder data",
          relevantFor: ["complete"],
        },
      ],
    };

    const allOptions = [
      ...baseOptions,
      ...(exportType ? typeSpecificOptions[exportType] || [] : []),
    ];

    return allOptions.filter(
      (option) => !exportType || option.relevantFor.includes(exportType)
    );
  };

  const relevantOptions = getRelevantOptions();

  return (
    <ConfigSection className={className} title="EXPORT_OPTIONS">
      <div className="space-y-3">
        {relevantOptions.map((option) => (
          <div className="export-option-item" key={option.id}>
            <ConfigCheckbox
              checked={options[option.id]}
              id={option.id}
              label={option.label}
              onChange={(e) => handleOptionChange(option.id, e.target.checked)}
            />
            <div className="-mt-2 mb-2 ml-7 text-landing-text-muted text-xs">
              {option.description}
            </div>
          </div>
        ))}

        {relevantOptions.length === 0 && (
          <div className="text-landing-text-muted text-xs italic">
            Select an export type to see available options
          </div>
        )}
      </div>
    </ConfigSection>
  );
}

// Advanced filters component
interface AdvancedFilters {
  statusFilter: string[];
  clientFilter: string[];
  amountRange: {
    min: number | null;
    max: number | null;
  };
  customFields: Record<string, string>;
}

interface AdvancedFiltersProps {
  filters: AdvancedFilters;
  onFiltersChange: (updates: Partial<AdvancedFilters>) => void;
  exportType: ExportType | null;
  className?: string;
}

export function AdvancedFiltersComponent({
  filters,
  onFiltersChange,
  exportType,
  className,
}: AdvancedFiltersProps) {
  // Get filter options based on export type
  const getFilterOptions = () => {
    const filterOptions = {
      invoices: {
        statusOptions: ["draft", "sent", "paid", "overdue", "cancelled"],
        showAmountRange: true,
        showClientFilter: true,
      },
      clients: {
        statusOptions: ["active", "inactive", "archived"],
        showAmountRange: false,
        showClientFilter: false,
      },
      payments: {
        statusOptions: ["pending", "completed", "failed", "refunded"],
        showAmountRange: true,
        showClientFilter: true,
      },
      reports: {
        statusOptions: ["generated", "scheduled", "archived"],
        showAmountRange: false,
        showClientFilter: false,
      },
      tax: {
        statusOptions: ["filed", "pending", "amended"],
        showAmountRange: true,
        showClientFilter: true,
      },
      complete: {
        statusOptions: [],
        showAmountRange: false,
        showClientFilter: false,
      },
    };

    return exportType ? filterOptions[exportType] : null;
  };

  const filterOptions = getFilterOptions();

  if (!(exportType && filterOptions)) {
    return (
      <ConfigSection className={className} title="ADVANCED_FILTERS">
        <div className="text-landing-text-muted text-xs italic">
          Select an export type to configure advanced filters
        </div>
      </ConfigSection>
    );
  }

  return (
    <ConfigSection className={className} title="ADVANCED_FILTERS">
      <div className="space-y-4">
        {filterOptions.statusOptions.length > 0 && (
          <div>
            <div className="mb-2 text-landing-text-muted text-xs uppercase tracking-wider">
              STATUS_FILTER
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.statusOptions.map((status) => (
                <label
                  className="flex cursor-pointer items-center gap-2"
                  key={status}
                >
                  <input
                    checked={filters.statusFilter.includes(status)}
                    className="h-3 w-3 rounded-sm border border-landing-border bg-landing-surface"
                    onChange={(e) => {
                      const newStatusFilter = e.target.checked
                        ? [...filters.statusFilter, status]
                        : filters.statusFilter.filter((s) => s !== status);
                      onFiltersChange({ statusFilter: newStatusFilter });
                    }}
                    type="checkbox"
                  />
                  <span className="text-landing-text text-xs uppercase">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {filterOptions.showAmountRange && (
          <div>
            <div className="mb-2 text-landing-text-muted text-xs uppercase tracking-wider">
              AMOUNT_RANGE
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="rounded-sm border border-landing-border bg-landing-surface px-2 py-1 text-landing-text text-xs"
                onChange={(e) =>
                  onFiltersChange({
                    amountRange: {
                      ...filters.amountRange,
                      min: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : null,
                    },
                  })
                }
                placeholder="Min amount"
                type="number"
                value={filters.amountRange.min || ""}
              />
              <input
                className="rounded-sm border border-landing-border bg-landing-surface px-2 py-1 text-landing-text text-xs"
                onChange={(e) =>
                  onFiltersChange({
                    amountRange: {
                      ...filters.amountRange,
                      max: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : null,
                    },
                  })
                }
                placeholder="Max amount"
                type="number"
                value={filters.amountRange.max || ""}
              />
            </div>
          </div>
        )}
      </div>
    </ConfigSection>
  );
}

export type { ExportOptions, AdvancedFilters };
