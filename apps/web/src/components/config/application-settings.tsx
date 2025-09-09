import type * as React from "react";
import { useState } from "react";
import {
  ConfigGrid,
  ConfigInput,
  ConfigSection,
  ConfigSelect,
  currencyOptions,
  dateFormatOptions,
  FormField,
  paymentTermsOptions,
  timezoneOptions,
  validateNumber,
  validateRequired,
} from "./form-components";

interface GeneralConfig {
  companyName: string;
  defaultCurrency: string;
  timezone: string;
  dateFormat: string;
}

interface InvoiceConfig {
  invoicePrefix: string;
  nextInvoiceNumber: number;
  defaultPaymentTerms: number;
  defaultTaxRate: number;
}

interface ApplicationSettingsProps {
  generalConfig: GeneralConfig;
  invoiceConfig: InvoiceConfig;
  onGeneralConfigChange: (config: GeneralConfig) => void;
  onInvoiceConfigChange: (config: InvoiceConfig) => void;
  className?: string;
}

export function ApplicationSettings({
  generalConfig,
  invoiceConfig,
  onGeneralConfigChange,
  onInvoiceConfigChange,
  className,
}: ApplicationSettingsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleGeneralChange = (field: keyof GeneralConfig, value: string) => {
    const newConfig = { ...generalConfig, [field]: value };
    onGeneralConfigChange(newConfig);

    // Validate field
    const newErrors = { ...errors };
    if (field === "companyName") {
      const error = validateRequired(value);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    }
    setErrors(newErrors);
  };

  const handleInvoiceChange = (
    field: keyof InvoiceConfig,
    value: string | number
  ) => {
    const newConfig = { ...invoiceConfig, [field]: value };
    onInvoiceConfigChange(newConfig);

    // Validate field
    const newErrors = { ...errors };
    if (field === "invoicePrefix") {
      const error = validateRequired(value as string);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    } else if (field === "nextInvoiceNumber") {
      const error = validateNumber(value.toString(), 1);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    } else if (field === "defaultTaxRate") {
      const error = validateNumber(value.toString(), 0, 100);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    }
    setErrors(newErrors);
  };

  return (
    <div className={className}>
      <ConfigGrid>
        <ConfigSection title="GENERAL_CONFIG">
          <FormField error={errors.companyName} label="COMPANY_NAME" required>
            <ConfigInput
              error={!!errors.companyName}
              onChange={(e) =>
                handleGeneralChange("companyName", e.target.value)
              }
              placeholder="Enter company name"
              type="text"
              value={generalConfig.companyName}
            />
          </FormField>

          <FormField label="DEFAULT_CURRENCY">
            <ConfigSelect
              onChange={(e) =>
                handleGeneralChange("defaultCurrency", e.target.value)
              }
              options={currencyOptions}
              value={generalConfig.defaultCurrency}
            />
          </FormField>

          <FormField label="TIMEZONE">
            <ConfigSelect
              onChange={(e) => handleGeneralChange("timezone", e.target.value)}
              options={timezoneOptions}
              value={generalConfig.timezone}
            />
          </FormField>

          <FormField label="DATE_FORMAT">
            <ConfigSelect
              onChange={(e) =>
                handleGeneralChange("dateFormat", e.target.value)
              }
              options={dateFormatOptions}
              value={generalConfig.dateFormat}
            />
          </FormField>
        </ConfigSection>

        <ConfigSection title="INVOICE_DEFAULTS">
          <FormField
            error={errors.invoicePrefix}
            label="INVOICE_PREFIX"
            required
          >
            <ConfigInput
              error={!!errors.invoicePrefix}
              onChange={(e) =>
                handleInvoiceChange("invoicePrefix", e.target.value)
              }
              placeholder="INV-"
              type="text"
              value={invoiceConfig.invoicePrefix}
            />
          </FormField>

          <FormField
            error={errors.nextInvoiceNumber}
            label="NEXT_INVOICE_NUMBER"
          >
            <ConfigInput
              error={!!errors.nextInvoiceNumber}
              min="1"
              onChange={(e) =>
                handleInvoiceChange(
                  "nextInvoiceNumber",
                  Number.parseInt(e.target.value) || 0
                )
              }
              placeholder="1000"
              type="number"
              value={invoiceConfig.nextInvoiceNumber}
            />
          </FormField>

          <FormField label="DEFAULT_PAYMENT_TERMS">
            <ConfigSelect
              onChange={(e) =>
                handleInvoiceChange(
                  "defaultPaymentTerms",
                  Number.parseInt(e.target.value)
                )
              }
              options={paymentTermsOptions}
              value={invoiceConfig.defaultPaymentTerms.toString()}
            />
          </FormField>

          <FormField error={errors.defaultTaxRate} label="DEFAULT_TAX_RATE (%)">
            <ConfigInput
              error={!!errors.defaultTaxRate}
              max="100"
              min="0"
              onChange={(e) =>
                handleInvoiceChange(
                  "defaultTaxRate",
                  Number.parseFloat(e.target.value) || 0
                )
              }
              placeholder="8.5"
              step="0.1"
              type="number"
              value={invoiceConfig.defaultTaxRate}
            />
          </FormField>
        </ConfigSection>
      </ConfigGrid>
    </div>
  );
}

export type { GeneralConfig, InvoiceConfig };
