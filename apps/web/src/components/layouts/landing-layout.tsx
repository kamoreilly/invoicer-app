import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";

interface LandingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function LandingLayout({
  children,
  className = "",
}: LandingLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-landing-bg font-mono text-landing-text ${className}`}
    >
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
