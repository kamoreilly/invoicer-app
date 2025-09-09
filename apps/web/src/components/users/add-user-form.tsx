import type * as React from "react";
import { useState } from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { cn } from "@/lib/utils";

interface AddUserFormProps {
  onSave: (userData: UserFormData) => void;
  onCancel: () => void;
  isProcessing?: boolean;
  className?: string;
}

interface UserFormData {
  fullName: string;
  email: string;
  role: "USER" | "MANAGER" | "ADMIN";
  department: "ACCOUNTING" | "SALES" | "MANAGEMENT" | "IT";
}

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function FormField({ label, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

export function AddUserForm({
  onSave,
  onCancel,
  isProcessing,
  className,
}: AddUserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    email: "",
    role: "USER",
    department: "ACCOUNTING",
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      role: "USER",
      department: "ACCOUNTING",
    });
    setErrors({});
    onCancel();
  };

  return (
    <TerminalWindow className={className} title="ADD_USER.FORM">
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="FULL_NAME">
              <input
                className={cn(
                  "border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent",
                  errors.fullName && "border-landing-error"
                )}
                disabled={isProcessing}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter full name"
                type="text"
                value={formData.fullName}
              />
              {errors.fullName && (
                <span className="text-landing-error text-xs">
                  {errors.fullName}
                </span>
              )}
            </FormField>

            <FormField label="EMAIL_ADDRESS">
              <input
                className={cn(
                  "border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent",
                  errors.email && "border-landing-error"
                )}
                disabled={isProcessing}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="user@example.com"
                type="email"
                value={formData.email}
              />
              {errors.email && (
                <span className="text-landing-error text-xs">
                  {errors.email}
                </span>
              )}
            </FormField>

            <FormField label="USER_ROLE">
              <select
                className="border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent"
                disabled={isProcessing}
                onChange={(e) => handleInputChange("role", e.target.value)}
                value={formData.role}
              >
                <option value="USER">USER - Standard Access</option>
                <option value="MANAGER">MANAGER - Extended Access</option>
                <option value="ADMIN">ADMIN - Full Access</option>
              </select>
            </FormField>

            <FormField label="DEPARTMENT">
              <select
                className="border border-landing-border bg-landing-surface px-3 py-2 font-mono text-landing-text text-xs transition-all duration-200 focus:border-landing-accent focus:outline-none focus:ring-1 focus:ring-landing-accent"
                disabled={isProcessing}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
                value={formData.department}
              >
                <option value="ACCOUNTING">ACCOUNTING</option>
                <option value="SALES">SALES</option>
                <option value="MANAGEMENT">MANAGEMENT</option>
                <option value="IT">IT_SUPPORT</option>
              </select>
            </FormField>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="border border-landing-border bg-landing-surface-alt px-4 py-2 font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-border disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isProcessing}
              onClick={handleCancel}
              type="button"
            >
              CANCEL
            </button>
            <button
              className="border border-landing-accent bg-landing-accent px-4 py-2 font-mono text-landing-bg text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isProcessing}
              type="submit"
            >
              {isProcessing ? "CREATING..." : "CREATE_USER"}
            </button>
          </div>
        </form>
      </div>
    </TerminalWindow>
  );
}
