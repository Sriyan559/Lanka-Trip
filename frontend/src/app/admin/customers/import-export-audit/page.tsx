import { Metadata } from "next";
import { CustomerModuleView } from "@/components/admin/customers/CustomerModuleView";
import {
  IMPORT_EXPORT_KPIS,
  IMPORT_EXPORT_TABS,
  IMPORT_EXPORT_HEALTH,
  IMPORT_EXPORT_BOTTOM_CARDS,
  IMPORT_EXPORT_RIGHT_RAIL,
} from "@/data/customers/importExportAudit";

export const metadata: Metadata = {
  title: "Import, Export & Audit | SL Beauty Admin",
  description: "Manage customer data import and export operations, audit trail tracking, data quality validation, and compliance reporting for the SL Beauty platform.",
};

export default function CustomerImportExportAuditPage() {
  return (
    <CustomerModuleView
      config={{
        pageTitle: "Import, Export & Audit",
        pageSubtitle: "Manage customer data import and export operations, batch job tracking, audit trail review, data quality validation, and compliance reporting.",
        breadcrumbCurrent: "Import, Export & Audit",
        primaryActionLabel: "+ New Import Job",
        customerScope: "Data Import, Export & Audit Operations",

        kpis: IMPORT_EXPORT_KPIS,
        tabs: IMPORT_EXPORT_TABS,

        healthTitle: "Data Operations & Audit Health",
        healthItems: IMPORT_EXPORT_HEALTH,

        operationCards: IMPORT_EXPORT_BOTTOM_CARDS,

        rightRail: IMPORT_EXPORT_RIGHT_RAIL,
      }}
    />
  );
}
