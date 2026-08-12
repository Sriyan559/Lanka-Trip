export interface GovernanceContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  governanceScope: string;
  consentSource: string;
  complianceSource: string;
  contentRightsSync: string;
  policyVersion: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface GovernanceKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  variant: "blue" | "green" | "red" | "orange" | "amber" | "purple";
}

export interface GovernanceReadinessCounters {
  clear: number;
  warning: number;
  reviewRequired: number;
  blocked: number;
  approvalPending: number;
  consentWarning: number;
  frequencyWarning: number;
  contentRightsReview: number;
}

export interface GovernancePortfolioItem {
  id: string;
  governanceItem: string;
  itemId: string;
  type: string;
  relatedEntity: string;
  relatedEntityId: string;
  entityType: string;
  status: "Clear" | "Warning" | "Review Required" | "Blocked" | "Approval Pending";
  policy: string;
  source: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  owner: string;
  approval: "Approved" | "Pending Approval" | "Rejected" | "Not Required";
  effectiveFrom: string;
  reviewDue: string;
  exceptionsCount: number;
  lastEvaluated: string;
}

export interface PolicyCheckResult {
  ruleName: string;
  status: "Pass" | "Warn" | "Fail" | "Review";
}

export interface ConsentEligibilityItem {
  reason: string;
  source: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

export interface FrequencyControlItem {
  policy: string;
  crossChannelCap: string;
  emailLimit: string;
  smsLimit: string;
  pushLimit: string;
  suppressionWindow: string;
  timeHours: string;
  timeZone: string;
  consentViolations: number;
  status: string;
}

export interface CollisionAnalysisItem {
  journeyCampaign: string;
  affectedCustomers: number;
  currentFrequency: string;
  policyMax: string;
  severity: "Clear" | "Warning" | "Review" | "Blocked";
}

export interface PendingApprovalItem {
  id: string;
  item: string;
  approvalType: string;
  appliesTo: string;
  age: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  approver: string;
  status: "Pending" | "Approved" | "Rejected" | "Overdue";
}

export interface ChannelGovernanceItem {
  channel: string;
  governanceStatus: "Clear" | "Warning" | "Review Required" | "Blocked";
  lastReview: string;
  owner: string;
}

export interface ContentRightsItem {
  contentType: string;
  rightsStatus: "Approved" | "Expiring" | "Review Required" | "Expired" | "Restricted";
  expiryDate: string;
  source: string;
}

export interface EvidenceSnapshotItem {
  evidenceType: string;
  source: string;
  capturedOn: string;
}

export interface DataUseGovernanceData {
  allowedPurpose: string;
  allowedDataClasses: string;
  dataRetention: string;
  customerLevelExports: string;
  sharingThirdParties: string;
  crossBorderUse: string;
  dataSubjectRights: string;
  dataUsePolicy: string;
}

export interface ApprovalWorkflowStep {
  role: string;
  state: "Approved" | "Pending" | "Rejected" | "Not Required" | "Escalated";
  timestamp?: string;
}

export interface GovernanceAuditItem {
  id: string;
  time: string;
  action: string;
  actor: string;
  details: string;
}

export interface GovernanceHealthLogData {
  healthScore: number;
  policyCompliance: string;
  dataCompleteness: string;
  exceptionVolume: number;
  approvalSla: string;
}

export interface EscalationRuleItem {
  id: string;
  ruleName: string;
  triggerCondition: string;
  escalatesTo: string;
  status: "Active" | "Inactive";
}

export interface SelectedGovernanceRecord {
  id: string;
  governanceItem: string;
  itemId: string;
  campaignId: string;
  entityType: string;
  businessUnit: string;
  governanceOwner: string;
  activePolicySet: string;
  currentStatus: string;
  lastEvaluated: string;
  nextReview: string;
  policySource: string;
  badges: {
    campaignStatus: "Campaign Approved" | "Campaign Pending" | "Campaign Blocked";
    consentStatus: "Consent Clear" | "Consent Warning" | "Consent Restricted";
    rightsStatus: "Rights Clear" | "Rights Review" | "Rights Expired";
    frequencyStatus: "Frequency Clear" | "Frequency Warning" | "Frequency Blocked";
  };
  metrics: {
    policyChecks: number;
    passed: number;
    warnings: number;
    blocked: number;
    pendingApproval: number;
    exceptions: number;
    governanceScore: number;
  };
  policyEvaluations: PolicyCheckResult[];
  consentEligibility: ConsentEligibilityItem[];
  frequencyControls: FrequencyControlItem;
  collisionAnalysis: CollisionAnalysisItem[];
  pendingApprovals: PendingApprovalItem[];
  channelGovernance: ChannelGovernanceItem[];
  contentRights: ContentRightsItem[];
  evidenceSnapshots: EvidenceSnapshotItem[];
  dataUseGovernance: DataUseGovernanceData;
  approvalWorkflow: ApprovalWorkflowStep[];
  auditTrail: GovernanceAuditItem[];
  healthLog: GovernanceHealthLogData;
  activeEscalationRules: number;
}

export interface GovernanceRailData {
  healthScore: number;
  healthLabel: string;
  governanceSummary: {
    activePolicies: number;
    clear: number;
    warning: number;
    reviewRequired: number;
    blocked: number;
    exceptionGranted: number;
  };
  approvalSummary: {
    pending: number;
    overdue: number;
    highPriority: number;
    averageTime: string;
    sla: string;
  };
  consentSummary: {
    evaluated: string;
    marketable: string;
    suppressed: string;
    warnings: number;
  };
  frequencySummary: {
    evaluatedCustomers: string;
    warnings: number;
    affected: number;
    critical: number;
  };
  exceptionsSummary: {
    pending: number;
    approved: number;
    severe: number;
    expired: number;
  };
  quickQueues: {
    approvalPending: number;
    approvalOverdue: number;
    contentWarnings: number;
    frequencyWarnings: number;
    contentRightsReviews: number;
    policyExceptions: number;
  };
}

export interface MarketingGovernanceData {
  context: GovernanceContextData;
  kpis: GovernanceKpiItem[];
  readiness: GovernanceReadinessCounters;
  portfolio: GovernancePortfolioItem[];
  selectedRecord: SelectedGovernanceRecord;
  rail: GovernanceRailData;
}

export const MARKETING_GOVERNANCE_MOCK_DATA: MarketingGovernanceData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    governanceScope: "All Marketing",
    consentSource: "Customer Domain",
    complianceSource: "Connected",
    contentRightsSync: "Healthy",
    policyVersion: "MKT-GOV v6",
    dateRange: "Last 30 Days",
    completenessPercent: 98,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    {
      id: "active_policies",
      label: "Active Governance Policies",
      value: "42",
      variant: "blue",
    },
    {
      id: "pending_approvals",
      label: "Pending Approvals",
      value: "15",
      subtext: "(5 overdue)",
      variant: "orange",
    },
    {
      id: "governance_exceptions",
      label: "Governance Exceptions",
      value: "12",
      subtext: "(3 high priority)",
      variant: "red",
    },
    {
      id: "consent_warnings",
      label: "Consent / Eligibility Warnings",
      value: "7",
      variant: "amber",
    },
    {
      id: "frequency_warnings",
      label: "Frequency / Contact Warnings",
      value: "9",
      variant: "orange",
    },
    {
      id: "content_reviews",
      label: "Content / Rights Reviews",
      value: "5",
      variant: "purple",
    },
    {
      id: "compliance_rate",
      label: "Policy Compliance Rate",
      value: "97.2%",
      variant: "green",
    },
    {
      id: "governance_health",
      label: "Governance Health",
      value: "96 / 100",
      variant: "green",
    },
  ],
  readiness: {
    clear: 28,
    warning: 6,
    reviewRequired: 4,
    blocked: 2,
    approvalPending: 15,
    consentWarning: 7,
    frequencyWarning: 3,
    contentRightsReview: 5,
  },
  portfolio: [
    {
      id: "gov-1",
      governanceItem: "Summer Beauty Festival",
      itemId: "GOV-2026-0041",
      type: "Campaign Governance",
      relatedEntity: "MKT-2026-0087",
      relatedEntityId: "MKT-2026-0087",
      entityType: "Campaign",
      status: "Clear",
      policy: "MKT Campaign Governance v6",
      source: "Marketing",
      severity: "Low",
      owner: "Marketing Governance",
      approval: "Approved",
      effectiveFrom: "01 Aug 2026",
      reviewDue: "18 Aug 2026",
      exceptionsCount: 0,
      lastEvaluated: "14 Aug 2026 10:15 AM",
    },
    {
      id: "gov-2",
      governanceItem: "VIP Loyalty Reactivation",
      itemId: "GOV-2026-0042",
      type: "Campaign Governance",
      relatedEntity: "MKT-2026-0068",
      relatedEntityId: "MKT-2026-0068",
      entityType: "Campaign",
      status: "Review Required",
      policy: "Frequency & Contact Policy",
      source: "Marketing",
      severity: "Medium",
      owner: "Marketing Governance",
      approval: "Pending Approval",
      effectiveFrom: "05 Aug 2026",
      reviewDue: "15 Aug 2026",
      exceptionsCount: 1,
      lastEvaluated: "14 Aug 2026 09:58 AM",
    },
    {
      id: "gov-3",
      governanceItem: "Paid Social Creative — Summer",
      itemId: "GOV-2026-0043",
      type: "Content Governance",
      relatedEntity: "CNT-2026-0554",
      relatedEntityId: "CNT-2026-0554",
      entityType: "Content",
      status: "Warning",
      policy: "Creative Rights Policy",
      source: "MK0702",
      severity: "Medium",
      owner: "Content Manager",
      approval: "Approved",
      effectiveFrom: "01 Aug 2026",
      reviewDue: "25 Aug 2026",
      exceptionsCount: 1,
      lastEvaluated: "14 Aug 2026 09:41 AM",
    },
    {
      id: "gov-4",
      governanceItem: "Premium Skincare Email Journey",
      itemId: "GOV-2026-0044",
      type: "Journey Governance",
      relatedEntity: "JRN-2026-0212",
      relatedEntityId: "JRN-2026-0212",
      entityType: "Journey",
      status: "Blocked",
      policy: "Consent Eligibility Policy",
      source: "Customer Domain",
      severity: "High",
      owner: "Marketing Governance",
      approval: "Rejected",
      effectiveFrom: "01 Aug 2026",
      reviewDue: "14 Aug 2026",
      exceptionsCount: 2,
      lastEvaluated: "14 Aug 2026 09:23 AM",
    },
    {
      id: "gov-5",
      governanceItem: "Acquisition Meta Campaign",
      itemId: "GOV-2026-0045",
      type: "Paid Media Governance",
      relatedEntity: "PMD-2026-0776",
      relatedEntityId: "PMD-2026-0776",
      entityType: "Paid Media",
      status: "Warning",
      policy: "Tracking Requirements",
      source: "MK10 / MK12",
      severity: "Medium",
      owner: "Media Manager",
      approval: "Approved",
      effectiveFrom: "03 Aug 2026",
      reviewDue: "20 Aug 2026",
      exceptionsCount: 0,
      lastEvaluated: "14 Aug 2026 08:57 AM",
    },
  ],
  selectedRecord: {
    id: "gov-4",
    governanceItem: "Premium Skincare Email Journey",
    itemId: "GOV-2026-0044",
    campaignId: "JRN-2026-0212",
    entityType: "Journey",
    businessUnit: "MKT07",
    governanceOwner: "Marketing Governance",
    activePolicySet: "MKT-Gov v6",
    currentStatus: "Blocked",
    lastEvaluated: "14 Aug 2026 09:23 AM",
    nextReview: "14 Aug 2026",
    policySource: "Customer Domain",
    badges: {
      campaignStatus: "Campaign Approved",
      consentStatus: "Consent Clear",
      rightsStatus: "Rights Clear",
      frequencyStatus: "Frequency Clear",
    },
    metrics: {
      policyChecks: 18,
      passed: 17,
      warnings: 1,
      blocked: 0,
      pendingApproval: 0,
      exceptions: 2,
      governanceScore: 98,
    },
    policyEvaluations: [
      { ruleName: "Consent Compliance", status: "Pass" },
      { ruleName: "Audience Consent Eligibility", status: "Pass" },
      { ruleName: "Frequency Cap", status: "Warn" },
      { ruleName: "Channel Eligibility", status: "Pass" },
      { ruleName: "Content Approval", status: "Pass" },
      { ruleName: "Content Rights", status: "Pass" },
      { ruleName: "Market / Category Eligibility", status: "Pass" },
      { ruleName: "Blacklist Validation", status: "Pass" },
    ],
    consentEligibility: [
      { reason: "Consent Withdrawn", source: "Customer Domain", severity: "High" },
      { reason: "Frequency Cap", source: "Frequency Engine", severity: "Medium" },
      { reason: "Invalid Contact", source: "Invalid Contact List", severity: "Medium" },
      { reason: "Risk Restriction", source: "Risk & Sanctions", severity: "High" },
      { reason: "Market / Age Restriction", source: "Market / Age Rules", severity: "Medium" },
    ],
    frequencyControls: {
      policy: "Max 7 / 7 days",
      crossChannelCap: "5 contacts / 7 days",
      emailLimit: "2 / 7 days",
      smsLimit: "1 / 7 days",
      pushLimit: "3 / 7 days",
      suppressionWindow: "7 days (configurable)",
      timeHours: "21:00 - 07:00",
      timeZone: "Asia / Colombo",
      consentViolations: 0,
      status: "Compliant",
    },
    collisionAnalysis: [
      { journeyCampaign: "VIP Loyalty Reactivation", affectedCustomers: 1236, currentFrequency: "6 / 7 days", policyMax: "5", severity: "Warning" },
      { journeyCampaign: "Premium Skincare Journey", affectedCustomers: 614, currentFrequency: "Email + SMS within restricted interval", policyMax: "-", severity: "Review" },
      { journeyCampaign: "Abandoned Cart - SMS Reminder", affectedCustomers: 414, currentFrequency: "-", policyMax: "-", severity: "Review" },
    ],
    pendingApprovals: [
      { id: "app-1", item: "VIP Loyalty Reactivation", approvalType: "Campaign Approval", appliesTo: "Campaign", age: "2d 4h", priority: "High", approver: "Marketing Director", status: "Pending" },
      { id: "app-2", item: "Paid Social Creative - Summer", approvalType: "Content Approval", appliesTo: "Content", age: "1d 8h", priority: "Medium", approver: "Creative Lead", status: "Pending" },
      { id: "app-3", item: "Influencer Launch Video", approvalType: "Rights Approval", appliesTo: "Content", age: "3d 1h", priority: "Medium", approver: "Legal Counsel", status: "Pending" },
    ],
    channelGovernance: [
      { channel: "Email", governanceStatus: "Clear", lastReview: "14 Aug 2026", owner: "Marketing Governance" },
      { channel: "SMS", governanceStatus: "Warning", lastReview: "14 Aug 2026", owner: "Marketing Governance" },
      { channel: "Push", governanceStatus: "Clear", lastReview: "14 Aug 2026", owner: "Marketing Governance" },
      { channel: "Paid Social", governanceStatus: "Review Required", lastReview: "14 Aug 2026", owner: "Media Manager" },
      { channel: "Web / App", governanceStatus: "Clear", lastReview: "14 Aug 2026", owner: "Marketing Governance" },
    ],
    contentRights: [
      { contentType: "Email Template", rightsStatus: "Approved", expiryDate: "02 Oct 2026", source: "Rights Vault" },
      { contentType: "Banner Image", rightsStatus: "Approved", expiryDate: "12 Sep 2026", source: "Rights Vault" },
      { contentType: "Product Video", rightsStatus: "Approved", expiryDate: "01 Dec 2026", source: "Rights Vault" },
      { contentType: "Influencer Content", rightsStatus: "Review Required", expiryDate: "-", source: "Rights Hub" },
      { contentType: "User Generated Content", rightsStatus: "Approved", expiryDate: "20 Oct 2026", source: "UGC Platform" },
    ],
    evidenceSnapshots: [
      { evidenceType: "Policy Evaluation Snapshot", source: "Governance Engine", capturedOn: "14 Aug 2026 09:23 AM" },
      { evidenceType: "Consent Eligibility Snapshot", source: "Customer Domain", capturedOn: "14 Aug 2026 09:15 AM" },
      { evidenceType: "Frequency Evaluation Snapshot", source: "Frequency Engine", capturedOn: "14 Aug 2026 09:10 AM" },
      { evidenceType: "Content History Snapshot", source: "Customer Domain", capturedOn: "14 Aug 2026 09:15 AM" },
      { evidenceType: "Content Rights Snapshot", source: "Rights Vault", capturedOn: "14 Aug 2026 09:12 AM" },
    ],
    dataUseGovernance: {
      allowedPurpose: "Marketing",
      allowedDataClasses: "Pseudonymous",
      dataRetention: "90 days",
      customerLevelExports: "Disabled",
      sharingThirdParties: "Disabled",
      crossBorderUse: "Within Region",
      dataSubjectRights: "Enabled",
      dataUsePolicy: "",
    },
    approvalWorkflow: [
      { role: "Marketing Manager", state: "Approved" },
      { role: "Brand Review", state: "Approved" },
      { role: "Governance Review", state: "Approved" },
      { role: "Finance Review (if required)", state: "Not Required" },
      { role: "Executive Approval (if required)", state: "Not Required" },
    ],
    auditTrail: [
      { id: "aud-1", time: "14 Aug 2026 10:15 AM", action: "Policy Evaluation Completed", actor: "Governance Engine", details: "18 checks passed, 1 warning" },
      { id: "aud-2", time: "14 Aug 2026 09:23 AM", action: "Governance Status Updated", actor: "Marketing Governance", details: "Status changed to Blocked" },
      { id: "aud-3", time: "14 Aug 2026 09:15 AM", action: "Consent Re-evaluated", actor: "Customer Domain", details: "Consent withdrawal detected" },
    ],
    healthLog: {
      healthScore: 96,
      policyCompliance: "97.2%",
      dataCompleteness: "98%",
      exceptionVolume: 12,
      approvalSla: "94%",
    },
    activeEscalationRules: 12,
  },
  rail: {
    healthScore: 96,
    healthLabel: "Excellent",
    governanceSummary: {
      activePolicies: 42,
      clear: 28,
      warning: 6,
      reviewRequired: 4,
      blocked: 2,
      exceptionGranted: 2,
    },
    approvalSummary: {
      pending: 15,
      overdue: 5,
      highPriority: 4,
      averageTime: "3h 42m",
      sla: "94%",
    },
    consentSummary: {
      evaluated: "1.21M",
      marketable: "1.08M",
      suppressed: "86.4K",
      warnings: 7,
    },
    frequencySummary: {
      evaluatedCustomers: "318K",
      warnings: 3,
      affected: 1998,
      critical: 0,
    },
    exceptionsSummary: {
      pending: 12,
      approved: 6,
      severe: 3,
      expired: 1,
    },
    quickQueues: {
      approvalPending: 15,
      approvalOverdue: 5,
      contentWarnings: 7,
      frequencyWarnings: 3,
      contentRightsReviews: 5,
      policyExceptions: 12,
    },
  },
};
