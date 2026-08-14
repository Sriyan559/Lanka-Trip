import { LiveDependencyWorkspace } from "@/components/admin/ecosystem-modules/LiveControlsWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Module Dependencies & Compatibility Map | SL Beauty Enterprise Admin",
  description:
    "Visualize module, capability, service, and sector pack dependency relationships, compatibility, version conflicts, and upgrade impact.",
};

export default function DependenciesPage() {
  return <LiveDependencyWorkspace />;
}
