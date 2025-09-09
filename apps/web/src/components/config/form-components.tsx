import type * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("form-group mb-4", className)}>
      <label className="mb-2 block font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
        {label}
        {required && <span className="ml-1 text-landing-error">*</span>}
      </label>
      {children}
      {error && <div className="mt-1 text-landing-error text-xs">{error}</div>}
    </div>
  );
}

interface ConfigInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function ConfigInput({ className, error, ...props }: ConfigInputProps) {
  return (
    <input
      className={cn(
        "config-input w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200",
        "focus:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "field-invalid border-landing-error focus:border-landing-error focus:ring-landing-error",
        !error && "field-valid",
        className
      )}
      {...props}
    />
  );
}

interface ConfigSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  error?: boolean;
}

export function ConfigSelect({
  className,
  error,
  options,
  ...props
}: ConfigSelectProps) {
  return (
    <select
      className={cn(
        "config-select w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200",
        "focus:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "field-invalid border-landing-error focus:border-landing-error focus:ring-landing-error",
        !error && "field-valid",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface ConfigTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function ConfigTextarea({
  className,
  error,
  ...props
}: ConfigTextareaProps) {
  return (
    <textarea
      className={cn(
        "resize-vertical min-h-[80px] w-full rounded-sm border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200",
        "focus:border-landing-accent focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "border-landing-error focus:border-landing-error focus:ring-landing-error",
        className
      )}
      {...props}
    />
  );
}

interface ConfigCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: boolean;
}

export function ConfigCheckbox({
  className,
  error,
  label,
  id,
  ...props
}: ConfigCheckboxProps) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <input
        className={cn(
          "h-4 w-4 cursor-pointer rounded-sm border border-landing-border bg-landing-surface transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
          "checked:border-landing-accent checked:bg-landing-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-landing-error",
          className
        )}
        id={id}
        type="checkbox"
        {...props}
      />
      <label
        className="cursor-pointer select-none text-landing-text text-xs"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

interface ConfigSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function ConfigSection({
  title,
  className,
  children,
}: ConfigSectionProps) {
  return (
    <div
      className={cn(
        "config-section rounded-sm border border-landing-border bg-landing-bg p-4",
        className
      )}
    >
      <div className="mb-4 font-semibold text-landing-accent text-xs uppercase tracking-wider">
        {title}
      </div>
      {children}
    </div>
  );
}

interface ConfigGridProps {
  columns?: 1 | 2;
  className?: string;
  children: React.ReactNode;
}

export function ConfigGrid({
  columns = 2,
  className,
  children,
}: ConfigGridProps) {
  return (
    <div
      className={cn(
        "config-grid grid gap-5",
        columns === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}

// Predefined option sets for common configuration fields
export const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "JPY", label: "JPY - Japanese Yen" },
];

export const timezoneOptions = [
  { value: "UTC", label: "UTC - Coordinated Universal Time" },
  { value: "EST", label: "EST - Eastern Standard Time" },
  { value: "CST", label: "CST - Central Standard Time" },
  { value: "MST", label: "MST - Mountain Standard Time" },
  { value: "PST", label: "PST - Pacific Standard Time" },
  { value: "GMT", label: "GMT - Greenwich Mean Time" },
];

export const dateFormatOptions = [
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
];

export const paymentTermsOptions = [
  { value: "15", label: "NET 15 - 15 Days" },
  { value: "30", label: "NET 30 - 30 Days" },
  { value: "45", label: "NET 45 - 45 Days" },
  { value: "60", label: "NET 60 - 60 Days" },
  { value: "90", label: "NET 90 - 90 Days" },
];

export const reminderFrequencyOptions = [
  { value: "7", label: "WEEKLY" },
  { value: "14", label: "BI_WEEKLY" },
  { value: "30", label: "MONTHLY" },
];

// Validation helpers
export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return;
};

export const validateRequired = (
  value: string | number
): string | undefined => {
  if (!value && value !== 0) return "This field is required";
  return;
};

export const validateNumber = (
  value: string,
  min?: number,
  max?: number
): string | undefined => {
  const num = Number.parseFloat(value);
  if (isNaN(num)) return "Must be a valid number";
  if (min !== undefined && num < min) return `Must be at least ${min}`;
  if (max !== undefined && num > max) return `Must be at most ${max}`;
  return;
};

export const validatePort = (port: string): string | undefined => {
  const portNum = Number.parseInt(port);
  if (isNaN(portNum)) return "Must be a valid port number";
  if (portNum < 1 || portNum > 65_535)
    return "Port must be between 1 and 65535";
  return;
};
