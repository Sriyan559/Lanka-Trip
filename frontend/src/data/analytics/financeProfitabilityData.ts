import { KpiMetricData, WaterfallStepData } from "./executivePerformanceData";

export interface FinanceKpiData extends KpiMetricData {}

export interface SecondaryKpiData {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "flat";
  isPositive?: boolean;
}

export interface ProfitabilityScorecardRow {
  metric: string;
  actual: string;
  plan: string;
  variance: string;
  trend: number[];
  status: "Good" | "Warning" | "Critical";
  isPositive?: boolean;
}

export interface BusinessUnitProfitabilityRow {
  businessUnit: string;
  revenue: string;
  gpMargin: string;
  opMargin: string;
}

export interface ChannelProfitabilityRow {
  channel: string;
  revenue: string;
  gpMargin: string;
  opMargin: string;
}

export interface AgingRow {
  ageBand: string;
  amount: string;
  percentOfTotal: string;
}

export interface ReconciliationExceptionRow {
  breakType: string;
  count: number;
  amount: string;
}

export interface UnderlyingFinanceRecord {
  reference: string;
  recordType: string;
  transactionId: string;
  dateInvoice: string;
  counterparty: string;
  businessUnit: string;
  paymentMethod: string;
  currency: string;
  grossAmount: number;
  fees: number;
  tax: number;
  refund: number;
  commission: number;
  settlement: number;
  netAmount: number;
  expected: number;
  variance: number;
  reconciliationStatus: "Matched" | "Unmatched" | "Partially Matched";
  age: string;
  completedDate: string;
  action: string;
}

export interface FinanceHealthRailData {
  healthScore: number;
  label: string;
  subtext: string;
  profitabilitySummary: {
    netRevenue: string;
    netRevenueTrend: string;
    grossProfit: string;
    grossProfitTrend: string;
    grossMargin: string;
    grossMarginTrend: string;
    contributionProfit: string;
    contributionTrend: string;
    operatingMargin: string;
    operatingMarginTrend: string;
  };
  liquiditySummary: {
    cashOnHand: string;
    availableLiquidity: string;
    operatingCashFlow: string;
    currentRatio: string;
    cashRunway: string;
    liquidityStatus: "Healthy" | "Warning" | "Risk";
  };
  receivablesPayablesSummary: {
    receivables: string;
    overdue: string;
    dso: string;
    payables: string;
    dpo: string;
  };
  reconciliationHealth: {
    coverage: string;
    unmatched: string;
    partiallyMatched: string;
    exposure: string;
    criticalItems: number;
  };
  leakageInsights: {
    confirmedLeakage: string;
    potentialLeakage: string;
    unreconciledExposure: string;
    totalLeakageIdentified: string;
  };
  taxCompleteness: {
    overallCompleteness: string;
  };
  quickActions: string[];
}

export const FINANCE_PROFITABILITY_DATA = {
  headerMeta: {
    breadcrumb: "Analytics > Finance & Profitability",
    title: "Finance, Profitability, Cash Flow & Reconciliation Analytics",
    subtitle:
      "Analyze profitability, cash flow, receivables, payables, settlements, working capital, margin, capital and financial control health across the retail ecosystem.",
  },

  connectionStatus: [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Base Currency", value: "LKR" },
    { label: "Finance Scope", value: "Enterprise Finance" },
    { label: "Revenue Source", value: "Connected", status: "connected" },
    { label: "Payment Source", value: "Connected", status: "connected" },
    { label: "Payables Source", value: "Connected", status: "connected" },
    { label: "Payables Connected", value: "Connected", status: "connected" },
    { label: "Settlement Source", value: "Connected", status: "connected" },
    { label: "Tax Source", value: "Connected", status: "connected" },
    { label: "Marketplace Source", value: "Connected", status: "connected" },
    { label: "Procurement Source", value: "Connected", status: "connected" },
    { label: "Recent Refresh", value: "Healthy", status: "success" },
    { label: "Metric Governance", value: "Healthy", status: "success" },
    { label: "Data Completeness", value: "99.5%" },
    { label: "Last Refreshed", value: "May 14, 2025 10:15 AM" },
    { label: "Access", value: "Assigned Scope" },
  ],

  primaryKpis: [
    {
      id: "net-revenue",
      number: "1.",
      title: "Net Revenue",
      mainValue: "LKR 116.8M",
      trendPercentage: 7.5,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (+7.5%)",
      sparklineData: [102, 105, 108, 110, 114, 116.8],
    },
    {
      id: "gross-profit",
      number: "2.",
      title: "Gross Profit",
      mainValue: "LKR 36.7M",
      trendPercentage: 8.1,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (+8.1%)",
      sparklineData: [31, 32.5, 33.8, 34.5, 35.8, 36.7],
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
      comparisonLabel: "vs. Target 30.0% (+1.2pp)",
      sparklineData: [29.8, 30.1, 30.5, 30.8, 31.1, 31.4],
    },
    {
      id: "contribution-profit",
      number: "4.",
      title: "Contribution Profit",
      mainValue: "LKR 25.4M",
      trendPercentage: 9.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (+9.2%)",
      sparklineData: [22, 22.8, 23.5, 24.1, 24.8, 25.4],
    },
    {
      id: "operating-cash-flow",
      number: "5.",
      title: "Operating Cash Flow",
      mainValue: "LKR 18.7M",
      trendPercentage: 8.4,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (+8.4%)",
      sparklineData: [16, 16.5, 17.1, 17.6, 18.2, 18.7],
    },
    {
      id: "cash-on-hand",
      number: "6.",
      title: "Cash on Hand",
      mainValue: "LKR 32.4M",
      trendPercentage: 4.6,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Target LKR 30.0M (+4.6%)",
      sparklineData: [29.5, 30.2, 30.8, 31.2, 31.9, 32.4],
    },
    {
      id: "receivables",
      number: "7.",
      title: "Receivables",
      mainValue: "LKR 22.3M",
      trendPercentage: 2.1,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (-2.1%)",
      sparklineData: [24.5, 24.1, 23.6, 23.0, 22.6, 22.3],
    },
    {
      id: "payables",
      number: "8.",
      title: "Payables",
      mainValue: "LKR 63.2M",
      trendPercentage: 2.1,
      trendDirection: "up",
      isPositive: false,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (+2.1%)",
      sparklineData: [60.5, 61.2, 61.8, 62.1, 62.7, 63.2],
    },
    {
      id: "unreconciled-exposure",
      number: "9.",
      title: "Unreconciled Exposure",
      mainValue: "LKR 1.84M",
      trendPercentage: 3.3,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior 30 Days (-3.3%)",
      sparklineData: [2.1, 2.02, 1.96, 1.91, 1.87, 1.84],
    },
  ] as FinanceKpiData[],

  analyticsHealthKpi: {
    score: 96,
    label: "Finance Control Health",
    subtext: "2 pts vs prior period",
  },

  tabs: [
    "Finance Overview",
    "Profitability",
    "Revenue",
    "Cash Flow",
    "Receivables",
    "Payables",
    "Payments",
    "Refunds",
    "Commissions & Fees",
    "Settlements & Payouts",
    "Invoices & Notes",
    "Working Capital",
    "Tax Data Completeness",
    "Reconciliation",
    "Exceptions",
    "Leakage Insights",
    "Audit",
  ],

  readinessStrip: [
    { label: "Healthy", count: 48, type: "success" },
    { label: "Margin Risk", count: 6, type: "warning" },
    { label: "Cash Risk", count: 4, type: "warning" },
    { label: "Receivable Risk", count: 7, type: "warning" },
    { label: "Payable Risk", count: 3, type: "warning" },
    { label: "Reconciliation Risk", count: 11, type: "danger" },
    { label: "Settlement Warning", count: 6, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  financeOverviewTrend: [
    { date: "Apr 15", netRevenue: 104, grossProfit: 32, operatingCashFlow: 15 },
    { date: "Apr 22", netRevenue: 108, grossProfit: 33.5, operatingCashFlow: 16.2 },
    { date: "Apr 29", netRevenue: 112, grossProfit: 35, operatingCashFlow: 17.1 },
    { date: "May 06", netRevenue: 114.5, grossProfit: 35.8, operatingCashFlow: 18.0 },
    { date: "May 13", netRevenue: 116.8, grossProfit: 36.7, operatingCashFlow: 18.7 },
  ],

  profitabilityScorecard: [
    { metric: "Net Revenue", actual: "LKR 116.8M", plan: "LKR 110.0M", variance: "+6.8M", trend: [102, 108, 116.8], status: "Good", isPositive: true },
    { metric: "Gross Profit", actual: "LKR 36.7M", plan: "LKR 33.5M", variance: "+3.2M", trend: [31, 33.8, 36.7], status: "Good", isPositive: true },
    { metric: "Gross Margin", actual: "31.4%", plan: "30.5%", variance: "+0.9pp", trend: [29.8, 30.5, 31.4], status: "Good", isPositive: true },
    { metric: "Contribution Margin", actual: "21.8%", plan: "20.0%", variance: "+1.8pp", trend: [19.5, 20.6, 21.8], status: "Good", isPositive: true },
    { metric: "Operating Profit", actual: "LKR 18.7M", plan: "LKR 16.5M", variance: "+2.2M", trend: [15.2, 16.8, 18.7], status: "Good", isPositive: true },
    { metric: "Operating Margin", actual: "16.0%", plan: "15.0%", variance: "+1.0pp", trend: [14.2, 15.1, 16.0], status: "Good", isPositive: true },
    { metric: "EBITDA", actual: "18.1%", plan: "17.5%", variance: "+0.6pp", trend: [16.8, 17.4, 18.1], status: "Good", isPositive: true },
    { metric: "Marketing Impact %", actual: "9.7%", plan: "10.0%", variance: "-0.3pp", trend: [10.4, 10.1, 9.7], status: "Good", isPositive: true },
  ] as ProfitabilityScorecardRow[],

  profitBridgeWaterfall: [
    { name: "Net Revenue", value: 116.8, type: "base", displayValue: "116.8M" },
    { name: "COGS", value: -80.1, type: "decrease", displayValue: "(80.1M)" },
    { name: "Gross Profit", value: 36.7, type: "total", displayValue: "36.7M" },
    { name: "Logistics Cost", value: -5.0, type: "decrease", displayValue: "(5.0M)" },
    { name: "Marketing Cost", value: -4.5, type: "decrease", displayValue: "(4.5M)" },
    { name: "Payment Fees", value: -1.7, type: "decrease", displayValue: "(1.7M)" },
    { name: "Refund Impact", value: -0.8, type: "decrease", displayValue: "(0.8M)" },
    { name: "Other OpEx", value: -6.0, type: "decrease", displayValue: "(6.0M)" },
    { name: "Operating Profit", value: 18.7, type: "total", displayValue: "18.7M" },
  ] as WaterfallStepData[],

  businessUnitProfitability: [
    { businessUnit: "SL Beauty Core", revenue: "LKR 64.3M", gpMargin: "33.1%", opMargin: "17.6%" },
    { businessUnit: "Beauty Plus", revenue: "LKR 25.8M", gpMargin: "30.0%", opMargin: "15.2%" },
    { businessUnit: "Wellness & Care", revenue: "LKR 14.6M", gpMargin: "29.3%", opMargin: "14.0%" },
    { businessUnit: "International Sales", revenue: "LKR 12.1M", gpMargin: "32.8%", opMargin: "16.4%" },
  ] as BusinessUnitProfitabilityRow[],

  channelProfitability: [
    { channel: "Direct (Web)", revenue: "LKR 54.2M", gpMargin: "32.8%", opMargin: "17.1%" },
    { channel: "Mobile App", revenue: "LKR 34.1M", gpMargin: "31.2%", opMargin: "16.4%" },
    { channel: "Retail Partners", revenue: "LKR 20.3M", gpMargin: "29.6%", opMargin: "14.0%" },
    { channel: "Marketplace", revenue: "LKR 8.2M", gpMargin: "28.4%", opMargin: "12.8%" },
  ] as ChannelProfitabilityRow[],

  profitabilityMix: [
    { name: "Direct (Web)", value: 46.4, count: 54.2, color: "#800020" },
    { name: "Mobile App", value: 29.2, count: 34.1, color: "#059669" },
    { name: "Retail Partners", value: 17.4, count: 20.3, color: "#d97706" },
    { name: "Marketplace", value: 7.0, count: 8.2, color: "#2563eb" },
  ],

  cashLiquiditySummary: {
    cashOnHand: "LKR 32.4M",
    availableLiquidity: "LKR 28.7M",
    restrictedCash: "LKR 3.7M",
    operatingCashFlow: "LKR 18.7M",
  },

  cashConversionCycle: {
    dio: "42d",
    dso: "32d",
    dpo: "36d",
    ccc: "38d",
    status: "Good",
  },

  cashFlowAnalysis: [
    { date: "Apr 15", inflows: 28.5, outflows: 22.1, netCashFlow: 6.4 },
    { date: "Apr 22", inflows: 31.2, outflows: 23.8, netCashFlow: 7.4 },
    { date: "Apr 29", inflows: 34.0, outflows: 25.2, netCashFlow: 8.8 },
    { date: "May 06", inflows: 32.8, outflows: 24.5, netCashFlow: 8.3 },
    { date: "May 13", inflows: 35.6, outflows: 26.1, netCashFlow: 9.5 },
  ],

  receivablesAnalytics: {
    totalReceivables: "LKR 22.3M",
    overdue: "LKR 3.8M",
    over30Days: "LKR 2.2M",
    over60Days: "LKR 1.1M",
    over90Days: "LKR 0.5M",
    collectionRate: "92.4%",
  },

  receivableAging: [
    { ageBand: "Current", amount: "12.4M", percentOfTotal: "55.6%" },
    { ageBand: "1–30 Days", amount: "6.1M", percentOfTotal: "27.4%" },
    { ageBand: "31–60 Days", amount: "2.2M", percentOfTotal: "9.9%" },
    { ageBand: "61–90 Days", amount: "1.1M", percentOfTotal: "4.9%" },
    { ageBand: "> 90 Days", amount: "0.5M", percentOfTotal: "2.2%" },
  ] as AgingRow[],

  payablesAnalytics: {
    totalPayables: "LKR 63.2M",
    overdue: "LKR 9.6M",
    paymentRate: "88.7%",
  },

  payableAging: [
    { ageBand: "Current", amount: "26.1M", percentOfTotal: "41.3%" },
    { ageBand: "1–30 Days", amount: "20.3M", percentOfTotal: "32.1%" },
    { ageBand: "31–60 Days", amount: "11.2M", percentOfTotal: "17.7%" },
    { ageBand: "61–90 Days", amount: "3.8M", percentOfTotal: "6.0%" },
    { ageBand: "> 90 Days", amount: "1.8M", percentOfTotal: "2.9%" },
  ] as AgingRow[],

  workingCapital: {
    currentAssets: "LKR 74.4M",
    currentLiabilities: "LKR 59.1M",
    netWorkingCapital: "LKR 15.3M",
    currentRatio: "1.26x",
    workingCapitalTrend: "27 Days",
  },

  taxDataCompleteness: {
    overallCompleteness: "99.2%",
    salesTaxData: "Complete",
    purchaseTaxData: "Complete",
    withholdingTaxData: "Complete",
    taxMappingCoverage: "99.7%",
  },

  reconciliationHealth: {
    coverage: "99.7%",
    unmatched: "0.1%",
    partiallyMatched: "0.2%",
    exposure: "LKR 1.84M",
    criticalItems: 18,
    matchedScore: 99.7,
  },

  reconciliationExceptions: [
    { breakType: "Breaks", count: 12, amount: "580K" },
    { breakType: "Timing Differences", count: 15, amount: "620K" },
    { breakType: "Amount Differences", count: 14, amount: "460K" },
    { breakType: "Missing Documents", count: 9, amount: "180K" },
    { breakType: "Total", count: 50, amount: "1.84M" },
  ] as ReconciliationExceptionRow[],

  leakageInsights: {
    confirmedLeakage: "LKR 620K",
    confirmedPercent: "33.7%",
    potentialLeakage: "LKR 890K",
    potentialPercent: "48.4%",
    unreconciledExposure: "LKR 330K",
    unreconciledPercent: "17.9%",
    totalLeakageIdentified: "LKR 1.84M",
  },

  topLeakageSources: [
    { category: "Payment Timing Gaps", count: 450, percentage: 24.5, color: "#800020" },
    { category: "Discount & Promo Differences", count: 360, percentage: 19.6, color: "#991b1b" },
    { category: "Refund Chargebacks", count: 270, percentage: 14.7, color: "#b91c1c" },
    { category: "Fee & Commission Gaps", count: 330, percentage: 17.9, color: "#c2410c" },
    { category: "Write-offs & Adjustments", count: 430, percentage: 23.3, color: "#d97706" },
  ],

  reconciliationFlow: {
    totalItems: "24,812",
    matched: "24,735",
    matchedPercent: "99.7%",
    unmatched: "+25",
    unmatchedPercent: "0.1%",
    partiallyMatched: "+52",
    partiallyMatchedPercent: "0.2%",
    critical: "+18",
    criticalPercent: "0.1%",
  },

  underlyingRecords: [
    {
      reference: "FIN-REV-2025-000980",
      recordType: "Revenue",
      transactionId: "TXN-1140237",
      dateInvoice: "2025-05-14",
      counterparty: "Beauty Plus Partner",
      businessUnit: "Direct Channel",
      paymentMethod: "Card",
      currency: "LKR",
      grossAmount: 260400,
      fees: 3900,
      tax: 24600,
      refund: 0,
      commission: 2604,
      settlement: 229296,
      netAmount: 260400,
      expected: 260400,
      variance: 0,
      reconciliationStatus: "Matched",
      age: "0 Days",
      completedDate: "May 14, 2025",
      action: "Completed",
    },
    {
      reference: "FIN-SET-2025-000981",
      recordType: "Settlement",
      transactionId: "PAY-778231",
      dateInvoice: "2025-05-14",
      counterparty: "Customer - Web",
      businessUnit: "SL Beauty Core",
      paymentMethod: "eWallet",
      currency: "LKR",
      grossAmount: 52000,
      fees: 780,
      tax: 5200,
      refund: 0,
      commission: 0,
      settlement: 52000,
      netAmount: 52000,
      expected: 52000,
      variance: 0,
      reconciliationStatus: "Matched",
      age: "0 Days",
      completedDate: "May 14, 2025",
      action: "Completed",
    },
    {
      reference: "FIN-PAY-2025-000982",
      recordType: "Payable",
      transactionId: "SET-552631",
      dateInvoice: "2025-05-13",
      counterparty: "Retail Partner A",
      businessUnit: "SL Beauty Core",
      paymentMethod: "Bank Transfer",
      currency: "LKR",
      grossAmount: 180130,
      fees: 0,
      tax: 18013,
      refund: 0,
      commission: 1801,
      settlement: 178725,
      netAmount: 178725,
      expected: 178725,
      variance: 0,
      reconciliationStatus: "Matched",
      age: "1 Day",
      completedDate: "May 13, 2025",
      action: "Completed",
    },
    {
      reference: "FIN-REF-2025-000983",
      recordType: "Refund",
      transactionId: "RFD-338241",
      dateInvoice: "2025-05-13",
      counterparty: "Customer - App",
      businessUnit: "Beauty Plus",
      paymentMethod: "Card",
      currency: "LKR",
      grossAmount: 24900,
      fees: 0,
      tax: 2490,
      refund: -24900,
      commission: 0,
      settlement: -24900,
      netAmount: -24900,
      expected: -24900,
      variance: 0,
      reconciliationStatus: "Matched",
      age: "1 Day",
      completedDate: "May 13, 2025",
      action: "Completed",
    },
    {
      reference: "FIN-PAY-2025-000984",
      recordType: "Payable",
      transactionId: "ADJ-990112",
      dateInvoice: "2025-05-13",
      counterparty: "Logistics Partner",
      businessUnit: "Wellness & Care",
      paymentMethod: "Bank Transfer",
      currency: "LKR",
      grossAmount: 13500,
      fees: 0,
      tax: 1350,
      refund: 0,
      commission: 0,
      settlement: 13500,
      netAmount: 13500,
      expected: 13500,
      variance: 0,
      reconciliationStatus: "Matched",
      age: "1 Day",
      completedDate: "May 13, 2025",
      action: "Completed",
    },
  ] as UnderlyingFinanceRecord[],

  healthRailData: {
    healthScore: 96,
    label: "Finance Control Health",
    subtext: "2 pts vs prior period",
    profitabilitySummary: {
      netRevenue: "LKR 116.8M",
      netRevenueTrend: "+7.5%",
      grossProfit: "LKR 36.7M",
      grossProfitTrend: "+8.1%",
      grossMargin: "31.4%",
      grossMarginTrend: "+1.2pp",
      contributionProfit: "LKR 25.4M",
      contributionTrend: "+9.2%",
      operatingMargin: "16.0%",
      operatingMarginTrend: "+1.0pp",
    },
    liquiditySummary: {
      cashOnHand: "LKR 32.4M",
      availableLiquidity: "LKR 28.7M",
      operatingCashFlow: "LKR 18.7M",
      currentRatio: "1.25x",
      cashRunway: "45 Days",
      liquidityStatus: "Healthy" as const,
    },
    receivablesPayablesSummary: {
      receivables: "LKR 22.3M",
      overdue: "LKR 3.8M",
      dso: "32 Days",
      payables: "LKR 63.2M",
      dpo: "28 Days",
    },
    reconciliationHealth: {
      coverage: "99.7%",
      unmatched: "0.1%",
      partiallyMatched: "0.2%",
      exposure: "LKR 1.84M",
      criticalItems: 18,
    },
    leakageInsights: {
      confirmedLeakage: "LKR 620K",
      potentialLeakage: "LKR 890K",
      unreconciledExposure: "LKR 330K",
      totalLeakageIdentified: "LKR 1.84M",
    },
    taxCompleteness: {
      overallCompleteness: "99.2%",
    },
    quickActions: [
      "Generate Finance Analytics Report",
      "Review Finance Risks",
      "Review Reconciliation Exceptions",
      "Review Receivables",
      "Review Payables",
      "Run Cash Flow Forecast",
      "Open Finance Analytics Audit",
    ],
  } as FinanceHealthRailData,
};
