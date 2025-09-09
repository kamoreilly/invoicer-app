import type * as React from "react";
import { useState } from "react";
import {
  ConfigCheckbox,
  ConfigGrid,
  ConfigInput,
  ConfigSection,
  ConfigSelect,
  FormField,
  reminderFrequencyOptions,
  validateEmail,
  validatePort,
  validateRequired,
} from "./form-components";

interface EmailConfig {
  smtpServer: string;
  smtpPort: number;
  emailUsername: string;
  emailPassword: string;
}

interface NotificationConfig {
  autoSendInvoices: boolean;
  paymentReminders: boolean;
  overdueAlerts: boolean;
  paymentConfirmations: boolean;
  reminderFrequency: number;
}

interface EmailNotificationsProps {
  emailConfig: EmailConfig;
  notificationConfig: NotificationConfig;
  onEmailConfigChange: (config: EmailConfig) => void;
  onNotificationConfigChange: (config: NotificationConfig) => void;
  className?: string;
}

export function EmailNotifications({
  emailConfig,
  notificationConfig,
  onEmailConfigChange,
  onNotificationConfigChange,
  className,
}: EmailNotificationsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (
    field: keyof EmailConfig,
    value: string | number
  ) => {
    const newConfig = { ...emailConfig, [field]: value };
    onEmailConfigChange(newConfig);

    // Validate field
    const newErrors = { ...errors };
    if (field === "smtpServer") {
      const error = validateRequired(value as string);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    } else if (field === "smtpPort") {
      const error = validatePort(value.toString());
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    } else if (field === "emailUsername") {
      const error = validateEmail(value as string);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    } else if (field === "emailPassword") {
      const error = validateRequired(value as string);
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
    }
    setErrors(newErrors);
  };

  const handleNotificationChange = (
    field: keyof NotificationConfig,
    value: boolean | number
  ) => {
    const newConfig = { ...notificationConfig, [field]: value };
    onNotificationConfigChange(newConfig);
  };

  return (
    <div className={className}>
      <ConfigGrid>
        <ConfigSection title="SMTP_SETTINGS">
          <FormField error={errors.smtpServer} label="SMTP_SERVER" required>
            <ConfigInput
              error={!!errors.smtpServer}
              onChange={(e) => handleEmailChange("smtpServer", e.target.value)}
              placeholder="smtp.example.com"
              type="text"
              value={emailConfig.smtpServer}
            />
          </FormField>

          <FormField error={errors.smtpPort} label="SMTP_PORT">
            <ConfigInput
              error={!!errors.smtpPort}
              max="65535"
              min="1"
              onChange={(e) =>
                handleEmailChange(
                  "smtpPort",
                  Number.parseInt(e.target.value) || 0
                )
              }
              placeholder="587"
              type="number"
              value={emailConfig.smtpPort}
            />
          </FormField>

          <FormField
            error={errors.emailUsername}
            label="EMAIL_USERNAME"
            required
          >
            <ConfigInput
              error={!!errors.emailUsername}
              onChange={(e) =>
                handleEmailChange("emailUsername", e.target.value)
              }
              placeholder="email@example.com"
              type="email"
              value={emailConfig.emailUsername}
            />
          </FormField>

          <FormField
            error={errors.emailPassword}
            label="EMAIL_PASSWORD"
            required
          >
            <div className="relative">
              <ConfigInput
                error={!!errors.emailPassword}
                onChange={(e) =>
                  handleEmailChange("emailPassword", e.target.value)
                }
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={emailConfig.emailPassword}
              />
              <button
                className="-translate-y-1/2 absolute top-1/2 right-2 transform text-landing-text-muted text-xs hover:text-landing-text"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </FormField>
        </ConfigSection>

        <ConfigSection title="NOTIFICATION_SETTINGS">
          <ConfigCheckbox
            checked={notificationConfig.autoSendInvoices}
            id="auto-send-invoices"
            label="AUTO_SEND_INVOICES"
            onChange={(e) =>
              handleNotificationChange("autoSendInvoices", e.target.checked)
            }
          />

          <ConfigCheckbox
            checked={notificationConfig.paymentReminders}
            id="payment-reminders"
            label="PAYMENT_REMINDERS"
            onChange={(e) =>
              handleNotificationChange("paymentReminders", e.target.checked)
            }
          />

          <ConfigCheckbox
            checked={notificationConfig.overdueAlerts}
            id="overdue-alerts"
            label="OVERDUE_ALERTS"
            onChange={(e) =>
              handleNotificationChange("overdueAlerts", e.target.checked)
            }
          />

          <ConfigCheckbox
            checked={notificationConfig.paymentConfirmations}
            id="payment-confirmations"
            label="PAYMENT_CONFIRMATIONS"
            onChange={(e) =>
              handleNotificationChange("paymentConfirmations", e.target.checked)
            }
          />

          <FormField label="REMINDER_FREQUENCY">
            <ConfigSelect
              onChange={(e) =>
                handleNotificationChange(
                  "reminderFrequency",
                  Number.parseInt(e.target.value)
                )
              }
              options={reminderFrequencyOptions}
              value={notificationConfig.reminderFrequency.toString()}
            />
          </FormField>
        </ConfigSection>
      </ConfigGrid>
    </div>
  );
}

export type { EmailConfig, NotificationConfig };
