"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  generateReportCommand,
  generateReportOutput,
  ReportCommandLine,
} from "@/components/reports/command-line";
import {
  createReportActions,
  getDateRangePresets,
  ReportActionBar,
} from "@/components/reports/report-actions";
import {
  createReportCards,
  ReportCardsGrid,
} from "@/components/reports/report-card";
import {
  generateChartData,
  generateSummaryData,
  RevenueChart,
  SummaryTable,
} from "@/components/reports/revenue-chart";
import { DashboardPage } from "@/components/templates/dashboard-page";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import "@/components/reports/reports.css";

interface ReportStats {
  totalRevenue: number;
  activeClients: number;
  outstandingAmount: number;
  taxCollected: number;
  paymentSuccessRate: number;
  projectedRevenue: number;
}

export default function ReportsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [dateRange, setDateRange] = useState(getDateRangePresets().thisMonth);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>("");
  const [lastOutput, setLastOutput] = useState<string>("");

  const privateData = useQuery(trpc.privateData.queryOptions());

  // Mock data for reports - replace with actual tRPC queries later
  const mockStats: ReportStats = {
    totalRevenue: 567_890,
    activeClients: 247,
    outstandingAmount: 89_450,
    taxCollected: 48_270,
    paymentSuccessRate: 98.7,
    projectedRevenue: 678_920,
  };

  // Authentication check
  useEffect(() => {
    if (!(session || isPending)) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    const command = generateReportCommand("revenue", "monthly", "json");
    setLastCommand(command);
    setLastOutput("");

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setLastOutput(generateReportOutput("revenue"));
    }, 2000);
  };

  const handleExportPDF = () => {
    setIsGenerating(true);
    const command =
      "export --format=pdf --output=report_" +
      new Date().toISOString().split("T")[0] +
      ".pdf";
    setLastCommand(command);
    setLastOutput("");

    setTimeout(() => {
      setIsGenerating(false);
      setLastOutput(
        "✓ Export completed: report_" +
          new Date().toISOString().split("T")[0] +
          ".pdf"
      );
    }, 1500);
  };

  const handleScheduleReport = () => {
    setLastCommand(
      "schedule --report=revenue --frequency=monthly --email=admin@company.com"
    );
    setLastOutput(
      "✓ Report scheduled successfully. Next run: " +
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    );
  };

  const handleEmailReport = () => {
    setLastCommand(
      "email --report=revenue --recipients=admin@company.com,finance@company.com"
    );
    setLastOutput("✓ Report emailed successfully to 2 recipients");
  };

  const handleReportClick = (reportType: string) => {
    setLastCommand(generateReportCommand(reportType));
    setLastOutput(`✓ Opening ${reportType.toUpperCase()} report...`);
  };

  const reportActions = createReportActions({
    onGenerateReport: handleGenerateReport,
    onExportPDF: handleExportPDF,
    onScheduleReport: handleScheduleReport,
    onEmailReport: handleEmailReport,
  });

  const reportCards = createReportCards(mockStats);
  const chartData = generateChartData();
  const summaryData = generateSummaryData();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardPage
      actions={
        <ReportActionBar
          actions={reportActions}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      }
      title="REPORTS_ANALYTICS.SQL"
    >
      {/* Quick Reports Grid */}
      <TerminalWindow className="mb-6" title="QUICK_REPORTS.CFG">
        <div className="p-5">
          <div className="stagger-animation">
            <ReportCardsGrid
              onReportClick={handleReportClick}
              reports={reportCards}
            />
          </div>
        </div>
      </TerminalWindow>

      {/* Revenue Chart */}
      <TerminalWindow className="mb-6" title="REVENUE_CHART.DATA">
        <div className="p-5">
          <RevenueChart className="mb-4" data={chartData} />
          <SummaryTable data={summaryData} />
        </div>
      </TerminalWindow>

      {/* Command Line */}
      <ReportCommandLine
        isGenerating={isGenerating}
        lastCommand={lastCommand}
        lastOutput={lastOutput}
      />
    </DashboardPage>
  );
}
