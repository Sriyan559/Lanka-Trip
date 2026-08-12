import React, { Suspense } from "react";
import { AN04SalesRevenueDashboard } from "@/components/admin/analytics/AN04SalesRevenueDashboard";

export const metadata = {
  title: "Analytics & Business Intelligence | SL Beauty Enterprise Admin",
  description:
    "Monitor marketplace growth, revenue, operations, customer behaviour, compliance and risk across the SL Beauty ecosystem.",
};

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading Analytics Dashboard...</div>}>
      <AN04SalesRevenueDashboard />
    </Suspense>
  );
}
