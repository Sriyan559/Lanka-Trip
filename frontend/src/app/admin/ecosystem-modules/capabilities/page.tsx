import { CapabilityAssignmentWorkspace } from "@/components/admin/ecosystem-modules/capabilities/CapabilityAssignmentWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Business Unit & Channel Capability Assignment | SL Beauty Enterprise Admin",
  description:
    "Govern capability availability across business units and channels, manage inherited access and controlled overrides.",
};

export default function CapabilityAssignmentPage() {
  return <CapabilityAssignmentWorkspace />;
}
