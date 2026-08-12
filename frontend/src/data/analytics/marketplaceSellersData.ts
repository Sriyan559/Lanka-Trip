import { KpiMetricData } from "./executivePerformanceData";

export interface MarketplaceKpi extends KpiMetricData {
  vsPreviousLabel?: string;
}

export interface FunnelStage {
  stage: string;
  count: string;
  percentage: string;
  color: string;
}

export interface SellerContributionRow {
  group: string;
  gmv: number;
  cumulativePercent: number;
}

export interface ChannelPerformanceRow {
  channel: string;
  gmv: string;
  orders: number;
  sellers: number;
  convPercent: string;
  aov: string;
  grossPercent: string;
  marginPercent: string;
  retentionPercent: string;
  growth: string;
  isPositive?: boolean;
}

export interface SellerPerformanceRow {
  seller: string;
  tier: string;
  gmv: string;
  netRevenue: string;
  orders: number;
  convPercent: string;
  aov: string;
  frRate: string;
  slaPercent: string;
  returnPercent: string;
  rating: number;
}

export interface SellerSegmentRow {
  segment: string;
  sellers: number;
  gmv: string;
  sharePercent: string;
  orders: number;
  returnPercent: string;
  growth: string;
  isPositive?: boolean;
}

export interface ListingPerformanceRow {
  listing: string;
  seller: string;
  category: string;
  views: number;
  ctr: number;
  addToCart: number;
  conv: number;
  gmv: string;
  returnPercent: string;
  stock: string;
  quality: string;
}

export interface ListingQualityRow {
  quality: string;
  listings: number;
  sharePercent: string;
}

export interface CategoryPerformanceRow {
  category: string;
  gmv: string;
  orders: number;
  marginPercent: string;
  returnPercent: string;
  growth: string;
  isPositive?: boolean;
}

export interface SellerEconomicsRow {
  segment: string;
  avgSalesComm: string;
  avgComm: string;
  netComm: string;
}

export interface CommissionAnalyticsRow {
  tier: string;
  sellerCount: number;
  gmv: string;
  costRate: number;
  grossComm: string;
  waived: string;
  netComm: string;
  effRate: string;
  exceptions: number;
}

export interface SellerProfitabilityPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  category: string;
}

export interface SellerFulfilmentRow {
  metric: string;
  rate: string;
  gmv: string;
  orders: number;
  vsPrior: string;
  isPositive?: boolean;
}

export interface PromotionPerformanceRow {
  metric: string;
  value: string;
}

export interface ExceptionRow {
  code: string;
  exception: string;
  sellerChannel: string;
  metric: string;
  expected: string;
  actual: string;
  variance: string;
  gmvExposure: string;
  severity: "High" | "Medium" | "Low";
  owner: string;
  status: string;
}

export interface ForecastVsTargetRow {
  metric: string;
  forecast: string;
  target: string;
  variance: string;
  attainment: string;
  isPositive?: boolean;
}

export interface MarketplaceHealthRailData {
  healthScore: number;
  label: string;
  marketplaceSummary: {
    gmv: string;
    gmvDelta: string;
    orders: string;
    ordersDelta: string;
    activeSellers: string;
    sellersDelta: string;
    activeListings: string;
    listingsDelta: string;
  };
  sellerSummary: {
    newSellers: string;
    newDelta: string;
    growingSellers: string;
    growingDelta: string;
    atRiskSellers: string;
    atRiskDelta: string;
    dormantSellers: string;
    dormantDelta: string;
    churnRate: string;
    churnDelta: string;
  };
  channelSummary: {
    topChannel: string;
    fastestGrowth: string;
    highestMargin: string;
    highestReturn: string;
  };
  sellerOperations: {
    fulfilmentSla: string;
    slaDelta: string;
    returnRate: string;
    returnDelta: string;
    cancellationRate: string;
    cancelDelta: string;
    qualityScore: string;
    qualityDelta: string;
  };
  riskSummary: {
    highRiskSellers: number;
    complianceWarnings: number;
    listingRisks: number;
    channelRisks: number;
    commissionExceptions: number;
  };
  quickQueues: {
    queueName: string;
    count: string;
  }[];
}

export const MARKETPLACE_SELLERS_DATA = {
  headerMeta: {
    title: "Marketplace, Seller & Channel Analytics",
    subtitle:
      "Analyze marketplace growth, seller contribution, channel performance, listing quality, seller economics, fulfilment, risk and marketplace health across the ecosystem.",
  },

  contextStrip: [
    { label: "Business Unit", value: "SL Beauty", status: "normal" },
    { label: "Reporting Period", value: "Last 30 Days", status: "normal" },
    { label: "Comparison Period", value: "Previous 30 Days", status: "normal" },
    { label: "Marketplace", value: "All Marketplaces", status: "normal" },
    { label: "Seller", value: "All Sellers", status: "normal" },
    { label: "Seller Tier", value: "All Tiers", status: "normal" },
    { label: "Region", value: "All Regions", status: "normal" },
    { label: "Category", value: "All Categories", status: "normal" },
    { label: "Channel", value: "All Channels", status: "normal" },
    { label: "Currency", value: "LKR", status: "normal" },
    { label: "Data Freshness", value: "May 31, 2026 10:15 AM", status: "success" },
  ],

  kpis: [
    {
      id: "mp-gmv",
      number: "1.",
      title: "Marketplace GMV",
      mainValue: "LKR 128.4M",
      trendPercentage: 8.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [110, 114, 118, 122, 124, 126, 128.4],
    },
    {
      id: "net-revenue",
      number: "2.",
      title: "Net Revenue",
      mainValue: "LKR 18.6M",
      trendPercentage: 7.2,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [16.0, 16.5, 17.0, 17.5, 18.0, 18.3, 18.6],
    },
    {
      id: "orders-count",
      number: "3.",
      title: "Orders",
      mainValue: "42,618",
      trendPercentage: 6.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [38000, 39000, 40000, 40800, 41500, 42000, 42618],
    },
    {
      id: "active-sellers",
      number: "4.",
      title: "Active Sellers",
      mainValue: "186",
      trendPercentage: 5.1,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [170, 172, 175, 178, 180, 183, 186],
    },
    {
      id: "new-sellers",
      number: "5.",
      title: "New Sellers",
      mainValue: "18",
      trendPercentage: 2.0,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [12, 13, 14, 15, 16, 17, 18],
    },
    {
      id: "active-listings",
      number: "6.",
      title: "Active Listings",
      mainValue: "18,420",
      trendPercentage: 4.8,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [16800, 17100, 17500, 17800, 18000, 18200, 18420],
    },
    {
      id: "seller-conversion",
      number: "7.",
      title: "Seller Conversion",
      mainValue: "4.8%",
      trendPercentage: 0.3,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8],
    },
    {
      id: "fulfilment-sla",
      number: "8.",
      title: "Fulfilment SLA",
      mainValue: "94.1%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [91.0, 91.8, 92.5, 93.0, 93.5, 93.8, 94.1],
    },
    {
      id: "seller-return-rate",
      number: "9.",
      title: "Seller Return Rate",
      mainValue: "4.3%",
      trendPercentage: -0.4,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [5.2, 5.0, 4.8, 4.6, 4.5, 4.4, 4.3],
    },
  ] as MarketplaceKpi[],

  analyticsHealthKpi: {
    score: 95,
    maxScore: 100,
    label: "Excellent",
    delta: "3 pts vs prev. period",
  },

  tabs: [
    "Marketplace Overview",
    "Sellers",
    "Channels",
    "Listings",
    "Categories",
    "Seller Economics",
    "Seller Growth",
    "Seller Cohorts",
    "Fulfilment",
    "Returns",
    "Promotions",
    "Customers",
    "Risk & Compliance",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  statusAlerts: [
    { label: "Healthy", count: 42, type: "success" },
    { label: "Seller Risk", count: 8, type: "danger" },
    { label: "Fulfilment Risk", count: 7, type: "danger" },
    { label: "Listing Quality", count: 5, type: "warning" },
    { label: "Compliance Warning", count: 4, type: "warning" },
    { label: "Commission Exception", count: 3, type: "warning" },
    { label: "Channel Risk", count: 4, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  marketplaceTrend: [
    { date: "Jul 10", gmv: 92, netRevenue: 13.2, orders: 31000, activeSellers: 165, conversion: 4.2 },
    { date: "Jul 17", gmv: 101, netRevenue: 14.5, orders: 34200, activeSellers: 170, conversion: 4.4 },
    { date: "Jul 24", gmv: 112, netRevenue: 16.1, orders: 37500, activeSellers: 174, conversion: 4.5 },
    { date: "Jul 31", gmv: 118, netRevenue: 17.0, orders: 39100, activeSellers: 179, conversion: 4.6 },
    { date: "Aug 07", gmv: 124, netRevenue: 17.9, orders: 41200, activeSellers: 182, conversion: 4.7 },
    { date: "Aug 14", gmv: 128.4, netRevenue: 18.6, orders: 42618, activeSellers: 186, conversion: 4.8 },
  ],

  marketplaceFunnel: [
    { stage: "Sessions", count: "1.34M", percentage: "100%", color: "#3b82f6" },
    { stage: "Listing Views", count: "432K", percentage: "32.1%", color: "#60a5fa" },
    { stage: "Product Detail Views", count: "138K", percentage: "10.3%", color: "#93c5fd" },
    { stage: "Add-to-Cart", count: "64K", percentage: "5.2%", color: "#cbd5e1" },
    { stage: "Checkout", count: "42K", percentage: "3.2%", color: "#94a3b8" },
    { stage: "Paid Orders", count: "35K", percentage: "2.8%", color: "#64748b" },
    { stage: "Completed Orders", count: "29K", percentage: "2.2%", color: "#800020" },
  ] as FunnelStage[],

  sellerContribution: [
    { group: "Top 5", gmv: 37.2, cumulativePercent: 29 },
    { group: "Top 10", gmv: 51.3, cumulativePercent: 40 },
    { group: "Top 20", gmv: 82.1, cumulativePercent: 64 },
    { group: "Top 50", gmv: 98.8, cumulativePercent: 77 },
    { group: "Remaining Sellers", gmv: 29.6, cumulativePercent: 100 },
  ] as SellerContributionRow[],

  channelPerformance: [
    { channel: "Web Marketplace", gmv: "54.4M", orders: 18442, sellers: 128, convPercent: "4.9%", aov: "2,950", grossPercent: "8.8%", marginPercent: "21.2%", retentionPercent: "4.1%", growth: "+ 8.0%", isPositive: true },
    { channel: "Mobile Marketplace", gmv: "31.8M", orders: 10604, sellers: 116, convPercent: "5.3%", aov: "2,872", grossPercent: "8.8%", marginPercent: "22.2%", retentionPercent: "6.1%", growth: "+ 10.1%", isPositive: true },
    { channel: "Social Commerce", gmv: "15.6M", orders: 4442, sellers: 46, convPercent: "6.1%", aov: "3,160", grossPercent: "9.0%", marginPercent: "19.8%", retentionPercent: "4.4%", growth: "+ 12.7%", isPositive: true },
    { channel: "B2B Wholesale", gmv: "9.6M", orders: 1422, sellers: 23, convPercent: "5.1%", aov: "2,511", grossPercent: "8.4%", marginPercent: "18.1%", retentionPercent: "2.7%", growth: "+ 6.1%", isPositive: true },
    { channel: "Partner Channel", gmv: "2.9M", orders: 584, sellers: 12, convPercent: "3.4%", aov: "4,249", grossPercent: "8.9%", marginPercent: "15.5%", retentionPercent: "5.1%", growth: "+ 7.8%", isPositive: true },
  ] as ChannelPerformanceRow[],

  sellerPerformance: [
    { seller: "Glow Essentials", tier: "Enterprise", gmv: "6.26M", netRevenue: "1.20M", orders: 2844, convPercent: "5.4%", aov: "2,200", frRate: "99.2%", slaPercent: "96.1%", returnPercent: "2.9%", rating: 4.8 },
    { seller: "Bella Skin Co.", tier: "Strategic", gmv: "4.4M", netRevenue: "964K", orders: 2118, convPercent: "4.9%", aov: "2,100", frRate: "99.1%", slaPercent: "95.4%", returnPercent: "3.1%", rating: 4.7 },
    { seller: "Pure Bloom Hub", tier: "Standard", gmv: "3.1M", netRevenue: "614K", orders: 1614, convPercent: "5.3%", aov: "2,580", frRate: "98.6%", slaPercent: "92.8%", returnPercent: "3.8%", rating: 4.5 },
    { seller: "Herbal Touch", tier: "Standard", gmv: "2.2M", netRevenue: "319K", orders: 1802, convPercent: "4.2%", aov: "2,754", frRate: "93.0%", slaPercent: "90.1%", returnPercent: "4.0%", rating: 4.0 },
    { seller: "Luxe Cosmetics", tier: "New", gmv: "1.9M", netRevenue: "579K", orders: 484, convPercent: "5.1%", aov: "2,440", frRate: "90.2%", slaPercent: "89.9%", returnPercent: "4.3%", rating: 3.8 },
    { seller: "Fresh Finds", tier: "At Risk", gmv: "1.8M", netRevenue: "92K", orders: 312, convPercent: "2.6%", aov: "2,187", frRate: "90.0%", slaPercent: "85.9%", returnPercent: "6.0%", rating: 3.2 },
    { seller: "Beauty Bazaar", tier: "Dormant", gmv: "182K", netRevenue: "22K", orders: 78, convPercent: "1.2%", aov: "2,333", frRate: "70.1%", slaPercent: "72.2%", returnPercent: "8.4%", rating: 3.0 },
  ] as SellerPerformanceRow[],

  sellerSegmentPerformance: [
    { segment: "Enterprise", sellers: 12, gmv: "32.4M", sharePercent: "25.2%", orders: 11426, returnPercent: "3.1%", growth: "+ 11.2%", isPositive: true },
    { segment: "Strategic", sellers: 28, gmv: "24.7M", sharePercent: "19.1%", orders: 4302, returnPercent: "3.7%", growth: "+ 7.5%", isPositive: true },
    { segment: "Growth", sellers: 54, gmv: "20.1M", sharePercent: "15.6%", orders: 6889, returnPercent: "4.1%", growth: "+ 6.0%", isPositive: true },
    { segment: "Standard", sellers: 72, gmv: "18.4M", sharePercent: "14.3%", orders: 6273, returnPercent: "4.3%", growth: "+ 4.8%", isPositive: true },
    { segment: "New", sellers: 142, gmv: "12.6M", sharePercent: "9.8%", orders: 2351, returnPercent: "4.9%", growth: "+ 3.4%", isPositive: true },
    { segment: "At Risk", sellers: 8, gmv: "1.4M", sharePercent: "1.1%", orders: 362, returnPercent: "6.2%", growth: "- 10.8%", isPositive: false },
    { segment: "Dormant", sellers: 14, gmv: "1.9M", sharePercent: "1.5%", orders: 56, returnPercent: "8.7%", growth: "- 12.3%", isPositive: false },
  ] as SellerSegmentRow[],

  sellerCohorts: [
    { cohort: "< 3M", m0: 100, m1: 42, m2: 34, m3: 26, m4: 20, m5: 16 },
    { cohort: "3-6M", m0: 100, m1: 58, m2: 46, m3: 38, m4: 30, m5: 24 },
    { cohort: "6-12M", m0: 100, m1: 72, m2: 62, m3: 54, m4: 46, m5: 38 },
    { cohort: "12-24M", m0: 100, m1: 84, m2: 76, m3: 68, m4: 60, m5: 52 },
    { cohort: "24M+", m0: 100, m1: 94, m2: 88, m3: 82, m4: 76, m5: 70 },
  ],

  listingPerformance: [
    { listing: "Hydrating Moisturizer", seller: "Bella Skin Co.", category: "Skincare", views: 124532, ctr: 4.2, addToCart: 3.8, conv: 2.3, gmv: "1.21M", returnPercent: "2.1%", stock: "In Stock", quality: "High" },
    { listing: "Glow Serum 30ml", seller: "Glow Essentials", category: "Skincare", views: 98721, ctr: 3.9, addToCart: 3.2, conv: 2.6, gmv: "904K", returnPercent: "2.6%", stock: "In Stock", quality: "High" },
    { listing: "Herbal Hair Oil", seller: "Pure Bloom Hub", category: "Hair Care", views: 78974, ctr: 4.0, addToCart: 2.4, conv: 2.1, gmv: "714K", returnPercent: "2.8%", stock: "In Stock", quality: "Good" },
    { listing: "Matte Lipstick", seller: "Luxe Cosmetics", category: "Makeup", views: 54587, ctr: 3.3, addToCart: 2.4, conv: 1.8, gmv: "512K", returnPercent: "3.1%", stock: "Low Stock", quality: "Needs Attn" },
  ] as ListingPerformanceRow[],

  listingQuality: [
    { quality: "High Quality", listings: 12842, sharePercent: "69.7%" },
    { quality: "Needs Attention", listings: 3102, sharePercent: "16.8%" },
    { quality: "Incomplete", listings: 1442, sharePercent: "7.9%" },
    { quality: "Policy Warnings", listings: 461, sharePercent: "2.5%" },
    { quality: "Suppressed", listings: 393, sharePercent: "2.1%" },
  ] as ListingQualityRow[],

  categoryPerformance: [
    { category: "Skincare", gmv: "36.2M", orders: 10402, marginPercent: "23.1%", returnPercent: "3.1%", growth: "+ 11.4%", isPositive: true },
    { category: "Makeup", gmv: "31.1M", orders: 10632, marginPercent: "21.0%", returnPercent: "4.3%", growth: "+ 8.2%", isPositive: true },
    { category: "Fragrance", gmv: "5.63M", orders: 2035, marginPercent: "20.0%", returnPercent: "4.7%", growth: "+ 7.8%", isPositive: true },
    { category: "Haircare", gmv: "18.6M", orders: 5846, marginPercent: "18.0%", returnPercent: "5.3%", growth: "+ 5.9%", isPositive: true },
    { category: "Wellness", gmv: "7.1M", orders: 2054, marginPercent: "16.4%", returnPercent: "4.9%", growth: "+ 2.8%", isPositive: true },
    { category: "Personal Care", gmv: "6.8M", orders: 1366, marginPercent: "16.1%", returnPercent: "6.2%", growth: "+ 4.3%", isPositive: true },
  ] as CategoryPerformanceRow[],

  sellerEconomics: [
    { segment: "Top Quintile", avgSalesComm: "9.8%", avgComm: "8.1%", netComm: "21.1%" },
    { segment: "Middle Quintile", avgSalesComm: "6.2%", avgComm: "8.2%", netComm: "16.6%" },
    { segment: "Bottom Quintile", avgSalesComm: "3.6%", avgComm: "12.4%", netComm: "8.3%" },
  ] as SellerEconomicsRow[],

  commissionAnalytics: [
    { tier: "Standard", sellerCount: 112, gmv: "48.1M", costRate: 7.0, grossComm: "3.41M", waived: "112K", netComm: "3.30M", effRate: "6.4%", exceptions: 1 },
    { tier: "Premium", sellerCount: 28, gmv: "28.6M", costRate: 9.0, grossComm: "2.35M", waived: "138K", netComm: "1.66M", effRate: "6.1%", exceptions: 0 },
    { tier: "Strategic", sellerCount: 22, gmv: "19.6M", costRate: 6.5, grossComm: "1.27M", waived: "72K", netComm: "1.21M", effRate: "6.1%", exceptions: 0 },
    { tier: "New Seller", sellerCount: 18, gmv: "9.4M", costRate: 5.0, grossComm: "384K", waived: "42K", netComm: "342K", effRate: "3.6%", exceptions: 2 },
  ] as CommissionAnalyticsRow[],

  sellerProfitabilityMatrix: [
    { x: 12, y: 28, z: 400, name: "Glow Essentials", category: "Strategic Stars" },
    { x: 18, y: 24, z: 300, name: "Bella Skin Co.", category: "Strategic Stars" },
    { x: 25, y: 19, z: 250, name: "Pure Bloom Hub", category: "High Contribution" },
    { x: 34, y: 15, z: 180, name: "Herbal Touch", category: "High Volume" },
    { x: 42, y: 12, z: 120, name: "Luxe Cosmetics", category: "Growth Potential" },
  ] as SellerProfitabilityPoint[],

  sellerFulfilment: [
    { metric: "On-Time Delivery", rate: "96.1%", gmv: "11.456", orders: 3.1, vsPrior: "+ 1.1pp", isPositive: true },
    { metric: "Fulfilment Rate", rate: "93.2%", gmv: "10,632", orders: 2.6, vsPrior: "+ 1.5pp", isPositive: true },
    { metric: "Return Rate", rate: "4.3%", gmv: "482", orders: 4.3, vsPrior: "- 0.4pp", isPositive: true },
    { metric: "Cancellation Rate", rate: "1.9%", gmv: "1,126", orders: 1.9, vsPrior: "- 0.2pp", isPositive: true },
  ] as SellerFulfilmentRow[],

  sellerInsights: [
    "Skincare category driving 45% of GMV growth.",
    "Mobile app conversion improved by 0.8pp.",
    "Late seller activity leads to SLA decline.",
    "Listing quality issues impacting 2.4% GMV.",
    "Commission waivers increased 18% vs target.",
    "Forecasted GMV ahead of target by 1.7%.",
  ],

  returnsRefunds: [
    { metric: "Return Rate", value: "4.3%", vsPrior: "- 0.4pp", isPositive: true },
    { metric: "Refund Rate", value: "2.1%", vsPrior: "- 0.3pp", isPositive: true },
    { metric: "Seller Fault Rate", value: "2.3%", vsPrior: "- 0.1pp", isPositive: true },
    { metric: "Avg Rating", value: "4.2 / 5", vsPrior: "+ 0.1", isPositive: true },
    { metric: "Dispute Rate", value: "0.7%", vsPrior: "- 0.1pp", isPositive: true },
    { metric: "Repeat Purchase", value: "32.6%", vsPrior: "+ 0.8pp", isPositive: true },
  ],

  promotionsPerformance: [
    { metric: "Promoting Sellers", value: "64" },
    { metric: "Promo Spend (LKR)", value: "6.2M" },
    { metric: "Discount GMV", value: "812K" },
    { metric: "Conv. Lift", value: "12.4%" },
    { metric: "ROI", value: "6.8x" },
  ] as PromotionPerformanceRow[],

  inventoryHealth: [
    { metric: "Active Listings", value: "18,420" },
    { metric: "Low Stock", value: "1,842" },
    { metric: "Out of Stock", value: "684" },
    { metric: "Toxic Stock", value: "312" },
    { metric: "Availability %", value: "97.2%" },
  ],

  sellerRisk: [
    { metric: "High Return Escalations", count: 14 },
    { metric: "SLA Breaches", count: 16 },
    { metric: "Cancel Risk", count: 11 },
    { metric: "Listing Quality Issues", count: 15 },
    { metric: "Compliance Gaps", count: 5 },
  ],

  sellerCompliance: [
    { metric: "Verified Sellers", count: 146 },
    { metric: "Pending Review", count: 18 },
    { metric: "Policy Violations", count: 7 },
    { metric: "Authenticity Flags", count: 5 },
    { metric: "Restricted Listings", count: 3 },
  ],

  exceptionsCenter: [
    { code: "EXCP-1021", exception: "High Return Spike", sellerChannel: "Beauty Bazaar", metric: "Return Rate", expected: "<= 3%", actual: "7.2%", variance: "+4.2pp", gmvExposure: "182K", severity: "High", owner: "Priya M.", status: "Open" },
    { code: "EXCP-1022", exception: "SLA Breach", sellerChannel: "Glow Essentials", metric: "SLA %", expected: ">= 95%", actual: "90.1%", variance: "-4.9pp", gmvExposure: "96K", severity: "High", owner: "Rahul R.", status: "Open" },
    { code: "EXCP-1023", exception: "Listing Quality Issue", sellerChannel: "Pure Bloom Hub", metric: "Listing Quality", expected: ">= 88%", actual: "68.3%", variance: "-19.7pp", gmvExposure: "46K", severity: "Medium", owner: "Nimal D.", status: "Investigating" },
    { code: "EXCP-1024", exception: "Price Deviation", sellerChannel: "Herbal Touch", metric: "Price Deviation", expected: "<= 5%", actual: "9.4%", variance: "+4.4pp", gmvExposure: "240K", severity: "Medium", owner: "Manesh R.", status: "Open" },
    { code: "EXCP-1025", exception: "Commission Dispute", sellerChannel: "Luxe Cosmetics", metric: "Commission %", expected: ">= 8%", actual: "8.5%", variance: "+0.5pp", gmvExposure: "64K", severity: "Low", owner: "Sanjeev D.", status: "Monitoring" },
  ] as ExceptionRow[],

  forecastSnapshot: [
    { label: "GMV Forecast", value: "152.6M", delta: "+ 9.2%" },
    { label: "Active Sellers", value: "198", delta: "+ 6.2%" },
    { label: "Orders", value: "51,230", delta: "+ 7.1%" },
    { label: "Listings", value: "19,850", delta: "+ 8.1%" },
    { label: "Conversion", value: "4.9%", delta: "+ 0.2pp" },
    { label: "Fulfilment SLA", value: "94.5%", delta: "+ 0.5pp" },
    { label: "Return Rate", value: "4.2%", delta: "- 0.1pp" },
    { label: "Comm. Revenue", value: "1.2M", delta: "+ 6.4%" },
  ],

  forecastVsTarget: [
    { metric: "GMV", forecast: "152.4M", target: "150.0M", variance: "2.4M", attainment: "101.6%", isPositive: true },
    { metric: "Orders", forecast: "51,230", target: "50,000", variance: "1,230", attainment: "102.5%", isPositive: true },
    { metric: "Conversion", forecast: "4.9%", target: "4.5%", variance: "+0.4pp", attainment: "108.9%", isPositive: true },
    { metric: "Fulfilment SLA", forecast: "94.5%", target: "95.0%", variance: "-0.5pp", attainment: "99.5%", isPositive: false },
    { metric: "Return Rate", forecast: "4.2%", target: "4.0%", variance: "-0.2pp", attainment: "95.0%", isPositive: true },
  ] as ForecastVsTargetRow[],

  priorityInsights: [
    { id: "pi1", insight: "High churn risk in At-Risk segment", impact: "High" },
    { id: "pi2", insight: "VIP segment driving revenue growth", impact: "High" },
    { id: "pi3", insight: "Organic search delivering best CLV/CAC", impact: "High" },
    { id: "pi4", insight: "Dormant base decreasing with reactivation lift", impact: "Medium" },
    { id: "pi5", insight: "Gross sell opportunity in Skincare + Makeup", impact: "Medium" },
  ],

  actionsNextSteps: [
    "Generate Marketplace Report",
    "Review Seller Risks",
    "Compare Channels",
    "Run Seller Forecast",
    "Review Listing Quality",
    "Review Commission Exceptions",
    "Review Seller Compliance",
    "Open Marketplace Analytics Audit",
  ],

  healthRail: {
    healthScore: 95,
    label: "Excellent",
    marketplaceSummary: {
      gmv: "128.4M",
      gmvDelta: "+ 8.4%",
      orders: "42,618",
      ordersDelta: "+ 6.4%",
      activeSellers: "186",
      sellersDelta: "+ 5.1%",
      activeListings: "18,420",
      listingsDelta: "+ 4.8%",
    },
    sellerSummary: {
      newSellers: "18",
      newDelta: "+ 2.0%",
      growingSellers: "64",
      growingDelta: "+ 6.1%",
      atRiskSellers: "23",
      atRiskDelta: "+ 4.3%",
      dormantSellers: "18",
      dormantDelta: "- 11.6%",
      churnRate: "1.8%",
      churnDelta: "- 0.3pp",
    },
    channelSummary: {
      topChannel: "Web Marketplace",
      fastestGrowth: "Social Commerce + 12.7%",
      highestMargin: "Mobile Marketplace 22.2%",
      highestReturn: "B2B Marketplace 3.7%",
    },
    sellerOperations: {
      fulfilmentSla: "94.1%",
      slaDelta: "+ 1.2pp",
      returnRate: "4.3%",
      returnDelta: "- 0.4pp",
      cancellationRate: "1.2%",
      cancelDelta: "- 0.7pp",
      qualityScore: "3.8",
      qualityDelta: "+ 0.1",
    },
    riskSummary: {
      highRiskSellers: 23,
      complianceWarnings: 7,
      listingRisks: 14,
      channelRisks: 6,
      commissionExceptions: 3,
    },
    quickQueues: [
      { queueName: "Seller SLA Risk", count: "17" },
      { queueName: "High Return Sellers", count: "14" },
      { queueName: "Listing Quality Issues", count: "21" },
      { queueName: "Compliance Warnings", count: "7" },
      { queueName: "Commission Exceptions", count: "3" },
      { queueName: "Channel Conversion Risk", count: "6" },
      { queueName: "Seller Churn Risk", count: "12" },
      { queueName: "Data Warnings", count: "9" },
    ],
  } as MarketplaceHealthRailData,
};
