import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  RISK_KPIS,
  RISK_TABS,
  RISK_HEALTH,
  RISK_BOTTOM_CARDS,
  RISK_LIFECYCLE,
  RISK_RIGHT_RAIL,
} from "@/data/customers/riskRestrictions";

export const metadata: Metadata = {
  title: "Risk, Restrictions & Fraud Signals | SL Beauty Admin",
  description: "Monitor customer risk profiles, fraud signals, account restrictions, blacklist management, and suspicious activity patterns across the SL Beauty marketplace.",
};

export default function CustomerRiskRestrictionsPage() {
  return (
    <CustomerModuleView
      module="risk-restrictions"
      config={{
        pageTitle: "Risk, Restrictions & Fraud Signals",
        pageSubtitle: "Monitor customer risk profiles, fraud detection signals, account restrictions, blacklist management, and suspicious activity across all customer segments.",
        breadcrumbCurrent: "Risk & Restrictions",
        primaryActionLabel: "+ Add Risk Flag",
        customerScope: "Risk & Fraud Operations",

        kpis: RISK_KPIS,
        tabs: RISK_TABS,

        healthTitle: "Risk & Fraud Control Health",
        healthItems: RISK_HEALTH,

        operationCards: RISK_BOTTOM_CARDS,
        lifecycleNodes: RISK_LIFECYCLE,
        lifecycleTitle: "Customer Risk Assessment Lifecycle",

        rightRail: RISK_RIGHT_RAIL,
      }}
    />
  );
}
