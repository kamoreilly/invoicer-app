"use client";

import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layouts/app-layout";

// Define layout types and their corresponding paths
const layoutConfig = {
  landing: ["/", "/landing"],
  auth: ["/login", "/register", "/forgot-password"],
  app: [
    "/dashboard",
    "/invoices",
    "/clients",
    "/payments",
    "/reports",
    "/config",
    "/config-simple",
    "/config-test",
    "/users",
    "/backup",
    "/export",
    "/analytics",
    "/logout",
  ],
  minimal: ["/404", "/500", "/maintenance"],
} as const;

type LayoutType = keyof typeof layoutConfig;

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const layoutType = getLayoutType(pathname);

  switch (layoutType) {
    case "landing":
    case "auth":
      // These layouts are handled within their respective page components
      // to allow for more customization and specific styling
      return <>{children}</>;

    case "app":
      // Use the unified app layout for all application pages
      return <AppLayout>{children}</AppLayout>;

    case "minimal":
      // Minimal layout for error pages, maintenance, etc.
      return (
        <div className="min-h-screen bg-landing-bg text-landing-text">
          {children}
        </div>
      );

    default:
      // Fallback to app layout for unknown routes
      return <AppLayout>{children}</AppLayout>;
  }
}

// Helper function to determine layout type based on pathname
function getLayoutType(pathname: string): LayoutType {
  for (const [layoutType, paths] of Object.entries(layoutConfig)) {
    if (
      paths.some((path) => pathname === path || pathname.startsWith(path + "/"))
    ) {
      return layoutType as LayoutType;
    }
  }
  return "app"; // Default fallback
}

// Export layout configuration for use in other components
export { layoutConfig, getLayoutType };
