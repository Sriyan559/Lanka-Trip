import { ReportsAuditWorkspace } from "@/components/admin/ecosystem-modules/reports-audit/ReportsAuditWorkspace";
import "../ecosystem.css";

export const metadata = {
  title: "Reports, Audit, Export & Ecosystem Change History | SL Beauty Enterprise Admin",
  description:
    "Review ecosystem-wide audit records, historical changes, configuration lineage, reports, evidence, export activity and governance history across modules, tenants, environments and administrators.",
};

export default function ReportsAuditPage() {
  return <ReportsAuditWorkspace />;
}
