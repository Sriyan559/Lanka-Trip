import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  LOYALTY_KPIS,
  LOYALTY_TABS,
  LOYALTY_HEALTH,
  LOYALTY_BOTTOM_CARDS,
  LOYALTY_LIFECYCLE,
  LOYALTY_RIGHT_RAIL,
} from "@/data/customers/loyalty";

export const metadata: Metadata = {
  title: "Loyalty, Rewards & Membership | SL Beauty Admin",
  description: "Manage customer loyalty program tiers, point balances, redemptions, membership levels, and rewards analytics across the SL Beauty marketplace.",
};

export default function CustomerLoyaltyPage() {
  return (
    <CustomerModuleView
      config={{
        pageTitle: "Loyalty, Rewards & Membership",
        pageSubtitle: "Manage loyalty program tiers, point balances, redemptions, membership levels, rewards campaigns, and retention analytics across all customer segments.",
        breadcrumbCurrent: "Loyalty, Rewards & Membership",
        primaryActionLabel: "+ Award Points",
        customerScope: "Loyalty & Membership Operations",

        kpis: LOYALTY_KPIS,
        tabs: LOYALTY_TABS,

        healthTitle: "Loyalty Program Health",
        healthItems: LOYALTY_HEALTH,

        operationCards: LOYALTY_BOTTOM_CARDS,
        lifecycleNodes: LOYALTY_LIFECYCLE,
        lifecycleTitle: "Customer Loyalty Lifecycle",

        rightRail: LOYALTY_RIGHT_RAIL,
      }}
    />
  );
}
