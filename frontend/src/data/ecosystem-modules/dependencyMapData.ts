export interface KpiData {
  id: string;
  label: string;
  value: number | string;
  tone: 'success' | 'warning' | 'danger' | 'neutral';
}

export interface DependencyRegistryRow {
  id: string;
  fromModule: string;
  fromType: string;
  toModuleService: string;
  toType: string;
  criticality: 'High' | 'Medium' | 'Low';
  status: 'Required' | 'Compatible' | 'Warning' | 'Blocked';
  compatibility: string | number;
  version: string;
  lastValidated: string;
}

export interface OwnershipRow {
  owner: string;
  ownedDependencies: number;
  health: string;
}

export interface GovernanceGateRow {
  gate: string;
  review: string;
  compliance: string;
  performance: string;
  change: string;
  advisory: string;
}

export interface DependencyActivityRow {
  activity: string;
  source: string;
  target: string;
  type: string;
  status: string;
  user: string;
  time: string;
}

// Primary KPIs (First Row)
export const PRIMARY_KPIS: KpiData[] = [
  { id: '1', label: 'Registered Dependencies', value: 186, tone: 'neutral' },
  { id: '2', label: 'Critical Dependencies', value: 24, tone: 'danger' },
  { id: '3', label: 'Healthy Dependencies', value: 162, tone: 'success' },
  { id: '4', label: 'Warning Dependencies', value: 16, tone: 'warning' },
  { id: '5', label: 'Blocked Dependencies', value: 8, tone: 'danger' },
  { id: '6', label: 'Version Conflicts', value: 6, tone: 'warning' },
  { id: '7', label: 'Circular Dependencies', value: 2, tone: 'danger' },
  { id: '8', label: 'Orphaned Services', value: 3, tone: 'warning' },
  { id: '9', label: 'Release Impacted', value: 5, tone: 'warning' },
  { id: '10', label: 'Pending Reviews', value: 5, tone: 'warning' },
];

// Secondary KPIs (Second Row)
export const SECONDARY_KPIS: KpiData[] = [
  { id: '11', label: 'Modules with Dependencies', value: 16, tone: 'neutral' },
  { id: '12', label: 'Capability Dependencies', value: 42, tone: 'neutral' },
  { id: '13', label: 'Sector Pack Dependencies', value: 21, tone: 'neutral' },
  { id: '14', label: 'Shared Services', value: 14, tone: 'neutral' },
  { id: '15', label: 'External Services', value: 9, tone: 'neutral' },
  { id: '16', label: 'Production Blocks', value: 4, tone: 'danger' },
  { id: '17', label: 'Upgrade Required', value: 7, tone: 'warning' },
];

// Tabs
export const DEPENDENCY_TABS = [
  'Dependency Overview',
  'Dependency Map',
  'Capabilities',
  'Sector Packs',
  'Shared Services',
  'External Services',
  'Version Compatibility',
  'Blocking Dependencies',
  'Change Impact',
  'Environment Differences',
  'Exceptions',
  'History',
];

// Graph nodes and services
export const DEPENDENCY_MAP_DATA = {
  sourceModules: [
    { id: 'brc', label: 'Brand Retail Core', type: 'module' as const, status: 'required' as const },
    { id: 'sf', label: 'Store & Fulfillment', type: 'module' as const, status: 'required' as const },
    { id: 'b2b', label: 'B2B Wholesale', type: 'module' as const, status: 'required' as const },
  ],
  capabilities: [
    { id: 'rm', label: 'Risk Management', type: 'capability' as const, status: 'required' as const },
    { id: 'ic', label: 'Inventory Control', type: 'capability' as const, status: 'required' as const },
    { id: 'pe', label: 'Pricing Engine', type: 'capability' as const, status: 'required' as const },
    { id: 'aci', label: 'AI Catalog Insights', type: 'capability' as const, status: 'required' as const },
    { id: 'om', label: 'Order Mgmt', type: 'capability' as const, status: 'required' as const },
    { id: 'ps', label: 'Payment Services', type: 'capability' as const, status: 'required' as const },
    { id: 'cs', label: 'Customer Segment', type: 'capability' as const, status: 'required' as const },
    { id: 'le', label: 'Loyalty Engine', type: 'capability' as const, status: 'required' as const },
  ],
  sharedServices: [
    { id: 'is', label: 'Identity Service', type: 'shared' as const, status: 'shared' as const },
    { id: 'ns', label: 'Notification Service', type: 'shared' as const, status: 'shared' as const },
    { id: 'dm', label: 'Doc Management', type: 'shared' as const, status: 'shared' as const },
    { id: 'ag', label: 'API Gateway', type: 'shared' as const, status: 'shared' as const },
    { id: 'as', label: 'Audit Service', type: 'shared' as const, status: 'shared' as const },
    { id: 'dl', label: 'Data Lake', type: 'shared' as const, status: 'shared' as const },
    { id: 'ms', label: 'Media Service', type: 'shared' as const, status: 'shared' as const },
  ],
  externalServices: [
    { id: 'pg', label: 'Payment Gateway', type: 'external' as const, status: 'warning' as const },
    { id: 'lc', label: 'Logistics Carrier', type: 'external' as const, status: 'required' as const },
    { id: 'ts', label: 'Tax Service', type: 'external' as const, status: 'required' as const },
    { id: 'es', label: 'Email Service', type: 'external' as const, status: 'required' as const },
    { id: 'ap', label: 'Analytics Platform', type: 'external' as const, status: 'required' as const },
    { id: 'idp', label: 'IDP Service', type: 'external' as const, status: 'required' as const },
  ],
};

export const SELECTED_DEPENDENCY = {
  from: 'Pricing Engine (Capability)',
  to: 'Payment Gateway (External)',
  type: 'External Service Dependency',
  relationship: 'Required' as const,
  direction: 'Outbound',
  criticality: 'High' as const,
  version: '2.1.3 → 2.1.5',
  environment: 'Production',
  status: 'Warning' as const,
  compatibility: 'Partial',
  lastValidated: 'May 14, 2026, 10:15 AM',
};

export const DEPENDENCY_REGISTRY: DependencyRegistryRow[] = [
  {
    id: '1',
    fromModule: 'Inventory Control',
    fromType: 'Capability',
    toModuleService: 'Inventory Service',
    toType: 'Shared',
    criticality: 'High',
    status: 'Required',
    compatibility: '100%',
    version: 'v3.2.1',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '2',
    fromModule: 'Order Mgmt',
    fromType: 'Capability',
    toModuleService: 'Payment Gateway',
    toType: 'External',
    criticality: 'High',
    status: 'Warning',
    compatibility: 'Partial',
    version: 'v2.1.3 → 2.1.5',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '3',
    fromModule: 'Pricing Engine',
    fromType: 'Capability',
    toModuleService: 'Tax Service',
    toType: 'External',
    criticality: 'Medium',
    status: 'Compatible',
    compatibility: '100%',
    version: 'v1.4.2',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '4',
    fromModule: 'AI Catalog Insights',
    fromType: 'Capability',
    toModuleService: 'AI/ML Service',
    toType: 'Shared',
    criticality: 'Medium',
    status: 'Required',
    compatibility: '95%',
    version: 'v1.8.0',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '5',
    fromModule: 'Loyalty Engine',
    fromType: 'Capability',
    toModuleService: 'Analytics Platform',
    toType: 'External',
    criticality: 'Low',
    status: 'Compatible',
    compatibility: '100%',
    version: 'v2.0.1',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '6',
    fromModule: 'Brand Retail Core',
    fromType: 'Module',
    toModuleService: 'Notification Service',
    toType: 'Shared',
    criticality: 'Medium',
    status: 'Required',
    compatibility: '100%',
    version: 'v3.3.0',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '7',
    fromModule: 'Store & Fulfillment',
    fromType: 'Module',
    toModuleService: 'Logistics Carrier',
    toType: 'External',
    criticality: 'High',
    status: 'Required',
    compatibility: '100%',
    version: 'v4.1.0',
    lastValidated: 'May 14, 2026',
  },
  {
    id: '8',
    fromModule: 'B2B Wholesale',
    fromType: 'Module',
    toModuleService: 'Payment Gateway',
    toType: 'External',
    criticality: 'High',
    status: 'Warning',
    compatibility: 'Partial',
    version: 'v2.1.3 → 2.1.5',
    lastValidated: 'May 14, 2026',
  },
];

// Ownership & Accountability
export const OWNERSHIP_DATA: OwnershipRow[] = [
  { owner: 'Platform Engineering', ownedDependencies: 68, health: '96%' },
  { owner: 'Integration Services', ownedDependencies: 54, health: '92%' },
  { owner: 'Product Operations', ownedDependencies: 32, health: '90%' },
  { owner: 'Data Engineering', ownedDependencies: 20, health: '89%' },
  { owner: 'Vendor Management', ownedDependencies: 12, health: '94%' },
];

// Governance Gates
export const GOVERNANCE_GATES: GovernanceGateRow[] = [
  { gate: 'Design Review', review: 'Pass', compliance: 'Pass', performance: 'Pass', change: 'Pass', advisory: 'Clear' },
  { gate: 'Security Review', review: 'Pass', compliance: 'Pass', performance: 'Pass', change: 'Pass', advisory: 'Clear' },
  { gate: 'Compliance Review', review: 'Pass', compliance: 'Pass', performance: 'Pass', change: 'Pass', advisory: 'Clear' },
  { gate: 'Performance Review', review: 'Pass', compliance: 'Pass', performance: 'Pass', change: 'Pass', advisory: 'Clear' },
  { gate: 'Change Advisory', review: 'Pass', compliance: 'Pass', performance: 'Pass', change: 'Pass', advisory: 'Clear' },
];

// Recent Dependency Activity
export const DEPENDENCY_ACTIVITY: DependencyActivityRow[] = [
  { activity: 'Dependency Added', source: 'Order Mgmt', target: 'Tax Service', type: 'External', status: 'Completed', user: 'Elena Wang', time: '10:12 AM' },
  { activity: 'Version Updated', source: 'Pricing Engine', target: 'Payment Gateway', type: 'External', status: 'Completed', user: 'Rajiv Patel', time: '09:58 AM' },
  { activity: 'Compatibility Warning', source: 'Inventory Control', target: 'Inventory Service', type: 'Shared', status: 'Warning', user: 'System', time: '09:41 AM' },
  { activity: 'Dependency Removed', source: 'Loyalty Engine', target: 'Email Service', type: 'External', status: 'Completed', user: 'Maya Chen', time: '09:30 AM' },
  { activity: 'Validation Completed', source: 'All Modules', target: 'All Services', type: 'System', status: 'Completed', user: 'System', time: '09:15 AM' },
];

// Summary Card Data
export const SUMMARY_CARDS = {
  moduleDependency: {
    totalModules: 16,
    withDependencies: 16,
    withoutDependencies: 0,
    criticalModules: 4,
    highRiskModules: 5,
  },
  capabilityDependency: {
    totalCapabilities: 42,
    required: 26,
    optional: 10,
    conditional: 4,
    incompatible: 2,
  },
  sectorPackDependency: {
    totalSectorPacks: 21,
    fullyCompatible: 10,
    partiallyCompatible: 7,
    incompatible: 2,
    notUsed: 2,
  },
  sharedServicesPortfolio: [
    { status: 'Healthy', services: 12, health: '92%' },
    { status: 'Warning', services: 3, health: '60%' },
    { status: 'Critical', services: 1, health: '35%' },
    { status: 'Planned', services: 2, health: '' },
  ],
  externalServicesPortfolio: [
    { status: 'Healthy', services: 6, health: '80%' },
    { status: 'Warning', services: 2, health: '40%' },
    { status: 'Critical', services: 2, health: '25%' },
    { status: 'Planned', services: 1, health: '' },
  ],
  versionCompatibilityMatrix: {
    columns: ['v2.x', 'v3.x', 'v4.x', 'v5.x', 'v6.x'],
    rows: [
      { from: 'v2.x', values: ['✓', '⚠', '⚠', '✗', '✗'] },
      { from: 'v3.x', values: ['⚠', '✓', '✓', '⚠', '✗'] },
      { from: 'v4.x', values: ['⚠', '✓', '✓', '✓', '⚠'] },
      { from: 'v5.x', values: ['✗', '⚠', '✓', '✓', '✓'] },
      { from: 'v6.x', values: ['✗', '✗', '⚠', '✓', '✓'] },
    ],
  },
  versionConflicts: {
    majorConflicts: 6,
    minorConflicts: 8,
    deprecatedVersions: 4,
    pendingMigrations: 10,
    pendingResolutions: 5,
  },
  upgradeReadiness: {
    ready: 12,
    readyPct: '57%',
    needsUpgrade: 7,
    needsUpgradePct: '33%',
    blocked: 2,
    blockedPct: '10%',
  },
  circularDependencies: {
    totalDetected: 2,
    critical: 1,
    resolved: 0,
    pending: 1,
  },
  orphanedServices: {
    totalOrphaned: 3,
    highImpact: 1,
    mediumImpact: 1,
    lowImpact: 1,
  },
  blockingDependencies: {
    totalBlocking: 4,
    byExternalService: 2,
    byModule: 1,
    byVersion: 1,
  },
  impactAnalysis: {
    changesPending: 18,
    highImpact: 6,
    mediumImpact: 8,
    lowImpact: 4,
  },
  releaseImpact: {
    nextReleaseImpacted: 5,
    modulesImpacted: 3,
    capabilitiesImpacted: 7,
    servicesImpacted: 9,
  },
  environmentDrift: {
    totalDriftItems: 4,
    criticalDrift: 1,
    warningDrift: 1,
    infoDrift: 2,
  },
  dependencyHealth: {
    overallHealth: 162,
    warning: 16,
    critical: 8,
    blocked: 6,
  },
};
