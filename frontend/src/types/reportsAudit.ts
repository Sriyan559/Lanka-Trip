export type ReportStatus = 'Active' | 'Warning' | 'Failed' | 'Draft' | 'Scheduled' | 'Pending';

export type ReportPriority = 'Low' | 'Normal' | 'High' | 'Critical';

export interface SupportReportItem {
  id: string;
  number: number;
  reportName: string;
  reportId: string;
  reportType: string;
  supportDomain: string;
  scope: string;
  format: string;
  schedule: string;
  lastGenerated: string;
  dateRange: string;
  status: ReportStatus;
  priority: ReportPriority;
}

export interface ReportFilterParams {
  timeRange?: string;
  marketplace?: string;
  businessUnit?: string;
  region?: string;
  segment?: string;
  caseSource?: string;
  dataSource?: string;
  domain?: string;
  workforceSource?: string;
  autoRefresh?: string;
  auditZone?: string;
  search?: string;
  reportType?: string;
  createdUser?: string;
  executionStatus?: string;
  priority?: string;
  dateRangeFilter?: string;
  statusChip?: string;
}
