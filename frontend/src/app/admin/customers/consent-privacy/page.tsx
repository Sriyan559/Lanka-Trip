import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  CONSENT_KPIS,
  CONSENT_TABS,
  CONSENT_HEALTH,
  CONSENT_BOTTOM_CARDS,
  CONSENT_LIFECYCLE,
  CONSENT_RIGHT_RAIL,
} from "@/data/customers/consentPrivacy";

export const metadata: Metadata = {
  title: "Consent, Privacy & Preferences | SL Beauty Admin",
  description: "Manage customer consent records, data privacy preferences, marketing opt-ins, GDPR compliance, data deletion requests, and privacy operations across the SL Beauty platform.",
};

export default function CustomerConsentPrivacyPage() {
  return (
    <CustomerModuleView
      config={{
        pageTitle: "Consent, Privacy & Preferences",
        pageSubtitle: "Manage customer consent records, privacy preferences, marketing opt-ins, data deletion requests, GDPR compliance, and privacy operations across all segments.",
        breadcrumbCurrent: "Consent & Privacy",
        primaryActionLabel: "+ Record Consent",
        customerScope: "Privacy & Consent Operations",

        kpis: CONSENT_KPIS,
        tabs: CONSENT_TABS,

        healthTitle: "Consent & Privacy Compliance Health",
        healthItems: CONSENT_HEALTH,

        operationCards: CONSENT_BOTTOM_CARDS,
        lifecycleNodes: CONSENT_LIFECYCLE,
        lifecycleTitle: "Customer Consent Lifecycle",

        rightRail: CONSENT_RIGHT_RAIL,
      }}
    />
  );
}
