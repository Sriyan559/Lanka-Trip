export interface VersionReleaseItem {
  id: string;
  ref: string;
  component: string;
  componentType: "Core" | "Service" | "Plugin" | "Module";
  targetEnv: "Production" | "Staging" | "Test" | "Development";
  releaseStatus: "Awaiting Approval" | "Scheduled" | "In Progress" | "Blocked" | "Released" | "Awaiting Compliance";
  releaseVersion: "Major" | "Minor" | "Patch";
  currentVersion: string;
  targetVersion: string;
  compatibility: string;
  security: "Green" | "Amber" | "Red";
  compliance: "Compliant" | "Non-Compliant" | "Review";
  migration: "Not Req" | "Planned" | "Required";
  rollback: "Ready" | "Warning" | "Not Ready";
  readiness: string;
  risk: "Low" | "Medium" | "High";
}

export interface EnvironmentPromotionItem {
  env: string;
  version: string;
  status: "Approved" | "Pending" | "Planned" | "Not Deployed";
  stateColor: string;
}

export interface EnvironmentMatrixRow {
  component: string;
  development: string;
  test: string;
  staging: string;
  pilot: string;
  production: string;
}

export interface ReadinessPortfolioItem {
  status: string;
  count: number;
  readinessPct: string;
  avgRisk: "Low" | "Medium" | "High";
  criticalItems: number;
}

export interface GovernanceGateItem {
  gate: string;
  status: "Passed" | "Pending" | "Blocked";
  trend: "Ready" | "No Working Dependencies" | "No Critical Issues" | "All Policies Compliant" | "Migration Not Required";
  notes: string;
}

export interface EnvironmentDriftItem {
  env: string;
  components: number;
  severity: "High" | "Medium" | "Low";
  status: "Drift" | "Warning" | "OK";
}

export interface PromotionQueueItem {
  fromEnv: string;
  toEnv: string;
  release: string;
  approval: string;
  status: "Approved" | "Pending" | "Scheduled";
  window: string;
}

export interface ReleaseCalendarItem {
  date: string;
  release: string;
  env: string;
  type: string;
  status: "Scheduled" | "In Progress" | "Completed";
}

export interface WindowConflictItem {
  date: string;
  conflicts: number;
  impact: "High" | "Medium" | "Low";
}

export interface MigrationReadinessItem {
  component: string;
  migrationStatus: "Not Required" | "Planning" | "Ready" | "Blocked";
  plan: string;
}

export interface RollbackReadinessItem {
  component: string;
  status: "Ready" | "Warning" | "Not Ready";
  rollbackPlan: string;
  tested: boolean;
  owner: string;
}

export interface DependencyImpactItem {
  impactLevel: "Critical" | "High" | "Medium" | "Low";
  components: number;
  risk: "High" | "Medium" | "Low";
}

export interface FeatureFlagReadinessItem {
  flag: string;
  readinessPct: string;
  status: "Ready" | "Warning" | "Blocked";
}

export interface RegionalReadinessItem {
  region: string;
  health: string;
  readiness: "Ready" | "Good" | "In-Review";
}

export interface PostReleaseMonitoringItem {
  component: string;
  health: string;
  errors: number;
  exceptions: number;
}

export interface SupportLifecycleItem {
  lifecycleStage: string;
  count: number;
  exceptionType: string;
  dependencies: number;
  severity: "High" | "Medium" | "Low";
}

export interface RecentReleaseActivityItem {
  activity: string;
  component: string;
  user: string;
  time: string;
  details: string;
}

export const RELEASE_DATA = {
  headerInfo: {
    visibleTitle: "Versions, Releases & Environment Management",
    breadcrumb: "Ecosystem Modules > Versions & Releases",
    description: "Ecosystem-wide version governance, release candidates, environment promotion, production readiness, approvals, rollback plans, migrations, and deployment impact.",
  },

  contextBar: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    scope: "Enterprise Wide",
    region: "Sri Lanka",
    timezone: "GMT+5:30",
    registryStatus: "Connected",
    releaseGovernance: "Healthy (95/100)",
    lastUpdated: "May 14, 2026, 10:15 AM",
  },

  primaryKpis: [
    { label: "Registered Versions", value: 146, tone: "info" },
    { label: "Released Versions", value: 92, tone: "success" },
    { label: "Release Candidates", value: 8, tone: "warning" },
    { label: "Scheduled Releases", value: 6, tone: "info" },
    { label: "In Progress", value: 4, tone: "info" },
    { label: "Blocked", value: 3, tone: "danger" },
    { label: "Production Releases", value: 31, tone: "success" },
    { label: "Rollback Ready", value: 27, tone: "success" },
    { label: "Migration Required", value: 9, tone: "warning" },
    { label: "Release Health", value: "95/100", tone: "success" },
  ],

  secondaryKpis: [
    { label: "Modules with Active Releases", value: 16, tone: "info" },
    { label: "Services with Active Releases", value: 5, tone: "info" },
    { label: "Releases This Month", value: 7, tone: "success" },
    { label: "Pending Approvals", value: 5, tone: "warning" },
    { label: "Dependency Blocks", value: 3, tone: "danger" },
    { label: "Environment Drift Items", value: 6, tone: "warning" },
    { label: "Breaking Changes", value: 2, tone: "danger" },
    { label: "Expiring Support Versions", value: 4, tone: "warning" },
  ],

  tabs: [
    "Release Overview", "All Versions", "Release Candidates", "Scheduled",
    "In Progress", "Released", "Production", "Blocked", "Environments",
    "Promotion", "Rollbacks", "Migrations", "Breaking Changes",
    "Support Lifecycle", "Exceptions", "History"
  ],

  registry: [
    { id: "rel-001", ref: "REL-BEAUTY-ADVR-1.0.0", component: "AI Beauty Advisor", componentType: "Core", targetEnv: "Production", releaseStatus: "Awaiting Approval", releaseVersion: "Major", currentVersion: "1.0.0", targetVersion: "1.1.0", compatibility: "100%", security: "Green", compliance: "Compliant", migration: "Not Req", rollback: "Ready", readiness: "88%", risk: "Medium" },
    { id: "rel-002", ref: "REL-CAT-001-2.0.0", component: "B2C Marketplace", componentType: "Module", targetEnv: "Production", releaseStatus: "Scheduled", releaseVersion: "Major", currentVersion: "2.0.0", targetVersion: "2.1.0", compatibility: "98%", security: "Green", compliance: "Compliant", migration: "Planned", rollback: "Ready", readiness: "95%", risk: "Low" },
    { id: "rel-003", ref: "REL-CS-001-1.3.0", component: "Logistics", componentType: "Plugin", targetEnv: "Staging", releaseStatus: "In Progress", releaseVersion: "Minor", currentVersion: "1.3.0", targetVersion: "1.4.0", compatibility: "98%", security: "Green", compliance: "Compliant", migration: "Planned", rollback: "Warning", readiness: "78%", risk: "Medium" },
    { id: "rel-004", ref: "REL-LGT-001-1.4.0", component: "Finance", componentType: "Service", targetEnv: "Test", releaseStatus: "Blocked", releaseVersion: "Major", currentVersion: "2.9.0", targetVersion: "3.0.0", compatibility: "90%", security: "Red", compliance: "Compliant", migration: "Required", rollback: "Not Ready", readiness: "45%", risk: "High" },
    { id: "rel-005", ref: "REL-CUS-001-1.5.0", component: "Customer Support", componentType: "Module", targetEnv: "Prod", releaseStatus: "Released", releaseVersion: "Minor", currentVersion: "1.5.0", targetVersion: "1.6.0", compatibility: "100%", security: "Green", compliance: "Non-Compliant", migration: "Not Req", rollback: "Ready", readiness: "92%", risk: "Low" },
    { id: "rel-006", ref: "REL-MKT-001-2.2.0", component: "Marketing", componentType: "Module", targetEnv: "Development", releaseStatus: "Awaiting Compliance", releaseVersion: "Minor", currentVersion: "2.1.0", targetVersion: "2.2.0", compatibility: "100%", security: "Green", compliance: "Compliant", migration: "Planned", rollback: "Warning", readiness: "85%", risk: "Medium" },
    { id: "rel-007", ref: "REL-CRM-2026-1.8.0", component: "CRM & Loyalty", componentType: "Core", targetEnv: "Production", releaseStatus: "Released", releaseVersion: "Major", currentVersion: "1.7.0", targetVersion: "1.8.0", compatibility: "100%", security: "Green", compliance: "Compliant", migration: "Not Req", rollback: "Ready", readiness: "98%", risk: "Low" },
    { id: "rel-008", ref: "REL-ANA-2026-1.3.0", component: "Analytics", componentType: "Module", targetEnv: "Production", releaseStatus: "Released", releaseVersion: "Patch", currentVersion: "1.2.0", targetVersion: "1.3.0", compatibility: "100%", security: "Green", compliance: "Compliant", migration: "Not Req", rollback: "Ready", readiness: "100%", risk: "Low" },
  ] as VersionReleaseItem[],

  selectedReleaseDetail: {
    releaseRef: "REL-BEAUTY-ADVR-1.0.0",
    component: "AI Beauty Advisor",
    componentType: "Core",
    targetEnvironment: "Production",
    currentVersion: "1.0.0",
    targetVersion: "1.1.0",
    releaseStatus: "Awaiting Approval",
    readiness: "88%",
    riskLevel: "Medium",
    approvalStatus: "Pending",
    productionEligibility: "Eligible",
    businessOwner: "AI Platform Engineering",
    productOwner: "Elena Vance",
    technicalOwner: "Maya Chen",
    securityReview: "Green",
    complianceReview: "Green",
    migration: "None",
    created: "May 14, 2026",
    targetRelease: "May 16, 2026",
  },

  lifecyclePipeline: {
    stages: ["Draft", "Review", "Release Candidate", "Validation", "Approval", "Scheduled", "Deployment", "Completed"],
    currentStageIndex: 4, // Approval
  },

  environmentPromotion: [
    { env: "Development", version: "v1.0.0", status: "Approved", stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { env: "Test", version: "v1.2.0", status: "Approved", stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { env: "Staging", version: "v1.3.0", status: "Pending", stateColor: "text-amber-700 bg-amber-50 border-amber-200" },
    { env: "Pilot", version: "v1.0.0", status: "Planned", stateColor: "text-blue-700 bg-blue-50 border-blue-200" },
    { env: "Production", version: "v1.0.0", status: "Not Deployed", stateColor: "text-slate-600 bg-slate-50 border-slate-200" },
  ] as EnvironmentPromotionItem[],

  environmentMatrix: [
    { component: "AI Beauty Advisor", development: "v1.0.0", test: "v1.0.0", staging: "v1.0.0", pilot: "v1.0.0", production: "v1.0.0" },
    { component: "B2C Marketplace", development: "v2.1.0", test: "v2.1.0", staging: "v2.1.0", pilot: "v2.1.0", production: "v2.1.0" },
    { component: "Catalog", development: "v1.2.0", test: "v1.2.0", staging: "v1.2.0", pilot: "v1.2.0", production: "v1.2.0" },
    { component: "Finance", development: "v3.0.0", test: "v3.0.0", staging: "v3.0.0", pilot: "v3.0.0", production: "v3.0.0" },
    { component: "Logistics", development: "v1.4.0", test: "v1.4.0", staging: "v1.4.0", pilot: "v1.4.0", production: "v1.4.0" },
    { component: "Customer Support", development: "v1.6.0", test: "v1.6.0", staging: "v1.6.0", pilot: "v1.6.0", production: "v1.6.0" },
  ] as EnvironmentMatrixRow[],

  readinessPortfolio: [
    { status: "Awaiting Approval", count: 2, readinessPct: "88%", avgRisk: "Medium", criticalItems: 5 },
    { status: "Ready", count: 2, readinessPct: "98%", avgRisk: "Low", criticalItems: 2 },
    { status: "In Progress", count: 1, readinessPct: "78%", avgRisk: "Medium", criticalItems: 4 },
    { status: "Scheduled", count: 2, readinessPct: "92%", avgRisk: "Low", criticalItems: 1 },
    { status: "Blocked", count: 1, readinessPct: "45%", avgRisk: "High", criticalItems: 7 },
    { status: "Released", count: 31, readinessPct: "99%", avgRisk: "Low", criticalItems: 0 },
  ] as ReadinessPortfolioItem[],

  governanceGates: [
    { gate: "Build Validation", status: "Passed", trend: "Ready", notes: "Build passed cleanly" },
    { gate: "Compatibility Assessment", status: "Passed", trend: "Ready", notes: "100% compatible" },
    { gate: "Dependency Readiness", status: "Passed", trend: "No Working Dependencies", notes: "All dependencies resolved" },
    { gate: "Security Review", status: "Passed", trend: "No Critical Issues", notes: "0 critical vulnerabilities" },
    { gate: "Compliance Review", status: "Passed", trend: "All Policies Compliant", notes: "Legal clearance obtained" },
    { gate: "Migration Plan", status: "Passed", trend: "Migration Not Required", notes: "No schema changes required" },
  ] as GovernanceGateItem[],

  environmentDrift: [
    { env: "Development", components: 5, severity: "Low", status: "Drift" },
    { env: "Test", components: 3, severity: "Low", status: "OK" },
    { env: "Staging", components: 2, severity: "Medium", status: "Warning" },
    { env: "Pilot", components: 1, severity: "Low", status: "OK" },
  ] as EnvironmentDriftItem[],

  promotionQueue: [
    { fromEnv: "Development", toEnv: "Test", release: "v1.0.0", approval: "1/2", status: "Approved", window: "May 14, 2026" },
    { fromEnv: "Test", toEnv: "Staging", release: "v1.2.0", approval: "2/2", status: "Approved", window: "May 15, 2026" },
    { fromEnv: "Staging", toEnv: "Pilot", release: "v1.3.0", approval: "0/2", status: "Pending", window: "May 16, 2026" },
    { fromEnv: "Pilot", toEnv: "Production", release: "v1.0.0", approval: "0/2", status: "Pending", window: "May 17, 2026" },
  ] as PromotionQueueItem[],

  releaseCalendar: [
    { date: "May 15, 2026", release: "AI Beauty Advisor v1.0.0", env: "Production", type: "Major", status: "Scheduled" },
    { date: "May 16, 2026", release: "B2C Marketplace v2.1.0", env: "Production", type: "Major", status: "Scheduled" },
    { date: "May 17, 2026", release: "Finance v3.0.0", env: "Staging", type: "Minor", status: "Scheduled" },
    { date: "May 18, 2026", release: "Logistics v1.4.0", env: "Staging", type: "Minor", status: "Scheduled" },
  ] as ReleaseCalendarItem[],

  windowConflicts: [
    { date: "May 15, 2026", conflicts: 2, impact: "Medium" },
    { date: "May 16, 2026", conflicts: 1, impact: "Low" },
    { date: "May 17, 2026", conflicts: 1, impact: "Low" },
  ] as WindowConflictItem[],

  versionComparison: {
    fromVersion: "All Beauty Advisor v1.0.0",
    toVersion: "All Beauty Advisor v1.1.0",
    changes: 24,
    breakingChanges: 2,
    deprecatedFeatures: 3,
    newFeatures: 8,
  },

  migrationReadiness: [
    { component: "AI Beauty Advisor", migrationStatus: "Not Required", plan: "—" },
    { component: "Finance", migrationStatus: "Planning", plan: "Automated" },
    { component: "Logistics", migrationStatus: "Ready", plan: "Manual" },
  ] as MigrationReadinessItem[],

  rollbackReadiness: [
    { component: "AI Beauty Advisor", status: "Ready", rollbackPlan: "Yes", tested: true, owner: "Maya Chen" },
    { component: "B2C Marketplace", status: "Warning", rollbackPlan: "Yes", tested: false, owner: "Rajiv Patel" },
    { component: "Finance", status: "Not Ready", rollbackPlan: "No", tested: false, owner: "System" },
  ] as RollbackReadinessItem[],

  dependencyImpact: [
    { impactLevel: "Critical", components: 3, risk: "High" },
    { impactLevel: "High", components: 1, risk: "High" },
    { impactLevel: "Medium", components: 4, risk: "Medium" },
  ] as DependencyImpactItem[],

  featureFlagReadiness: [
    { flag: "AI Beauty Advisor", readinessPct: "95%", status: "Ready" },
    { flag: "B2C Marketplace", readinessPct: "90%", status: "Ready" },
    { flag: "Finance", readinessPct: "45%", status: "Blocked" },
  ] as FeatureFlagReadinessItem[],

  regionalReadiness: [
    { region: "Sri Lanka", health: "98%", readiness: "Ready" },
    { region: "Singapore", health: "95%", readiness: "Good" },
    { region: "Malaysia", health: "92%", readiness: "Good" },
  ] as RegionalReadinessItem[],

  postReleaseMonitoring: [
    { component: "AI Beauty Advisor", health: "99%", errors: 1, exceptions: 2 },
    { component: "B2C Marketplace", health: "98%", errors: 2, exceptions: 1 },
  ] as PostReleaseMonitoringItem[],

  supportLifecycle: [
    { lifecycleStage: "Expiring Support", count: 4, exceptionType: "Dependency Blocks", dependencies: 3, severity: "High" },
    { lifecycleStage: "Deprecated Versions", count: 2, exceptionType: "Rollback Planning", dependencies: 2, severity: "Medium" },
    { lifecycleStage: "End of Support", count: 2, exceptionType: "Security Reviews", dependencies: 2, severity: "High" },
  ] as SupportLifecycleItem[],

  recentActivity: [
    { activity: "Release candidate created", component: "AI Beauty Advisor v1.0.0", user: "Elena Vance", time: "May 14, 2026, 10:15 AM", details: "Target v1.1.0.0, Plan: Production" },
    { activity: "Approval requested", component: "B2C Marketplace v2.1.0", user: "Maya Chen", time: "May 14, 2026, 09:12 AM", details: "Scheduled for May 16, 2026" },
    { activity: "Release deployed", component: "Logistics v1.4.0", user: "Rajiv Patel", time: "May 14, 2026, 08:32 AM", details: "Deployed to Staging" },
    { activity: "Dependency impact analysis", component: "Finance v3.0.0", user: "Maya Chen", time: "May 14, 2026, 08:11 AM", details: "8 impacted modules" },
    { activity: "Rollback plan validated", component: "Customer Support v1.6.0", user: "Elena Vance", time: "May 14, 2026, 07:45 AM", details: "Rollback tested successfully" },
  ] as RecentReleaseActivityItem[],

  rightPanel: {
    healthScore: 95,
    healthLabel: "Excellent",
    overallHealthText: "Overall Health",
    lastUpdated: "May 14, 2026, 10:15 AM",

    releaseSummary: {
      registeredVersions: 146,
      releaseCandidates: 8,
      scheduledReleases: 6,
      inProgressReleases: 4,
      productionReleases: 31,
      blockedReleases: 3,
    },

    environmentSummary: [
      { env: "Development", status: "Operational" },
      { env: "Test", status: "Operational" },
      { env: "Staging", status: "Operational" },
      { env: "Pilot", status: "Operational" },
      { env: "Production", status: "Operational" },
    ],

    governanceSummary: {
      pendingApprovals: 5,
      dependencyBlocks: 3,
      securityReviews: 2,
      complianceReviews: 2,
      migrationPending: 2,
      rollbackWarnings: 3,
    },

    versionLifecycle: {
      expiringSupport: 4,
      deprecatedVersions: 2,
      endOfSupport: 2,
      instancesOnLegacy: 14,
    },

    quickQueues: [
      { label: "Pending Release Approvals", count: 5, tone: "warning" },
      { label: "Blocked Releases", count: 3, tone: "danger" },
      { label: "Dependency Blocks", count: 3, tone: "danger" },
      { label: "Environment Drift", count: 6, tone: "warning" },
      { label: "Migration Pending", count: 2, tone: "warning" },
      { label: "Rollback Warnings", count: 3, tone: "warning" },
      { label: "Breaking Changes", count: 2, tone: "danger" },
      { label: "Legacy Versions", count: 4, tone: "warning" },
    ],

    recommendedNextAction: {
      title: "Recommended Next Action",
      text: "Review and approve the AI Beauty Advisor v1.0.0 release candidate before promotion to Production.",
      buttonLabel: "Review & Approve Now →",
    }
  }
};
