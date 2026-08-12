import React, { Suspense } from "react";
import { AN07ProductsBrandsDashboard } from "@/components/admin/analytics/AN07ProductsBrandsDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Product, Catalogue, Brand & Category Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze product performance, catalogue health, brand & category insights, inventory productivity and product lifecycle across the retail ecosystem.",
};

export default function ProductsBrandsPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Products & Brands Dashboard..." />}>
      <AN07ProductsBrandsDashboard />
    </Suspense>
  );
}
