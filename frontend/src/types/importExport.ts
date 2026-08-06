export type DataOperationType = "Import" | "Export";

export type ImportJobStatus =
  | "Draft"
  | "Uploaded"
  | "Validating"
  | "Pending Approval"
  | "Approved"
  | "Running"
  | "Queued"
  | "Executed"
  | "Reconciled"
  | "Failed"
  | "Completed";

export type ExportJobStatus =
  | "Draft"
  | "Scheduled"
  | "Running"
  | "Delivered"
  | "Failed"
  | "Expired";

export type MappingStatus = "100%" | "98%" | "92%" | "91%" | "85%" | "--";
export type ValidationStatus = "Validating" | "Passed" | "Warnings" | "Failed" | "--";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected" | "--";
export type ExecutionStatus = "Queued" | "Running" | "Reconciled" | "Delivered" | "Scheduled" | "Failed";
export type JobOutcome = "In Progress" | "Success" | "Failed" | "Pending";

export interface CatalogueDataJob {
  id: string;
  operationType: DataOperationType;
  fileName: string;
  source: string;
  scope: string;
  submittedBy: string;
  recordsCount: number;
  recordsFormatted: string;
  mappingPercentage: number;
  validationStatus: ValidationStatus;
  duplicatesCount: number;
  approvalStatus: ApprovalStatus;
  executionStatus: ExecutionStatus;
  outcome: JobOutcome;
  updatedAt: string;
  templateName?: string;
  businessUnit?: string;
  owner?: string;
}

export interface DataOperationsKpi {
  id: string;
  seqNumber: number;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  trendType: "positive" | "negative" | "warning" | "neutral";
  category: "import" | "export" | "validation" | "review";
}

export interface FieldMappingItem {
  sourceField: string;
  targetField: string;
  transformation: string;
  status: "Matched" | "Transformed" | "Unmapped";
}

export interface ValidationIssueItem {
  id: string;
  issueType: string;
  count: number;
  severity: "High" | "Medium" | "Low";
}

export interface DuplicateConflictItem {
  id: string;
  sku: string;
  existingRecord: string;
  incomingRecord: string;
  suggestedAction: "Review" | "Merge" | "Ignore";
  confidenceScore: number;
  brand?: string;
  category?: string;
}

export interface ScheduledExportItem {
  id: string;
  feedName: string;
  frequency: string;
  destination: string;
  nextRun: string;
  status: "Scheduled" | "Paused" | "Failed";
}

export interface ImportTemplateItem {
  id: string;
  templateName: string;
  type: "Import" | "Export";
  records: string;
  lastUsed: string;
  status: "Active" | "Draft" | "Deprecated";
}

export interface ReconciliationRecordItem {
  id: string;
  jobId: string;
  type: "Import" | "Export";
  reconciledAt: string;
  variancesCount: number;
  status: "Matched" | "Variance";
}

export interface ImportExportActivityItem {
  id: string;
  action: string;
  user: string;
  jobId: string;
  dateTime: string;
  result: "Success" | "Warning" | "Failed";
}

export interface PriorityDataAlertItem {
  id: string;
  text: string;
  severity: "High" | "Medium" | "Low";
  jobId?: string;
}

export interface FilterState {
  searchQuery: string;
  activeTab: string;
  jobType: string;
  source: string;
  businessUnit: string;
  template: string;
  approvalStatus: string;
  validationStatus: string;
  dateRange: string;
  owner: string;
}

export interface NewImportDraft {
  importName: string;
  importType: string;
  source: string;
  businessUnit: string;
  scope: string;
  template: string;
  owner: string;
  approvalPath: string;
  file?: File | null;
  fileName?: string;
  fileSize?: string;
}

export interface ExportScheduleDraft {
  exportName: string;
  exportType: string;
  scope: string;
  fileFormat: string;
  destination: string;
  frequency: string;
  startDate: string;
  startTime: string;
  notificationEmail: string;
}
