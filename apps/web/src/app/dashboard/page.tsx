"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TerminalButton } from "@/components/landing/terminal-button";
import {
  DashboardActions,
  DashboardPage,
  DashboardStats,
} from "@/components/templates/dashboard-page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  createdAt: string;
}

interface DashboardStats {
  totalInvoices: number;
  outstandingBalance: number;
  overdueAlerts: number;
  monthlyRevenue: number;
  pendingInvoices: number;
  overdueAmount: number;
  monthlyGrowth: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [currentTime, setCurrentTime] = useState("");
  const [activeCommand, setActiveCommand] = useState("");

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock data for now - replace with actual tRPC queries
  const mockStats: DashboardStats = {
    totalInvoices: 2847,
    outstandingBalance: 89_450,
    overdueAlerts: 18,
    monthlyRevenue: 156_780,
    pendingInvoices: 47,
    overdueAmount: 12_890,
    monthlyGrowth: 24.3,
  };

  const mockInvoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-0891",
      clientName: "TechFlow_Solutions",
      amount: 15_750,
      status: "PAID",
      createdAt: "2024-01-18",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-0892",
      clientName: "Digital_Ventures",
      amount: 8920,
      status: "PENDING",
      createdAt: "2024-01-17",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-0893",
      clientName: "Global_Dynamics",
      amount: 24_500,
      status: "OVERDUE",
      createdAt: "2024-01-14",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-0894",
      clientName: "Innovation_Labs",
      amount: 6780,
      status: "PAID",
      createdAt: "2024-01-16",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-0895",
      clientName: "Future_Systems",
      amount: 31_200,
      status: "PENDING",
      createdAt: "2024-01-15",
    },
  ];

  const commands = [
    "invoice --status --recent --limit=5",
    "backup --create --timestamp",
    "report --generate --monthly",
    "client --list --active",
    "payment --check --overdue",
  ];

  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const commandInterval = setInterval(() => {
      const randomCommand =
        commands[Math.floor(Math.random() * commands.length)];
      setActiveCommand(randomCommand);
    }, 8000);

    return () => clearInterval(commandInterval);
  }, []);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center bg-landing-bg">
        <div className="font-mono text-landing-accent">LOADING...</div>
      </div>
    );
  }

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "PAID":
        return "bg-landing-success text-landing-bg";
      case "PENDING":
        return "bg-landing-warning text-landing-bg";
      case "OVERDUE":
        return "bg-landing-error text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const dashboardActions = [
    {
      label: "+ NEW_INVOICE",
      onClick: () => router.push("/invoices/new"),
      variant: "primary" as const,
    },
    {
      label: "EXPORT_DATA",
      onClick: () => console.log("Export data"),
      variant: "default" as const,
    },
    {
      label: "RUN_BACKUP",
      onClick: () => console.log("Run backup"),
      variant: "default" as const,
    },
    {
      label: "GENERATE_REPORT",
      onClick: () => console.log("Generate report"),
      variant: "default" as const,
    },
  ];

  const statsData = [
    {
      header: "TOTAL_INVOICES",
      value: mockStats.totalInvoices.toLocaleString(),
      meta: "+127 this_month",
      trend: "up" as const,
      trendValue: "+4.5%",
    },
    {
      header: "OUTSTANDING_BALANCE",
      value: `$${mockStats.outstandingBalance.toLocaleString()}`,
      meta: `${mockStats.pendingInvoices} pending_invoices`,
      trend: "neutral" as const,
    },
    {
      header: "OVERDUE_ALERTS",
      value: mockStats.overdueAlerts.toString(),
      meta: `$${mockStats.overdueAmount.toLocaleString()} total_amount`,
      trend: "down" as const,
      trendValue: "-2.1%",
      variant: "warning" as const,
    },
    {
      header: "MONTHLY_REVENUE",
      value: `$${mockStats.monthlyRevenue.toLocaleString()}`,
      meta: `+${mockStats.monthlyGrowth}% growth_rate`,
      trend: "up" as const,
      trendValue: `+${mockStats.monthlyGrowth}%`,
      variant: "success" as const,
    },
  ];

  return (
    <DashboardPage
      actions={<DashboardActions actions={dashboardActions} />}
      stats={<DashboardStats stats={statsData} />}
      title="INVOICE_CONTROL_DASHBOARD"
    >

      {/* Recent Invoice Activity */}
      <Card className="mb-6 border-landing-border bg-landing-surface">
        <div className="flex items-center justify-between border-landing-border border-b bg-landing-surface-alt px-4 py-3">
          <div className="font-semibold text-landing-accent text-sm uppercase tracking-wider">
            RECENT_INVOICE_ACTIVITY.LOG
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-landing-error" />
            <div className="h-2 w-2 rounded-full bg-landing-warning" />
            <div className="h-2 w-2 rounded-full bg-landing-success" />
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
                  <th className="px-2 pb-3">INVOICE_ID</th>
                  <th className="px-2 pb-3">CLIENT_NAME</th>
                  <th className="px-2 pb-3">AMOUNT</th>
                  <th className="px-2 pb-3">STATUS</th>
                  <th className="px-2 pb-3">DATE_CREATED</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((invoice) => (
                  <tr
                    className="border-landing-border border-b transition-colors hover:bg-landing-surface-alt"
                    key={invoice.id}
                  >
                    <td className="px-2 py-3 font-semibold text-landing-accent">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-2 py-3 text-landing-text">
                      {invoice.clientName}
                    </td>
                    <td className="px-2 py-3 font-semibold text-landing-success">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`rounded px-2 py-1 font-semibold text-xs uppercase tracking-wider ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-landing-text">
                      {invoice.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Command Line */}
      <Card className="border-landing-border bg-landing-bg font-mono text-sm">
        <div className="p-3">
          <div className="text-landing-success">
            <span className="text-landing-accent">
              invoicer@app-terminal:~$
            </span>{" "}
            invoice --status --recent --limit=5
          </div>
          <div className="mt-1 text-landing-success">
            ✓ Query executed successfully
          </div>
          <div className="mt-2 text-landing-success">
            <span className="text-landing-accent">
              invoicer@app-terminal:~$
            </span>{" "}
            {activeCommand}
            <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-landing-accent" />
          </div>
        </div>
      </Card>
    </DashboardPage>
  );
}
