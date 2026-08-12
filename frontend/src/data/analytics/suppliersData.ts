import { KpiMetricData, WaterfallStepData } from "./executivePerformanceData";

export interface SupplierKpi extends KpiMetricData {
  vsPreviousLabel?: string;
}

export interface ProcurementTrendPoint {
  date: string;
  spend: number;
  pos: number;
  fillRate: number;
  onTime: number;
  quality: number;
}

export interface SpendConcentrationRow {
  group: string;
  spendPercent: number;
  cumulativePercent: number;
}

export interface SupplierPerformanceRow {
  supplier: string;
  tier: string;
  spend: string;
  pos: number;
  fillRate: string;
  onTime: string;
  leadTime: string;
  quality: string;
  contractCov: string;
  trend: string;
  status: string;
}

export interface CostPerformanceRow {
  supplier: string;
  currentCost: number;
  priorCost: number;
  variance: string;
  freightImpact: string;
  ppvImpact: string;
  totalImpact: string;
  status: string;
}

export interface QualityReasonDonutPoint {
  name: string;
  value: number;
  color: string;
}

export interface FulfilmentMetricRow {
  metric: string;
  value: string;
  vsPrior: string;
  isPositive?: boolean;
}

export interface DependencyRow {
  productCategory: string;
  primarySupplier: string;
  altSuppliers: number;
  share: string;
  leadTime: string;
  spendExposure: string;
  risk: string;
  status: string;
}

export interface ConcentrationMatrixPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  category: string;
}

export interface SupplierRiskRow {
  riskType: string;
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface ProcurementForecastRow {
  metric: string;
  forecast: string;
  vsOverall: string;
  target: string;
  variance: string;
  expectedState: string;
  isPositive?: boolean;
}

export interface UnderlyingPoRecord {
  poNumber: string;
  supplier: string;
  supplierCode: string;
  product: string;
  category: string;
  quantity: number;
  unitCost: number;
  poValue: number;
  contractPrice: number;
  priceVariance: string;
  orderDate: string;
  expectedDate: string;
  receiptDate: string;
  leadTime: string;
  fillRate: string;
  qaStatus: string;
  compliance: string;
  paymentTerms: string;
  risk: string;
  completed: string;
  paymentSource: string;
  owner: string;
  lastUpdated: string;
  status: string;
  action: string;
}

export interface SupplierHealthRailData {
  healthScore: number;
  label: string;
  supplierSummary: {
    activeSuppliers: string;
    strategicSuppliers: string;
    preferredSuppliers: string;
    atRiskSuppliers: string;
    restrictedSuppliers: string;
  };
  procurementSummary: {
    spend: string;
    spendDelta: string;
    purchaseOrders: string;
    ordersDelta: string;
    ppvVsBudget: string;
    avgLeadTime: string;
  };
  performanceSummary: {
    fillRate: string;
    fillDelta: string;
    onTimeSupply: string;
    onTimeDelta: string;
    qualityScore: string;
    qualityDelta: string;
    slaCompliance: string;
    slaDelta: string;
  };
  dependencySummary: {
    singleSource: string;
    multiSource: string;
    alternateCoverage: string;
    spendExposure: string;
  };
  riskSummary: {
    operationalRisk: number;
    qualityRisk: number;
    complianceRisk: number;
    costRisk: number;
    continuityRisk: number;
  };
  quickQueues: {
    queueName: string;
    count: string;
  }[];
}

export const SUPPLIERS_DATA = {
  headerMeta: {
    title: "Supplier & Procurement Analytics",
    subtitle:
      "Comprehensive supplier, procurement, cost, quality, SLA, dependency analytics, efficient and strategic sourcing.",
  },

  governanceStrip: [
    { label: "Tenant", value: "SL Beauty", status: "normal" },
    { label: "Ecosystem", value: "Beauty Marketplace", status: "normal" },
    { label: "Business Unit", value: "All Business Units", status: "normal" },
    { label: "Region", value: "Sri Lanka", status: "normal" },
    { label: "Base Currency", value: "LKR", status: "normal" },
    { label: "Supplier Scope", value: "All Suppliers", status: "normal" },
    { label: "Procurement Source", value: "Connected", status: "success" },
    { label: "Product Source", value: "Connected", status: "success" },
    { label: "Finance Source", value: "Connected", status: "success" },
    { label: "Logistics Source", value: "Connected", status: "success" },
    { label: "Compliance Source", value: "Connected", status: "success" },
    { label: "Contract Source", value: "Healthy", status: "success" },
    { label: "Metric Governance", value: "99%", status: "success" },
    { label: "Last Refreshed", value: "Aug 14, 2026 10:15 AM", status: "normal" },
    { label: "Access", value: "Assigned Scope", status: "normal" },
  ],

  kpis: [
    {
      id: "active-suppliers",
      number: "1.",
      title: "Active Suppliers",
      mainValue: "186",
      trendPercentage: 6.6,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [170, 172, 175, 178, 180, 183, 186],
    },
    {
      id: "procurement-spend",
      number: "2.",
      title: "Procurement Spend (LKR)",
      mainValue: "62.8M",
      trendPercentage: 5.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [56, 57.5, 59, 60.2, 61.5, 62.1, 62.8],
    },
    {
      id: "purchase-orders",
      number: "3.",
      title: "Purchase Orders",
      mainValue: "3.8K",
      trendPercentage: 6.1,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [3400, 3500, 3600, 3680, 3720, 3760, 3800],
    },
    {
      id: "avg-fill-rate",
      number: "4.",
      title: "Avg Fill Rate",
      mainValue: "94.3%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [91.5, 92.0, 92.8, 93.2, 93.8, 94.0, 94.3],
    },
    {
      id: "on-time-supply",
      number: "5.",
      title: "On-Time Supply",
      mainValue: "92.6%",
      trendPercentage: 0.8,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [90.0, 90.5, 91.2, 91.8, 92.1, 92.4, 92.6],
    },
    {
      id: "avg-lead-time",
      number: "6.",
      title: "Avg Lead Time",
      mainValue: "8.4d",
      trendPercentage: -0.6,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "d",
      sparklineData: [9.8, 9.5, 9.2, 8.9, 8.7, 8.5, 8.4],
    },
    {
      id: "quality-score",
      number: "7.",
      title: "Quality Score",
      mainValue: "95%",
      trendPercentage: 1.0,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [92, 93, 93.5, 94, 94.5, 94.8, 95],
    },
    {
      id: "sla-compliance",
      number: "8.",
      title: "SLA Compliance",
      mainValue: "93.8%",
      trendPercentage: -0.6,
      trendDirection: "down",
      isPositive: false,
      trendSuffix: "pp",
      sparklineData: [95.2, 95.0, 94.6, 94.3, 94.1, 93.9, 93.8],
    },
    {
      id: "high-risk-suppliers",
      number: "9.",
      title: "High-Risk Suppliers",
      mainValue: "14",
      trendPercentage: -2,
      trendDirection: "down",
      isPositive: true,
      sparklineData: [19, 18, 17, 16, 15, 15, 14],
    },
  ] as SupplierKpi[],

  analyticsHealthKpi: {
    score: 95,
    maxScore: 100,
    label: "Healthy",
    subtext: "All systems operational",
  },

  tabs: [
    "Supplier Overview",
    "Supplier Performance",
    "Procurement Spend",
    "Purchase Orders",
    "Categories & Spend",
    "Lead Time",
    "Quality",
    "Fulfilment",
    "Dependency",
    "Contracts",
    "Compliance",
    "Risk",
    "Supplier Cohorts",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  readinessStrip: [
    { label: "Healthy", count: 42, type: "success" },
    { label: "Supplier Risk", count: 8, type: "danger" },
    { label: "SLA Risk", count: 7, type: "danger" },
    { label: "Quality Warning", count: 6, type: "warning" },
    { label: "Cost Warning", count: 5, type: "warning" },
    { label: "Dependency Risk", count: 5, type: "danger" },
    { label: "Compliance Warning", count: 3, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
    { label: "Date Warning", count: 2, type: "warning" },
  ],

  procurementTrend: [
    { date: "May 1", spend: 52, pos: 3100, fillRate: 91.5, onTime: 90.0, quality: 92 },
    { date: "May 16", spend: 54, pos: 3250, fillRate: 92.1, onTime: 90.8, quality: 93 },
    { date: "Jun 1", spend: 57, pos: 3400, fillRate: 92.8, onTime: 91.4, quality: 93.5 },
    { date: "Jun 16", spend: 59, pos: 3580, fillRate: 93.5, onTime: 91.9, quality: 94 },
    { date: "Jul 1", spend: 61, pos: 3700, fillRate: 93.9, onTime: 92.2, quality: 94.5 },
    { date: "Jul 16", spend: 62.1, pos: 3760, fillRate: 94.1, onTime: 92.4, quality: 94.8 },
    { date: "Jul 31", spend: 62.8, pos: 3800, fillRate: 94.3, onTime: 92.6, quality: 95 },
  ] as ProcurementTrendPoint[],

  spendConcentration: [
    { group: "Top 1", spendPercent: 28, cumulativePercent: 28 },
    { group: "Top 5", spendPercent: 30, cumulativePercent: 58 },
    { group: "Top 10", spendPercent: 18, cumulativePercent: 76 },
    { group: "Top 20", spendPercent: 12, cumulativePercent: 88 },
    { group: "Remaining", spendPercent: 12, cumulativePercent: 100 },
  ] as SpendConcentrationRow[],

  supplierPerformance: [
    { supplier: "SL Botanicals Inc.", tier: "Strategic", spend: "12.4M", pos: 580, fillRate: "98.2%", onTime: "97.5%", leadTime: "7.2d", quality: "97%", contractCov: "100%", trend: "Low", status: "Active" },
    { supplier: "Lanka Packaging Co.", tier: "Preferred", spend: "8.1M", pos: 410, fillRate: "95.5%", onTime: "94.6%", leadTime: "6.4d", quality: "94%", contractCov: "98%", trend: "Low", status: "Active" },
    { supplier: "Chemicals Direct UK", tier: "Preferred", spend: "5.2M", pos: 280, fillRate: "93.1%", onTime: "91.8%", leadTime: "9.1d", quality: "90%", contractCov: "95%", trend: "Med", status: "Active" },
    { supplier: "Aura Scents Ltd.", tier: "Standard", spend: "3.8M", pos: 190, fillRate: "92.5%", onTime: "90.5%", leadTime: "8.6d", quality: "91%", contractCov: "92.1%", trend: "Med", status: "Monitor" },
    { supplier: "Island Glassworks", tier: "New", spend: "2.1M", pos: 98, fillRate: "89.5%", onTime: "88.2%", leadTime: "10.5d", quality: "88%", contractCov: "90.0%", trend: "Med", status: "Monitor" },
  ] as SupplierPerformanceRow[],

  procurementFlow: [
    { step: "Demand", count: "4,210", delay: "" },
    { step: "PR", count: "4,100", delay: "-12%" },
    { step: "Supplier Selection", count: "3,950", delay: "-9%" },
    { step: "PO Created", count: "3,842", delay: "-8%" },
    { step: "Confirmed", count: "3,710", delay: "-6%" },
    { step: "Dispatched", count: "3,580", delay: "-5%" },
    { step: "Unloaded", count: "3,510", delay: "-5%" },
    { step: "Received", count: "3,410", delay: "-3%" },
  ],

  priceVariance: [
    { label: "Procurement Spend (LKR)", value: "62.8M" },
    { label: "Budgeted Spend (LKR)", value: "61.2M" },
    { label: "Variance (LKR)", value: "+ 1.6M (+2.6%)" },
    { label: "PPV (vs Budget)", value: "+ 2.1%" },
    { label: "Supplier Price Increase", value: "+ 1.8%" },
    { label: "Freight Impact", value: "+ 0.6%" },
    { label: "Volume Impact", value: "- 0.3%" },
  ],

  costBridge: [
    { name: "Budget", value: 61.2, displayValue: "61.2M", type: "base" },
    { name: "Price", value: 1.6, displayValue: "+1.6M", type: "increase" },
    { name: "Volume", value: 0.7, displayValue: "+0.7M", type: "increase" },
    { name: "Freight", value: 0.2, displayValue: "+0.2M", type: "increase" },
    { name: "Rebates", value: -0.4, displayValue: "-0.4M", type: "decrease" },
    { name: "Other", value: -0.5, displayValue: "-0.5M", type: "decrease" },
    { name: "Actual", value: 62.8, displayValue: "62.8M", type: "total" },
  ] as WaterfallStepData[],

  costPerformance: [
    { supplier: "SL Botanicals Inc.", currentCost: 1185, priorCost: 1160, variance: "+2.2%", freightImpact: "0.3%", ppvImpact: "0.1%", totalImpact: "+2.6%", status: "Up" },
    { supplier: "Lanka Packaging Co.", currentCost: 792, priorCost: 775, variance: "+2.2%", freightImpact: "0.2%", ppvImpact: "-0.1%", totalImpact: "+2.3%", status: "Up" },
    { supplier: "Chemicals Direct UK", currentCost: 1102, priorCost: 1078, variance: "+2.2%", freightImpact: "0.4%", ppvImpact: "0.1%", totalImpact: "+2.7%", status: "Up" },
    { supplier: "Aura Scents Ltd.", currentCost: 1685, priorCost: 1650, variance: "+2.1%", freightImpact: "0.3%", ppvImpact: "0.0%", totalImpact: "+2.4%", status: "Up" },
    { supplier: "Island Glassworks", currentCost: 821, priorCost: 810, variance: "+1.4%", freightImpact: "0.1%", ppvImpact: "-0.1%", totalImpact: "+1.4%", status: "Up" },
  ] as CostPerformanceRow[],

  qualityReasons: [
    { name: "Product Defect", value: 34, color: "#dc2626" },
    { name: "Packaging Damage", value: 28, color: "#d97706" },
    { name: "Spec Deviation", value: 16, color: "#2563eb" },
    { name: "Labelling Error", value: 12, color: "#7c3aed" },
    { name: "Contamination", value: 6, color: "#059669" },
    { name: "Expired Material", value: 4, color: "#64748b" },
  ] as QualityReasonDonutPoint[],

  fulfilmentMetrics: [
    { metric: "Fill Rate", value: "94.3%", vsPrior: "+ 1.2pp", isPositive: true },
    { metric: "On-Time Supply", value: "92.6%", vsPrior: "+ 0.8pp", isPositive: true },
    { metric: "Complete Delivery", value: "88.1%", vsPrior: "+ 1.5pp", isPositive: true },
    { metric: "Partial Delivery", value: "5.3%", vsPrior: "- 0.4pp", isPositive: true },
    { metric: "Late Delivery", value: "4.8%", vsPrior: "- 0.3pp", isPositive: true },
    { metric: "Cancelled Supply", value: "1.2%", vsPrior: "- 0.1pp", isPositive: true },
  ] as FulfilmentMetricRow[],

  dependencyData: [
    { productCategory: "Vitamin C Serum", primarySupplier: "SL Botanicals Inc.", altSuppliers: 2, share: "100%", leadTime: "28 days", spendExposure: "1.9M", risk: "High", status: "High" },
    { productCategory: "Glass Moisturizer", primarySupplier: "Aura Scents Ltd.", altSuppliers: 1, share: "100%", leadTime: "18 days", spendExposure: "3.1M", risk: "High", status: "High" },
    { productCategory: "Luxury Lipstick", primarySupplier: "Chemicals Direct UK", altSuppliers: 2, share: "80%", leadTime: "22 days", spendExposure: "2.6M", risk: "Med", status: "Monitor" },
    { productCategory: "Hair Growth Oil", primarySupplier: "SL Botanicals Inc.", altSuppliers: 1, share: "90%", leadTime: "30 days", spendExposure: "2.3M", risk: "Med", status: "Monitor" },
    { productCategory: "Glass Bottle 30ml", primarySupplier: "Island Glassworks", altSuppliers: 2, share: "75%", leadTime: "25 days", spendExposure: "2.9M", risk: "Med", status: "Monitor" },
  ] as DependencyRow[],

  concentrationMatrix: [
    { x: 12.4, y: 15, z: 450, name: "SL Botanicals Inc.", category: "Strategic Critical" },
    { x: 8.1, y: 22, z: 380, name: "Lanka Packaging Co.", category: "High Risk" },
    { x: 5.2, y: 35, z: 290, name: "Chemicals Direct UK", category: "High Risk" },
    { x: 3.8, y: 48, z: 210, name: "Aura Scents Ltd.", category: "Low Risk" },
    { x: 2.1, y: 62, z: 150, name: "Island Glassworks", category: "Low Risk" },
  ] as ConcentrationMatrixPoint[],

  contractAnalytics: [
    { label: "Active Contracts", value: "96" },
    { label: "Expiring <= 30 Days", value: "18" },
    { label: "Expiring <= 90 Days", value: "35" },
    { label: "Contract Spend Coverage", value: "96%" },
    { label: "Early Payment Discounts", value: "82%" },
  ],

  paymentTermsAnalytics: [
    { label: "Net 30 Days", value: "28%" },
    { label: "Net 60 Days", value: "41%" },
    { label: "Net 90 Days", value: "31%" },
    { label: "Early Payment Discount", value: "19%" },
    { label: "Rebate Coverage", value: "62%" },
  ],

  supplierRiskPortfolio: [
    { riskType: "Operational Risk", low: 62, medium: 18, high: 14, critical: 2 },
    { riskType: "Quality Risk", low: 58, medium: 22, high: 12, critical: 4 },
    { riskType: "Compliance Risk", low: 71, medium: 15, high: 8, critical: 2 },
    { riskType: "Cost Risk", low: 41, medium: 32, high: 19, critical: 4 },
    { riskType: "Continuity Risk", low: 57, medium: 24, high: 11, critical: 4 },
  ] as SupplierRiskRow[],

  cohortData: [
    { cohort: "2022-Q1", m0: 100, m1: 94, m2: 91, m3: 88, m4: 85, m5: 82, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
    { cohort: "2022-Q3", m0: 100, m1: 92, m2: 88, m3: 85, m4: 81, m5: 78, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
    { cohort: "2023-Q1", m0: 100, m1: 95, m2: 92, m3: 89, m4: 86, m5: 84, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
    { cohort: "2023-Q3", m0: 100, m1: 91, m2: 86, m3: 82, m4: 78, m5: 75, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
    { cohort: "2024-Q1", m0: 100, m1: 96, m2: 94, m3: 91, m4: 88, m5: 86, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0, m11: 0, m12: 0 },
  ],

  supplierMovement: [
    { label: "Active", count: 42 },
    { label: "Growing", count: 76 },
    { label: "Stable", count: 28 },
    { label: "Declining", count: 14 },
    { label: "At Risk", count: 12 },
    { label: "Dormant", count: 14 },
  ],

  procurementForecast: [
    { metric: "Procurement Spend", forecast: "65.4M", vsOverall: "+ 4.1%", target: "64.0M", variance: "+ 1.4M", expectedState: "Above Target", isPositive: true },
    { metric: "Avg Fill Rate", forecast: "94.8%", vsOverall: "+ 0.5pp", target: "95.0%", variance: "- 0.2pp", expectedState: "Near Target", isPositive: true },
    { metric: "On-Time Supply", forecast: "93.1%", vsOverall: "+ 0.5pp", target: "93.5%", variance: "- 0.4pp", expectedState: "Near Target", isPositive: true },
    { metric: "Avg Lead Time", forecast: "8.2d", vsOverall: "- 0.2d", target: "8.0d", variance: "+ 0.2d", expectedState: "Near Target", isPositive: true },
    { metric: "Quality Score", forecast: "95.5%", vsOverall: "+ 0.5pp", target: "95.0%", variance: "+ 0.5pp", expectedState: "Above Target", isPositive: true },
  ] as ProcurementForecastRow[],

  priorityInsights: [
    { id: "pi1", insight: "Top five suppliers account for 58% of procurement spend", impact: "High" },
    { id: "pi2", insight: "Three strategic suppliers drive most of the price increases", impact: "High" },
    { id: "pi3", insight: "824 products have elevated single-source dependency", impact: "High" },
    { id: "pi4", insight: "Twelve suppliers trending above contracted lead time", impact: "Medium" },
    { id: "pi5", insight: "Overall supplier defect rate improved to 1.8%", impact: "Medium" },
  ],

  underlyingPoRecords: [
    { poNumber: "PO-36001", supplier: "SL Botanicals Inc.", supplierCode: "SUP-00184", product: "Vitamin C Serum 30ml", category: "Skincare", quantity: 5000, unitCost: 1240, poValue: 6200000, contractPrice: 1200, priceVariance: "+3.33%", orderDate: "May 10, 2026", expectedDate: "May 20, 2026", receiptDate: "May 19, 2026", leadTime: "9d", fillRate: "100%", qaStatus: "Pass", compliance: "Compliant", paymentTerms: "45 Days", risk: "Low", completed: "Completed", paymentSource: "Enterprise Ledger", owner: "Priya M.", lastUpdated: "May 20, 2026", status: "Completed", action: "Open Source Record" },
    { poNumber: "PO-36002", supplier: "Lanka Packaging Co.", supplierCode: "SUP-00211", product: "Glass Bottle 50ml", category: "Packaging", quantity: 15000, unitCost: 320, poValue: 4800000, contractPrice: 310, priceVariance: "+3.23%", orderDate: "May 12, 2026", expectedDate: "May 25, 2026", receiptDate: "May 26, 2026", leadTime: "14d", fillRate: "98%", qaStatus: "Pass", compliance: "Compliant", paymentTerms: "30 Days", risk: "Low", completed: "Completed", paymentSource: "Enterprise Ledger", owner: "Rahul R.", lastUpdated: "May 26, 2026", status: "Completed", action: "Open Source Record" },
    { poNumber: "PO-36003", supplier: "Chemicals Direct UK", supplierCode: "SUP-00087", product: "Hyaluronic Acid Raw", category: "Raw Materials", quantity: 2000, unitCost: 4100, poValue: 8200000, contractPrice: 4000, priceVariance: "+2.50%", orderDate: "May 14, 2026", expectedDate: "May 30, 2026", receiptDate: "May 31, 2026", leadTime: "17d", fillRate: "95%", qaStatus: "Pass", compliance: "Compliant", paymentTerms: "60 Days", risk: "Med", completed: "Completed", paymentSource: "Enterprise Ledger", owner: "Nimal D.", lastUpdated: "May 31, 2026", status: "Completed", action: "Open Source Record" },
    { poNumber: "PO-36004", supplier: "Aura Scents Ltd.", supplierCode: "SUP-00342", product: "Lavender Essential Oil", category: "Fragrance", quantity: 1200, unitCost: 6800, poValue: 8160000, contractPrice: 6650, priceVariance: "+2.26%", orderDate: "May 17, 2026", expectedDate: "Jun 02, 2026", receiptDate: "Jun 02, 2026", leadTime: "16d", fillRate: "97%", qaStatus: "Pass", compliance: "Compliant", paymentTerms: "30 Days", risk: "Low", completed: "Completed", paymentSource: "Enterprise Ledger", owner: "Manesh R.", lastUpdated: "Jun 02, 2026", status: "Completed", action: "Open Source Record" },
    { poNumber: "PO-36005", supplier: "Island Glassworks", supplierCode: "SUP-00125", product: "Amber Jar 100ml", category: "Packaging", quantity: 8000, unitCost: 420, poValue: 3360000, contractPrice: 410, priceVariance: "+2.44%", orderDate: "May 20, 2026", expectedDate: "Jun 05, 2026", receiptDate: "Jun 07, 2026", leadTime: "18d", fillRate: "92%", qaStatus: "Hold", compliance: "Warning", paymentTerms: "30 Days", risk: "High", completed: "Pending", paymentSource: "Enterprise Ledger", owner: "Sanjeev D.", lastUpdated: "Jun 07, 2026", status: "Open Sound", action: "Open Source Record" },
  ] as UnderlyingPoRecord[],

  healthRail: {
    healthScore: 95,
    label: "Healthy",
    supplierSummary: {
      activeSuppliers: "186",
      strategicSuppliers: "24",
      preferredSuppliers: "62",
      atRiskSuppliers: "14",
      restrictedSuppliers: "3",
    },
    procurementSummary: {
      spend: "62.8M",
      spendDelta: "+ 5.4%",
      purchaseOrders: "3,842",
      ordersDelta: "+ 6.1%",
      ppvVsBudget: "+ 2.1%",
      avgLeadTime: "8.4d",
    },
    performanceSummary: {
      fillRate: "94.3%",
      fillDelta: "+ 1.2pp",
      onTimeSupply: "92.6%",
      onTimeDelta: "+ 0.8pp",
      qualityScore: "95%",
      qualityDelta: "+ 1pp",
      slaCompliance: "93.8%",
      slaDelta: "- 0.6pp",
    },
    dependencySummary: {
      singleSource: "1,284",
      multiSource: "424",
      alternateCoverage: "82%",
      spendExposure: "12.8M",
    },
    riskSummary: {
      operationalRisk: 8,
      qualityRisk: 6,
      complianceRisk: 4,
      costRisk: 5,
      continuityRisk: 3,
    },
    quickQueues: [
      { queueName: "High-Risk Suppliers", count: "14" },
      { queueName: "SLA Below Target", count: "18" },
      { queueName: "Lead-Time Risks", count: "12" },
      { queueName: "Price Variance Risks", count: "16" },
      { queueName: "Dependency Risks", count: "21" },
      { queueName: "Contract Expiry", count: "9" },
      { queueName: "Compliance Warnings", count: "7" },
    ],
  } as SupplierHealthRailData,
};
