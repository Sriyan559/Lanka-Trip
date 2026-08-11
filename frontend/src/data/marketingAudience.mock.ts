export interface AudienceKpiItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  color?: string;
}

export interface AudienceContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  scope: string;
  customerSource: string;
  consentSync: string;
  refresh: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface AudienceReadinessCounters {
  ready: number;
  needsRefresh: number;
  consentWarning: number;
  suppressionRisk: number;
  lowMatchRate: number;
  ruleError: number;
}

export interface AudienceRecord {
  id: string;
  code: string;
  name: string;
  type: string;
  status: "Active" | "Draft" | "Archived";
  owner: string;
  businessUnit: string;
  sourceSegments: string;
  eligible: string;
  marketable: string;
  suppressed: string;
  email: string;
  sms: string;
  push: string;
  paidMediaMatch: number;
  refreshMode: "Automatic" | "Daily" | "Manual";
  lastRecalc: string;
  linkedCampaigns: number;
  governance: "Clear" | "Consent Warning" | "Review Required" | "Blocked";
}

export interface SelectedAudienceDetails {
  code: string;
  name: string;
  status: string;
  eligibleCustomers: string;
  marketableCustomers: string;
  suppressedCustomers: string;
  reachableCustomers: string;
  paidMediaMatch: string;
  linkedCampaignsCount: number;
  failedOutdated: string;
  composition: {
    lifecycle: Array<{ name: string; percentage: number; color: string }>;
    valueTier: Array<{ name: string; percentage: number; color: string }>;
  };
  rules: Array<{ category: string; percentage: number }>;
  freshness: {
    refreshMode: string;
    frequency: string;
    lastRecalc: string;
    duration: string;
    nextRefresh: string;
    sourceHealth: string;
    ruleEvaluation: string;
    identityResolution: string;
    freshness: string;
  };
  linkedCampaignsList: Array<{ id: string; name: string; status: string; role: string; reach: string }>;
  linkedJourneys: Array<{ id: string; name: string; status: string; ruleType: string; contacts: string }>;
  channelEligibility: Array<{ channel: string; eligible: string; successRate: string; matchRate: string }>;
  suppressions: {
    total: string;
    reasons: Array<{ reason: string; count: string; percentage: number }>;
  };
  overlap: Array<{ name: string; count: string; percentage: number }>;
  audit: {
    created: { date: string; time: string; user: string };
    lastModified: { date: string; time: string; user: string };
    lastRecalculated: { date: string; time: string; user: string };
    lastRefresh: { date: string; time: string; user: string };
  };
}

export interface AudienceRightRailData {
  healthScore: number;
  metrics: Array<{ label: string; score: number }>;
  audienceSummary: { totalSaved: number; active: number; draft: number; archived: number };
  customerReach: { marketable: string; suppressed: string; potential: string };
  eligibility: { email: string; sms: string; push: string; paidMedia: string };
  refreshSummary: { healthy: number; needsRefresh: number; failed: number };
  governanceSummary: { clear: number; warnings: number; blocked: number };
  quickQueues: Array<{ label: string; count: number; severity: "red" | "orange" | "purple" }>;
}

export interface FullMarketingAudienceData {
  context: AudienceContextData;
  kpis: AudienceKpiItem[];
  readiness: AudienceReadinessCounters;
  portfolio: AudienceRecord[];
  selectedAudience: SelectedAudienceDetails;
  rightRail: AudienceRightRailData;
}

export const mockMarketingAudienceData: FullMarketingAudienceData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    scope: "All Marketing Audiences",
    customerSource: "Customer Domain",
    consentSync: "Healthy",
    refresh: "Near Real-Time",
    dateRange: "Last 30 Days",
    completenessPercent: 97,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Assigned business context",
  },
  kpis: [
    { id: "1", label: "TOTAL SAVED AUDIENCES", value: "84", subtext: "Across current scope" },
    { id: "2", label: "MARKETABLE CUSTOMERS", value: "1.21M", subtext: "Eligible for at least one channel" },
    { id: "3", label: "SUPPRESSED CUSTOMERS", value: "86.4K", subtext: "Consent & frequency exclusions" },
    { id: "4", label: "ACTIVE SEGMENTS", value: "42", subtext: "Reusable segment definitions" },
    { id: "5", label: "RECENTLY RECALCULATED", value: "31", subtext: "Last 24 hours" },
    { id: "6", label: "HIGH-VALUE AUDIENCE", value: "112K", subtext: "Top customer value tier" },
    { id: "7", label: "REACH POTENTIAL", value: "1.84M", subtext: "Cross-channel identities" },
    { id: "8", label: "AUDIENCE HEALTH", value: "94 /100", subtext: "Healthy" },
  ],
  readiness: {
    ready: 58,
    needsRefresh: 7,
    consentWarning: 5,
    suppressionRisk: 4,
    lowMatchRate: 3,
    ruleError: 2,
  },
  portfolio: [
    {
      id: "AUD-2026-0038",
      code: "AUD-2026-0038",
      name: "Beauty Enthusiasts",
      type: "Dynamic Segment",
      status: "Active",
      owner: "CRM Marketing",
      businessUnit: "Beauty Retail",
      sourceSegments: "Behavior + Category Interest",
      eligible: "428K",
      marketable: "401K",
      suppressed: "27K",
      email: "386K",
      sms: "312K",
      push: "271K",
      paidMediaMatch: 89,
      refreshMode: "Automatic",
      lastRecalc: "12 min ago",
      linkedCampaigns: 8,
      governance: "Clear",
    },
    {
      id: "AUD-2026-0044",
      code: "AUD-2026-0044",
      name: "Premium Skincare Buyers",
      type: "Behavioral Segment",
      status: "Active",
      owner: "CRM Marketing",
      businessUnit: "Beauty Retail",
      sourceSegments: "Purchase + High Value",
      eligible: "174K",
      marketable: "162K",
      suppressed: "12K",
      email: "158K",
      sms: "121K",
      push: "109K",
      paidMediaMatch: 92,
      refreshMode: "Automatic",
      lastRecalc: "18 min ago",
      linkedCampaigns: 5,
      governance: "Clear",
    },
    {
      id: "AUD-2026-0051",
      code: "AUD-2026-0051",
      name: "New Customers – 30 Days",
      type: "Lifecycle Segment",
      status: "Active",
      owner: "CRM Marketing",
      businessUnit: "Beauty Retail",
      sourceSegments: "New Customer (30 Days)",
      eligible: "143K",
      marketable: "137K",
      suppressed: "6K",
      email: "134K",
      sms: "92K",
      push: "81K",
      paidMediaMatch: 81,
      refreshMode: "Daily",
      lastRecalc: "22 min ago",
      linkedCampaigns: 4,
      governance: "Clear",
    },
    {
      id: "AUD-2026-0057",
      code: "AUD-2026-0057",
      name: "Loyalty VIP",
      type: "Value Segment",
      status: "Active",
      owner: "Loyalty Team",
      businessUnit: "Beauty Retail",
      sourceSegments: "Loyalty Tier + VIP",
      eligible: "42K",
      marketable: "41K",
      suppressed: "1K",
      email: "40K",
      sms: "31K",
      push: "26K",
      paidMediaMatch: 93,
      refreshMode: "Automatic",
      lastRecalc: "25 min ago",
      linkedCampaigns: 3,
      governance: "Clear",
    },
    {
      id: "AUD-2026-0062",
      code: "AUD-2026-0062",
      name: "Dormant 90+ Days",
      type: "Re-engagement Segment",
      status: "Active",
      owner: "CRM Marketing",
      businessUnit: "Beauty Retail",
      sourceSegments: "No Purchase > 90 Days",
      eligible: "91K",
      marketable: "78K",
      suppressed: "13K",
      email: "70K",
      sms: "41K",
      push: "33K",
      paidMediaMatch: 67,
      refreshMode: "Daily",
      lastRecalc: "2 hr ago",
      linkedCampaigns: 2,
      governance: "Consent Warning",
    },
    {
      id: "AUD-2026-0058",
      code: "AUD-2026-0058",
      name: "Skincare Retargeting",
      type: "Campaign Audience",
      status: "Active",
      owner: "CRM Marketing Team",
      businessUnit: "Beauty Retail",
      sourceSegments: "Recent Engagers (Skincare)",
      eligible: "216K",
      marketable: "198K",
      suppressed: "18K",
      email: "192K",
      sms: "131K",
      push: "104K",
      paidMediaMatch: 74,
      refreshMode: "Automatic",
      lastRecalc: "1 hr ago",
      linkedCampaigns: 3,
      governance: "Review Required",
    },
  ],
  selectedAudience: {
    code: "AUD-2026-0038",
    name: "Beauty Enthusiasts",
    status: "Active",
    eligibleCustomers: "428,000",
    marketableCustomers: "401,000",
    suppressedCustomers: "27,000",
    reachableCustomers: "392,000",
    paidMediaMatch: "89%",
    linkedCampaignsCount: 8,
    failedOutdated: "27,000",
    composition: {
      lifecycle: [
        { name: "New", percentage: 29, color: "#06b6d4" },
        { name: "Active", percentage: 45, color: "#10b981" },
        { name: "Loyal", percentage: 19, color: "#8b5cf6" },
        { name: "At Risk", percentage: 5, color: "#f59e0b" },
        { name: "Dormant", percentage: 2, color: "#ef4444" },
      ],
      valueTier: [
        { name: "High Value", percentage: 27, color: "#800020" },
        { name: "Medium Value", percentage: 51, color: "#2563eb" },
        { name: "Standard", percentage: 18, color: "#64748b" },
        { name: "Low", percentage: 4, color: "#94a3b8" },
      ],
    },
    rules: [
      { category: "Skincare", percentage: 45 },
      { category: "Makeup", percentage: 28 },
      { category: "Fragrance", percentage: 16 },
      { category: "Haircare", percentage: 8 },
      { category: "Wellness", percentage: 3 },
    ],
    freshness: {
      refreshMode: "Automatic",
      frequency: "Every 30 Minutes",
      lastRecalc: "10:03 AM",
      duration: "42 sec",
      nextRefresh: "10:33 AM",
      sourceHealth: "Healthy",
      ruleEvaluation: "Passed",
      identityResolution: "99.2%",
      freshness: "Current",
    },
    linkedCampaignsList: [
      { id: "c1", name: "Summer Beauty Festival", status: "Active", role: "Primary", reach: "192K" },
      { id: "c2", name: "Premium Skincare Re-Engagement", status: "Active", role: "Primary", reach: "126K" },
      { id: "c3", name: "Haircare Cross-Sell", status: "Scheduled", role: "Exclusion / Reference", reach: "84K" },
    ],
    linkedJourneys: [
      { id: "j1", name: "Skincare Welcome Journey", status: "Running", ruleType: "Entry Audience", contacts: "48,120" },
      { id: "j2", name: "Loyalty Upsell Journey", status: "Running", ruleType: "Eligibility Rule", contacts: "22,310" },
      { id: "j3", name: "Re-engagement Journey", status: "Paused", ruleType: "Entry Audience", contacts: "18,450" },
    ],
    channelEligibility: [
      { channel: "Email", eligible: "368K", successRate: "97%", matchRate: "78%" },
      { channel: "SMS", eligible: "312K", successRate: "96%", matchRate: "72%" },
      { channel: "Push", eligible: "271K", successRate: "93%", matchRate: "65%" },
      { channel: "Paid Social", eligible: "331K", successRate: "95%", matchRate: "71%" },
      { channel: "Paid Search", eligible: "348K", successRate: "93%", matchRate: "69%" },
    ],
    suppressions: {
      total: "27,000",
      reasons: [
        { reason: "Consent Withdrawn", count: "12,840", percentage: 47.6 },
        { reason: "Frequency Cap", count: "5,430", percentage: 20.1 },
        { reason: "Risk / Restriction", count: "3,100", percentage: 11.5 },
        { reason: "Invalid Email / Phone", count: "2,940", percentage: 10.9 },
        { reason: "Duplicate Identity", count: "1,420", percentage: 5.3 },
        { reason: "Region / Market Rule", count: "1,200", percentage: 4.4 },
      ],
    },
    overlap: [
      { name: "Premium Skincare Buyers", count: "182K", percentage: 29 },
      { name: "Loyalty VIP", count: "31K", percentage: 7 },
      { name: "New Customers – 30 Days", count: "54K", percentage: 13 },
      { name: "Dormant 90+ Days", count: "88K", percentage: 4 },
    ],
    audit: {
      created: { date: "Apr 14, 2026", time: "09:12 AM", user: "Upeksha Rodrigo" },
      lastModified: { date: "May 14, 2026", time: "01:58 AM", user: "Dulanjana Perera" },
      lastRecalculated: { date: "May 14, 2026", time: "10:03 AM", user: "System" },
      lastRefresh: { date: "May 14, 2026", time: "10:03 AM", user: "System" },
    },
  },
  rightRail: {
    healthScore: 94,
    metrics: [
      { label: "Consent Integrity", score: 98 },
      { label: "Reachability", score: 95 },
      { label: "Refresh Health", score: 96 },
      { label: "Identity Resolution", score: 99 },
      { label: "Match Quality", score: 89 },
      { label: "Rule Integrity", score: 96 },
      { label: "Suppression Accuracy", score: 97 },
    ],
    audienceSummary: { totalSaved: 84, active: 72, draft: 7, archived: 5 },
    customerReach: { marketable: "1.21M", suppressed: "86.4K", potential: "1.84M" },
    eligibility: { email: "1.08M", sms: "842K", push: "719K", paidMedia: "1.02M" },
    refreshSummary: { healthy: 76, needsRefresh: 7, failed: 1 },
    governanceSummary: { clear: 74, warnings: 8, blocked: 2 },
    quickQueues: [
      { label: "Needs Refresh", count: 7, severity: "orange" },
      { label: "Consent Warnings", count: 5, severity: "orange" },
      { label: "Suppression Review", count: 4, severity: "red" },
      { label: "Low Match Rate", count: 3, severity: "purple" },
      { label: "Rule Errors", count: 2, severity: "red" },
    ],
  },
};
