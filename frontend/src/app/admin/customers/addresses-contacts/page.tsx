import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  ADDRESSES_KPIS,
  ADDRESSES_TABS,
  ADDRESSES_HEALTH,
  ADDRESSES_BOTTOM_CARDS,
  ADDRESSES_LIFECYCLE,
  ADDRESSES_RIGHT_RAIL,
} from "@/data/customers/addressesContacts";

export const metadata: Metadata = {
  title: "Customer Addresses & Contacts | SL Beauty Admin",
  description: "Manage customer contact records, address validation, email and phone verification, revalidation queues, and contact data quality across all customer segments.",
};

export default function CustomerAddressesContactsPage() {
  return (
    <CustomerModuleView
      module="addresses-contacts"
      config={{
        pageTitle: "Customer Addresses & Contacts",
        pageSubtitle: "Manage customer contact records, email and phone verification, address validation, revalidation queues, and data quality across all customer segments.",
        breadcrumbCurrent: "Addresses & Contacts",
        primaryActionLabel: "+ Add Contact Record",
        customerScope: "Contact & Address Operations",

        kpis: ADDRESSES_KPIS,
        tabs: ADDRESSES_TABS,

        healthTitle: "Contact & Address Data Health",
        healthItems: ADDRESSES_HEALTH,

        operationCards: ADDRESSES_BOTTOM_CARDS,
        lifecycleNodes: ADDRESSES_LIFECYCLE,
        lifecycleTitle: "Customer Contact Lifecycle",

        rightRail: ADDRESSES_RIGHT_RAIL,
      }}
    />
  );
}
