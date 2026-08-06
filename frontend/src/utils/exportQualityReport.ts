import { CatalogueQualityIssue } from "@/types/catalogueQuality";

export function exportQualityReportCSV(issues: CatalogueQualityIssue[]): void {
  const headers = [
    "Case ID",
    "Issue Type",
    "Entity / Product",
    "Public ID / SKU",
    "Brand",
    "Category",
    "Channels",
    "Severity",
    "Business Impact",
    "Owner",
    "SLA",
    "Status",
    "Updated At",
  ];

  const rows = issues.map((item) => [
    `"${item.caseId}"`,
    `"${item.issueType}"`,
    `"${item.entityName.replace(/"/g, '""')}"`,
    `"${item.publicId} / ${item.sku}"`,
    `"${item.brand}"`,
    `"${item.category}"`,
    `"${item.channels.join("; ")}"`,
    `"${item.severity}"`,
    `"${item.businessImpact}"`,
    `"${item.owner}"`,
    `"${item.sla}"`,
    `"${item.status}"`,
    `"${item.updatedAt}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `catalogue_quality_report_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
