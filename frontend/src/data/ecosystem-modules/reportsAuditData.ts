export interface AuditRegistryItem {
  id: string;
  auditRef: string;
  timestamp: string;
  eventType: string;
  entityType: string;
  entityId: string;
  module: string;
  actor: string;
  actorType: "Human" | "Service" | "System";
  tenant: string;
  businessUnit: string;
  channel: string;
  environment: string;
  changeType: string;
  previous: string;
  new: string;
  risk: "High" | "Medium" | "Low";
  result: "Success" | "Warning" | "Failed" | "Denied";
  correlationRef: string;
  hashCount: number;
}

export interface ConfigHistoryItem {
  changedAt: string;
  configKey: string;
  fromValue: string;
  toValue: string;
  actor: string;
}

export interface AssignmentHistoryItem {
  changedAt: string;
  scope: string;
  from: string;
  to: string;
  actor: string;
}

export interface ReleaseHistoryItem {
  releasedAt: string;
  module: string;
  version: string;
  status: string;
  actor: string;
}

export interface FeatureFlagHistoryItem {
  changedAt: string;
  flag: string;
  from: string;
  to: string;
  actor: string;
}

export interface IntegrationHistoryItem {
  changedAt: string;
  integration: string;
  from: string;
  to: string;
  status: string;
}

export interface GovernanceAccessHistoryItem {
  changedAt: string;
  event: string;
  actor: string;
  result: string;
}

export interface SecurityEventItem {
  changedAt: string;
  event: string;
  severity: "High" | "Medium" | "Low";
  status: string;
}

export interface ReportItem {
  id: string;
  name: string;
  category: string;
  frequency: string;
  owner: string;
  status: string;
}

export interface ScheduledReportItem {
  id: string;
  report: string;
  module: string;
  nextRun: string;
  status: string;
}

export interface ExportJobItem {
  id: string;
  exportName: string;
  scope: string;
  status: string;
  size: string;
}

export interface FailedExportItem {
  id: string;
  exportName: string;
  scope: string;
  failedOn: string;
  reason: string;
}

export interface EvidencePackageItem {
  id: string;
  package: string;
  module: string;
  generatedOn: string;
  status: string;
}

export interface RecentAuditActivityItem {
  timestamp: string;
  auditRef: string;
  event: string;
  entity: string;
  module: string;
  actor: string;
  risk: "High" | "Medium" | "Low";
  result: "Success" | "Warning" | "Failed";
}

export const REPORTS_AUDIT_DATA = {
  headerInfo: {
    visibleTitle: "Reports, Audit, Export & Ecosystem Change History",
    breadcrumb: "Ecosystem Modules > Reports & Audit",
    subtitle: "Review ecosystem-wide audit records, historical changes, configuration lineage, reports, evidence, export activity and governance history across modules, tenants, environments and administrators.",
  },

  contextBar: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    scope: "Enterprise Wide",
    region: "Sri Lanka",
    environment: "All",
    auditEngine: "Connected",
    changeRegistry: "Healthy",
    exportGovernance: "Active",
    evidenceRegistry: "Connected",
    retentionPolicy: "Healthy",
    dataCompleteness: "99%",
    lastEvaluated: "Aug 14, 2026 10:15 AM",
    access: "Assigned Scope",
  },

  primaryKpis: [
    { label: "Audit Records", value: "248.6K", supportingText: "+4.2% vs last 30 days", tone: "info" },
    { label: "Changes", value: "4,218", supportingText: "+2.1% vs last 30 days", tone: "info" },
    { label: "Reports", value: "486", supportingText: "12 new this month", tone: "info" },
    { label: "Exports", value: "312", supportingText: "310 completed", tone: "info" },
    { label: "Scheduled", value: "18", supportingText: "Next run in 2h", tone: "info" },
    { label: "Exceptions", value: "7", supportingText: "Requires review", tone: "warning" },
    { label: "Failed Exports", value: "3", supportingText: "Action required", tone: "danger" },
    { label: "Evidence Packages", value: "42", supportingText: "Ready for audit", tone: "success" },
    { label: "Retention Warnings", value: "2", supportingText: "Purge due < 7d", tone: "warning" },
    { label: "Audit Health", value: "98/100", supportingText: "Excellent posture", tone: "success" },
  ],

  secondaryKpis: [
    { label: "Configuration Changes", value: "1,284", tone: "info" },
    { label: "Assignment Changes", value: "642", tone: "info" },
    { label: "Release Events", value: "318", tone: "info" },
    { label: "Feature Flag Events", value: "426", tone: "info" },
    { label: "Integration Changes", value: "392", tone: "info" },
    { label: "Access & Governance Events", value: "814", tone: "info" },
    { label: "High-Risk Changes", value: "11", tone: "danger" },
    { label: "Unverified Records", value: "0", tone: "success" },
  ],

  tabs: [
    "Audit Overview", "Change History", "Configuration History", "Assignment History",
    "Release History", "Feature Flag History", "Integration History", "Governance & Access History",
    "Security Events", "Reports", "Scheduled Reports", "Exports", "Evidence Packages",
    "Retention", "Exceptions", "Audit Integrity"
  ],

  quickFilters: [
    "High Risk", "Configuration Change", "Assignment Change", "Release", "Feature Flag",
    "Integration", "Governance", "Access", "Security", "Failed Action", "Approval Required",
    "Export Generated", "Audit Exception", "Retention Warning", "Needs Review"
  ],

  auditRegistry: [
    { id: "aud-01", auditRef: "AD-64871", timestamp: "Aug 14, 10:10 AM", eventType: "ROLE_APPROVAL", entityType: "Role", entityId: "ROLE-0147", module: "AI Studio", actor: "Arun Silva", actorType: "Human", tenant: "SL Beauty", businessUnit: "Release Manager", channel: "Prod", environment: "Prod", changeType: "Privilege", previous: "Pending", new: "Approved", risk: "High", result: "Success", correlationRef: "COR-1971", hashCount: 12 },
    { id: "aud-02", auditRef: "AD-64870", timestamp: "Aug 14, 10:05 AM", eventType: "CONFIG_CHANGE", entityType: "Config", entityId: "CFG-1287", module: "AI Studio Advisor", actor: "Sanjay P.", actorType: "Service", tenant: "SL Beauty", businessUnit: "System Agent", channel: "Prod", environment: "Prod", changeType: "Update", previous: "v2.0", new: "v2.1", risk: "Medium", result: "Success", correlationRef: "COR-1970", hashCount: 1 },
    { id: "aud-03", auditRef: "AD-64869", timestamp: "Aug 14, 10:01 AM", eventType: "ASSIGNMENT_CHANGE", entityType: "Assignment", entityId: "ASG-7701", module: "Tenant Admin", actor: "Nimal Perera", actorType: "Human", tenant: "SL Beauty", businessUnit: "Integration Eng", channel: "Prod", environment: "Prod", changeType: "Enable", previous: "Disabled", new: "Enabled", risk: "Low", result: "Success", correlationRef: "COR-1969", hashCount: 1 },
    { id: "aud-04", auditRef: "AD-64868", timestamp: "Aug 14, 09:55 AM", eventType: "FEATURE_TOGGLE", entityType: "Feature", entityId: "FLG-1012", module: "B2C Market", actor: "Sachin Rodrigo", actorType: "Human", tenant: "SL Beauty", businessUnit: "System Admin", channel: "Prod", environment: "Prod", changeType: "Toggle", previous: "Off", new: "On", risk: "Medium", result: "Success", correlationRef: "COR-1968", hashCount: 1 },
    { id: "aud-05", auditRef: "AD-64867", timestamp: "Aug 14, 09:21 AM", eventType: "INTEGRATION_CHANGE", entityType: "Integration", entityId: "INT-7510", module: "Service Mesh", actor: "Sujap De S.", actorType: "Human", tenant: "SL Beauty", businessUnit: "DevOps Engineer", channel: "Staging", environment: "Staging", changeType: "Update", previous: "v2.0", new: "v2.1", risk: "Low", result: "Success", correlationRef: "COR-1967", hashCount: 1 },
    { id: "aud-06", auditRef: "AD-64866", timestamp: "Aug 14, 09:12 AM", eventType: "ACCESS_GRANTED", entityType: "Access", entityId: "ACC-9904", module: "Auth Service", actor: "Manet Nanayakkara", actorType: "Human", tenant: "SL Beauty", businessUnit: "Security Admin", channel: "Prod", environment: "Prod", changeType: "Grant", previous: "None", new: "Read/Write", risk: "High", result: "Success", correlationRef: "COR-1966", hashCount: 1 },
  ] as AuditRegistryItem[],

  selectedRecordDetail: {
    auditRef: "AD-64871",
    eventType: "ROLE_APPROVAL",
    entity: "AI Advisor v1.1.0",
    module: "AI Studio",
    actor: "Priya Kumar (Release Manager)",
    status: "Approved",
    riskLevel: "High",
    correlationRef: "COR-1971",
    hashCount: 12,
  },

  beforeAfterComparison: {
    status: { before: "Pending Approval", after: "Approved" },
    scope: { before: "AI Studio", after: "Enterprise Wide" },
    owner: { before: "Pran Silva", after: "Priya Kumar" },
    version: { before: "v2.0.0-rc1", after: "v2.1.0" },
    environment: { before: "Staging", after: "Production" },
    policy: { before: "Release Policy v1.2", after: "Release Policy v2.4" },
    riskLevel: { before: "Medium", after: "High" },
  },

  entityTimeline: [
    { timestamp: "Aug 14, 10:10 AM", event: "Review Approved", actor: "Priya Kumar", details: "Role assignment approved for production release." },
    { timestamp: "Aug 14, 09:58 AM", event: "Configuration Updated", actor: "Sanjay P.", details: "Config key v2.1 pushed to release candidate." },
    { timestamp: "Aug 14, 09:35 AM", event: "Assigned Role to Team", actor: "Nimal Perera", details: "Entitlements added for integration team." },
    { timestamp: "Aug 14, 09:18 AM", event: "Release Trigger Changed", actor: "Sachin Rodrigo", details: "Manual trigger updated to automated deployment pipeline." },
    { timestamp: "Aug 14, 08:51 AM", event: "Initial Draft Created", actor: "Manet K.", details: "Draft role policy submitted for review." },
  ],

  configHistory: [
    { changedAt: "Aug 14, 09:58 AM", configKey: "avgAdvisorMode", fromValue: "v2.0", toValue: "v2.1", actor: "Arun Silva" },
    { changedAt: "Aug 14, 09:12 AM", configKey: "paymentTimeout", fromValue: "1.5s", toValue: "1.0s", actor: "Sujap De S." },
    { changedAt: "Aug 13, 11:25 AM", configKey: "serviceMesh", fromValue: "v2.1", toValue: "v2.1.1", actor: "Sachin Rodrigo" },
  ] as ConfigHistoryItem[],

  assignmentHistory: [
    { changedAt: "Aug 14, 09:35 AM", scope: "AI Studio", from: "Air Travel Support", to: "AI Advisor", actor: "N. Perera" },
    { changedAt: "Aug 13, 04:12 PM", scope: "AI Studio", from: "IT Lead", to: "Super Admin", actor: "H. Silva" },
    { changedAt: "Aug 12, 09:45 AM", scope: "Data Team", from: "N. Perera", to: "K. Silva", actor: "K. Silva" },
  ] as AssignmentHistoryItem[],

  releaseHistory: [
    { releasedAt: "Aug 14, 10:02 AM", module: "AI Studio", version: "v2.1", status: "Approved", actor: "Priya Kumar" },
    { releasedAt: "Aug 13, 06:22 PM", module: "AI Studio Advisor", version: "v1.2.0", status: "Approved", actor: "Arun Silva" },
    { releasedAt: "Aug 13, 07:30 PM", module: "Data Sync", version: "v1.50", status: "Released", actor: "S. De Silva" },
  ] as ReleaseHistoryItem[],

  featureFlagHistory: [
    { changedAt: "Aug 14, 09:55 AM", flag: "Smart Routing", from: "Off", to: "On", actor: "Sachin R." },
    { changedAt: "Aug 13, 05:12 PM", flag: "Beta Search", from: "Off", to: "On", actor: "H. Silva" },
    { changedAt: "Aug 12, 01:22 PM", flag: "Debug Mode", from: "On", to: "Off", actor: "U. Jayasundera" },
  ] as FeatureFlagHistoryItem[],

  integrationHistory: [
    { changedAt: "Aug 14, 09:21 AM", integration: "Payment API", from: "v2.0", to: "v2.1", status: "Success" },
    { changedAt: "Aug 13, 09:22 PM", integration: "Email Service", from: "v2.1", to: "v2.2", status: "Success" },
    { changedAt: "Aug 12, 05:43 PM", integration: "OMS Sync", from: "v1.5", to: "v1.6", status: "Success" },
  ] as IntegrationHistoryItem[],

  governanceAccessHistory: [
    { changedAt: "Aug 14, 09:12 AM", event: "Permission Grant", actor: "R. Fernando", result: "Success" },
    { changedAt: "Aug 13, 08:22 PM", event: "Role Update", actor: "M. Perera", result: "Success" },
    { changedAt: "Aug 12, 10:05 PM", event: "Policy Update", actor: "N. Fernando", result: "Success" },
  ] as GovernanceAccessHistoryItem[],

  securityEvents: [
    { changedAt: "Aug 14, 08:01 AM", event: "Policy Violation", severity: "High", status: "Resolved" },
    { changedAt: "Aug 13, 11:46 AM", event: "Suspicious Login", severity: "Medium", status: "Resolved" },
    { changedAt: "Aug 12, 08:41 AM", event: "Access Anomaly", severity: "Low", status: "Resolved" },
  ] as SecurityEventItem[],

  reports: [
    { id: "rep-01", name: "Ecosystem Audit Summary", category: "Governance", frequency: "Monthly", owner: "Audit Team", status: "Active" },
    { id: "rep-02", name: "Change Activity Report", category: "Monthly", frequency: "Weekly", owner: "Platform Ops", status: "Active" },
    { id: "rep-03", name: "Access & Governance Report", category: "Security", frequency: "Monthly", owner: "Security Team", status: "Active" },
  ] as ReportItem[],

  scheduledReports: [
    { id: "srep-01", report: "Ecosystem Audit Summary", module: "Security", nextRun: "Aug 15, 2026", status: "Scheduled" },
    { id: "srep-02", report: "High-Risk Changes", module: "Change Mgmt", nextRun: "Aug 15, 2026", status: "Scheduled" },
    { id: "srep-03", report: "Access Review Report", module: "Security", nextRun: "Aug 16, 2026", status: "Scheduled" },
  ] as ScheduledReportItem[],

  exportJobs: [
    { id: "exp-01", exportName: "User Data Export", scope: "All Users", status: "Completed", size: "123.4 GB" },
    { id: "exp-02", exportName: "Audit Evidence Export", scope: "All Records", status: "Completed", size: "67.8 GB" },
    { id: "exp-03", exportName: "Change History Export", scope: "All Changes", status: "Completed", size: "26.1 GB" },
  ] as ExportJobItem[],

  failedExports: [
    { id: "fexp-01", exportName: "Payment Logs Export", scope: "Payments", failedOn: "Aug 14, 09:15 AM", reason: "Timeout" },
    { id: "fexp-02", exportName: "Security Data Export", scope: "Security", failedOn: "Aug 13, 07:22 PM", reason: "Auth Failed" },
    { id: "fexp-03", exportName: "Billing Export", scope: "Finance", failedOn: "Aug 12, 02:01 PM", reason: "File Error" },
  ] as FailedExportItem[],

  evidencePackages: [
    { id: "ev-01", package: "Monthly Governance Evidence", module: "Governance", generatedOn: "Aug 14, 10:01 AM", status: "Ready" },
    { id: "ev-02", package: "Security Evidence Pack", module: "Security", generatedOn: "Aug 13, 08:24 AM", status: "Ready" },
    { id: "ev-03", package: "Audit Evidence Pack", module: "Audit", generatedOn: "Aug 12, 07:14 AM", status: "Ready" },
  ] as EvidencePackageItem[],

  recentAuditActivity: [
    { timestamp: "Aug 14, 10:10 AM", auditRef: "AD-64871", event: "ROLE_APPROVAL", entity: "AI Beauty Advisor", module: "AI Studio", actor: "Priya Kumar", risk: "High", result: "Success" },
    { timestamp: "Aug 14, 10:05 AM", auditRef: "AD-64870", event: "CONFIG_CHANGE", entity: "AI Trust Shield", module: "AI Studio", actor: "Sanjay P.", risk: "Medium", result: "Success" },
    { timestamp: "Aug 14, 10:01 AM", auditRef: "AD-64869", event: "ASSIGNMENT_CHANGE", entity: "AI Studio", module: "Tenant Admin", actor: "Nimal Perera", risk: "Low", result: "Success" },
    { timestamp: "Aug 14, 09:55 AM", auditRef: "AD-64868", event: "INTEGRATION_UPDATE", entity: "Payments Gateway", module: "DevOps Eng", actor: "Sujap De S.", risk: "Low", result: "Success" },
    { timestamp: "Aug 14, 08:51 AM", auditRef: "AD-64864", event: "EXPORT_GENERATED", entity: "Analytics & Reports", module: "Audit", actor: "Manet P.", risk: "Low", result: "Success" },
  ] as RecentAuditActivityItem[],

  auditHealthMatrix: [
    { domain: "Configuration", integrity: "97%", completeness: "97%", traceability: "97%", timeliness: "97%", overall: 97 },
    { domain: "Assignment", integrity: "97%", completeness: "97%", traceability: "97%", timeliness: "97%", overall: 97 },
    { domain: "Release", integrity: "95%", completeness: "95%", traceability: "95%", timeliness: "95%", overall: 95 },
    { domain: "Integration", integrity: "94%", completeness: "94%", traceability: "94%", timeliness: "94%", overall: 94 },
    { domain: "Governance", integrity: "91%", completeness: "91%", traceability: "91%", timeliness: "91%", overall: 91 },
    { domain: "Security", integrity: "96%", completeness: "96%", traceability: "96%", timeliness: "96%", overall: 96 },
    { domain: "Exports", integrity: "94%", completeness: "94%", traceability: "94%", timeliness: "94%", overall: 94 },
  ],

  rightPanel: {
    healthScore: 98,
    healthLabel: "Excellent",
    trendText: "↑ 2 pts vs last week",

    changeActivitySummary: {
      changes: "4,218",
      highRiskChanges: 11,
      configChanges: "1,284",
      assignmentChanges: 642,
      releaseEvents: 318,
      featureFlagEvents: 426,
      integrationChanges: 392,
      governanceAccessEvents: 814,
    },

    reportsExportsSummary: {
      reportsGenerated: 486,
      exportsCompleted: 312,
      scheduledReports: 18,
      evidencePackages: 42,
      failedExports: 3,
    },

    auditRiskSummary: {
      auditExceptions: 7,
      retentionWarnings: 2,
      failedExports: 3,
      missingApprovals: 2,
      traceabilityWarnings: 2,
      integrityFailures: 0,
    },

    quickQueues: [
      { label: "High-Risk Changes", count: 11, tone: "danger" },
      { label: "Audit Exceptions", count: 7, tone: "warning" },
      { label: "Failed Exports", count: 3, tone: "danger" },
      { label: "Retention Warnings", count: 2, tone: "warning" },
      { label: "Missing Approvals", count: 2, tone: "warning" },
      { label: "Scheduled Reports Due", count: 2, tone: "info" },
      { label: "Evidence Reviews", count: 2, tone: "info" },
      { label: "Integrity Failures", count: 14, tone: "danger" },
    ],

    recommendedNextAction: {
      title: "Recommended Next Action",
      text: "Review open audit exceptions before generating the monthly ecosystem governance report. High-risk items and overdue evidence require attention. Some records are missing compliance documentation references and some exports require retention review.",
      buttonLabel: "Review Exceptions (7)",
    }
  }
};
