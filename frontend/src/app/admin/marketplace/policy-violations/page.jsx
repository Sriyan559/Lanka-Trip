import {Suspense} from "react";
import MarketplacePolicyViolationsView from "@/components/admin/marketplace/policy-violations/MarketplacePolicyViolationsView";

export default function MarketplacePolicyViolationsPage() {
  return <Suspense fallback={<div aria-busy="true">Loading policy cases...</div>}><MarketplacePolicyViolationsView/></Suspense>;
}
