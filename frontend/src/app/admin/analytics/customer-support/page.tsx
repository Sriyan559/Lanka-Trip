import React, { Suspense } from "react";
import { AN12CustomerSupportAnalyticsDashboard } from "@/components/admin/analytics/AN12CustomerSupportAnalyticsDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Customer Support, Service & Experience Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze support demand, service performance, customer satisfaction, queue health, agent productivity, quality, service recovery and customer-experience outcomes across the retail ecosystem.",
};

export default function CustomerSupportAnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Customer Support Analytics Dashboard..." />}>
      <AN12CustomerSupportAnalyticsDashboard />
    </Suspense>
  );
}
