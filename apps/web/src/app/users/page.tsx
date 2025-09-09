"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { TerminalCommandLine } from "@/components/ui/terminal-command-line";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { AddUserForm } from "@/components/users/add-user-form";
import { UserActionBar } from "@/components/users/user-actions";
import { UserSearch } from "@/components/users/user-search";
import { UserStatsGrid } from "@/components/users/user-stats";
import { UserTable } from "@/components/users/user-table";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

interface UserStats {
  totalUsers: number;
  adminUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  lastLoginTime: string;
  failedLogins: number;
}

interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "USER";
  department: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  lastLogin: string;
  createdAt: string;
}

interface UserFilters {
  role: "ALL" | "ADMIN" | "MANAGER" | "USER";
  status: "ALL" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
  department: "ALL" | "ACCOUNTING" | "SALES" | "MANAGEMENT" | "IT";
}

export default function UsersPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [commandOutput, setCommandOutput] = useState(
    "✓ Query executed successfully. 12 user accounts found."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock user data - replace with actual tRPC queries
  const mockUserStats: UserStats = {
    totalUsers: 12,
    adminUsers: 3,
    activeUsers: 9,
    inactiveUsers: 2,
    suspendedUsers: 1,
    lastLoginTime: "2h ago",
    failedLogins: 0,
  };

  const mockUsers: User[] = [
    {
      id: "1",
      userId: "USR-001",
      name: "John Administrator",
      email: "john.admin@invoicerapp.com",
      role: "ADMIN",
      department: "IT",
      status: "ACTIVE",
      lastLogin: "2024-01-18 14:30",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      userId: "USR-002",
      name: "Sarah Manager",
      email: "sarah.manager@invoicerapp.com",
      role: "MANAGER",
      department: "MANAGEMENT",
      status: "ACTIVE",
      lastLogin: "2024-01-18 13:45",
      createdAt: "2024-01-02",
    },
    {
      id: "3",
      userId: "USR-003",
      name: "Mike Accountant",
      email: "mike.accountant@invoicerapp.com",
      role: "USER",
      department: "ACCOUNTING",
      status: "ACTIVE",
      lastLogin: "2024-01-18 12:20",
      createdAt: "2024-01-03",
    },
    {
      id: "4",
      userId: "USR-004",
      name: "Lisa Sales",
      email: "lisa.sales@invoicerapp.com",
      role: "USER",
      department: "SALES",
      status: "INACTIVE",
      lastLogin: "2024-01-17 16:30",
      createdAt: "2024-01-04",
    },
    {
      id: "5",
      userId: "USR-005",
      name: "David Support",
      email: "david.support@invoicerapp.com",
      role: "USER",
      department: "IT",
      status: "ACTIVE",
      lastLogin: "2024-01-18 11:15",
      createdAt: "2024-01-05",
    },
    {
      id: "6",
      userId: "USR-006",
      name: "Emma Finance",
      email: "emma.finance@invoicerapp.com",
      role: "MANAGER",
      department: "ACCOUNTING",
      status: "SUSPENDED",
      lastLogin: "2024-01-16 09:45",
      createdAt: "2024-01-06",
    },
  ];

  useEffect(() => {
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }

    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.userId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setLastCommand(`search --query="${query}"`);
    setCommandOutput(`✓ Found ${filtered.length} users matching "${query}"`);
  };

  const handleFilterChange = (filters: UserFilters) => {
    let filtered = mockUsers;

    if (filters.role !== "ALL") {
      filtered = filtered.filter((user) => user.role === filters.role);
    }
    if (filters.status !== "ALL") {
      filtered = filtered.filter((user) => user.status === filters.status);
    }
    if (filters.department !== "ALL") {
      filtered = filtered.filter(
        (user) => user.department === filters.department
      );
    }

    setFilteredUsers(filtered);
    setLastCommand(
      `filter --role=${filters.role} --status=${filters.status} --dept=${filters.department}`
    );
    setCommandOutput(
      `✓ Applied filters. ${filtered.length} users match criteria.`
    );
  };

  const handleAddUser = () => {
    setShowAddUserForm(true);
    setLastCommand("► Opening user creation form...");
    setCommandOutput("⚡ Initializing user registration module...");
  };

  const handleBulkImport = () => {
    setLastCommand("bulk-import --users --format=csv");
    setCommandOutput("⚡ Preparing bulk import interface...");
  };

  const handleExportUsers = () => {
    setLastCommand("export --users --format=csv --include-permissions");
    setCommandOutput(
      "✓ User data exported successfully. File: users_export_2024.csv"
    );
  };

  const handleResetPasswords = () => {
    setLastCommand("reset-passwords --bulk --notify-users");
    setCommandOutput("⚡ Sending password reset emails to all users...");
  };

  const handlePurgeInactive = () => {
    setLastCommand("purge --inactive --days=90 --confirm");
    setCommandOutput(
      "⚠ WARNING: This will permanently delete inactive users. Confirm action."
    );
  };

  const handleUserAction = (action: string, userId: string) => {
    setIsProcessing(true);
    setLastCommand(`user-action --${action} --id=${userId}`);
    setCommandOutput(`⚡ Processing ${action} for user ${userId}...`);

    setTimeout(() => {
      setCommandOutput(`✓ User ${action} completed successfully.`);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSaveUser = (userData: any) => {
    setIsProcessing(true);
    setLastCommand("create-user --validate --send-welcome-email");
    setCommandOutput("⚡ Creating user account...");

    setTimeout(() => {
      setCommandOutput(
        "✓ User account created successfully. Welcome email sent."
      );
      setShowAddUserForm(false);
      setIsProcessing(false);
    }, 2000);
  };

  const userActions = [
    {
      label: "ADD_USER",
      onClick: handleAddUser,
      variant: "primary" as const,
    },
    {
      label: "BULK_IMPORT",
      onClick: handleBulkImport,
      variant: "default" as const,
    },
    {
      label: "EXPORT_USERS",
      onClick: handleExportUsers,
      variant: "default" as const,
    },
    {
      label: "RESET_PASSWORDS",
      onClick: handleResetPasswords,
      variant: "default" as const,
    },
    {
      label: "PURGE_INACTIVE",
      onClick: handlePurgeInactive,
      variant: "danger" as const,
    },
  ];

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center bg-landing-bg">
        <div className="font-mono text-landing-accent">LOADING...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardPage
      actions={<UserActionBar actions={userActions} />}
      title="USER_ADMINISTRATION.ADMIN"
    >
      {/* User Statistics */}
      <UserStatsGrid className="mb-6" stats={mockUserStats} />

      {/* Add User Form */}
      {showAddUserForm && (
        <AddUserForm
          className="mb-6"
          isProcessing={isProcessing}
          onCancel={() => setShowAddUserForm(false)}
          onSave={handleSaveUser}
        />
      )}

      {/* Search and Filters */}
      <TerminalWindow className="mb-6" title="USER_SEARCH.FILTER">
        <div className="p-5">
          <UserSearch
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </div>
      </TerminalWindow>

      {/* User Table */}
      <TerminalWindow className="mb-6" title="USER_DATABASE.ADMIN">
        <div className="p-5">
          <UserTable
            isProcessing={isProcessing}
            onUserAction={handleUserAction}
            users={filteredUsers}
          />
        </div>
      </TerminalWindow>

      {/* Command Line */}
      <TerminalCommandLine
        command={lastCommand}
        isRunning={isProcessing}
        output={commandOutput}
      />
    </DashboardPage>
  );
}
