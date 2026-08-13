import { DependencyMapPage } from "@/components/admin/ecosystem-modules/dependencies/DependencyMapPage";
import "../ecosystem.css";

export const metadata = {
  title: "Module Dependencies & Compatibility Map | SL Beauty Enterprise Admin",
  description:
    "Visualize module, capability, service, and sector pack dependency relationships, compatibility, version conflicts, and upgrade impact.",
};

export default function DependenciesPage() {
  return <DependencyMapPage />;
}
