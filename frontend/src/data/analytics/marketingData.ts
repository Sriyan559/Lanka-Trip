import { KpiMetricData } from "./executivePerformanceData";

export interface MarketingKpi extends KpiMetricData {
  vsPreviousLabel?: string;
}

export interface SecondaryKpi {
  id: string;
  title: string;
  value: string;
}

export interface MarketingTrendPoint {
  date: string;
  spend: number;
  revenue: number;
  orders: number;
  newCustomers: number;
  roas: number;
}

export interface FunnelStagePoint {
  stage: string;
  volume: string;
  conversion: string;
  dropoff: string;
  costPerResult: string;
  revenue: string;
}

export interface ChannelPerformanceRow {
  channel: string;
  spend: string;
  ctr: string;
  cpc: string;
  cac: string;
  attribRevenue: string;
  roas: string;
  cvr: string;
  repeatPercent: string;
  growth: string;
  isPositive?: boolean;
}

export interface ChannelMixDonutPoint {
  name: string;
  value: number;
  color: string;
}

export interface CampaignPortfolioRow {
  campaign: string;
  type: string;
  audience: string;
  budget: string;
  spend: string;
  pacing: string;
  cac: string;
  roas: string;
  fatigue: string;
  score: number;
  status: string;
}

export interface AcquisitionQualityRow {
  source: string;
  newCustomers: string;
  cac: string;
  postOrderValue: string;
  repeat30: string;
  repeat90: string;
  avgClv: string;
  clvCacRatio: string;
  marginPercent: string;
  returnRate: string;
  cohortRule: string;
}

export interface ClvCacPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  category: string;
}

export interface CreativePerformanceRow {
  creative: string;
  type: string;
  impressions: string;
  ctr: string;
  roas: string;
  frequency: string;
  fatigueScore: number;
  status: string;
}

export interface PaidMediaRow {
  channel: string;
  spend: string;
  impressions: string;
  ctr: string;
  cpc: string;
  conversions: string;
  cac: string;
  roas: string;
  attribRevenue: string;
}

export interface OnsiteMessagingRow {
  channel: string;
  delivered: string;
  openRate: string;
  ctr: string;
  conversions: string;
  revenue: string;
  optOut: string;
  cost: string;
  roas: string;
}

export interface SavedMarketingView {
  viewName: string;
  owner: string;
  lastUpdated: string;
  scope: string;
}

export interface UnderlyingMarketingRecord {
  date: string;
  campaign: string;
  campaignId: string;
  channel: string;
  sourceMedium: string;
  audience: string;
  segment: string;
  creative: string;
  creativeType: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  orders: string;
  attribRevenue: string;
  cac: string;
  roas: string;
  cohortRef: string;
  status: string;
  action: string;
}

export interface MarketingHealthRailData {
  healthScore: number;
  label: string;
  subtext: string;
  marketingSummary: {
    spend: string;
    spendDelta: string;
    attribRevenue: string;
    revDelta: string;
    roas: string;
    roasDelta: string;
    roi: string;
    roiDelta: string;
    newCustomers: string;
    custDelta: string;
  };
  campaignSummary: {
    activeCampaigns: string;
    atRiskCampaigns: string;
    budgetUtilisation: string;
    attributionCoverage: string;
  };
  channelSummary: {
    topChannel: string;
    topRoasChannel: string;
    underperformingChannel: string;
  };
  acquisitionSummary: {
    cac: string;
    cacDelta: string;
    repeat30: string;
    repeatDelta: string;
    avgClv: string;
    clvDelta: string;
  };
  attributionSummary: {
    model: string;
    coverage: string;
    unattributedRevenue: string;
  };
  riskSummary: {
    spendRisk: number;
    roasRisk: number;
    attributionWarning: number;
    funnelLeakage: number;
    cohortWarning: number;
  };
  quickQueues: {
    queueName: string;
    count: string;
  }[];
}

export const MARKETING_DATA = {
  headerMeta: {
    title: "Marketing, Campaign, Acquisition & Attribution Analytics",
    subtitle:
      "Comprehensive marketing analytics across campaigns, channels, acquisition quality, customer retention, creative performance, budget pacing, and growth profitability.",
  },

  contextStrip: [
    { label: "Tenant", value: "SL Beauty", status: "normal" },
    { label: "Ecosystem", value: "Beauty Marketplace", status: "normal" },
    { label: "Business Unit", value: "All Business Units", status: "normal" },
    { label: "Region", value: "Sri Lanka", status: "normal" },
    { label: "Base Currency", value: "LKR", status: "normal" },
    { label: "Marketing Scope", value: "All Campaigns & Channels", status: "normal" },
    { label: "Campaign Source", value: "Connected", status: "success" },
    { label: "Customer Source", value: "Connected", status: "success" },
    { label: "Order Source", value: "Connected", status: "success" },
    { label: "Revenue Source", value: "Connected", status: "success" },
    { label: "Web/App Source", value: "Connected", status: "success" },
    { label: "Paid Media Source", value: "Connected", status: "success" },
    { label: "CRM/Messaging", value: "Connected", status: "success" },
    { label: "Marketplace Source", value: "Connected", status: "success" },
    { label: "Metric Governance", value: "96%", status: "success" },
    { label: "Metric Compliance", value: "99%", status: "success" },
    { label: "Last Refreshed", value: "Aug 14, 2026 10:15 AM", status: "normal" },
    { label: "Access", value: "Assigned Scope", status: "normal" },
  ],

  primaryKpis: [
    {
      id: "marketing-spend",
      number: "1.",
      title: "Marketing Spend",
      mainValue: "LKR 22.6M",
      trendPercentage: 6.7,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [19.2, 20.1, 20.8, 21.4, 22.0, 22.3, 22.6],
    },
    {
      id: "attributed-revenue",
      number: "2.",
      title: "Attributed Revenue",
      mainValue: "LKR 85.1M",
      trendPercentage: 14.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [71, 74, 77, 80, 82, 84, 85.1],
    },
    {
      id: "roas-kpi",
      number: "3.",
      title: "ROAS",
      mainValue: "3.76x",
      trendPercentage: 4.7,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "x",
      sparklineData: [3.4, 3.48, 3.55, 3.62, 3.68, 3.72, 3.76],
    },
    {
      id: "marketing-roi",
      number: "4.",
      title: "Marketing ROI",
      mainValue: "2.84x",
      trendPercentage: 12.1,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "x",
      sparklineData: [2.4, 2.5, 2.6, 2.7, 2.75, 2.8, 2.84],
    },
    {
      id: "new-customers-mkt",
      number: "5.",
      title: "New Customers",
      mainValue: "4,126",
      trendPercentage: 12.1,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [3500, 3650, 3780, 3900, 4010, 4080, 4126],
    },
    {
      id: "cac-kpi",
      number: "6.",
      title: "CAC",
      mainValue: "LKR 4,512",
      trendPercentage: -2.6,
      trendDirection: "down",
      isPositive: true,
      sparklineData: [4800, 4720, 4650, 4600, 4560, 4530, 4512],
    },
    {
      id: "conversion-rate-mkt",
      number: "7.",
      title: "Conversion Rate",
      mainValue: "4.8%",
      trendPercentage: 0.5,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [4.1, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8],
    },
    {
      id: "repeat-purchase-mkt",
      number: "8.",
      title: "Repeat Purchase",
      mainValue: "29.4%",
      trendPercentage: 2.1,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [26.5, 27.1, 27.8, 28.3, 28.8, 29.1, 29.4],
    },
    {
      id: "predicted-clv",
      number: "9.",
      title: "Avg Predicted CLV",
      mainValue: "LKR 27,600",
      trendPercentage: 4.0,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [25800, 26200, 26600, 27000, 27200, 27400, 27600],
    },
  ] as MarketingKpi[],

  analyticsHealthKpi: {
    score: 95,
    maxScore: 100,
    label: "Very Good",
    subtext: "2 pts vs prior period",
  },

  secondaryKpis: [
    { id: "s1", title: "Impressions", value: "18.4M" },
    { id: "s2", title: "Clicks", value: "642K" },
    { id: "s3", title: "CTR", value: "3.49%" },
    { id: "s4", title: "Assisted Conversions", value: "1,842" },
    { id: "s5", title: "Active Campaigns", value: "64" },
    { id: "s6", title: "Campaigns At Risk", value: "7" },
    { id: "s7", title: "Budget Utilisation", value: "82%" },
    { id: "s8", title: "Attribution Coverage", value: "96%" },
  ] as SecondaryKpi[],

  tabs: [
    "Marketing Overview",
    "Campaigns",
    "Channels",
    "Acquisition",
    "Funnel",
    "Audiences",
    "Segments",
    "Creative",
    "Paid Media",
    "CRM & Messaging",
    "Promotions",
    "Website & App",
    "Attribution",
    "Incrementality",
    "Budget & Spend",
    "Marketing Profitability",
    "Cohorts",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  readinessStrip: [
    { label: "Healthy", count: 46, type: "success" },
    { label: "Spend Risk", count: 6, type: "danger" },
    { label: "ROAS Risk", count: 5, type: "danger" },
    { label: "Attribution Warning", count: 5, type: "warning" },
    { label: "Funnel Leakage", count: 6, type: "danger" },
    { label: "Cohort Warning", count: 3, type: "warning" },
    { label: "Budget Warning", count: 2, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  marketingTrend: [
    { date: "Jul 15", spend: 19.2, revenue: 71, orders: 22000, newCustomers: 3500, roas: 3.4 },
    { date: "Jul 22", spend: 20.1, revenue: 74, orders: 23500, newCustomers: 3650, roas: 3.5 },
    { date: "Jul 29", spend: 20.8, revenue: 77, orders: 25000, newCustomers: 3780, roas: 3.6 },
    { date: "Aug 5", spend: 21.4, revenue: 80, orders: 26500, newCustomers: 3900, roas: 3.68 },
    { date: "Aug 12", spend: 22.6, revenue: 85.1, orders: 28000, newCustomers: 4126, roas: 3.76 },
  ] as MarketingTrendPoint[],

  conversionFunnel: [
    { stage: "Impressions", volume: "18.4M", conversion: "100%", dropoff: "—", costPerResult: "LKR 0.01", revenue: "—" },
    { stage: "Clicks", volume: "642K", conversion: "3.49%", dropoff: "96.5%", costPerResult: "LKR 35.20", revenue: "1.4M" },
    { stage: "Landing Page Visits", volume: "412K", conversion: "64.2%", dropoff: "35.8%", costPerResult: "LKR 54.80", revenue: "2.1M" },
    { stage: "Product Views", volume: "310K", conversion: "75.2%", dropoff: "24.8%", costPerResult: "LKR 72.90", revenue: "4.5M" },
    { stage: "Add to Cart", volume: "96K", conversion: "31.0%", dropoff: "69.0%", costPerResult: "LKR 235.40", revenue: "5.2M" },
    { stage: "Checkout", volume: "48K", conversion: "50.0%", dropoff: "50.0%", costPerResult: "LKR 470.80", revenue: "7.8M" },
    { stage: "Paid Orders", volume: "28K", conversion: "58.3%", dropoff: "41.7%", costPerResult: "LKR 807.10", revenue: "85.1M" },
    { stage: "Repeat Purchase", volume: "2,640", conversion: "9.4%", dropoff: "90.6%", costPerResult: "LKR 8,560", revenue: "25.0M" },
  ] as FunnelStagePoint[],

  channelPerformance: [
    { channel: "Paid Search", spend: "6.2M", ctr: "2.21%", cpc: "24.10", cac: "3,852", attribRevenue: "24.1M", roas: "3.89x", cvr: "7.2%", repeatPercent: "32.1%", growth: "+12.0%", isPositive: true },
    { channel: "Paid Social", spend: "4.8M", ctr: "1.84%", cpc: "18.20", cac: "4,120", attribRevenue: "16.8M", roas: "3.50x", cvr: "6.4%", repeatPercent: "28.4%", growth: "+10.2%", isPositive: true },
    { channel: "Organic Search", spend: "0.0M", ctr: "5.10%", cpc: "0.00", cac: "1,440", attribRevenue: "18.4M", roas: "12.80x", cvr: "10.1%", repeatPercent: "38.6%", growth: "+15.0%", isPositive: true },
    { channel: "Email", spend: "0.7M", ctr: "11.20%", cpc: "1.20", cac: "1,102", attribRevenue: "6.8M", roas: "9.71x", cvr: "14.2%", repeatPercent: "42.1%", growth: "+11.2%", isPositive: true },
    { channel: "Referral", spend: "0.4M", ctr: "4.10%", cpc: "8.50", cac: "1,842", attribRevenue: "3.2M", roas: "8.00x", cvr: "8.1%", repeatPercent: "31.2%", growth: "+8.4%", isPositive: true },
    { channel: "Affiliate", spend: "0.8M", ctr: "3.10%", cpc: "5.20", cac: "3,110", attribRevenue: "3.8M", roas: "4.75x", cvr: "6.2%", repeatPercent: "26.4%", growth: "+7.8%", isPositive: true },
    { channel: "Marketplace", spend: "8.2M", ctr: "6.22%", cpc: "0.52", cac: "1,486", attribRevenue: "28.4M", roas: "3.46x", cvr: "8.8%", repeatPercent: "28.4%", growth: "+6.8%", isPositive: true },
  ] as ChannelPerformanceRow[],

  spendShareDonut: [
    { name: "Paid Search", value: 28, color: "#2563eb" },
    { name: "Paid Social", value: 21, color: "#800020" },
    { name: "Organic Search", value: 24, color: "#059669" },
    { name: "Email", value: 19, color: "#7c3aed" },
    { name: "Others", value: 8, color: "#64748b" },
  ] as ChannelMixDonutPoint[],

  revenueShareDonut: [
    { name: "Organic Search", value: 28, color: "#059669" },
    { name: "Paid Search", value: 28, color: "#2563eb" },
    { name: "Paid Social", value: 20, color: "#800020" },
    { name: "Email", value: 16, color: "#7c3aed" },
    { name: "Others", value: 8, color: "#64748b" },
  ] as ChannelMixDonutPoint[],

  newCustomerShareDonut: [
    { name: "Paid Search", value: 32, color: "#2563eb" },
    { name: "Paid Social", value: 25, color: "#800020" },
    { name: "Organic Search", value: 20, color: "#059669" },
    { name: "Email", value: 15, color: "#7c3aed" },
    { name: "Others", value: 8, color: "#64748b" },
  ] as ChannelMixDonutPoint[],

  conversionShareDonut: [
    { name: "Paid Search", value: 30, color: "#2563eb" },
    { name: "Organic Search", value: 28, color: "#059669" },
    { name: "Paid Social", value: 20, color: "#800020" },
    { name: "Email", value: 14, color: "#7c3aed" },
    { name: "Others", value: 8, color: "#64748b" },
  ] as ChannelMixDonutPoint[],

  campaignPortfolio: [
    { campaign: "SL10_Brand_Growth", type: "Brand", audience: "Broad", budget: "5.0M", spend: "4.2M", pacing: "84%", cac: "4,120", roas: "4.12x", fatigue: "2.7", score: 42, status: "Active" },
    { campaign: "SkinCare_Acquisition_01", type: "Acquisition", audience: "InMarket", budget: "4.0M", spend: "3.5M", pacing: "87%", cac: "3,850", roas: "3.85x", fatigue: "2.9", score: 45, status: "Active" },
    { campaign: "Beauty_Glow_Email_02", type: "Retention", audience: "Email", budget: "1.2M", spend: "0.9M", pacing: "75%", cac: "1,102", roas: "9.71x", fatigue: "1.1", score: 18, status: "Active" },
    { campaign: "Influencer_Glam_01", type: "Influencer", audience: "Broad", budget: "1.8M", spend: "1.4M", pacing: "78%", cac: "5,120", roas: "2.85x", fatigue: "3.4", score: 38, status: "Active" },
    { campaign: "Affiliate_Builder_01", type: "Affiliate", audience: "All", budget: "1.0M", spend: "0.8M", pacing: "80%", cac: "3,110", roas: "4.75x", fatigue: "1.8", score: 22, status: "Active" },
  ] as CampaignPortfolioRow[],

  acquisitionQuality: [
    { source: "Organic Search", newCustomers: "1,284", cac: "1,440", postOrderValue: "9,120", repeat30: "41.2%", repeat90: "51.4%", avgClv: "31,400", clvCacRatio: "21.8x", marginPercent: "32.1%", returnRate: "4.2%", cohortRule: "Good" },
    { source: "Email", newCustomers: "642", cac: "1,102", postOrderValue: "8,720", repeat30: "42.1%", repeat90: "53.7%", avgClv: "34,400", clvCacRatio: "31.2x", marginPercent: "30.1%", returnRate: "4.0%", cohortRule: "Good" },
    { source: "Paid Search", newCustomers: "912", cac: "3,852", postOrderValue: "10,850", repeat30: "32.1%", repeat90: "41.2%", avgClv: "27,800", clvCacRatio: "7.2x", marginPercent: "31.4%", returnRate: "5.1%", cohortRule: "Good" },
    { source: "Paid Social", newCustomers: "706", cac: "4,120", postOrderValue: "9,200", repeat30: "28.4%", repeat90: "36.2%", avgClv: "24,100", clvCacRatio: "5.8x", marginPercent: "28.6%", returnRate: "6.2%", cohortRule: "Watch" },
    { source: "Referral", newCustomers: "412", cac: "1,842", postOrderValue: "7,840", repeat30: "31.2%", repeat90: "39.8%", avgClv: "25,400", clvCacRatio: "13.8x", marginPercent: "29.4%", returnRate: "4.8%", cohortRule: "Good" },
  ] as AcquisitionQualityRow[],

  clvCacMatrix: [
    { x: 1440, y: 31400, z: 450, name: "Organic Search", category: "High Value / Low CAC" },
    { x: 1102, y: 34400, z: 380, name: "Email", category: "High Value / Low CAC" },
    { x: 3852, y: 27800, z: 290, name: "Paid Search", category: "Moderate" },
    { x: 4120, y: 24100, z: 210, name: "Paid Social", category: "High CAC / Low Value" },
    { x: 1842, y: 25400, z: 150, name: "Referral", category: "Low CAC" },
  ] as ClvCacPoint[],

  creativePerformance: [
    { creative: "Glow_Serum_Static", type: "Image", impressions: "2.1M", ctr: "2.71%", roas: "4.8x", frequency: "2.7", fatigueScore: 42, status: "Good" },
    { creative: "Hydra_Video_15s", type: "Video", impressions: "1.8M", ctr: "2.20%", roas: "4.2x", frequency: "2.9", fatigueScore: 45, status: "Good" },
    { creative: "Photo_Launch_Carousel", type: "Carousel", impressions: "1.5M", ctr: "2.50%", roas: "4.1x", frequency: "3.1", fatigueScore: 38, status: "Good" },
    { creative: "Short_Promo_Offer", type: "Email", impressions: "0.9M", ctr: "11.20%", roas: "9.71x", frequency: "1.1", fatigueScore: 18, status: "Good" },
  ] as CreativePerformanceRow[],

  paidMediaPerformance: [
    { channel: "Google Search", spend: "4.2M", impressions: "3.2M", ctr: "2.21%", cpc: "24.10", conversions: "1,102", cac: "3,812", roas: "3.89x", attribRevenue: "16.3M" },
    { channel: "Meta (FB/IG)", spend: "3.8M", impressions: "2.8M", ctr: "1.84%", cpc: "18.20", conversions: "922", cac: "4,120", roas: "3.50x", attribRevenue: "13.3M" },
    { channel: "TikTok", spend: "1.8M", impressions: "1.4M", ctr: "2.12%", cpc: "9.25", conversions: "381", cac: "4,725", roas: "2.85x", attribRevenue: "5.1M" },
    { channel: "Display Network", spend: "0.7M", impressions: "0.9M", ctr: "0.67%", cpc: "14.20", conversions: "112", cac: "6,250", roas: "1.80x", attribRevenue: "1.3M" },
  ] as PaidMediaRow[],

  onsiteMessaging: [
    { channel: "Email", delivered: "1.4M", openRate: "32.1%", ctr: "6.24%", conversions: "2,112", revenue: "6.8M", optOut: "0.1%", cost: "0.7M", roas: "9.71x" },
    { channel: "Push", delivered: "840K", openRate: "24.2%", ctr: "4.12%", conversions: "1,412", revenue: "4.1M", optOut: "0.3%", cost: "0.4M", roas: "10.25x" },
    { channel: "SMS", delivered: "512K", openRate: "94.2%", ctr: "8.21%", conversions: "1,842", revenue: "5.2M", optOut: "0.8%", cost: "0.5M", roas: "10.40x" },
    { channel: "WhatsApp", delivered: "312K", openRate: "92.4%", ctr: "12.4%", conversions: "842", revenue: "3.2M", optOut: "0.4%", cost: "0.3M", roas: "10.67x" },
  ] as OnsiteMessagingRow[],

  savedViews: [
    { viewName: "Marketing Overview Executive", owner: "Elena Vance", lastUpdated: "Aug 14, 2026 10:00 AM", scope: "All Regions" },
    { viewName: "Campaign Performance", owner: "C. Fernando", lastUpdated: "Aug 12, 2026 09:30 AM", scope: "Sri Lanka" },
    { viewName: "Acquisition Efficiency", owner: "T. Jayasinghe", lastUpdated: "Aug 11, 2026 04:15 PM", scope: "Western" },
  ] as SavedMarketingView[],

  priorityInsights: [
    { id: "pi1", insight: "Paid Search driving 28% of total revenue with 3.89x ROAS", impact: "High" },
    { id: "pi2", insight: "Creative fatigue detected on 18 ad sets in Meta", impact: "High" },
    { id: "pi3", insight: "Email campaign repeat purchase rate reached 42.1%", impact: "Medium" },
    { id: "pi4", insight: "CAC increased by 2.6% in Paid Social channel", impact: "Medium" },
  ],

  underlyingMarketingRecords: [
    { date: "Aug 14, 2026", campaign: "SL10_Brand_Growth", campaignId: "CAMP-0001", channel: "Paid Search", sourceMedium: "google / cpc", audience: "Broad", segment: "All Customers", creative: "Image", creativeType: "Video", spend: "180,450", impressions: "3,562,112", clicks: "90,624", ctr: "2.88%", orders: "532", attribRevenue: "1,942,650", cac: "3,852", roas: "3.89x", cohortRef: "Cohort_2026_07", status: "Active", action: "View" },
    { date: "Aug 13, 2026", campaign: "SkinCare_Acq_01", campaignId: "CAMP-0002", channel: "Paid Social", sourceMedium: "meta / cpc", audience: "InMarket", segment: "All Customers", creative: "Image", creativeType: "Image", spend: "171,230", impressions: "4,562,001", clicks: "92,120", ctr: "1.87%", orders: "421", attribRevenue: "1,331,500", cac: "4,120", roas: "3.50x", cohortRef: "Cohort_2026_07", status: "Active", action: "View" },
    { date: "Aug 13, 2026", campaign: "Beauty_Glow_Email_02", campaignId: "CAMP-0003", channel: "Email", sourceMedium: "email / cpc", audience: "Loyal", segment: "Influencer-01", creative: "Email", creativeType: "SMS", spend: "24,816", impressions: "1,412,001", clicks: "104,102", ctr: "7.37%", orders: "482", attribRevenue: "1,682,000", cac: "1,102", roas: "9.71x", cohortRef: "Cohort_2026_07", status: "Active", action: "View" },
  ] as UnderlyingMarketingRecord[],

  healthRail: {
    healthScore: 95,
    label: "Very Good",
    subtext: "2 pts vs prior period",
    marketingSummary: {
      spend: "LKR 22.6M",
      spendDelta: "+ 6.7%",
      attribRevenue: "LKR 85.1M",
      revDelta: "+ 14.4%",
      roas: "3.76x",
      roasDelta: "+ 4.7%",
      roi: "2.84x",
      roiDelta: "+ 12.1%",
      newCustomers: "4,126",
      custDelta: "+ 12.1%",
    },
    campaignSummary: {
      activeCampaigns: "64",
      atRiskCampaigns: "7",
      budgetUtilisation: "82%",
      attributionCoverage: "96%",
    },
    channelSummary: {
      topChannel: "Paid Search",
      topRoasChannel: "Organic Search",
      underperformingChannel: "Paid Social",
    },
    acquisitionSummary: {
      cac: "LKR 4,512",
      cacDelta: "- 2.6%",
      repeat30: "29.4%",
      repeatDelta: "+ 2.1pp",
      avgClv: "LKR 27,600",
      clvDelta: "+ 4.0%",
    },
    attributionSummary: {
      model: "Data-Driven",
      coverage: "96%",
      unattributedRevenue: "4%",
    },
    riskSummary: {
      spendRisk: 6,
      roasRisk: 5,
      attributionWarning: 5,
      funnelLeakage: 6,
      cohortWarning: 3,
    },
    quickQueues: [
      { queueName: "Campaigns At Risk", count: "7" },
      { queueName: "Budget Overrun", count: "5" },
      { queueName: "ROAS Below Target", count: "9" },
      { queueName: "High CAC Campaigns", count: "12" },
      { queueName: "Creative Fatigue", count: "18" },
      { queueName: "Funnel Drop-off", count: "8" },
      { queueName: "Attribution Gaps", count: "4" },
    ],
  } as MarketingHealthRailData,
};
