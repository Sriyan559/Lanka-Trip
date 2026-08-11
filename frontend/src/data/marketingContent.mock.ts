export interface ContentContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  scope: string;
  catalogueMediaSource: string;
  brandRules: string;
  rightsValidation: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface ContentKpiItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  status: "approved" | "pending" | "warning" | "healthy";
}

export interface ContentStatusCounters {
  active: number;
  inReview: number;
  draft: number;
  approved: number;
  rejected: number;
  notSubmitted: number;
}

export interface ContentLibraryItem {
  id: string;
  previewUrl: string;
  name: string;
  contentId: string;
  type: string;
  status: "Active" | "In Review" | "Draft" | "Approved";
  owner: string;
  brand: string;
  businessUnit: string;
  primaryMarket: string;
  version: string;
  variantsCount: number;
  approvalStatus: "Approved" | "In Review" | "Not Submitted" | "Rejected";
  rightsState: "Rights Valid" | "Expiring Soon" | "Expired" | "Restricted";
  usageSummary: string;
  linkedCampaignsCount: number;
  performanceCtr: string;
  lastUpdated: string;
}

export interface ContentVariantItem {
  name: string;
  version: string;
  status: "Approved" | "In Review" | "Draft" | "Rejected";
  dimensions: string;
}

export interface ChannelReadinessItem {
  channel: string;
  status: "Ready" | "Non Applicable" | "Needs Attention";
}

export interface UsagePlacementItem {
  name: string;
  type: "Campaign" | "Journey" | "Placement";
  location: string;
  status: "Active" | "Running";
}

export interface LinkedCampaignItem {
  id: string;
  name: string;
  role: string;
  status: "Active" | "Scheduled" | "Draft";
}

export interface LinkedJourneyItem {
  id: string;
  name: string;
  status: "Running" | "Paused";
  role: string;
}

export interface ApprovalStep {
  step: string;
  date: string;
  completed: boolean;
}

export interface PendingApprovalItem {
  name: string;
  status: string;
  time: string;
}

export interface RightsInfo {
  state: string;
  type: string;
  scope: string;
  markets: string;
  channels: string;
  startDate: string;
  expiryDate: string;
  talent: string;
  musicLicense: string;
  restrictions: string;
}

export interface GovernanceCheck {
  name: string;
  status: "Pass" | "Warning" | "Fail";
}

export interface ContentExceptionItem {
  title: string;
  severity: "Warning" | "Critical" | "Review";
  action: string;
}

export interface ContentPerformanceData {
  impressions: string;
  clicks: string;
  ctr: string;
  conversions: string;
  attributedRevenue: string;
  peerComparison: string;
  chartPoints: Array<{ month: string; clicks: number; conversions: number }>;
}

export interface ContentVersionItem {
  version: string;
  status: "Active" | "Archived" | "Draft";
  publishedOn: string;
  changes: string;
  changedBy: string;
}

export interface ContentActivityItem {
  time: string;
  activity: string;
}

export interface ContentAuditItem {
  label: string;
  count: number;
}

export interface ContentRightRailData {
  healthScore: number;
  approvalReadinessPct: number;
  rightsValidityPct: number;
  channelReadinessPct: number;
  brandCompliancePct: number;
  accessibilityPct: number;
  versionIntegrityPct: number;
  usageIntegrityPct: number;
  totalAssets: number;
  approvedAssets: number;
  draftAssets: number;
  inReviewAssets: number;
  archivedAssets: number;
  pendingApprovals: number;
  inReviewApprovals: number;
  overdueApprovals: number;
  validRights: number;
  expiringRights: number;
  expiredRights: number;
  restrictedRights: number;
  inCampaignsUsage: number;
  inJourneysUsage: number;
  activePlacementsUsage: number;
  unusedAssets: number;
  readyReadiness: number;
  missingVariants: number;
  policyWarnings: number;
  rightsWarnings: number;
  accessibilityIssues: number;
}

export const mockMarketingContentData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    scope: "All Marketing Content",
    catalogueMediaSource: "Connected",
    brandRules: "Healthy",
    rightsValidation: "Healthy",
    dateRange: "Last 90 Days",
    completenessPercent: 96,
    lastSynced: "May 14, 2026 10:15 AM",
    access: "Assigned business context",
  } as ContentContextData,

  kpis: [
    { id: "1", label: "TOTAL CONTENT ASSETS", value: "2,846", subtext: "Master marketing assets", status: "approved" },
    { id: "2", label: "APPROVED", value: "2,214", subtext: "Ready for deployment", status: "approved" },
    { id: "3", label: "PENDING REVIEW", value: "86", subtext: "Awaiting approval", status: "pending" },
    { id: "4", label: "NEEDS ATTENTION", value: "42", subtext: "Exceptions & warnings", status: "warning" },
    { id: "5", label: "ACTIVE VARIANTS", value: "684", subtext: "Channel & language sets", status: "approved" },
    { id: "6", label: "IN ACTIVE CAMPAIGNS", value: "318", subtext: "Currently executing", status: "approved" },
    { id: "7", label: "EXPIRING SOON", value: "27", subtext: "Rights expiring in 30d", status: "warning" },
    { id: "8", label: "CONTENT HEALTH", value: "95/100", subtext: "Governance & compliance", status: "healthy" },
  ] as ContentKpiItem[],

  statusCounters: {
    active: 2214,
    inReview: 86,
    draft: 24,
    approved: 2214,
    rejected: 12,
    notSubmitted: 534,
  } as ContentStatusCounters,

  library: [
    {
      id: "cnt-1",
      previewUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
      name: "Summer Beauty Festival Hero",
      contentId: "CNT-2026-0164",
      type: "Web Banner",
      status: "Active",
      owner: "Content Team",
      brand: "SL Beauty",
      businessUnit: "Beauty Retail",
      primaryMarket: "EN / Sri Lanka",
      version: "v3",
      variantsCount: 4,
      approvalStatus: "Approved",
      rightsState: "Rights Valid",
      usageSummary: "Homepage + Landing Page",
      linkedCampaignsCount: 2,
      performanceCtr: "CTR 4.8%",
      lastUpdated: "18 min ago",
    },
    {
      id: "cnt-2",
      previewUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
      name: "Seasonal Beauty Master Email",
      contentId: "CNT-2026-0191",
      type: "Email Template",
      status: "Active",
      owner: "CRM Content",
      brand: "SL Beauty",
      businessUnit: "Beauty Retail",
      primaryMarket: "Email",
      version: "v7",
      variantsCount: 6,
      approvalStatus: "Approved",
      rightsState: "Rights Valid",
      usageSummary: "Landing / email usage",
      linkedCampaignsCount: 5,
      performanceCtr: "CTR 22.1%",
      lastUpdated: "42 min ago",
    },
    {
      id: "cnt-3",
      previewUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
      name: "Paid Social Creative Set — Summer",
      contentId: "CNT-2026-0196",
      type: "Social Creative",
      status: "In Review",
      owner: "Paid Media Team",
      brand: "SL Beauty",
      businessUnit: "Paid Social",
      primaryMarket: "EN / Sri Lanka",
      version: "v4",
      variantsCount: 12,
      approvalStatus: "In Review",
      rightsState: "Rights Valid",
      usageSummary: "3 linked campaigns",
      linkedCampaignsCount: 3,
      performanceCtr: "CTR 2.9%",
      lastUpdated: "1 hr ago",
    },
    {
      id: "cnt-4",
      previewUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80",
      name: "Loyalty App Push Copy",
      contentId: "CNT-2026-0201",
      type: "Push Copy",
      status: "Approved",
      owner: "CRM Content",
      brand: "SL Beauty",
      businessUnit: "Web/App",
      primaryMarket: "EN / Sri Lanka",
      version: "v2",
      variantsCount: 3,
      approvalStatus: "Approved",
      rightsState: "Rights Valid",
      usageSummary: "Linked Journey",
      linkedCampaignsCount: 2,
      performanceCtr: "Open 45.4%",
      lastUpdated: "2 hr ago",
    },
    {
      id: "cnt-5",
      previewUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
      name: "Haircare Launch Video",
      contentId: "CNT-2026-0207",
      type: "Video",
      status: "Active",
      owner: "Content Team",
      brand: "SL Beauty",
      businessUnit: "Web/App",
      primaryMarket: "EN / Sri Lanka",
      version: "v1",
      variantsCount: 1,
      approvalStatus: "Approved",
      rightsState: "Expiring Soon",
      usageSummary: "Homepage Video",
      linkedCampaignsCount: 1,
      performanceCtr: "CTR 3.1%",
      lastUpdated: "3 hr ago",
    },
    {
      id: "cnt-6",
      previewUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
      name: "SMS Retention Copy",
      contentId: "CNT-2026-0212",
      type: "SMS Copy",
      status: "Draft",
      owner: "CRM Content",
      brand: "SL Beauty",
      businessUnit: "SMS",
      primaryMarket: "EN / Sri Lanka",
      version: "v1",
      variantsCount: 1,
      approvalStatus: "Not Submitted",
      rightsState: "Rights Valid",
      usageSummary: "Unassigned",
      linkedCampaignsCount: 0,
      performanceCtr: "—",
      lastUpdated: "5 hr ago",
    },
  ] as ContentLibraryItem[],

  selectedContent: {
    id: "cnt-1",
    name: "Summer Beauty Festival Hero",
    contentId: "CNT-2026-0164",
    type: "Web Banner",
    status: "Active",
    approvalStatus: "Approved",
    rightsState: "Rights Valid",
    previewUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    details: {
      contentName: "Summer Beauty Festival Hero",
      contentType: "Web Banner",
      contentId: "CNT-2026-0164",
      brand: "SL Beauty",
      campaignTheme: "Summer Beauty Festival",
      primaryLanguage: "English",
      marketRegion: "Sri Lanka",
      createdOn: "01 Jul 2025",
      lastUpdated: "14 May 2026",
      createdBy: "Content Manager",
      currentVersion: "v3",
    },
    variants: [
      { name: "Desktop — English", version: "v3", status: "Approved", dimensions: "1920×640" },
      { name: "Mobile — English", version: "v2", status: "Approved", dimensions: "1080×1080" },
      { name: "App — Mobile Web", version: "v2", status: "In Review", dimensions: "1000×1080" },
      { name: "Desktop — Sinhala", version: "v1", status: "Approved", dimensions: "1920×640" },
      { name: "Desktop — Tamil", version: "v1", status: "In Review", dimensions: "1920×640" },
    ] as ContentVariantItem[],
    channelReadiness: [
      { channel: "Web/App", status: "Ready" },
      { channel: "Email", status: "Non Applicable" },
      { channel: "Paid Social", status: "Ready" },
      { channel: "Push", status: "Non Applicable" },
      { channel: "Landing Page", status: "Ready" },
    ] as ChannelReadinessItem[],
    overallReadinessPct: 96,
    usagePlacements: [
      { name: "Summer Beauty Festival", type: "Campaign", location: "Homepage Hero", status: "Active" },
      { name: "Summer Beauty Landing Page", type: "Placement", location: "Hero Header", status: "Active" },
      { name: "Summer Beauty Follow-Up", type: "Journey", location: "Web/App Content Reference", status: "Running" },
    ] as UsagePlacementItem[],
    linkedCampaigns: [
      { id: "CMP-2026-0081", name: "Summer Beauty Festival", role: "Primary Hero", status: "Active" },
      { id: "CMP-2026-0084", name: "Summer Beauty Retargeting", role: "Supporting Creative", status: "Active" },
    ] as LinkedCampaignItem[],
    linkedJourneys: [
      { id: "JRN-2026-0026", name: "Summer Beauty Follow-Up", status: "Running", role: "Web/App Content Reference" },
      { id: "JRN-2026-0015", name: "Loyalty Re-engagement", status: "Running", role: "Fallback Content" },
    ] as LinkedJourneyItem[],
    approvalFlow: {
      steps: [
        { step: "Content Creation", date: "12 Jul", completed: true },
        { step: "Brand Review", date: "18 Jul", completed: true },
        { step: "Marketing Approval", date: "22 Jul", completed: true },
        { step: "Governance Check", date: "05 Aug", completed: true },
        { step: "Approved", date: "12 Aug", completed: true },
      ] as ApprovalStep[],
      approvedBy: "Marketing Director",
      approvedOn: "12 Aug 2026",
      pendingQueue: [
        { name: "Paid Social Content Set — Summer", status: "In Review", time: "2h ago" },
        { name: "Tamil Hero Variant", status: "In Review", time: "3h ago" },
      ] as PendingApprovalItem[],
    },
    rights: {
      state: "Valid",
      type: "Brand Owned",
      scope: "Global Marketing — SL Beauty",
      markets: "Sri Lanka",
      channels: "Web/App + Paid Social",
      startDate: "01 Jul 2026",
      expiryDate: "31 Dec 2026",
      talent: "No",
      musicLicense: "N/A",
      restrictions: "None",
    } as RightsInfo,
    governanceChecks: [
      { name: "Brand Guidelines", status: "Pass" },
      { name: "Content Policy", status: "Pass" },
      { name: "Accessibility", status: "Pass" },
      { name: "Required Disclosures", status: "Pass" },
      { name: "Product Claims", status: "Pass" },
      { name: "Localization Review", status: "Pass" },
      { name: "Regulatory Review", status: "Pass" },
      { name: "Rights Validation", status: "Pass" },
    ] as GovernanceCheck[],
    governanceHealthScore: 98,
    exceptions: [
      { title: "Missing Mobile Variant", severity: "Warning", action: "Create Variant" },
      { title: "Unsupported Creative in Draft Campaign", severity: "Warning", action: "Review" },
      { title: "Expired Usage Rights", severity: "Critical", action: "Block Usage" },
      { title: "Accessibility Missing Alt Text", severity: "Warning", action: "Fix Metadata" },
    ] as ContentExceptionItem[],
    performance: {
      impressions: "3.82M",
      clicks: "183K",
      ctr: "4.8%",
      conversions: "7,128",
      attributedRevenue: "LKR 1.84M",
      peerComparison: "+16% CTR",
      chartPoints: [
        { month: "Jul 19", clicks: 12400, conversions: 520 },
        { month: "Jul 26", clicks: 14800, conversions: 640 },
        { month: "Aug 02", clicks: 16200, conversions: 780 },
        { month: "Aug 09", clicks: 18300, conversions: 910 },
      ],
    } as ContentPerformanceData,
    versionHistory: [
      { version: "v3", status: "Active", publishedOn: "14 May 2026", changes: "CTA and background updated", changedBy: "Content Manager" },
      { version: "v2", status: "Archived", publishedOn: "08 Aug 2025", changes: "Mobile optimization", changedBy: "Content Manager" },
      { version: "v1", status: "Archived", publishedOn: "01 Jul 2025", changes: "Initial version", changedBy: "Content Manager" },
    ] as ContentVersionItem[],
    recentActivity: [
      { time: "10:15", activity: "Summer Beauty Festival Hero v3 published" },
      { time: "09:54", activity: "Tamil hero variant submitted for localization approval" },
      { time: "09:12", activity: "Paid Social Creative Set refreshed with new variants" },
      { time: "08:42", activity: "Haircare Launch Video rights warning generated" },
      { time: "07:18", activity: "Seasonal Beauty Email Template v7 approved" },
      { time: "06:50", activity: "Creative Set Social BLOCKED after rights expiry" },
    ] as ContentActivityItem[],
    audit: [
      { label: "Assets Created", count: 86 },
      { label: "Versions Published", count: 124 },
      { label: "Approvals", count: 92 },
      { label: "Rejections", count: 7 },
      { label: "Rights Changes", count: 14 },
      { label: "Archive Events", count: 21 },
      { label: "Usage Replacements", count: 16 },
    ] as ContentAuditItem[],
  },

  rightRail: {
    healthScore: 95,
    approvalReadinessPct: 94,
    rightsValidityPct: 96,
    channelReadinessPct: 97,
    brandCompliancePct: 95,
    accessibilityPct: 90,
    versionIntegrityPct: 99,
    usageIntegrityPct: 94,
    totalAssets: 2846,
    approvedAssets: 2214,
    draftAssets: 92,
    inReviewAssets: 86,
    archivedAssets: 454,
    pendingApprovals: 86,
    inReviewApprovals: 12,
    overdueApprovals: 7,
    validRights: 2142,
    expiringRights: 27,
    expiredRights: 9,
    restrictedRights: 18,
    inCampaignsUsage: 318,
    inJourneysUsage: 164,
    activePlacementsUsage: 286,
    unusedAssets: 412,
    readyReadiness: 2214,
    missingVariants: 31,
    policyWarnings: 12,
    rightsWarnings: 18,
    accessibilityIssues: 8,
  } as ContentRightRailData,
};
