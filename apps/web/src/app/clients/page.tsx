"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClientActions } from "@/components/clients/client-actions";
import { ClientSearch } from "@/components/clients/client-search";
import { ClientStats } from "@/components/clients/client-stats";
import { ClientTable } from "@/components/clients/client-table";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { Card } from "@/components/ui/card";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

// Client data types
export interface Client {
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

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  averageInvoiceValue: number;
  activeRate: number;
  monthlyGrowth: number;
}

export default function ClientsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "totalAmount" | "invoiceCount">(
    "totalAmount"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock data - replace with actual tRPC queries later
  const mockStats: ClientStats = {
    totalClients: 247,
    activeClients: 189,
    totalRevenue: 892_450,
    averageInvoiceValue: 3614,
    activeRate: 76.5,
    monthlyGrowth: 12,
  };

  const mockClients: Client[] = [
    {
      id: "1",
      name: "TechFlow Solutions Inc.",
      email: "billing@techflow.com",
      phone: "(555) 123-4567",
      invoiceCount: 23,
      totalAmount: 89_450,
      status: "ACTIVE",
      createdAt: "2023-06-15",
      lastInvoiceDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Digital Ventures LLC",
      email: "accounts@digitalventures.com",
      phone: "(555) 987-6543",
      invoiceCount: 18,
      totalAmount: 67_230,
      status: "ACTIVE",
      createdAt: "2023-08-22",
      lastInvoiceDate: "2024-01-12",
    },
    {
      id: "3",
      name: "Global Dynamics Corp",
      email: "finance@globaldynamics.com",
      phone: "(555) 456-7890",
      invoiceCount: 31,
      totalAmount: 124_780,
      status: "ACTIVE",
      createdAt: "2023-03-10",
      lastInvoiceDate: "2024-01-18",
    },
    {
      id: "4",
      name: "Innovation Labs",
      email: "billing@innovationlabs.io",
      phone: "(555) 321-0987",
      invoiceCount: 12,
      totalAmount: 45_670,
      status: "ACTIVE",
      createdAt: "2023-09-05",
      lastInvoiceDate: "2024-01-10",
    },
    {
      id: "5",
      name: "StartupXYZ",
      email: "admin@startupxyz.com",
      phone: "(555) 654-3210",
      invoiceCount: 7,
      totalAmount: 18_920,
      status: "INACTIVE",
      createdAt: "2023-11-20",
      lastInvoiceDate: "2023-12-15",
    },
    {
      id: "6",
      name: "MegaCorp Industries",
      email: "procurement@megacorp.com",
      phone: "(555) 789-0123",
      invoiceCount: 45,
      totalAmount: 198_340,
      status: "ACTIVE",
      createdAt: "2023-01-15",
      lastInvoiceDate: "2024-01-17",
    },
    {
      id: "7",
      name: "Creative Agency Pro",
      email: "billing@creativeagency.com",
      phone: "(555) 111-2222",
      invoiceCount: 15,
      totalAmount: 52_800,
      status: "ACTIVE",
      createdAt: "2023-07-08",
      lastInvoiceDate: "2024-01-14",
    },
    {
      id: "8",
      name: "Enterprise Solutions",
      email: "finance@enterprisesol.com",
      phone: "(555) 333-4444",
      invoiceCount: 28,
      totalAmount: 95_600,
      status: "ACTIVE",
      createdAt: "2023-04-12",
      lastInvoiceDate: "2024-01-16",
    },
  ];

  // Authentication check
  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Filter and sort clients
  const filteredAndSortedClients = mockClients
    .filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm);

      return matchesSearch;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "totalAmount":
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        case "invoiceCount":
          aValue = a.invoiceCount;
          bValue = b.invoiceCount;
          break;
        default:
          aValue = a.totalAmount;
          bValue = b.totalAmount;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });

  const handleAddClient = () => {
    router.push("/clients/new");
  };

  const handleImportCSV = () => {
    console.log("Import CSV");
  };

  const handleExportData = () => {
    console.log("Export client data");
  };

  const handleBulkEmail = () => {
    console.log("Send bulk email to clients:", selectedClients);
  };

  const handleCreateInvoice = (clientId: string) => {
    router.push(`/invoices/new?client=${clientId}`);
  };

  const handleEditClient = (clientId: string) => {
    router.push(`/clients/${clientId}/edit`);
  };

  const handleViewClient = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  if (isPending) {
    return (
      <DashboardPage title="CLIENT_DATABASE.JSON">
        <div className="flex h-64 items-center justify-center">
          <div className="text-landing-text-muted">Loading...</div>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      actions={
        <ClientActions
          onAddClient={handleAddClient}
          onBulkEmail={handleBulkEmail}
          onExportData={handleExportData}
          onImportCSV={handleImportCSV}
          selectedCount={selectedClients.length}
        />
      }
      stats={<ClientStats stats={mockStats} />}
      title="CLIENT_DATABASE.JSON"
    >
      {/* Search */}
      <ClientSearch onSearchChange={setSearchTerm} searchTerm={searchTerm} />

      {/* Client Table */}
      <TerminalWindow title="CLIENT_RECORDS.DB">
        <ClientTable
          clients={filteredAndSortedClients}
          onCreateInvoice={handleCreateInvoice}
          onEditClient={handleEditClient}
          onSelectionChange={setSelectedClients}
          onSort={(field) => {
            if (sortBy === field) {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortBy(field);
              setSortOrder("desc");
            }
          }}
          onViewClient={handleViewClient}
          selectedClients={selectedClients}
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
              client --list --active --sort=total_amount
            </span>
          </div>
          <div className="mt-1 text-landing-success text-xs sm:text-sm">
            ✓ Found {mockStats.activeClients} active clients, sorted by total
            amount
          </div>
          <div className="mt-1 text-landing-success text-xs sm:text-sm">
            Showing {filteredAndSortedClients.length} filtered results.
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
