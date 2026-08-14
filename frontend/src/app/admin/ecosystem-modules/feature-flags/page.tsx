import { LiveFeatureFlagWorkspace } from "@/components/admin/ecosystem-modules/LiveControlsWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Feature Flags, Rollouts & Controlled Enablement | SL Beauty Enterprise Admin",
  description:
    "Govern feature flags, progressive rollouts, pilot exposure, production enablement, rollback readiness and emergency controls across the ecosystem.",
};

export default function FeatureFlagsPage() {
  return <LiveFeatureFlagWorkspace />;
}
