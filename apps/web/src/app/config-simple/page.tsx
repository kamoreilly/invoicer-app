"use client";

import { DashboardPage } from "@/components/templates/dashboard-page";

export default function ConfigSimplePage() {
  return (
    <DashboardPage title="SYSTEM_CONFIG.INI">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Configuration Settings</h2>
        <p className="mb-4">This is a simplified config page to test if the basic structure works.</p>

        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Config page is loading successfully!
        </div>

        <div className="mt-6 space-y-4">
          <div className="border border-landing-border p-4 rounded bg-landing-surface">
            <h3 className="font-semibold mb-2 text-landing-accent">General Settings</h3>
            <div className="space-y-1 text-landing-text">
              <p>Company Name: Invoicer App Solutions</p>
              <p>Currency: USD</p>
              <p>Timezone: UTC</p>
              <p>Date Format: YYYY-MM-DD</p>
            </div>
          </div>

          <div className="border border-landing-border p-4 rounded bg-landing-surface">
            <h3 className="font-semibold mb-2 text-landing-accent">Invoice Settings</h3>
            <div className="space-y-1 text-landing-text">
              <p>Invoice Prefix: INV-</p>
              <p>Next Invoice Number: 1000</p>
              <p>Payment Terms: 30 days</p>
              <p>Default Tax Rate: 8.5%</p>
            </div>
          </div>

          <div className="border border-landing-border p-4 rounded bg-landing-surface">
            <h3 className="font-semibold mb-2 text-landing-accent">System Status</h3>
            <div className="space-y-1 text-landing-text">
              <p>Database: ✅ Connected</p>
              <p>Email Service: ✅ Operational</p>
              <p>Backup Service: ⚠️ Running</p>
              <p>Payment Gateway: 🔧 Maintenance</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
