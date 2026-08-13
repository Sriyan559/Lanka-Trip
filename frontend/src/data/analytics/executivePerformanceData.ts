export interface KpiMetricData {
  id: string;
  number: string;
  title: string;
  unit?: string;
  mainValue: string;
  trendPercentage: number;
  trendDirection: "up" | "down" | "flat";
  isPositive: boolean;
  trendSuffix?: string;
  comparisonLabel: string;
  sparklineData: number[];
  sparklineColor?: string;
  secondaryMetric?: {
    label: string;
    value: string;
    trendPercentage?: number;
    isPositive?: boolean;
    trendDirection?: "up" | "down";
    trendSuffix?: string;
    sparklineData?: number[];
  };
}

export interface StrategicScorecardRow {
  pillar: string;
  score: string;
  vsTarget: string;
  vsPrior: string;
  trend: number[];
  weight: string;
  scoreWeighted: string;
}

export interface ExecutiveTrendPoint {
  date: string;
  netRevenue: number;
  grossMargin: number;
  orders: number;
  activeCustomers: number;
  nps: number;
}

export interface RevenueProfitComparison {
  metric: string;
  actual: number;
  actualFormatted: string;
  target: number;
  targetFormatted: string;
  growthFormatted: string;
}

export interface WaterfallStepData {
  name: string;
  value: number;
  displayValue: string;
  type: "base" | "increase" | "decrease" | "total";
}

export interface GenericTableRow {
  metric: string;
  actual: string;
  vsCompare: string;
  isPositive?: boolean;
}

export interface ForecastSnapshotRow {
  metric: string;
  forecast: string;
  vsPriorForecast: string;
  confidence: string;
}

export interface ForecastTrendPoint {
  date: string;
  forecast: number;
  target: number;
  actual: number;
}

export interface PriorityInsight {
  id: string;
  insight: string;
  impact: "High" | "Medium" | "Low";
}

export interface QuickAccessItemData {
  id: string;
  title: string;
  actionText: string;
  href?: string;
}

export interface PillarHealthItem {
  pillar: string;
  score: number;
  delta: string;
  isPositive: boolean;
}

export interface TargetSummaryRow {
  metric: string;
  forecast: string;
  vsTarget: string;
  isPositive: boolean;
}

export interface HealthRailData {
  overallScore: number;
  scoreLabel: string;
  deltaText: string;
  pillars: PillarHealthItem[];
  targets: TargetSummaryRow[];
  alerts: {
    highPriority: number;
    mediumPriority: number;
    watchlistItems: number;
    actionItemsDue: number;
  };
}

export const EXECUTIVE_PERFORMANCE_DATA = {
  headerMeta: {
    title: "Executive Performance & Enterprise KPI Analytics",
    asOf: "Jul 24, 2026 10:15 AM SGT",
    comparison: "prior MoM",
    currency: "LKR / USD",
  },

  contextStrip: [
    { label: "Business Unit", value: "SL Beauty", status: "normal" },
    { label: "Reporting Methodology", value: "Beauty Marketplace", status: "normal" },
    { label: "Data Consolidation", value: "All Business Units", status: "normal" },
    { label: "Region", value: "All Regions", status: "normal" },
    { label: "Sales Channel", value: "All Channels", status: "normal" },
    { label: "Ecommerce Site", value: "Enterprise Wide", status: "normal" },
    { label: "Doc Source", value: "Connected", status: "connected" },
    { label: "Order Source", value: "Connected", status: "connected" },
    { label: "Customer Source", value: "Connected", status: "connected" },
    { label: "Marketing Source", value: "Connected", status: "connected" },
    { label: "Logistics Source", value: "Connected", status: "connected" },
    { label: "Supplier Source", value: "Industry", status: "normal" },
    { label: "Data Completeness", value: "99%", status: "success" },
    { label: "Last Data Refresh", value: "Jul 24, 2026 10:15 AM", status: "normal" },
    { label: "Scope", value: "Executive Analytics Scope", status: "normal" },
  ],

  kpis: [
    {
      id: "net-revenue",
      number: "1.",
      title: "Net Revenue (LKR)",
      unit: "(LKR)",
      mainValue: "LKR 116.8M",
      trendPercentage: 12.4,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs. Previous 30 Days",
      sparklineData: [85, 88, 92, 90, 98, 105, 112, 116.8],
      secondaryMetric: {
        label: "ROAS",
        value: "3.76x",
        trendPercentage: 6.7,
        isPositive: true,
        trendDirection: "up",
        sparklineData: [3.1, 3.2, 3.3, 3.4, 3.5, 3.65, 3.76],
      },
    },
    {
      id: "gross-margin",
      number: "2.",
      title: "Gross Margin (LKR) (%)",
      unit: "(#)",
      mainValue: "31.4%",
      trendPercentage: 4.1,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs. Previous 30 Days",
      sparklineData: [28, 29, 29.5, 30.1, 30.8, 31.0, 31.4],
      secondaryMetric: {
        label: "Margin (LKR)",
        value: "94.2M",
        trendPercentage: 1.8,
        isPositive: false,
        trendDirection: "down",
        sparklineData: [98, 97, 96, 95.5, 95, 94.6, 94.2],
      },
    },
    {
      id: "orders",
      number: "3.",
      title: "Orders (#)",
      unit: "(#)",
      mainValue: "62,618",
      trendPercentage: 10.8,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs. Previous 30 Days",
      sparklineData: [50, 52, 55, 54, 58, 60, 62.6],
      secondaryMetric: {
        label: "AOV",
        value: "$27.6",
        trendPercentage: 2.6,
        isPositive: true,
        trendDirection: "up",
        sparklineData: [25.8, 26.1, 26.5, 26.8, 27.0, 27.3, 27.6],
      },
    },
    {
      id: "active-customers",
      number: "4.",
      title: "Active Customers (#)",
      unit: "(#)",
      mainValue: "28,416",
      trendPercentage: 8.6,
      trendDirection: "up",
      isPositive: true,
      comparisonLabel: "vs. Previous 30 Days",
      sparklineData: [24, 25, 25.5, 26, 27, 27.8, 28.4],
      secondaryMetric: {
        label: "Repeat Rate",
        value: "36%",
        trendPercentage: 2.1,
        isPositive: true,
        trendDirection: "up",
        sparklineData: [33, 33.5, 34, 34.8, 35.2, 35.6, 36],
      },
    },
    {
      id: "csat-nps",
      number: "5.",
      title: "Customer Satisfaction (NPS) Score",
      unit: "Score",
      mainValue: "31.4%",
      trendPercentage: 3.9,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pts",
      comparisonLabel: "vs. Previous 30 Days",
      sparklineData: [25, 26, 27, 28.5, 29, 30.2, 31.4],
    },
  ] as KpiMetricData[],

  overallHealth: {
    score: 94,
    maxScore: 100,
    label: "Strong Performance",
    subtext: "3 pts vs. prior 30 days",
  },

  strategicScorecard: [
    {
      pillar: "Growth",
      score: "91.8%",
      vsTarget: "12.1%",
      vsPrior: "7.3%",
      trend: [75, 80, 84, 88, 91.8],
      weight: "25%",
      scoreWeighted: "22.9",
    },
    {
      pillar: "Profitability",
      score: "90.3%",
      vsTarget: "9.6%",
      vsPrior: "6.1%",
      trend: [80, 82, 86, 88, 90.3],
      weight: "20%",
      scoreWeighted: "18.1",
    },
    {
      pillar: "Customer",
      score: "88.7%",
      vsTarget: "6.3%",
      vsPrior: "4.8%",
      trend: [78, 81, 83, 85, 88.7],
      weight: "20%",
      scoreWeighted: "17.7",
    },
    {
      pillar: "Operational Excellence",
      score: "92.1%",
      vsTarget: "11.5%",
      vsPrior: "7.2%",
      trend: [82, 85, 87, 90, 92.1],
      weight: "15%",
      scoreWeighted: "13.8",
    },
    {
      pillar: "People & Culture",
      score: "87.6%",
      vsTarget: "5.8%",
      vsPrior: "3.9%",
      trend: [80, 82, 84, 86, 87.6],
      weight: "10%",
      scoreWeighted: "8.8",
    },
    {
      pillar: "Innovation",
      score: "82.4%",
      vsTarget: "3.2%",
      vsPrior: "2.1%",
      trend: [75, 77, 79, 80, 82.4],
      weight: "10%",
      scoreWeighted: "8.2",
    },
  ] as StrategicScorecardRow[],

  executiveTrend: [
    { date: "Jun 25", netRevenue: 68, grossMargin: 52, orders: 45, activeCustomers: 30, nps: 40 },
    { date: "Jun 30", netRevenue: 72, grossMargin: 55, orders: 48, activeCustomers: 32, nps: 42 },
    { date: "Jul 5", netRevenue: 78, grossMargin: 58, orders: 52, activeCustomers: 35, nps: 44 },
    { date: "Jul 10", netRevenue: 85, grossMargin: 62, orders: 56, activeCustomers: 38, nps: 46 },
    { date: "Jul 15", netRevenue: 82, grossMargin: 60, orders: 54, activeCustomers: 36, nps: 45 },
    { date: "Jul 20", netRevenue: 92, grossMargin: 66, orders: 60, activeCustomers: 40, nps: 48 },
    { date: "Jul 24", netRevenue: 98, grossMargin: 70, orders: 65, activeCustomers: 44, nps: 50 },
  ] as ExecutiveTrendPoint[],

  revenueProfit: [
    { metric: "Net Revenue", actual: 116.8, actualFormatted: "116.8M", target: 104.2, targetFormatted: "104.2M", growthFormatted: "+ 12.1%" },
    { metric: "Gross Profit", actual: 94.2, actualFormatted: "94.2M", target: 88.7, targetFormatted: "88.7M", growthFormatted: "+ 6.2%" },
  ] as RevenueProfitComparison[],

  revenueBridge: [
    { name: "Base Revenue", value: 104.2, displayValue: "104.2M", type: "base" },
    { name: "Price", value: 7.8, displayValue: "+7.8M", type: "increase" },
    { name: "Volume", value: 6.1, displayValue: "+6.1M", type: "increase" },
    { name: "Mix", value: -3.9, displayValue: "-3.9M", type: "decrease" },
    { name: "Discounts", value: -1.4, displayValue: "-1.4M", type: "decrease" },
    { name: "Net Revenue", value: 116.8, displayValue: "116.8M", type: "total" },
  ] as WaterfallStepData[],

  growthScorecard: [
    { metric: "Revenue Growth", actual: "12.4%", vsCompare: "+ 2.1pp", isPositive: true },
    { metric: "Order Growth", actual: "10.8%", vsCompare: "+ 1.7pp", isPositive: true },
    { metric: "Customer Growth", actual: "8.6%", vsCompare: "+ 1.3pp", isPositive: true },
    { metric: "New Customer Growth", actual: "15.2%", vsCompare: "+ 2.4pp", isPositive: true },
    { metric: "Active Customer Growth", actual: "9.1%", vsCompare: "+ 1.4pp", isPositive: true },
  ] as GenericTableRow[],

  customerHealth: [
    { metric: "Active Customers", actual: "28,416", vsCompare: "+ 8.6%", isPositive: true },
    { metric: "Repeat Purchase Rate", actual: "36%", vsCompare: "+ 2.1pp", isPositive: true },
    { metric: "Customer Retention (90D)", actual: "61.2%", vsCompare: "+ 2.4pp", isPositive: true },
    { metric: "NPS Score", actual: "31.4%", vsCompare: "+ 7.5pp", isPositive: true },
    { metric: "LTV (LKR)", actual: "24,820", vsCompare: "+ 5.7%", isPositive: true },
  ] as GenericTableRow[],

  commercialPerformance: [
    { metric: "Net Revenue", actual: "116.8M", vsCompare: "+ 12.1%", isPositive: true },
    { metric: "Gross Margin %", actual: "31.4%", vsCompare: "+ 4.1pp", isPositive: true },
    { metric: "GM (LKR)", actual: "94.2M", vsCompare: "+ 6.2%", isPositive: true },
    { metric: "Contribution Margin %", actual: "19.5%", vsCompare: "+ 2.3pp", isPositive: true },
    { metric: "CAC (LKR)", actual: "4,512", vsCompare: "+ 2.6%", isPositive: true },
  ] as GenericTableRow[],

  supplierHealth: [
    { metric: "On-Time In-Full", actual: "99%", vsCompare: "+ 2.6pp", isPositive: true },
    { metric: "Fill Rate", actual: "97%", vsCompare: "+ 1.9pp", isPositive: true },
    { metric: "Lead Time (Days)", actual: "3.2", vsCompare: "+ 0.4", isPositive: true },
    { metric: "Defect Rate", actual: "0.5%", vsCompare: "+ 0.1pp", isPositive: false },
    { metric: "Supplier Quality Score", actual: "87%", vsCompare: "+ 3.1pp", isPositive: true },
  ] as GenericTableRow[],

  inventoryOperations: [
    { metric: "Inventory Turnover", actual: "6.2x", vsCompare: "+ 0.6x", isPositive: true },
    { metric: "Days of Inventory", actual: "48", vsCompare: "+ 3.0", isPositive: true },
    { metric: "Stock Availability", actual: "96%", vsCompare: "+ 2.1pp", isPositive: true },
    { metric: "Order Fulfillment Rate", actual: "97%", vsCompare: "+ 1.5pp", isPositive: true },
    { metric: "Returns Rate", actual: "1.4%", vsCompare: "+ 0.2pp", isPositive: false },
  ] as GenericTableRow[],

  marketingEfficiency: [
    { metric: "Marketing Spend", actual: "22.6M", vsCompare: "+ 6.2%", isPositive: true },
    { metric: "Attributed Revenue", actual: "116.8M", vsCompare: "+ 12.1%", isPositive: true },
    { metric: "ROAS", actual: "3.76x", vsCompare: "+ 6.7%", isPositive: true },
    { metric: "CAC", actual: "4,512", vsCompare: "+ 2.6%", isPositive: true },
    { metric: "New Customers", actual: "6,128", vsCompare: "+ 10.2%", isPositive: true },
  ] as GenericTableRow[],

  financeCashHealth: [
    { metric: "Cash on Hand", actual: "32.4M", vsCompare: "+ 11.2%", isPositive: true },
    { metric: "Operating Cash Flow", actual: "18.7M", vsCompare: "+ 8.4%", isPositive: true },
    { metric: "AR Days", actual: "22", vsCompare: "+ 1", isPositive: true },
    { metric: "AP Days", actual: "36", vsCompare: "+ 2", isPositive: true },
    { metric: "Debt (Net)", actual: "12.6M", vsCompare: "+ 4.2%", isPositive: true },
  ] as GenericTableRow[],

  customerSupport: [
    { metric: "Tickets Resolved (30D)", actual: "2,356", vsCompare: "+ 5.1%", isPositive: true },
    { metric: "First Response Time", actual: "1.3h", vsCompare: "+ 0.7%", isPositive: true },
    { metric: "Resolution Time", actual: "18.6h", vsCompare: "+ 6.3%", isPositive: true },
    { metric: "CSAT Score", actual: "92%", vsCompare: "+ 2.6pp", isPositive: true },
    { metric: "Escalation Rate", actual: "1.9%", vsCompare: "+ 0.4pp", isPositive: true },
  ] as GenericTableRow[],

  complianceRisk: [
    { metric: "Policy Compliance", actual: "98%", vsCompare: "+ 1.6pp", isPositive: true },
    { metric: "High Risk Suppliers", actual: "10", vsCompare: "- 2", isPositive: true },
    { metric: "Data Quality Score", actual: "97%", vsCompare: "+ 1.8pp", isPositive: true },
    { metric: "Fraud Loss Rate", actual: "0.08%", vsCompare: "+ 0.02pp", isPositive: false },
    { metric: "Audit Findings (Open)", actual: "4", vsCompare: "- 1", isPositive: true },
  ] as GenericTableRow[],

  forecastSnapshot: [
    { metric: "Net Revenue (LKR)", forecast: "129.2M", vsPriorForecast: "+ 6.3%", confidence: "93%" },
    { metric: "Gross Margin %", forecast: "32.1%", vsPriorForecast: "+ 1.4pp", confidence: "78%" },
    { metric: "Orders (#)", forecast: "68,900", vsPriorForecast: "+ 5.2%", confidence: "81%" },
    { metric: "Active Customers (#)", forecast: "30,100", vsPriorForecast: "+ 4.6%", confidence: "76%" },
  ] as ForecastSnapshotRow[],

  forecastVsTarget: [
    { date: "Jul 25", forecast: 110, target: 105, actual: 102 },
    { date: "Jul 30", forecast: 115, target: 108, actual: 107 },
    { date: "Aug 4", forecast: 120, target: 112, actual: 111 },
    { date: "Aug 9", forecast: 122, target: 115, actual: 114 },
    { date: "Aug 14", forecast: 125, target: 118, actual: 116 },
    { date: "Aug 19", forecast: 127, target: 120, actual: 118 },
    { date: "Aug 24", forecast: 129.2, target: 122, actual: 120 },
  ] as ForecastTrendPoint[],

  forecastBadges: [
    { label: "Net Revenue", value: "129.2M", delta: "+ 7.0%" },
    { label: "Gross Margin %", value: "32.1%", delta: "+ 1.6pp" },
    { label: "Orders (#)", value: "68,900", delta: "+ 5.4%" },
    { label: "Active Customers (#)", value: "30,100", delta: "+ 4.8%" },
  ],

  priorityInsights: [
    { id: "pi-1", insight: "Accelerate top 20% SKUs driving 68% of projected revenue.", impact: "High" },
    { id: "pi-2", insight: "Optimize discounts in low margin categories (impacting ~1.6M).", impact: "High" },
    { id: "pi-3", insight: "Improve inventory turnover in slow-moving beauty tools.", impact: "Medium" },
    { id: "pi-4", insight: "Reduce return rate in skincare category to improve margin.", impact: "Medium" },
    { id: "pi-5", insight: "Expand high-NPS segments to drive repeat purchase rate.", impact: "Low" },
  ] as PriorityInsight[],

  executiveCommentary: {
    author: "BI Analyst",
    timeAgo: "2h ago",
    content: "Overall performance remains strong with revenue-growth above target and healthy margin expansion. Monitor discounting impact and inventory turnover in underperforming categories. Focus on high-impact growth initiatives to sustain momentum.",
  },

  quickAccessHub: [
    { id: "qa-1", title: "Executive KPI Scorecard", actionText: "Open" },
    { id: "qa-2", title: "Executive Insights Report", actionText: "Open" },
    { id: "qa-3", title: "Benchmark Industry Trends", actionText: "Open" },
    { id: "qa-4", title: "Custom Executive Report Builder", actionText: "Open" },
    { id: "qa-5", title: "Schedule Executive Report", actionText: "Open" },
  ] as QuickAccessItemData[],

  healthRail: {
    overallScore: 94,
    scoreLabel: "Strong Performance",
    deltaText: "3 pts vs. prior 30 days",
    pillars: [
      { pillar: "Growth", score: 91, delta: "+ 2", isPositive: true },
      { pillar: "Profitability", score: 90, delta: "+ 1", isPositive: true },
      { pillar: "Customer", score: 89, delta: "+ 2", isPositive: true },
      { pillar: "Operational Excellence", score: 92, delta: "+ 2", isPositive: true },
      { pillar: "People & Culture", score: 88, delta: "+ 1", isPositive: true },
      { pillar: "Innovation", score: 82, delta: "+ 1", isPositive: true },
    ],
    targets: [
      { metric: "Net Revenue (LKR)", forecast: "129.2M", vsTarget: "+ 7.0%", isPositive: true },
      { metric: "Gross Margin %", forecast: "32.1%", vsTarget: "+ 1.6pp", isPositive: true },
      { metric: "Orders (#)", forecast: "68,900", vsTarget: "+ 5.4%", isPositive: true },
      { metric: "Active Customers (#)", forecast: "30,100", vsTarget: "+ 4.8%", isPositive: true },
    ],
    alerts: {
      highPriority: 4,
      mediumPriority: 7,
      watchlistItems: 12,
      actionItemsDue: 5,
    },
  } as HealthRailData,
};
