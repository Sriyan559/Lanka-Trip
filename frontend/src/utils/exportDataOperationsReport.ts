import { CatalogueDataJob } from "@/types/importExport";

export function exportDataOperationsReport(jobs: CatalogueDataJob[]) {
  const headers = [
    "Job ID",
    "Operation Type",
    "File / Template",
    "Source",
    "Scope",
    "Submitted By",
    "Records",
    "Mapping %",
    "Validation Status",
    "Duplicates",
    "Approval Status",
    "Execution Status",
    "Outcome",
    "Updated At",
  ];

  const rows = jobs.map((job) => [
    job.id,
    job.operationType,
    `"${job.fileName.replace(/"/g, '""')}"`,
    `"${job.source.replace(/"/g, '""')}"`,
    `"${job.scope.replace(/"/g, '""')}"`,
    `"${job.submittedBy.replace(/"/g, '""')}"`,
    job.recordsCount,
    `${job.mappingPercentage}%`,
    job.validationStatus,
    job.duplicatesCount,
    job.approvalStatus,
    job.executionStatus,
    job.outcome,
    `"${job.updatedAt}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `catalogue_data_operations_report_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
