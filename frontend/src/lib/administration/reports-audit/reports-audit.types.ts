export interface AuditKpiItem {
  id: string;
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  status?: string;
  sparkline?: number[];
  color?: string;
}

export interface AuditRecord {
  id: string;
  auditId: string;
  timestamp: string;
  actor: string;
  actorType: string;
  changeArea: string;
  operation: string;
  entity: string;
  result: 'Success' | 'Failed' | 'Partial' | 'Cancelled';
  integrity: 'Verified' | 'Warning' | 'Failed';
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  businessUnit?: string;
  channelRegion?: string;
  sourceIP?: string;
  sessionId?: string;
}

export interface SelectedAuditDetail {
  auditId: string;
  timestamp: string;
  actor: string;
  actorType: string;
  changeArea: string;
  operation: string;
  entity: string;
  result: string;
  integrity: string;
  riskLevel: string;
  businessUnit: string;
  channelRegion: string;
  sourceIP: string;
  sessionId: string;
}

export interface ComparisonField {
  field: string;
  before: string | number;
  after: string | number;
  changed?: boolean;
}

export interface AreaChangeSummary {
  id: string;
  changeArea: string;
  changes: number;
  success: number;
  failed: number;
  partial: number;
  cancelled: number;
  successRate: string;
  highRisk: number;
}

export interface HighRiskChangeRecord {
  id: string;
  auditId: string;
  changeArea: string;
  entity: string;
  operation: string;
  actor: string;
  risk: string;
  result: string;
  time: string;
}

export interface GovernanceTraceStep {
  step: string;
  approver: string;
  decision: string;
  time: string;
}

export interface ReportCatalogueItem {
  id: string;
  reportName: string;
  category: string;
  frequency: string;
  lastRun: string;
  status: string;
}

export interface ScheduledReportItem {
  id: string;
  report: string;
  frequency: string;
  nextRun: string;
  owner: string;
  status: string;
}

export interface ExportJobItem {
  id: string;
  exportName: string;
  status: string;
  requested: string;
  completed: string;
  size: string;
  requestedBy: string;
}

export interface SensitiveExportItem {
  id: string;
  exportName: string;
  status: string;
  risk: string;
  reviewer: string;
  due: string;
}

export interface FailedExportItem {
  id: string;
  exportName: string;
  reason: string;
  failed: string;
}

export interface HealthMatrixRow {
  category: string;
  poor: number;
  fair: number;
  good: number;
  excellent: number;
}

export interface GovernanceGateItem {
  id: string;
  title: string;
  status: 'Passed' | 'Warning' | 'Failed';
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  activity: string;
  entity?: string;
  actor: string;
  actorType?: string;
  result?: string;
  integrity?: string;
  size?: string;
  requestedBy?: string;
}

export interface ReportsAuditFullData {
  row1Kpis: AuditKpiItem[];
  row2Kpis: AuditKpiItem[];
  auditRecords: AuditRecord[];
  selectedRecord: SelectedAuditDetail;
  comparisonFields: ComparisonField[];
  changeSummaries: AreaChangeSummary[];
  highRiskChanges: HighRiskChangeRecord[];
  approvalTrace: GovernanceTraceStep[];
  reportCatalogue: ReportCatalogueItem[];
  scheduledReports: ScheduledReportItem[];
  exportJobs: ExportJobItem[];
  sensitiveExports: SensitiveExportItem[];
  failedExports: FailedExportItem[];
  changeVolumeData: { date: string; volume: number }[];
  highRiskTrendData: { name: string; count: number; color?: string }[];
  reportsExportsTrendData: { date: string; reports: number; exports: number }[];
  healthMatrixData: HealthMatrixRow[];
  auditIntegrityDonut: { name: string; value: number; color: string }[];
  auditIntegrityMetrics: {
    verified: string;
    warning: string;
    failed: string;
    total: string;
    successRate: string;
  };
  governanceGates: GovernanceGateItem[];
  recentEvidenceActivity: ActivityLogItem[];
  recentAuditActivity: ActivityLogItem[];
  healthScore: number;
  quickQueues: {
    pendingApprovals: number;
    exportsAwaitingReview: number;
    failedExports: number;
    unreviewedHighRisk: number;
  };
  summaryStats: {
    totalChanges: string;
    successRate: string;
    highRiskChanges: number;
    reportsGenerated: number;
    exportsCompleted: number;
    failedExports: number;
    exportsAwaitingApproval: number;
    riskyAuthEvents: number;
    policyViolations: number;
    openAuditExceptions: number;
  };
}
