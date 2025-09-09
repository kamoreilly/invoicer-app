"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

const landingPaths = ["/", "/landing"];

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLandingPage = landingPaths.includes(pathname);

  // For landing pages, the layout is handled within the PageTemplate component
  if (isLandingPage) {
    return <>{children}</>;
  }

  // For app pages, use the regular layout with header
  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <Header />
      {children}
    </div>
  );
}
