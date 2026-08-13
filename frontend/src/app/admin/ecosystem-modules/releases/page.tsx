import { ReleaseWorkspace } from "@/components/admin/ecosystem-modules/releases/ReleaseWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Versions, Releases & Environment Management | SL Beauty Enterprise Admin",
  description:
    "Ecosystem-wide version governance, release candidates, environment promotion, production readiness, approvals, rollback plans, migrations, and deployment impact.",
};

export default function ReleasesPage() {
  return <ReleaseWorkspace />;
}
