import React, { Suspense } from "react";
import { AN11FinanceProfitabilityDashboard } from "@/components/admin/analytics/AN11FinanceProfitabilityDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Finance, Profitability, Cash Flow & Reconciliation Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze profitability, cash flow, receivables, payables, settlements, working capital, margin, capital and financial control health across the retail ecosystem.",
};

export default function FinanceProfitabilityPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Finance & Profitability Dashboard..." />}>
      <AN11FinanceProfitabilityDashboard />
    </Suspense>
  );
}
