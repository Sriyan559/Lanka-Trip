import React, { Suspense } from "react";
import { AN14ForecastingIntelligenceDashboard } from "@/components/admin/analytics/AN14ForecastingIntelligenceDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Forecasting, Intelligence & Enterprise Planning Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze forward-looking enterprise performance, demand, financial outcomes, capacity constraints, scenarios and planning risks across the retail ecosystem.",
};

export default function ForecastingIntelligencePage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Forecasting & Intelligence Dashboard..." />}>
      <AN14ForecastingIntelligenceDashboard />
    </Suspense>
  );
}
