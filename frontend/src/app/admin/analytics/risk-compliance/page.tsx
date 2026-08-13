import React, { Suspense } from "react";
import { AN13RiskComplianceDashboard } from "@/components/admin/analytics/AN13RiskComplianceDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Risk, Compliance, Fraud & Governance Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze enterprise risk exposure, compliance performance, fraud indicators, policy effectiveness, control health, regulatory issues and governance exceptions.",
};

export default function RiskCompliancePage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Risk & Compliance Analytics Dashboard..." />}>
      <AN13RiskComplianceDashboard />
    </Suspense>
  );
}
