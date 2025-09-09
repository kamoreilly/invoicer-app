import type * as React from "react";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  invoiceCount: number;
  totalAmount: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  lastInvoiceDate?: string;
}

interface ClientTableProps {
  clients: Client[];
  selectedClients: string[];
  onSelectionChange: (selected: string[]) => void;
  onCreateInvoice: (clientId: string) => void;
  onEditClient: (clientId: string) => void;
  onViewClient: (clientId: string) => void;
  sortBy?: "name" | "totalAmount" | "invoiceCount";
  sortOrder?: "asc" | "desc";
  onSort?: (field: "name" | "totalAmount" | "invoiceCount") => void;
  className?: string;
}

export function ClientTable({
  clients,
  selectedClients,
  onSelectionChange,
  onCreateInvoice,
  onEditClient,
  onViewClient,
  sortBy,
  sortOrder,
  onSort,
  className,
}: ClientTableProps) {
  const handleRowClick = (clientId: string) => {
    const isSelected = selectedClients.includes(clientId);
    if (isSelected) {
      onSelectionChange(selectedClients.filter((id) => id !== clientId));
    } else {
      onSelectionChange([...selectedClients, clientId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(clients.map((client) => client.id));
    }
  };

  const getStatusBadge = (status: Client["status"]) => {
    const baseClasses =
      "px-2 py-1 rounded-sm font-semibold text-xs uppercase tracking-wider";

    switch (status) {
      case "ACTIVE":
        return `${baseClasses} bg-landing-success text-landing-bg`;
      case "INACTIVE":
        return `${baseClasses} bg-landing-text-muted text-landing-bg`;
      default:
        return `${baseClasses} bg-landing-text-muted text-landing-bg`;
    }
  };

  const getActionButtons = (client: Client) => {
    const baseButtonClasses =
      "px-2 py-1 border border-landing-border bg-landing-surface-alt text-landing-text font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:bg-landing-border hover:border-landing-accent";

    return [
      <button
        className={baseButtonClasses}
        key="edit"
        onClick={() => onEditClient(client.id)}
      >
        EDIT
      </button>,
      <button
        className={baseButtonClasses}
        key="invoice"
        onClick={() => onCreateInvoice(client.id)}
      >
        INVOICE
      </button>,
      <button
        className={baseButtonClasses}
        key="view"
        onClick={() => onViewClient(client.id)}
      >
        VIEW
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
                  selectedClients.length === clients.length &&
                  clients.length > 0
                }
                className="accent-landing-accent"
                onChange={handleSelectAll}
                type="checkbox"
              />
            </th>
            <th
              className="min-w-[200px] cursor-pointer px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider hover:text-landing-accent-dark"
              onClick={() => onSort?.("name")}
            >
              CLIENT_NAME{" "}
              {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="hidden min-w-[200px] px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider sm:table-cell">
              CONTACT_INFO
            </th>
            <th
              className="min-w-[80px] cursor-pointer px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider hover:text-landing-accent-dark"
              onClick={() => onSort?.("invoiceCount")}
            >
              INVOICES{" "}
              {sortBy === "invoiceCount" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="min-w-[120px] cursor-pointer px-4 py-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider hover:text-landing-accent-dark"
              onClick={() => onSort?.("totalAmount")}
            >
              TOTAL_AMOUNT{" "}
              {sortBy === "totalAmount" && (sortOrder === "asc" ? "↑" : "↓")}
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
          {clients.map((client) => (
            <tr
              className={cn(
                "cursor-pointer border-landing-border border-b transition-colors hover:bg-landing-surface-alt",
                selectedClients.includes(client.id) &&
                  "border-l-3 border-l-landing-accent bg-landing-surface-alt"
              )}
              key={client.id}
              onClick={() => handleRowClick(client.id)}
            >
              <td className="px-4 py-3">
                <input
                  checked={selectedClients.includes(client.id)}
                  className="accent-landing-accent"
                  onChange={() => handleRowClick(client.id)}
                  onClick={(e) => e.stopPropagation()}
                  type="checkbox"
                />
              </td>
              <td className="px-4 py-3 font-semibold text-landing-accent text-sm">
                <div className="max-w-[200px] truncate" title={client.name}>
                  {client.name}
                </div>
                {/* Mobile: Show contact info in name cell on small screens */}
                <div className="mt-1 sm:hidden">
                  <div
                    className="truncate text-landing-text text-xs"
                    title={client.email}
                  >
                    {client.email}
                  </div>
                  <div className="text-landing-text-muted text-xs">
                    {client.phone}
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 text-sm sm:table-cell">
                <div
                  className="max-w-[180px] truncate text-landing-text text-xs"
                  title={client.email}
                >
                  {client.email}
                </div>
                <div className="text-landing-text-muted text-xs">
                  {client.phone}
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-landing-success text-sm">
                {client.invoiceCount}
              </td>
              <td className="px-4 py-3 font-semibold text-landing-success text-sm">
                ${client.totalAmount.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span className={getStatusBadge(client.status)}>
                  {client.status}
                </span>
              </td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-wrap gap-1">
                  {getActionButtons(client)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {clients.length === 0 && (
        <div className="py-12 text-center text-landing-text-muted">
          No clients found matching your criteria.
        </div>
      )}
    </div>
  );
}
