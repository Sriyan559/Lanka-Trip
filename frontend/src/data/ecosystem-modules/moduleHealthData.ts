export interface ModuleRegistryHealthItem {
  id: string;
  code: string;
  module: string;
  category: string;
  status: "Operational" | "Degraded" | "Critical";
  healthScore: string;
  availability: string;
  errorRate: string;
  latency: string;
  slaTrend: "On Track" | "At Risk" | "Warning" | "Critical";
  mau: string;
  transactions: string;
  tenantCount: number;
  adoptionRate: string;
  featureUtil: string;
  incidents: number;
  dependencyHealth: "Healthy" | "Warning" | "Critical";
  releaseHealth: "Current" | "Behind" | "Blocked";
  businessOwner: string;
  lastUpdated: string;
}

export interface HealthScorecardItem {
  band: string;
  count: number;
  percentage: string;
  trend: "Up" | "Down" | "Stable";
}

export interface AvailabilitySlaItem {
  module: string;
  slaPct: string;
  slaStatus: "On Track" | "At Risk" | "Warning" | "Critical";
}

export interface ErrorAnalysisItem {
  module: string;
  errorRate: string;
  trend: "Up" | "Down" | "Stable";
}

export interface PerformanceLatencyItem {
  module: string;
  avgLatency: string;
  trend: "Up" | "Down" | "Stable";
}

export interface ThroughputCapacityItem {
  module: string;
  transactions: string;
  capacityUtil: string;
}

export interface AdoptionPortfolioItem {
  module: string;
  adoptionRate: string;
  trend: "Up" | "Down" | "Stable";
}

export interface AdoptionCohortItem {
  cohort: string;
  modules: number;
  avgAdoption: string;
  trend: "Up" | "Down" | "Stable";
}

export interface FeatureUtilizationItem {
  module: string;
  utilization: string;
  topUsedFeature: string;
}

export interface ScopeAdoptionItem {
  name: string;
  count: number;
  avgAdoption: string;
}

export interface EnvironmentHealthItem {
  environment: string;
  healthScore: number;
  status: "Very Good" | "Good" | "Fair" | "Critical";
}

export interface EnvironmentDriftItem {
  environment: string;
  driftScore: string;
  errorDrift: string;
  availabilityDrift: string;
}

export interface DependencyImpactItem {
  impactLevel: "High" | "Medium" | "Low" | "None";
  dependencies: number;
  impactedModules: number;
}

export interface ReleaseImpactItem {
  releaseWindow: string;
  modules: number;
  impact: "High" | "Medium" | "Low" | "None";
}

export interface RolloutImpactItem {
  rolloutStage: string;
  features: number;
  modulesImpacted: number;
}

export interface IncidentPortfolioItem {
  severity: "Critical" | "High" | "Medium" | "Low";
  open: number;
  slaBreach: number;
}

export interface UnderusedModuleItem {
  module: string;
  adoptionRate: string;
  mau: string;
  reason: string;
}

export interface DormantModuleItem {
  module: string;
  lastActive: string;
  reason: string;
}

export interface ModuleBusinessValueItem {
  module: string;
  valueScore: number;
  trend: "Up" | "Down" | "Stable";
}

export interface HealthMatrixCell {
  count: number;
}

export interface OwnershipAccountabilityItem {
  ownerType: string;
  modules: number;
  pctOwnership: string;
}

export interface GovernanceGateItem {
  gate: string;
  status: "Active" | "Warning" | "Blocked";
  passRate: string;
}

export interface RecentHealthActivityItem {
  time: string;
  activity: string;
  details: string;
  severity: "Critical" | "Warning" | "Info" | "Low";
  status: "Open" | "Resolved" | "Closed";
  owner: string;
}

export const MODULE_HEALTH_DATA = {
  headerInfo: {
    visibleTitle: "Module Health, Performance & Adoption",
    breadcrumb: "Ecosystem Modules > Health & Adoption",
    description: "Monitors operational health, performance, reliability, tenant usage, feature utilization, and adoption across ecosystem modules, business units, channels, and environments.",
  },

  contextBar: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    region: "Sri Lanka",
    environment: "All",
    moduleRegistry: "Connected",
    telemetrySource: "Connected",
    usageSource: "Connected",
    assignmentSource: "Connected",
    featureFlagSource: "Connected",
    releaseSource: "Connected",
    dependencySource: "Connected",
    incidentSource: "Connected",
    adoptionEngine: "Healthy",
    matrixGovernance: "Healthy",
    dataCompleteness: "98%",
    lastRefreshed: "May 14, 2026, 10:15 AM",
    access: "Assigned Scope",
  },

  primaryKpis: [
    { label: "Registered Modules", value: 16, tone: "info" },
    { label: "Operational Modules", value: 13, tone: "success" },
    { label: "Degraded Modules", value: 2, tone: "warning" },
    { label: "Critical Modules", value: 1, tone: "danger" },
    { label: "Avg Availability", value: "99.4%", tone: "success" },
    { label: "Avg Error Rate", value: "0.8%", tone: "success" },
    { label: "Avg Response Time", value: "420 ms", tone: "info" },
    { label: "Monthly Active Users", value: "18.6K", tone: "success" },
    { label: "Avg Adoption Rate", value: "74%", tone: "success" },
    { label: "Module Health", value: "94/100", tone: "success" },
  ],

  secondaryKpis: [
    { label: "Modules Growing", value: 8, tone: "success" },
    { label: "Modules Stable", value: 5, tone: "info" },
    { label: "Modules Declining", value: 3, tone: "danger" },
    { label: "Low-Adoption Modules", value: 4, tone: "warning" },
    { label: "High-Usage Modules", value: 6, tone: "success" },
    { label: "Open Health Incidents", value: 7, tone: "danger" },
    { label: "SLA Warnings", value: 5, tone: "warning" },
    { label: "Performance Warnings", value: 6, tone: "warning" },
  ],

  tabs: [
    "Health Overview", "Operational Health", "Performance", "Availability",
    "Errors", "Latency", "Usage", "Adoption", "Feature Utilization",
    "Tenants", "Business Units", "Channels", "Environments",
    "Incidents", "Trends", "Exceptions", "History"
  ],

  registry: [
    { id: "mod-001", code: "MOD-001", module: "B2C Marketplace", category: "Operational", status: "Operational", healthScore: "91.0%", availability: "99.8%", errorRate: "0.2%", latency: "310ms", slaTrend: "On Track", mau: "13.6K", transactions: "215K", tenantCount: 406, adoptionRate: "89%", featureUtil: "76%", incidents: 1, dependencyHealth: "Healthy", releaseHealth: "Current", businessOwner: "D. Perera", lastUpdated: "May 14, 10:15 AM" },
    { id: "mod-002", code: "MOD-002", module: "Beauty Advisor", category: "Operational", status: "Operational", healthScore: "88.0%", availability: "99.1%", errorRate: "1.2%", latency: "480ms", slaTrend: "At Risk", mau: "7.2K", transactions: "120K", tenantCount: 3, adoptionRate: "71%", featureUtil: "58%", incidents: 2, dependencyHealth: "Warning", releaseHealth: "Current", businessOwner: "W. Weerasinghe", lastUpdated: "May 14, 10:12 AM" },
    { id: "mod-003", code: "MOD-003", module: "Logistics", category: "Operational", status: "Operational", healthScore: "95.1%", availability: "99.9%", errorRate: "4.8%", latency: "210ms", slaTrend: "On Track", mau: "3.2K", transactions: "48K", tenantCount: 236, adoptionRate: "67%", featureUtil: "57%", incidents: 1, dependencyHealth: "Warning", releaseHealth: "Current", businessOwner: "R. Perera", lastUpdated: "May 14, 10:05 AM" },
    { id: "mod-004", code: "MOD-004", module: "Customer Support", category: "Operational", status: "Degraded", healthScore: "50.7%", availability: "91.1%", errorRate: "8.3%", latency: "850ms", slaTrend: "Critical", mau: "2.1K", transactions: "32K", tenantCount: 184, adoptionRate: "61%", featureUtil: "62%", incidents: 0, dependencyHealth: "Red", releaseHealth: "Non-Compliant", businessOwner: "R. de Silva", lastUpdated: "May 14, 10:00 AM" },
    { id: "mod-005", code: "MOD-005", module: "Analytics", category: "Operational", status: "Operational", healthScore: "93.4%", availability: "99.8%", errorRate: "0.3%", latency: "210ms", slaTrend: "On Track", mau: "1.5K", transactions: "68K", tenantCount: 154, adoptionRate: "77%", featureUtil: "80%", incidents: 1, dependencyHealth: "Healthy", releaseHealth: "Current", businessOwner: "T. Fernando", lastUpdated: "May 14, 09:45 AM" },
  ] as ModuleRegistryHealthItem[],

  scorecard: [
    { band: "Excellent (90–100)", count: 6, percentage: "37.5%", trend: "Up" },
    { band: "Good (75–89)", count: 5, percentage: "31.3%", trend: "Up" },
    { band: "Fair (50–74)", count: 2, percentage: "12.5%", trend: "Down" },
    { band: "Poor (25–49)", count: 0, percentage: "0%", trend: "Stable" },
    { band: "Critical (0–24)", count: 1, percentage: "6.3%", trend: "Up" },
  ] as HealthScorecardItem[],

  operationalTrend: [
    { date: "Apr 15", healthScore: 92, availability: 99.1, errorRate: 0.9 },
    { date: "Apr 22", healthScore: 93, availability: 99.3, errorRate: 0.8 },
    { date: "Apr 29", healthScore: 91, availability: 99.0, errorRate: 1.0 },
    { date: "May 6", healthScore: 94, availability: 99.5, errorRate: 0.7 },
    { date: "May 13", healthScore: 94, availability: 99.4, errorRate: 0.8 },
  ],

  availabilitySla: [
    { module: "B2C Marketplace", slaPct: "99.8%", slaStatus: "On Track" },
    { module: "Beauty Advisor", slaPct: "99.1%", slaStatus: "At Risk" },
    { module: "Logistics", slaPct: "99.9%", slaStatus: "On Track" },
    { module: "Customer Support", slaPct: "91.1%", slaStatus: "Critical" },
    { module: "Analytics", slaPct: "99.8%", slaStatus: "On Track" },
  ] as AvailabilitySlaItem[],

  errorAnalysis: [
    { module: "Beauty Advisor", errorRate: "1.2%", trend: "Up" },
    { module: "Logistics", errorRate: "1.1%", trend: "Down" },
    { module: "Customer Support", errorRate: "8.3%", trend: "Up" },
    { module: "B2C Marketplace", errorRate: "0.2%", trend: "Down" },
  ] as ErrorAnalysisItem[],

  latencyAnalysis: [
    { module: "Beauty Advisor", avgLatency: "480ms", trend: "Up" },
    { module: "Logistics", avgLatency: "210ms", trend: "Down" },
    { module: "Customer Support", avgLatency: "850ms", trend: "Up" },
    { module: "Analytics", avgLatency: "350ms", trend: "Down" },
    { module: "B2C Marketplace", avgLatency: "310ms", trend: "Down" },
  ] as PerformanceLatencyItem[],

  throughputCapacity: [
    { module: "B2C Marketplace", transactions: "215K", capacityUtil: "62%" },
    { module: "Beauty Advisor", transactions: "120K", capacityUtil: "68%" },
    { module: "Logistics", transactions: "48K", capacityUtil: "54%" },
    { module: "Customer Support", transactions: "32K", capacityUtil: "54%" },
    { module: "Analytics", transactions: "68K", capacityUtil: "52%" },
  ] as ThroughputCapacityItem[],

  adoptionPortfolio: [
    { module: "B2C Marketplace", adoptionRate: "89%", trend: "Up" },
    { module: "Beauty Advisor", adoptionRate: "71%", trend: "Up" },
    { module: "Customer Support", adoptionRate: "67%", trend: "Down" },
    { module: "Logistics", adoptionRate: "61%", trend: "Up" },
    { module: "Analytics", adoptionRate: "77%", trend: "Up" },
  ] as AdoptionPortfolioItem[],

  adoptionDistribution: [
    { module: "B2C Marketplace", percentage: 89 },
    { module: "Beauty Advisor", percentage: 77 },
    { module: "Customer Support", percentage: 71 },
    { module: "Analytics", percentage: 67 },
    { module: "Logistics", percentage: 61 },
    { module: "Others", percentage: 39 },
  ],

  adoptionCohorts: [
    { cohort: "Highly Adopted", modules: 6, avgAdoption: "61%", trend: "Up" },
    { cohort: "Healthy", modules: 5, avgAdoption: "71%", trend: "Up" },
    { cohort: "Low Adoption", modules: 2, avgAdoption: "45%", trend: "Down" },
    { cohort: "Dormant", modules: 1, avgAdoption: "16%", trend: "Down" },
  ] as AdoptionCohortItem[],

  featureUtilization: [
    { module: "B2C Marketplace", utilization: "68%", topUsedFeature: "Add to Cart" },
    { module: "Beauty Advisor", utilization: "45%", topUsedFeature: "Skin Analysis" },
    { module: "Logistics", utilization: "29%", topUsedFeature: "Shipment Tracking" },
    { module: "Customer Support", utilization: "71%", topUsedFeature: "Ticketing" },
    { module: "Analytics", utilization: "31%", topUsedFeature: "Reporting" },
  ] as FeatureUtilizationItem[],

  tenantAdoption: [
    { name: "Enterprise", count: 30, avgAdoption: "72%" },
    { name: "Mid-Market", count: 74, avgAdoption: "64%" },
    { name: "Small Business", count: 156, avgAdoption: "43%" },
    { name: "Startup", count: 34, avgAdoption: "31%" },
  ] as ScopeAdoptionItem[],

  buAdoption: [
    { name: "Retail Operations", count: 2, avgAdoption: "87%" },
    { name: "Finance", count: 1, avgAdoption: "64%" },
    { name: "Customer Experience", count: 3, avgAdoption: "58%" },
    { name: "Marketing & Growth", count: 2, avgAdoption: "61%" },
    { name: "IT & Digital", count: 2, avgAdoption: "53%" },
  ] as ScopeAdoptionItem[],

  channelAdoption: [
    { name: "Online Store", count: 3, avgAdoption: "76%" },
    { name: "Mobile App", count: 2, avgAdoption: "71%" },
    { name: "Retail Store", count: 1, avgAdoption: "62%" },
    { name: "Call Center", count: 1, avgAdoption: "41%" },
    { name: "Partner Portal", count: 1, avgAdoption: "31%" },
  ] as ScopeAdoptionItem[],

  environmentHealth: [
    { environment: "Production", healthScore: 99, status: "Very Good" },
    { environment: "Pilot", healthScore: 95, status: "Very Good" },
    { environment: "Staging", healthScore: 90, status: "Good" },
    { environment: "Test", healthScore: 88, status: "Good" },
    { environment: "Development", healthScore: 74, status: "Fair" },
  ] as EnvironmentHealthItem[],

  environmentDrift: [
    { environment: "Production", driftScore: "+6.1%", errorDrift: "+0.2%", availabilityDrift: "-0.1%" },
    { environment: "Staging", driftScore: "+3.7%", errorDrift: "+0.1%", availabilityDrift: "-0.3%" },
    { environment: "Test", driftScore: "+15.1%", errorDrift: "+0.5%", availabilityDrift: "-0.9%" },
  ] as EnvironmentDriftItem[],

  dependencyImpact: [
    { impactLevel: "High", dependencies: 2, impactedModules: 4 },
    { impactLevel: "Medium", dependencies: 3, impactedModules: 5 },
    { impactLevel: "Low", dependencies: 5, impactedModules: 8 },
    { impactLevel: "None", dependencies: 10, impactedModules: 0 },
  ] as DependencyImpactItem[],

  releaseImpact: [
    { releaseWindow: "Upcoming", modules: 7, impact: "High" },
    { releaseWindow: "Current", modules: 5, impact: "Medium" },
    { releaseWindow: "Recent", modules: 8, impact: "Low" },
    { releaseWindow: "Deprecated", modules: 1, impact: "None" },
  ] as ReleaseImpactItem[],

  rolloutImpact: [
    { rolloutStage: "In Rollout", features: 2, modulesImpacted: 4 },
    { rolloutStage: "Partial", features: 4, modulesImpacted: 6 },
    { rolloutStage: "Completed", features: 8, modulesImpacted: 12 },
    { rolloutStage: "Deprecated", features: 1, modulesImpacted: 2 },
  ] as RolloutImpactItem[],

  incidentPortfolio: [
    { severity: "Critical", open: 1, slaBreach: 1 },
    { severity: "High", open: 2, slaBreach: 1 },
    { severity: "Medium", open: 1, slaBreach: 0 },
    { severity: "Low", open: 3, slaBreach: 0 },
  ] as IncidentPortfolioItem[],

  incidentTrend: [
    { date: "Apr 15", critical: 0, high: 1, medium: 2, low: 4 },
    { date: "Apr 22", critical: 1, high: 2, medium: 1, low: 3 },
    { date: "Apr 29", critical: 0, high: 1, medium: 2, low: 3 },
    { date: "May 6", critical: 1, high: 2, medium: 1, low: 3 },
    { date: "May 13", critical: 1, high: 2, medium: 1, low: 3 },
  ],

  underusedModules: [
    { module: "Analytics", adoptionRate: "27%", mau: "2.1K", reason: "Low Usage" },
    { module: "Finance", adoptionRate: "21%", mau: "1.0K", reason: "Low Usage" },
    { module: "Customer Support", adoptionRate: "19%", mau: "1.6K", reason: "Low Adoption" },
    { module: "Marketing & Growth", adoptionRate: "20%", mau: "1.2K", reason: "Low Usage" },
  ] as UnderusedModuleItem[],

  dormantModules: [
    { module: "Academy & Training", lastActive: "63 days", reason: "Low Usage" },
    { module: "Partner Portal", lastActive: "54 days", reason: "Low Usage" },
    { module: "Vendor & Commerce", lastActive: "46 days", reason: "See Adoption" },
    { module: "Community", lastActive: "27 days", reason: "No Activity" },
  ] as DormantModuleItem[],

  moduleBusinessValue: [
    { module: "B2C Marketplace", valueScore: 94, trend: "Up" },
    { module: "Beauty Advisor", valueScore: 78, trend: "Up" },
    { module: "Logistics", valueScore: 68, trend: "Up" },
    { module: "Customer Support", valueScore: 64, trend: "Down" },
    { module: "Analytics", valueScore: 59, trend: "Up" },
  ] as ModuleBusinessValueItem[],

  ownershipAccountability: [
    { ownerType: "Business Owner", modules: 16, pctOwnership: "100%" },
    { ownerType: "Technical Owner", modules: 16, pctOwnership: "100%" },
    { ownerType: "Product Owner", modules: 16, pctOwnership: "75%" },
    { ownerType: "Data Owner", modules: 8, pctOwnership: "50%" },
  ] as OwnershipAccountabilityItem[],

  governanceGates: [
    { gate: "Incident Monitoring", status: "Active", passRate: "99%" },
    { gate: "Release Compliance", status: "Active", passRate: "98%" },
    { gate: "SLA Compliance", status: "Active", passRate: "97%" },
    { gate: "Security Compliance", status: "Active", passRate: "99%" },
    { gate: "Data Completeness", status: "Active", passRate: "98%" },
  ] as GovernanceGateItem[],

  exceptionCenter: {
    healthIncidents: 7,
    slaBreaches: 5,
    performanceDegradations: 6,
    lowAdoptionOutliers: 4,
    highErrorRate: 3,
  },

  recentActivity: [
    { time: "May 14, 10:12 AM", activity: "Module Degraded", details: "Beauty Advisor", severity: "Warning", status: "Open", owner: "D. Perera" },
    { time: "May 14, 08:08 AM", activity: "SLA Warning", details: "MOD-002 - Response Time", severity: "High", status: "Open", owner: "M. Silva" },
    { time: "May 14, 00:41 AM", activity: "Adoption Drop", details: "Analytics Feature Utilization", severity: "Low", status: "Resolved", owner: "K. Perera" },
    { time: "May 14, 09:12 AM", activity: "Incident Open", details: "Logistics Error Spike", severity: "Critical", status: "Open", owner: "R. de Silva" },
    { time: "May 14, 08:08 AM", activity: "Release Deployed", details: "Feature Flag Update", severity: "Info", status: "Closed", owner: "T. Fernando" },
  ] as RecentHealthActivityItem[],

  rightPanel: {
    healthScore: 94,
    healthLabel: "Very Good",
    overallHealthText: "Overall Health",
    lastUpdated: "May 14, 2026, 10:15 AM",

    operationalSummary: {
      operational: 13,
      degraded: 2,
      critical: 1,
      openIncidents: 7,
      slaWarnings: 5,
      performanceWarnings: 4,
    },

    adoptionSummary: {
      highAdoption: 6,
      healthyAdoption: 5,
      lowAdoption: 4,
      dormant: 1,
      growing: 8,
      declining: 3,
    },

    usageSummary: {
      mau: "18.6K",
      transactions: "453K",
      activeTenants: 406,
      activeBUs: 6,
      activeChannels: 8,
    },

    healthRisks: {
      criticalHealth: 1,
      degraded: 2,
      lowAdoption: 4,
      dormant: 1,
      recurringIncidents: 3,
      dependencyRisks: 3,
    },

    quickQueues: [
      { label: "Critical Modules", count: 1, tone: "danger" },
      { label: "Degraded Modules", count: 2, tone: "warning" },
      { label: "Open Incidents", count: 7, tone: "danger" },
      { label: "SLA Warnings", count: 5, tone: "warning" },
      { label: "Performance Warnings", count: 4, tone: "warning" },
      { label: "Low-Adoption Modules", count: 4, tone: "warning" },
      { label: "Dormant Modules", count: 1, tone: "danger" },
      { label: "Adoption Gaps", count: 5, tone: "warning" },
    ],

    recommendedNextAction: {
      title: "Recommended Next Action",
      text: "Review 4 Degraded Modules for performance and adoption. Prioritize 2 low-adoption / dormant modules. Investigate 7 open health incidents.",
      owner: "N. Jayasundere",
      dueDate: "May 21, 2026",
      buttonLabel: "Review Module Health",
    }
  }
};
