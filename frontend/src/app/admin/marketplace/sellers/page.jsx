import { Suspense } from "react";
import { SellerMarketplacePerformanceView } from "@/components/admin/marketplace/sellers/SellerMarketplacePerformanceView";

export default function MarketplaceSellersPage() {
  return <Suspense fallback={<div aria-busy="true">Loading seller performance…</div>}><SellerMarketplacePerformanceView /></Suspense>;
}
