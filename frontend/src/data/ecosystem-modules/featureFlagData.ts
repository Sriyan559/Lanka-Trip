export interface FeatureFlagRegistryItem {
  id: string;
  ref: string;
  name: string;
  key: string;
  module: string;
  capability: string;
  environment: string;
  strategy: "Percentage" | "Audience" | "Global" | "Conditional";
  currentPct: string;
  targetPct: string;
  audience: string;
  rolloutState: "Pilot" | "Draft" | "Active" | "Scheduled" | "Paused";
  health: "Healthy" | "Warning" | "Critical";
  risk: "Low" | "Medium" | "High";
  action: string;
}

export interface RolloutPortfolioItem {
  name: string;
  currentPct: string;
  targetPct: string;
  health: "Healthy" | "Warning" | "Critical";
}

export interface AudienceRuleItem {
  name: string;
  rule: "Inclusion" | "Exclusion";
  scope: string;
}

export interface AudienceConflictItem {
  type: string;
  exposureImpact: string;
  severity: "High" | "Medium" | "Low";
}

export interface PercentageRolloutItem {
  name: string;
  currentPct: string;
  targetPct: string;
  exposedUsers: string;
  status: "Active" | "Paused" | "Scheduled";
}

export interface ModuleFlagCoverageItem {
  module: string;
  activeFlags: number;
  pilot: number;
  prod: number;
  coverage: string;
}

export interface EnvironmentMatrixItem {
  environment: string;
  totalFlags: number;
  active: number;
  pilot: number;
  prod: number;
  health: string;
}

export interface EnvironmentDriftItem {
  environment: string;
  flag: string;
  expectedState: string;
  currentState: string;
  drift: "County Drift" | "Moving Flags" | "Value Mismatch";
  count: number;
}

export interface RegionalExposureItem {
  name: string;
  activeFlags: number;
  exposurePct: string;
  exposedUsers: string;
  health: string;
}

export interface DependencyConditionItem {
  dependency: string;
  requiredState: string;
  currentState: string;
  compatibility: boolean;
  status: "Passed" | "Degraded" | "Failed";
}

export interface ReleaseCompatibilityItem {
  release: string;
  status: "Compatible" | "Warning" | "Incompatible";
  conflicts: number;
}

export interface GovernanceGateItem {
  gate: string;
  status: "Passed" | "Pending" | "Blocked";
  owner: string;
  lastUpdated: string;
}

export interface ApprovalQueueItem {
  flagName: string;
  type: string;
  submitted: string;
  owner: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface PausedRolloutItem {
  flagName: string;
  pausedSince: string;
  reason: string;
  owner: string;
}

export interface RollbackHistoryItem {
  event: string;
  flag: string;
  time: string;
  reason: string;
  initiatedBy: string;
  status: "Completed" | "Warning" | "Failed";
}

export interface EmergencyControlItem {
  control: string;
  status: "Ready" | "Active" | "Disabled";
  lastUsed: string;
}

export interface FlagActivityItem {
  activity: string;
  flag: string;
  user: string;
  time: string;
  status: "Completed" | "Warning" | "Failed";
}

export const FEATURE_FLAG_DATA = {
  headerInfo: {
    visibleTitle: "Feature Flags, Rollouts & Controlled Enablement",
    breadcrumb: "Ecosystem Modules > Feature Flags",
    description: "Govern feature flags, progressive rollouts, pilot exposure, production enablement, rollback readiness and emergency controls across the ecosystem.",
  },

  contextBar: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    scope: "Enterprise Wide",
    region: "Sri Lanka",
    environment: "All",
    registry: "Connected",
    dependencies: "Healthy",
    governance: "Healthy",
    dataCompleteness: "99%",
    lastRefreshed: "May 14, 2026, 10:15 AM",
    access: "Assigned Scope",
  },

  primaryKpis: [
    { label: "Registered", value: 68, tone: "info" },
    { label: "Active", value: 42, tone: "success" },
    { label: "Production", value: 31, tone: "success" },
    { label: "Pilot", value: 8, tone: "warning" },
    { label: "Scheduled", value: 5, tone: "info" },
    { label: "Paused", value: 4, tone: "danger" },
    { label: "Rollout Ready", value: 37, tone: "success" },
    { label: "High-Risk", value: 3, tone: "danger" },
    { label: "Exceptions", value: 5, tone: "warning" },
    { label: "Health", value: "95/100", tone: "success" },
  ],

  secondaryKpis: [
    { label: "Module Using Flags", value: 14, tone: "info" },
    { label: "Capabilities Controlled", value: 36, tone: "info" },
    { label: "Active Rollouts", value: 18, tone: "success" },
    { label: "Percentage Rollouts", value: 12, tone: "info" },
    { label: "Audience Rollouts", value: 6, tone: "info" },
    { label: "Emergency Overrides", value: 2, tone: "danger" },
    { label: "Pending Approvals", value: 4, tone: "warning" },
    { label: "Expiring Flags", value: 5, tone: "warning" },
  ],

  tabs: [
    "Rollout Overview", "All Flags", "Active", "Pilot", "Scheduled",
    "Paused", "Production", "Module Flags", "Capability Flags",
    "Audience Rollouts", "Percentage Rollouts", "Emergency Overrides",
    "Health & Monitoring", "Exceptions", "History"
  ],

  registry: [
    { id: "ff-001", ref: "FF-WBA-RECOMM-V2", name: "AI Recommendation V2", key: "ai_recomm_v2_advisor", module: "Product Rec", capability: "Product Rec", environment: "Prod + Non-Prod", strategy: "Percentage", currentPct: "25%", targetPct: "100%", audience: "Eligible Users", rolloutState: "Pilot", health: "Healthy", risk: "Medium", action: "View" },
    { id: "ff-002", ref: "FF-CHKOUT-LTY-RWS", name: "New Checkout Flow", key: "checkout_v2_beta", module: "Checkout", capability: "Checkout Exp", environment: "Prod", strategy: "Percentage", currentPct: "15%", targetPct: "100%", audience: "All Users", rolloutState: "Draft", health: "Healthy", risk: "Low", action: "View" },
    { id: "ff-003", ref: "FF-SRCH-RANKING-V2", name: "Search Ranking V2", key: "search_rank_v2", module: "Search", capability: "Search Ranking", environment: "Prod", strategy: "Percentage", currentPct: "75%", targetPct: "100%", audience: "All Users", rolloutState: "Active", health: "Healthy", risk: "Low", action: "View" },
    { id: "ff-004", ref: "FF-CUSLTY-TIERED", name: "Loyalty Rewards Tiering", key: "loyalty_tiering_v2", module: "Loyalty", capability: "Rewards Engine", environment: "Prod", strategy: "Percentage", currentPct: "15%", targetPct: "100%", audience: "Members", rolloutState: "Scheduled", health: "Healthy", risk: "Low", action: "View" },
    { id: "ff-005", ref: "FF-CLO-PERSONALIZED", name: "Personalized Home Panel", key: "home_feed_personal", module: "Customer App", capability: "Personalization", environment: "Prod", strategy: "Percentage", currentPct: "50%", targetPct: "100%", audience: "All Users", rolloutState: "Active", health: "Healthy", risk: "Low", action: "View" },
    { id: "ff-006", ref: "FF-LOG-ETA-BANNER", name: "Logistics ETA Banner", key: "logistics_eta_banner", module: "Logistics", capability: "Notification", environment: "Conditional", strategy: "Global", currentPct: "100%", targetPct: "100%", audience: "All Users", rolloutState: "Pilot", health: "Healthy", risk: "Low", action: "View" },
  ] as FeatureFlagRegistryItem[],

  rolloutPipeline: {
    stages: [
      { name: "Draft", count: 5 },
      { name: "Review", count: 5 },
      { name: "Scheduled", count: 5 },
      { name: "Pilot", count: 8 },
      { name: "Partial Rollout", count: 12 },
      { name: "Full Enablement", count: 31 },
      { name: "Retired", count: 22 },
    ],
    exceptionStates: [
      { name: "Pause", count: 4 },
      { name: "Rollback", count: 3 },
    ]
  },

  selectedFlagDetail: {
    flagName: "AI Recommendation V2",
    environmentScope: "Production + Non-Production",
    flagState: "Pilot",
    rolloutStrategy: "Percentage Rollout",
    currentRollout: "25%",
    targetRollout: "100%",
    audienceScope: "Eligible Customers",
    health: "Healthy",
    riskLevel: "Medium",
    productionEligibility: "Conditional",
    dependencies: "Healthy",
    securityReview: "Approved",
    complianceReview: "Approved",
    owner: "AI Platform Engineering",
    createdOn: "Apr 30, 2026",
    lastUpdated: "May 14, 2026, 10:15 AM",
    metrics: {
      errorRateDelta: "-0.20%",
      latencyP95Delta: "-13.2%",
      conversionLift: "+3.12%",
      supportImpact: "Low",
    }
  },

  activeRollouts: [
    { name: "AI Recommendation V2", currentPct: "25%", targetPct: "100%", health: "Healthy" },
    { name: "New Checkout Flow", currentPct: "15%", targetPct: "100%", health: "Healthy" },
    { name: "Search Ranking V2", currentPct: "75%", targetPct: "100%", health: "Healthy" },
    { name: "Loyalty Rewards Tiering", currentPct: "15%", targetPct: "100%", health: "Healthy" },
    { name: "Home Feed Personalization", currentPct: "50%", targetPct: "100%", health: "Healthy" },
  ] as RolloutPortfolioItem[],

  progressiveRolloutStages: [
    { name: "AI Recommendation V2", currentStep: 2 },
    { name: "New Checkout Flow", currentStep: 1 },
    { name: "Search Ranking V2", currentStep: 4 },
    { name: "Loyalty Rewards Tiering", currentStep: 1 },
    { name: "Home Feed Personalization", currentStep: 3 },
  ],

  audienceRules: [
    { name: "Eligible Customers", rule: "Inclusion", scope: "All Eligible Customers" },
    { name: "Connected Users", rule: "Inclusion", scope: "Connected Users" },
    { name: "Beta Testers", rule: "Inclusion", scope: "Selected Countries" },
    { name: "Internal Users", rule: "Exclusion", scope: "Internal Users" },
  ] as AudienceRuleItem[],

  audienceConflicts: [
    { type: "Overlapping Rules", exposureImpact: "15.2%", severity: "Medium" },
    { type: "Conflicting Segments", exposureImpact: "6.7%", severity: "High" },
    { type: "Mutual Exclusion", exposureImpact: "2.1%", severity: "Medium" },
  ] as AudienceConflictItem[],

  percentageRollouts: [
    { name: "AI Recommendation V2", currentPct: "25%", targetPct: "100%", exposedUsers: "532,400", status: "Active" },
    { name: "Search Ranking V2", currentPct: "75%", targetPct: "100%", exposedUsers: "781,500", status: "Active" },
    { name: "Loyalty Rewards Tiering", currentPct: "15%", targetPct: "100%", exposedUsers: "312,000", status: "Active" },
    { name: "Logistics ETA Banner", currentPct: "100%", targetPct: "100%", exposedUsers: "1,420,000", status: "Active" },
  ] as PercentageRolloutItem[],

  rolloutGuardrails: {
    errorRate: "-0.20%",
    p95Latency: "-12.3%",
    conversionLift: "+3.12%",
    supportImpact: "Low",
  },

  moduleFlagCoverage: [
    { module: "AI Beauty Advisor", activeFlags: 6, pilot: 2, prod: 4, coverage: "100%" },
    { module: "Search", activeFlags: 5, pilot: 1, prod: 4, coverage: "95%" },
    { module: "Checkout", activeFlags: 4, pilot: 2, prod: 2, coverage: "90%" },
    { module: "Loyalty", activeFlags: 4, pilot: 1, prod: 3, coverage: "88%" },
    { module: "Logistics", activeFlags: 3, pilot: 1, prod: 2, coverage: "85%" },
  ] as ModuleFlagCoverageItem[],

  environmentMatrix: [
    { environment: "Development", totalFlags: 68, active: 42, pilot: 12, prod: 18, health: "99%" },
    { environment: "Staging", totalFlags: 62, active: 38, pilot: 10, prod: 16, health: "98%" },
    { environment: "Pilot", totalFlags: 48, active: 32, pilot: 8, prod: 11, health: "96%" },
    { environment: "Production", totalFlags: 31, active: 31, pilot: 6, prod: 6, health: "95%" },
  ] as EnvironmentMatrixItem[],

  environmentDrift: [
    { environment: "Config Drift", flag: "Moving Flags", expectedState: "—", currentState: "—", drift: "County Drift", count: 3 },
    { environment: "Value Drift", flag: "Value Mismatch", expectedState: "—", currentState: "—", drift: "Moving Flags", count: 1 },
    { environment: "State Drift", flag: "State Conflict", expectedState: "—", currentState: "—", drift: "Value Mismatch", count: 2 },
  ] as EnvironmentDriftItem[],

  buChannelExposure: [
    { name: "Online Store", activeFlags: 27, exposurePct: "16%", exposedUsers: "1,135,000", health: "98%" },
    { name: "Mobile App", activeFlags: 22, exposurePct: "14%", exposedUsers: "920,000", health: "97%" },
    { name: "Retail POS", activeFlags: 18, exposurePct: "11%", exposedUsers: "368,000", health: "95%" },
    { name: "Partner Portal", activeFlags: 15, exposurePct: "10%", exposedUsers: "210,000", health: "92%" },
  ] as RegionalExposureItem[],

  tenantExposure: [
    { name: "SL Beauty", activeFlags: 42, exposurePct: "6%", exposedUsers: "725K", health: "98%" },
    { name: "Glam Retail", activeFlags: 38, exposurePct: "5%", exposedUsers: "650K", health: "96%" },
    { name: "Beauty Hub", activeFlags: 36, exposurePct: "4%", exposedUsers: "410K", health: "95%" },
  ] as RegionalExposureItem[],

  countryExposure: [
    { name: "Sri Lanka", activeFlags: 42, exposurePct: "15%", exposedUsers: "1,486,800", health: "98%" },
    { name: "India", activeFlags: 38, exposurePct: "12%", exposedUsers: "420,000", health: "95%" },
    { name: "Singapore", activeFlags: 35, exposurePct: "10%", exposedUsers: "510,000", health: "94%" },
  ] as RegionalExposureItem[],

  dependencyConditions: [
    { dependency: "AI Feature Gateway", requiredState: "Available", currentState: "Available", compatibility: true, status: "Passed" },
    { dependency: "Search Service", requiredState: "Available", currentState: "Available", compatibility: true, status: "Passed" },
    { dependency: "Inventory Service", requiredState: "Available", currentState: "Available", compatibility: true, status: "Passed" },
    { dependency: "Notification Service", requiredState: "Available", currentState: "Degraded", compatibility: false, status: "Degraded" },
  ] as DependencyConditionItem[],

  releaseCompatibility: [
    { release: "v2.5.1 Core", status: "Compatible", conflicts: 0 },
    { release: "v2.6.0 Core", status: "Compatible", conflicts: 0 },
    { release: "v2.7.0 Core", status: "Warning", conflicts: 2 },
    { release: "Legacy v2.1.x", status: "Incompatible", conflicts: 4 },
  ] as ReleaseCompatibilityItem[],

  governanceGates: [
    { gate: "Security Review", status: "Passed", owner: "SecTeam", lastUpdated: "May 10" },
    { gate: "Architecture Review", status: "Passed", owner: "ArchTeam", lastUpdated: "May 11" },
    { gate: "Compliance Review", status: "Passed", owner: "LegalTeam", lastUpdated: "May 12" },
    { gate: "Performance Review", status: "Passed", owner: "PerfTeam", lastUpdated: "May 13" },
    { gate: "Business Review", status: "Passed", owner: "BizTeam", lastUpdated: "May 14" },
    { gate: "Emergency Review", status: "Passed", owner: "SecTeam", lastUpdated: "May 14" },
  ] as GovernanceGateItem[],

  approvalQueue: [
    { flagName: "AI Recommendation V2 Pilot", type: "Pilot", submitted: "May 14, 10:12 AM", owner: "Elena Wang", status: "Pending" },
    { flagName: "Increase Search P95", type: "Rollout", submitted: "May 14, 09:45 AM", owner: "Priya Kumar", status: "Pending" },
    { flagName: "Enable Checkout Flow", type: "Rollout", submitted: "May 14, 08:30 AM", owner: "Arjun Patel", status: "Pending" },
    { flagName: "Loyalty Tiering Pilot", type: "Pilot", submitted: "May 14, 07:15 AM", owner: "David Chen", status: "Pending" },
  ] as ApprovalQueueItem[],

  pausedRollouts: [
    { flagName: "Home Feed Personalization", pausedSince: "May 12, 10:30 AM", reason: "Data Drift", owner: "Elena Wang" },
    { flagName: "Loyalty Rewards Tiering", pausedSince: "May 13, 02:15 PM", reason: "Data Issue", owner: "Arjun Patel" },
    { flagName: "Checkout Flow V2", pausedSince: "May 14, 01:00 AM", reason: "Business Hold", owner: "David Chen" },
  ] as PausedRolloutItem[],

  rollbackReadiness: {
    ready: 37,
    warning: 4,
    notReady: 2,
  },

  rollbackHistory: [
    { event: "Rollback Executed", flag: "Search Ranking V2", time: "May 13, 04:00 PM", reason: "P95 Latency Spike", initiatedBy: "Elena Wang", status: "Completed" },
    { event: "Rollback Successful", flag: "Loyalty Tiering", time: "May 13, 01:20 PM", reason: "Calculation Error", initiatedBy: "Priya Kumar", status: "Completed" },
    { event: "Rollback Executed", flag: "Checkout V2", time: "May 12, 09:45 PM", reason: "Conversion Drop", initiatedBy: "David Chen", status: "Completed" },
  ] as RollbackHistoryItem[],

  emergencyControls: [
    { control: "Disable Feature Flags", status: "Ready", lastUsed: "May 10, 02:00 AM" },
    { control: "AI Advisor Disable", status: "Ready", lastUsed: "May 08, 05:00 AM" },
    { control: "Checkout Shutdown", status: "Ready", lastUsed: "May 04, 01:00 AM" },
    { control: "Content Failover", status: "Ready", lastUsed: "May 02, 04:00 AM" },
  ] as EmergencyControlItem[],

  expiringFlags: {
    expiringSoon: 5,
    stale1to30: 6,
    stale30Plus: 2,
  },

  healthMatrix: {
    healthy: 42,
    warning: 4,
    critical: 1,
    total: 47,
  },

  exceptionCenter: {
    totalExceptions: 5,
    critical: 1,
    high: 2,
    medium: 2,
  },

  recentActivity: [
    { activity: "Flag Created", flag: "Logistics ETA Banner", user: "Maya Chen", time: "May 14, 10:50 AM", status: "Completed" },
    { activity: "Rollout Increased", flag: "Search Ranking V2", user: "Priya Kumar", time: "May 14, 09:30 AM", status: "Completed" },
    { activity: "Audience Updated", flag: "Checkout V2", user: "Arjun Patel", time: "May 14, 08:15 AM", status: "Completed" },
    { activity: "Rollback Executed", flag: "Loyalty Rewards Tiering", user: "Arjun Patel", time: "May 13, 04:20 PM", status: "Completed" },
    { activity: "Flag Paused", flag: "Home Feed Personalization", user: "Elena Wang", time: "May 12, 10:30 AM", status: "Completed" },
  ] as FlagActivityItem[],

  rightPanel: {
    healthScore: 95,
    healthLabel: "Excellent",
    overallHealthText: "Overall Health",

    flagSummary: {
      registered: 68,
      active: 42,
      production: 31,
      pilot: 8,
      scheduled: 5,
      paused: 4,
    },

    exposureOverview: {
      activeRollouts: 18,
      percentageRollouts: 12,
      audienceRollouts: 6,
      productionExposure: "72%",
      pilotExposure: "16%",
    },

    governanceSummary: {
      pendingApprovals: 4,
      highRiskFlags: 3,
      dependencyWarnings: 3,
      complianceWarnings: 2,
      emergencyOverrides: 2,
      exceptions: 5,
    },

    lifecycleSummary: {
      expiringSoon: 5,
      staleFlags: 6,
      rollbackNotReady: 2,
      requiringReview: 1,
    },

    quickQueues: [
      { label: "Pending Rollout Approvals", count: 4, tone: "warning" },
      { label: "High-Risk Flags", count: 3, tone: "danger" },
      { label: "Paused Rollouts", count: 4, tone: "danger" },
      { label: "Dependency Warnings", count: 3, tone: "warning" },
      { label: "Expiring Flags", count: 5, tone: "warning" },
      { label: "Rollback Warnings", count: 2, tone: "warning" },
      { label: "Emergency Overrides", count: 2, tone: "danger" },
      { label: "Rollback Exceptions", count: 5, tone: "danger" },
    ],

    recommendedNextAction: {
      title: "Recommendation Next Action",
      text: "Review & approve AI Beauty Advisor Recommendation rollout while latency guardrail checks.",
      buttonLabel: "Review Approvals (4)",
    }
  }
};
