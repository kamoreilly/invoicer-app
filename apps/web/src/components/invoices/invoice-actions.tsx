import type * as React from "react";
import { cn } from "@/lib/utils";

interface InvoiceActionsProps {
  onCreateInvoice: () => void;
  onBulkSend: () => void;
  onExportList: () => void;
  onPaymentReminder: () => void;
  selectedCount?: number;
  className?: string;
}

export function InvoiceActions({
  onCreateInvoice,
  onBulkSend,
  onExportList,
  onPaymentReminder,
  selectedCount = 0,
  className,
}: InvoiceActionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-accent bg-landing-accent px-4 py-2 font-medium font-mono text-landing-bg text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-accent-dark focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onCreateInvoice}
      >
        + NEW_INVOICE
      </button>

      <button
        className={cn(
          "inline-flex items-center gap-2 rounded-sm border border-landing-border px-4 py-2 font-medium font-mono text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20",
          selectedCount > 0
            ? "bg-landing-surface-alt text-landing-text hover:border-landing-accent hover:bg-landing-border"
            : "cursor-not-allowed bg-landing-surface text-landing-text-muted"
        )}
        disabled={selectedCount === 0}
        onClick={onBulkSend}
      >
        BULK_SEND {selectedCount > 0 && `(${selectedCount})`}
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-border bg-landing-surface-alt px-4 py-2 font-medium font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onExportList}
      >
        EXPORT_LIST
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-sm border border-landing-border bg-landing-surface-alt px-4 py-2 font-medium font-mono text-landing-text text-xs uppercase tracking-wider transition-all duration-200 hover:border-landing-accent hover:bg-landing-border focus:outline-none focus:ring-2 focus:ring-landing-accent focus:ring-opacity-20"
        onClick={onPaymentReminder}
      >
        PAYMENT_REMINDER
      </button>
    </div>
  );
}
