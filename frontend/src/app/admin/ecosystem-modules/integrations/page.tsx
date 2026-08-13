import { IntegrationWorkspace } from "@/components/admin/ecosystem-modules/integrations/IntegrationWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Integrations, Services & External Providers | SL Beauty Enterprise Admin",
  description:
    "Govern internal services, ecosystem integrations, third-party providers, authentication, availability, SLA, security, compliance, fallback and regional readiness across modules and environments.",
};

export default function IntegrationsPage() {
  return <IntegrationWorkspace />;
}
