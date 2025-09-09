"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "dashboard.exe", section: "MAIN_MENU" },
    { href: "/invoices", label: "invoices.db", section: "MAIN_MENU" },
    { href: "/clients", label: "clients.json", section: "MAIN_MENU" },
    { href: "/payments", label: "payments.log", section: "MAIN_MENU" },
    { href: "/reports", label: "reports.sql", section: "MAIN_MENU" },
    { href: "/config", label: "config.ini", section: "SYSTEM_TOOLS" },
    { href: "/export", label: "export.py", section: "SYSTEM_TOOLS" },
    { href: "/analytics", label: "analytics.r", section: "SYSTEM_TOOLS" },
  ];

  const adminItems = [
    { href: "/users", label: "users.admin", section: "ADMIN_PANEL" },
    { href: "/logout", label: "logout.cfg", section: "ADMIN_PANEL" },
  ];

  const renderNavSection = (items: typeof navItems, title: string) => {
    const sectionItems = items.filter((item) => item.section === title);
    if (sectionItems.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="px-5 pb-2 font-semibold text-landing-text-muted text-xs uppercase tracking-wider">
          // {title}
        </div>
        {sectionItems.map((item) => (
          <Link
            className={`block border-transparent border-l-3 px-5 py-2.5 text-sm transition-all duration-200 hover:border-landing-accent hover:bg-landing-surface-alt hover:text-landing-accent ${
              pathname === item.href
                ? "border-landing-accent bg-landing-surface-alt text-landing-accent"
                : "text-landing-text"
            }`}
            href={item.href}
            key={item.href}
          >
            ► {item.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto border-landing-border border-r-2 bg-landing-surface">
      <div className="p-5">
        {renderNavSection(navItems, "MAIN_MENU")}
        {renderNavSection(navItems, "SYSTEM_TOOLS")}
        {renderNavSection(adminItems, "ADMIN_PANEL")}
      </div>
    </div>
  );
}
