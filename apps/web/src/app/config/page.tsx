"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  EmailConfig,
  GeneralConfig,
  InvoiceConfig,
  NotificationConfig,
  SystemInfo,
  SystemStatusType,
} from "@/components/config";
import {
  ApplicationSettings,
  ConfigActions,
  ConfigCommandLine,
  createConfigActions,
  EmailNotifications,
  generateConfigCommand,
  generateConfigOutput,
  SystemStatus,
  useSystemInfo,
  validateConfiguration,
} from "@/components/config";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import "@/components/config/config.css";

interface ConfigData {
  general: GeneralConfig;
  invoice: InvoiceConfig;
  email: EmailConfig;
  notifications: NotificationConfig;
}

export default function ConfigPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>("");
  const [lastOutput, setLastOutput] = useState<string>("");

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock configuration data - replace with actual tRPC queries later
  const [config, setConfig] = useState<ConfigData>({
    general: {
      companyName: "Invoicer App Solutions",
      defaultCurrency: "USD",
      timezone: "UTC",
      dateFormat: "YYYY-MM-DD",
    },
    invoice: {
      invoicePrefix: "INV-",
      nextInvoiceNumber: 1000,
      defaultPaymentTerms: 30,
      defaultTaxRate: 8.5,
    },
    email: {
      smtpServer: "smtp.gmail.com",
      smtpPort: 587,
      emailUsername: "noreply@invoicerapp.com",
      emailPassword: "••••••••••••",
    },
    notifications: {
      autoSendInvoices: true,
      paymentReminders: true,
      overdueAlerts: true,
      paymentConfirmations: false,
      reminderFrequency: 14,
    },
  });

  const [systemStatus] = useState<SystemStatusType>({
    database: "connected",
    email: "operational",
    backup: "running",
    paymentGateway: "maintenance",
  });

  const initialSystemInfo: SystemInfo = {
    version: "v2.1.4",
    lastBackup: "2024-01-18 14:30:00",
    uptime: "72h 14m 33s",
    diskUsage: "2.3GB / 50GB (4.6%)",
  };

  const systemInfo = useSystemInfo(initialSystemInfo);

  // Authentication check - temporarily disabled for testing
  // useEffect(() => {
  //   if (!(session || isPending)) {
  //     router.push("/login");
  //   }
  // }, [session, isPending, router]);

  const handleSaveConfig = async () => {
    // Validate configuration before saving
    const validation = validateConfiguration(config);
    if (!validation.isValid) {
      setLastCommand(generateConfigCommand("save", { file: "system.ini" }));
      setLastOutput(
        generateConfigOutput("save", false, validation.errors.join(", "))
      );
      return;
    }

    setIsSaving(true);
    setLastCommand(generateConfigCommand("save", { file: "system.ini" }));
    setLastOutput("");

    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setLastOutput(generateConfigOutput("save", true));
    }, 1500);
  };

  const handleLoadDefaults = () => {
    setIsLoading(true);
    setLastCommand(generateConfigCommand("load-defaults"));
    setLastOutput("");

    setTimeout(() => {
      setIsLoading(false);
      setLastOutput(generateConfigOutput("load-defaults", true));

      // Reset to default values
      setConfig({
        general: {
          companyName: "Invoicer App Solutions",
          defaultCurrency: "USD",
          timezone: "UTC",
          dateFormat: "YYYY-MM-DD",
        },
        invoice: {
          invoicePrefix: "INV-",
          nextInvoiceNumber: 1000,
          defaultPaymentTerms: 30,
          defaultTaxRate: 8.5,
        },
        email: {
          smtpServer: "smtp.gmail.com",
          smtpPort: 587,
          emailUsername: "noreply@invoicerapp.com",
          emailPassword: "••••••••••••",
        },
        notifications: {
          autoSendInvoices: true,
          paymentReminders: true,
          overdueAlerts: true,
          paymentConfirmations: false,
          reminderFrequency: 14,
        },
      });
    }, 1000);
  };

  const handleExportConfig = () => {
    setIsExporting(true);
    setLastCommand(generateConfigCommand("export", { format: "json" }));
    setLastOutput("");

    setTimeout(() => {
      setIsExporting(false);
      setLastOutput(generateConfigOutput("export", true, "config_backup.json"));
    }, 1000);
  };

  const handleImportConfig = () => {
    setIsImporting(true);
    setLastCommand(
      generateConfigCommand("import", { file: "config_backup.json" })
    );
    setLastOutput("");

    setTimeout(() => {
      setIsImporting(false);
      setLastOutput(generateConfigOutput("import", true));
    }, 1000);
  };

  const handleResetAll = () => {
    if (
      confirm(
        "Are you sure you want to reset all configuration? This action cannot be undone."
      )
    ) {
      setIsResetting(true);
      setLastCommand(generateConfigCommand("reset", { confirm: "true" }));
      setLastOutput("");

      setTimeout(() => {
        setIsResetting(false);
        setLastOutput(generateConfigOutput("reset", true));
        handleLoadDefaults();
      }, 1500);
    }
  };

  const configActions = createConfigActions(
    {
      onSave: handleSaveConfig,
      onLoadDefaults: handleLoadDefaults,
      onExport: handleExportConfig,
      onImport: handleImportConfig,
      onReset: handleResetAll,
    },
    {
      isSaving,
      isLoading,
      isExporting,
      isImporting,
      isResetting,
    }
  );

  // Temporarily disable auth checks for testing
  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return null;
  // }

  return (
    <DashboardPage
      actions={<ConfigActions actions={configActions} />}
      title="SYSTEM_CONFIG.INI"
    >
      <div className="stagger-animation space-y-6">
        {/* Application Settings */}
        <TerminalWindow
          className="terminal-window"
          title="APPLICATION_SETTINGS.CFG"
        >
          <div className="p-5">
            <ApplicationSettings
              generalConfig={config.general}
              invoiceConfig={config.invoice}
              onGeneralConfigChange={(general) =>
                setConfig({ ...config, general })
              }
              onInvoiceConfigChange={(invoice) =>
                setConfig({ ...config, invoice })
              }
            />
          </div>
        </TerminalWindow>

        {/* Email & Notifications */}
        <TerminalWindow
          className="terminal-window"
          title="EMAIL_NOTIFICATIONS.CFG"
        >
          <div className="p-5">
            <EmailNotifications
              emailConfig={config.email}
              notificationConfig={config.notifications}
              onEmailConfigChange={(email) => setConfig({ ...config, email })}
              onNotificationConfigChange={(notifications) =>
                setConfig({ ...config, notifications })
              }
            />
          </div>
        </TerminalWindow>

        {/* System Status */}
        <TerminalWindow className="terminal-window" title="SYSTEM_STATUS.LOG">
          <div className="p-5">
            <SystemStatus systemInfo={systemInfo} systemStatus={systemStatus} />
          </div>
        </TerminalWindow>

        {/* Command Line */}
        <ConfigCommandLine
          className="command-line"
          isProcessing={
            isSaving || isLoading || isExporting || isImporting || isResetting
          }
          lastCommand={lastCommand}
          lastOutput={lastOutput}
        />
      </div>
    </DashboardPage>
  );
}
