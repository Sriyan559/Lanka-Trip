export interface ModuleRegistryItem {
  id: string;
  moduleCode: string;
  moduleName: string;
  moduleKey: string;
  moduleType: "Core" | "Optional";
  category: "Customer" | "Marketplace" | "Finance" | "Operations" | "Analytics" | "Logistics" | "Marketing" | "Security" | "Catalog" | "Governance" | "AI";
  lifecycle: "Operational" | "Release Candidate" | "Scheduled" | "Planned" | "Archived";
  lifecycleStage: "Operational" | "Release Candidate" | "Scheduled" | "Planned";
  operationalStatus: "Operational" | "Review Pending" | "Approved" | "Conditionally Approved" | "Degraded";
  currentVersion: string;
  targetVersion: string;
  releaseStatus: "Released" | "Release Candidate" | "Scheduled" | "Approved" | "Planned" | "Blocked";
  securityStatus: "Approved" | "Review Pending" | "Conditionally Approved" | "Not Assessed";
  complianceStatus: "Approved" | "Review Pending" | "Conditionally Approved" | "Not Assessed";
  integrationStatus: "Approved" | "Review Pending" | "Not Assessed" | "Integration Pending";
  dependencyStatus: "Approved" | "Review Pending" | "High Risk" | "Low Risk";
  countriesEnabled: number;
  adoption: number;
  availability: number;
  regionCoverage: string;
  lastRelease: string;
  scheduledOwner: string;
  lastReview: string;
}

export interface KpiItem {
  id: string;
  number?: string;
  label: string;
  value: string | number;
  subtext?: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
  iconName?: string;
}

export interface ChartCategoryPoint {
  name: string;
  value: number;
  count?: number;
  percentage?: number;
  color: string;
}

export interface MatrixRow {
  code: string;
  name: string;
  config: "success" | "warning" | "danger" | "neutral";
  integr: "success" | "warning" | "danger" | "neutral";
  deps: "success" | "warning" | "danger" | "neutral";
  sec: "success" | "warning" | "danger" | "neutral";
  compl: "success" | "warning" | "danger" | "neutral";
  adopt: "success" | "warning" | "danger" | "neutral";
  overall: "success" | "warning" | "danger" | "neutral";
}

export interface OwnerSummaryItem {
  name: string;
  modulesCount: number;
  role?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  by: string;
  when: string;
  tone?: "info" | "success" | "warning" | "neutral";
}

export interface ExceptionItem {
  type: string;
  count: number;
  tone: "danger" | "warning" | "info";
}

export const MODULE_REGISTRY_DATA = {
  primaryKpis: [
    { id: "reg-mods", label: "Registered Modules", value: 16, subtext: "Total in registry", tone: "neutral" },
    { id: "act-avail", label: "Active Available", value: 8, subtext: "Ready for tenant assignment", tone: "success" },
    { id: "patch-avail", label: "Patch Available", value: 1, subtext: "v3.2.1 patch ready", tone: "info" },
    { id: "planned-mods", label: "Planned Modules", value: 4, subtext: "H2 2024 Roadmap", tone: "neutral" },
    { id: "coming-soon", label: "Coming Soon", value: 4, subtext: "In staging/preview", tone: "info" },
    { id: "attention-mods", label: "Modules Requiring Attention", value: 4, subtext: "Review required", tone: "warning" },
    { id: "blocked-rel", label: "Blocked Releases", value: 1, subtext: "v4.1.0 blocked", tone: "danger" },
    { id: "dep-risks", label: "Dependency Risks", value: 96, subtext: "Checked dependencies", tone: "warning" },
    { id: "integ-health", label: "Integration Health", value: 85, subtext: "Ecosystem score", tone: "success" },
  ] as KpiItem[],

  registryHealthKpi: {
    score: 91,
    maxScore: 100,
    label: "Excellent",
    subtext: "Ecosystem Health Index",
  },

  secondaryKpis: [
    { id: "core-mods", label: "Core Modules", value: "7" },
    { id: "opt-mods", label: "Optional Modules", value: "4" },
    { id: "prod-enabled", label: "Production Enabled", value: "11" },
    { id: "config-pending", label: "Configuration Pending", value: "3" },
    { id: "sec-pending", label: "Security Review Pending", value: "3" },
    { id: "comp-pending", label: "Compliance Review Pending", value: "6" },
    { id: "countries-enabled", label: "Countries Enabled", value: "18" },
    { id: "avg-adoption", label: "Avg Adoption", value: "68%" },
  ],

  tabs: [
    { id: "all", label: "All Modules", count: 16 },
    { id: "core", label: "Core Modules", count: 7 },
    { id: "optional", label: "Optional Modules", count: 4 },
    { id: "planned", label: "Planned", count: 4 },
    { id: "coming-soon", label: "Coming Soon", count: 2 },
    { id: "release-candidates", label: "Release Candidates", count: 1 },
    { id: "production-enabled", label: "Production Enabled", count: 11 },
    { id: "needs-attention", label: "Needs Attention", count: 4 },
    { id: "high-risk", label: "High Risk", count: 2 },
    { id: "security-review", label: "Security Review", count: 3 },
    { id: "compliance-review", label: "Compliance Review", count: 6 },
    { id: "dependency-issues", label: "Dependency Issues", count: 3 },
    { id: "integration-issues", label: "Integration Issues", count: 1 },
    { id: "archived", label: "Archived", count: 0 },
  ],

  filterChips: [
    "New",
    "Updated",
    "Release Candidate",
    "Production Enabled",
    "Not Configured",
    "Security Review",
    "Compliance Review",
    "Integration Issues",
    "Dependency Issues",
    "Countries Not Enabled",
    "Low Adoption",
    "Scheduled Owner",
    "Unassigned Owner",
  ],

  modules: [
    {
      id: "mod-1",
      moduleCode: "MDA-CRM-0001",
      moduleName: "CRM Platform",
      moduleKey: "crm-platform",
      moduleType: "Core",
      category: "Customer",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v4.5.1",
      targetVersion: "v4.5.1",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 82,
      availability: 99.9,
      regionCoverage: "APAC, EMEA, NAM, LATAM",
      lastRelease: "Jul 22, 2024",
      scheduledOwner: "Elena Wilson",
      lastReview: "Jul 29, 2024",
    },
    {
      id: "mod-2",
      moduleCode: "B2C-MKT-0002",
      moduleName: "B2C Marketplace",
      moduleKey: "b2c-marketplace",
      moduleType: "Core",
      category: "Marketplace",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v3.2.1",
      targetVersion: "v3.3.0",
      releaseStatus: "Release Candidate",
      securityStatus: "Approved",
      complianceStatus: "Review Pending",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 16,
      adoption: 68,
      availability: 99.5,
      regionCoverage: "APAC, EMEA, NAM, LATAM",
      lastRelease: "Jul 15, 2024",
      scheduledOwner: "Aisha Khan",
      lastReview: "Jul 22, 2024",
    },
    {
      id: "mod-3",
      moduleCode: "PAA-PAY-0003",
      moduleName: "Payment Processing",
      moduleKey: "payment-processing",
      moduleType: "Core",
      category: "Finance",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v2.3.0",
      targetVersion: "v2.3.8",
      releaseStatus: "Approved",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 91,
      availability: 99.8,
      regionCoverage: "Global",
      lastRelease: "Jun 28, 2024",
      scheduledOwner: "Ravi Patel",
      lastReview: "Jul 18, 2024",
    },
    {
      id: "mod-4",
      moduleCode: "INV-WMS-0004",
      moduleName: "Inventory Management",
      moduleKey: "inventory-management",
      moduleType: "Core",
      category: "Operations",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v4.0.2",
      targetVersion: "v4.1.0",
      releaseStatus: "Scheduled",
      securityStatus: "Approved",
      complianceStatus: "Conditionally Approved",
      integrationStatus: "Review Pending",
      dependencyStatus: "Review Pending",
      countriesEnabled: 17,
      adoption: 74,
      availability: 99.2,
      regionCoverage: "APAC, EMEA, NAM, LATAM",
      lastRelease: "Aug 12, 2024",
      scheduledOwner: "Sophia Martinez",
      lastReview: "Jul 29, 2024",
    },
    {
      id: "mod-5",
      moduleCode: "ORD-MGM-0005",
      moduleName: "Order Management",
      moduleKey: "order-management",
      moduleType: "Core",
      category: "Operations",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v3.1.0",
      targetVersion: "v3.1.0",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 86,
      availability: 99.7,
      regionCoverage: "Global",
      lastRelease: "Jul 01, 2024",
      scheduledOwner: "James Lee",
      lastReview: "Jul 24, 2024",
    },
    {
      id: "mod-6",
      moduleCode: "ANA-PLT-0006",
      moduleName: "Analytics Platform",
      moduleKey: "analytics-platform",
      moduleType: "Optional",
      category: "Analytics",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v2.0.1",
      targetVersion: "v2.1.0",
      releaseStatus: "Planned",
      securityStatus: "Review Pending",
      complianceStatus: "Review Pending",
      integrationStatus: "Review Pending",
      dependencyStatus: "Not Assessed",
      countriesEnabled: 13,
      adoption: 52,
      availability: 98.7,
      regionCoverage: "APAC, EMEA",
      lastRelease: "Aug 28, 2024",
      scheduledOwner: "Priya Nair",
      lastReview: "Jul 20, 2024",
    },
    {
      id: "mod-7",
      moduleCode: "SUP-PRC-0007",
      moduleName: "Supplier Procurement",
      moduleKey: "supplier-procurement",
      moduleType: "Core",
      category: "Operations",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v2.4.0",
      targetVersion: "v2.5.0",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 15,
      adoption: 79,
      availability: 99.4,
      regionCoverage: "APAC, EMEA",
      lastRelease: "Jul 10, 2024",
      scheduledOwner: "Suresh Kumar",
      lastReview: "Jul 25, 2024",
    },
    {
      id: "mod-8",
      moduleCode: "LOG-FLF-0008",
      moduleName: "Reverse Logistics",
      moduleKey: "reverse-logistics",
      moduleType: "Core",
      category: "Logistics",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v3.0.4",
      targetVersion: "v3.1.0",
      releaseStatus: "Scheduled",
      securityStatus: "Approved",
      complianceStatus: "Review Pending",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 16,
      adoption: 71,
      availability: 99.1,
      regionCoverage: "APAC, EMEA",
      lastRelease: "Aug 02, 2024",
      scheduledOwner: "Maya Perera",
      lastReview: "Jul 28, 2024",
    },
    {
      id: "mod-9",
      moduleCode: "MKT-CAM-0009",
      moduleName: "Marketing Automation",
      moduleKey: "marketing-automation",
      moduleType: "Optional",
      category: "Marketing",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v1.9.0",
      targetVersion: "v2.0.0",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 14,
      adoption: 64,
      availability: 99.0,
      regionCoverage: "APAC, EMEA",
      lastRelease: "Jun 18, 2024",
      scheduledOwner: "Elena Wilson",
      lastReview: "Jul 15, 2024",
    },
    {
      id: "mod-10",
      moduleCode: "CPG-B2B-0010",
      moduleName: "B2B Wholesale Portal",
      moduleKey: "b2b-wholesale-portal",
      moduleType: "Optional",
      category: "Marketplace",
      lifecycle: "Planned",
      lifecycleStage: "Planned",
      operationalStatus: "Review Pending",
      currentVersion: "v1.2.0",
      targetVersion: "v1.3.0",
      releaseStatus: "Planned",
      securityStatus: "Review Pending",
      complianceStatus: "Not Assessed",
      integrationStatus: "Review Pending",
      dependencyStatus: "Review Pending",
      countriesEnabled: 10,
      adoption: 45,
      availability: 98.5,
      regionCoverage: "APAC",
      lastRelease: "Aug 15, 2024",
      scheduledOwner: "Aisha Khan",
      lastReview: "Jul 30, 2024",
    },
    {
      id: "mod-11",
      moduleCode: "SEC-AM-0011",
      moduleName: "Identity & Access IAM",
      moduleKey: "identity-access-iam",
      moduleType: "Core",
      category: "Security",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v5.0.0",
      targetVersion: "v5.0.0",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 98,
      availability: 99.99,
      regionCoverage: "Global",
      lastRelease: "May 20, 2024",
      scheduledOwner: "Ravi Patel",
      lastReview: "Jul 01, 2024",
    },
    {
      id: "mod-12",
      moduleCode: "CAT-MAS-0012",
      moduleName: "Product Catalogue Master",
      moduleKey: "product-catalogue-master",
      moduleType: "Core",
      category: "Catalog",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v4.1.2",
      targetVersion: "v4.2.0",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 89,
      availability: 99.8,
      regionCoverage: "Global",
      lastRelease: "Jul 05, 2024",
      scheduledOwner: "Sophia Martinez",
      lastReview: "Jul 26, 2024",
    },
    {
      id: "mod-13",
      moduleCode: "TAX-COMP-0013",
      moduleName: "Tax & Fiscal Compliance",
      moduleKey: "tax-fiscal-compliance",
      moduleType: "Core",
      category: "Finance",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v2.1.0",
      targetVersion: "v2.2.0",
      releaseStatus: "Approved",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 95,
      availability: 99.9,
      regionCoverage: "Global",
      lastRelease: "Jun 30, 2024",
      scheduledOwner: "James Lee",
      lastReview: "Jul 19, 2024",
    },
    {
      id: "mod-14",
      moduleCode: "AI-REC-0014",
      moduleName: "AI Recommendation Engine",
      moduleKey: "ai-recommendation-engine",
      moduleType: "Optional",
      category: "AI",
      lifecycle: "Release Candidate",
      lifecycleStage: "Release Candidate",
      operationalStatus: "Conditionally Approved",
      currentVersion: "v1.0.0-rc2",
      targetVersion: "v1.0.0",
      releaseStatus: "Release Candidate",
      securityStatus: "Review Pending",
      complianceStatus: "Conditionally Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Review Pending",
      countriesEnabled: 8,
      adoption: 38,
      availability: 98.2,
      regionCoverage: "APAC",
      lastRelease: "Aug 01, 2024",
      scheduledOwner: "Priya Nair",
      lastReview: "Aug 05, 2024",
    },
    {
      id: "mod-15",
      moduleCode: "WFM-CAP-0015",
      moduleName: "Workforce Management",
      moduleKey: "workforce-management",
      moduleType: "Optional",
      category: "Operations",
      lifecycle: "Planned",
      lifecycleStage: "Planned",
      operationalStatus: "Degraded",
      currentVersion: "v0.9.0",
      targetVersion: "v1.0.0",
      releaseStatus: "Planned",
      securityStatus: "Not Assessed",
      complianceStatus: "Not Assessed",
      integrationStatus: "Not Assessed",
      dependencyStatus: "Not Assessed",
      countriesEnabled: 5,
      adoption: 22,
      availability: 97.5,
      regionCoverage: "APAC",
      lastRelease: "Sep 01, 2024",
      scheduledOwner: "Suresh Kumar",
      lastReview: "Jul 10, 2024",
    },
    {
      id: "mod-16",
      moduleCode: "AUD-REP-0016",
      moduleName: "Ecosystem Audit & Reporting",
      moduleKey: "ecosystem-audit-reporting",
      moduleType: "Core",
      category: "Governance",
      lifecycle: "Operational",
      lifecycleStage: "Operational",
      operationalStatus: "Operational",
      currentVersion: "v3.0.0",
      targetVersion: "v3.0.0",
      releaseStatus: "Released",
      securityStatus: "Approved",
      complianceStatus: "Approved",
      integrationStatus: "Approved",
      dependencyStatus: "Approved",
      countriesEnabled: 18,
      adoption: 94,
      availability: 99.95,
      regionCoverage: "Global",
      lastRelease: "Jul 12, 2024",
      scheduledOwner: "Maya Perera",
      lastReview: "Jul 29, 2024",
    },
  ] as ModuleRegistryItem[],

  // Visual Analytics Datasets
  classificationData: [
    { name: "Core", value: 7, percentage: 43.8, color: "#800020" },
    { name: "Optional", value: 4, percentage: 25.0, color: "#2563eb" },
    { name: "Planned", value: 2, percentage: 12.5, color: "#059669" },
    { name: "Coming Soon", value: 2, percentage: 12.5, color: "#d97706" },
    { name: "Patch Available", value: 1, percentage: 6.3, color: "#9333ea" },
  ] as ChartCategoryPoint[],

  lifecycleData: [
    { name: "Operational", value: 8, percentage: 50.0, color: "#059669" },
    { name: "Planned", value: 4, percentage: 25.0, color: "#2563eb" },
    { name: "Coming Soon", value: 2, percentage: 12.5, color: "#d97706" },
    { name: "Release Candidate", value: 1, percentage: 6.3, color: "#9333ea" },
    { name: "Archived", value: 1, percentage: 6.3, color: "#64748b" },
  ] as ChartCategoryPoint[],

  releaseReadinessData: [
    { name: "Released", value: 8, percentage: 50, color: "#059669" },
    { name: "Release Candidates", value: 1, percentage: 6, color: "#9333ea" },
    { name: "Scheduled", value: 4, percentage: 25, color: "#2563eb" },
    { name: "Planned", value: 2, percentage: 13, color: "#d97706" },
  ],

  dependencyHealthData: [
    { name: "No Known Issues", value: 5, percentage: 31, color: "#059669" },
    { name: "Low Risk Dependencies", value: 7, percentage: 44, color: "#2563eb" },
    { name: "Medium Risk Dependencies", value: 2, percentage: 13, color: "#d97706" },
    { name: "High Risk Dependencies", value: 1, percentage: 6, color: "#dc2626" },
  ],

  integrationSummaryData: [
    { name: "Fully Integrated", value: 7, percentage: 44, color: "#059669" },
    { name: "Partially Integrated", value: 4, percentage: 25, color: "#2563eb" },
    { name: "Integration Pending", value: 2, percentage: 13, color: "#d97706" },
    { name: "Integration Issues", value: 2, percentage: 13, color: "#dc2626" },
    { name: "Not Applicable", value: 1, percentage: 6, color: "#64748b" },
  ],

  countriesComplianceData: [
    { name: "Approved", value: 8, percentage: 44, color: "#059669" },
    { name: "Conditionally Approved", value: 4, percentage: 22, color: "#2563eb" },
    { name: "Review Pending", value: 3, percentage: 17, color: "#d97706" },
    { name: "Not Assessed", value: 2, percentage: 11, color: "#94a3b8" },
    { name: "Not Applicable", value: 2, percentage: 11, color: "#64748b" },
  ],

  adoptionByModuleData: [
    { tier: "CRM Platform", priceVsMarket: "82%", skuPercent: 82 },
    { tier: "Order Management", priceVsMarket: "86%", skuPercent: 86 },
    { tier: "Payment Processing", priceVsMarket: "91%", skuPercent: 91 },
    { tier: "Inventory Management", priceVsMarket: "74%", skuPercent: 74 },
    { tier: "B2C Marketplace", priceVsMarket: "68%", skuPercent: 68 },
    { tier: "Analytics Platform", priceVsMarket: "52%", skuPercent: 52 },
  ],

  // Lower Dashboard Datasets
  healthMatrix: [
    { code: "CRM-0001", name: "CRM Platform", config: "success", integr: "success", deps: "success", sec: "success", compl: "success", adopt: "success", overall: "success" },
    { code: "MKT-0002", name: "B2C Marketplace", config: "success", integr: "success", deps: "success", sec: "success", compl: "warning", adopt: "success", overall: "success" },
    { code: "PAY-0003", name: "Payment Processing", config: "success", integr: "success", deps: "success", sec: "success", compl: "success", adopt: "success", overall: "success" },
    { code: "INV-0004", name: "Inventory Mgmt", config: "warning", integr: "warning", deps: "warning", sec: "success", compl: "warning", adopt: "success", overall: "warning" },
    { code: "ORD-0005", name: "Order Mgmt", config: "success", integr: "success", deps: "success", sec: "success", compl: "success", adopt: "success", overall: "success" },
    { code: "ANA-0006", name: "Analytics Platform", config: "warning", integr: "warning", deps: "neutral", sec: "warning", compl: "warning", adopt: "warning", overall: "warning" },
  ] as MatrixRow[],

  ownershipList: [
    { name: "Elena Wilson", modulesCount: 3, role: "Lead Architect" },
    { name: "Ravi Patel", modulesCount: 2, role: "Security Lead" },
    { name: "Sophia Martinez", modulesCount: 2, role: "Operations Lead" },
    { name: "James Lee", modulesCount: 2, role: "Core Systems" },
    { name: "Aisha Khan", modulesCount: 1, role: "Marketplace Tech" },
    { name: "Priya Nair", modulesCount: 1, role: "Analytics Eng" },
  ] as OwnerSummaryItem[],

  dependencyRisks: {
    high: 1,
    medium: 3,
    low: 7,
    none: 5,
    total: 16,
  },

  securityComplianceOverview: {
    securityApproved: 9,
    securityReviewPending: 4,
    securityNotAssessed: 3,
    securityTotal: 16,
    complianceApproved: 8,
    complianceConditionallyApproved: 4,
    complianceReviewPending: 3,
    complianceNotAssessed: 1,
    complianceTotal: 16,
  },

  exceptionsList: [
    { type: "Security Review Pending", count: 4, tone: "warning" },
    { type: "Compliance Review Pending", count: 3, tone: "warning" },
    { type: "Integration Issues", count: 2, tone: "danger" },
    { type: "Dependency Issues", count: 3, tone: "warning" },
    { type: "Countries Not Enabled", count: 2, tone: "info" },
    { type: "High Risk Dependencies", count: 1, tone: "danger" },
  ] as ExceptionItem[],

  recentActivity: [
    { id: "act-1", title: "B2C Marketplace updated v3.2.1", by: "Aisha Khan", when: "Aug 9, 10:21 AM", tone: "info" },
    { id: "act-2", title: "Inventory Management scheduled", by: "Sophia Martinez", when: "Aug 9, 09:45 AM", tone: "info" },
    { id: "act-3", title: "Security review completed", by: "Ravi Patel", when: "Aug 8, 04:12 PM", tone: "success" },
    { id: "act-4", title: "New module registered", by: "Priya Nair", when: "Aug 8, 11:03 AM", tone: "info" },
    { id: "act-5", title: "Integration status updated", by: "James Lee", when: "Aug 7, 03:27 PM", tone: "info" },
  ] as ActivityItem[],

  // Sidebar Summary Panels
  portfolioHealthMetrics: [
    { label: "Operational Availability", value: "99.0%", progress: 99, tone: "success" },
    { label: "Configuration Compliance", value: "92%", progress: 92, tone: "success" },
    { label: "Security Posture", value: "88%", progress: 88, tone: "success" },
    { label: "Integration Readiness", value: "85%", progress: 85, tone: "success" },
    { label: "Dependency Health", value: "84%", progress: 84, tone: "success" },
    { label: "Adoption", value: "68%", progress: 68, tone: "warning" },
    { label: "Release Readiness", value: "72%", progress: 72, tone: "warning" },
  ],

  portfolioSummary: [
    { label: "Registered Modules", count: 16 },
    { label: "Active Modules", count: 8 },
    { label: "Planned Modules", count: 4 },
    { label: "Coming Soon", count: 2 },
    { label: "Patch Available", count: 1 },
    { label: "Archived", count: 0 },
  ],

  releaseSummary: [
    { label: "Released", count: 8, tone: "success" },
    { label: "Release Candidates", count: 1, tone: "info" },
    { label: "Scheduled", count: 4, tone: "info" },
    { label: "Blocked", count: 1, tone: "danger" },
    { label: "Pending", count: 2, tone: "warning" },
  ],

  governanceSummary: [
    { label: "Security Review Pending", count: 4, tone: "warning" },
    { label: "Compliance Review Pending", count: 3, tone: "warning" },
    { label: "High Risk Modules", count: 2, tone: "danger" },
    { label: "Integration Issues", count: 3, tone: "warning" },
    { label: "Dependency Issues", count: 3, tone: "warning" },
  ],

  priorityQueues: [
    { label: "Security Review", count: 4, tone: "warning" },
    { label: "Compliance Review", count: 3, tone: "warning" },
    { label: "High Risk Modules", count: 2, tone: "danger" },
    { label: "Dependency Issues", count: 3, tone: "warning" },
    { label: "Integration Issues", count: 2, tone: "warning" },
    { label: "Countries Not Enabled", count: 2, tone: "info" },
    { label: "Configuration Pending", count: 3, tone: "warning" },
  ],

  finalActions: [
    { label: "Register Module", primary: true },
    { label: "Compare Modules", primary: false },
    { label: "Review Registry Risks", primary: false },
    { label: "View Dependencies Map", primary: false },
    { label: "View Release Calendar", primary: false },
    { label: "Review Security Posture", primary: false },
    { label: "Review Compliance", primary: false },
    { label: "Export Registry", primary: false },
    { label: "Open Registry Audit", primary: false },
  ],
};
