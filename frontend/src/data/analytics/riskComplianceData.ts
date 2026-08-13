import { KpiMetricData } from "./executivePerformanceData";
import { PricePositioningItem } from "./salesRevenueData";

export interface RiskKpiData extends KpiMetricData {}

export interface RiskScorecardRow {
  domain: string;
  current: number;
  target: number;
  previous: number;
  variance: string;
  trend: "up" | "down" | "flat";
  status: "At Risk" | "Watch" | "Good";
}

export interface SafetyRecallRow {
  metric: string;
  val: string;
}

export interface PaymentRiskRow {
  channel: string;
  total: string;
  highRisk: string;
  chargebacks: string;
  fraudLoss: string;
  riskRate: string;
}

export interface ControlFailureRow {
  domain: string;
  open: number;
  critical: number;
  repeat: number;
  gt30Days: number;
  status: string;
}

export interface ForecastVsTargetRow {
  metric: string;
  forecast: string;
  target: string;
  variance: string;
}

export interface UnderlyingRiskRecord {
  reference: string;
  recordType: string;
  entityType: string;
  entity: string;
  domain: string;
  riskScore: number;
  riskLevel: "High" | "Med" | "Low";
  rulePolicy: string;
  complianceStatus: "Watch" | "Good" | "Warning" | "At Risk";
  fraudSignal: "Yes" | "No";
  control: string;
  exposure: string;
  owner: string;
  detected: string;
  age: string;
  status: "Open" | "Pending" | "Resolved";
  action: string;
}

export interface RiskComplianceHealthRailData {
  healthScore: number;
  label: string;
  subtext: string;
  enterpriseRiskSummary: {
    openRiskItems: number;
    criticalRisks: number;
    highRisks: number;
    mediumRisks: number;
    lowRisks: number;
    financialExposure: string;
  };
  complianceSummary: {
    complianceScore: string;
    openCases: number;
    pendingReviews: number;
    criticalCases: number;
    complianceSla: string;
  };
  fraudSummary: {
    fraudAlerts: number;
    confirmed: number;
    suspected: number;
    blocked: number;
    exposure: string;
  };
  productSupplierRiskSummary: {
    highRiskProducts: number;
    highRiskSellers: number;
    safetyAlerts: number;
    certificationWarnings: number;
    authenticityCases: number;
  };
  governanceSummary: {
    auditFindings: number;
    controlFailures: number;
    policyViolations: number;
    policiesOverdue: number;
    remediationOverdue: number;
  };
  quickQueues: {
    label: string;
    count: number;
    type: "danger" | "warning" | "info";
  }[];
}

export const RISK_COMPLIANCE_DATA = {
  headerMeta: {
    breadcrumb: "Analytics > Risk & Compliance",
    title: "Risk, Compliance, Fraud & Governance Analytics",
    subtitle:
      "Analyze enterprise risk exposure, compliance performance, fraud indicators, policy effectiveness, control health, regulatory issues and governance exceptions.",
  },

  connectionStatus: [
    { label: "Tenant", value: "SL Beauty" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Risk Scope", value: "Enterprise Risk" },
    { label: "Compliance Source", value: "Connected", status: "connected" },
    { label: "Customer Risk Source", value: "Connected", status: "connected" },
    { label: "Seller Risk Source", value: "Connected", status: "connected" },
    { label: "Supplier Risk Source", value: "Connected", status: "connected" },
    { label: "Payment Risk Source", value: "Connected", status: "connected" },
    { label: "Finance Control Source", value: "Connected", status: "connected" },
    { label: "Audit Source", value: "Connected", status: "connected" },
    { label: "Policy Engine", value: "Healthy", status: "success" },
    { label: "Risk Engine", value: "Healthy", status: "success" },
    { label: "Metric Governance", value: "Healthy", status: "success" },
    { label: "Data Completeness", value: "Aug 14, 2026 10:15 AM" },
    { label: "Access", value: "Assigned Scope" },
  ],

  primaryKpis: [
    {
      id: "open-risks",
      number: "1.",
      title: "Open Risk Items",
      mainValue: "184",
      trendPercentage: 6.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior Period (173)",
      sparklineData: [165, 170, 174, 178, 181, 184],
    },
    {
      id: "critical-risks",
      number: "2.",
      title: "Critical Risks",
      mainValue: "12",
      trendPercentage: 2,
      trendDirection: "up",
      isPositive: false,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (10)",
      sparklineData: [8, 9, 10, 11, 11, 12],
    },
    {
      id: "compliance-score",
      number: "3.",
      title: "Compliance Score",
      mainValue: "96%",
      trendPercentage: 1.4,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 95.0% (+1.4pp)",
      sparklineData: [94.2, 94.8, 95.1, 95.5, 95.8, 96.0],
    },
    {
      id: "high-risk-customers",
      number: "4.",
      title: "High-Risk Customers",
      mainValue: "42",
      trendPercentage: 3,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (45)",
      sparklineData: [48, 46, 45, 44, 43, 42],
    },
    {
      id: "high-risk-sellers",
      number: "5.",
      title: "High-Risk Sellers",
      mainValue: "14",
      trendPercentage: 2,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (16)",
      sparklineData: [18, 17, 16, 15, 15, 14],
    },
    {
      id: "high-risk-products",
      number: "6.",
      title: "High-Risk Products",
      mainValue: "23",
      trendPercentage: 1,
      trendDirection: "up",
      isPositive: false,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (22)",
      sparklineData: [20, 21, 21, 22, 22, 23],
    },
    {
      id: "fraud-alerts",
      number: "7.",
      title: "Fraud Alerts",
      mainValue: "31",
      trendPercentage: 4,
      trendDirection: "up",
      isPositive: false,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (27)",
      sparklineData: [24, 25, 27, 28, 30, 31],
    },
    {
      id: "policy-violations",
      number: "8.",
      title: "Policy Violations",
      mainValue: "18",
      trendPercentage: 3,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "",
      comparisonLabel: "vs. Prior Period (21)",
      sparklineData: [25, 23, 21, 20, 19, 18],
    },
  ] as RiskKpiData[],

  secondaryKpis: [
    { id: "compliance-cases", title: "Compliance Cases", mainValue: "146", sparklineData: [130, 135, 138, 142, 144, 146] },
    { id: "document-warnings", title: "Document Warnings", mainValue: "28", sparklineData: [34, 32, 31, 30, 29, 28] },
    { id: "expiring-certs", title: "Expiring Certifications", mainValue: "32", sparklineData: [26, 28, 29, 30, 31, 32] },
    { id: "safety-alerts", title: "Recall / Safety Alerts", mainValue: "3", sparklineData: [5, 4, 4, 3, 3, 3] },
    { id: "restricted-entities", title: "Restricted Entities", mainValue: "18", sparklineData: [15, 16, 17, 17, 18, 18] },
    { id: "control-failures", title: "Unresolved Control Failures", mainValue: "6", sparklineData: [9, 8, 7, 7, 6, 6] },
    { id: "financial-exposure", title: "Financial Exposure", mainValue: "LKR 6.8M", sparklineData: [7.5, 7.2, 7.0, 6.9, 6.8, 6.8] },
  ],

  analyticsHealthKpi: {
    score: 95,
    label: "Very Good",
    subtext: "2 pts vs prior period",
  },

  tabs: [
    "Risk Overview",
    "Enterprise Risk",
    "Compliance",
    "Customer Risk",
    "Seller Risk",
    "Supplier Risk",
    "Product Risk",
    "Fraud",
    "Transactions",
    "Payments",
    "Safety & Recall",
    "Authenticity",
    "Policy Violations",
    "Controls",
    "Governance",
    "Audit Findings",
    "Remediation",
    "Forecast",
    "Exceptions",
    "Underlying Data",
  ],

  readinessStrip: [
    { label: "Healthy", count: 54, type: "success" },
    { label: "Critical Risk", count: 12, type: "danger" },
    { label: "Compliance Warning", count: 9, type: "warning" },
    { label: "Fraud Warning", count: 7, type: "warning" },
    { label: "Policy Warning", count: 6, type: "warning" },
    { label: "Control Failure", count: 6, type: "danger" },
    { label: "Audit Warning", count: 5, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  enterpriseRiskTrendData: [
    { date: "Jul 16", openRisks: 165, criticalRisks: 8, complianceScore: 94.2, fraudAlerts: 24, policyViolations: 25 },
    { date: "Jul 23", openRisks: 170, criticalRisks: 9, complianceScore: 94.8, fraudAlerts: 25, policyViolations: 23 },
    { date: "Jul 30", openRisks: 174, criticalRisks: 10, complianceScore: 95.1, fraudAlerts: 27, policyViolations: 21 },
    { date: "Aug 06", openRisks: 178, criticalRisks: 11, complianceScore: 95.5, fraudAlerts: 28, policyViolations: 20 },
    { date: "Aug 13", openRisks: 184, criticalRisks: 12, complianceScore: 96.0, fraudAlerts: 31, policyViolations: 18 },
  ],

  riskCompositionData: [
    { name: "Customer", value: 22, color: "#2563eb" },
    { name: "Seller", value: 16, color: "#16a34a" },
    { name: "Supplier", value: 14, color: "#ea580c" },
    { name: "Product", value: 10, color: "#9333ea" },
    { name: "Transaction", value: 9, color: "#0284c7" },
    { name: "Finance", value: 8, color: "#475569" },
    { name: "Logistics", value: 6, color: "#ca8a04" },
    { name: "Compliance", value: 5, color: "#0d9488" },
    { name: "Support", value: 5, color: "#e11d48" },
    { name: "Data / Governance", value: 5, color: "#64748b" },
  ],

  riskScorecardData: [
    { domain: "Customer Risk", current: 74, target: 85, previous: 71, variance: "LKR 1.3M", trend: "up", status: "At Risk" },
    { domain: "Seller Risk", current: 78, target: 85, previous: 76, variance: "LKR 1.1M", trend: "down", status: "Watch" },
    { domain: "Supplier Risk", current: 68, target: 80, previous: 65, variance: "LKR 0.9M", trend: "up", status: "Watch" },
    { domain: "Product Risk", current: 82, target: 85, previous: 80, variance: "LKR 0.8M", trend: "up", status: "Good" },
    { domain: "Transaction Risk", current: 73, target: 85, previous: 74, variance: "LKR 0.7M", trend: "down", status: "Good" },
    { domain: "Finance Risk", current: 67, target: 80, previous: 65, variance: "LKR 0.7M", trend: "up", status: "Good" },
    { domain: "Logistics Risk", current: 75, target: 85, previous: 72, variance: "LKR 0.6M", trend: "up", status: "Good" },
    { domain: "Payment Risk", current: 71, target: 85, previous: 73, variance: "LKR 0.5M", trend: "down", status: "Watch" },
    { domain: "Compliance Risk", current: 76, target: 85, previous: 74, variance: "LKR 0.4M", trend: "up", status: "Good" },
    { domain: "Governance Risk", current: 66, target: 80, previous: 65, variance: "LKR 0.3M", trend: "up", status: "Watch" },
  ] as RiskScorecardRow[],

  riskConcentrationData: [
    { tier: "Top Customers", priceVsMarket: "26%", skuPercent: 88 },
    { tier: "Top Sellers", priceVsMarket: "22%", skuPercent: 74 },
    { tier: "Top Products", priceVsMarket: "16%", skuPercent: 54 },
    { tier: "Safety Alerts", priceVsMarket: "14%", skuPercent: 47 },
    { tier: "Top Payment Channels", priceVsMarket: "12%", skuPercent: 40 },
    { tier: "Top Regions", priceVsMarket: "10%", skuPercent: 34 },
  ] as PricePositioningItem[],

  customerRiskPortfolio: [
    { label: "High-Risk Customers", count: "42", isRose: true },
    { label: "Restricted Customers", count: "18", isRose: true },
    { label: "Fraud-Suspected", count: "26", isRose: true },
    { label: "Chargeback Risk", count: "14", isRose: true },
    { label: "Abuse Risk", count: "12", isRose: true },
    { label: "Refund Risk", count: "16", isRose: true },
  ],

  sellerRiskPortfolio: [
    { label: "High-Risk Sellers", count: "26", isRose: true },
    { label: "Policy Violations", count: "46", isRose: true },
    { label: "Listing Violations", count: "34", isRose: true },
    { label: "Commission Exceptions", count: "12", isRose: true },
    { label: "Fulfilment Risk", count: "19", isRose: true },
    { label: "Complaint Risk", count: "15", isRose: true },
  ],

  supplierRiskPortfolio: [
    { label: "High-Risk", count: "14", isRose: true },
    { label: "Quality Risk File", count: "24", isRose: true },
    { label: "Compliance Risk", count: "16", isRose: true },
    { label: "Dependency Risk", count: "15", isRose: true },
    { label: "Continuity Risk", count: "8", isRose: true },
    { label: "Contract Risk", count: "12", isRose: true },
  ],

  productRiskPortfolio: [
    { label: "High-Risk Products", count: "23", isRose: true },
    { label: "Restricted Products", count: "17", isRose: true },
    { label: "Safety Warning", count: "9", isRose: true },
    { label: "Certification Risk", count: "32", isRose: true },
    { label: "Authenticity Risk", count: "11", isRose: true },
    { label: "Quality Risk", count: "20", isRose: true },
  ],

  authenticityData: [
    { name: "Authenticity Cases", value: 42, color: "#2563eb" },
    { name: "Confirmed Counterfeit", value: 11, color: "#e11d48" },
    { name: "Suspected Counterfeit", value: 23, color: "#ea580c" },
    { name: "Seller Links", value: 16, color: "#16a34a" },
    { name: "Supplier Links", value: 13, color: "#9333ea" },
  ],
  authenticityExposure: "LKR 1.2M",

  productSafetyRecall: [
    { metric: "Open Safety Cases", val: "8" },
    { metric: "Critical Safety Cases", val: "3" },
    { metric: "Safety Complaints", val: "21" },
    { metric: "Secret Candidates", val: "1" },
    { metric: "Active Recalls", val: "3" },
    { metric: "Units Affected", val: "1,240" },
  ] as SafetyRecallRow[],

  policyViolationsTypes: [
    { tier: "Listing Misrepresentation", priceVsMarket: "248", skuPercent: 88 },
    { tier: "Restricted Product", priceVsMarket: "176", skuPercent: 63 },
    { tier: "Pricing Abuse", priceVsMarket: "156", skuPercent: 55 },
    { tier: "Counterfeit Risk", priceVsMarket: "132", skuPercent: 47 },
    { tier: "Customer Abuse", priceVsMarket: "94", skuPercent: 33 },
    { tier: "Missing Documentation", priceVsMarket: "64", skuPercent: 23 },
    { tier: "Promotional Abuse", priceVsMarket: "48", skuPercent: 17 },
  ] as PricePositioningItem[],

  fraudAnalytics: {
    fraudAlerts: "31",
    alertsTrend: "+4",
    confirmed: "8",
    blocked: "22",
    exposure: "LKR 2.4M",
    prevented: "LKR 4.3M",
    falsePositives: "6%",
  },

  fraudTrendData: [
    { date: "Jul 16", alerts: 24, confirmed: 6, blocked: 18, exposure: 1.8 },
    { date: "Jul 23", alerts: 25, confirmed: 7, blocked: 19, exposure: 2.0 },
    { date: "Jul 30", alerts: 27, confirmed: 7, blocked: 20, exposure: 2.1 },
    { date: "Aug 06", alerts: 28, confirmed: 8, blocked: 21, exposure: 2.2 },
    { date: "Aug 13", alerts: 31, confirmed: 8, blocked: 22, exposure: 2.4 },
  ],

  transactionRisk: {
    evaluated: "18.4K",
    highRisk: "1.2K",
    challenged: "842",
    blocked: "512",
    approvedAfterReview: "651",
    fraudLoss: "LKR 0.74M",
    preventedExposure: "LKR 4.3M",
    falsePositiveRate: "6%",
  },

  paymentRiskPerformance: [
    { channel: "Card", total: "6.2K", highRisk: "412", chargebacks: "23", fraudLoss: "LKR 0.4M", riskRate: "6.6%" },
    { channel: "Wallet", total: "3.6K", highRisk: "238", chargebacks: "16", fraudLoss: "LKR 0.2M", riskRate: "6.6%" },
    { channel: "Bank Transfer", total: "2.1K", highRisk: "156", chargebacks: "8", fraudLoss: "LKR 0.1M", riskRate: "7.4%" },
    { channel: "COD", total: "3.4K", highRisk: "212", chargebacks: "21", fraudLoss: "LKR 0.1M", riskRate: "6.2%" },
    { channel: "Marketplace", total: "2.9K", highRisk: "184", chargebacks: "14", fraudLoss: "LKR 0.1M", riskRate: "6.3%" },
  ] as PaymentRiskRow[],

  policyExposureSummary: {
    potentialExposure: "LKR 6.8M",
    preventedExposure: "LKR 4.3M",
    realizedLoss: "LKR 1.2M",
  },

  controlEffectiveness: [
    { tier: "Identity Verification", priceVsMarket: "93%", skuPercent: 93 },
    { tier: "Product Verification", priceVsMarket: "92%", skuPercent: 92 },
    { tier: "Supplier Verification", priceVsMarket: "90%", skuPercent: 90 },
    { tier: "Payment Controls", priceVsMarket: "91%", skuPercent: 91 },
    { tier: "Refund Controls", priceVsMarket: "90%", skuPercent: 90 },
    { tier: "Logistics Controls", priceVsMarket: "89%", skuPercent: 89 },
    { tier: "Listing Controls", priceVsMarket: "94%", skuPercent: 94 },
    { tier: "Data Access Controls", priceVsMarket: "89%", skuPercent: 89 },
    { tier: "Approval Controls", priceVsMarket: "90%", skuPercent: 90 },
  ] as PricePositioningItem[],

  controlFailures: [
    { domain: "Payment Controls", open: 6, critical: 2, repeat: 1, gt30Days: 12, status: "LKR 0.4M" },
    { domain: "Supplier Controls", open: 5, critical: 1, repeat: 1, gt30Days: 9, status: "LKR 0.3M" },
    { domain: "Listing Controls", open: 3, critical: 1, repeat: 1, gt30Days: 8, status: "LKR 0.2M" },
    { domain: "Settlement Controls", open: 4, critical: 1, repeat: 1, gt30Days: 5, status: "LKR 0.2M" },
    { domain: "Seller Governance", open: 3, critical: 1, repeat: 1, gt30Days: 7, status: "LKR 0.3M" },
    { domain: "Data Governance", open: 3, critical: 1, repeat: 1, gt30Days: 5, status: "LKR 0.1M" },
  ] as ControlFailureRow[],

  emergingRisksCount: 7,
  emergingRisksDonut: [
    { name: "Critical", value: 2, color: "#ef4444" },
    { name: "High", value: 3, color: "#f97316" },
    { name: "Medium", value: 2, color: "#eab308" },
    { name: "Low", value: 1, color: "#22c55e" },
  ],
  emergingRisksBreakdown: [
    { label: "Critical", count: 2, velocity: "+2.3", color: "#ef4444", velocityColor: "text-red-500" },
    { label: "High", count: 3, velocity: "+1.8", color: "#ef4444", velocityColor: "text-red-500" },
    { label: "Medium", count: 2, velocity: "+1.6", color: "#eab308", velocityColor: "text-amber-500" },
    { label: "Low", count: 1, velocity: "+1.2", color: "#22c55e", velocityColor: "text-emerald-600" },
  ],

  enterpriseRiskForecastData: [
    { date: "Aug 15", openRisks: 184, criticalRisks: 12, fraudAlerts: 31, policyViolations: 18 },
    { date: "Aug 22", openRisks: 180, criticalRisks: 11, fraudAlerts: 29, policyViolations: 17 },
    { date: "Aug 29", openRisks: 175, criticalRisks: 10, fraudAlerts: 28, policyViolations: 16 },
    { date: "Sep 05", openRisks: 170, criticalRisks: 9, fraudAlerts: 26, policyViolations: 15 },
    { date: "Sep 12", openRisks: 165, criticalRisks: 8, fraudAlerts: 25, policyViolations: 14 },
  ],

  forecastVsTarget: [
    { metric: "Compliance Score", forecast: "96.5%", target: "97%", variance: "-0.5pp" },
    { metric: "Critical Risks", forecast: "10", target: "8", variance: "+2" },
    { metric: "Fraud Alerts", forecast: "28", target: "25", variance: "+3" },
    { metric: "Policy Violations", forecast: "15", target: "12", variance: "+3" },
    { metric: "Control Failures", forecast: "5", target: "4", variance: "+1" },
    { metric: "Audit Findings", forecast: "6", target: "5", variance: "+1" },
  ] as ForecastVsTargetRow[],

  priorityInsights: [
    { category: "Product Safety", detail: "3 critical safety alerts need review" },
    { category: "Supplier Compliance", detail: "2 suppliers near expiry window" },
    { category: "Fraud", detail: "Card fraud increasing in 1 channel" },
    { category: "Governance", detail: "6 policies overdue for review" },
    { category: "Remediation", detail: "Medium-risk backlog rising" },
  ],

  underlyingRecords: [
    { reference: "RISK-2026-000125", recordType: "Risk Case", entityType: "Supplier", entity: "Luxe Naturals Pvt Ltd", domain: "Supplier", riskScore: 82, riskLevel: "High", rulePolicy: "Certification Expiry Warning", complianceStatus: "Watch", fraudSignal: "No", control: "Supplier Verification", exposure: "LKR 0.8M", owner: "Priya Fernando", detected: "Aug 14, 10:15 AM", age: "2d", status: "Open", action: "View" },
    { reference: "RISK-2026-000126", recordType: "Fraud Alert", entityType: "Customer", entity: "CUST-98421", domain: "Payment", riskScore: 76, riskLevel: "High", rulePolicy: "Card Fraud Signal", complianceStatus: "Watch", fraudSignal: "Yes", control: "Payment Verification", exposure: "LKR 0.4M", owner: "Raj Menon", detected: "Aug 14, 09:40 AM", age: "2d", status: "Pending", action: "View" },
    { reference: "RISK-2026-000127", recordType: "Fraud Finding", entityType: "Product", entity: "FaceGlow Serum", domain: "Product", riskScore: 63, riskLevel: "Med", rulePolicy: "Document Missing", complianceStatus: "Good", fraudSignal: "No", control: "Product Verification", exposure: "LKR 0.2M", owner: "Nimal De Silva", detected: "Aug 13, 05:20 PM", age: "3d", status: "Pending", action: "View" },
    { reference: "RISK-2026-000128", recordType: "Audit Finding", entityType: "Process", entity: "Absa SL Beauty", domain: "Governance", riskScore: 58, riskLevel: "Med", rulePolicy: "Access Review Gap", complianceStatus: "Warning", fraudSignal: "No", control: "Access Controls", exposure: "LKR 0.1M", owner: "Sanath Perera", detected: "Aug 13, 02:10 PM", age: "3d", status: "Open", action: "View" },
    { recordType: "Policy Violation", entityType: "Seller", entity: "Seller-7732", domain: "Marketplace", riskScore: 84, riskLevel: "High", rulePolicy: "Listing Misrepresentation", complianceStatus: "At Risk", fraudSignal: "No", control: "Listing Controls", exposure: "LKR 0.5M", owner: "Razka Ismail", detected: "Aug 13, 11:30 AM", age: "3d", status: "Open", action: "View", reference: "RISK-2026-000129" },
  ] as UnderlyingRiskRecord[],

  healthRailData: {
    healthScore: 95,
    label: "Very Good",
    subtext: "2 pts vs prior period",
    enterpriseRiskSummary: {
      openRiskItems: 184,
      criticalRisks: 12,
      highRisks: 36,
      mediumRisks: 62,
      lowRisks: 54,
      financialExposure: "LKR 6.8M",
    },
    complianceSummary: {
      complianceScore: "96%",
      openCases: 146,
      pendingReviews: 28,
      criticalCases: 12,
      complianceSla: "98%",
    },
    fraudSummary: {
      fraudAlerts: 31,
      confirmed: 8,
      suspected: 23,
      blocked: 42,
      exposure: "LKR 2.4M",
    },
    productSupplierRiskSummary: {
      highRiskProducts: 23,
      highRiskSellers: 14,
      safetyAlerts: 3,
      certificationWarnings: 32,
      authenticityCases: 11,
    },
    governanceSummary: {
      auditFindings: 7,
      controlFailures: 6,
      policyViolations: 18,
      policiesOverdue: 9,
      remediationOverdue: 5,
    },
    quickQueues: [
      { label: "Critical Risks", count: 12, type: "danger" as const },
      { label: "High-Risk Customers", count: 42, type: "warning" as const },
      { label: "High-Risk Suppliers", count: 14, type: "warning" as const },
      { label: "High-Risk Products", count: 23, type: "warning" as const },
      { label: "Fraud Alerts", count: 31, type: "danger" as const },
      { label: "Policy Violations", count: 18, type: "warning" as const },
      { label: "Certification Expiry", count: 32, type: "warning" as const },
      { label: "Audit Findings", count: 7, type: "warning" as const },
    ],
  } as RiskComplianceHealthRailData,
};
