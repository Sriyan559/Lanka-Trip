export interface ReportingContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  reportingScope: string;
  analyticsSource: string;
  governanceSource: string;
  dataExchange: string;
  retentionPolicy: string;
  dateRange: string;
  completenessPercent: number;
  lastSync: string;
  access: string;
}

export interface ReportingKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  variant: "blue" | "green" | "red" | "orange" | "amber" | "purple";
}

export interface ReportingReadinessCounters {
  healthy: number;
  running: number;
  pending: number;
  completedWithWarnings: number;
  failed: number;
  approvalRequired: number;
  privacyReview: number;
  retentionExpiring: number;
}

export interface MarketingReportItem {
  id: string;
  reportName: string;
  reportId: string;
  reportType: "Executive" | "Detail" | "Audit";
  marketingDomain: "Performance" | "Campaigns" | "Paid Media" | "Budgets" | "Attribution" | "Governance";
  owner: string;
  scope: string;
  format: "PDF" | "Excel" | "CSV" | "Parquet";
  schedule: "Weekly" | "Daily" | "Monthly" | "Ad-hoc";
  lastGenerated: string;
  dataPeriod: string;
  status: "Healthy" | "Running" | "Pending" | "Completed with Warnings" | "Failed";
  privacy: "Aggregate" | "Restricted" | "Confidential";
  retention: string;
}

export interface ReportIncludedSection {
  name: string;
  enabled: boolean;
}

export interface ReportDataScope {
  tenant: string;
  ecosystem: string;
  businessUnits: string;
  regions: string;
  channels: string;
  privacyScope: string;
  customerLevelData: string;
  sourceSystems: string;
  dateRange: string;
  attributionModel: string;
}

export interface ReportSchedule {
  frequency: string;
  dayTime: string;
  timezone: string;
  nextRun: string;
  lastRun: string;
  lastStatus: string;
  scheduleHealth: string;
}

export interface ReportRecipient {
  id: string;
  name: string;
  roleDomain: string;
  deliveryStatus: string;
}

export interface GenerationHistoryItem {
  runId: string;
  generatedTime: string;
  duration: string;
  status: "Healthy" | "Warning" | "Failed" | "Running";
  dataCompleteness: string;
  fileSize: string;
  warningsCount: number;
  downloadable: boolean;
}

export interface ReportTemplateItem {
  id: string;
  templateName: string;
}

export interface ExportJobItem {
  exportId: string;
  type: string;
  domain: string;
  scope: string;
  format: string;
  requestedAt: string;
  status: "Healthy" | "Running" | "Pending" | "Failed" | "Approval Required";
}

export interface ExportPrivacyControlsData {
  privacyClass: string;
  encryption: string;
  delivery: string;
  downloadLimit: string;
  auditLogging: string;
  temporaryStorage: string;
}

export interface ImportJobItem {
  importId: string;
  type: string;
  domain: string;
  scope: string;
  format: string;
  uploadedAt: string;
  status: "Validated" | "Healthy" | "Warning" | "Failed" | "Pending";
}

export interface ImportValidationMetrics {
  totalRecords: string;
  valid: string;
  warnings: string;
  errors: string;
  duplicates: string;
  invalid: string;
  validated: string;
  successRate: string;
}

export interface DataMappingItem {
  sourceColumn: string;
  targetColumn: string;
  mappedBy: string;
  status: "Mapped" | "Unmapped" | "Conflict";
}

export interface ChangePreviewItem {
  field: string;
  fromValue: string;
  toValue: string;
  changeType: "Update" | "Create" | "Remove" | "No Change";
}

export interface ImportSafetyControlsData {
  dryRunRequired: boolean;
  duplicateDetection: boolean;
  rollbackEnabled: boolean;
  quarantineMode: boolean;
  businessRulesEngine: boolean;
  approvalRequired: boolean;
}

export interface TransferJobItem {
  jobId: string;
  type: string;
  source: string;
  destination: string;
  progressPercent: number;
  startedAt: string;
  eta: string;
  status: string;
}

export interface TransferExceptionItem {
  jobId: string;
  issue: string;
  actionRequired: string;
}

export interface MarketingAuditEventItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  marketingDomain: string;
  recordType: string;
  recordId: string;
  result: "Success" | "Warning" | "Failed";
  evidenceId: string;
}

export interface SelectedAuditEventData {
  eventId: string;
  timestamp: string;
  user: string;
  action: string;
  actionType: string;
  recordType: string;
  recordId: string;
  businessImpact: string;
  outcome: string;
  evidenceId: string;
}

export interface AccessDownloadEvidenceItem {
  artifact: string;
  downloadedBy: string;
  time: string;
  downloadUsed: string;
  accessStatus: "Active" | "Expired" | "Revoked";
}

export interface RetentionManagementItem {
  governanceCategory: string;
  retentionPeriod: string;
  activeVolume: string;
  expiringSoon: string;
  policyStatus: string;
}

export interface ReportingGovernanceHealthItem {
  controlName: string;
  status: "Pass" | "Warning" | "Fail";
}

export interface ReportingSourceHealthItem {
  domainCategory: string;
  healthStatus: "Healthy" | "Warning" | "Disconnected";
  sourceSystem: string;
}

export interface ReportingRecentActivityItem {
  time: string;
  activity: string;
  domainAttribution: string;
}

export interface SelectedReportRecord {
  id: string;
  reportName: string;
  reportId: string;
  summaryMetrics: {
    lastGenerated: string;
    generationTime: string;
    dataCompleteness: string;
    sectionsCount: number;
    recipientsCount: number;
    fileSize: string;
    retention: string;
    reportHealthScore: number;
  };
  details: {
    reportOwner: string;
    reportVersion: string;
    reportClass: string;
    scheduleStatus: string;
    privacyClass: string;
  };
  includedSections: ReportIncludedSection[];
  dataScope: ReportDataScope;
  schedule: ReportSchedule;
  recipients: ReportRecipient[];
  generationHistory: GenerationHistoryItem[];
  reportTemplates: ReportTemplateItem[];
  exportJobs: ExportJobItem[];
  exportPrivacyControls: ExportPrivacyControlsData;
  importJobs: ImportJobItem[];
  importValidation: ImportValidationMetrics;
  dataMappings: DataMappingItem[];
  changePreview: ChangePreviewItem[];
  importSafetyControls: ImportSafetyControlsData;
  transferJobs: TransferJobItem[];
  transferExceptions: TransferExceptionItem[];
  auditTrail: MarketingAuditEventItem[];
  selectedAuditEvent: SelectedAuditEventData;
  downloadEvidence: AccessDownloadEvidenceItem[];
  retentionManagement: RetentionManagementItem[];
  governanceHealth: {
    controls: ReportingGovernanceHealthItem[];
    overallScore: number;
  };
  reportingSources: ReportingSourceHealthItem[];
  recentActivity: ReportingRecentActivityItem[];
}

export interface ReportingRailData {
  healthScore: number;
  healthLabel: string;
  reportingSummary: {
    reportsGenerated: number;
    scheduledReports: number;
    activeSchedules: number;
    failedReports: number;
  };
  exportSummary: {
    jobs: number;
    completed: number;
    running: number;
    failed: number;
    recordsExported: string;
  };
  importSummary: {
    jobs: number;
    completed: number;
    warnings: number;
    failed: number;
    recordsImported: string;
  };
  auditSummary: {
    events: string;
    userActions: string;
    systemActions: string;
    criticalGaps: number;
  };
  retentionSummary: {
    expiringSoon: number;
    expired: number;
    onHold: number;
    policyExceptions: number;
  };
  exceptionsSummary: {
    open: number;
    high: number;
    warnings: number;
    information: number;
  };
  quickQueues: {
    failedExports: number;
    failedImports: number;
    privacyReviews: number;
    approvalRequired: number;
    mappingWarnings: number;
    retentionExpiring: number;
  };
}

export interface MarketingReportsAuditData {
  context: ReportingContextData;
  kpis: ReportingKpiItem[];
  readiness: ReportingReadinessCounters;
  reports: MarketingReportItem[];
  selectedReport: SelectedReportRecord;
  rail: ReportingRailData;
}

export const MARKETING_REPORTS_AUDIT_MOCK_DATA: MarketingReportsAuditData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    reportingScope: "All Marketing",
    analyticsSource: "MK12 Connected",
    governanceSource: "MK13 Connected",
    dataExchange: "90 Days",
    retentionPolicy: "90 Days",
    dateRange: "Last 30 Days",
    completenessPercent: 99,
    lastSync: "Aug 14, 2026 10:15 AM",
    access: "assigned business context",
  },
  kpis: [
    {
      id: "reports_generated",
      label: "Reports Generated",
      value: "186",
      variant: "red",
    },
    {
      id: "scheduled_reports",
      label: "Scheduled Reports",
      value: "24",
      variant: "red",
    },
    {
      id: "export_jobs",
      label: "Export Jobs",
      value: "128",
      variant: "blue",
    },
    {
      id: "import_jobs",
      label: "Import Jobs",
      value: "42",
      variant: "red",
    },
    {
      id: "records_exported",
      label: "Records Exported",
      value: "2.84M",
      variant: "red",
    },
    {
      id: "records_imported",
      label: "Records Imported",
      value: "418K",
      variant: "red",
    },
    {
      id: "transfer_exceptions",
      label: "Transfer Exceptions",
      value: "9",
      subtext: "requires review",
      variant: "red",
    },
    {
      id: "reporting_health",
      label: "Reporting & Audit Health",
      value: "97 / 100",
      variant: "green",
    },
  ],
  readiness: {
    healthy: 31,
    running: 7,
    pending: 6,
    completedWithWarnings: 4,
    failed: 3,
    approvalRequired: 2,
    privacyReview: 2,
    retentionExpiring: 5,
  },
  reports: [
    {
      id: "rpt-1",
      reportName: "Marketing Executive Performance Report",
      reportId: "RPT-MKT-2026-0001",
      reportType: "Executive",
      marketingDomain: "Performance",
      owner: "Marketing Ops",
      scope: "All Marketing",
      format: "PDF",
      schedule: "Weekly",
      lastGenerated: "Aug 14, 2026 09:08 AM",
      dataPeriod: "Jul 16 - Aug 14, 2026",
      status: "Healthy",
      privacy: "Aggregate",
      retention: "90 Days",
    },
    {
      id: "rpt-2",
      reportName: "Campaign Performance Detail",
      reportId: "RPT-MKT-2026-0002",
      reportType: "Detail",
      marketingDomain: "Campaigns",
      owner: "Campaign Team",
      scope: "All Marketing",
      format: "Excel",
      schedule: "Daily",
      lastGenerated: "Aug 13, 2026",
      dataPeriod: "Aug 13, 2026",
      status: "Healthy",
      privacy: "Aggregate",
      retention: "90 Days",
    },
    {
      id: "rpt-3",
      reportName: "Paid Media Performance & Reconciliation",
      reportId: "RPT-MKT-2026-0003",
      reportType: "Detail",
      marketingDomain: "Paid Media",
      owner: "Paid Media Team",
      scope: "All Marketing",
      format: "Excel",
      schedule: "Daily",
      lastGenerated: "Aug 14, 2026 06:30 AM",
      dataPeriod: "Aug 13, 2026",
      status: "Running",
      privacy: "Aggregate",
      retention: "90 Days",
    },
    {
      id: "rpt-4",
      reportName: "Marketing Budget Control Report",
      reportId: "RPT-MKT-2026-0004",
      reportType: "Executive",
      marketingDomain: "Budgets",
      owner: "Finance Partner",
      scope: "All Marketing",
      format: "PDF",
      schedule: "Weekly",
      lastGenerated: "Aug 13, 2026 10:10 PM",
      dataPeriod: "Jul 16 - Aug 14, 2026",
      status: "Healthy",
      privacy: "Aggregate",
      retention: "90 Days",
    },
    {
      id: "rpt-5",
      reportName: "Attribution & Channel Contribution",
      reportId: "RPT-MKT-2026-0005",
      reportType: "Detail",
      marketingDomain: "Attribution",
      owner: "Analytics Team",
      scope: "All Marketing",
      format: "PDF",
      schedule: "Weekly",
      lastGenerated: "Aug 13, 2026 05:15 PM",
      dataPeriod: "Jul 16 - Aug 14, 2026",
      status: "Completed with Warnings",
      privacy: "Aggregate",
      retention: "90 Days",
    },
    {
      id: "rpt-6",
      reportName: "Governance Exceptions & Approvals",
      reportId: "RPT-MKT-2026-0006",
      reportType: "Audit",
      marketingDomain: "Governance",
      owner: "Governance Team",
      scope: "All Marketing",
      format: "PDF",
      schedule: "Weekly",
      lastGenerated: "Aug 14, 2026 06:00 AM",
      dataPeriod: "Aug 13, 2026",
      status: "Failed",
      privacy: "Restricted",
      retention: "90 Days",
    },
  ],
  selectedReport: {
    id: "rpt-1",
    reportName: "Marketing Executive Performance Report",
    reportId: "RPT-MKT-2026-0001",
    summaryMetrics: {
      lastGenerated: "Aug 14, 2026 09:08 AM",
      generationTime: "1m 42s",
      dataCompleteness: "99%",
      sectionsCount: 12,
      recipientsCount: 4,
      fileSize: "4.9 MB (PDF)",
      retention: "90 Days",
      reportHealthScore: 99,
    },
    details: {
      reportOwner: "Marketing Ops",
      reportVersion: "v6",
      reportClass: "Executive",
      scheduleStatus: "Active",
      privacyClass: "Aggregate",
    },
    includedSections: [
      { name: "Executive Marketing Summary", enabled: true },
      { name: "Campaign Performance Overview", enabled: true },
      { name: "Channel Performance", enabled: true },
      { name: "Acquisition", enabled: true },
      { name: "Budget Performance", enabled: true },
      { name: "Attribution", enabled: true },
      { name: "Customer Lifecycle", enabled: true },
      { name: "Journey Performance", enabled: true },
      { name: "Web & App Performance", enabled: true },
      { name: "Content Performance", enabled: true },
      { name: "Benchmarking", enabled: true },
      { name: "Appendices", enabled: true },
    ],
    dataScope: {
      tenant: "SL Beauty",
      ecosystem: "Beauty Marketplace",
      businessUnits: "All Business Units",
      regions: "All Markets",
      channels: "All Channels",
      privacyScope: "Aggregate",
      customerLevelData: "Not Included",
      sourceSystems: "Healthy",
      dateRange: "Jul 16 - Aug 14, 2026",
      attributionModel: "Multi-Touch",
    },
    schedule: {
      frequency: "Weekly",
      dayTime: "Monday 06:00",
      timezone: "Asia / Colombo",
      nextRun: "Aug 17, 2026 06:00 AM",
      lastRun: "Aug 14, 2026 09:08 AM",
      lastStatus: "Completed",
      scheduleHealth: "Healthy",
    },
    recipients: [
      { id: "rec-1", name: "Marketing Director", roleDomain: "Executive", deliveryStatus: "Delivered" },
      { id: "rec-2", name: "Campaign Director", roleDomain: "Campaigns", deliveryStatus: "Delivered" },
      { id: "rec-3", name: "Marketing Analytics", roleDomain: "Analytics", deliveryStatus: "Delivered" },
      { id: "rec-4", name: "Governance Lead", roleDomain: "Compliance", deliveryStatus: "Delivered" },
    ],
    generationHistory: [
      { runId: "GEN-000100", generatedTime: "Aug 14, 2026 09:08 AM", duration: "1m 42s", status: "Healthy", dataCompleteness: "99%", fileSize: "4.9 MB", warningsCount: 0, downloadable: true },
      { runId: "GEN-000099", generatedTime: "Aug 12, 2026 09:08 AM", duration: "1m 35s", status: "Healthy", dataCompleteness: "99%", fileSize: "4.8 MB", warningsCount: 0, downloadable: true },
      { runId: "GEN-000098", generatedTime: "Aug 10, 2026 09:08 AM", duration: "1m 40s", status: "Healthy", dataCompleteness: "98%", fileSize: "4.7 MB", warningsCount: 0, downloadable: true },
      { runId: "GEN-000097", generatedTime: "Aug 08, 2026 09:08 AM", duration: "1m 38s", status: "Healthy", dataCompleteness: "97%", fileSize: "4.6 MB", warningsCount: 0, downloadable: true },
      { runId: "GEN-000096", generatedTime: "Aug 06, 2026 09:08 AM", duration: "1m 36s", status: "Healthy", dataCompleteness: "97%", fileSize: "4.6 MB", warningsCount: 0, downloadable: true },
    ],
    reportTemplates: [
      { id: "tmpl-1", templateName: "Campaign Operations Report" },
      { id: "tmpl-2", templateName: "Marketing Budget Report" },
      { id: "tmpl-3", templateName: "Paid Media Reconciliation" },
      { id: "tmpl-4", templateName: "Attribution Performance" },
      { id: "tmpl-5", templateName: "Governance Audit Report" },
    ],
    exportJobs: [
      { exportId: "EXP-001236", type: "Attribution Data", domain: "Attribution", scope: "All Marketing", format: "Parquet", requestedAt: "Aug 14, 2026 09:08 AM", status: "Healthy" },
      { exportId: "EXP-001235", type: "Campaign Data", domain: "Campaigns", scope: "All Marketing", format: "CSV", requestedAt: "Aug 14, 2026 07:45 AM", status: "Healthy" },
      { exportId: "EXP-001234", type: "Paid Media Data", domain: "Paid Media", scope: "All Marketing", format: "Excel", requestedAt: "Aug 13, 2026 11:10 AM", status: "Running" },
      { exportId: "EXP-001233", type: "Budget Data", domain: "Budgets", scope: "All Marketing", format: "Excel", requestedAt: "Aug 13, 2026 08:30 AM", status: "Healthy" },
    ],
    exportPrivacyControls: {
      privacyClass: "Aggregate",
      encryption: "AES-256",
      delivery: "SFTP",
      downloadLimit: "1 Copy",
      auditLogging: "Enabled",
      temporaryStorage: "7 Days (33 remaining)",
    },
    importJobs: [
      { importId: "IMP-000243", type: "Campaign Data", domain: "Campaigns", scope: "All Marketing", format: "CSV", uploadedAt: "Aug 14, 2026 07:15 AM", status: "Validated" },
      { importId: "IMP-000242", type: "Paid Media Data", domain: "Paid Media", scope: "All Marketing", format: "CSV", uploadedAt: "Aug 14, 2026 05:30 AM", status: "Healthy" },
      { importId: "IMP-000241", type: "Attribution Data", domain: "Attribution", scope: "All Marketing", format: "CSV", uploadedAt: "Aug 13, 2026 10:10 PM", status: "Warning" },
      { importId: "IMP-000240", type: "Budget Data", domain: "Budgets", scope: "All Marketing", format: "Excel", uploadedAt: "Aug 13, 2026 04:20 PM", status: "Failed" },
    ],
    importValidation: {
      totalRecords: "210K",
      valid: "208K",
      warnings: "1.8K",
      errors: "120",
      duplicates: "1.2K",
      invalid: "15K",
      validated: "192K",
      successRate: "98%",
    },
    dataMappings: [
      { sourceColumn: "campaign_id", targetColumn: "Campaign ID", mappedBy: "System", status: "Mapped" },
      { sourceColumn: "campaign_name", targetColumn: "Campaign Name", mappedBy: "System", status: "Mapped" },
      { sourceColumn: "region_id", targetColumn: "Region", mappedBy: "System", status: "Mapped" },
      { sourceColumn: "channel", targetColumn: "Channel", mappedBy: "System", status: "Mapped" },
      { sourceColumn: "budget_amount", targetColumn: "Budget Amount", mappedBy: "System", status: "Mapped" },
    ],
    changePreview: [
      { field: "budget_amount", fromValue: "LKR 2,000,000", toValue: "LKR 2,450,000", changeType: "Update" },
      { field: "status", fromValue: "Draft", toValue: "Active", changeType: "Update" },
      { field: "channel_name", fromValue: "Social", fromValueText: "Social", toValue: "Paid Social", changeType: "Update" } as any,
      { field: "owner", fromValue: "Media Team", toValue: "Campaign Director", changeType: "Update" },
    ],
    importSafetyControls: {
      dryRunRequired: true,
      duplicateDetection: true,
      rollbackEnabled: true,
      quarantineMode: true,
      businessRulesEngine: true,
      approvalRequired: true,
    },
    transferJobs: [
      { jobId: "TRF-001230", type: "Export -> Attribution", source: "Platform", destination: "Data Lake", progressPercent: 60, startedAt: "Aug 14, 2026 09:15 AM", eta: "09:35 AM", status: "Running" },
      { jobId: "TRF-001229", type: "Import -> Campaigns", source: "Partner", destination: "Platform", progressPercent: 44, startedAt: "Aug 14, 2026 09:00 AM", eta: "09:40 AM", status: "Running" },
      { jobId: "TRF-001228", type: "Export -> Budgets", source: "Platform", destination: "Finance", progressPercent: 24, startedAt: "Aug 14, 2026 08:30 AM", eta: "09:55 AM", status: "Running" },
      { jobId: "TRF-001227", type: "Import -> Audiences", source: "Partner", destination: "Platform", progressPercent: 14, startedAt: "Aug 14, 2026 08:15 AM", eta: "10:15 AM", status: "Running" },
    ],
    transferExceptions: [
      { jobId: "TRF-0012315", issue: "Data volume high", actionRequired: "Review" },
      { jobId: "TRF-0012313", issue: "Missing required field", actionRequired: "Resolve" },
      { jobId: "TRF-0012312", issue: "Duplicate records", actionRequired: "Investigate" },
      { jobId: "TRF-0012310", issue: "Validation mismatch", actionRequired: "Review" },
      { jobId: "TRF-0012308", issue: "Larger file size", actionRequired: "Monitor" },
    ],
    auditTrail: [
      { id: "aud-1", timestamp: "Aug 14, 2026 09:08 AM", user: "Marketing Ops", action: "Report generated", marketingDomain: "Performance", recordType: "Report", recordId: "RPT-MKT-2026-0001", result: "Success", evidenceId: "EV-000101" },
      { id: "aud-2", timestamp: "Aug 14, 2026 07:45 AM", user: "System", action: "Export generated", marketingDomain: "Attribution", recordType: "Export Job", recordId: "EXP-001236", result: "Success", evidenceId: "EV-000100" },
      { id: "aud-3", timestamp: "Aug 14, 2026 07:15 AM", user: "Marketing Ops", action: "Import validated", marketingDomain: "Campaigns", recordType: "Import Job", recordId: "IMP-000243", result: "Success", evidenceId: "EV-000099" },
      { id: "aud-4", timestamp: "Aug 13, 2026 10:10 PM", user: "Finance Partner", action: "Mapping changed", marketingDomain: "Budgets", recordType: "Data Mapping", recordId: "MAP-000112", result: "Success", evidenceId: "EV-000098" },
      { id: "aud-5", timestamp: "Aug 13, 2026 08:30 AM", user: "Analytics Lead", action: "Schedule created", marketingDomain: "Performance", recordType: "Schedule", recordId: "SCH-000045", result: "Success", evidenceId: "EV-000097" },
    ],
    selectedAuditEvent: {
      eventId: "EV-000101",
      timestamp: "Aug 14, 2026 09:10 AM",
      user: "Nimal Perera",
      action: "Export Generated",
      actionType: "Export Execution",
      recordType: "Campaign Data",
      recordId: "CMP-001236",
      businessImpact: "Medium",
      outcome: "Success",
      evidenceId: "Ev-000101",
    },
    downloadEvidence: [
      { artifact: "RPT-MKT-2026-0001.pdf", downloadedBy: "Marketing Director", time: "Aug 14, 2026 09:12 AM", downloadUsed: "1 / 5", accessStatus: "Active" },
      { artifact: "EXP-001236.parquet", downloadedBy: "Data Engineering", time: "Aug 14, 2026 09:10 AM", downloadUsed: "2 / 5", accessStatus: "Active" },
      { artifact: "RPT-MKT-2026-0004.pdf", downloadedBy: "Governance Lead", time: "Aug 14, 2026 07:30 AM", downloadUsed: "1 / 5", accessStatus: "Active" },
    ],
    retentionManagement: [
      { governanceCategory: "Generated Reports", retentionPeriod: "90 Days", activeVolume: "89m Data", expiringSoon: "90 Days", policyStatus: "Active" },
      { governanceCategory: "Export Files", retentionPeriod: "60 Days", activeVolume: "33m Data", expiringSoon: "60 Days", policyStatus: "Active" },
      { governanceCategory: "Import Source Files", retentionPeriod: "90 Days", activeVolume: "10m Data", expiringSoon: "90 Days", policyStatus: "Active" },
      { governanceCategory: "Audit Events", retentionPeriod: "365 Days", activeVolume: "10m Data", expiringSoon: "365 Days", policyStatus: "Active" },
    ],
    governanceHealth: {
      controls: [
        { controlName: "Retention Policy Adherence", status: "Pass" },
        { controlName: "Privacy Classification", status: "Pass" },
        { controlName: "Export Field Rules", status: "Pass" },
        { controlName: "Customer Data Restrictions", status: "Pass" },
        { controlName: "Governance Approval", status: "Pass" },
      ],
      overallScore: 99,
    },
    reportingSources: [
      { domainCategory: "MK03 Campaigns", healthStatus: "Healthy", sourceSystem: "MK03 Campaigns" },
      { domainCategory: "MK05 Audiences", healthStatus: "Healthy", sourceSystem: "MK05 Audiences" },
      { domainCategory: "MK07 Content", healthStatus: "Healthy", sourceSystem: "MK07 Content" },
      { domainCategory: "MK08 Channels", healthStatus: "Healthy", sourceSystem: "MK08 Channels" },
    ],
    recentActivity: [
      { time: "10:12 AM", activity: "Export TRF-001231 60% complete", domainAttribution: "Attribution" },
      { time: "09:15 AM", activity: "Import IMP-000243 validated successfully", domainAttribution: "Campaigns" },
      { time: "07:45 AM", activity: "Export EXP-001236 by Upeksha Rodrigo", domainAttribution: "Governance" },
      { time: "07:30 AM", activity: "Export EXP-001236 failed - schema mismatch", domainAttribution: "Governance" },
      { time: "04:20 AM", activity: "Exception TRF-001219 opened", domainAttribution: "Operations" },
    ],
  },
  rail: {
    healthScore: 97,
    healthLabel: "Excellent",
    reportingSummary: {
      reportsGenerated: 186,
      scheduledReports: 24,
      activeSchedules: 18,
      failedReports: 3,
    },
    exportSummary: {
      jobs: 128,
      completed: 119,
      running: 4,
      failed: 5,
      recordsExported: "2.84M",
    },
    importSummary: {
      jobs: 42,
      completed: 38,
      warnings: 3,
      failed: 1,
      recordsImported: "418K",
    },
    auditSummary: {
      events: "12.4K",
      userActions: "4.2K",
      systemActions: "8.2K",
      criticalGaps: 0,
    },
    retentionSummary: {
      expiringSoon: 5,
      expired: 2,
      onHold: 3,
      policyExceptions: 1,
    },
    exceptionsSummary: {
      open: 9,
      high: 3,
      warnings: 5,
      information: 1,
    },
    quickQueues: {
      failedExports: 5,
      failedImports: 1,
      privacyReviews: 2,
      approvalRequired: 2,
      mappingWarnings: 3,
      retentionExpiring: 5,
    },
  },
};
