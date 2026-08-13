import { KpiMetricData } from "./executivePerformanceData";

export interface ProductKpi extends KpiMetricData {
  vsPreviousLabel?: string;
}

export interface CategoryPerformanceDonutPoint {
  name: string;
  value: number;
  color: string;
}

export interface BrandMatrixPoint {
  x: number;
  y: number;
  z: number;
  name: string;
}

export interface ParetoRow {
  group: string;
  percent: number;
}

export interface SkuVariantRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface AssortmentHealthRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface CatalogueQualityRow {
  dimension: string;
  score: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface PricingMarginRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface InventoryProductivityRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface ReturnsAnalyticsRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface RatingsReviewsRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface LifecycleRow {
  stage: string;
  products: string;
  percentOfTotal: string;
  vsPrior: string;
  isPositive?: boolean;
}

export interface NewProductRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface SupplierDependencyRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface ComplianceRow {
  metric: string;
  value: string;
  vsPrior: string;
  benchmark: string;
  isPositive?: boolean;
}

export interface ExceptionIssueRow {
  issue: string;
  products: number;
  vsPrior: string;
  isPositive?: boolean;
}

export interface ForecastSnapshotRow {
  metric: string;
  value: string;
  vsPrior: string;
  isPositive?: boolean;
}

export interface RiskIndicatorRow {
  indicator: string;
  level: "High" | "Medium" | "Low";
  vsPrior: string;
  isPositive?: boolean;
}

export interface ProductHealthRailData {
  healthScore: number;
  label: string;
  productSummary: {
    totalProducts: string;
    productsDelta: string;
    activeProducts: string;
    activeDelta: string;
    newProducts: string;
    newDelta: string;
    discontinued: string;
    discontinuedDelta: string;
  };
  performanceSummary: {
    productRevenue: string;
    revenueDelta: string;
    grossProfit: string;
    profitDelta: string;
    avgMargin: string;
    marginDelta: string;
    conversionRate: string;
    convDelta: string;
    returnRate: string;
    returnDelta: string;
  };
  catalogueSummary: {
    quality: string;
    qualityDelta: string;
    completeness: string;
    compDelta: string;
    imageCoverage: string;
    imgDelta: string;
    dataConsistency: string;
    dataDelta: string;
  };
  inventorySummary: {
    turnover: string;
    turnoverDelta: string;
    daysOfInventory: string;
    daysDelta: string;
    stockOutRate: string;
    stockOutDelta: string;
  };
  riskSummary: {
    atRiskProducts: number;
    atRiskDelta: string;
    marginAtRisk: number;
    marginDelta: string;
    complianceAtRisk: number;
    compDelta: string;
    qualityAtRisk: number;
    qualityDelta: string;
  };
  quickQueues: {
    queueName: string;
    count: string;
  }[];
}

export const PRODUCTS_BRANDS_DATA = {
  headerMeta: {
    title: "Product, Catalogue, Brand & Category Analytics",
    subtitle:
      "Analyze product performance, catalogue health, brand & category insights, inventory productivity and product lifecycle across the retail ecosystem.",
  },

  contextStrip: [
    { label: "Business Unit", value: "All Business Units", status: "normal" },
    { label: "Reporting Period", value: "Last 30 Days", status: "normal" },
    { label: "Comparison Period", value: "Previous 30 Days", status: "normal" },
    { label: "Brand", value: "All Brands", status: "normal" },
    { label: "Region", value: "All Regions", status: "normal" },
    { label: "Country", value: "All", status: "normal" },
    { label: "Product Scope", value: "All Products & SKUs", status: "normal" },
    { label: "Data Completeness", value: "99%", status: "success" },
    { label: "Last Data Refresh", value: "Jul 31, 2026 10:15 AM", status: "normal" },
  ],

  kpis: [
    {
      id: "active-products",
      number: "1.",
      title: "Active Products",
      mainValue: "18,420",
      trendPercentage: 8.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [16500, 16900, 17200, 17500, 17900, 18200, 18420],
    },
    {
      id: "active-skus",
      number: "2.",
      title: "Active SKUs",
      mainValue: "42,816",
      trendPercentage: 7.2,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [39000, 39800, 40500, 41200, 41900, 42400, 42816],
    },
    {
      id: "active-brands",
      number: "3.",
      title: "Active Brands",
      mainValue: "248",
      trendPercentage: 6.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [225, 230, 235, 238, 242, 245, 248],
    },
    {
      id: "categories-count",
      number: "4.",
      title: "Categories",
      mainValue: "186",
      trendPercentage: 5.1,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [170, 173, 176, 179, 181, 184, 186],
    },
    {
      id: "product-revenue",
      number: "5.",
      title: "Product Revenue",
      mainValue: "LKR 116.8M",
      trendPercentage: 8.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [102, 105, 108, 111, 113, 115, 116.8],
    },
    {
      id: "gross-margin",
      number: "6.",
      title: "Gross Margin",
      mainValue: "LKR 84.2M",
      trendPercentage: 8.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [74, 76, 78, 80, 81.5, 83, 84.2],
    },
    {
      id: "avg-margin",
      number: "7.",
      title: "Avg Margin",
      mainValue: "31.4%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [29.8, 30.1, 30.5, 30.8, 31.0, 31.2, 31.4],
    },
    {
      id: "conversion-rate",
      number: "8.",
      title: "Conversion",
      mainValue: "4.6%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [3.4, 3.6, 3.9, 4.1, 4.3, 4.5, 4.6],
    },
    {
      id: "return-rate-kpi",
      number: "9.",
      title: "Return Rate",
      mainValue: "4.2%",
      trendPercentage: -0.4,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [5.0, 4.8, 4.7, 4.5, 4.4, 4.3, 4.2],
    },
  ] as ProductKpi[],

  analyticsHealthKpi: {
    score: 96,
    maxScore: 100,
    label: "Very Good",
    subtext: "2 pts vs prev. period",
  },

  tabs: [
    "Product Overview",
    "Products",
    "Categories",
    "Brands",
    "SKUs & Variants",
    "Assortment",
    "Catalogue Quality",
    "Pricing & Margins",
    "Inventory Productivity",
    "Returns",
    "Ratings & Reviews",
    "Lifecycle",
    "New Products",
    "Supplier Dependency",
    "Compliance",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  readinessStrip: [
    { label: "Ready", count: 38, type: "success" },
    { label: "Concern", count: 6, type: "warning" },
    { label: "At Risk", count: 4, type: "danger" },
    { label: "High Risk", count: 2, type: "danger" },
    { label: "Alerts", count: 10, type: "warning" },
    { label: "Pricing Warnings", count: 14, type: "warning" },
    { label: "Inventory Issues", count: 18, type: "warning" },
    { label: "Compliance Issues", count: 7, type: "warning" },
  ],

  productTrend: [
    { date: "Jul 1", revenue: 9.8, gmv: 12.2 },
    { date: "Jul 6", revenue: 10.4, gmv: 13.0 },
    { date: "Jul 11", revenue: 10.9, gmv: 13.5 },
    { date: "Jul 16", revenue: 11.2, gmv: 13.9 },
    { date: "Jul 21", revenue: 11.4, gmv: 14.1 },
    { date: "Jul 26", revenue: 11.6, gmv: 14.4 },
    { date: "Jul 31", revenue: 11.8, gmv: 14.6 },
  ],

  categoryPerformance: [
    { name: "Skin Care", value: 28.4, color: "#2563eb" },
    { name: "Makeup", value: 22.1, color: "#800020" },
    { name: "Hair Care", value: 18.7, color: "#059669" },
    { name: "Fragrance", value: 12.6, color: "#7c3aed" },
    { name: "Bath & Body", value: 8.9, color: "#d97706" },
    { name: "Other", value: 9.3, color: "#64748b" },
  ] as CategoryPerformanceDonutPoint[],

  brandPerformanceMatrix: [
    { x: 135, y: 22, z: 450, name: "Bella Skin" },
    { x: 110, y: 18, z: 380, name: "Glow Essentials" },
    { x: 85, y: 12, z: 290, name: "Pure Bloom" },
    { x: 60, y: 8, z: 210, name: "Herbal Touch" },
    { x: 45, y: -5, z: 150, name: "Luxe Cosmetics" },
  ] as BrandMatrixPoint[],

  paretoContribution: [
    { group: "Top 10 Products", percent: 42.8 },
    { group: "Top 25 Products", percent: 66.3 },
    { group: "Top 50 Products", percent: 84.7 },
    { group: "Top 100 Products", percent: 95.2 },
    { group: "Others", percent: 4.8 },
  ] as ParetoRow[],

  skuVariantAnalytics: [
    { metric: "Total SKUs", value: "42,816", vsPrior: "+ 7.2%", benchmark: "Healthy", isPositive: true },
    { metric: "Active SKUs", value: "38,042", vsPrior: "+ 6.8%", benchmark: "Healthy", isPositive: true },
    { metric: "Out of Stock SKUs", value: "2,146", vsPrior: "- 0.6%", benchmark: "Watch", isPositive: true },
    { metric: "Low Stock SKUs", value: "1,894", vsPrior: "+ 4.3%", benchmark: "Watch", isPositive: false },
    { metric: "Avg Variants per Product", value: "2.8", vsPrior: "+ 0.22", benchmark: "Healthy", isPositive: true },
    { metric: "Orphan Variants", value: "324", vsPrior: "- 1.3%", benchmark: "Healthy", isPositive: true },
  ] as SkuVariantRow[],

  assortmentHealth: [
    { metric: "Assortment Breadth", value: "18,420", vsPrior: "+ 8.4%", benchmark: "Healthy", isPositive: true },
    { metric: "Assortment Depth", value: "2.8", vsPrior: "+ 0.2", benchmark: "Healthy", isPositive: true },
    { metric: "New Product Rate", value: "12.6%", vsPrior: "+ 1.8pp", benchmark: "Good", isPositive: true },
    { metric: "Discontinued Rate", value: "2.3%", vsPrior: "- 0.5pp", benchmark: "Good", isPositive: true },
    { metric: "Long Tail Products %", value: "24.2%", vsPrior: "+ 1.2pp", benchmark: "Watch", isPositive: false },
  ] as AssortmentHealthRow[],

  catalogueQuality: [
    { dimension: "Attribute Completeness", score: "97%", vsPrior: "+ 1pp", benchmark: "Excellent", isPositive: true },
    { dimension: "Image Coverage", score: "96%", vsPrior: "+ 2pp", benchmark: "Excellent", isPositive: true },
    { dimension: "Description Quality", score: "94%", vsPrior: "+ 2pp", benchmark: "Good", isPositive: true },
    { dimension: "Data Consistency", score: "98%", vsPrior: "+ 1pp", benchmark: "Excellent", isPositive: true },
    { dimension: "Taxonomy Accuracy", score: "95%", vsPrior: "+ 1pp", benchmark: "Good", isPositive: true },
  ] as CatalogueQualityRow[],

  pricingMarginSummary: [
    { metric: "Avg Selling Price (LKR)", value: "2,842", vsPrior: "+ 4.7%", benchmark: "Good", isPositive: true },
    { metric: "Avg Discount %", value: "18.6%", vsPrior: "+ 0.3pp", benchmark: "Watch", isPositive: false },
    { metric: "GM % (Overall)", value: "31.4%", vsPrior: "+ 0.3pp", benchmark: "Good", isPositive: true },
    { metric: "High Discount (>30%)", value: "2.8%", vsPrior: "- 0.4pp", benchmark: "Good", isPositive: true },
    { metric: "Negative Margin Items", value: "18", vsPrior: "- 2", benchmark: "Good", isPositive: true },
  ] as PricingMarginRow[],

  inventoryProductivity: [
    { metric: "Inventory Turnover", value: "6.2", vsPrior: "+ 0.6", benchmark: "Good", isPositive: true },
    { metric: "Days of Inventory", value: "41", vsPrior: "- 2", benchmark: "Good", isPositive: true },
    { metric: "GMROI", value: "3.6", vsPrior: "+ 0.3", benchmark: "Good", isPositive: true },
    { metric: "Sell-through Rate", value: "64.1%", vsPrior: "+ 1.8pp", benchmark: "Good", isPositive: true },
    { metric: "Excess Inventory %", value: "6.3%", vsPrior: "- 0.7pp", benchmark: "Watch", isPositive: true },
  ] as InventoryProductivityRow[],

  returnsAnalytics: [
    { metric: "Return Rate", value: "4.2%", vsPrior: "- 0.4pp", benchmark: "Good", isPositive: true },
    { metric: "Return Units", value: "1,842", vsPrior: "- 3.4%", benchmark: "Good", isPositive: true },
    { metric: "Return Value (LKR)", value: "5.4M", vsPrior: "- 2.7%", benchmark: "Good", isPositive: true },
    { metric: "Avg Return Days", value: "8.4", vsPrior: "+ 0.6", benchmark: "Good", isPositive: true },
    { metric: "Refund Approval Rate", value: "93.1%", vsPrior: "+ 1.2pp", benchmark: "Good", isPositive: true },
  ] as ReturnsAnalyticsRow[],

  ratingsReviews: [
    { metric: "Avg Rating", value: "4.3", vsPrior: "+ 0.1", benchmark: "Good", isPositive: true },
    { metric: "% Products Rated", value: "62.4%", vsPrior: "+ 2.2pp", benchmark: "Good", isPositive: true },
    { metric: "New Reviews", value: "18,642", vsPrior: "+ 7.6%", benchmark: "Good", isPositive: true },
    { metric: "Negative Reviews %", value: "3.2%", vsPrior: "- 0.4pp", benchmark: "Good", isPositive: true },
    { metric: "Review Response Rate", value: "80.5%", vsPrior: "+ 1.2pp", benchmark: "Good", isPositive: true },
  ] as RatingsReviewsRow[],

  lifecycleAnalytics: [
    { stage: "Introduction", products: "2,146", percentOfTotal: "11.6%", vsPrior: "+ 1.2pp", isPositive: true },
    { stage: "Growth", products: "6,842", percentOfTotal: "37.1%", vsPrior: "+ 2.7pp", isPositive: true },
    { stage: "Maturity", products: "8,962", percentOfTotal: "48.6%", vsPrior: "- 1.4pp", isPositive: false },
    { stage: "Decline", products: "470", percentOfTotal: "2.6%", vsPrior: "- 0.5pp", isPositive: true },
  ] as LifecycleRow[],

  newProductPerformance: [
    { metric: "New Products (30D)", value: "812", vsPrior: "+ 9.1%", benchmark: "Good", isPositive: true },
    { metric: "Revenue (New)", value: "6.2M", vsPrior: "+ 12.4%", benchmark: "Good", isPositive: true },
    { metric: "GM % (New)", value: "26.7%", vsPrior: "- 1.9pp", benchmark: "Watch", isPositive: false },
    { metric: "New Product Success %", value: "38.2%", vsPrior: "+ 2.6pp", benchmark: "Good", isPositive: true },
  ] as NewProductRow[],

  supplierDependency: [
    { metric: "Suppliers", value: "523", vsPrior: "+ 3.2%", benchmark: "Good", isPositive: true },
    { metric: "Single Source Products %", value: "18.6%", vsPrior: "- 0.8pp", benchmark: "Watch", isPositive: true },
    { metric: "Top Supplier Dependency", value: "74.1%", vsPrior: "- 1.1pp", benchmark: "Watch", isPositive: true },
    { metric: "At Risk Suppliers", value: "23", vsPrior: "- 2", benchmark: "Good", isPositive: true },
  ] as SupplierDependencyRow[],

  productCompliance: [
    { metric: "Compliant Products %", value: "97.6%", vsPrior: "+ 1.3pp", benchmark: "Good", isPositive: true },
    { metric: "Expiring Certifications", value: "142", vsPrior: "- 12", benchmark: "Watch", isPositive: true },
    { metric: "Restricted Products", value: "28", vsPrior: "- 6", benchmark: "Good", isPositive: true },
    { metric: "Recall Alerts", value: "3", vsPrior: "- 1", benchmark: "At Risk", isPositive: false },
  ] as ComplianceRow[],

  complianceAudit: [
    { name: "Compliant", value: 97.6, color: "#059669" },
    { name: "Expiring", value: 1.6, color: "#d97706" },
    { name: "Non-Compliant", value: 0.8, color: "#dc2626" },
  ] as CategoryPerformanceDonutPoint[],

  exceptionCenter: [
    { issue: "Missing Images", products: 312, vsPrior: "- 6.3%", isPositive: true },
    { issue: "Incomplete Attributes", products: 485, vsPrior: "- 4.1%", isPositive: true },
    { issue: "Price Anomalies", products: 196, vsPrior: "- 8.7%", isPositive: true },
    { issue: "Policy Violations", products: 92, vsPrior: "- 2.2%", isPositive: true },
  ] as ExceptionIssueRow[],

  forecastSnapshot: [
    { metric: "Revenue Forecast (LKR)", value: "152.6M", vsPrior: "+ 9.2%", isPositive: true },
    { metric: "GM Forecast (LKR)", value: "48.2M", vsPrior: "+ 8.6%", isPositive: true },
    { metric: "Top Growth Category", value: "Skin Care", vsPrior: "+ 11.3%", isPositive: true },
  ] as ForecastSnapshotRow[],

  topRiskIndicators: [
    { indicator: "Out of Stock Risk", level: "High", vsPrior: "- 0.4", isPositive: true },
    { indicator: "Low Margin Risk", level: "Medium", vsPrior: "+ 0.2", isPositive: false },
    { indicator: "Quality Risk", level: "Low", vsPrior: "- 0.3", isPositive: true },
    { indicator: "Compliance Risk", level: "Low", vsPrior: "- 0.1", isPositive: true },
  ] as RiskIndicatorRow[],

  priorityInsights: [
    { id: "pi1", insight: "Skin Care driving +11% revenue growth", impact: "High" },
    { id: "pi2", insight: "18% SKUs at risk of stockout in 7 days", impact: "High" },
    { id: "pi3", insight: "142 certifications expiring in next 30 days", impact: "Medium" },
  ],

  actionsNextSteps: [
    "Generate Product Analytics Report",
    "Review Product Risks",
    "Review Catalogue Quality",
    "Run Product Forecast",
    "Review High Risk Products",
    "Run Product Financials",
    "Open Product Analytics Audit",
  ],

  healthRail: {
    healthScore: 96,
    label: "Very Good",
    productSummary: {
      totalProducts: "18,420",
      productsDelta: "+ 8.4%",
      activeProducts: "17,254",
      activeDelta: "+ 7.8%",
      newProducts: "812",
      newDelta: "+ 9.1%",
      discontinued: "428",
      discontinuedDelta: "- 5.2%",
    },
    performanceSummary: {
      productRevenue: "LKR 116.8M",
      revenueDelta: "+ 8.4%",
      grossProfit: "LKR 84.2M",
      profitDelta: "+ 8.4%",
      avgMargin: "31.4%",
      marginDelta: "+ 1.2pp",
      conversionRate: "4.6%",
      convDelta: "+ 1.2pp",
      returnRate: "4.2%",
      returnDelta: "- 0.4pp",
    },
    catalogueSummary: {
      quality: "95%",
      qualityDelta: "+ 1pp",
      completeness: "97%",
      compDelta: "+ 1pp",
      imageCoverage: "96%",
      imgDelta: "+ 2pp",
      dataConsistency: "98%",
      dataDelta: "+ 1pp",
    },
    inventorySummary: {
      turnover: "6.2",
      turnoverDelta: "+ 0.6",
      daysOfInventory: "41",
      daysDelta: "- 2",
      stockOutRate: "2.3%",
      stockOutDelta: "- 0.5pp",
    },
    riskSummary: {
      atRiskProducts: 124,
      atRiskDelta: "- 9.8",
      marginAtRisk: 166,
      marginDelta: "- 10",
      complianceAtRisk: 62,
      compDelta: "- 5",
      qualityAtRisk: 24,
      qualityDelta: "- 3",
    },
    quickQueues: [
      { queueName: "Review Product Risks", count: "24" },
      { queueName: "Review Catalogue Quality", count: "18" },
      { queueName: "Pricing Review Required", count: "12" },
      { queueName: "Inventory Replenishment", count: "21" },
      { queueName: "Run Product Approvals", count: "9" },
    ],
  } as ProductHealthRailData,
};
