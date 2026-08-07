import {Suspense} from "react";
import {MarketplaceCommissionManagementView} from "@/components/admin/marketplace/commissions/MarketplaceCommissionManagementView";
export default function MarketplaceCommissionsPage(){return <Suspense fallback={<div aria-busy="true">Loading commissions...</div>}><MarketplaceCommissionManagementView/></Suspense>}
