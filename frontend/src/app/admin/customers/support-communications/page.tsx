import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  SUPPORT_KPIS,
  SUPPORT_TABS,
  SUPPORT_HEALTH,
  SUPPORT_BOTTOM_CARDS,
  SUPPORT_LIFECYCLE,
  SUPPORT_RIGHT_RAIL,
} from "@/data/customers/supportCommunications";

export const metadata: Metadata = {
  title: "Support & Communication History | SL Beauty Admin",
  description: "Manage customer support cases, communication logs, CSAT scores, resolution timelines, escalation queues, and service quality metrics across the SL Beauty platform.",
};

export default function CustomerSupportCommunicationsPage() {
  return (
    <CustomerModuleView
      config={{
        pageTitle: "Support & Communication History",
        pageSubtitle: "Manage customer support cases, communication logs, CSAT scores, resolution timelines, escalation queues, and service quality across all channels.",
        breadcrumbCurrent: "Support & Communications",
        primaryActionLabel: "+ Open Support Case",
        customerScope: "Support & Communication Operations",

        kpis: SUPPORT_KPIS,
        tabs: SUPPORT_TABS,

        healthTitle: "Support & Service Quality Health",
        healthItems: SUPPORT_HEALTH,

        operationCards: SUPPORT_BOTTOM_CARDS,
        lifecycleNodes: SUPPORT_LIFECYCLE,
        lifecycleTitle: "Customer Support Case Lifecycle",

        rightRail: SUPPORT_RIGHT_RAIL,
      }}
    />
  );
}
