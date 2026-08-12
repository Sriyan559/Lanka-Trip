import React, { Suspense } from "react";
import { AN05CustomersSegmentsDashboard } from "@/components/admin/analytics/AN05CustomersSegmentsDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Customer, Segment, Retention & Lifetime Value Analytics | SL Beauty Enterprise Admin",
  description:
    "Comprehensive customer analytics across value, retention, churn, loyalty, acquisition quality, service impact, and forecasting.",
};

export default function CustomersSegmentsPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Customers & Segments Dashboard..." />}>
      <AN05CustomersSegmentsDashboard />
    </Suspense>
  );
}
