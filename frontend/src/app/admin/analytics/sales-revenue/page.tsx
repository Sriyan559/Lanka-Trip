import React, { Suspense } from "react";
import { AN04SalesRevenueDashboard } from "@/components/admin/analytics/AN04SalesRevenueDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Sales, Revenue, Margin & Commercial Analytics | SL Beauty Enterprise Admin",
  description:
    "End-to-end commercial performance across channels, categories, revenue, margin, promotions, leakage, and forecast accuracy to drive growth and protect margin.",
};

export default function SalesRevenuePage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Sales & Revenue Dashboard..." />}>
      <AN04SalesRevenueDashboard />
    </Suspense>
  );
}
