import React, { Suspense } from "react";
import { AN06MarketplaceSellersDashboard } from "@/components/admin/analytics/AN06MarketplaceSellersDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Marketplace, Seller & Channel Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze marketplace growth, seller contribution, channel performance, listing quality, seller economics, fulfilment, risk and marketplace health across the ecosystem.",
};

export default function MarketplaceSellersPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Marketplace & Sellers Dashboard..." />}>
      <AN06MarketplaceSellersDashboard />
    </Suspense>
  );
}
