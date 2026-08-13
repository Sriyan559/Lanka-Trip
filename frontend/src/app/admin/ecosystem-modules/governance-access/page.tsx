import { GovernanceAccessWorkspace } from "@/components/admin/ecosystem-modules/governance-access/GovernanceAccessWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Governance, Access, Security & Policy Control | SL Beauty Enterprise Admin",
  description:
    "Central governance for identity, access, security posture, and policy control across the SL Beauty enterprise.",
};

export default function GovernanceAccessPage() {
  return <GovernanceAccessWorkspace />;
}
