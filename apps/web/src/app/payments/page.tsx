"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentActions } from "@/components/payments/payment-actions";
import { PaymentFilters } from "@/components/payments/payment-filters";
import { PaymentStats } from "@/components/payments/payment-stats";
import { PaymentTable } from "@/components/payments/payment-table";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { Card } from "@/components/ui/card";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

// Payment data types
export interface Payment {
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

export interface PaymentStats {
  totalPayments: number;
  paymentsReceived: number;
  pendingPayments: number;
  failedPayments: number;
  failedAmount: number;
  pendingTransactions: number;
  monthlyGrowth: number;
}

export default function PaymentsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "amount" | "client">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock data - replace with actual tRPC queries later
  const mockStats: PaymentStats = {
    totalPayments: 1847,
    paymentsReceived: 567_890,
    pendingPayments: 89_450,
    failedPayments: 12,
    failedAmount: 4230,
    pendingTransactions: 47,
    monthlyGrowth: 89,
  };

  const mockPayments: Payment[] = [
    {
      id: "1",
      paymentId: "PAY-2024-0234",
      invoiceRef: "INV-2024-0891",
      clientName: "TechFlow Solutions",
      amount: 15_750,
      method: "BANK_TRANSFER",
      status: "COMPLETED",
      date: "2024-01-18",
      createdAt: "2024-01-18",
    },
    {
      id: "2",
      paymentId: "PAY-2024-0235",
      invoiceRef: "INV-2024-0892",
      clientName: "Digital Ventures",
      amount: 8920,
      method: "CREDIT_CARD",
      status: "PENDING",
      date: "2024-01-17",
      createdAt: "2024-01-17",
    },
    {
      id: "3",
      paymentId: "PAY-2024-0236",
      invoiceRef: "INV-2024-0893",
      clientName: "Global Dynamics",
      amount: 24_500,
      method: "ACH_TRANSFER",
      status: "FAILED",
      date: "2024-01-16",
      createdAt: "2024-01-16",
    },
    {
      id: "4",
      paymentId: "PAY-2024-0237",
      invoiceRef: "INV-2024-0894",
      clientName: "Innovation Labs",
      amount: 6780,
      method: "PAYPAL",
      status: "COMPLETED",
      date: "2024-01-15",
      createdAt: "2024-01-15",
    },
    {
      id: "5",
      paymentId: "PAY-2024-0238",
      invoiceRef: "INV-2024-0895",
      clientName: "Future Systems",
      amount: 31_200,
      method: "WIRE_TRANSFER",
      status: "PENDING",
      date: "2024-01-14",
      createdAt: "2024-01-14",
    },
    {
      id: "6",
      paymentId: "PAY-2024-0239",
      invoiceRef: "INV-2024-0896",
      clientName: "StartupXYZ",
      amount: 2450,
      method: "CHECK",
      status: "REFUNDED",
      date: "2024-01-13",
      createdAt: "2024-01-13",
    },
    {
      id: "7",
      paymentId: "PAY-2024-0240",
      invoiceRef: "INV-2024-0897",
      clientName: "MegaCorp Industries",
      amount: 45_890,
      method: "BANK_TRANSFER",
      status: "COMPLETED",
      date: "2024-01-12",
      createdAt: "2024-01-12",
    },
    {
      id: "8",
      paymentId: "PAY-2024-0241",
      invoiceRef: "INV-2024-0898",
      clientName: "Creative Agency Pro",
      amount: 12_340,
      method: "CREDIT_CARD",
      status: "COMPLETED",
      date: "2024-01-11",
      createdAt: "2024-01-11",
    },
  ];

  // Authentication check
  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Filter and sort payments
  const filteredAndSortedPayments = mockPayments
    .filter((payment) => {
      const matchesStatus =
        statusFilter === "all" ||
        payment.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "client":
          aValue = a.clientName.toLowerCase();
          bValue = b.clientName.toLowerCase();
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });

  const handleRecordPayment = () => {
    router.push("/payments/new");
  };

  const handleReconcile = () => {
    console.log("Reconcile payments");
  };

  const handleExportReport = () => {
    console.log("Export payment report");
  };

  const handleSendReminders = () => {
    console.log("Send payment reminders");
  };

  const handleViewPayment = (paymentId: string) => {
    router.push(`/payments/${paymentId}`);
  };

  const handleViewInvoice = (invoiceRef: string) => {
    router.push(`/invoices/${invoiceRef}`);
  };

  if (isPending) {
    return (
      <DashboardPage title="PAYMENT_TRACKER.LOG">
        <div className="flex h-64 items-center justify-center">
          <div className="text-landing-text-muted">Loading...</div>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      actions={
        <PaymentActions
          onExportReport={handleExportReport}
          onReconcile={handleReconcile}
          onRecordPayment={handleRecordPayment}
          onSendReminders={handleSendReminders}
        />
      }
      stats={<PaymentStats stats={mockStats} />}
      title="PAYMENT_TRACKER.LOG"
    >
      {/* Filters */}
      <PaymentFilters
        onStatusFilterChange={setStatusFilter}
        statusFilter={statusFilter}
      />

      {/* Payment Table */}
      <TerminalWindow title="PAYMENT_TRANSACTIONS.DB">
        <PaymentTable
          onSelectionChange={setSelectedPayments}
          onSort={(field) => {
            if (sortBy === field) {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortBy(field);
              setSortOrder("desc");
            }
          }}
          onViewInvoice={handleViewInvoice}
          onViewPayment={handleViewPayment}
          payments={filteredAndSortedPayments}
          selectedPayments={selectedPayments}
          sortBy={sortBy}
          sortOrder={sortOrder}
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
              payment --list --status={statusFilter} --sort=date_desc
            </span>
          </div>
          <div className="mt-1 text-landing-success text-xs sm:text-sm">
            ✓ Retrieved {mockStats.totalPayments} payment records
          </div>
          <div className="mt-1 text-landing-success text-xs sm:text-sm">
            Showing {filteredAndSortedPayments.length} filtered results.
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
