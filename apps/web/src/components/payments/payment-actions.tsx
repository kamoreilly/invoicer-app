import type * as React from "react";
import { cn } from "@/lib/utils";

interface PaymentActionsProps {
  onRecordPayment: () => void;
  onReconcile: () => void;
  onExportReport: () => void;
  onSendReminders: () => void;
  className?: string;
}

export function PaymentActions({
  onRecordPayment,
  onReconcile,
  onExportReport,
  onSendReminders,
  className,
}: PaymentActionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-accent bg-landing-accent px-4 py-2 font-medium font-mono text-landing-bg text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-accent-dark focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onRecordPayment}
      >
        + RECORD_PAYMENT
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-border bg-landing-surface-alt px-4 py-2 font-medium font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onReconcile}
      >
        RECONCILE
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-border bg-landing-surface-alt px-4 py-2 font-medium font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onExportReport}
      >
        EXPORT_REPORT
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-border bg-landing-surface-alt px-4 py-2 font-medium font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onSendReminders}
      >
        SEND_REMINDERS
      </button>
    </div>
  );
}
