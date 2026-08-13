import { ModuleHealthWorkspace } from "@/components/admin/ecosystem-modules/health-adoption/ModuleHealthWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Module Health, Performance & Adoption | SL Beauty Enterprise Admin",
  description:
    "Monitors operational health, performance, reliability, tenant usage, feature utilization, and adoption across ecosystem modules, business units, channels, and environments.",
};

export default function HealthAdoptionPage() {
  return <ModuleHealthWorkspace />;
}
