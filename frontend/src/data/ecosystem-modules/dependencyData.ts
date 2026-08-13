export interface DependencyRegistryItem {
  id: string;
  fromModule: string;
  fromType: "Module" | "Capability";
  toModuleService: string;
  toType: "Shared" | "External" | "Module";
  criticality: "High" | "Medium" | "Low";
  status: "Required" | "Warning" | "Compatible";
  compatibility: string;
  version: string;
  lastValidated: string;
}

export interface SharedServiceItem {
  status: "Healthy" | "Warning" | "Critical" | "Planned";
  services: number;
  health: string;
}

export interface OwnershipItem {
  owner: string;
  ownedDependencies: number;
  health: string;
}

export interface GovernanceGateItem {
  gate: string;
  passed: boolean;
  status: "Passed" | "Pending" | "Blocked";
  count: number;
}

export interface DependencyActivityItem {
  activity: string;
  source: string;
  target: string;
  type: "External" | "Shared" | "Internal";
  status: "Completed" | "Warning" | "Failed" | "Pending";
  user: string;
  time: string;
}

export const DEPENDENCY_DATA = {
  headerInfo: {
    visibleTitle: "Module Dependencies & Compatibility Map",
    breadcrumb: "Ecosystem Modules > Dependencies & Compatibility",
    description: "Visualize module, capability, service and sector pack relationships, compatibility, version conflicts, upgrade impact, risk, and orchestration logs across the target impact.",
  },

  contextFilters: {
    tenant: "SL Beauty",
    businessUnit: "Beauty Manufacturing",
    environment: "Production",
    sector: "All",
    versionScope: "All Versions",
  },

  engineStatus: {
    dependencyEngine: "Healthy",
    compatibilityEngine: "Healthy",
    lastUpdated: "May 14, 2026, 10:15 AM",
  },

  primaryKpis: [
    { label: "Registered Dependencies", value: 186, tone: "info", icon: "link" },
    { label: "Critical Dependencies", value: 24, tone: "danger", icon: "alert-triangle" },
    { label: "Healthy Dependencies", value: 162, tone: "success", icon: "check-circle" },
    { label: "Warning Dependencies", value: 16, tone: "warning", icon: "alert-circle" },
    { label: "Blocked Dependencies", value: 8, tone: "danger", icon: "x-circle" },
    { label: "Version Conflicts", value: 6, tone: "danger", icon: "git-pull-request" },
    { label: "Circular Dependencies", value: 2, tone: "warning", icon: "refresh-cw" },
    { label: "Orphaned Services", value: 3, tone: "warning", icon: "box" },
    { label: "Release Impacted", value: 5, tone: "info", icon: "layers" },
    { label: "Pending Reviews", value: 5, tone: "info", icon: "clock" },
  ],

  secondaryKpis: [
    { label: "Modules with Dependencies", value: 16, tone: "info" },
    { label: "Capability Dependencies", value: 42, tone: "info" },
    { label: "Sector Pack Dependencies", value: 21, tone: "info" },
    { label: "Shared Services", value: 14, tone: "success" },
    { label: "External Services", value: 9, tone: "neutral" },
    { label: "Production Blocks", value: 4, tone: "danger" },
    { label: "Upgrade Required", value: 7, tone: "warning" },
  ],

  tabs: [
    "Dependency Overview", "Dependency Map", "Capabilities", "Sector Packs",
    "Shared Services", "External Services", "Version Compatibility",
    "Blocking Dependencies", "Change Impact", "Environment Differences",
    "Exceptions", "History"
  ],

  dependencyMapNodes: {
    sourceModules: ["Brand Retail Core", "Store & Fulfilment", "B2B Wholesale"],
    capabilities: [
      { name: "Risk Management", tone: "info" },
      { name: "Inventory Control", tone: "info" },
      { name: "Pricing Engine", tone: "warning" },
      { name: "AI Catalog Insights", tone: "info" },
      { name: "Order Mgmt", tone: "info" },
      { name: "Payment Services", tone: "info" },
      { name: "Customer Segment", tone: "info" },
      { name: "Loyalty Engine", tone: "info" },
    ],
    sharedServices: [
      "Identity Service", "Notification Service", "Doc Management",
      "API Gateway", "Audit Service", "Data Lake", "Media Service"
    ],
    externalServices: [
      "Payment Gateway", "Logistics Carrier", "Tax Service",
      "Email Service", "Analytics Platform", "IDP Service"
    ]
  },

  selectedDependencyDetail: {
    from: "Pricing Engine (Capability)",
    to: "Payment Gateway (External)",
    type: "External Service Dependency",
    relationship: "Required",
    direction: "Outbound",
    criticality: "High",
    version: "2.1.3 → 2.1.5",
    environment: "Production",
    status: "Warning",
    compatibility: "Partial",
    lastValidated: "May 14, 2026, 10:15 AM",
  },

  registry: [
    { id: "dep-001", fromModule: "Inventory Control", fromType: "Capability", toModuleService: "Inventory Service", toType: "Shared", criticality: "High", status: "Required", compatibility: "100%", version: "v3.2.1", lastValidated: "May 14, 2026" },
    { id: "dep-002", fromModule: "Order Mgmt", fromType: "Capability", toModuleService: "Payment Gateway", toType: "External", criticality: "High", status: "Warning", compatibility: "Partial", version: "v2.1.3 → 2.1.5", lastValidated: "May 14, 2026" },
    { id: "dep-003", fromModule: "Pricing Engine", fromType: "Capability", toModuleService: "Tax Service", toType: "External", criticality: "Medium", status: "Compatible", compatibility: "100%", version: "v1.4.2", lastValidated: "May 14, 2026" },
    { id: "dep-004", fromModule: "AI Catalog Insights", fromType: "Capability", toModuleService: "AI/ML Service", toType: "Shared", criticality: "Medium", status: "Required", compatibility: "95%", version: "v1.8.0", lastValidated: "May 14, 2026" },
    { id: "dep-005", fromModule: "Loyalty Engine", fromType: "Capability", toModuleService: "Analytics Platform", toType: "External", criticality: "Low", status: "Compatible", compatibility: "100%", version: "v2.0.1", lastValidated: "May 14, 2026" },
    { id: "dep-006", fromModule: "Brand Retail Core", fromType: "Module", toModuleService: "Notification Service", toType: "Shared", criticality: "Medium", status: "Required", compatibility: "100%", version: "v3.3.0", lastValidated: "May 14, 2026" },
    { id: "dep-007", fromModule: "Store & Fulfilment", fromType: "Module", toModuleService: "Logistics Carrier", toType: "External", criticality: "High", status: "Required", compatibility: "100%", version: "v4.1.0", lastValidated: "May 14, 2026" },
    { id: "dep-008", fromModule: "B2B Wholesale", fromType: "Module", toModuleService: "Payment Gateway", toType: "External", criticality: "High", status: "Warning", compatibility: "Partial", version: "v2.1.3 → 2.1.5", lastValidated: "May 14, 2026" },
  ] as DependencyRegistryItem[],

  summaryMatrix: {
    moduleDependency: { totalModules: 16, withDependencies: 16, withoutDependencies: 0, criticalModules: 4, highRiskModules: 5 },
    capabilityDependency: { totalCapabilities: 42, required: 26, optional: 10, conditional: 4, incompatible: 2 },
    sectorPackDependency: { totalSectorPacks: 21, fullyCompatible: 10, partiallyCompatible: 7, incompatible: 2, notUsed: 2 },
    sharedServicesPortfolio: [
      { status: "Healthy", services: 12, health: "92%" },
      { status: "Warning", services: 3, health: "60%" },
      { status: "Critical", services: 1, health: "35%" },
      { status: "Planned", services: 1, health: "—" },
    ] as SharedServiceItem[],
    externalServicesPortfolio: [
      { status: "Healthy", services: 6, health: "90%" },
      { status: "Warning", services: 2, health: "60%" },
      { status: "Critical", services: 1, health: "25%" },
      { status: "Planned", services: 1, health: "—" },
    ] as SharedServiceItem[],
    versionCompatibilityMatrix: {
      columns: ["v2.x", "v3.x", "v4.x", "v5.x", "v6.x"],
      rows: [
        { from: "v2.x", values: ["—", "12", "5", "2", "0"] },
        { from: "v3.x", values: ["10", "—", "18", "6", "1"] },
        { from: "v4.x", values: ["3", "16", "—", "12", "2"] },
        { from: "v5.x", values: ["1", "4", "9", "—", "3"] },
        { from: "v6.x", values: ["0", "1", "2", "3", "—"] },
      ]
    },
    versionConflicts: {
      majorConflicts: 6,
      minorConflicts: 8,
      deprecatedVersions: 4,
      pendingMigrations: 10,
      pendingResolutions: 5
    }
  },

  secondaryAnalysis: {
    upgradeReadiness: { ready: 12, readyPct: "57%", needsUpgrade: 7, needsUpgradePct: "33%", blocked: 2, blockedPct: "10%" },
    circularDependencies: { totalDetected: 2, critical: 1, resolved: 0, pending: 1 },
    orphanedServices: { totalOrphaned: 3, highImpact: 1, mediumImpact: 1, lowImpact: 1 },
    blockingDependencies: { totalBlocking: 4, byExternalService: 2, byModule: 1, byVersion: 1 },
    impactChangeAnalysis: { changesPending: 18, highImpact: 6, mediumImpact: 8, lowImpact: 4 },
    releaseImpactSummary: { nextReleaseImpacted: 5, modulesImpacted: 3, capabilitiesImpacted: 7, servicesImpacted: 9 },
    environmentDrift: { totalDriftItems: 4, criticalDrift: 1, warningDrift: 2, infoDrift: 1 },
    dependencyHealthMatrix: { healthy: 162, warning: 16, critical: 8, blocked: 4, score: 94 }
  },

  ownership: [
    { owner: "Platform Engineering", ownedDependencies: 68, health: "96%" },
    { owner: "Integration Services", ownedDependencies: 54, health: "92%" },
    { owner: "Product Operations", ownedDependencies: 32, health: "90%" },
    { owner: "Data Engineering", ownedDependencies: 20, health: "89%" },
    { owner: "Vendor Management", ownedDependencies: 12, health: "84%" },
  ] as OwnershipItem[],

  governanceGates: [
    { gate: "Design Review", passed: true, status: "Passed", count: 16 },
    { gate: "Security Review", passed: true, status: "Passed", count: 16 },
    { gate: "Compliance Review", passed: true, status: "Passed", count: 15 },
    { gate: "Performance Review", passed: true, status: "Passed", count: 16 },
    { gate: "Change Advisory", passed: true, status: "Passed", count: 14 },
  ] as GovernanceGateItem[],

  exceptionCenter: {
    totalExceptions: 5,
    active: 3,
    acknowledged: 1,
    resolved: 1
  },

  recentActivity: [
    { activity: "Dependency Added", source: "Order Mgmt", target: "Tax Service", type: "External", status: "Completed", user: "Elena Wang", time: "10:12 AM" },
    { activity: "Version Updated", source: "Pricing Engine", target: "Payment Gateway", type: "External", status: "Completed", user: "Rajiv Patel", time: "09:50 AM" },
    { activity: "Compatibility Warning", source: "Inventory Control", target: "Inventory Service", type: "Shared", status: "Warning", user: "System", time: "09:41 AM" },
    { activity: "Dependency Removed", source: "Loyalty Engine", target: "Email Service", type: "External", status: "Completed", user: "Maya Chen", time: "09:30 AM" },
    { activity: "Validation Completed", source: "All Modules", target: "All Services", type: "System", status: "Completed", user: "System", time: "09:15 AM" },
  ] as DependencyActivityItem[],

  rightPanel: {
    healthScore: 94,
    healthLabel: "Very Good",
    lastUpdated: "May 14, 2026",

    dependencySummary: {
      registered: 186,
      critical: 24,
      warning: 16,
      blocked: 8,
      healthy: 162,
      pendingReviews: 5,
    },

    compatibilitySummary: {
      fullyCompatible: 164,
      partiallyCompatible: 16,
      incompatible: 4,
      unknown: 2,
    },

    impactSummary: {
      productionBlocks: 4,
      highImpact: 6,
      mediumImpact: 8,
      lowImpact: 4,
      releaseImpacted: 5,
    },

    quickQueues: [
      { label: "Pending Validations", count: 2, tone: "danger" },
      { label: "Version Conflicts", count: 6, tone: "danger" },
      { label: "Upgrade Required", count: 7, tone: "warning" },
      { label: "Blocking Dependencies", count: 4, tone: "danger" },
      { label: "Exception Items", count: 3, tone: "warning" },
      { label: "Pending Reviews", count: 5, tone: "info" },
    ],

    recommendedNextAction: [
      "1. Resolve the 4 Production Blockers.",
      "2. Address the 6 Version Conflicts.",
      "3. Review 5 Pending Validations.",
      "4. Complete 7 Required Upgrades.",
      "5. Review 3 Active Exceptions."
    ]
  }
};
