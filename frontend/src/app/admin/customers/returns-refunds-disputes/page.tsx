import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  RETURNS_KPIS,
  RETURNS_TABS,
  RETURNS_HEALTH,
  RETURNS_BOTTOM_CARDS,
  RETURNS_LIFECYCLE,
  RETURNS_RIGHT_RAIL,
} from "@/data/customers/returnsRefundsDisputes";

export const metadata: Metadata = {
  title: "Returns, Refunds & Disputes | SL Beauty Admin",
  description: "Manage customer return requests, refund processing, dispute resolution, evidence collection, and SLA compliance across the SL Beauty marketplace.",
};

export default function CustomerReturnsRefundsDisputesPage() {
  return (
    <CustomerModuleView
      config={{
        pageTitle: "Returns, Refunds & Disputes",
        pageSubtitle: "Manage return requests, refund processing, dispute resolution, evidence collection, and SLA compliance across all customer case types.",
        breadcrumbCurrent: "Returns, Refunds & Disputes",
        primaryActionLabel: "+ Open New Case",
        customerScope: "Returns & Dispute Operations",

        kpis: RETURNS_KPIS,
        tabs: RETURNS_TABS,

        healthTitle: "Returns & Dispute Operations Health",
        healthItems: RETURNS_HEALTH,

        operationCards: RETURNS_BOTTOM_CARDS,
        lifecycleNodes: RETURNS_LIFECYCLE,
        lifecycleTitle: "Return & Refund Case Lifecycle",

        rightRail: RETURNS_RIGHT_RAIL,
      }}
    />
  );
}
