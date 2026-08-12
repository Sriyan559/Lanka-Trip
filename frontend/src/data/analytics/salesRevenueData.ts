import { KpiMetricData } from "./executivePerformanceData";

export interface SalesKpiMetric extends KpiMetricData {
  lyValue?: string;
}

export interface SalesTrendPoint {
  date: string;
  netRevenue: number;
  refunds: number;
  netRevenueLY: number;
  refundsLY: number;
}

export interface CommercialTargetRow {
  metric: string;
  actual: string;
  target: string;
  vsTarget: string;
  ly: string;
  vsLy: string;
  isPositive?: boolean;
}

export interface ChannelPerformanceRow {
  channel: string;
  netRevenue: string;
  vsLy: string;
  gmPercent: string;
  cmPercent: string;
  aov: string;
  orders: string;
}

export interface CategoryPerformanceRow {
  category: string;
  netRevenue: string;
  vsLy: string;
  gmPercent: string;
  cmPercent: string;
}

export interface CustomerSegmentRow {
  segment: string;
  netRevenue: string;
  vsLy: string;
  gmPercent: string;
  cmPercent: string;
}

export interface TopCustomerRow {
  customer: string;
  netRevenue: string;
  vsLy: string;
  gmPercent: string;
  orders: string;
}

export interface SupplierPerformanceRow {
  supplier: string;
  netRevenue: string;
  vsLy: string;
  fillRate: string;
  otif: string;
  gmPercent: string;
}

export interface PromotionPerformanceRow {
  promotionType: string;
  netRevenue: string;
  roi: string;
  liftPercent: string;
  cmImpact: string;
}

export interface ForecastAccuracyRow {
  metric: string;
  forecast: string;
  actual: string;
  accuracy: string;
  mape: string;
}

export interface RevenueLeakageRow {
  leakageType: string;
  amount: string;
  vsLy: string;
  percentRevenue: string;
}

export interface CommercialRiskQueryRow {
  riskType: string;
  count: number;
}

export interface ScatterPoint {
  id: string;
  netRevenue: number;
  gmPercent: number;
  category: "High Margin" | "Mid Margin" | "Low Margin";
}

export interface BubblePoint {
  id: string;
  volume: number;
  gmPercent: number;
  revenue: number;
  category: "High Volume" | "Mid Volume" | "Low Volume";
}

export interface PricePositioningItem {
  tier: string;
  priceVsMarket: string;
  skuPercent: number;
}

export interface CommercialInsightItem {
  text: string;
  category: string;
  priority: "High" | "Medium" | "Low";
}

export interface CommercialHealthRailData {
  healthScore: number;
  label: string;
  revenueSummary: {
    netRevenue: string;
    grossMargin: string;
    marginPercent: string;
  };
  growthVsLy: {
    revenue: string;
    grossMargin: string;
    orders: string;
    unitsSold: string;
    cmPercent: string;
  };
  marginSummary: {
    grossMargin: string;
    contributionMargin: string;
    discountImpact: string;
    opexImpact: string;
  };
  leakageSummary: {
    totalLeakage: string;
    leakagePercent: string;
    pricingErosion: string;
    stockOutLeakage: string;
  };
  quickQueries: CommercialRiskQueryRow[];
}

export const SALES_REVENUE_DATA = {
  headerMeta: {
    title: "Sales, Revenue, Margin & Commercial Analytics",
    subtitle:
      "End-to-end commercial performance across channels, categories, revenue, margin, promotions, leakage, and forecast accuracy to drive growth and protect margin.",
  },

  contextStrip: [
    { label: "Business", value: "SL Beauty", status: "normal" },
    { label: "Business Unit", value: "Beauty & Wellness", status: "normal" },
    { label: "Region", value: "All Regions", status: "normal" },
    { label: "Channel", value: "All Channels", status: "normal" },
    { label: "Customer Segment", value: "All Segments", status: "normal" },
    { label: "Category", value: "All Categories", status: "normal" },
    { label: "Order Source", value: "All Sources", status: "normal" },
    { label: "Operation Status", value: "Normal", status: "connected" },
    { label: "Operations Status", value: "Normal", status: "connected" },
    { label: "Financing Status", value: "Normal", status: "connected" },
    { label: "Marketing Status", value: "Normal", status: "connected" },
    { label: "Enablement Status", value: "Normal", status: "connected" },
    { label: "FX Rate", value: "1.00 GBP", status: "normal" },
    { label: "Weeks", value: "Rolling 52", status: "normal" },
    { label: "Data Currency", value: "GBP", status: "normal" },
    { label: "Last Refresh", value: "Jul 31, 2024 10:21 AM", status: "normal" },
    { label: "Range", value: "FY24 (W31)", status: "normal" },
  ],

  kpis: [
    {
      id: "gmv",
      number: "1.",
      title: "GMV",
      mainValue: "1.8B",
      trendPercentage: 7.2,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "LY: 1.68B",
      lyValue: "1.68B",
      sparklineData: [1.4, 1.45, 1.52, 1.6, 1.68, 1.74, 1.8],
    },
    {
      id: "net-revenue",
      number: "2.",
      title: "Net Revenue",
      mainValue: "1.6B",
      trendPercentage: 7.1,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "LY: 1.52B",
      lyValue: "1.52B",
      sparklineData: [1.3, 1.35, 1.42, 1.48, 1.52, 1.56, 1.6],
    },
    {
      id: "gross-margin",
      number: "3.",
      title: "Gross Margin",
      mainValue: "31.4%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 30.2%",
      lyValue: "30.2%",
      sparklineData: [29, 29.5, 30.0, 30.2, 30.8, 31.1, 31.4],
    },
    {
      id: "opex-percent",
      number: "4.",
      title: "Opex %",
      mainValue: "42.61%",
      trendPercentage: 0.3,
      trendDirection: "up",
      isPositive: false,
      trendSuffix: "pp",
      comparisonLabel: "LY: 42.31%",
      lyValue: "42.31%",
      sparklineData: [41.8, 42.0, 42.1, 42.31, 42.4, 42.5, 42.61],
    },
    {
      id: "sales-sold",
      number: "5.",
      title: "Sales Sold",
      mainValue: "842.1K",
      trendPercentage: 7.3,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "LY: 784.9K",
      lyValue: "784.9K",
      sparklineData: [720, 740, 760, 784.9, 800, 820, 842.1],
    },
    {
      id: "aov",
      number: "6.",
      title: "AOV",
      mainValue: "1.9K",
      trendPercentage: 1.5,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "LY: 1.87K",
      lyValue: "1.87K",
      sparklineData: [1.78, 1.8, 1.83, 1.87, 1.88, 1.89, 1.9],
    },
    {
      id: "discount-rate",
      number: "8.",
      title: "Discount Rate",
      mainValue: "5.5%",
      trendPercentage: -0.8,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 6.3%",
      lyValue: "6.3%",
      sparklineData: [6.8, 6.5, 6.3, 6.0, 5.8, 5.6, 5.5],
    },
    {
      id: "return-rate",
      number: "9.",
      title: "Return Rate",
      mainValue: "3.1%",
      trendPercentage: -0.3,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 3.4%",
      lyValue: "3.4%",
      sparklineData: [3.6, 3.5, 3.4, 3.3, 3.2, 3.15, 3.1],
    },
    {
      id: "refund-rate",
      number: "10.",
      title: "Refund Rate",
      mainValue: "4.2%",
      trendPercentage: -0.1,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 4.3%",
      lyValue: "4.3%",
      sparklineData: [4.6, 4.5, 4.3, 4.3, 4.25, 4.22, 4.2],
    },
    {
      id: "contribution-margin",
      number: "11.",
      title: "Contribution Margin",
      mainValue: "21.3%",
      trendPercentage: 0.8,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 20.5%",
      lyValue: "20.5%",
      sparklineData: [19.8, 20.0, 20.3, 20.5, 20.8, 21.0, 21.3],
    },
    {
      id: "revenue-leakage",
      number: "12.",
      title: "Revenue Leakage",
      mainValue: "1.6M",
      trendPercentage: -1.0,
      trendDirection: "down",
      isPositive: true,
      comparisonLabel: "LY: 1.58M",
      lyValue: "1.58M",
      sparklineData: [1.72, 1.68, 1.62, 1.58, 1.61, 1.6, 1.6],
    },
    {
      id: "target-attainment",
      number: "13.",
      title: "Target Attainment",
      mainValue: "96%",
      trendPercentage: 1.0,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 95%",
      lyValue: "95%",
      sparklineData: [92, 93, 94, 95, 95.5, 95.8, 96],
    },
    {
      id: "forecast-confidence",
      number: "14.",
      title: "Forecast Confidence",
      mainValue: "92%",
      trendPercentage: 2.0,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "LY: 90%",
      lyValue: "90%",
      sparklineData: [88, 89, 90, 90.5, 91, 91.5, 92],
    },
  ] as SalesKpiMetric[],

  commercialHealthScore: {
    score: 95,
    maxScore: 100,
    label: "Excellent",
  },

  tabs: [
    "Commercial Overview",
    "Revenue",
    "Margin",
    "Orders",
    "Categories",
    "Brands",
    "Channels",
    "Customers",
    "Promotions",
    "Pricing",
    "Geography",
    "Suppliers",
    "Inventory",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Tools",
  ],

  readinessStatus: [
    { label: "Overall", score: 98, status: "success" },
    { label: "Data Quality", score: 97, status: "success" },
    { label: "Forecast Quality", score: 93, status: "success" },
    { label: "Return Volatility", score: 92, status: "warning" },
    { label: "Price Health", score: 96, status: "success" },
    { label: "Pricing Compliance", score: 94, status: "success" },
    { label: "Stock Health", score: 93, status: "success" },
    { label: "Data Freshness", score: 98, status: "success" },
  ],

  salesReturnsTrend: [
    { date: "Aug 23", netRevenue: 120, refunds: 15, netRevenueLY: 110, refundsLY: 14 },
    { date: "Oct 23", netRevenue: 135, refunds: 18, netRevenueLY: 122, refundsLY: 16 },
    { date: "Dec 23", netRevenue: 160, refunds: 22, netRevenueLY: 145, refundsLY: 20 },
    { date: "Feb 24", netRevenue: 130, refunds: 16, netRevenueLY: 120, refundsLY: 15 },
    { date: "Apr 24", netRevenue: 142, refunds: 17, netRevenueLY: 132, refundsLY: 16 },
    { date: "Jun 24", netRevenue: 155, refunds: 19, netRevenueLY: 144, refundsLY: 18 },
    { date: "Jul 24", netRevenue: 160, refunds: 20, netRevenueLY: 152, refundsLY: 19 },
  ] as SalesTrendPoint[],

  revenueBridge: [
    { name: "Net Rev", value: 1520, displayValue: "1.52B", type: "base" },
    { name: "Volume", value: 172.4, displayValue: "+172M", type: "increase" },
    { name: "Price", value: -58.7, displayValue: "-59M", type: "decrease" },
    { name: "Discount", value: -33.4, displayValue: "-33M", type: "decrease" },
    { name: "Other", value: 18.9, displayValue: "+19M", type: "increase" },
    { name: "Net TY", value: 1600, displayValue: "1.60B", type: "total" },
  ],

  marginBridge: [
    { name: "GM LY", value: 309.5, displayValue: "310M", type: "base" },
    { name: "Gross", value: 48.1, displayValue: "+48M", type: "increase" },
    { name: "Discount", value: -24.7, displayValue: "-25M", type: "decrease" },
    { name: "Opex", value: -24.1, displayValue: "-24M", type: "decrease" },
    { name: "Other", value: 6.3, displayValue: "+6.3M", type: "increase" },
    { name: "GM TY", value: 353.6, displayValue: "354M", type: "total" },
  ],

  revenueTarget: [
    { metric: "Net Rev", actual: 1600, target: 1550 },
    { metric: "GM", actual: 353.6, target: 326.0 },
    { metric: "CM", actual: 233.6, target: 220.0 },
    { metric: "Opex", actual: 683.2, target: 680.0 },
  ],

  targetScorecard: [
    { metric: "Net Revenue", actual: "1.60B", target: "1.55B", vsTarget: "+3.2%", ly: "1.52B", vsLy: "+5.3%", isPositive: true },
    { metric: "Gross Margin", actual: "353.6M", target: "326.0M", vsTarget: "+7.8%", ly: "309.5M", vsLy: "+14.3%", isPositive: true },
    { metric: "Contribution Margin", actual: "233.6M", target: "220.0M", vsTarget: "+6.2%", ly: "212.5M", vsLy: "+9.9%", isPositive: true },
    { metric: "Opex", actual: "683.2M", target: "680.0M", vsTarget: "+0.5%", ly: "656.8M", vsLy: "+5.1%", isPositive: true },
    { metric: "CM %", actual: "21.3%", target: "20.0%", vsTarget: "+1.3pp", ly: "20.5%", vsLy: "+0.8pp", isPositive: true },
    { metric: "Return Rate", actual: "3.1%", target: "3.5%", vsTarget: "-0.4pp", ly: "3.3%", vsLy: "-0.2pp", isPositive: true },
    { metric: "Discount Rate", actual: "5.5%", target: "5.0%", vsTarget: "+0.5pp", ly: "4.7%", vsLy: "+0.8pp", isPositive: false },
    { metric: "Target Attainment", actual: "96%", target: "95%", vsTarget: "+1pp", ly: "95%", vsLy: "+1pp", isPositive: true },
  ] as CommercialTargetRow[],

  channelPerformance: [
    { channel: "DTC Website", netRevenue: "742.1M", vsLy: "+8.1%", gmPercent: "33.1%", cmPercent: "22.5%", aov: "2.0K", orders: "372.1K" },
    { channel: "Marketplace", netRevenue: "526.4M", vsLy: "+5.8%", gmPercent: "28.7%", cmPercent: "18.3%", aov: "1.7K", orders: "312.1K" },
    { channel: "Retail", netRevenue: "184.7M", vsLy: "+6.2%", gmPercent: "32.4%", cmPercent: "21.7%", aov: "2.3K", orders: "81.2K" },
    { channel: "Wholesale", netRevenue: "96.2M", vsLy: "+6.0%", gmPercent: "29.2%", cmPercent: "17.4%", aov: "2.1K", orders: "46.2K" },
    { channel: "Other", netRevenue: "50.6M", vsLy: "+4.0%", gmPercent: "27.5%", cmPercent: "16.1%", aov: "1.6K", orders: "30.5K" },
    { channel: "Total", netRevenue: "1.60B", vsLy: "+7.1%", gmPercent: "31.4%", cmPercent: "21.3%", aov: "1.9K", orders: "842.1K" },
  ] as ChannelPerformanceRow[],

  categoryPerformance: [
    { category: "Skincare", netRevenue: "561.2M", vsLy: "+7.9%", gmPercent: "32.5%", cmPercent: "22.1%" },
    { category: "Makeup", netRevenue: "397.1M", vsLy: "+6.6%", gmPercent: "31.0%", cmPercent: "20.6%" },
    { category: "Haircare", netRevenue: "261.3M", vsLy: "+6.0%", gmPercent: "30.2%", cmPercent: "20.0%" },
    { category: "Fragrance", netRevenue: "161.7M", vsLy: "+7.5%", gmPercent: "33.8%", cmPercent: "23.5%" },
    { category: "Wellness", netRevenue: "134.2M", vsLy: "+6.2%", gmPercent: "29.1%", cmPercent: "18.0%" },
    { category: "Total", netRevenue: "1.60B", vsLy: "+7.1%", gmPercent: "31.4%", cmPercent: "21.3%" },
  ] as CategoryPerformanceRow[],

  customerSegmentPerformance: [
    { segment: "Loyalty", netRevenue: "724.3M", vsLy: "+8.4%", gmPercent: "32.2%", cmPercent: "22.0%" },
    { segment: "Active", netRevenue: "438.6M", vsLy: "+6.5%", gmPercent: "30.7%", cmPercent: "20.4%" },
    { segment: "At Risk", netRevenue: "209.3M", vsLy: "+5.5%", gmPercent: "28.1%", cmPercent: "17.4%" },
    { segment: "New", netRevenue: "120.3M", vsLy: "+10.2%", gmPercent: "31.9%", cmPercent: "21.0%" },
    { segment: "Total", netRevenue: "1.60B", vsLy: "+7.1%", gmPercent: "31.4%", cmPercent: "21.3%" },
  ] as CustomerSegmentRow[],

  topCustomerPerformance: [
    { customer: "Boots UK", netRevenue: "62.4M", vsLy: "+6.2%", gmPercent: "31.5%", orders: "32.4K" },
    { customer: "John Lewis", netRevenue: "49.1M", vsLy: "+5.8%", gmPercent: "32.1%", orders: "24.1K" },
    { customer: "Superdrug", netRevenue: "38.2M", vsLy: "+4.2%", gmPercent: "29.9%", orders: "19.0K" },
    { customer: "Cult Beauty", netRevenue: "32.6M", vsLy: "+7.9%", gmPercent: "33.8%", orders: "18.1K" },
    { customer: "Feelunique", netRevenue: "28.5M", vsLy: "+6.1%", gmPercent: "30.5%", orders: "14.2K" },
    { customer: "Total", netRevenue: "210.8M", vsLy: "+6.1%", gmPercent: "31.3%", orders: "107.8K" },
  ] as TopCustomerRow[],

  supplierPerformance: [
    { supplier: "L'Oreal", netRevenue: "312.4M", vsLy: "+7.5%", fillRate: "98%", otif: "96%", gmPercent: "32.1%" },
    { supplier: "Estee Lauder", netRevenue: "210.6M", vsLy: "+6.2%", fillRate: "97%", otif: "94%", gmPercent: "31.4%" },
    { supplier: "Unilever", netRevenue: "164.5M", vsLy: "+3.8%", fillRate: "95%", otif: "93%", gmPercent: "30.8%" },
    { supplier: "Coty", netRevenue: "96.0M", vsLy: "+4.2%", fillRate: "96%", otif: "92%", gmPercent: "29.6%" },
    { supplier: "Shiseido", netRevenue: "72.5M", vsLy: "+4.0%", fillRate: "97%", otif: "95%", gmPercent: "31.7%" },
    { supplier: "Total", netRevenue: "856.0M", vsLy: "+6.5%", fillRate: "97%", otif: "95%", gmPercent: "31.3%" },
  ] as SupplierPerformanceRow[],

  promotionPerformance: [
    { promotionType: "Discount", netRevenue: "652.4M", roi: "2.4x", liftPercent: "+8.1%", cmImpact: "-24.3M" },
    { promotionType: "Bundle", netRevenue: "284.7M", roi: "3.1x", liftPercent: "+10.2%", cmImpact: "-9.6M" },
    { promotionType: "Gift With Purchase", netRevenue: "146.2M", roi: "2.8x", liftPercent: "+6.4%", cmImpact: "-4.2M" },
    { promotionType: "Free Shipping", netRevenue: "109.0M", roi: "1.9x", liftPercent: "+4.3%", cmImpact: "-6.1M" },
    { promotionType: "Total", netRevenue: "1.19B", roi: "2.5x", liftPercent: "+7.6%", cmImpact: "-44.2M" },
  ] as PromotionPerformanceRow[],

  forecastAccuracy: [
    { metric: "Net Revenue", forecast: "1.62B", actual: "1.60B", accuracy: "98.8%", mape: "3.2%" },
    { metric: "Gross Margin", forecast: "345.0M", actual: "353.6M", accuracy: "97.6%", mape: "4.1%" },
    { metric: "CM", forecast: "227.0M", actual: "233.6M", accuracy: "97.2%", mape: "3.9%" },
    { metric: "Orders", forecast: "832.0K", actual: "842.1K", accuracy: "98.8%", mape: "3.0%" },
    { metric: "AOV", forecast: "1.85K", actual: "1.90K", accuracy: "97.4%", mape: "3.5%" },
  ] as ForecastAccuracyRow[],

  revenueLeakage: [
    { leakageType: "Lost to OOS", amount: "642.1K", vsLy: "+6.3%", percentRevenue: "0.04%" },
    { leakageType: "Lost to Price", amount: "421.7K", vsLy: "+4.3%", percentRevenue: "0.03%" },
    { leakageType: "Lost to Competition", amount: "389.2K", vsLy: "+8.1%", percentRevenue: "0.02%" },
    { leakageType: "Leakage Total", amount: "1.45M", vsLy: "+6.3%", percentRevenue: "0.09%" },
  ] as RevenueLeakageRow[],

  commercialRisksQueries: [
    { riskType: "Margin at Risk (Low GM SKUs)", count: 7 },
    { riskType: "Price Underperformance", count: 3 },
    { riskType: "Discounts Leakage", count: 3 },
    { riskType: "Revenue Leakage Exceptions", count: 2 },
    { riskType: "Pending Negotiations", count: 1 },
    { riskType: "Supplier OTIF Risk", count: 1 },
    { riskType: "Forecast Risk", count: 2 },
  ] as CommercialRiskQueryRow[],

  scatterData: [
    { id: "S1", netRevenue: 80, gmPercent: 34, category: "High Margin" },
    { id: "S2", netRevenue: 120, gmPercent: 36, category: "High Margin" },
    { id: "S3", netRevenue: 150, gmPercent: 38, category: "High Margin" },
    { id: "S4", netRevenue: 220, gmPercent: 32, category: "High Margin" },
    { id: "S5", netRevenue: 260, gmPercent: 35, category: "High Margin" },
    { id: "S6", netRevenue: 100, gmPercent: 26, category: "Mid Margin" },
    { id: "S7", netRevenue: 140, gmPercent: 28, category: "Mid Margin" },
    { id: "S8", netRevenue: 180, gmPercent: 27, category: "Mid Margin" },
    { id: "S9", netRevenue: 240, gmPercent: 29, category: "Mid Margin" },
    { id: "S10", netRevenue: 300, gmPercent: 25, category: "Mid Margin" },
    { id: "S11", netRevenue: 50, gmPercent: 18, category: "Low Margin" },
    { id: "S12", netRevenue: 90, gmPercent: 21, category: "Low Margin" },
    { id: "S13", netRevenue: 130, gmPercent: 19, category: "Low Margin" },
    { id: "S14", netRevenue: 170, gmPercent: 22, category: "Low Margin" },
  ] as ScatterPoint[],

  bubbleData: [
    { id: "B1", volume: 150, gmPercent: 36, revenue: 240, category: "High Volume" },
    { id: "B2", volume: 120, gmPercent: 34, revenue: 190, category: "High Volume" },
    { id: "B3", volume: 90, gmPercent: 26, revenue: 140, category: "Mid Volume" },
    { id: "B4", volume: 70, gmPercent: 28, revenue: 110, category: "Mid Volume" },
    { id: "B5", volume: 40, gmPercent: 19, revenue: 60, category: "Low Volume" },
  ] as BubblePoint[],

  pricePositioning: [
    { tier: "Premium", priceVsMarket: "+15%", skuPercent: 26 },
    { tier: "Parity", priceVsMarket: "±5%", skuPercent: 41 },
    { tier: "Competitive", priceVsMarket: "-5% to -15%", skuPercent: 24 },
    { tier: "Below", priceVsMarket: "-15%", skuPercent: 7 },
  ] as PricePositioningItem[],

  commercialInsights: [
    { text: "Contribution Margin improved +0.8pp driven by price optimization.", category: "Margin", priority: "High" },
    { text: "Discount rate increased +0.8pp; monitor bundle ROI next cycle.", category: "Discount", priority: "Medium" },
    { text: "Revenue leakage up +6.3%; focus on OOS and price gaps.", category: "Leakage", priority: "High" },
    { text: "Skincare driving growth with +7.9% and strong CM of 22.1%.", category: "Category", priority: "High" },
    { text: "Forecast accuracy healthy at 98.8%; maintain trend.", category: "Forecast", priority: "Low" },
  ] as CommercialInsightItem[],

  insightBadges: { positive: 7, watch: 3, risk: 2 },

  commercialKpiSummary: [
    { label: "Commercial Health", value: "95" },
    { label: "Revenue Readiness", value: "98" },
    { label: "Review Margin Risks", value: "3" },
    { label: "Review Revenue Exceptions", value: "5" },
    { label: "Run Commercial Forecast", value: "2" },
  ],

  actionsNextSteps: [
    "Generate Commercial Report",
    "Review Revenue Exceptions",
    "Review Margin Risks",
    "Review Promotion Efficiency",
    "Verify Pricing & Discounts",
    "Run Commercial Forecast",
    "Open Commercial Audit",
  ],

  healthRail: {
    healthScore: 95,
    label: "Excellent",
    revenueSummary: {
      netRevenue: "1.60B",
      grossMargin: "353.6M",
      marginPercent: "21.3%",
    },
    growthVsLy: {
      revenue: "+7.1%",
      grossMargin: "+14.3%",
      orders: "+7.3%",
      unitsSold: "+7.2%",
      cmPercent: "+0.8pp",
    },
    marginSummary: {
      grossMargin: "31.4%",
      contributionMargin: "21.3%",
      discountImpact: "-5.6pp",
      opexImpact: "-9.1pp",
    },
    leakageSummary: {
      totalLeakage: "1.45M",
      leakagePercent: "0.09%",
      pricingErosion: "0.03%",
      stockOutLeakage: "0.04%",
    },
    quickQueries: [
      { riskType: "Margin at Risk", count: 7 },
      { riskType: "Discount Leakage", count: 3 },
      { riskType: "Revenue Leakage", count: 3 },
      { riskType: "Risky Promotions", count: 2 },
      { riskType: "Supplier OTIF Risk", count: 1 },
      { riskType: "Forecast Risk", count: 2 },
    ],
  } as CommercialHealthRailData,
};
