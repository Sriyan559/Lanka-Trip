import { ModuleRegistryWorkspace } from "@/components/admin/ecosystem-modules/registry/ModuleRegistryWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Module Registry & Catalogue | SL Beauty Enterprise Admin",
  description:
    "Centralized registry of all ecosystem modules, their metadata, dependencies, integrations, security, compliance and status across the ecosystem.",
};

export default function ModuleRegistryPage() {
  return <ModuleRegistryWorkspace />;
}
