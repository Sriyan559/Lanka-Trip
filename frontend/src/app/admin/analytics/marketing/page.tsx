import React, { Suspense } from "react";
import { AN10MarketingDashboard } from "@/components/admin/analytics/AN10MarketingDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Marketing, Campaign, Acquisition & Attribution Analytics | SL Beauty Enterprise Admin",
  description:
    "Comprehensive marketing analytics across campaigns, channels, acquisition quality, customer retention, creative performance, budget pacing, and growth profitability.",
};

export default function MarketingPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Marketing Analytics Dashboard..." />}>
      <AN10MarketingDashboard />
    </Suspense>
  );
}
