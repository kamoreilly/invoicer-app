import type * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ExportProgress {
  isExporting: boolean;
  progress: number;
  status: string;
  downloadUrl?: string;
  error?: string;
  estimatedTimeRemaining?: number;
  recordsProcessed?: number;
  totalRecords?: number;
}

interface ExportProgressProps {
  progress: ExportProgress;
  className?: string;
}

export function ExportProgressComponent({
  progress,
  className,
}: ExportProgressProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (progress.isExporting) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [progress.isExporting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressColor = () => {
    if (progress.error) return "bg-landing-error";
    if (progress.progress === 100) return "bg-landing-success";
    return "bg-landing-accent";
  };

  const getStatusIcon = () => {
    if (progress.error) return "✗";
    if (progress.progress === 100) return "✓";
    if (progress.isExporting) return "⚡";
    return "●";
  };

  return (
    <div
      className={cn(
        "export-progress rounded-sm border border-landing-border bg-landing-bg p-5",
        className
      )}
    >
      {/* Progress Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="font-semibold text-landing-accent text-sm uppercase tracking-wider">
          EXPORT_PROGRESS.LOG
        </div>
        <div className="text-landing-text-muted text-xs">
          {formatTime(timeElapsed)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-landing-text text-xs">PROGRESS</span>
          <span className="font-medium text-landing-accent text-xs">
            {progress.progress}%
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-sm border border-landing-border bg-landing-surface">
          <div
            className={cn(
              "h-full rounded-sm transition-all duration-300",
              getProgressColor()
            )}
            style={{ width: `${progress.progress}%` }}
          />
        </div>
      </div>

      {/* Status Information */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm",
              progress.error
                ? "text-landing-error"
                : progress.progress === 100
                  ? "text-landing-success"
                  : "text-landing-warning"
            )}
          >
            {getStatusIcon()}
          </span>
          <span className="text-landing-text text-xs">
            STATUS: {progress.status}
          </span>
        </div>

        {progress.recordsProcessed !== undefined &&
          progress.totalRecords !== undefined && (
            <div className="text-landing-text-muted text-xs">
              RECORDS: {progress.recordsProcessed.toLocaleString()} /{" "}
              {progress.totalRecords.toLocaleString()}
            </div>
          )}

        {progress.estimatedTimeRemaining !== undefined &&
          progress.isExporting && (
            <div className="text-landing-text-muted text-xs">
              ETA: {formatTime(progress.estimatedTimeRemaining)}
            </div>
          )}

        {progress.error && (
          <div className="mt-2 rounded-sm border border-landing-error/20 bg-landing-error/10 p-2 text-landing-error text-xs">
            ERROR: {progress.error}
          </div>
        )}

        {progress.downloadUrl && !progress.isExporting && !progress.error && (
          <div className="mt-4 rounded-sm border border-landing-success/20 bg-landing-success/10 p-3">
            <div className="mb-2 text-landing-success text-xs">
              ✓ Export completed successfully!
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-sm bg-landing-success px-3 py-1 font-medium text-white text-xs transition-colors hover:bg-landing-success-dark"
              onClick={() => window.open(progress.downloadUrl, "_blank")}
            >
              DOWNLOAD_FILE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Export processing hook
export function useExportProcessor() {
  const [progress, setProgress] = useState<ExportProgress>({
    isExporting: false,
    progress: 0,
    status: "Ready",
  });

  const startExport = async (exportType: string, estimatedRecords = 1000) => {
    setProgress({
      isExporting: true,
      progress: 0,
      status: "Initializing export...",
      totalRecords: estimatedRecords,
      recordsProcessed: 0,
    });

    const steps = [
      { progress: 5, status: "Validating configuration...", delay: 500 },
      { progress: 15, status: "Connecting to database...", delay: 800 },
      { progress: 25, status: "Querying data...", delay: 1200 },
      { progress: 40, status: "Processing records...", delay: 2000 },
      { progress: 60, status: "Formatting data...", delay: 1500 },
      { progress: 80, status: "Generating export file...", delay: 1000 },
      { progress: 95, status: "Compressing data...", delay: 800 },
      { progress: 100, status: "Export completed successfully!", delay: 500 },
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        await new Promise((resolve) => setTimeout(resolve, step.delay));

        const recordsProcessed = Math.floor(
          (step.progress / 100) * estimatedRecords
        );
        const remainingSteps = steps.length - i - 1;
        const avgStepTime = 1000; // Average time per step in ms
        const estimatedTimeRemaining = Math.floor(
          (remainingSteps * avgStepTime) / 1000
        );

        setProgress((prev) => ({
          ...prev,
          progress: step.progress,
          status: step.status,
          recordsProcessed,
          estimatedTimeRemaining:
            step.progress < 100 ? estimatedTimeRemaining : undefined,
        }));
      }

      // Complete export
      setTimeout(() => {
        setProgress((prev) => ({
          ...prev,
          isExporting: false,
          downloadUrl: `/downloads/export_${Date.now()}.zip`,
        }));
      }, 500);
    } catch (error) {
      setProgress((prev) => ({
        ...prev,
        isExporting: false,
        error: "Export failed: " + (error as Error).message,
      }));
    }
  };

  const resetProgress = () => {
    setProgress({
      isExporting: false,
      progress: 0,
      status: "Ready",
    });
  };

  return {
    progress,
    startExport,
    resetProgress,
  };
}

// Export preview component
interface ExportPreviewProps {
  exportType: string;
  sampleData: any[];
  className?: string;
}

export function ExportPreview({
  exportType,
  sampleData,
  className,
}: ExportPreviewProps) {
  return (
    <div
      className={cn(
        "export-preview rounded-sm border border-landing-border bg-landing-bg",
        className
      )}
    >
      <div className="border-landing-border border-b p-3">
        <div className="font-semibold text-landing-accent text-xs uppercase tracking-wider">
          EXPORT_PREVIEW - {exportType.toUpperCase()}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 text-landing-text-muted text-xs">
          Showing first {Math.min(sampleData.length, 5)} records of{" "}
          {sampleData.length} total
        </div>

        <div className="overflow-x-auto rounded-sm border border-landing-border bg-landing-surface p-3 font-mono text-xs">
          <pre className="whitespace-pre-wrap text-landing-text">
            {JSON.stringify(sampleData.slice(0, 5), null, 2)}
          </pre>
        </div>

        {sampleData.length > 5 && (
          <div className="mt-2 text-landing-text-muted text-xs">
            ... and {sampleData.length - 5} more records
          </div>
        )}
      </div>
    </div>
  );
}

export type { ExportProgress };
