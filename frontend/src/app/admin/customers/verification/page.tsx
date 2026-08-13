import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  VERIFICATION_KPIS,
  VERIFICATION_TABS,
  VERIFICATION_HEALTH,
  VERIFICATION_BOTTOM_CARDS,
  VERIFICATION_LIFECYCLE,
  VERIFICATION_RIGHT_RAIL,
} from "@/data/customers/verification";

export const metadata: Metadata = {
  title: "Customer Identity & Verification | SL Beauty Admin",
  description: "Manage customer identity verification workflows, document checks, evidence readiness, and decision queues across the SL Beauty marketplace.",
};

export default function CustomerVerificationPage() {
  return (
    <CustomerModuleView
      module="verification"
      config={{
        pageTitle: "Customer Identity & Verification",
        pageSubtitle: "Manage customer identity verification workflows, document authentication, duplicate control, and evidence readiness across all customer segments.",
        breadcrumbCurrent: "Identity & Verification",
        primaryActionLabel: "+ Start Verification",
        customerScope: "Verification Operations",

        kpis: VERIFICATION_KPIS,
        tabs: VERIFICATION_TABS,

        healthTitle: "Identity Verification Health",
        healthItems: VERIFICATION_HEALTH,

        operationCards: VERIFICATION_BOTTOM_CARDS,
        lifecycleNodes: VERIFICATION_LIFECYCLE,
        lifecycleTitle: "Identity Verification Lifecycle",

        rightRail: VERIFICATION_RIGHT_RAIL,
      }}
    />
  );
}
