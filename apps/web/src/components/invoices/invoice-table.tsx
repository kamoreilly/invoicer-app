import type * as React from "react";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "PARTIAL";
  createdAt: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  selectedInvoices: string[];
  onSelectionChange: (selected: string[]) => void;
  className?: string;
}

export function InvoiceTable({
  invoices,
  selectedInvoices,
  onSelectionChange,
  className,
}: InvoiceTableProps) {
  const handleRowClick = (invoiceId: string) => {
    const isSelected = selectedInvoices.includes(invoiceId);
    if (isSelected) {
      onSelectionChange(selectedInvoices.filter((id) => id !== invoiceId));
    } else {
      onSelectionChange([...selectedInvoices, invoiceId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === invoices.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(invoices.map((invoice) => invoice.id));
    }
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    const baseClasses =
      "px-2 py-1 rounded-sm font-semibold text-xs uppercase tracking-wider";

    switch (status) {
      case "DRAFT":
        return `${baseClasses} bg-landing-text-muted text-landing-bg`;
      case "SENT":
        return `${baseClasses} bg-blue-600 text-white`;
      case "PAID":
        return `${baseClasses} bg-landing-success text-landing-bg`;
      case "OVERDUE":
        return `${baseClasses} bg-landing-error text-white`;
      case "PARTIAL":
        return `${baseClasses} bg-landing-warning text-landing-bg`;
      default:
        return `${baseClasses} bg-landing-text-muted text-landing-bg`;
    }
  };

  const getActionButtons = (invoice: Invoice) => {
    const baseButtonClasses =
      "px-2 py-1 border border-landing-border bg-landing-surface-alt text-landing-text font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-border hover:border-landing-accent";

    switch (invoice.status) {
      case "DRAFT":
        return [
          <button className={baseButtonClasses} key="edit">
            EDIT
          </button>,
          <button className={baseButtonClasses} key="send">
            SEND
          </button>,
          <button className={baseButtonClasses} key="delete">
            DELETE
          </button>,
        ];
      case "SENT":
        return [
          <button className={baseButtonClasses} key="view">
            VIEW
          </button>,
          <button className={baseButtonClasses} key="edit">
            EDIT
          </button>,
          <button className={baseButtonClasses} key="remind">
            REMIND
          </button>,
        ];
      case "PAID":
        return [
          <button className={baseButtonClasses} key="view">
            VIEW
          </button>,
          <button className={baseButtonClasses} key="receipt">
            RECEIPT
          </button>,
          <button className={baseButtonClasses} key="copy">
            COPY
          </button>,
        ];
      case "OVERDUE":
        return [
          <button className={baseButtonClasses} key="view">
            VIEW
          </button>,
          <button className={baseButtonClasses} key="remind">
            REMIND
          </button>,
          <button className={baseButtonClasses} key="call">
            CALL
          </button>,
        ];
      case "PARTIAL":
        return [
          <button className={baseButtonClasses} key="view">
            VIEW
          </button>,
          <button className={baseButtonClasses} key="balance">
            BALANCE
          </button>,
          <button className={baseButtonClasses} key="remind">
            REMIND
          </button>,
        ];
      default:
        return [
          <button className={baseButtonClasses} key="view">
            VIEW
          </button>,
          <button className={baseButtonClasses} key="edit">
            EDIT
          </button>,
        ];
    }
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead className="bg-landing-surface-alt">
          <tr className="border-landing-border border-b">
            <th className="w-12 px-4 py-3 text-left">
              <input
                checked={
                  selectedInvoices.length === invoices.length &&
                  invoices.length > 0
                }
                className="accent-landing-accent"
                onChange={handleSelectAll}
                type="checkbox"
              />
            </th>
            <th className="min-w-[120px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              INVOICE_ID
            </th>
            <th className="min-w-[150px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              CLIENT
            </th>
            <th className="min-w-[100px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              AMOUNT
            </th>
            <th className="hidden min-w-[100px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider sm:table-cell">
              ISSUE_DATE
            </th>
            <th className="hidden min-w-[100px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider md:table-cell">
              DUE_DATE
            </th>
            <th className="min-w-[80px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              STATUS
            </th>
            <th className="min-w-[120px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              className={cn(
                "cursor-pointer border-landing-border border-b transition-colors hover:bg-landing-surface-alt",
                selectedInvoices.includes(invoice.id) &&
                  "border-l-3 border-l-landing-accent bg-landing-surface-alt"
              )}
              key={invoice.id}
              onClick={() => handleRowClick(invoice.id)}
            >
              <td className="px-4 py-3">
                <input
                  checked={selectedInvoices.includes(invoice.id)}
                  className="accent-landing-accent"
                  onChange={() => handleRowClick(invoice.id)}
                  onClick={(e) => e.stopPropagation()}
                  type="checkbox"
                />
              </td>
              <td className="px-4 py-3 font-semibold text-landing-accent text-sm">
                {invoice.invoiceNumber}
              </td>
              <td className="px-4 py-3 text-landing-text text-sm">
                <div
                  className="max-w-[150px] truncate"
                  title={invoice.clientName}
                >
                  {invoice.clientName}
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-landing-success text-sm">
                ${invoice.amount.toLocaleString()}
              </td>
              <td className="hidden px-4 py-3 text-landing-text-muted text-sm sm:table-cell">
                {invoice.issueDate}
              </td>
              <td className="hidden px-4 py-3 text-landing-text-muted text-sm md:table-cell">
                {invoice.dueDate}
              </td>
              <td className="px-4 py-3">
                <span className={getStatusBadge(invoice.status)}>
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-wrap gap-1">
                  {getActionButtons(invoice)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {invoices.length === 0 && (
        <div className="py-12 text-center text-landing-text-muted">
          No invoices found matching your criteria.
        </div>
      )}
    </div>
  );
}
