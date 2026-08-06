import {
  CatalogueDataJob,
  DataOperationsKpi,
  FieldMappingItem,
  ValidationIssueItem,
  DuplicateConflictItem,
  ScheduledExportItem,
  ImportTemplateItem,
  ReconciliationRecordItem,
  ImportExportActivityItem,
  PriorityDataAlertItem,
} from "@/types/importExport";

export const MOCK_C13_KPIS: DataOperationsKpi[] = [
  { id: "kpi-1", seqNumber: 1, label: "Imports This Month", value: "1,248", trend: "+4.2%", trendUp: true, trendType: "positive", category: "import" },
  { id: "kpi-2", seqNumber: 2, label: "Successful Imports", value: "1,102", trend: "+3.4%", trendUp: true, trendType: "positive", category: "import" },
  { id: "kpi-3", seqNumber: 3, label: "Partial Imports", value: "96", trend: "+1.1%", trendUp: true, trendType: "warning", category: "import" },
  { id: "kpi-4", seqNumber: 4, label: "Failed Imports", value: "50", trend: "-2.6%", trendUp: false, trendType: "negative", category: "import" },
  { id: "kpi-5", seqNumber: 5, label: "Records Processed", value: "4.2M", trend: "+6.6%", trendUp: true, trendType: "positive", category: "import" },
  { id: "kpi-6", seqNumber: 6, label: "Records Rejected", value: "31,240", trend: "-3.1%", trendUp: false, trendType: "negative", category: "validation" },
  { id: "kpi-7", seqNumber: 7, label: "Mapping Issues", value: "128", trend: "+5.5%", trendUp: false, trendType: "warning", category: "validation" },
  { id: "kpi-8", seqNumber: 8, label: "Duplicate Conflicts", value: "76", trend: "-1.9%", trendUp: false, trendType: "negative", category: "review" },
  { id: "kpi-9", seqNumber: 9, label: "Exports Generated", value: "842", trend: "+2.4%", trendUp: true, trendType: "positive", category: "export" },
  { id: "kpi-10", seqNumber: 10, label: "Scheduled Exports", value: "34", trend: "+6.0%", trendUp: true, trendType: "positive", category: "export" },
  { id: "kpi-11", seqNumber: 11, label: "Export Failures", value: "9", trend: "-18.0%", trendUp: false, trendType: "negative", category: "export" },
  { id: "kpi-12", seqNumber: 12, label: "Pending Review Jobs", value: "18", trend: "+2.0%", trendUp: false, trendType: "warning", category: "review" },
];

export const MOCK_TREND_DATA = [
  { name: "Jul 6", imports: 35000, exports: 22000, processed: 52000, failures: 12000 },
  { name: "Jul 13", imports: 42000, exports: 26000, processed: 61000, failures: 11000 },
  { name: "Jul 20", imports: 48000, exports: 31000, processed: 67000, failures: 10500 },
  { name: "Jul 27", imports: 52000, exports: 34000, processed: 72000, failures: 9800 },
  { name: "Aug 3", imports: 58000, exports: 38000, processed: 78000, failures: 9200 },
];

export const MOCK_JOB_DISTRIBUTION = [
  { name: "Completed", value: 1248, percentage: 53.0, color: "#059669" },
  { name: "Pending Review", value: 312, percentage: 13.3, color: "#0284c7" },
  { name: "Failed", value: 156, percentage: 6.6, color: "#dc2626" },
  { name: "Scheduled", value: 284, percentage: 12.1, color: "#d97706" },
  { name: "Running", value: 168, percentage: 7.1, color: "#8b5cf6" },
  { name: "Draft", value: 188, percentage: 8.0, color: "#64748b" },
];

export const MOCK_DATA_JOBS: CatalogueDataJob[] = [
  {
    id: "IMP-8902",
    operationType: "Import",
    fileName: "product_master_full.csv",
    source: "Supplier Feed",
    scope: "All Products",
    submittedBy: "Elena Vance",
    recordsCount: 25430,
    recordsFormatted: "25,430",
    mappingPercentage: 92,
    validationStatus: "Validating",
    duplicatesCount: 56,
    approvalStatus: "Pending",
    executionStatus: "Queued",
    outcome: "In Progress",
    updatedAt: "04 Aug 2026, 11:27 AM",
    templateName: "Product Master CSV",
    businessUnit: "All Business Units",
    owner: "Elena Vance",
  },
  {
    id: "IMP-8898",
    operationType: "Import",
    fileName: "supplier_product_delta.csv",
    source: "Supplier Feed",
    scope: "Delta Update",
    submittedBy: "Marcus Lee",
    recordsCount: 8520,
    recordsFormatted: "8,520",
    mappingPercentage: 98,
    validationStatus: "Passed",
    duplicatesCount: 12,
    approvalStatus: "Approved",
    executionStatus: "Running",
    outcome: "In Progress",
    updatedAt: "04 Aug 2026, 10:45 AM",
    templateName: "Product Delta Update",
    businessUnit: "Beauty Marketplace",
    owner: "Marcus Lee",
  },
  {
    id: "IMP-8891",
    operationType: "Import",
    fileName: "category_update.xlsx",
    source: "Internal",
    scope: "Categories",
    submittedBy: "Priya Kapoor",
    recordsCount: 1256,
    recordsFormatted: "1,256",
    mappingPercentage: 100,
    validationStatus: "Passed",
    duplicatesCount: 0,
    approvalStatus: "Approved",
    executionStatus: "Reconciled",
    outcome: "Success",
    updatedAt: "04 Aug 2026, 09:30 AM",
    templateName: "Category Taxonomy Sync",
    businessUnit: "All Business Units",
    owner: "Priya Kapoor",
  },
  {
    id: "EXP-2216",
    operationType: "Export",
    fileName: "product_feed_nightly.csv",
    source: "Internal",
    scope: "All Products",
    submittedBy: "Elena Vance",
    recordsCount: 42160,
    recordsFormatted: "42,160",
    mappingPercentage: 100,
    validationStatus: "Passed",
    duplicatesCount: 0,
    approvalStatus: "Approved",
    executionStatus: "Delivered",
    outcome: "Success",
    updatedAt: "03 Aug 2026, 08:15 AM",
    templateName: "Nightly Product Export",
    businessUnit: "All Business Units",
    owner: "System Auto",
  },
  {
    id: "EXP-2212",
    operationType: "Export",
    fileName: "media_availability_feed.csv",
    source: "Media System",
    scope: "Media Assets",
    submittedBy: "Marcus Lee",
    recordsCount: 12450,
    recordsFormatted: "12,450",
    mappingPercentage: 95,
    validationStatus: "Passed",
    duplicatesCount: 0,
    approvalStatus: "Approved",
    executionStatus: "Failed",
    outcome: "Failed",
    updatedAt: "03 Aug 2026, 07:50 PM",
    templateName: "Media Availability Feed",
    businessUnit: "Media Hub",
    owner: "Marcus Lee",
  },
  {
    id: "IMP-8885",
    operationType: "Import",
    fileName: "brand_sync.csv",
    source: "Brand System",
    scope: "Brands",
    submittedBy: "Elena Vance",
    recordsCount: 320,
    recordsFormatted: "320",
    mappingPercentage: 91,
    validationStatus: "Warnings",
    duplicatesCount: 4,
    approvalStatus: "Pending",
    executionStatus: "Scheduled",
    outcome: "Pending",
    updatedAt: "03 Aug 2026, 06:22 PM",
    templateName: "Brand Authorization Feed",
    businessUnit: "Brand Portal",
    owner: "Elena Vance",
  },
];

export const MOCK_FIELD_MAPPINGS: FieldMappingItem[] = [
  { sourceField: "product_name", targetField: "Product Name", transformation: "Trim & Title Case", status: "Matched" },
  { sourceField: "brand_code", targetField: "Brand Code", transformation: "Normalize Case", status: "Matched" },
  { sourceField: "category_path", targetField: "Category Hierarchy", transformation: "Path Split", status: "Transformed" },
  { sourceField: "ingredient_code", targetField: "Ingredient ID", transformation: "Lookup Mapping", status: "Unmapped" },
];

export const MOCK_VALIDATION_ISSUES: ValidationIssueItem[] = [
  { id: "val-1", issueType: "Missing Category ID", count: 24, severity: "High" },
  { id: "val-2", issueType: "Invalid Ingredient Code", count: 18, severity: "High" },
  { id: "val-3", issueType: "Barcode Format Mismatch", count: 12, severity: "Medium" },
  { id: "val-4", issueType: "Duplicate SKU in File", count: 8, severity: "Medium" },
  { id: "val-5", issueType: "Restricted Ingredient Found", count: 6, severity: "High" },
];

export const MOCK_DUPLICATE_CONFLICTS: DuplicateConflictItem[] = [
  { id: "dup-1", sku: "SKU-12345", existingRecord: "Radiance Serum 30 ml", incomingRecord: "Radiance Serum - 30ml", suggestedAction: "Review", confidenceScore: 94, brand: "Estée Lauder", category: "Skincare" },
  { id: "dup-2", sku: "SKU-54321", existingRecord: "Glow Cream 50 ml", incomingRecord: "Glow Cream 50ml", suggestedAction: "Merge", confidenceScore: 98, brand: "Shiseido", category: "Skincare" },
  { id: "dup-3", sku: "SKU-98765", existingRecord: "Pure Cleanser 100 ml", incomingRecord: "Pure Cleanser 100 ml", suggestedAction: "Ignore", confidenceScore: 88, brand: "La Roche-Posay", category: "Cleansers" },
];

export const MOCK_SCHEDULED_EXPORTS: ScheduledExportItem[] = [
  { id: "sch-1", feedName: "Product Feed", frequency: "Daily 02:00 AM", destination: "Marketplace API", nextRun: "05 Aug 2026, 02:00 AM", status: "Scheduled" },
  { id: "sch-2", feedName: "Inventory Feed", frequency: "Hourly", destination: "Inventory System", nextRun: "04 Aug 2026, 01:00 PM", status: "Scheduled" },
  { id: "sch-3", feedName: "Media Availability", frequency: "Daily 01:00 AM", destination: "CDN Platform", nextRun: "05 Aug 2026, 01:00 AM", status: "Scheduled" },
  { id: "sch-4", feedName: "Price & Promo Feed", frequency: "Daily 06:00 AM", destination: "Pricing Engine", nextRun: "05 Aug 2026, 06:00 AM", status: "Scheduled" },
];

export const MOCK_IMPORT_TEMPLATES: ImportTemplateItem[] = [
  { id: "tpl-1", templateName: "Product Master CSV", type: "Import", records: "25,430", lastUsed: "04 Aug 2026", status: "Active" },
  { id: "tpl-2", templateName: "Category Taxonomy Sync", type: "Import", records: "1,256", lastUsed: "03 Aug 2026", status: "Active" },
  { id: "tpl-3", templateName: "Media Asset Bulk Upload", type: "Import", records: "12,450", lastUsed: "02 Aug 2026", status: "Active" },
  { id: "tpl-4", templateName: "Brand Authorization Feed", type: "Import", records: "320", lastUsed: "01 Aug 2026", status: "Active" },
];

export const MOCK_RECONCILIATION_RECORDS: ReconciliationRecordItem[] = [
  { id: "rec-1", jobId: "IMP-8901", type: "Import", reconciledAt: "04 Aug 2026, 09:30 AM", variancesCount: 0, status: "Matched" },
  { id: "rec-2", jobId: "EXP-2216", type: "Export", reconciledAt: "04 Aug 2026, 08:15 AM", variancesCount: 0, status: "Matched" },
  { id: "rec-3", jobId: "IMP-8891", type: "Import", reconciledAt: "03 Aug 2026, 06:40 PM", variancesCount: 2, status: "Variance" },
];

export const MOCK_IMPORT_EXPORT_ACTIVITIES: ImportExportActivityItem[] = [
  { id: "act-1", action: "Import job submitted", user: "Elena Vance", jobId: "IMP-8902", dateTime: "04 Aug 2026, 11:15 AM", result: "Success" },
  { id: "act-2", action: "Validation completed", user: "System", jobId: "IMP-8902", dateTime: "04 Aug 2026, 11:10 AM", result: "Success" },
  { id: "act-3", action: "Duplicate review started", user: "Marcus Lee", jobId: "IMP-8902", dateTime: "04 Aug 2026, 11:02 AM", result: "Success" },
  { id: "act-4", action: "Export job delivered", user: "System", jobId: "EXP-2216", dateTime: "04 Aug 2026, 08:15 AM", result: "Success" },
  { id: "act-5", action: "Reconciliation completed", user: "Priya Kapoor", jobId: "IMP-8891", dateTime: "03 Aug 2026, 09:30 AM", result: "Success" },
];

export const MOCK_PRIORITY_ALERTS: PriorityDataAlertItem[] = [
  { id: "alert-1", text: "3 Duplicate conflicts in IMP-8902", severity: "High", jobId: "IMP-8902" },
  { id: "alert-2", text: "2 Missing mapped fields for supplier feed", severity: "High", jobId: "IMP-8902" },
  { id: "alert-3", text: "1 Scheduled export failed", severity: "Medium", jobId: "EXP-2212" },
  { id: "alert-4", text: "4 Review required for rejected records", severity: "Medium", jobId: "IMP-8885" },
  { id: "alert-5", text: "2 Approval pending for high-impact import", severity: "Medium", jobId: "IMP-8902" },
];
