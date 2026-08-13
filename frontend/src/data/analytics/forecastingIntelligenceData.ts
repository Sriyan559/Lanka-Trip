import { KpiMetricData, WaterfallStepData } from "./executivePerformanceData";
import { ForecastPoint } from "@/components/analytics/charts/ForecastChart";

export interface ForecastKpiData extends KpiMetricData {}

export interface ScorecardRow {
  metric: string;
  current: string;
  forecast: string;
  target: string;
  variance: string;
  confidence: string;
  trend: number[];
  status: "Above Target" | "On Target" | "Watch" | "At Risk" | "Critical";
}

export interface TargetMatrixRow {
  domain: string;
  aboveTarget: number;
  onTarget: number;
  below: number;
  watch: number;
  na?: number;
  risk: number;
  critical: number;
}

export interface OutlookRow {
  domain: string;
  current: string;
  forecast: string;
  target: string;
  variance: string;
  confidence: string;
  trend: number[];
  risk: "Low" | "Med" | "High";
  owner: string;
  status: "Above Target" | "On Target" | "Watch" | "At Risk";
}

export interface ProductDemandRow {
  category: string;
  currentDemand: string;
  forecastDemand: string;
  targetDemand: string;
  variance: string;
  gap: string;
  revenueExposure: string;
  confidence: string;
}

export interface CapacityPlanningRow {
  category: string;
  current: string;
  required: string;
  available: string;
  gap: string;
  peakDate: string;
  risk: "Low" | "Med" | "High";
  status: "On Target" | "Watch" | "At Risk";
}

export interface ScenarioComparisonRow {
  scenario: string;
  revenue: string;
  grossMargin: string;
  cash: string;
  orders: string;
  customers: string;
  runway: string;
  confidence: string;
}

export interface ForecastDriverRow {
  driver: string;
  impact: string;
  mape: string;
  mae: string;
  trend: "up" | "down" | "flat";
}

export interface UnderlyingForecastRecord {
  recordRef: string;
  domain: string;
  subdomain: string;
  metric: string;
  forecast: string;
  target: string;
  variance: string;
  confidence: string;
  model: string;
  scenario: string;
  horizon: string;
  owner: string;
  status: "Published" | "Review" | "Draft";
  action: string;
}

export interface ForecastExceptionRow {
  exception: string;
  domain: string;
  metric: string;
  forecast: string;
  target: string;
  variance: string;
  exposure: string;
  severity: "High" | "Med" | "Low";
  owner: string;
  status: "Open" | "Investigating" | "Resolved";
}

export interface ForecastingHealthRailData {
  healthScore: number;
  label: string;
  subtext: string;
  enterpriseOutlook: {
    revenue: string;
    revenueTrend: string;
    orders: string;
    ordersTrend: string;
    customers: string;
    customersTrend: string;
    grossMargin: string;
    grossMarginTrend: string;
    cashPosition: string;
    cashTrend: string;
  };
  targetSummary: {
    aboveTarget: number;
    onTarget: number;
    watch: number;
    atRisk: number;
    critical: number;
  };
  capacitySummary: {
    supplierGaps: number;
    warehouseGaps: number;
    carrierGaps: number;
    supportGaps: number;
    totalGaps: number;
  };
  financeOutlook: {
    revenue: string;
    grossMargin: string;
    operatingCashFlow: string;
    endingCash: string;
    currentRatio: string;
  };
  riskOutlook: {
    criticalRisks: number;
    complianceForecast: string;
    policyViolations: number;
    financialExposure: string;
  };
  modelSummary: {
    modelsHealthy: number;
    modelsMoving: number;
    watch: number;
    overallConfidence: string;
    drift: string;
  };
  quickQueues: {
    label: string;
    count: number;
    type: "danger" | "warning" | "info";
  }[];
}

export const FORECASTING_INTELLIGENCE_DATA = {
  headerMeta: {
    breadcrumb: "Analytics > Forecasting & Intelligence",
    title: "Forecasting, Intelligence & Enterprise Planning Analytics",
    subtitle:
      "Analyze forward-looking enterprise performance, demand, financial outcomes, capacity constraints, scenarios and planning risks across the retail ecosystem.",
  },

  connectionStatus: [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Business Unit", value: "Beauty Marketplace" },
    { label: "Region", value: "All Business Units" },
    { label: "Scope", value: "Sri Lanka" },
    { label: "Forecast Horizon", value: "Enterprise Wide" },
    { label: "Horizon Range", value: "Next 90 Days" },
    { label: "Weather Source", value: "Connected", status: "connected" },
    { label: "Order Source", value: "Connected", status: "connected" },
    { label: "Customer Source", value: "Connected", status: "connected" },
    { label: "Inventory Source", value: "Connected", status: "connected" },
    { label: "Procurement Source", value: "Connected", status: "connected" },
    { label: "Logistics Source", value: "Connected", status: "connected" },
    { label: "Marketing Source", value: "Connected", status: "connected" },
    { label: "Finance Source", value: "Connected", status: "connected" },
    { label: "Risk Source", value: "Connected", status: "connected" },
    { label: "Forecast Engine", value: "Healthy", status: "success" },
    { label: "Scenario Engine", value: "Healthy", status: "success" },
    { label: "Machine Learning", value: "Optimal", status: "success" },
    { label: "Historical Engine", value: "Healthy", status: "success" },
    { label: "Data Completeness", value: "99.2%" },
    { label: "Last Comprehensive", value: "Aug 14, 2025 10:15 AM" },
    { label: "Access", value: "Assigned Scope" },
  ],

  primaryKpis: [
    {
      id: "forecast-revenue",
      number: "1.",
      title: "Forecast Revenue",
      mainValue: "LKR 129.2M",
      trendPercentage: 7.0,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Target LKR 125.0M (+7.0%)",
      sparklineData: [115, 118, 121, 124, 127, 129.2],
      sparklineColor: "#2563eb",
    },
    {
      id: "forecast-orders",
      number: "2.",
      title: "Forecast Orders",
      mainValue: "45,830",
      trendPercentage: 5.4,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Target 43,500 (+5.4%)",
      sparklineData: [41000, 42200, 43500, 44200, 45100, 45830],
      sparklineColor: "#16a34a",
    },
    {
      id: "forecast-customers",
      number: "3.",
      title: "Forecast Active Customers",
      mainValue: "30,100",
      trendPercentage: 4.8,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Target 28,800 (+4.8%)",
      sparklineData: [27000, 27800, 28500, 29100, 29700, 30100],
      sparklineColor: "#9333ea",
    },
    {
      id: "forecast-margin",
      number: "4.",
      title: "Forecast Gross Margin",
      mainValue: "32.1%",
      trendPercentage: 1.6,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 30.5% (+1.6pp)",
      sparklineData: [30.2, 30.6, 31.1, 31.5, 31.8, 32.1],
      sparklineColor: "#ea580c",
    },
    {
      id: "forecast-cash",
      number: "5.",
      title: "Forecast Cash Position",
      mainValue: "LKR 35.8M",
      trendPercentage: 0.8,
      trendDirection: "down",
      isPositive: false,
      trendSuffix: "%",
      comparisonLabel: "vs. Target LKR 36.1M (-0.8%)",
      sparklineData: [37.2, 36.8, 36.4, 36.1, 35.9, 35.8],
      sparklineColor: "#dc2626",
    },
    {
      id: "forecast-inventory",
      number: "6.",
      title: "Forecast Inventory Availability",
      mainValue: "95.1%",
      trendPercentage: 1.0,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 94.0% (+1.0pp)",
      sparklineData: [92.5, 93.1, 93.8, 94.2, 94.7, 95.1],
      sparklineColor: "#0d9488",
    },
    {
      id: "forecast-fulfilment",
      number: "7.",
      title: "Forecast Fulfilment SLA",
      mainValue: "94.5%",
      trendPercentage: 0.8,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 93.7% (+0.8pp)",
      sparklineData: [91.8, 92.4, 93.1, 93.6, 94.1, 94.5],
      sparklineColor: "#2563eb",
    },
    {
      id: "forecast-support",
      number: "8.",
      title: "Forecast Support Demand",
      mainValue: "1,420",
      trendPercentage: 6.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Target 1,350 (+6.2%)",
      sparklineData: [1250, 1290, 1330, 1360, 1390, 1420],
      sparklineColor: "#9333ea",
    },
    {
      id: "forecast-risks",
      number: "9.",
      title: "Forecast Critical Risks",
      mainValue: "10",
      trendPercentage: 2,
      trendDirection: "down",
      isPositive: false,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (2 lower)",
      sparklineData: [15, 14, 13, 12, 11, 10],
      sparklineColor: "#dc2626",
    },
  ] as ForecastKpiData[],

  analyticsHealthKpi: {
    score: 94,
    label: "Very Good",
    subtext: "2 pts vs prior period",
  },

  tabs: [
    "Forecast Overview",
    "Revenue & Orders",
    "Customers",
    "Marketplace",
    "Products & Demand",
    "Suppliers & Procurement",
    "Inventory",
    "Fulfilment & Logistics",
    "Marketing",
    "Finance & Cash",
    "Customer Support",
    "Risk & Compliance",
    "Capacity Planning",
    "Targets",
    "Scenarios",
    "Sensitivity",
    "Drivers",
    "Forecast Accuracy",
    "Model Monitoring",
    "Assumptions",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  readinessStrip: [
    { label: "Healthy", count: 43, type: "success" },
    { label: "Target Risk", count: 7, type: "warning" },
    { label: "Capacity Warning", count: 5, type: "warning" },
    { label: "Forecast Warning", count: 4, type: "warning" },
    { label: "Model Warning", count: 3, type: "warning" },
    { label: "Assumption Warning", count: 4, type: "warning" },
    { label: "Scenario Warning", count: 2, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  enterpriseForecastChartData: [
    { date: "May 16", actual: 110, forecast: 110, target: 112, confidenceLow: 106, confidenceHigh: 114 },
    { date: "Jun 01", actual: 114, forecast: 114, target: 115, confidenceLow: 110, confidenceHigh: 118 },
    { date: "Jun 16", actual: 118, forecast: 118, target: 118, confidenceLow: 114, confidenceHigh: 122 },
    { date: "Jul 01", actual: 122, forecast: 122, target: 120, confidenceLow: 117, confidenceHigh: 127 },
    { date: "Jul 16", actual: 125, forecast: 125, target: 122, confidenceLow: 120, confidenceHigh: 130 },
    { date: "Aug 01", actual: null, forecast: 127, target: 124, confidenceLow: 121, confidenceHigh: 133 },
    { date: "Aug 16", actual: null, forecast: 128.5, target: 125, confidenceLow: 122, confidenceHigh: 135 },
    { date: "Sep 01", actual: null, forecast: 129.2, target: 125, confidenceLow: 123, confidenceHigh: 136 },
    { date: "Sep 16", actual: null, forecast: 130.5, target: 126, confidenceLow: 124, confidenceHigh: 138 },
    { date: "Oct 01", actual: null, forecast: 132.0, target: 127, confidenceLow: 125, confidenceHigh: 140 },
  ] as ForecastPoint[],

  scorecardData: [
    { metric: "Revenue", current: "LKR 120.7M", forecast: "LKR 129.2M", target: "LKR 125.0M", variance: "+7.0%", confidence: "92%", trend: [110, 120, 129.2], status: "Above Target" },
    { metric: "Orders", current: "41,500", forecast: "45,830", target: "43,500", variance: "+5.4%", confidence: "94%", trend: [39000, 41500, 45830], status: "Above Target" },
    { metric: "Active Customers", current: "27,400", forecast: "30,100", target: "28,800", variance: "+4.8%", confidence: "91%", trend: [26000, 27400, 30100], status: "Above Target" },
    { metric: "Order Margin", current: "31.2%", forecast: "32.1%", target: "30.5%", variance: "+1.6pp", confidence: "90%", trend: [30.1, 31.2, 32.1], status: "Above Target" },
    { metric: "Gross Margin", current: "31.4%", forecast: "32.1%", target: "30.5%", variance: "+1.6pp", confidence: "92%", trend: [30.5, 31.4, 32.1], status: "Above Target" },
    { metric: "Target Purchases", current: "LKR 54.1M", forecast: "LKR 56.2M", target: "LKR 55.0M", variance: "+2.2%", confidence: "88%", trend: [50, 54.1, 56.2], status: "On Target" },
    { metric: "Inventory Availability", current: "94.1%", forecast: "95.1%", target: "94.0%", variance: "+1.1pp", confidence: "94%", trend: [93.1, 94.1, 95.1], status: "Above Target" },
    { metric: "Fulfilment SLA", current: "93.7%", forecast: "94.5%", target: "95.0%", variance: "-0.5pp", confidence: "84%", trend: [92.5, 93.7, 94.5], status: "Watch" },
    { metric: "Marketing ROI", current: "2.9x", forecast: "3.46x", target: "3.2x", variance: "+0.26x", confidence: "86%", trend: [2.7, 2.9, 3.46], status: "Above Target" },
    { metric: "Operating Cash Flow", current: "LKR 34.5M", forecast: "LKR 35.8M", target: "LKR 35.0M", variance: "+2.3%", confidence: "89%", trend: [32, 34.5, 35.8], status: "Above Target" },
    { metric: "Support SLA", current: "93.5%", forecast: "94.2%", target: "95.0%", variance: "-0.8pp", confidence: "86%", trend: [92, 93.5, 94.2], status: "Watch" },
    { metric: "Compliance Score", current: "93.8%", forecast: "94.0%", target: "94.0%", variance: "0.0pp", confidence: "96%", trend: [93, 93.8, 94.0], status: "On Target" },
  ] as ScorecardRow[],

  targetMatrixData: [
    { domain: "Revenue", aboveTarget: 3, onTarget: 2, below: 1, watch: 0, risk: 0, critical: 0 },
    { domain: "Profitability", aboveTarget: 2, onTarget: 2, below: 1, watch: 1, risk: 0, critical: 0 },
    { domain: "Customers", aboveTarget: 2, onTarget: 1, below: 1, watch: 0, risk: 0, critical: 0 },
    { domain: "Inventory", aboveTarget: 2, onTarget: 1, below: 0, watch: 1, risk: 1, critical: 0 },
    { domain: "Fulfilment", aboveTarget: 1, onTarget: 2, below: 1, watch: 1, risk: 0, critical: 0 },
    { domain: "Procurement", aboveTarget: 1, onTarget: 2, below: 0, watch: 1, risk: 0, critical: 0 },
    { domain: "Marketing", aboveTarget: 2, onTarget: 1, below: 0, watch: 0, risk: 0, critical: 0 },
    { domain: "Finance", aboveTarget: 2, onTarget: 2, below: 1, watch: 0, risk: 0, critical: 0 },
    { domain: "Customer Support", aboveTarget: 1, onTarget: 1, below: 1, watch: 1, risk: 0, critical: 0 },
    { domain: "Risk & Compliance", aboveTarget: 2, onTarget: 2, below: 0, watch: 0, risk: 0, critical: 0 },
  ] as TargetMatrixRow[],

  domainForecastOutlook: [
    { domain: "Revenue", current: "LKR 120.7M", forecast: "LKR 129.2M", target: "LKR 125.0M", variance: "+7.0%", confidence: "92%", trend: [110, 120, 129.2], risk: "Low", owner: "R. Perera", status: "Above Target" },
    { domain: "Customers", current: "27,400", forecast: "30,100", target: "28,800", variance: "+4.8%", confidence: "91%", trend: [26000, 27400, 30100], risk: "Low", owner: "M. De Silva", status: "Above Target" },
    { domain: "Inventory", current: "LKR 112.5M", forecast: "LKR 116.8M", target: "LKR 115.0M", variance: "+1.6%", confidence: "94%", trend: [108, 112.5, 116.8], risk: "Low", owner: "S. Fernando", status: "Above Target" },
    { domain: "Marketplace", current: "LKR 58.0M", forecast: "LKR 62.1M", target: "LKR 60.0M", variance: "+3.5%", confidence: "88%", trend: [54, 58, 62.1], risk: "Med", owner: "K. Alwis", status: "Above Target" },
    { domain: "Products & Demand", current: "36.2K", forecast: "38.5K", target: "37.0K", variance: "+4.1%", confidence: "90%", trend: [34, 36.2, 38.5], risk: "Low", owner: "T. Wijeratne", status: "Above Target" },
    { domain: "Procurement", current: "LKR 54.1M", forecast: "LKR 56.2M", target: "LKR 55.0M", variance: "+2.2%", confidence: "88%", trend: [50, 54.1, 56.2], risk: "Low", owner: "R. Fernando", status: "On Target" },
    { domain: "Fulfilment & Logistics", current: "93.7%", forecast: "94.5%", target: "95.0%", variance: "-0.5pp", confidence: "84%", trend: [92.5, 93.7, 94.5], risk: "Med", owner: "K. Fernando", status: "Watch" },
    { domain: "Marketing", current: "2.9x", forecast: "3.46x", target: "3.2x", variance: "+0.26x", confidence: "86%", trend: [2.7, 2.9, 3.46], risk: "Low", owner: "N. Perera", status: "Above Target" },
    { domain: "Finance", current: "LKR 34.5M", forecast: "LKR 35.8M", target: "LKR 35.0M", variance: "+2.3%", confidence: "89%", trend: [32, 34.5, 35.8], risk: "Low", owner: "C. Fernando", status: "Above Target" },
    { domain: "Risk & Compliance", current: "93.8%", forecast: "94.0%", target: "94.0%", variance: "0.0pp", confidence: "96%", trend: [93, 93.8, 94.0], risk: "Low", owner: "C. Fernando", status: "On Target" },
  ] as OutlookRow[],

  revenueOrdersForecast: {
    revenue: "LKR 129.2M",
    revenueTrend: "+7.0%",
    orders: "45,830",
    ordersTrend: "+5.4%",
    aov: "LKR 2,815",
    aovTrend: "+1.5%",
    paidOrders: "44,782",
    paidTrend: "+5.1%",
    cancellation: "2.3%",
    cancellationTrend: "-0.3pp",
    returnRate: "3.2%",
    returnTrend: "-0.2pp",
  },

  revenueDriverBridge: [
    { name: "Base Revenue", value: 120.7, type: "base", displayValue: "120.7M" },
    { name: "New Customers", value: 11.3, type: "increase", displayValue: "+11.3M" },
    { name: "Churn", value: -8.2, type: "decrease", displayValue: "(8.2M)" },
    { name: "Returns", value: -3.4, type: "decrease", displayValue: "(3.4M)" },
    { name: "Rate", value: 4.5, type: "increase", displayValue: "+4.5M" },
    { name: "Costs", value: -2.1, type: "decrease", displayValue: "(2.1M)" },
    { name: "Forecast Revenue", value: 129.2, type: "total", displayValue: "129.2M" },
  ] as WaterfallStepData[],

  customerForecast: {
    activeCustomers: "30,100",
    activeTrend: "+4.8%",
    newCustomers: "6,420",
    newTrend: "+6.1%",
    retentionRate: "78.2%",
    retentionTrend: "+1.2pp",
    churnRate: "3.2%",
    churnTrend: "-0.2pp",
  },

  marketplaceForecast: {
    gmv: "LKR 62.1M",
    gmvTrend: "+7.1%",
    activeSellers: "22,160",
    sellersTrend: "+5.4%",
    orders: "1,286",
    buyBox: "24.5%",
    returnRate: "94.3%",
  },

  productDemandForecast: [
    { category: "Skincare", currentDemand: "22,100", forecastDemand: "24,500", targetDemand: "23,500", variance: "+1,000", gap: "+1,000", revenueExposure: "LKR 9.8M", confidence: "94%" },
    { category: "Hair Care", currentDemand: "14,200", forecastDemand: "15,800", targetDemand: "15,200", variance: "+600", gap: "+600", revenueExposure: "LKR 5.2M", confidence: "91%" },
    { category: "Makeup", currentDemand: "11,500", forecastDemand: "12,800", targetDemand: "12,400", variance: "+400", gap: "+400", revenueExposure: "LKR 4.1M", confidence: "89%" },
    { category: "Body Care", currentDemand: "8,400", forecastDemand: "9,200", targetDemand: "9,000", variance: "+200", gap: "+200", revenueExposure: "LKR 2.8M", confidence: "92%" },
    { category: "Fragrance", currentDemand: "6,100", forecastDemand: "6,800", targetDemand: "6,600", variance: "+200", gap: "+200", revenueExposure: "LKR 2.2M", confidence: "87%" },
  ] as ProductDemandRow[],

  supplierProcurement: {
    forecastPos: "45,620",
    posTrend: "+6.1%",
    confirmedSpend: "LKR 56.2M",
    spendTrend: "+4.8%",
    expectedUnits: "84.5M",
    unitsTrend: "+5.2%",
    supplierCapacity: "88%",
    capacityTrend: "+1.2pp",
    leadTime: "12.4d",
    leadTimeTrend: "-0.6d",
    costVarianceRisk: "Low",
  },

  inventoryOutlook: {
    stockRisk: "3.1%",
    stockRiskTrend: "-0.3pp",
    stockCover: "4.2x",
    stockCoverTrend: "+0.2x",
    inventoryValue: "LKR 116.8M",
    valueTrend: "+4.2%",
    daysOfInventory: "6.8x",
    doiTrend: "+0.3x",
    capacityRisk: "2.1%",
    capacityRiskTrend: "-0.1pp",
  },

  warehouseCapacity: {
    utilizationCurrent: "81%",
    utilizationForecast: "87%",
    capacityGap: "6%",
    peakCapacity: "93%",
    supportedDemand: "82%",
  },

  fulfilmentCarrier: {
    onTimeDelivery: "94.5%",
    deliveryTrend: "+2.1pp",
    carrierSla: "92.7%",
    serviceCapacity: "90.5%",
    capacityGap: "9.0%",
  },

  marketingForecast: {
    marketingSpend: "LKR 9.2M",
    spendTrend: "+4.5%",
    expectedRevenue: "LKR 31.8M",
    revenueTrend: "+7.1%",
    roas: "3.46x",
    roasTrend: "+0.21x",
    newCustomers: "4,620",
    customerTrend: "+6.1%",
  },

  financeCashForecast: {
    freeCashFlow: "LKR 12.8M",
    cashFlowTrend: "+7.0%",
    operatingCashFlow: "LKR 35.8M",
    operatingTrend: "+8.5%",
    cashOnHand: "LKR 35.8M",
    cashTrend: "-0.8%",
    currentRatio: "1.42x",
    ratioTrend: "+0.02x",
  },

  receivablesPayablesForecast: {
    receivables: "LKR 22.6M",
    receivablesTrend: "-2.1%",
    dso: "42 Days",
    dsoTrend: "-1d",
    payables: "LKR 36.4M",
    payablesTrend: "+2.1%",
    dpo: "36 Days",
    dpoTrend: "+1d",
    debt: "1.1x",
  },

  forecastDrivers: {
    positiveDrivers: [
      { name: "Volume Growth", val: "+8.5%" },
      { name: "New Customer Growth", val: "+6.1%" },
      { name: "Marketing Campaign ROI", val: "+4.5%" },
      { name: "Price / Mix Improvement", val: "+2.6%" },
      { name: "Seasonality Uplift", val: "+1.9%" },
    ],
    negativeDrivers: [
      { name: "Supplier Lead Time Risk", val: "-3.2%" },
      { name: "Logistics Disruptions", val: "-2.5%" },
      { name: "Returns Increase", val: "-1.8%" },
      { name: "FX Volatility", val: "-1.2%" },
      { name: "Support Cost Inflation", val: "-0.8%" },
    ],
  },

  forecastAccuracy: {
    forecastCount: "1,240",
    accuracy: "78.4%",
    mape: "6.2%",
    mae: "4.8%",
    bias: "+0.2%",
  },

  riskComplianceForecast: {
    openRisks: 10,
    openTrend: "-2",
    criticalRisks: 2,
    criticalTrend: "-1",
    fraudAlerts: 7,
    fraudTrend: "+1",
    policyViolations: 5,
    policyTrend: "-1",
    complianceScore: "94%",
    financialExposure: "LKR 4.2M",
  },

  enterpriseCapacityPlanning: [
    { category: "People", current: "2.1M FX", required: "2.3M", available: "2.2M", gap: "-0.1M", peakDate: "Sep 15, 2025", risk: "Med", status: "Watch" },
    { category: "Finance", current: "LKR 116.8M", required: "LKR 129.2M", available: "LKR 125.0M", gap: "-4.2M", peakDate: "Sep 30, 2025", risk: "Low", status: "On Target" },
    { category: "Warehouse Capacity", current: "81%", required: "87%", available: "93%", gap: "+6pp", peakDate: "Oct 15, 2025", risk: "Med", status: "Watch" },
    { category: "Workforce Capacity", current: "82%", required: "88%", available: "95%", gap: "+7pp", peakDate: "Oct 15, 2025", risk: "Med", status: "Watch" },
    { category: "Fulfilment Capacity", current: "90%", required: "95%", available: "98%", gap: "+3pp", peakDate: "Nov 01, 2025", risk: "Low", status: "On Target" },
    { category: "Carrier Capacity", current: "92%", required: "96%", available: "99%", gap: "+3pp", peakDate: "Nov 15, 2025", risk: "Low", status: "On Target" },
    { category: "Support Motivated Capacity", current: "78%", required: "84%", available: "92%", gap: "+8pp", peakDate: "Nov 30, 2025", risk: "High", status: "At Risk" },
  ] as CapacityPlanningRow[],

  capacityGapMatrix: [
    { tier: "Supplier", priceVsMarket: "Demand +8.5%, Gap -4%", skuPercent: 65 },
    { tier: "Inventory", priceVsMarket: "Demand +7.2%, Gap -2%", skuPercent: 72 },
    { tier: "Warehouse", priceVsMarket: "Demand +6.0%, Gap +6%", skuPercent: 87 },
    { tier: "Fulfilment", priceVsMarket: "Demand +5.5%, Gap +3%", skuPercent: 90 },
    { tier: "Carrier", priceVsMarket: "Demand +4.8%, Gap +3%", skuPercent: 92 },
    { tier: "Customer Support", priceVsMarket: "Demand +6.2%, Gap +8%", skuPercent: 84 },
    { tier: "Marketing", priceVsMarket: "Demand +7.1%, Gap 0%", skuPercent: 95 },
    { tier: "Finance", priceVsMarket: "Demand +7.0%, Gap -4M", skuPercent: 89 },
  ],

  scenarioComparison: [
    { scenario: "Base Case", revenue: "129.2", grossMargin: "32.1%", cash: "35.8", orders: "45,830", customers: "30,100", runway: "58", confidence: "92%" },
    { scenario: "Growth Case", revenue: "138.5", grossMargin: "33.2%", cash: "41.2", orders: "49,200", customers: "32,500", runway: "64", confidence: "85%" },
    { scenario: "Downside Case", revenue: "118.4", grossMargin: "30.1%", cash: "28.5", orders: "41,100", customers: "27,200", runway: "48", confidence: "94%" },
    { scenario: "Supplier Constraint", revenue: "121.6", grossMargin: "31.1%", cash: "31.8", orders: "42,800", customers: "28,100", runway: "52", confidence: "88%" },
    { scenario: "Cost Reduction", revenue: "125.7", grossMargin: "33.4%", cash: "38.9", orders: "44,200", customers: "29,100", runway: "60", confidence: "91%" },
  ] as ScenarioComparisonRow[],

  sensitivityAnalysis: [
    { label: "Price Increase", value: 20.8, displayValue: "+20.8%", color: "#2563eb" },
    { label: "Conversion Rate", value: 14.2, displayValue: "+14.2%", color: "#2563eb" },
    { label: "AOV", value: 10.6, displayValue: "+10.6%", color: "#2563eb" },
    { label: "Marketing Spend", value: 5.8, displayValue: "+5.8%", color: "#2563eb" },
    { label: "Cost Increase", value: -5.2, displayValue: "-5.2%", color: "#9333ea" },
    { label: "Returns Rate", value: -7.8, displayValue: "-7.8%", color: "#e11d48" },
    { label: "Supply Delay", value: -10.5, displayValue: "-10.5%", color: "#f97316" },
    { label: "Support Cost", value: -12.4, displayValue: "-12.4%", color: "#ea580c" },
    { label: "Seasonality", value: -15.2, displayValue: "-15.2%", color: "#c2410c" },
  ],

  forecastDriversTop: [
    { driver: "Volume Growth", impact: "+8.5%", mape: "4.1%", mae: "LKR 1.2M", trend: "up" },
    { driver: "New Customer Growth", impact: "+6.1%", mape: "5.2%", mae: "LKR 0.8M", trend: "up" },
    { driver: "Marketing Campaign ROI", impact: "+4.5%", mape: "6.8%", mae: "LKR 0.6M", trend: "up" },
    { driver: "Price / Mix Improvement", impact: "+2.6%", mape: "3.5%", mae: "LKR 0.4M", trend: "flat" },
    { driver: "Seasonality Uplift", impact: "+1.9%", mape: "2.9%", mae: "LKR 0.3M", trend: "up" },
  ] as ForecastDriverRow[],

  forecastExceptions: [
    { exception: "Revenue Deficit", domain: "Revenue", metric: "Total Revenue", forecast: "LKR 129.2M", target: "LKR 135.0M", variance: "-4.3%", exposure: "LKR 5.8M", severity: "High", owner: "R. Perera", status: "Open" },
    { exception: "Inventory Shortage Risk", domain: "Inventory", metric: "Skincare Stock", forecast: "92.1%", target: "95.0%", variance: "-2.9pp", exposure: "LKR 4.2M", severity: "High", owner: "T. Wijeratne", status: "Open" },
    { exception: "Fulfilment SLA Risk", domain: "Logistics", metric: "Fulfilment SLA", forecast: "94.5%", target: "96.0%", variance: "-1.5pp", exposure: "LKR 2.1M", severity: "Med", owner: "K. Fernando", status: "Investigating" },
    { exception: "Cash Shortfall Risk", domain: "Finance", metric: "Cash Position", forecast: "LKR 35.8M", target: "LKR 40.0M", variance: "-10.5%", exposure: "LKR 4.2M", severity: "High", owner: "C. Fernando", status: "Open" },
    { exception: "Support Capacity Gap", domain: "Support", metric: "Agents", forecast: "42", target: "48", variance: "-6", exposure: "LKR 1.8M", severity: "Med", owner: "L. De Silva", status: "Open" },
  ] as ForecastExceptionRow[],

  earlyWarnings: [
    { label: "Demand Acceleration", metric: "+8.5%", trend: "up", horizon: "vs. next 30 days", severity: "success" },
    { label: "Margin Deterioration", metric: "-0.8pp", trend: "down", horizon: "vs. next 60 days", severity: "danger" },
    { label: "Supplier Disruption", metric: "High", trend: "up", horizon: "vs. next 45 days", severity: "danger" },
    { label: "Stockout Probability", metric: "14%", trend: "up", horizon: "vs. next 30 days", severity: "warning" },
    { label: "Cash Burn Rate", metric: "9%", trend: "down", horizon: "vs. next 90 days", severity: "warning" },
    { label: "Support Overload Risk", metric: "High", trend: "up", horizon: "vs. next 30 days", severity: "danger" },
  ],

  underlyingRecords: [
    { recordRef: "FCST-REV-2026-0001", domain: "Revenue", subdomain: "Total Revenue", metric: "LKR 129.2M", forecast: "LKR 125.0M", target: "+7.0%", variance: "92%", confidence: "Ensemble", model: "v2.2", scenario: "Base Case", horizon: "R. Perera", owner: "Published", status: "Published", action: "View" },
    { recordRef: "FCST-ORD-2026-0002", domain: "Orders", subdomain: "Total Orders", metric: "45,830", forecast: "43,500", target: "+5.4%", variance: "94%", confidence: "ARIMA", model: "v2.0", scenario: "Base Case", horizon: "S. Vora", owner: "Published", status: "Published", action: "View" },
    { recordRef: "FCST-CUST-2026-0003", domain: "Customers", subdomain: "Active Customers", metric: "30,100", forecast: "28,800", target: "+4.8%", variance: "91%", confidence: "Prophet", model: "v1.8", scenario: "Base Case", horizon: "M. De Silva", owner: "Published", status: "Published", action: "View" },
    { recordRef: "FCST-INV-2026-0004", domain: "Inventory", subdomain: "Total Inventory Value", metric: "LKR 116.8M", forecast: "LKR 115.0M", target: "+1.6%", variance: "94%", confidence: "XGBoost", model: "v2.4", scenario: "Base Case", horizon: "T. Wijeratne", owner: "Published", status: "Published", action: "View" },
    { recordRef: "FCST-CASH-2026-0005", domain: "Finance", subdomain: "Cash Position", metric: "LKR 35.8M", forecast: "LKR 36.1M", target: "-0.8%", variance: "89%", confidence: "LSTM", model: "v2.1", scenario: "Base Case", horizon: "C. Perera", owner: "Published", status: "Published", action: "View" },
  ] as UnderlyingForecastRecord[],

  healthRailData: {
    healthScore: 94,
    label: "Very Good",
    subtext: "2 pts vs prior period",
    enterpriseOutlook: {
      revenue: "LKR 129.2M",
      revenueTrend: "+7.0%",
      orders: "45,830",
      ordersTrend: "+5.4%",
      customers: "30,100",
      customersTrend: "+4.8%",
      grossMargin: "32.1%",
      grossMarginTrend: "+1.6pp",
      cashPosition: "LKR 35.8M",
      cashTrend: "-0.8%",
    },
    targetSummary: {
      aboveTarget: 12,
      onTarget: 45,
      watch: 9,
      atRisk: 7,
      critical: 2,
    },
    capacitySummary: {
      supplierGaps: 2,
      warehouseGaps: 4,
      carrierGaps: 3,
      supportGaps: 5,
      totalGaps: 14,
    },
    financeOutlook: {
      revenue: "LKR 129.2M",
      grossMargin: "32.1%",
      operatingCashFlow: "LKR 35.8M",
      endingCash: "LKR 35.8M",
      currentRatio: "1.42",
    },
    riskOutlook: {
      criticalRisks: 10,
      complianceForecast: "94%",
      policyViolations: 5,
      financialExposure: "LKR 4.2M",
    },
    modelSummary: {
      modelsHealthy: 14,
      modelsMoving: 3,
      watch: 2,
      overallConfidence: "92%",
      drift: "2%",
    },
    quickQueues: [
      { label: "Targets At Risk", count: 7, type: "danger" as const },
      { label: "Capacity Gaps", count: 14, type: "warning" as const },
      { label: "Revenue Risks", count: 6, type: "warning" as const },
      { label: "Inventory Risks", count: 8, type: "warning" as const },
      { label: "Scope Changes", count: 5, type: "info" as const },
      { label: "Support Gaps", count: 5, type: "warning" as const },
      { label: "Compliance Warnings", count: 4, type: "warning" as const },
      { label: "Model Warnings", count: 3, type: "warning" as const },
    ],
  } as ForecastingHealthRailData,
};
