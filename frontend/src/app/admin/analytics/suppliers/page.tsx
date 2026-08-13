import React, { Suspense } from "react";
import { AN08SuppliersDashboard } from "@/components/admin/analytics/AN08SuppliersDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Supplier & Procurement Analytics | SL Beauty Enterprise Admin",
  description:
    "Comprehensive supplier, procurement, cost, quality, SLA, dependency analytics, efficient and strategic sourcing.",
};

export default function SuppliersPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Suppliers & Procurement Dashboard..." />}>
      <AN08SuppliersDashboard />
    </Suspense>
  );
}
