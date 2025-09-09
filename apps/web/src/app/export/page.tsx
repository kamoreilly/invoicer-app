"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  AdvancedFilters,
  CompressionType,
  ExportFormat,
  ExportOptions,
  ExportType,
} from "@/components/export";
import {
  AdvancedFiltersComponent,
  createExportActions,
  ExportActions,
  ExportCommandLine,
  ExportConfigForm,
  ExportOptionsComponent,
  ExportPreview,
  ExportProgressComponent,
  ExportTypeSelector,
  generateExportCommand,
  generateExportOutput,
  getDateRangePresets,
  useExportProcessor,
  validateExportRequest,
} from "@/components/export";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import "@/components/export/export.css";

interface ExportConfig {
  type: ExportType | null;
  format: ExportFormat;
  compression: CompressionType;
  dateRange: {
    start: string;
    end: string;
  };
  options: ExportOptions;
  delivery: {
    emailAddress: string;
    filenamePrefix: string;
  };
}

export default function ExportPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [lastCommand, setLastCommand] = useState<string>("");
  const [lastOutput, setLastOutput] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const privateData = useQuery(trpc.privateData.queryOptions());
  const { progress, startExport, resetProgress } = useExportProcessor();

  // Export configuration state
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    type: null,
    format: "csv",
    compression: "none",
    dateRange: getDateRangePresets().thisMonth,
    options: {
      includeDeleted: true,
      includeDrafts: true,
      includeAttachments: false,
      anonymizeData: false,
      emailExport: true,
    },
    delivery: {
      emailAddress: "admin@invoicerapp.com",
      filenamePrefix: "invoicer_export",
    },
  });

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    statusFilter: [],
    clientFilter: [],
    amountRange: { min: null, max: null },
    customFields: {},
  });

  // Authentication check
  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Initialize with help command
  useEffect(() => {
    setLastCommand("export --help");
    setLastOutput(
      "✓ Export module loaded. Select data type and configure options above."
    );
  }, []);

  const handleExportTypeSelect = (type: ExportType) => {
    setExportConfig((prev) => ({ ...prev, type }));
    setLastCommand(generateExportCommand("select-type", { type }));
    setLastOutput(
      generateExportOutput("select-type", true, type.toUpperCase())
    );
    setShowPreview(false);
    resetProgress();
  };

  const handleConfigChange = (updates: Partial<ExportConfig>) => {
    setExportConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleStartExport = async () => {
    // Validate configuration
    const validation = validateExportRequest(exportConfig);
    if (!validation.isValid) {
      setLastCommand(generateExportCommand("start"));
      setLastOutput(
        generateExportOutput("start", false, validation.errors.join(", "))
      );
      return;
    }

    setLastCommand(
      generateExportCommand("start", {
        type: exportConfig.type!,
        format: exportConfig.format,
      })
    );
    setLastOutput(generateExportOutput("start", true));

    // Start export process
    const estimatedRecords = getEstimatedRecords(exportConfig.type!);
    await startExport(exportConfig.type!, estimatedRecords);

    setLastOutput(
      generateExportOutput("start", true, "Export completed successfully")
    );
  };

  const handlePreviewData = () => {
    if (!exportConfig.type) {
      setLastCommand(generateExportCommand("preview"));
      setLastOutput(
        generateExportOutput(
          "preview",
          false,
          "Please select an export type first"
        )
      );
      return;
    }

    setLastCommand(
      generateExportCommand("preview", { type: exportConfig.type })
    );
    setLastOutput(
      generateExportOutput(
        "preview",
        true,
        `${exportConfig.type.toUpperCase()} data (showing first 100 records)`
      )
    );

    // Generate mock preview data
    const mockData = generateMockData(exportConfig.type);
    setPreviewData(mockData);
    setShowPreview(true);
  };

  const handleSaveTemplate = () => {
    setLastCommand(generateExportCommand("save-template"));
    setLastOutput(generateExportOutput("save-template", true));
  };

  const handleLoadTemplate = () => {
    setLastCommand(generateExportCommand("load-template"));
    setLastOutput(generateExportOutput("load-template", true));
  };

  const exportActions = createExportActions(
    {
      onStartExport: handleStartExport,
      onPreviewData: handlePreviewData,
      onSaveTemplate: handleSaveTemplate,
      onLoadTemplate: handleLoadTemplate,
    },
    {
      isExporting: progress.isExporting,
    }
  );

  // Helper functions
  const getEstimatedRecords = (type: ExportType): number => {
    const estimates = {
      invoices: 1250,
      clients: 340,
      payments: 890,
      reports: 45,
      tax: 120,
      complete: 2500,
    };
    return estimates[type] || 1000;
  };

  const generateMockData = (type: ExportType) => {
    const mockData = {
      invoices: [
        {
          id: "INV-001",
          client: "Acme Corp",
          amount: 1250.0,
          status: "paid",
          date: "2024-01-15",
        },
        {
          id: "INV-002",
          client: "Tech Solutions",
          amount: 890.5,
          status: "pending",
          date: "2024-01-18",
        },
        {
          id: "INV-003",
          client: "Design Studio",
          amount: 2100.0,
          status: "overdue",
          date: "2024-01-10",
        },
      ],
      clients: [
        {
          id: "CLI-001",
          name: "Acme Corp",
          email: "contact@acme.com",
          status: "active",
        },
        {
          id: "CLI-002",
          name: "Tech Solutions",
          email: "info@techsol.com",
          status: "active",
        },
        {
          id: "CLI-003",
          name: "Design Studio",
          email: "hello@design.com",
          status: "inactive",
        },
      ],
      payments: [
        {
          id: "PAY-001",
          invoice: "INV-001",
          amount: 1250.0,
          method: "credit_card",
          date: "2024-01-16",
        },
        {
          id: "PAY-002",
          invoice: "INV-003",
          amount: 500.0,
          method: "bank_transfer",
          date: "2024-01-12",
        },
      ],
      reports: [
        {
          id: "REP-001",
          name: "Monthly Revenue",
          type: "revenue",
          generated: "2024-01-31",
        },
        {
          id: "REP-002",
          name: "Client Analysis",
          type: "clients",
          generated: "2024-01-30",
        },
      ],
      tax: [
        {
          period: "2024-Q1",
          total_tax: 1250.5,
          status: "pending",
          due_date: "2024-04-15",
        },
      ],
      complete: [
        { table: "invoices", records: 1250 },
        { table: "clients", records: 340 },
        { table: "payments", records: 890 },
      ],
    };
    return mockData[type] || [];
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardPage
      actions={<ExportActions actions={exportActions} />}
      title="DATA_EXPORT.PY"
    >
      <div className="stagger-animation space-y-6">
        {/* Export Types */}
        <TerminalWindow className="terminal-window" title="EXPORT_MODULES.CFG">
          <div className="p-5">
            <ExportTypeSelector
              className="export-grid"
              onTypeSelect={handleExportTypeSelect}
              selectedType={exportConfig.type}
            />
          </div>
        </TerminalWindow>

        {/* Export Configuration */}
        <TerminalWindow className="terminal-window" title="EXPORT_CONFIG.JSON">
          <div className="p-5">
            <ExportConfigForm
              className="export-form"
              config={exportConfig}
              onConfigChange={handleConfigChange}
            />
          </div>
        </TerminalWindow>

        {/* Export Options */}
        <TerminalWindow className="terminal-window" title="EXPORT_OPTIONS.CFG">
          <div className="p-5">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ExportOptionsComponent
                className="export-options"
                exportType={exportConfig.type}
                onOptionsChange={(options) =>
                  handleConfigChange({
                    options: { ...exportConfig.options, ...options },
                  })
                }
                options={exportConfig.options}
              />
              <AdvancedFiltersComponent
                className="export-options"
                exportType={exportConfig.type}
                filters={advancedFilters}
                onFiltersChange={(filters) =>
                  setAdvancedFilters({ ...advancedFilters, ...filters })
                }
              />
            </div>
          </div>
        </TerminalWindow>

        {/* Progress indicator */}
        {progress.isExporting && (
          <TerminalWindow
            className="terminal-window"
            title="EXPORT_PROGRESS.LOG"
          >
            <div className="p-5">
              <ExportProgressComponent
                className="export-progress"
                progress={progress}
              />
            </div>
          </TerminalWindow>
        )}

        {/* Preview */}
        {showPreview && previewData.length > 0 && (
          <TerminalWindow className="terminal-window" title="DATA_PREVIEW.JSON">
            <div className="p-5">
              <ExportPreview
                className="export-preview"
                exportType={exportConfig.type || "unknown"}
                sampleData={previewData}
              />
            </div>
          </TerminalWindow>
        )}

        {/* Command Line */}
        <ExportCommandLine
          className="export-command-line"
          isProcessing={progress.isExporting}
          lastCommand={lastCommand}
          lastOutput={lastOutput}
        />
      </div>
    </DashboardPage>
  );
}
