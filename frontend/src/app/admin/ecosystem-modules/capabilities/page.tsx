import { AssignmentWorkspace } from "@/components/admin/ecosystem-modules/assignment/AssignmentWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Business Unit & Channel Capability Assignment | SL Beauty Enterprise Admin",
  description:
    "Govern capability availability across business units and channels, manage inherited access and controlled overrides.",
};

export default function CapabilityAssignmentPage() {
  return <AssignmentWorkspace kind="capabilities" />;
}
