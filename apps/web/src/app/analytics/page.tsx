"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnalyticsActionBar } from "@/components/analytics/analytics-actions";
import { AnalyticsChart } from "@/components/analytics/analytics-chart";
import { AnalyticsKPIGrid } from "@/components/analytics/analytics-kpi";
import { ClientAnalysisTable } from "@/components/analytics/client-analysis-table";
import { PredictiveAnalytics } from "@/components/analytics/predictive-analytics";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { TerminalCommandLine } from "@/components/ui/terminal-command-line";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

interface AnalyticsStats {
  revenueGrowth: number;
  collectionRate: number;
  avgPaymentTime: number;
  clientRetention: number;
  invoiceAccuracy: number;
  profitMargin: number;
}

interface ChartData {
  month: string;
  value: number;
  displayValue: string;
}

interface ClientSegment {
  segment: string;
  revenueShare: number;
  growthRate: number;
  paymentBehavior: string;
  riskScore: "LOW" | "MEDIUM" | "HIGH";
  trend: "GROWING" | "STABLE" | "DECLINING";
}

interface PredictiveData {
  nextMonthRevenue: { value: string; confidence: string };
  churnRiskClients: { value: number; potentialLoss: string };
  latePaymentRisk: { value: string; invoicesAtRisk: number };
  growthOpportunity: { value: string; expansionTargets: number };
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [commandOutput, setCommandOutput] = useState(
    "✓ Analytics model executed successfully. Confidence interval: 85.2%"
  );

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock analytics data - replace with actual tRPC queries
  const mockAnalyticsStats: AnalyticsStats = {
    revenueGrowth: 23.4,
    collectionRate: 94.7,
    avgPaymentTime: 18.3,
    clientRetention: 87.2,
    invoiceAccuracy: 99.1,
    profitMargin: 31.8,
  };

  const mockChartData: ChartData[] = [
    { month: "Jan", value: 60, displayValue: "$24.5K" },
    { month: "Feb", value: 75, displayValue: "$31.2K" },
    { month: "Mar", value: 45, displayValue: "$18.7K" },
    { month: "Apr", value: 90, displayValue: "$37.8K" },
    { month: "May", value: 85, displayValue: "$35.4K" },
    { month: "Jun", value: 100, displayValue: "$42.1K" },
    { month: "Jul", value: 95, displayValue: "$39.9K" },
    { month: "Aug", value: 110, displayValue: "$46.3K" },
    { month: "Sep", value: 120, displayValue: "$50.7K" },
    { month: "Oct", value: 105, displayValue: "$44.2K" },
    { month: "Nov", value: 130, displayValue: "$54.8K" },
    { month: "Dec", value: 125, displayValue: "$52.3K" },
  ];

  const mockClientSegments: ClientSegment[] = [
    {
      segment: "ENTERPRISE",
      revenueShare: 47.3,
      growthRate: 18.2,
      paymentBehavior: "22.1 days avg",
      riskScore: "LOW",
      trend: "GROWING",
    },
    {
      segment: "SMB",
      revenueShare: 31.7,
      growthRate: 12.4,
      paymentBehavior: "15.8 days avg",
      riskScore: "MEDIUM",
      trend: "GROWING",
    },
    {
      segment: "STARTUP",
      revenueShare: 15.2,
      growthRate: 28.7,
      paymentBehavior: "12.3 days avg",
      riskScore: "MEDIUM",
      trend: "GROWING",
    },
    {
      segment: "FREELANCER",
      revenueShare: 5.8,
      growthRate: -3.1,
      paymentBehavior: "28.4 days avg",
      riskScore: "HIGH",
      trend: "DECLINING",
    },
  ];

  const mockPredictiveData: PredictiveData = {
    nextMonthRevenue: { value: "$58.2K", confidence: "87.3%" },
    churnRiskClients: { value: 3, potentialLoss: "$12.4K" },
    latePaymentRisk: { value: "12.7%", invoicesAtRisk: 7 },
    growthOpportunity: { value: "$23.1K", expansionTargets: 5 },
  };

  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleRunAnalysis = async () => {
    setIsRunningAnalysis(true);
    setLastCommand("Rscript analytics.r --model=predictive --timeframe=30d");
    setCommandOutput("⚡ Running advanced analytics models...");

    // Simulate analysis time
    setTimeout(() => {
      setCommandOutput(
        "✓ Analysis complete. Updated KPIs and predictions available."
      );
      setIsRunningAnalysis(false);
    }, 3000);
  };

  const analyticsActions = [
    {
      label: "RUN_ANALYSIS",
      onClick: handleRunAnalysis,
      variant: "primary" as const,
      disabled: isRunningAnalysis,
    },
    {
      label: "EXPORT_REPORT",
      onClick: () => console.log("Export report"),
      variant: "default" as const,
    },
    {
      label: "SCHEDULE_ANALYSIS",
      onClick: () => console.log("Schedule analysis"),
      variant: "default" as const,
    },
    {
      label: "CONFIGURE_ALERTS",
      onClick: () => console.log("Configure alerts"),
      variant: "default" as const,
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
      actions={<AnalyticsActionBar actions={analyticsActions} />}
      title="ADVANCED_ANALYTICS.R"
    >
      {/* KPI Dashboard */}
      <TerminalWindow className="mb-6" title="KPI_DASHBOARD.R">
        <div className="p-5">
          <AnalyticsKPIGrid stats={mockAnalyticsStats} />
        </div>
      </TerminalWindow>

      {/* Revenue Trend Analysis */}
      <TerminalWindow className="mb-6" title="REVENUE_ANALYSIS.R">
        <div className="p-5">
          <AnalyticsChart data={mockChartData} title="MONTHLY_REVENUE_TREND" />
        </div>
      </TerminalWindow>

      {/* Client Analysis */}
      <TerminalWindow className="mb-6" title="CLIENT_ANALYSIS.R">
        <div className="p-5">
          <ClientAnalysisTable segments={mockClientSegments} />
        </div>
      </TerminalWindow>

      {/* Predictive Analytics */}
      <TerminalWindow className="mb-6" title="PREDICTIVE_MODEL.R">
        <div className="p-5">
          <PredictiveAnalytics data={mockPredictiveData} />
        </div>
      </TerminalWindow>

      {/* Command Line */}
      <TerminalCommandLine
        command={lastCommand}
        isRunning={isRunningAnalysis}
        output={commandOutput}
      />
    </DashboardPage>
  );
}
