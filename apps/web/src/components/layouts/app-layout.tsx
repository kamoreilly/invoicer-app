"use client";

import { usePathname } from "next/navigation";
import type * as React from "react";
import { AppLogo } from "@/components/common/app-logo";
import { UserInfo } from "@/components/common/status-indicator";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
}

function AppLayout({
  children,
  className,
  showSidebar = true,
  sidebarCollapsed = false,
}: AppLayoutProps) {
  return (
    <div className={cn("grid h-svh grid-rows-[auto_1fr]", className)}>
      <AppHeader />
      <div
        className={cn(
          "grid",
          showSidebar
            ? sidebarCollapsed
              ? "grid-cols-[60px_1fr]"
              : "grid-cols-[280px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]"
            : "grid-cols-1"
        )}
      >
        {showSidebar && (
          <div className="hidden md:block">
            <DashboardSidebar />
          </div>
        )}
        <AppMain>{children}</AppMain>
      </div>
    </div>
  );
}

// App header component
function AppHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-landing-border border-b-2 bg-landing-surface",
        className
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <AppLogo href="/" size="sm" />
        <UserInfo />
      </div>
    </header>
  );
}

// App main content area
interface AppMainProps {
  children: React.ReactNode;
  className?: string;
}

function AppMain({ children, className }: AppMainProps) {
  return (
    <main className={cn("overflow-auto bg-landing-bg", className)}>
      {children}
    </main>
  );
}

// App page wrapper with consistent padding and styling
interface AppPageProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "default" | "lg";
}

function AppPage({
  children,
  className,
  maxWidth = "full",
  padding = "default",
}: AppPageProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-none",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "min-h-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        maxWidth !== "full" && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

// Mobile sidebar overlay (for future mobile menu implementation)
interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function MobileSidebar({ isOpen, onClose, children }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-landing-surface md:hidden">
        {children}
      </div>
    </>
  );
}

export { AppLayout, AppHeader, AppMain, AppPage, MobileSidebar };
