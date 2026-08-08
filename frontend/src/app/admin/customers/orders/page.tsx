import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  ORDERS_KPIS,
  ORDERS_TABS,
  ORDERS_HEALTH,
  ORDERS_BOTTOM_CARDS,
  ORDERS_LIFECYCLE,
  ORDERS_RIGHT_RAIL,
} from "@/data/customers/orders";

export const metadata: Metadata = {
  title: "Customer Orders & Purchase History | SL Beauty Admin",
  description: "Monitor customer order activity, purchase history, payment status, fulfilment, and purchase behaviour analytics across the SL Beauty marketplace.",
};

export default function CustomerOrdersPage() {
  return (
    <CustomerModuleView
      config={{
        pageTitle: "Customer Orders & Purchase History",
        pageSubtitle: "Monitor order activity, purchase frequency, payment reliability, fulfilment status, and lifetime value analytics across all customer segments.",
        breadcrumbCurrent: "Orders & Purchase History",
        primaryActionLabel: "+ Create Manual Order",
        customerScope: "Purchase & Order Operations",

        kpis: ORDERS_KPIS,
        tabs: ORDERS_TABS,

        healthTitle: "Purchase & Order Health",
        healthItems: ORDERS_HEALTH,

        operationCards: ORDERS_BOTTOM_CARDS,
        lifecycleNodes: ORDERS_LIFECYCLE,
        lifecycleTitle: "Customer Order Lifecycle",

        rightRail: ORDERS_RIGHT_RAIL,
      }}
    />
  );
}
