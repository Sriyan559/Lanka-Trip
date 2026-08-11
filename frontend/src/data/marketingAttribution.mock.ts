export interface AttributionContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  analysisScope: string;
  attributionModel: string;
  financeRevenueSync: string;
  identityResolution: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface AttributionKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  variant: "blue" | "green" | "red" | "orange" | "amber";
}

export interface AnalyticsReadinessCounters {
  healthy: number;
  needsAttention: number;
  trackingGap: number;
  attributionVariance: number;
  identityResolutionWarning: number;
  revenueSyncWarning: number;
  modelReview: number;
  dataQualityIssue: number;
}

export interface PerformanceTrendPoint {
  date: string;
  spend: number;
  attributedRevenue: number;
  roas: number;
}

export interface ChannelContributionItem {
  channel: string;
  attributedRevenue: string;
  percentOfTotal: string;
  barColor: string;
}

export interface ChannelPerformanceItem {
  channel: string;
  spend: string;
  reach: string;
  engagement: string;
  attributedRevenue: string;
  roas: string;
  cac: string;
  contributionPercent: string;
  status: string;
}

export interface CampaignPerformanceItem {
  id: string;
  campaign: string;
  campaignId: string;
  status: string;
  spend: string;
  audience: string;
  conversions: string;
  attributedRevenue: string;
  assistedRevenue: string;
  roas: string;
  incrementalLift: string;
  contributionPercent: string;
  health: string;
}

export interface DirectVsAssistedData {
  directAttributedRevenue: string;
  deduplicatedConversions: string;
  directTouchConversions: string;
  conversionsWithAssistedTouches: string;
  assistRatePercent: number;
  directPercent: number;
  assistedPercent: number;
}

export interface JourneyPositionItem {
  channel: string;
  firstTouchPercent: number;
  lastTouchPercent: number;
  assistPercent: number;
}

export interface AcquisitionIntelligenceData {
  newCustomers: string;
  firstOrderConversion: string;
  acquisitionCostBySource: Array<{
    source: string;
    averageCac: string;
    newCustomers: string;
  }>;
  existingCustomers: {
    newCustomerRevenue: string;
    repeatPurchaseRoas: string;
  };
}

export interface LifecycleImpactItem {
  lifecycleStage: string;
  activeCustomers: string;
  attributedRevenue: string;
  roas: string;
  cac: string;
  incrementalLift: string;
  contributionPercent: string;
}

export interface JourneyContributionItem {
  id: string;
  journey: string;
  journeyId: string;
  attributedRevenue: string;
  assistedRevenue: string;
  conversions: string;
}

export interface WebAppContributionItem {
  id: string;
  experience: string;
  placementId: string;
  attributedRevenue: string;
  revenueReference: string;
  conversions: string;
  roas: string;
}

export interface ContentContributionItem {
  id: string;
  content: string;
  contentId: string;
  impressions: string;
  clicks: string;
  attributedRevenue: string;
  roas: string;
}

export interface PaidMediaComparisonItem {
  id: string;
  platform: string;
  mediaId: string;
  platformRevenue: string;
  mk12AttributedRevenue: string;
  variancePercent: string;
  status: "Within Tolerance" | "Minor Variance" | "Investigate" | "Critical Variance";
}

export interface ModelComparisonItem {
  channel: string;
  dataDriven: string;
  lastTouch: string;
  firstTouch: string;
  timeDecay: string;
  varianceVsDda: string;
}

export interface ConversionTimingPoint {
  bucket: string;
  volume: number;
  percent: string;
  attributedRevenue: string;
}

export interface IdentityResolutionData {
  knownCustomerCoverage: number;
  crossDeviceMatchRate: number;
  anonymousToKnownResolution: number;
  duplicateRate: number;
  unresolvedSessions: number;
  identityHealthScore: number;
  identityHealthLabel: string;
}

export interface TrackingQualityData {
  campaignTracking: number;
  paidMediaTracking: number;
  identityResolution: number;
  journeyTracking: number;
  conversionEventCoverage: number;
  revenueSync: number;
  dataCompleteness: number;
  analyticsHealth: number;
  dataQualityScore: number;
}

export interface IncrementalityLiftItem {
  campaign: string;
  lift: string;
  confidence: string;
  status: "Significant" | "Directional" | "Insufficient Evidence";
}

export interface SpendEfficiencyItem {
  channel: string;
  spend: string;
  attributedRevenue: string;
  roas: string;
  cac: string;
}

export interface BusinessPerformanceItem {
  businessUnitBrand: string;
  spend: string;
  attributedRevenue: string;
  roas: string;
  contributionPercent: string;
}

export interface FinanceAlignmentData {
  status: string;
  mk12AttributedRevenue: string;
  financeRecognizedRevenue: string;
  timingDifference: string;
  alignmentPercent: number;
  toleranceStatus: string;
}

export interface AttributionGovernanceData {
  activeModel: string;
  modelVersion: string;
  approvedBy: string;
  financeAlignment: string;
  lookbackPolicy: string;
  conversionDefinitions: string;
}

export interface AttributionModelVersionData {
  version: string;
  publishedOn: string;
  maintainingTeam: string;
  analyticsLead: string;
}

export interface AnalyticsActivityItem {
  id: string;
  time: string;
  action: string;
  details: string;
  user: string;
}

export interface AnalyticsExceptionSummaryItem {
  metricCategory: string;
  openCount: number;
  criticalCount: number;
  highCount: number;
  warningCount: number;
  infoCount: number;
}

export interface AttributionRailData {
  healthScore: number;
  healthLabel: string;
  healthDimensions: {
    trackingCoverage: number;
    identityResolution: number;
    revenueCoverage: number;
    attributionConfidence: number;
    conversionDeduplication: number;
    financeAlignment: number;
    modelGovernance: number;
  };
  revenueSummary: {
    spend: string;
    attributedRevenue: string;
    assistedRevenue: string;
    roas: string;
  };
  conversionSummary: {
    attributedConversions: string;
    influencedOrders: string;
    directConversions: string;
    assistedConversions: string;
  };
  acquisitionSummary: {
    newCustomers: string;
    averageCac: string;
    newCustomerRevenue: string;
    repeatPurchaseRoas: string;
  };
  coverageSummary: {
    trackingCoverage: number;
    identityCoverage: number;
    revenueCoverage: number;
    dataCompleteness: number;
  };
  exceptionsSummary: {
    open: number;
    critical: number;
    high: number;
    warning: number;
    information: number;
  };
  quickQueues: {
    trackingGaps: number;
    attributionVariance: number;
    identityWarnings: number;
    revenueSyncWarning: number;
    modelReviews: number;
    dataQualityIssues: number;
  };
}

export interface MarketingAttributionData {
  context: AttributionContextData;
  kpis: AttributionKpiItem[];
  readiness: AnalyticsReadinessCounters;
  performanceTrend: PerformanceTrendPoint[];
  channelContribution: ChannelContributionItem[];
  channelPerformance: ChannelPerformanceItem[];
  campaignPerformance: CampaignPerformanceItem[];
  directVsAssisted: DirectVsAssistedData;
  journeyPosition: JourneyPositionItem[];
  acquisitionIntelligence: AcquisitionIntelligenceData;
  lifecycleImpact: LifecycleImpactItem[];
  journeyContribution: JourneyContributionItem[];
  webAppContribution: WebAppContributionItem[];
  contentContribution: ContentContributionItem[];
  paidMediaComparison: PaidMediaComparisonItem[];
  modelComparison: ModelComparisonItem[];
  conversionTiming: ConversionTimingPoint[];
  identityResolution: IdentityResolutionData;
  trackingQuality: TrackingQualityData;
  incrementalityLift: IncrementalityLiftItem[];
  spendEfficiency: SpendEfficiencyItem[];
  businessPerformance: BusinessPerformanceItem[];
  financeAlignment: FinanceAlignmentData;
  governance: AttributionGovernanceData;
  modelVersion: AttributionModelVersionData;
  recentActivity: AnalyticsActivityItem[];
  exceptionsSummary: AnalyticsExceptionSummaryItem[];
  rail: AttributionRailData;
}

export const MARKETING_ATTRIBUTION_MOCK_DATA: MarketingAttributionData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    analysisScope: "All Marketing",
    attributionModel: "Data-Driven Attribution",
    financeRevenueSync: "Healthy",
    identityResolution: "Healthy",
    dateRange: "Last 30 Days",
    completenessPercent: 96,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    {
      id: "spend",
      label: "Marketing Spend",
      value: "LKR 8.42M",
      variant: "red",
    },
    {
      id: "attributed_revenue",
      label: "Attributed Revenue",
      value: "LKR 31.7M",
      variant: "green",
    },
    {
      id: "roas",
      label: "Marketing ROAS",
      value: "3.76x",
      variant: "blue",
    },
    {
      id: "influenced_orders",
      label: "Marketing Influenced Orders",
      value: "34,820",
      variant: "orange",
    },
    {
      id: "attributed_conversions",
      label: "Attributed Conversions",
      value: "28,416",
      variant: "green",
    },
    {
      id: "avg_cac",
      label: "Average CAC",
      value: "LKR 296",
      variant: "red",
    },
    {
      id: "assisted_revenue",
      label: "Assisted Revenue",
      value: "LKR 8.9M",
      variant: "blue",
    },
    {
      id: "analytics_health",
      label: "Analytics Health",
      value: "94 / 100",
      variant: "green",
    },
  ],
  readiness: {
    healthy: 14,
    needsAttention: 4,
    trackingGap: 2,
    attributionVariance: 2,
    identityResolutionWarning: 2,
    revenueSyncWarning: 1,
    modelReview: 2,
    dataQualityIssue: 3,
  },
  performanceTrend: [
    { date: "Jul 16", spend: 280, attributedRevenue: 1050, roas: 3.75 },
    { date: "Jul 20", spend: 310, attributedRevenue: 1180, roas: 3.8 },
    { date: "Jul 24", spend: 290, attributedRevenue: 1080, roas: 3.72 },
    { date: "Jul 28", spend: 340, attributedRevenue: 1290, roas: 3.79 },
    { date: "Aug 1", spend: 320, attributedRevenue: 1210, roas: 3.78 },
    { date: "Aug 5", spend: 360, attributedRevenue: 1350, roas: 3.75 },
    { date: "Aug 9", spend: 330, attributedRevenue: 1240, roas: 3.75 },
    { date: "Aug 13", spend: 350, attributedRevenue: 1310, roas: 3.74 },
  ],
  channelContribution: [
    { channel: "Paid Search", attributedRevenue: "LKR 9.82M font-mono", percentOfTotal: "31%", barColor: "#2563eb" },
    { channel: "Paid Social", attributedRevenue: "LKR 6.54M", percentOfTotal: "21%", barColor: "#e11d48" },
    { channel: "Email", attributedRevenue: "LKR 5.79M", percentOfTotal: "18%", barColor: "#059669" },
    { channel: "Web/App Merchandising", attributedRevenue: "LKR 4.21M", percentOfTotal: "13%", barColor: "#7c3aed" },
    { channel: "Paid Shopping", attributedRevenue: "LKR 2.81M", percentOfTotal: "9%", barColor: "#d97706" },
    { channel: "SMS", attributedRevenue: "LKR 1.35M", percentOfTotal: "4%", barColor: "#0891b2" },
    { channel: "Other", attributedRevenue: "LKR 1.18M", percentOfTotal: "4%", barColor: "#475569" },
  ],
  channelPerformance: [
    { channel: "Paid Search", spend: "LKR 2.61M", reach: "2.4M", engagement: "168K", attributedRevenue: "LKR 9.82M", roas: "3.76x", cac: "LKR 236", contributionPercent: "31%", status: "Healthy" },
    { channel: "Paid Social", spend: "LKR 1.91M", reach: "2.1M", engagement: "236K", attributedRevenue: "LKR 6.54M", roas: "3.42x", cac: "LKR 251", contributionPercent: "21%", status: "Healthy" },
    { channel: "Email", spend: "LKR 1.30M", reach: "1.1M", engagement: "246K", attributedRevenue: "LKR 5.79M", roas: "4.45x", cac: "LKR 215", contributionPercent: "18%", status: "Healthy" },
    { channel: "SMS", spend: "LKR 350K", reach: "450K", engagement: "58K", attributedRevenue: "LKR 1.89M", roas: "5.40x", cac: "LKR 266", contributionPercent: "6%", status: "Healthy" },
    { channel: "Paid Shopping", spend: "LKR 1.61M", reach: "1.6M", engagement: "311K", attributedRevenue: "LKR 2.81M", roas: "1.74x", cac: "LKR 386", contributionPercent: "9%", status: "Warning" },
    { channel: "Web/App", spend: "LKR 504K", reach: "110K", engagement: "15K", attributedRevenue: "LKR 4.21M", roas: "8.35x", cac: "LKR 112", contributionPercent: "13%", status: "Healthy" },
    { channel: "Messaging", spend: "LKR 150K", reach: "110K", engagement: "15K", attributedRevenue: "LKR 1.17M", roas: "7.80x", cac: "LKR 102", contributionPercent: "4%", status: "Healthy" },
  ],
  campaignPerformance: [
    { id: "cmp1", campaign: "Summer Beauty Festival", campaignId: "MKT-2026-0087", status: "Active", spend: "LKR 2.45M", audience: "2.4M", conversions: "18.5K", attributedRevenue: "LKR 9.68M", assistedRevenue: "LKR 2.65M", roas: "3.94x", incrementalLift: "+24.5%", contributionPercent: "31%", health: "Healthy" },
    { id: "cmp2", campaign: "Premium Skincare for Everyone", campaignId: "MKT-2026-0044", status: "Active", spend: "LKR 2.21M", audience: "1.8M", conversions: "8.2K", attributedRevenue: "LKR 6.84M", assistedRevenue: "LKR 2.15M", roas: "3.09x", incrementalLift: "+18.2%", contributionPercent: "22%", health: "Healthy" },
    { id: "cmp3", campaign: "New Customer Acquisition", campaignId: "MKT-2026-0055", status: "Active", spend: "LKR 1.32M", audience: "1.6M", conversions: "5.5K", attributedRevenue: "LKR 5.79M", assistedRevenue: "LKR 1.24M", roas: "4.38x", incrementalLift: "+22.0%", contributionPercent: "18%", health: "Healthy" },
  ],
  directVsAssisted: {
    directAttributedRevenue: "LKR 22.8M",
    deduplicatedConversions: "20,860",
    directTouchConversions: "68.5%",
    conversionsWithAssistedTouches: "31.5%",
    assistRatePercent: 31.5,
    directPercent: 68.5,
    assistedPercent: 31.5,
  },
  journeyPosition: [
    { channel: "Paid Search", firstTouchPercent: 26, lastTouchPercent: 44, assistPercent: 30 },
    { channel: "Paid Social", firstTouchPercent: 31, lastTouchPercent: 24, assistPercent: 45 },
    { channel: "Email", firstTouchPercent: 18, lastTouchPercent: 34, assistPercent: 48 },
    { channel: "Web/App", firstTouchPercent: 29, lastTouchPercent: 31, assistPercent: 40 },
  ],
  acquisitionIntelligence: {
    newCustomers: "24.8K",
    firstOrderConversion: "31.1%",
    acquisitionCostBySource: [
      { source: "Meta Prospecting", averageCac: "LKR 126", newCustomers: "6.21K" },
      { source: "Google Search", averageCac: "LKR 132", newCustomers: "4.15K" },
      { source: "Retargeting/Loyalty", averageCac: "LKR 118", newCustomers: "2.78K" },
      { source: "Referral Assisted", averageCac: "LKR 108", newCustomers: "2.24K" },
    ],
    existingCustomers: {
      newCustomerRevenue: "LKR 11.4M",
      repeatPurchaseRoas: "3.42x",
    },
  },
  lifecycleImpact: [
    { lifecycleStage: "New Customers", activeCustomers: "LKR 2.45M", attributedRevenue: "LKR 9.68M", roas: "3.94x", cac: "LKR 236", incrementalLift: "+24.5%", contributionPercent: "31%" },
    { lifecycleStage: "Repeat Customers", activeCustomers: "LKR 2.21M", attributedRevenue: "LKR 6.84M", roas: "3.09x", cac: "LKR 251", incrementalLift: "+18.2%", contributionPercent: "22%" },
    { lifecycleStage: "Loyal Customers", activeCustomers: "LKR 1.32M", attributedRevenue: "LKR 5.79M", roas: "4.38x", cac: "LKR 215", incrementalLift: "+22.0%", contributionPercent: "18%" },
  ],
  journeyContribution: [
    { id: "j1", journey: "Abandoned Cart Recovery", journeyId: "JRN-2026-0012", attributedRevenue: "LKR 2.12M", assistedRevenue: "LKR 1.42M", conversions: "4.21K" },
    { id: "j2", journey: "New Customer Welcome", journeyId: "JRN-2026-0004", attributedRevenue: "LKR 2.84M", assistedRevenue: "LKR 824K", conversions: "3.15K" },
    { id: "j3", journey: "Loyalty Reactivation", journeyId: "JRN-2026-0018", attributedRevenue: "LKR 1.94M", assistedRevenue: "LKR 634K", conversions: "2.18K" },
  ],
  webAppContribution: [
    { id: "w1", experience: "Product Listing -> Product View", placementId: "PLC-001", attributedRevenue: "LKR 8.21M", revenueReference: "LKR 7.80M", conversions: "6,215", roas: "2.41x" },
    { id: "w2", experience: "Add to Cart -> Product View", placementId: "PLC-002", attributedRevenue: "LKR 4.02M", revenueReference: "LKR 4.10M", conversions: "7,550", roas: "2.45x" },
    { id: "w3", experience: "Checkout -> Website", placementId: "PLC-003", attributedRevenue: "LKR 3.08M", revenueReference: "LKR 3.12M", conversions: "6,310", roas: "2.21x" },
    { id: "w4", experience: "Purchase -> Thank You", placementId: "PLC-004", attributedRevenue: "LKR 3.48M", revenueReference: "LKR 3.50M", conversions: "6,350", roas: "2.35x" },
  ],
  contentContribution: [
    { id: "cnt1", content: "Summer Beauty Festival Hero", contentId: "CNT-001", impressions: "1.1M", clicks: "56K", attributedRevenue: "LKR 2.21M", roas: "2.21x" },
    { id: "cnt2", content: "Paid Social Creator Kit - Summer", contentId: "CNT-002", impressions: "900K", clicks: "72K", attributedRevenue: "LKR 1.62M", roas: "2.10x" },
    { id: "cnt3", content: "Skincare Routine Guide", contentId: "CNT-003", impressions: "660K", clicks: "54K", attributedRevenue: "LKR 1.54M", roas: "2.35x" },
  ],
  paidMediaComparison: [
    { id: "pm1", platform: "Meta Ads", mediaId: "MED-0306-001", platformRevenue: "LKR 6.85M", mk12AttributedRevenue: "LKR 6.28M", variancePercent: "-8.3%", status: "Within Tolerance" },
    { id: "pm2", platform: "Google Ads", mediaId: "MED-0306-002", platformRevenue: "LKR 6.00M", mk12AttributedRevenue: "LKR 5.79M", variancePercent: "-3.4%", status: "Within Tolerance" },
    { id: "pm3", platform: "TikTok Ads", mediaId: "MED-0306-003", platformRevenue: "LKR 6.65M", mk12AttributedRevenue: "LKR 6.11M", variancePercent: "-8.3%", status: "Investigate" },
  ],
  modelComparison: [
    { channel: "Paid Search", dataDriven: "9.82M", lastTouch: "7.11M", firstTouch: "7.95M", timeDecay: "8.47M", varianceVsDda: "-" },
    { channel: "Paid Social", dataDriven: "6.54M", lastTouch: "6.84M", firstTouch: "8.11M", timeDecay: "6.34M", varianceVsDda: "-" },
    { channel: "Email", dataDriven: "5.79M", lastTouch: "5.23M", firstTouch: "4.11M", timeDecay: "5.02M", varianceVsDda: "-" },
    { channel: "Web/App", dataDriven: "4.21M", lastTouch: "2.68M", firstTouch: "3.21M", timeDecay: "3.84M", varianceVsDda: "-" },
  ],
  conversionTiming: [
    { bucket: "Same Day", volume: 15, percent: "42%", attributedRevenue: "LKR 7.80M" },
    { bucket: "2-7 Days", volume: 10, percent: "27%", attributedRevenue: "LKR 9.10M" },
    { bucket: "8-30 Days", volume: 6, percent: "21%", attributedRevenue: "LKR 6.00M" },
    { bucket: "31+ Days", volume: 3, percent: "10%", attributedRevenue: "LKR 2.80M" },
  ],
  identityResolution: {
    knownCustomerCoverage: 97,
    crossDeviceMatchRate: 94,
    anonymousToKnownResolution: 88,
    duplicateRate: 1.2,
    unresolvedSessions: 1.0,
    identityHealthScore: 94,
    identityHealthLabel: "Healthy",
  },
  trackingQuality: {
    campaignTracking: 98,
    paidMediaTracking: 96,
    identityResolution: 94,
    journeyTracking: 96,
    conversionEventCoverage: 99,
    revenueSync: 97,
    dataCompleteness: 96,
    analyticsHealth: 94,
    dataQualityScore: 96,
  },
  incrementalityLift: [
    { campaign: "Summer Beauty Festival", lift: "+18.4%", confidence: "93%", status: "Significant" },
    { campaign: "New Customer Acquisition", lift: "+12.6%", confidence: "88%", status: "Significant" },
    { campaign: "Loyalty Reactivation", lift: "Insufficient Evidence", confidence: "-", status: "Insufficient Evidence" },
  ],
  spendEfficiency: [
    { channel: "Paid Search", spend: "LKR 2.61M", attributedRevenue: "LKR 9.82M", roas: "3.76x", cac: "LKR 236" },
    { channel: "Paid Social", spend: "LKR 1.91M", attributedRevenue: "LKR 6.54M", roas: "3.42x", cac: "LKR 251" },
    { channel: "Email", spend: "LKR 1.30M", attributedRevenue: "LKR 5.79M", roas: "4.45x", cac: "LKR 215" },
    { channel: "Web/App", spend: "LKR 504K", attributedRevenue: "LKR 4.21M", roas: "8.35x", cac: "LKR 112" },
  ],
  businessPerformance: [
    { businessUnitBrand: "Beauty Retail", spend: "LKR 2.41M", attributedRevenue: "LKR 11.95M", roas: "4.95x", contributionPercent: "38%" },
    { businessUnitBrand: "Premium Beauty", spend: "LKR 1.91M", attributedRevenue: "LKR 9.81M", roas: "5.14x", contributionPercent: "31%" },
    { businessUnitBrand: "Skincare", spend: "LKR 1.32M", attributedRevenue: "LKR 6.72M", roas: "5.10x", contributionPercent: "21%" },
    { businessUnitBrand: "Marketplace Acquisition", spend: "LKR 1.68M", attributedRevenue: "LKR 3.24M", roas: "1.93x", contributionPercent: "10%" },
  ],
  financeAlignment: {
    status: "Within Tolerance",
    mk12AttributedRevenue: "LKR 31.70M",
    financeRecognizedRevenue: "LKR 31.02M",
    timingDifference: "LKR 680K",
    alignmentPercent: 98,
    toleranceStatus: "Within Tolerance",
  },
  governance: {
    activeModel: "Data-Driven Attribution",
    modelVersion: "v6",
    approvedBy: "Marketing Analytics Lead",
    financeAlignment: "Approved",
    lookbackPolicy: "Approved",
    conversionDefinitions: "Approved",
  },
  modelVersion: {
    version: "v6",
    publishedOn: "Aug 1, 2026",
    maintainingTeam: "Marketing Analytics",
    analyticsLead: "Amaya Perera",
  },
  recentActivity: [
    { id: "act1", time: "Aug 14, 2026 10:15 AM", action: "Data sync completed", details: "All sources synchronized successfully", user: "System" },
    { id: "act2", time: "Aug 14, 2026 09:41 AM", action: "Attribution model recalculated", details: "Data-Driven Model v6 applied", user: "Marketing Analytics" },
    { id: "act3", time: "Aug 14, 2026 07:35 AM", action: "Tracking gap detected", details: "2 campaigns with missing parameters", user: "System" },
    { id: "act4", time: "Aug 13, 2026 05:22 PM", action: "Revenue sync warning", details: "Finance variance within tolerance", user: "Marketing Analytics" },
    { id: "act5", time: "Aug 13, 2026 03:30 PM", action: "Model performance review", details: "Model drift within acceptable range", user: "System" },
  ],
  exceptionsSummary: [
    { metricCategory: "Tracking Gaps", openCount: 2, criticalCount: 0, highCount: 1, warningCount: 1, infoCount: 0 },
    { metricCategory: "Attribution Variance", openCount: 2, criticalCount: 0, highCount: 1, warningCount: 1, infoCount: 0 },
    { metricCategory: "Identity Resolution", openCount: 1, criticalCount: 0, highCount: 0, warningCount: 1, infoCount: 0 },
    { metricCategory: "Revenue Sync Warning", openCount: 1, criticalCount: 0, highCount: 0, warningCount: 1, infoCount: 0 },
    { metricCategory: "Data Quality Issues", openCount: 2, criticalCount: 0, highCount: 1, warningCount: 1, infoCount: 0 },
  ],
  rail: {
    healthScore: 94,
    healthLabel: "Excellent",
    healthDimensions: {
      trackingCoverage: 97,
      identityResolution: 94,
      revenueCoverage: 90,
      attributionConfidence: 91,
      conversionDeduplication: 99,
      financeAlignment: 98,
      modelGovernance: 97,
    },
    revenueSummary: {
      spend: "LKR 8.42M",
      attributedRevenue: "LKR 31.7M",
      assistedRevenue: "LKR 8.9M",
      roas: "3.76x",
    },
    conversionSummary: {
      attributedConversions: "28,416",
      influencedOrders: "34,820",
      directConversions: "23,840",
      assistedConversions: "10,980",
    },
    acquisitionSummary: {
      newCustomers: "24.8K",
      averageCac: "LKR 296",
      newCustomerRevenue: "LKR 11.4M",
      repeatPurchaseRoas: "12.4%",
    },
    coverageSummary: {
      trackingCoverage: 97,
      identityCoverage: 94,
      revenueCoverage: 90,
      dataCompleteness: 96,
    },
    exceptionsSummary: {
      open: 11,
      critical: 0,
      high: 2,
      warning: 6,
      information: 3,
    },
    quickQueues: {
      trackingGaps: 2,
      attributionVariance: 2,
      identityWarnings: 2,
      revenueSyncWarning: 1,
      modelReviews: 2,
      dataQualityIssues: 3,
    },
  },
};
