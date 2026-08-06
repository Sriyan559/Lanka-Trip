export type QualityIssueType =
  | "Possible Duplicate Product"
  | "Duplicate Barcode Conflict"
  | "Duplicate SKU Conflict"
  | "Incomplete Safety Data"
  | "Missing Mandatory Media"
  | "Classification Conflict"
  | "Publication Blocker"
  | "Missing Mandatory Attributes"
  | "Unverified Brand Link";

export type QualitySeverity = "Critical" | "High" | "Medium" | "Low";

export type QualityIssueStatus =
  | "New"
  | "In Review"
  | "Pending Review"
  | "Pending Merge Review"
  | "Waiting Owner"
  | "In Progress"
  | "Escalated"
  | "Resolved";

export type QualityBusinessImpact =
  | "Customer confusion"
  | "Wrong fulfilment"
  | "Poor conversion"
  | "Search mismatch"
  | "Not publishable"
  | "Compliance risk"
  | "Revenue risk";

export interface CatalogueQualityIssue {
  id: string;
  caseId: string;
  issueType: QualityIssueType;
  entityName: string;
  publicId: string;
  sku: string;
  brand: string;
  category: string;
  channels: string[];
  severity: QualitySeverity;
  businessImpact: QualityBusinessImpact;
  owner: string;
  reviewer?: string;
  sla: string;
  isSlaBreached?: boolean;
  status: QualityIssueStatus;
  updatedAt: string;
  description?: string;
  evidence?: string;
}

export interface QualityKpiCard {
  id: string;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  colorState: "positive" | "negative" | "warning" | "info" | "neutral";
  iconName: string;
  filterType?: string;
  filterValue?: string;
}

export interface QualityHealthMetric {
  label: string;
  value: number; // percentage 0-100
}

export interface QualityAlert {
  id: string;
  text: string;
  count: number;
  severity: QualitySeverity;
  caseId?: string;
}

export interface QualityTrendPoint {
  date: string;
  openIssues: number;
  resolvedIssues: number;
  criticalIssues: number;
  slaBreaches: number;
}

export interface IssueDistributionItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface IssueStatusSummaryItem {
  status: string;
  count: number;
  color: string;
  pct: number;
}

export interface ScorecardMetric {
  label: string;
  percentage: number;
  colorState: "green" | "orange" | "red";
}

export interface DuplicateProductCandidate {
  id: string;
  pairName: string;
  recordA: string;
  recordB: string;
  skuA: string;
  skuB: string;
  brand: string;
  category: string;
  confidenceScore: number;
  suggestedAction: "Merge" | "Review" | "Ignore";
}

export interface IncompleteRecordSummary {
  id: string;
  reason: string;
  recordsCount: number;
  percentage: number;
}

export interface ValidationFailure {
  id: string;
  failedRule: string;
  failuresCount: number;
  percentage: number;
}

export interface PublicationReadinessImpact {
  id: string;
  channel: string;
  eligible: number;
  blocked: number;
  missingMedia: number;
  policyIssues: number;
}

export interface ResolutionPerformance {
  avgMergeReviewTime: string;
  autoMergeApproved: number;
  manualMerges: number;
  rejectedMerges: number;
  reopenedCases: number;
  rollbackRate: string;
}

export interface QualityGovernanceSummary {
  totalActiveRules: number;
  scheduledValidations: number;
  pendingApprovals: number;
  openQualityCases: number;
  auditPassRate: string;
  latestRunResult: string;
}

export interface QualityActivity {
  id: string;
  activity: string;
  user: string;
  action: string;
  dateTime: string;
  result: string;
}

export interface QualityFilterState {
  searchQuery: string;
  issueType: string;
  severity: string;
  status: string;
  category: string;
  brand: string;
  channel: string;
  owner: string;
  dataSource: string;
  updatedDate: string;
  activeTab: string;
  quickChips: string[];
}

export interface QualitySavedView {
  id: string;
  name: string;
  filters: Partial<QualityFilterState>;
}

export interface QualityCaseDraft {
  title: string;
  issueType: QualityIssueType;
  entityName: string;
  sku: string;
  brand: string;
  category: string;
  channel: string;
  severity: QualitySeverity;
  businessImpact: QualityBusinessImpact;
  owner: string;
  reviewer: string;
  sla: string;
  description: string;
  evidence: string;
}

export interface ValidationRunDraft {
  scope: string;
  businessUnit: string;
  category: string;
  brand: string;
  channel: string;
  ruleGroup: string;
  schedule: string;
}
