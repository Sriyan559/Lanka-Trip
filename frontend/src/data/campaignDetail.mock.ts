export interface CampaignDetailHeaderData {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  lifecycleStatus: "Active" | "Scheduled" | "Awaiting Approval" | "Draft" | "Paused" | "Completed";
  approvalStatus: "Approved" | "Pending" | "Not Submitted" | "Changes Requested";
  governanceStatus: "Clear" | "Consent Clear" | "Review Required";
}

export interface CampaignContextData {
  owner: string;
  marketingTeam: string;
  businessUnit: string;
  brand: string;
  market: string;
  campaignType: string;
  campaignPeriod: string;
  campaignStatus: string;
  approvalStatus: string;
  governanceStatus: string;
  totalCountries: number;
  totalChannels: number;
  lastSynced: string;
  access: string;
}

export interface CampaignKpiSummary {
  allocatedBudget: string;
  committedBudget: string;
  committedPercent: string;
  actualSpend: string;
  actualSpendPercent: string;
  remainingBudget: string;
  remainingPercent: string;
  roas: string;
  roasTarget: string;
  conversionRate: string;
  conversionRateTarget: string;
  reach: string;
  reachEligible: string;
  activeExceptions: number;
  criticalBlockers: number;
}

export interface CampaignOverviewData {
  goal: string;
  type: string;
  goalType: string;
  businessUnit: string;
  primaryChannel: string;
  startDate: string;
  endDate: string;
  region: string;
  tier: string;
  createdOn: string;
  lastUpdated: string;
}

export interface ObjectiveTargetItem {
  id: string;
  objective: string;
  target: string;
  current: string;
  achievementPercent: number;
}

export interface PerformanceChartPoint {
  date: string;
  committedSpend: number;
  actualSpend: number;
  conversions: number;
  roas: number;
}

export interface AudienceData {
  total: string;
  reach: string;
  new: string;
  overlap: string;
  frequency: string;
  newCustomers: string;
  topSegment: string;
  primaryPersona: string;
  locationFocus: string;
  device: string;
  funnel: Array<{ stage: string; count: string; percentage: number }>;
}

export interface ChannelPerformanceItem {
  id: string;
  channel: string;
  share: string;
  impressions: string;
  engagement: string;
  clicks: string;
  conversions: string;
  spend: string;
}

export interface ContentCreativeItem {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Approved" | "Pending" | "Draft";
  placement: string;
  versionCount: string;
}

export interface BudgetSpendData {
  allocatedBudget: string;
  committed: string;
  actualSpend: string;
  remaining: string;
  utilizationPercent: number;
  breakdown: Array<{ category: string; type: "Actual" | "Committed"; amount: string; percentage: number }>;
}

export interface AttributionData {
  attributedRevenue: string;
  attributedConversions: string;
  roasAttributed: string;
  incrementalLift: string;
  channelContribution: Array<{ channel: string; percentage: number }>;
  topModel: string;
  lookbackWindow: string;
}

export interface GovernanceData {
  status: string;
  policyCompliance: string;
  riskLevel: string;
  approvalStatus: string;
  approvedOn: string;
  approvedBy: string;
  signoffs: {
    marketing: "Approved" | "Pending";
    finance: "Approved" | "Pending";
    legal: "Approved" | "Pending";
    dataPrivacy: "Approved" | "Pending";
    nextReviewDate: string;
  };
}

export interface ExceptionItem {
  id: string;
  exception: string;
  severity: "High" | "Medium" | "Low";
  status: "Open" | "Resolved";
  raised: string;
  owner: string;
  due: string;
}

export interface LinkedPromotionItem {
  id: string;
  promotion: string;
  marketplace: string;
  status: "Active" | "Approved" | "Scheduled";
  start: string;
  end: string;
  budget: string;
}

export interface RelatedJourneyItem {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Draft" | "Paused";
  triggers: string;
  contacts: string;
}

export interface DeliveryHealthData {
  systems: Array<{ name: string; healthPercent: number }>;
  lastSync: string;
  failedDeliveries: number;
  dataLatency: string;
}

export interface RecentActivityItem {
  id: string;
  activity: string;
  actor: string;
  time: string;
}

export interface AuditSummaryData {
  campaignRecord: string;
  createdBy: string;
  createdOn: string;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
  totalChanges: number;
}

export interface DetailRightRailData {
  healthScore: number;
  metrics: Array<{ label: string; score: number }>;
  status: {
    active: boolean;
    approval: string;
    governance: string;
    delivery: string;
  };
  keyPerformance: { revenue: string; roas: string; conversion: string };
  budgetSummary: { spend: string; committed: string; remaining: string };
  audienceSummary: { reach: string; engagement: string; conversions: string };
  exceptions: { critical: number; high: number; medium: number };
}

export interface FullCampaignDetailData {
  header: CampaignDetailHeaderData;
  context: CampaignContextData;
  kpis: CampaignKpiSummary;
  overview: CampaignOverviewData;
  objectives: ObjectiveTargetItem[];
  performance: {
    chartData: PerformanceChartPoint[];
    summary: { spend: string; committed: string; conversions: string; roas: string; cpa: string };
  };
  audience: AudienceData;
  channelPerformance: ChannelPerformanceItem[];
  contentCreative: ContentCreativeItem[];
  budgetSpend: BudgetSpendData;
  attribution: AttributionData;
  governance: GovernanceData;
  activeExceptions: ExceptionItem[];
  linkedPromotions: LinkedPromotionItem[];
  relatedJourneys: RelatedJourneyItem[];
  deliveryHealth: DeliveryHealthData;
  recentActivity: RecentActivityItem[];
  auditSummary: AuditSummaryData;
  rightRail: DetailRightRailData;
}

export const mockCampaignDetailData: FullCampaignDetailData = {
  header: {
    id: "MKT-2026-0087",
    code: "MKT-2026-0087",
    title: "Summer Beauty Festival",
    subtitle: "Seasonal multi-channel campaign focused on beauty sales across online and retail marketplace.",
    lifecycleStatus: "Active",
    approvalStatus: "Approved",
    governanceStatus: "Clear",
  },
  context: {
    owner: "Isheshi Jayana",
    marketingTeam: "Marketing Team",
    businessUnit: "Beauty & Retail",
    brand: "SL Beauty",
    market: "LKR",
    campaignType: "Consumer Beauty",
    campaignPeriod: "14 Jun – 18 Aug 2026",
    campaignStatus: "Active",
    approvalStatus: "Approved",
    governanceStatus: "Clear",
    totalCountries: 5,
    totalChannels: 16,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Limited to assigned business owners",
  },
  kpis: {
    allocatedBudget: "LKR 1.80M",
    committedBudget: "LKR 1.62M",
    committedPercent: "90% of budget",
    actualSpend: "LKR 1.46M",
    actualSpendPercent: "81.9% of budget",
    remainingBudget: "LKR 340K",
    remainingPercent: "18.9% of budget",
    roas: "5.42x",
    roasTarget: "Target 3.20x+",
    conversionRate: "6.8%",
    conversionRateTarget: "Target 4.5%+",
    reach: "482K",
    reachEligible: "Eligible reach",
    activeExceptions: 2,
    criticalBlockers: 0,
  },
  overview: {
    goal: "Drive seasonal beauty sales and new-customer acquisition",
    type: "Seasonal",
    goalType: "Driving Sales",
    businessUnit: "Beauty & Retail",
    primaryChannel: "Multi – Paid Social",
    startDate: "14 Jun 2026",
    endDate: "18 Aug 2026",
    region: "South Asia",
    tier: "Marketing Strategic",
    createdOn: "01 Jul 2026",
    lastUpdated: "14 Aug 2026, 10:15 AM",
  },
  objectives: [
    { id: "1", objective: "Revenue (LKR)", target: "1,650,000", current: "1,190,560", achievementPercent: 72 },
    { id: "2", objective: "ROAS", target: "3.20x", current: "5.42x", achievementPercent: 169 },
    { id: "3", objective: "Conversion Rate", target: "5.0%", current: "6.8%", achievementPercent: 136 },
    { id: "4", objective: "Customer Acquisition", target: "18,000", current: "24,480", achievementPercent: 136 },
    { id: "5", objective: "Reach", target: "450K", current: "482K", achievementPercent: 107 },
  ],
  performance: {
    chartData: [
      { date: "14 Jun", committedSpend: 200, actualSpend: 180, conversions: 2400, roas: 3.8 },
      { date: "21 Jun", committedSpend: 320, actualSpend: 310, conversions: 4800, roas: 4.2 },
      { date: "28 Jun", committedSpend: 540, actualSpend: 510, conversions: 8200, roas: 4.9 },
      { date: "05 Jul", committedSpend: 780, actualSpend: 720, conversions: 12500, roas: 5.1 },
      { date: "12 Jul", committedSpend: 1050, actualSpend: 980, conversions: 18400, roas: 5.6 },
      { date: "19 Jul", committedSpend: 1280, actualSpend: 1180, conversions: 23500, roas: 5.8 },
      { date: "26 Jul", committedSpend: 1450, actualSpend: 1320, conversions: 27800, roas: 5.5 },
      { date: "02 Aug", committedSpend: 1560, actualSpend: 1410, conversions: 30400, roas: 5.4 },
      { date: "09 Aug", committedSpend: 1620, actualSpend: 1460, conversions: 32700, roas: 5.42 },
    ],
    summary: {
      spend: "LKR 1.46M",
      committed: "LKR 1.62M",
      conversions: "32.7K",
      roas: "5.42x",
      cpa: "LKR 63.6",
    },
  },
  audience: {
    total: "460,000",
    reach: "414,600",
    new: "134,400",
    overlap: "32.7%",
    frequency: "5.2",
    newCustomers: "24,960",
    topSegment: "Premium Skincare Buyers",
    primaryPersona: "Urban Women 25–34",
    locationFocus: "Device: Mobile Preference",
    device: "Mobile Preference",
    funnel: [
      { stage: "Awareness", count: "120,000", percentage: 100 },
      { stage: "Consideration", count: "100,000", percentage: 83 },
      { stage: "Intent", count: "90,000", percentage: 75 },
      { stage: "Conversion", count: "46,000", percentage: 38 },
      { stage: "Loyalty", count: "24,960", percentage: 21 },
    ],
  },
  channelPerformance: [
    { id: "1", channel: "Paid Social", share: "38%", impressions: "182M", engagement: "3.2%", clicks: "1.1M", conversions: "10.4K", spend: "LKR 1.14M" },
    { id: "2", channel: "Email", share: "22%", impressions: "96M", engagement: "6.1%", clicks: "72K", conversions: "6.8K", spend: "LKR 320K" },
    { id: "3", channel: "Marketplace", share: "26%", impressions: "126M", engagement: "2.8%", clicks: "78K", conversions: "5.7K", spend: "LKR 380K" },
    { id: "4", channel: "Paid Search", share: "14%", impressions: "78M", engagement: "2.1%", clicks: "36K", conversions: "1.8K", spend: "LKR 200K" },
  ],
  contentCreative: [
    { id: "1", name: "Summer Beauty – Banner", type: "Banner", status: "Active", placement: "Website / Home", versionCount: "V2 / 4" },
    { id: "2", name: "New Launch – Skincare Video", type: "Video", status: "Active", placement: "Paid Social / Instagram", versionCount: "V1 / 2" },
    { id: "3", name: "Festival Offers – Email", type: "Email", status: "Active", placement: "Email / Subscribers", versionCount: "V3 / 1" },
    { id: "4", name: "Paid Social Carousel Set", type: "Carousel", status: "Approved", placement: "Paid Social / Meta", versionCount: "V1 / 4" },
    { id: "5", name: "Influencer Reel – Beauty Tips", type: "Video", status: "Approved", placement: "Influencer / Instagram", versionCount: "V1 / 3" },
  ],
  budgetSpend: {
    allocatedBudget: "LKR 1.80M",
    committed: "LKR 1.62M",
    actualSpend: "LKR 1.46M",
    remaining: "LKR 340K",
    utilizationPercent: 81,
    breakdown: [
      { category: "Paid Social", type: "Actual", amount: "LKR 1.14M", percentage: 63.3 },
      { category: "Email", type: "Actual", amount: "LKR 320K", percentage: 17.8 },
      { category: "Creative Allocation", type: "Committed", amount: "LKR 180K", percentage: 10.0 },
      { category: "Other", type: "Committed", amount: "LKR 160K", percentage: 8.9 },
    ],
  },
  attribution: {
    attributedRevenue: "LKR 2.52M",
    attributedConversions: "32,975",
    roasAttributed: "5.25x",
    incrementalLift: "32.7%",
    channelContribution: [
      { channel: "Paid Social", percentage: 47 },
      { channel: "Email", percentage: 31 },
      { channel: "Marketplace", percentage: 16 },
      { channel: "Paid Search", percentage: 6 },
    ],
    topModel: "Data Driven (Shapley)",
    lookbackWindow: "7 Days",
  },
  governance: {
    status: "Clear",
    policyCompliance: "100%",
    riskLevel: "Low",
    approvalStatus: "Approved",
    approvedOn: "12 Jul 2026",
    approvedBy: "Isheshi Jayana",
    signoffs: {
      marketing: "Approved",
      finance: "Approved",
      legal: "Approved",
      dataPrivacy: "Approved",
      nextReviewDate: "14 Sep 2026",
    },
  },
  activeExceptions: [
    { id: "1", exception: "Budget variance > 15%", severity: "High", status: "Open", raised: "14 Aug 2026", owner: "Finance", due: "21 Aug 2026" },
    { id: "2", exception: "Missing audience refresh", severity: "Medium", status: "Open", raised: "13 Aug 2026", owner: "Marketing Ops", due: "20 Aug 2026" },
  ],
  linkedPromotions: [
    { id: "1", promotion: "Summer Beauty Flash Sale", marketplace: "Daraz LK", status: "Active", start: "14 Jun", end: "18 Aug", budget: "LKR 320K" },
    { id: "2", promotion: "Watsons Exclusive Offers", marketplace: "Watsons LK", status: "Active", start: "14 Jun", end: "18 Aug", budget: "LKR 220K" },
  ],
  relatedJourneys: [
    { id: "1", name: "Welcome – SBF Shoppers", type: "Journey", status: "Active", triggers: "Signup, Purchase", contacts: "24,180" },
    { id: "2", name: "Abandoned Cart – SBF", type: "Journey", status: "Active", triggers: "Cart Abandon", contacts: "12,740" },
    { id: "3", name: "Winback – SBF Audience", type: "Journey", status: "Active", triggers: "No Purchase (30d)", contacts: "18,560" },
  ],
  deliveryHealth: {
    systems: [
      { name: "Marketing Automation", healthPercent: 100 },
      { name: "Email Service Provider", healthPercent: 100 },
      { name: "Ad Platforms", healthPercent: 99 },
      { name: "Data Warehouse", healthPercent: 100 },
      { name: "Ecommerce Platform", healthPercent: 100 },
      { name: "Loyalty Platform", healthPercent: 100 },
    ],
    lastSync: "14 Aug 2026 10:12 AM",
    failedDeliveries: 0,
    dataLatency: "15 mins",
  },
  recentActivity: [
    { id: "1", activity: "Campaign metadata synchronized", actor: "Enterprise System", time: "14 Aug 2026 09:42 AM" },
    { id: "2", activity: "Budget updated", actor: "Isheshi Jayana", time: "14 Aug 2026 09:15 AM" },
    { id: "3", activity: "Audience segment refreshed", actor: "Marketing Ops", time: "13 Aug 2026 05:21 PM" },
    { id: "4", activity: "Creative asset approved", actor: "Creative Team", time: "13 Aug 2026 03:48 PM" },
    { id: "5", activity: "Campaign published", actor: "Isheshi Jayana", time: "12 Jul 2026 10:30 AM" },
  ],
  auditSummary: {
    campaignRecord: "MKT-2026-0087",
    createdBy: "Isheshi Jayana",
    createdOn: "01 Jul 2026 10:10 AM",
    lastUpdatedBy: "Isheshi Jayana",
    lastUpdatedOn: "14 Aug 2026 10:15 AM",
    totalChanges: 32,
  },
  rightRail: {
    healthScore: 94,
    metrics: [
      { label: "Performance", score: 95 },
      { label: "Budget", score: 96 },
      { label: "Governance", score: 100 },
      { label: "Engagement", score: 94 },
      { label: "Content Health", score: 93 },
      { label: "Attribution", score: 92 },
    ],
    status: {
      active: true,
      approval: "Approved",
      governance: "Clear",
      delivery: "Healthy",
    },
    keyPerformance: {
      revenue: "LKR 2.52M",
      roas: "5.42x",
      conversion: "6.8%",
    },
    budgetSummary: {
      spend: "LKR 1.46M",
      committed: "LKR 1.62M",
      remaining: "LKR 340K",
    },
    audienceSummary: {
      reach: "414.6K",
      engagement: "32.7K",
      conversions: "24.8K",
    },
    exceptions: {
      critical: 0,
      high: 0,
      medium: 2,
    },
  },
};
