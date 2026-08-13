import { TenantAssignmentWorkspace } from "@/components/admin/ecosystem-modules/assignment/TenantAssignmentWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Tenant & Ecosystem Module Assignment | SL Beauty Enterprise Admin",
  description:
    "Manage tenant module assignments, inheritance, production eligibility across tenant and ecosystem scopes.",
};

export default function TenantAssignmentPage() {
  return <TenantAssignmentWorkspace />;
}
