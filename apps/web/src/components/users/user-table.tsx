import type * as React from "react";
import { cn } from "@/lib/utils";

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

interface UserTableProps {
  users: User[];
  onUserAction: (action: string, userId: string) => void;
  isProcessing?: boolean;
  className?: string;
}

function StatusBadge({ status }: { status: User["status"] }) {
  const getStatusProps = (status: User["status"]) => {
    switch (status) {
      case "ACTIVE":
        return {
          color: "bg-landing-success text-landing-bg",
          label: "ACTIVE",
        };
      case "INACTIVE":
        return {
          color: "bg-landing-text-muted text-white",
          label: "INACTIVE",
        };
      case "SUSPENDED":
        return {
          color: "bg-landing-error text-white",
          label: "SUSPENDED",
        };
    }
  };

  const { color, label } = getStatusProps(status);

  return (
    <span
      className={cn(
        "rounded px-2 py-1 font-semibold text-xs uppercase tracking-wider",
        color
      )}
    >
      {label}
    </span>
  );
}

function RoleBadge({ role }: { role: User["role"] }) {
  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "ADMIN":
        return "text-landing-error";
      case "MANAGER":
        return "text-landing-warning";
      case "USER":
        return "text-landing-text-muted";
    }
  };

  return (
    <span className={cn("font-medium text-xs", getRoleColor(role))}>
      {role}
    </span>
  );
}

function ActionButtons({
  user,
  onAction,
  isProcessing,
}: {
  user: User;
  onAction: (action: string, userId: string) => void;
  isProcessing?: boolean;
}) {
  const getActionsForStatus = (status: User["status"]) => {
    switch (status) {
      case "ACTIVE":
        return [
          { label: "EDIT", action: "edit" },
          { label: "PERMISSIONS", action: "permissions" },
          { label: "SUSPEND", action: "suspend" },
        ];
      case "INACTIVE":
        return [
          { label: "EDIT", action: "edit" },
          { label: "ACTIVATE", action: "activate" },
          { label: "DELETE", action: "delete" },
        ];
      case "SUSPENDED":
        return [
          { label: "EDIT", action: "edit" },
          { label: "REACTIVATE", action: "reactivate" },
          { label: "DELETE", action: "delete" },
        ];
    }
  };

  const actions = getActionsForStatus(user.status);

  return (
    <div className="flex gap-1">
      {actions.map((action, index) => (
        <button
          className={cn(
            "rounded border px-2 py-1 font-medium text-xs uppercase tracking-wider transition-all duration-200",
            "border-landing-border bg-landing-surface-alt text-landing-text",
            "hover:border-landing-accent hover:bg-landing-border",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          disabled={isProcessing}
          key={index}
          onClick={() => onAction(action.action, user.userId)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

export function UserTable({
  users,
  onUserAction,
  isProcessing,
  className,
}: UserTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-landing-border border-b bg-landing-surface-alt">
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              USER_ID
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              NAME
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              EMAIL
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              ROLE
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              LAST_LOGIN
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              STATUS
            </th>
            <th className="p-3 text-left font-semibold text-landing-accent text-xs uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className="border-landing-border border-b transition-colors hover:bg-landing-surface-alt/50"
              key={user.id}
            >
              <td className="p-3 font-semibold text-landing-accent text-xs">
                {user.userId}
              </td>
              <td className="p-3 font-semibold text-landing-accent text-xs">
                {user.name}
              </td>
              <td className="p-3 text-landing-text text-xs">{user.email}</td>
              <td className="p-3 text-xs">
                <RoleBadge role={user.role} />
              </td>
              <td className="p-3 text-landing-text-muted text-xs">
                {user.lastLogin}
              </td>
              <td className="p-3 text-xs">
                <StatusBadge status={user.status} />
              </td>
              <td className="p-3 text-xs">
                <ActionButtons
                  isProcessing={isProcessing}
                  onAction={onUserAction}
                  user={user}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
