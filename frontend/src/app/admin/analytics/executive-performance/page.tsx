import React, { Suspense } from "react";
import { AN02ExecutivePerformanceDashboard } from "@/components/admin/analytics/AN02ExecutivePerformanceDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "AN02 — Executive Performance & Enterprise KPI Analytics | SL Beauty Enterprise Admin",
  description:
    "Executive performance overview, strategic scorecard, commercial performance, forecast snapshot and enterprise health analytics across SL Beauty ecosystem.",
};

export default function ExecutivePerformancePage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Executive Performance Dashboard..." />}>
      <AN02ExecutivePerformanceDashboard />
    </Suspense>
  );
}
