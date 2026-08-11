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
  mappingPercentage: number | null;
  validationStatus: ValidationStatus;
  duplicatesCount: number;
  approvalStatus: ApprovalStatus;
  executionStatus: ExecutionStatus;
  outcome: JobOutcome;
  updatedAt: string;
  templateName?: string;
  businessUnit?: string;
  owner?: string;
  publicId?: string;
  dataType?: string;
  processedRecords?: number;
  successfulRecords?: number;
  failedRecords?: number;
  progress?: number;
  currentStage?: string;
  canDownload?: boolean;
  canRetry?: boolean;
  canCancel?: boolean;
  failureMessage?: string | null;
}

export interface DataOperationsKpi {
  id: string;
  seqNumber: number;
  label: string;
  value: string | number | null;
  trend: string | number | null;
  trendUp?: boolean;
  trendType?: "positive" | "negative" | "warning" | "neutral";
  category?: "import" | "export" | "validation" | "review";
  available?: boolean;
  scope?: string;
  reason?: string | null;
}

export interface DataOperationsDashboard {
  kpis: DataOperationsKpi[];
  trend: { granularity:string; points:Array<{name:string;imports:number;exports:number;processed:number;failures:number}> };
  distribution: Array<{name:string;value:number;percentage:number;color:string}>;
  tabs: Array<{label:string;scope:string;count:number}>;
  jobs: {data:CatalogueDataJob[];page:number;pageSize:number;total:number;totalPages:number};
  activeJob: CatalogueDataJob | null;
  workflow: {activeStage:number;stage:string;progress:number} | null;
  health: {score:number|null;status:string;metrics:Array<{label:string;value:number|null}>};
  alerts: Array<{id:string;label:string;count:number;severity:string;scope:string}>;
  statusSummaries: {imports:Array<{label:string;count:number}>;exports:Array<{label:string;count:number}>};
  lower: {fieldMappings:FieldMappingItem[];validationIssues:Array<{label:string;count:number;severity:string}>;duplicateConflicts:DuplicateConflictItem[];schedules:ScheduledExportItem[];templates:ImportTemplateItem[];reconciliation:ReconciliationRecordItem[];activities:ImportExportActivityItem[]};
  options: {dataTypes:Array<{value:string;label:string}>;users:Array<{id:number;name:string}>;sources:string[];statuses:string[]};
  capabilities: Record<string,boolean|string>;
  lastSyncedAt:string;
  meta:{refreshIntervalSeconds:number;queueConnection:string};
}

export interface DataOperationsQuery {page:number;pageSize:number;search?:string;operationType?:"import"|"export";dataType?:string;status?:string;userId?:number;dateFrom?:string;dateTo?:string;scope?:string;granularity?:"daily"|"weekly"|"monthly";sort?:string;direction?:"asc"|"desc"}

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
