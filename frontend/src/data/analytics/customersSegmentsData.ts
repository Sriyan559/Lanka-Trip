import { KpiMetricData } from "./executivePerformanceData";

export interface CustomerKpi extends KpiMetricData {
  vsPreviousLabel?: string;
}

export interface CustomerTrendPoint {
  date: string;
  activeCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  retentionRate: number;
}

export interface CompositionDonutPoint {
  name: string;
  value: number;
  count: number;
  color: string;
}

export interface SegmentPerformanceRow {
  segment: string;
  customers: string;
  revenue: string;
  aov: string;
  frequency: string;
  retention: string;
  churn: string;
  growth: string;
  isPositive?: boolean;
}

export interface ClvDistributionRow {
  band: string;
  customers: number;
  revenueShare: number;
}

export interface HighValueCustomerRow {
  customer: string;
  segment: string;
  revenue: string;
  orders: number;
  aov: string;
  loyaltyTier: string;
  status: string;
}

export interface RetentionPerformanceRow {
  metric: string;
  may2026: string;
  apr2026: string;
  change: string;
  isPositive?: boolean;
}

export interface CohortRow {
  cohort: string;
  m0: number;
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
  m6: number;
  m7: number;
  m8: number;
  m9: number;
  m10: number;
  m11: number;
  m12: number;
}

export interface ChurnRiskCustomerRow {
  customerID: string;
  customer: string;
  riskScore: number;
  clvPred: string;
  lastOrder: string;
  reason: string;
}

export interface RfmRow {
  score: string;
  customers: string;
  percent: string;
  revenue: string;
  revenuePercent: string;
}

export interface ClvCacSourceRow {
  source: string;
  customers: string;
  revenue: string;
  cac: string;
  clvCacRatio: string;
}

export interface AcquisitionQualityRow {
  channel: string;
  qualityScore: number;
  retention30d: string;
  churn30d: string;
}

export interface RevenueConcentrationRow {
  tier: string;
  customers: string;
  revenue: string;
  revenuePercent: string;
}

export interface CategoryAffinityItem {
  category: string;
  score: number;
}

export interface CrossSellOpportunityRow {
  opportunity: string;
  customers: string;
}

export interface GeoPreferenceRow {
  geography: string;
  customers: string;
  primaryChannel: string;
}

export interface CustomerSupportMetricRow {
  metric: string;
  value: string;
  vsPrior: string;
  isPositive?: boolean;
}

export interface CustomerExceptionRow {
  customerID: string;
  customerName: string;
  segment: string;
  riskLevel: "High" | "Medium" | "Low";
  clvPred: string;
  lastOrderDate: string;
  daysSinceOrder: number;
  churnRisk: number;
  loyaltyTier: string;
  totalRevenue: string;
  orders: number;
  aov: string;
  supportTickets: number;
  npsScore: number;
  region: string;
  channel: string;
  status: string;
}

export interface ForecastVsTargetRow {
  metric: string;
  actual: string;
  forecast: string;
  target: string;
  vsTarget: string;
  isPositive?: boolean;
}

export interface CustomerHealthRailData {
  healthScore: number;
  label: string;
  summary: {
    customerCount: string;
    customerGrowth: string;
    retentionRate: string;
    retentionDelta: string;
    valueSummary: string;
    valueDelta: string;
    churnSummary: string;
    churnDelta: string;
    loyaltySummary: string;
    loyaltyDelta: string;
  };
  quickQueries: {
    riskType: string;
    count: string;
  }[];
}

export const CUSTOMERS_SEGMENTS_DATA = {
  headerMeta: {
    title: "Customer, Segment, Retention & Lifetime Value Analytics",
    subtitle:
      "Comprehensive customer analytics across value, retention, churn, loyalty, acquisition quality, service impact, and forecasting.",
  },

  contextStrip: [
    { label: "Business Unit", value: "SL Beauty", status: "normal" },
    { label: "Reporting Period", value: "May 1 – May 31, 2026", status: "normal" },
    { label: "Comparison Period", value: "Apr 1 – Apr 30, 2026", status: "normal" },
    { label: "Region", value: "All Regions", status: "normal" },
    { label: "Sales Channel", value: "All Channels", status: "normal" },
    { label: "Customer Source", value: "All Sources", status: "normal" },
    { label: "Order Source", value: "All Sources", status: "normal" },
    { label: "Loyalty Segment", value: "All Segments", status: "normal" },
    { label: "Marketing Channel", value: "All Channels", status: "normal" },
    { label: "Customer Segment", value: "All Segments", status: "normal" },
    { label: "Currency", value: "USD", status: "normal" },
    { label: "Data Completeness", value: "99%", status: "success" },
    { label: "Last Data Refresh", value: "May 31, 2026 10:15 AM", status: "normal" },
  ],

  kpis: [
    {
      id: "active-cust",
      number: "1.",
      title: "Active Customers",
      mainValue: "28,416",
      trendPercentage: 8.6,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs Apr 2026: 26,172",
      sparklineData: [24000, 24800, 25500, 26172, 27000, 27800, 28416],
    },
    {
      id: "new-cust",
      number: "2.",
      title: "New Customers",
      mainValue: "4,218",
      trendPercentage: 12.3,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs Apr 2026: 3,754",
      sparklineData: [3200, 3400, 3600, 3754, 3900, 4050, 4218],
    },
    {
      id: "returning-cust",
      number: "3.",
      title: "Returning Customers",
      mainValue: "24,198",
      trendPercentage: 7.4,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs Apr 2026: 22,522",
      sparklineData: [21000, 21500, 22000, 22522, 23000, 23600, 24198],
    },
    {
      id: "repeat-purchase-rate",
      number: "4.",
      title: "Repeat Purchase Rate",
      mainValue: "34.5%",
      trendPercentage: 2.1,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs Apr 2026: 32.4%",
      sparklineData: [30, 31, 31.8, 32.4, 33.2, 33.9, 34.5],
    },
    {
      id: "retention-rate-30d",
      number: "5.",
      title: "Retention Rate (30D)",
      mainValue: "78.6%",
      trendPercentage: 1.8,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs Apr 2026: 76.8%",
      sparklineData: [74, 75, 76, 76.8, 77.5, 78.0, 78.6],
    },
    {
      id: "churn-rate-30d",
      number: "6.",
      title: "Churn Rate (30D)",
      mainValue: "2.8%",
      trendPercentage: -0.4,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs Apr 2026: 3.2%",
      sparklineData: [3.8, 3.6, 3.4, 3.2, 3.0, 2.9, 2.8],
    },
    {
      id: "aov-cust",
      number: "7.",
      title: "Avg Order Value",
      mainValue: "LKR 3,012",
      trendPercentage: 3.2,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs Apr 2026: 2,918",
      sparklineData: [2800, 2850, 2890, 2918, 2960, 2990, 3012],
    },
    {
      id: "orders-per-cust",
      number: "8.",
      title: "Orders Per Customer",
      mainValue: "3.4x",
      trendPercentage: 5.1,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs Apr 2026: 3.2x",
      sparklineData: [2.9, 3.0, 3.1, 3.2, 3.3, 3.35, 3.4],
    },
    {
      id: "avg-pred-clv",
      number: "9.",
      title: "Avg Predicted CLV",
      mainValue: "LKR 28,400",
      trendPercentage: 6.0,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs Apr 2026: 26,787",
      sparklineData: [25000, 25600, 26200, 26787, 27300, 27900, 28400],
    },
  ] as CustomerKpi[],

  customerHealthKpi: {
    scoreLabel: "Good",
    subtext: "All systems operational",
  },

  activeFilters: [
    "Female",
    "Medium Risk",
    "Churn Risk",
    "CLV: High",
    "Dormant > 90 Days",
    "Date: May 1 – May 31, 2026",
    "Loyalty: Gold, Platinum",
    "Forecast: Active",
  ],

  customerTrend: [
    { date: "May 1", activeCustomers: 14200, newCustomers: 6800, returningCustomers: 28100, retentionRate: 76.8 },
    { date: "May 6", activeCustomers: 14100, newCustomers: 6900, returningCustomers: 27900, retentionRate: 77.1 },
    { date: "May 11", activeCustomers: 14500, newCustomers: 6850, returningCustomers: 28200, retentionRate: 77.5 },
    { date: "May 16", activeCustomers: 14800, newCustomers: 6920, returningCustomers: 28400, retentionRate: 77.9 },
    { date: "May 21", activeCustomers: 15300, newCustomers: 6980, returningCustomers: 28550, retentionRate: 78.2 },
    { date: "May 26", activeCustomers: 15800, newCustomers: 7020, returningCustomers: 28700, retentionRate: 78.4 },
    { date: "May 31", activeCustomers: 16200, newCustomers: 7100, returningCustomers: 28850, retentionRate: 78.6 },
  ] as CustomerTrendPoint[],

  customerComposition: [
    { name: "Loyal Customers", value: 42.8, count: 12150, color: "#2563eb" },
    { name: "Potential Loyalists", value: 24.1, count: 6850, color: "#059669" },
    { name: "At Risk", value: 15.8, count: 4490, color: "#f59e0b" },
    { name: "New Customers", value: 10.6, count: 3012, color: "#ea580c" },
    { name: "Churned", value: 6.7, count: 1911, color: "#800020" },
  ] as CompositionDonutPoint[],

  segmentPerformance: [
    { segment: "VIP", customers: "4,128", revenue: "144.2M", aov: "34,960", frequency: "5.1x", retention: "92.1%", churn: "0.6%", growth: "+ 11.2%", isPositive: true },
    { segment: "Loyal", customers: "7,842", revenue: "206.7M", aov: "26,380", frequency: "4.2x", retention: "84.5%", churn: "1.6%", growth: "+ 7.3%", isPositive: true },
    { segment: "Core", customers: "11,206", revenue: "208.3M", aov: "18,590", frequency: "3.7x", retention: "72.8%", churn: "3.0%", growth: "+ 4.2%", isPositive: true },
    { segment: "At Risk", customers: "3,885", revenue: "48.6M", aov: "12,510", frequency: "2.6x", retention: "41.3%", churn: "7.9%", growth: "- 2.8%", isPositive: false },
    { segment: "Hibernating", customers: "1,777", revenue: "18.2M", aov: "10,240", frequency: "1.9x", retention: "18.6%", churn: "15.8%", growth: "- 6.4%", isPositive: false },
    { segment: "New", customers: "3,012", revenue: "32.8M", aov: "10,890", frequency: "1.2x", retention: "28.4%", churn: "9.1%", growth: "+ 12.0%", isPositive: true },
  ] as SegmentPerformanceRow[],

  clvDistribution: [
    { band: "Very High", customers: 1924, revenueShare: 26 },
    { band: "High", customers: 4312, revenueShare: 38 },
    { band: "Medium", customers: 9366, revenueShare: 22 },
    { band: "Low", customers: 7259, revenueShare: 11 },
    { band: "Very Low", customers: 1535, revenueShare: 3 },
  ] as ClvDistributionRow[],

  highValueCustomers: [
    { customer: "A. Perera", segment: "VIP", revenue: "2.48M", orders: 12, aov: "206,667", loyaltyTier: "Platinum", status: "Active" },
    { customer: "N. Silva", segment: "VIP", revenue: "2.31M", orders: 10, aov: "231,000", loyaltyTier: "Platinum", status: "Active" },
    { customer: "M. Fernando", segment: "Loyal", revenue: "1.89M", orders: 9, aov: "210,000", loyaltyTier: "Gold", status: "Active" },
    { customer: "S. Jayawardena", segment: "Loyal", revenue: "1.76M", orders: 8, aov: "220,000", loyaltyTier: "Gold", status: "Active" },
    { customer: "R. De Silva", segment: "VIP", revenue: "1.68M", orders: 7, aov: "240,000", loyaltyTier: "Platinum", status: "Active" },
  ] as HighValueCustomerRow[],

  retentionPerformance: [
    { metric: "30-Day Retention", may2026: "78.6%", apr2026: "76.8%", change: "+ 1.8pp", isPositive: true },
    { metric: "60-Day Retention", may2026: "62.4%", apr2026: "60.5%", change: "+ 1.9pp", isPositive: true },
    { metric: "90-Day Retention", may2026: "51.2%", apr2026: "49.1%", change: "+ 2.1pp", isPositive: true },
    { metric: "Repeat Purchase Rate", may2026: "34.5%", apr2026: "32.4%", change: "+ 2.1pp", isPositive: true },
    { metric: "Churn Rate (30D)", may2026: "2.8%", apr2026: "3.2%", change: "- 0.4pp", isPositive: true },
  ] as RetentionPerformanceRow[],

  cohortData: [
    { cohort: "May 2026", m0: 100, m1: 48, m2: 36, m3: 28, m4: 22, m5: 18, m6: 14, m7: 11, m8: 9, m9: 7, m10: 6, m11: 5, m12: 4 },
    { cohort: "Apr 2026", m0: 100, m1: 46, m2: 33, m3: 25, m4: 20, m5: 17, m6: 13, m7: 10, m8: 8, m9: 7, m10: 5, m11: 4, m12: 4 },
    { cohort: "Mar 2026", m0: 100, m1: 45, m2: 33, m3: 25, m4: 19, m5: 16, m6: 12, m7: 9, m8: 8, m9: 6, m10: 5, m11: 4, m12: 3 },
    { cohort: "Feb 2026", m0: 100, m1: 43, m2: 31, m3: 24, m4: 18, m5: 15, m6: 11, m7: 9, m8: 7, m10: 5, m9: 4, m11: 3, m12: 3 },
    { cohort: "Jan 2026", m0: 100, m1: 42, m2: 30, m3: 22, m4: 17, m5: 14, m6: 10, m7: 8, m8: 6, m9: 4, m10: 3, m11: 2, m12: 2 },
  ] as CohortRow[],

  churnAnalysis: [
    { metric: "At Risk Customers", value: "1,216", change: "+ 8.2%", isPositive: false },
    { metric: "Churned (30D)", value: "754", change: "+ 6.1%", isPositive: false },
    { metric: "Voluntary Churn", value: "521", change: "+ 5.3%", isPositive: false },
    { metric: "Involuntary Churn", value: "233", change: "+ 8.9%", isPositive: false },
    { metric: "Churn Rate (30D)", value: "2.8%", change: "- 0.4pp", isPositive: true },
  ],

  churnRiskPortfolio: [
    { customerID: "CUST-00921", customer: "CUST-00921", riskScore: 92, clvPred: "78,500", lastOrder: "Apr 20, 2026", reason: "Inactivity" },
    { customerID: "CUST-01243", customer: "CUST-01243", riskScore: 88, clvPred: "62,100", lastOrder: "Apr 18, 2026", reason: "No Recent Purch." },
    { customerID: "CUST-00776", customer: "CUST-00776", riskScore: 85, clvPred: "54,800", lastOrder: "Apr 15, 2026", reason: "Price Sensitive" },
    { customerID: "CUST-01832", customer: "CUST-01832", riskScore: 84, clvPred: "46,200", lastOrder: "Apr 12, 2026", reason: "Low Engagement" },
    { customerID: "CUST-00251", customer: "CUST-00251", riskScore: 82, clvPred: "41,000", lastOrder: "Apr 10, 2026", reason: "Service Issue" },
  ] as ChurnRiskCustomerRow[],

  rfmAnalysis: [
    { score: "555 - 544", customers: "1,924", percent: "6.8%", revenue: "75.3M", revenuePercent: "12.9%" },
    { score: "444 - 344", customers: "4,126", percent: "14.5%", revenue: "104.1M", revenuePercent: "17.8%" },
    { score: "353 - 443", customers: "6,812", percent: "24.0%", revenue: "122.8M", revenuePercent: "21.0%" },
    { score: "252 - 342", customers: "7,918", percent: "27.9%", revenue: "101.2M", revenuePercent: "17.3%" },
    { score: "111 - 241", customers: "7,570", percent: "26.6%", revenue: "90.1M", revenuePercent: "15.4%" },
    { score: "Total", customers: "28,416", percent: "100%", revenue: "585.5M", revenuePercent: "100%" },
  ] as RfmRow[],

  purchaseBehavior: [
    { metric: "Avg Orders / Customer", value: "3.4x", vsPrior: "+ 5.1%", isPositive: true },
    { metric: "Avg Order Value (LKR)", value: "3,012", vsPrior: "+ 3.2%", isPositive: true },
    { metric: "Median Order Value (LKR)", value: "1,850", vsPrior: "+ 2.6%", isPositive: true },
    { metric: "Purchase Frequency (30D)", value: "1.4x", vsPrior: "+ 4.8%", isPositive: true },
    { metric: "Category Affinity Score", value: "72%", vsPrior: "+ 3pp", isPositive: true },
  ],

  customerProfitability: [
    { metric: "Revenue (LKR)", value: "585.5M", vsPrior: "+ 8.6%", isPositive: true },
    { metric: "Gross Margin %", value: "31.4%", vsPrior: "+ 1.2pp", isPositive: true },
    { metric: "Contribution Margin %", value: "19.8%", vsPrior: "+ 1.0pp", isPositive: true },
    { metric: "Avg Predicted CLV (LKR)", value: "28,400", vsPrior: "+ 6.0%", isPositive: true },
    { metric: "CAC (LKR)", value: "4,512", vsPrior: "- 2.6%", isPositive: true },
  ],

  clvCacSource: [
    { source: "Organic Search", customers: "9,842", revenue: "31,200", cac: "3,300", clvCacRatio: "9.8x" },
    { source: "Direct", customers: "6,132", revenue: "27,800", cac: "3,100", clvCacRatio: "9.0x" },
    { source: "Paid Search", customers: "4,626", revenue: "26,100", cac: "4,300", clvCacRatio: "6.1x" },
    { source: "Social", customers: "4,123", revenue: "24,300", cac: "3,900", clvCacRatio: "6.2x" },
    { source: "Email", customers: "2,138", revenue: "29,600", cac: "2,900", clvCacRatio: "10.2x" },
    { source: "Affiliate", customers: "1,555", revenue: "22,900", cac: "3,000", clvCacRatio: "7.6x" },
  ] as ClvCacSourceRow[],

  acquisitionQuality: [
    { channel: "Organic Search", qualityScore: 86, retention30d: "82.1%", churn30d: "2.1%" },
    { channel: "Direct", qualityScore: 83, retention30d: "78.6%", churn30d: "2.6%" },
    { channel: "Paid Search", qualityScore: 72, retention30d: "71.2%", churn30d: "3.3%" },
    { channel: "Social", qualityScore: 68, retention30d: "68.4%", churn30d: "3.9%" },
    { channel: "Email", qualityScore: 79, retention30d: "76.8%", churn30d: "2.5%" },
  ] as AcquisitionQualityRow[],

  loyaltyAnalyticsLeft: [
    { metric: "Program Members", value: "14,562", vsPrior: "+ 7.3%", isPositive: true },
    { metric: "Redemption Rate", value: "34.6%", vsPrior: "+ 2.4pp", isPositive: true },
    { metric: "Points Liability", value: "18.7M", vsPrior: "+ 6.1%", isPositive: true },
    { metric: "Tier Upgrade Rate", value: "6.2%", vsPrior: "+ 0.7pp", isPositive: true },
    { metric: "Loyalty Revenue", value: "56.3M", vsPrior: "+ 8.7%", isPositive: true },
  ],

  loyaltyAnalyticsRight: [
    { metric: "Program (VIP) Users", value: "14,562", ratio: "51%" },
    { metric: "Redemptions Rate", value: "34.6%", ratio: "35%" },
    { metric: "Dormant Revenue (LKR)", value: "24.8M", ratio: "2.3%" },
  ],

  revenueConcentration: [
    { tier: "Top 5%", customers: "1,421", revenue: "142.3M", revenuePercent: "24.3%" },
    { tier: "Top 10%", customers: "2,842", revenue: "228.6M", revenuePercent: "39.1%" },
    { tier: "Top 20%", customers: "5,683", revenue: "347.2M", revenuePercent: "59.3%" },
    { tier: "Top 50%", customers: "14,208", revenue: "498.1M", revenuePercent: "85.1%" },
  ] as RevenueConcentrationRow[],

  categoryAffinity: [
    { category: "Skincare", score: 84 },
    { category: "Makeup", score: 75 },
    { category: "Haircare", score: 72 },
    { category: "Fragrance", score: 68 },
    { category: "Wellness", score: 61 },
  ] as CategoryAffinityItem[],

  crossSellOpportunities: [
    { opportunity: "Add Skincare to Makeup", customers: "5,812" },
    { opportunity: "Add Fragrance to Skincare", customers: "4,692" },
    { opportunity: "Add Wellness to Beauty", customers: "3,732" },
    { opportunity: "Upgrade to Premium Line", customers: "2,915" },
    { opportunity: "Subscribe to Auto-Replenish", customers: "2,118" },
  ] as CrossSellOpportunityRow[],

  geoPreference: [
    { geography: "Western Province", customers: "12,480", primaryChannel: "App" },
    { geography: "Central Region", customers: "6,210", primaryChannel: "Web" },
    { geography: "Southern Region", customers: "4,982", primaryChannel: "App" },
    { geography: "Northern Region", customers: "2,875", primaryChannel: "Web" },
    { geography: "Eastern Region", customers: "1,869", primaryChannel: "App" },
  ] as GeoPreferenceRow[],

  supportImpact: [
    { metric: "Tickets per 1K Customers", value: "23.6", vsPrior: "- 6.1%", isPositive: true },
    { metric: "First Response Time", value: "18.4h", vsPrior: "- 4.7%", isPositive: true },
    { metric: "Resolution Time (Days)", value: "2.2", vsPrior: "- 0.3", isPositive: true },
    { metric: "CSAT Score", value: "92%", vsPrior: "+ 2pp", isPositive: true },
    { metric: "Resolved on First Contact", value: "76%", vsPrior: "+ 1pp", isPositive: true },
  ] as CustomerSupportMetricRow[],

  returnsRefundBehavior: [
    { metric: "Return Rate", value: "3.1%", vsPrior: "- 0.2pp", isPositive: true },
    { metric: "Refund Rate", value: "2.4%", vsPrior: "- 0.1pp", isPositive: true },
    { metric: "Avg Refund Value (LKR)", value: "2,140", vsPrior: "- 1.8%", isPositive: true },
    { metric: "Return Reasons (Top)", value: "Size, Quality, Changed Mind", vsPrior: "-" },
    { metric: "Refund Methods (Top)", value: "Wallet, Card, Bank Transfer", vsPrior: "-" },
  ],

  dormancyReactivation: [
    { metric: "Dormant (>90 Days)", value: "3,276", vsPrior: "- 5.8%", isPositive: true },
    { metric: "Reactivated (30D)", value: "742", vsPrior: "+ 12.4%", isPositive: true },
    { metric: "Reactivation Rate", value: "22.7%", vsPrior: "+ 2.8pp", isPositive: true },
    { metric: "Dormant Revenue (LKR)", value: "24.8M", vsPrior: "- 3.2%", isPositive: true },
  ],

  customerExceptions: [
    { customerID: "CUST-01243", customerName: "N. Silva", segment: "VIP", riskLevel: "High", clvPred: "62,100", lastOrderDate: "Apr 18, 2026", daysSinceOrder: 13, churnRisk: 88, loyaltyTier: "Gold", totalRevenue: "231,000", orders: 10, aov: "23,100", supportTickets: 1, npsScore: 9.2, region: "Western Prov.", channel: "App", status: "At Risk" },
    { customerID: "CUST-00921", customerName: "A. Perera", segment: "VIP", riskLevel: "High", clvPred: "78,500", lastOrderDate: "Apr 20, 2026", daysSinceOrder: 11, churnRisk: 92, loyaltyTier: "Platinum", totalRevenue: "248,000", orders: 12, aov: "20,667", supportTickets: 1, npsScore: 9.6, region: "Western Prov.", channel: "App", status: "At Risk" },
    { customerID: "CUST-00776", customerName: "M. Fernando", segment: "Loyal", riskLevel: "Medium", clvPred: "54,800", lastOrderDate: "Apr 15, 2026", daysSinceOrder: 16, churnRisk: 85, loyaltyTier: "Gold", totalRevenue: "189,500", orders: 9, aov: "21,056", supportTickets: 2, npsScore: 8.7, region: "Central Region", channel: "Web", status: "At Risk" },
    { customerID: "CUST-00251", customerName: "S. Jayawardena", segment: "Core", riskLevel: "Medium", clvPred: "41,000", lastOrderDate: "Apr 10, 2026", daysSinceOrder: 21, churnRisk: 82, loyaltyTier: "Silver", totalRevenue: "112,000", orders: 6, aov: "18,667", supportTickets: 1, npsScore: 8.1, region: "Southern Region", channel: "Web", status: "At Risk" },
    { customerID: "CUST-01832", customerName: "R. De Silva", segment: "At Risk", riskLevel: "High", clvPred: "46,200", lastOrderDate: "Apr 12, 2026", daysSinceOrder: 19, churnRisk: 84, loyaltyTier: "Silver", totalRevenue: "98,600", orders: 5, aov: "19,720", supportTickets: 3, npsScore: 7.2, region: "Central Region", channel: "Web", status: "At Risk" },
  ] as CustomerExceptionRow[],

  forecastVsTarget: [
    { metric: "Active Customers", actual: "28,416", forecast: "28,100", target: "27,500", vsTarget: "+ 3.3%", isPositive: true },
    { metric: "Revenue (LKR)", actual: "585.5M", forecast: "572.0M", target: "565.0M", vsTarget: "+ 3.6%", isPositive: true },
    { metric: "Avg Predicted CLV (LKR)", actual: "28,400", forecast: "27,100", target: "26,500", vsTarget: "+ 7.2%", isPositive: true },
    { metric: "Repeat Purchase Rate", actual: "34.5%", forecast: "33.0%", target: "32.0%", vsTarget: "+ 2.5pp", isPositive: true },
    { metric: "Churn Rate (30D)", actual: "2.8%", forecast: "2.9%", target: "3.0%", vsTarget: "- 0.2pp", isPositive: true },
  ] as ForecastVsTargetRow[],

  priorityInsights: [
    { id: "i1", insight: "High churn risk in At-Risk segment", impact: "High" },
    { id: "i2", insight: "VIP segment driving revenue growth", impact: "High" },
    { id: "i3", insight: "Organic search delivering best CLV/CAC", impact: "High" },
    { id: "i4", insight: "Dormant base decreasing with reactivation lift", impact: "Medium" },
    { id: "i5", insight: "Cross-sell opportunity in Skincare + Makeup", impact: "Medium" },
  ],

  actionsNextSteps: [
    "Generate Customer Analysis Report",
    "Review Churn Risks",
    "Review VIP Retention",
    "Review Dormant Customers",
    "Review CLV Decline",
    "Review Loyalty Performance",
    "Run Retention Forecast",
    "Open Customer Analysis Audit",
  ],

  healthRail: {
    healthScore: 96,
    label: "Very Good",
    summary: {
      customerCount: "28,416",
      customerGrowth: "+ 8.6%",
      retentionRate: "78.6%",
      retentionDelta: "+ 1.8pp",
      valueSummary: "LKR 28,400",
      valueDelta: "+ 6.0%",
      churnSummary: "2.8%",
      churnDelta: "+ 0.4pp",
      loyaltySummary: "14,562 Gold+ Members",
      loyaltyDelta: "+ 7.3%",
    },
    quickQueries: [
      { riskType: "Churn Risk", count: "2,846" },
      { riskType: "VIP Customers", count: "1,912" },
      { riskType: "High Value", count: "4,312" },
      { riskType: "Dormant Customers", count: "3,276" },
      { riskType: "Loyalty At Risk", count: "582" },
      { riskType: "High Return Behavior", count: "421" },
      { riskType: "Service Priority", count: "1,126" },
    ],
  } as CustomerHealthRailData,
};
