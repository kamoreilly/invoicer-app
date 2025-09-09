import * as React from "react";
import {
  ConfigGrid,
  ConfigInput,
  ConfigSection,
  ConfigSelect,
  FormField,
  validateEmail,
  validateRequired,
} from "@/components/config/form-components";
import { cn } from "@/lib/utils";
import {
  type ExportFormat,
  type ExportType,
  getFormatOptions,
} from "./export-type-selector";

export type CompressionType = "none" | "zip" | "gzip";

interface ExportConfig {
  type: ExportType | null;
  format: ExportFormat;
  compression: CompressionType;
  dateRange: {
    start: string;
    end: string;
  };
  delivery: {
    emailAddress: string;
    filenamePrefix: string;
  };
}

interface ExportConfigFormProps {
  config: ExportConfig;
  onConfigChange: (updates: Partial<ExportConfig>) => void;
  className?: string;
}

export function ExportConfigForm({
  config,
  onConfigChange,
  className,
}: ExportConfigFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleDateRangeChange = (field: "start" | "end", value: string) => {
    const newDateRange = { ...config.dateRange, [field]: value };
    onConfigChange({ dateRange: newDateRange });

    // Validate date range
    const newErrors = { ...errors };
    if (
      field === "start" &&
      value &&
      config.dateRange.end &&
      new Date(value) > new Date(config.dateRange.end)
    ) {
      newErrors.dateRange = "Start date must be before end date";
    } else if (
      field === "end" &&
      value &&
      config.dateRange.start &&
      new Date(value) < new Date(config.dateRange.start)
    ) {
      newErrors.dateRange = "End date must be after start date";
    } else {
      delete newErrors.dateRange;
    }
    setErrors(newErrors);
  };

  const handleDeliveryChange = (
    field: keyof ExportConfig["delivery"],
    value: string
  ) => {
    const newDelivery = { ...config.delivery, [field]: value };
    onConfigChange({ delivery: newDelivery });

    // Validate delivery fields
    const newErrors = { ...errors };
    if (field === "emailAddress") {
      const error = validateEmail(value);
      if (error) {
        newErrors.emailAddress = error;
      } else {
        delete newErrors.emailAddress;
      }
    } else if (field === "filenamePrefix") {
      const error = validateRequired(value);
      if (error) {
        newErrors.filenamePrefix = error;
      } else {
        delete newErrors.filenamePrefix;
      }
    }
    setErrors(newErrors);
  };

  const compressionOptions = [
    { value: "none", label: "NONE" },
    { value: "zip", label: "ZIP" },
    { value: "gzip", label: "GZIP" },
  ];

  const formatOptions = config.type ? getFormatOptions(config.type) : [];

  return (
    <div className={className}>
      <ConfigGrid>
        <ConfigSection title="DATE_RANGE_FILTER">
          <FormField error={errors.dateRange} label="START_DATE">
            <ConfigInput
              error={!!errors.dateRange}
              onChange={(e) => handleDateRangeChange("start", e.target.value)}
              type="date"
              value={config.dateRange.start}
            />
          </FormField>

          <FormField error={errors.dateRange} label="END_DATE">
            <ConfigInput
              error={!!errors.dateRange}
              onChange={(e) => handleDateRangeChange("end", e.target.value)}
              type="date"
              value={config.dateRange.end}
            />
          </FormField>
        </ConfigSection>

        <ConfigSection title="OUTPUT_SETTINGS">
          <FormField label="OUTPUT_FORMAT">
            <ConfigSelect
              disabled={!config.type}
              onChange={(e) =>
                onConfigChange({ format: e.target.value as ExportFormat })
              }
              options={formatOptions}
              value={config.format}
            />
          </FormField>

          <FormField label="COMPRESSION">
            <ConfigSelect
              onChange={(e) =>
                onConfigChange({
                  compression: e.target.value as CompressionType,
                })
              }
              options={compressionOptions}
              value={config.compression}
            />
          </FormField>
        </ConfigSection>
      </ConfigGrid>

      <ConfigSection className="mt-5" title="DELIVERY_OPTIONS">
        <ConfigGrid>
          <FormField error={errors.emailAddress} label="EMAIL_ADDRESS">
            <ConfigInput
              error={!!errors.emailAddress}
              onChange={(e) =>
                handleDeliveryChange("emailAddress", e.target.value)
              }
              placeholder="recipient@example.com"
              type="email"
              value={config.delivery.emailAddress}
            />
          </FormField>

          <FormField error={errors.filenamePrefix} label="FILENAME_PREFIX">
            <ConfigInput
              error={!!errors.filenamePrefix}
              onChange={(e) =>
                handleDeliveryChange("filenamePrefix", e.target.value)
              }
              placeholder="export_filename"
              type="text"
              value={config.delivery.filenamePrefix}
            />
          </FormField>
        </ConfigGrid>
      </ConfigSection>
    </div>
  );
}

// Date range presets
export const getDateRangePresets = () => {
  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  const currentYear = new Date(today.getFullYear(), 0, 1);
  const lastYear = new Date(today.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    thisMonth: {
      start: formatDate(currentMonth),
      end: formatDate(today),
    },
    lastMonth: {
      start: formatDate(lastMonth),
      end: formatDate(lastMonthEnd),
    },
    thisYear: {
      start: formatDate(currentYear),
      end: formatDate(today),
    },
    lastYear: {
      start: formatDate(lastYear),
      end: formatDate(lastYearEnd),
    },
    last30Days: {
      start: formatDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)),
      end: formatDate(today),
    },
    last90Days: {
      start: formatDate(new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)),
      end: formatDate(today),
    },
  };
};

// Validation function for export configuration
export const validateExportConfig = (
  config: ExportConfig
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.type) {
    errors.push("Export type is required");
  }

  if (!config.format) {
    errors.push("Output format is required");
  }

  if (!config.dateRange.start) {
    errors.push("Start date is required");
  }

  if (!config.dateRange.end) {
    errors.push("End date is required");
  }

  if (
    config.dateRange.start &&
    config.dateRange.end &&
    new Date(config.dateRange.start) > new Date(config.dateRange.end)
  ) {
    errors.push("Start date must be before end date");
  }

  if (config.delivery.emailAddress) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(config.delivery.emailAddress)) {
      errors.push("Invalid email address format");
    }
  } else {
    errors.push("Email address is required");
  }

  if (!config.delivery.filenamePrefix) {
    errors.push("Filename prefix is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
