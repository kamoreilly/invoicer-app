import type * as React from "react";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  paymentId: string;
  invoiceRef: string;
  clientName: string;
  amount: number;
  method:
    | "BANK_TRANSFER"
    | "CREDIT_CARD"
    | "ACH_TRANSFER"
    | "PAYPAL"
    | "WIRE_TRANSFER"
    | "CHECK";
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  date: string;
  createdAt: string;
}

interface PaymentTableProps {
  payments: Payment[];
  selectedPayments: string[];
  onSelectionChange: (selected: string[]) => void;
  onViewPayment: (paymentId: string) => void;
  onViewInvoice: (invoiceRef: string) => void;
  sortBy?: "date" | "amount" | "client";
  sortOrder?: "asc" | "desc";
  onSort?: (field: "date" | "amount" | "client") => void;
  className?: string;
}

export function PaymentTable({
  payments,
  selectedPayments,
  onSelectionChange,
  onViewPayment,
  onViewInvoice,
  sortBy,
  sortOrder,
  onSort,
  className,
}: PaymentTableProps) {
  const handleRowClick = (paymentId: string) => {
    const isSelected = selectedPayments.includes(paymentId);
    if (isSelected) {
      onSelectionChange(selectedPayments.filter((id) => id !== paymentId));
    } else {
      onSelectionChange([...selectedPayments, paymentId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === payments.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(payments.map((payment) => payment.id));
    }
  };

  const getStatusBadge = (status: Payment["status"]) => {
    const baseClasses =
      "px-2 py-1 rounded-sm font-semibold text-xs uppercase tracking-wider";

    switch (status) {
      case "COMPLETED":
        return `${baseClasses} bg-landing-success text-landing-bg`;
      case "PENDING":
        return `${baseClasses} bg-landing-warning text-landing-bg`;
      case "FAILED":
        return `${baseClasses} bg-landing-error text-white`;
      case "REFUNDED":
        return `${baseClasses} bg-landing-text-muted text-landing-bg`;
      default:
        return `${baseClasses} bg-landing-text-muted text-landing-bg`;
    }
  };

  const getMethodDisplay = (method: Payment["method"]) => {
    return method.replace(/_/g, " ");
  };

  const getActionButtons = (payment: Payment) => {
    const baseButtonClasses =
      "px-2 py-1 border border-landing-border bg-landing-surface-alt text-landing-text font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-border hover:border-landing-accent";

    return [
      <button
        className={baseButtonClasses}
        key="view"
        onClick={() => onViewPayment(payment.id)}
      >
        VIEW
      </button>,
      <button
        className={baseButtonClasses}
        key="invoice"
        onClick={() => onViewInvoice(payment.invoiceRef)}
      >
        INVOICE
      </button>,
    ];
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead className="bg-landing-surface-alt">
          <tr className="border-landing-border border-b">
            <th className="w-12 px-4 py-3 text-left">
              <input
                checked={
                  selectedPayments.length === payments.length &&
                  payments.length > 0
                }
                className="accent-landing-accent"
                onChange={handleSelectAll}
                type="checkbox"
              />
            </th>
            <th className="min-w-[120px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              PAYMENT_ID
            </th>
            <th className="hidden min-w-[120px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider sm:table-cell">
              INVOICE_REF
            </th>
            <th
              className="min-w-[150px] cursor-pointer px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider hover:text-landing-accent-dark"
              onClick={() => onSort?.("client")}
            >
              CLIENT {sortBy === "client" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="min-w-[100px] cursor-pointer px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider hover:text-landing-accent-dark"
              onClick={() => onSort?.("amount")}
            >
              AMOUNT {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="hidden min-w-[120px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider md:table-cell">
              METHOD
            </th>
            <th className="min-w-[80px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              STATUS
            </th>
            <th
              className="hidden min-w-[100px] cursor-pointer px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider hover:text-landing-accent-dark lg:table-cell"
              onClick={() => onSort?.("date")}
            >
              DATE {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="min-w-[120px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              className={cn(
                "cursor-pointer border-landing-border border-b transition-colors hover:bg-landing-surface-alt",
                selectedPayments.includes(payment.id) &&
                  "border-l-3 border-l-landing-accent bg-landing-surface-alt"
              )}
              key={payment.id}
              onClick={() => handleRowClick(payment.id)}
            >
              <td className="px-4 py-3">
                <input
                  checked={selectedPayments.includes(payment.id)}
                  className="accent-landing-accent"
                  onChange={() => handleRowClick(payment.id)}
                  onClick={(e) => e.stopPropagation()}
                  type="checkbox"
                />
              </td>
              <td className="px-4 py-3 font-semibold text-landing-accent text-sm">
                <div
                  className="max-w-[120px] truncate"
                  title={payment.paymentId}
                >
                  {payment.paymentId}
                </div>
              </td>
              <td className="hidden px-4 py-3 text-landing-text text-sm sm:table-cell">
                <div
                  className="max-w-[120px] truncate"
                  title={payment.invoiceRef}
                >
                  {payment.invoiceRef}
                </div>
              </td>
              <td className="px-4 py-3 text-landing-text text-sm">
                <div
                  className="max-w-[150px] truncate"
                  title={payment.clientName}
                >
                  {payment.clientName}
                </div>
                {/* Mobile: Show invoice ref in client cell on small screens */}
                <div className="mt-1 sm:hidden">
                  <div
                    className="truncate text-landing-text-muted text-xs"
                    title={payment.invoiceRef}
                  >
                    {payment.invoiceRef}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-landing-success text-sm">
                ${payment.amount.toLocaleString()}
              </td>
              <td className="hidden px-4 py-3 text-landing-text-muted text-sm md:table-cell">
                {getMethodDisplay(payment.method)}
              </td>
              <td className="px-4 py-3">
                <span className={getStatusBadge(payment.status)}>
                  {payment.status}
                </span>
                {/* Mobile: Show method and date below status on small screens */}
                <div className="mt-1 md:hidden">
                  <div className="text-landing-text-muted text-xs">
                    {getMethodDisplay(payment.method)}
                  </div>
                  <div className="text-landing-text-muted text-xs lg:hidden">
                    {payment.date}
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 text-landing-text-muted text-sm lg:table-cell">
                {payment.date}
              </td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-wrap gap-1">
                  {getActionButtons(payment)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <div className="py-12 text-center text-landing-text-muted">
          No payments found matching your criteria.
        </div>
      )}
    </div>
  );
}
