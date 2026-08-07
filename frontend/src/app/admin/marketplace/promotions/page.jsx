import {Suspense} from "react";
import MarketplacePromotionsView from "@/components/admin/marketplace/promotions/MarketplacePromotionsView";

export default function MarketplacePromotionsPage(){return <Suspense fallback={<div aria-busy="true">Loading promotions…</div>}><MarketplacePromotionsView/></Suspense>}
