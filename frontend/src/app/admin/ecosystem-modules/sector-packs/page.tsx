import { SectorPackWorkspace } from "@/components/admin/ecosystem-modules/sector-packs/SectorPackWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Sector Packs & Capability Bundles | SL Beauty Enterprise Admin",
  description:
    "Create, compose, version, and release sector packs with modular capability bundles, compatibility, and tenant overrides.",
};

export default function SectorPacksPage() {
  return <SectorPackWorkspace />;
}
