"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoiceActions } from "@/components/invoices/invoice-actions";
import { InvoiceFilters } from "@/components/invoices/invoice-filters";
import { InvoiceStats } from "@/components/invoices/invoice-stats";
import { InvoiceTable } from "@/components/invoices/invoice-table";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { Card } from "@/components/ui/card";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

// Invoice data types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "PARTIAL";
  createdAt: string;
}

export interface InvoiceStats {
  totalInvoices: number;
  totalValue: number;
  paidInvoices: number;
  overdueInvoices: number;
  outstandingAmount: number;
  overdueAmount: number;
  collectionRate: number;
  monthlyGrowth: number;
}

export default function InvoicesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock data - replace with actual tRPC queries later
  const mockStats: InvoiceStats = {
    totalInvoices: 247,
    totalValue: 127_450,
    paidInvoices: 189,
    overdueInvoices: 12,
    outstandingAmount: 23_120,
    overdueAmount: 8340,
    collectionRate: 76.5,
    monthlyGrowth: 23,
  };

  const mockInvoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      clientName: "TechCorp Solutions",
      amount: 4250,
      issueDate: "2024-01-15",
      dueDate: "2024-02-14",
      status: "SENT",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      clientName: "Digital Dynamics",
      amount: 2800,
      issueDate: "2024-01-16",
      dueDate: "2024-02-15",
      status: "PAID",
      createdAt: "2024-01-16",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      clientName: "StartupHub Inc",
      amount: 1950,
      issueDate: "2024-01-17",
      dueDate: "2024-02-16",
      status: "DRAFT",
      createdAt: "2024-01-17",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      clientName: "Enterprise Systems",
      amount: 6750,
      issueDate: "2024-01-10",
      dueDate: "2024-02-09",
      status: "OVERDUE",
      createdAt: "2024-01-10",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      clientName: "Creative Agency",
      amount: 3200,
      issueDate: "2024-01-12",
      dueDate: "2024-02-11",
      status: "PARTIAL",
      createdAt: "2024-01-12",
    },
    {
      id: "6",
      invoiceNumber: "INV-2024-006",
      clientName: "Global Consulting",
      amount: 5500,
      issueDate: "2024-01-14",
      dueDate: "2024-02-13",
      status: "SENT",
      createdAt: "2024-01-14",
    },
    {
      id: "7",
      invoiceNumber: "INV-2024-007",
      clientName: "Innovation Labs",
      amount: 2100,
      issueDate: "2024-01-18",
      dueDate: "2024-02-17",
      status: "DRAFT",
      createdAt: "2024-01-18",
    },
    {
      id: "8",
      invoiceNumber: "INV-2024-008",
      clientName: "Metro Solutions",
      amount: 4800,
      issueDate: "2024-01-11",
      dueDate: "2024-02-10",
      status: "PAID",
      createdAt: "2024-01-11",
    },
  ];

  // Authentication check
  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Filter invoices based on search and status
  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      invoice.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = () => {
    router.push("/invoices/new");
  };

  const handleBulkSend = () => {
    console.log("Bulk send invoices:", selectedInvoices);
  };

  const handleExportList = () => {
    console.log("Export invoice list");
  };

  const handlePaymentReminder = () => {
    console.log("Send payment reminders");
  };

  if (isPending) {
    return (
      <DashboardPage title="INVOICE_DATABASE.DB">
        <div className="flex h-64 items-center justify-center">
          <div className="text-landing-text-muted">Loading...</div>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      actions={
        <InvoiceActions
          onBulkSend={handleBulkSend}
          onCreateInvoice={handleCreateInvoice}
          onExportList={handleExportList}
          onPaymentReminder={handlePaymentReminder}
          selectedCount={selectedInvoices.length}
        />
      }
      stats={<InvoiceStats stats={mockStats} />}
      title="INVOICE_DATABASE.DB"
    >
      {/* Search and Filters */}
      <InvoiceFilters
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />

      {/* Invoice Table */}
      <TerminalWindow title="INVOICE_RECORDS.SQL">
        <InvoiceTable
          invoices={filteredInvoices}
          onSelectionChange={setSelectedInvoices}
          selectedInvoices={selectedInvoices}
        />
      </TerminalWindow>

      {/* Command Line */}
      <Card className="mt-6 border-landing-border bg-landing-bg font-mono text-sm">
        <div className="p-3">
          <div className="text-landing-success text-xs sm:text-sm">
            <span className="text-landing-accent">
              invoicer@app-terminal:~$
            </span>{" "}
            <span className="break-all">
              SELECT * FROM invoices ORDER BY issue_date DESC LIMIT 50;
            </span>
          </div>
          <div className="mt-1 text-landing-success text-xs sm:text-sm">
            ✓ Query executed successfully. {mockStats.totalInvoices} total
            records found.
          </div>
          <div className="mt-1 text-landing-success text-xs sm:text-sm">
            Showing {filteredInvoices.length} filtered results.
          </div>
          <div className="mt-2 text-landing-success text-xs sm:text-sm">
            <span className="text-landing-accent">
              invoicer@app-terminal:~$
            </span>{" "}
            <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-landing-accent" />
          </div>
        </div>
      </Card>
    </DashboardPage>
  );
}
