import { SysConfigFullData } from './sys-config.types';

export const SYS_CONFIG_METADATA = {
  id: 'AD07',
  name: 'System Configuration & Global Settings',
  route: '/admin/administration/system-configuration',
  module: 'Administration',
  domain: 'System Configuration',
};

export const SYS_CONFIG_TABS = [
  { id: 'overview', label: 'Configuration Overview' },
  { id: 'registry', label: 'Configuration Registry' },
  { id: 'domains', label: 'Domains' },
  { id: 'defaults', label: 'Defaults' },
  { id: 'scoped-overrides', label: 'Scoped Overrides' },
  { id: 'environment-values', label: 'Environment Values' },
  { id: 'effective-values', label: 'Effective Values' },
  { id: 'validation', label: 'Validation' },
  { id: 'drift', label: 'Drift' },
  { id: 'dependencies', label: 'Dependencies' },
  { id: 'change-requests', label: 'Change Requests' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const QUICK_FILTERS = [
  { id: 'valid', label: 'Valid' },
  { id: 'warning', label: 'Warning' },
  { id: 'critical', label: 'Critical' },
  { id: 'pending-changes', label: 'Pending Changes' },
  { id: 'drift-detected', label: 'Drift Detected' },
  { id: 'platform-defaults', label: 'Platform Defaults' },
  { id: 'tenant-overrides', label: 'Tenant Overrides' },
  { id: 'bu-overrides', label: 'BU Overrides' },
  { id: 'channel-overrides', label: 'Channel Overrides' },
  { id: 'channel-references', label: 'Channel References' },
  { id: 'secret-references', label: 'Secret References' },
  { id: 'restricted', label: 'Restricted' },
  { id: 'missing-owner', label: 'Missing Owner' },
  { id: 'review-due', label: 'Review Due' },
  { id: 'needs-attention', label: 'Needs Attention' },
];

export const DEFAULT_SYS_CONFIG_DATA: SysConfigFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    lifecycleState: 'Connected',
    validationStatus: 'Healthy',
    validationRules: 'Healthy',
    environmentRegistry: 'Healthy',
    driftStatus: 'Low',
    configurationRegistry: 'Connected',
    changeControl: 'Healthy',
    auditService: 'Connected',
    dataCompleteness: '99%',
    lastEvaluated: 'May 13, 2026 3:30 AM',
    accessScope: 'Assigned Administration Scope',
  },

  kpis: {
    configurationDomains: { value: 28, trend: '4%', trendDirection: 'up', sparkline: [22, 24, 25, 26, 27, 28] },
    configurationKeys: { value: 184, trend: '8%', trendDirection: 'up', sparkline: [150, 160, 170, 175, 180, 184] },
    activeConfigurations: { value: 176, trend: '3%', trendDirection: 'up', sparkline: [160, 165, 168, 172, 174, 176] },
    scopedOverrides: { value: 42, trend: '7%', trendDirection: 'up', sparkline: [35, 38, 39, 40, 41, 42] },
    pendingChanges: { value: 9, trend: '11%', trendDirection: 'down', sparkline: [15, 14, 12, 11, 10, 9] },
    validationWarnings: { value: 6, trend: '8%', trendDirection: 'down', sparkline: [10, 9, 8, 8, 7, 6] },
    criticalErrors: { value: 2, trend: '33%', trendDirection: 'down', sparkline: [4, 4, 3, 3, 2, 2] },
    driftFindings: { value: 5, trend: '17%', trendDirection: 'down', sparkline: [8, 7, 7, 6, 6, 5] },
    ownershipGaps: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 5, 4, 4, 3, 3] },
    configurationHealth: { value: '95 / 100', trend: '5 pts', trendDirection: 'up', sparkline: [88, 90, 92, 93, 94, 95] },

    platformDefaults: { value: 184, trend: '0%', trendDirection: 'up', sparkline: [184, 184, 184, 184, 184, 184] },
    tenantOverrides: { value: 18, trend: '0%', trendDirection: 'up', sparkline: [16, 17, 18, 18, 18, 18] },
    ecosystemOverrides: { value: 9, trend: '0%', trendDirection: 'up', sparkline: [7, 8, 9, 9, 9, 9] },
    buOverrides: { value: 7, trend: '0%', trendDirection: 'up', sparkline: [5, 6, 7, 7, 7, 7] },
    channelOverrides: { value: 4, trend: '0%', trendDirection: 'up', sparkline: [2, 3, 4, 4, 4, 4] },
    environmentOverrides: { value: 12, trend: '0%', trendDirection: 'up', sparkline: [10, 11, 12, 12, 12, 12] },
    restrictedValues: { value: 16, trend: '0%', trendDirection: 'up', sparkline: [14, 15, 16, 16, 16, 16] },
    secretsReferenced: { value: 34, trend: '0%', trendDirection: 'up', sparkline: [30, 32, 33, 34, 34, 34] },
    reviewsDue: { value: 5, trend: '0%', trendDirection: 'up', sparkline: [7, 6, 6, 5, 5, 5] },
    configurationExceptions: { value: 4, trend: '0%', trendDirection: 'up', sparkline: [6, 5, 5, 4, 4, 4] },
  },

  registry: [
    { id: 'CFG-CORE-0001', configKey: 'order.session.timeout', domain: 'Platform Core', scopeLevel: 'Platform Default', valueType: 'Duration', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Platform Ops', prodReadiness: 'Ready', lastChanged: 'May 13, 2026', risk: 'Low' },
    { id: 'CFG-PAY-0015', configKey: 'payment.retry.max_attempts', domain: 'Payments', scopeLevel: 'Tenant', valueType: 'Number', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Payments Eng', prodReadiness: 'Ready', lastChanged: 'May 10, 2026', risk: 'Low' },
    { id: 'CFG-INV-0031', configKey: 'inventory.reserve_ttl_minutes', domain: 'Catalog', scopeLevel: 'Business Unit', valueType: 'Duration', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Catalog Ops', prodReadiness: 'Ready', lastChanged: 'May 12, 2026', risk: 'Low' },
    { id: 'CFG-APP-0210', configKey: 'mobile.session.timeout', domain: 'Mobile App', scopeLevel: 'Channel', valueType: 'Duration', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Mobile Dev', prodReadiness: 'Ready', lastChanged: 'May 11, 2026', risk: 'Low' },
    { id: 'CFG-SEC-0890', configKey: 'auth.token.expiry.minutes', domain: 'Security', scopeLevel: 'Platform Default', valueType: 'Duration', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Security Team', prodReadiness: 'Ready', lastChanged: 'May 11, 2026', risk: 'Low' },
    { id: 'CFG-NOT-0071', configKey: 'notification.email.provider', domain: 'Notifications', scopeLevel: 'Ecosystem', valueType: 'Text', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Comm Ops', prodReadiness: 'Ready', lastChanged: 'May 08, 2026', risk: 'Low' },
    { id: 'CFG-LOG-0022', configKey: 'logging.retention.days', domain: 'Logging', scopeLevel: 'Platform Default', valueType: 'Number', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'Low', owner: 'Platform Ops', prodReadiness: 'Ready', lastChanged: 'May 05, 2026', risk: 'Low' },
    { id: 'CFG-PRI-0125', configKey: 'pricing.dynamic.enabled', domain: 'Pricing', scopeLevel: 'Tenant', valueType: 'Boolean', lifecycleState: 'Active', validationStatus: 'Warning', driftStatus: 'Medium', owner: 'Pricing Ops', prodReadiness: 'Review', lastChanged: 'May 06, 2026', risk: 'Medium' },
    { id: 'CFG-CHK-0008', configKey: 'checkout.payment.methods', domain: 'Checkout', scopeLevel: 'Business Unit', valueType: 'Text', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Checkout Ops', prodReadiness: 'Ready', lastChanged: 'May 01, 2026', risk: 'Low' },
    { id: 'CFG-UI-0099', configKey: 'theme.default', domain: 'Platform Core', scopeLevel: 'Platform Default', valueType: 'Text', lifecycleState: 'Active', validationStatus: 'Valid', driftStatus: 'None', owner: 'Design Sys', prodReadiness: 'Ready', lastChanged: 'May 11, 2026', risk: 'Low' },
  ],

  selectedConfig: {
    configId: 'CFG-ORDER-0002',
    configKey: 'order.processing.timeout',
    domain: 'Order Management',
    scopeLevel: 'Platform Default',
    valueType: 'Duration',
    description: 'Maximum time allowed to process an order.',
    lifecycleState: 'Active',
    validationStatus: 'Valid',
    productionReadiness: 'Ready',
    driftStatus: 'None',
    owner: 'Order Ops',
    lastChanged: 'May 13, 2026 11:45 AM',
    riskLevel: 'Low',
    currentValue: '30 minutes',
    effectiveValue: '20 minutes',
    overrideSource: 'Channel Override (Mobile App)',
  },

  effectiveFlow: {
    nodes: [
      { scope: 'Platform Default', value: '30 minutes' },
      { scope: 'Tenant', value: '45 minutes' },
      { scope: 'Ecosystem', value: '45 minutes' },
      { scope: 'Business Unit', value: '45 minutes' },
      { scope: 'Channel', value: '20 minutes', isEffective: true },
      { scope: 'Environment', value: '45 minutes' },
    ],
    resolution: {
      source: 'Channel Override',
      appliedBy: 'Mobile App',
      overrideType: 'Explicit Override',
      priority: 'Medium',
      appliedOn: 'May 12, 2026',
      lastEvaluated: 'May 13, 2026 2:30 AM',
      lifecycleState: 'Active',
      validationStatus: 'Valid',
      productionReadiness: 'Ready',
      driftStatus: 'None',
    }
  },

  domainSummary: [
    { domain: 'Platform Core', keys: 32, overrides: 4, warnings: 1, critical: 0, drift: 0, owner: 'Platform Ops', health: 98 },
    { domain: 'Order Management', keys: 26, overrides: 6, warnings: 1, critical: 0, drift: 0, owner: 'Order Ops', health: 96 },
    { domain: 'Payments', keys: 24, overrides: 3, warnings: 0, critical: 0, drift: 0, owner: 'Payments Eng', health: 100 },
    { domain: 'Catalog', keys: 18, overrides: 2, warnings: 1, critical: 0, drift: 0, owner: 'Catalog Ops', health: 94 },
    { domain: 'Inventory', keys: 14, overrides: 2, warnings: 1, critical: 0, drift: 1, owner: 'Inventory Ops', health: 92 },
  ],

  platformDefaults: [
    { configKey: 'order.processing.timeout', scope: 'Duration', value: 'May 13, 2026', type: 'Duration', lastChanged: 'May 13, 2026', risk: 'Low' },
    { configKey: 'auth.token.expiry.minutes', scope: 'Ecosystem', value: '60 minutes', type: 'Duration', lastChanged: 'May 04, 2026', risk: 'Low' },
    { configKey: 'logging.retention.days', scope: 'Tenant', value: '30 days', type: 'Number', lastChanged: 'May 05, 2026', risk: 'Low' },
    { configKey: 'notification.email.provider', scope: 'Ecosystem', value: 'SendGrid', type: 'Text', lastChanged: 'May 08, 2026', risk: 'Medium' },
    { configKey: 'pricing.dynamic.enabled', scope: 'Tenant', value: 'True', type: 'Boolean', lastChanged: 'May 06, 2026', risk: 'Low' },
  ],

  scopedOverrides: [
    { configKey: 'order.processing.timeout', scope: 'Channel', count: 4, type: 'Duration', risk: 'Low' },
    { configKey: 'mobile.session.timeout', scope: 'Channel', count: 4, type: 'Duration', risk: 'Low' },
    { configKey: 'promotion.max_per_order', scope: 'Business Unit', count: 3, type: 'Number', risk: 'Medium' },
    { configKey: 'payment.retry.max_attempts', scope: 'Environment', count: 3, type: 'Number', risk: 'Low' },
    { configKey: 'checkout.payment.methods', scope: 'Channel', count: 3, type: 'Text', risk: 'Low' },
  ],

  overrideSpread: [
    { domain: 'Order Management', keys: 26, overrides: 12, highRisk: 1 },
    { domain: 'Payments', keys: 24, overrides: 8, highRisk: 0 },
    { domain: 'Catalog', keys: 18, overrides: 6, highRisk: 0 },
    { domain: 'Inventory', keys: 14, overrides: 5, highRisk: 0 },
    { domain: 'Platform Core', keys: 32, overrides: 9, highRisk: 0 },
  ],

  environmentMatrix: [
    { domain: 'Platform Core', dev: 'Valid', test: 'Valid', staging: 'Valid', pilot: 'Valid', prod: 'Valid' },
    { domain: 'Order Management', dev: 'Warning', test: 'Valid', staging: 'Valid', pilot: 'Valid', prod: 'Valid' },
    { domain: 'Payments', dev: 'Valid', test: 'Valid', staging: 'Valid', pilot: 'Valid', prod: 'Valid' },
    { domain: 'Catalog', dev: 'Valid', test: 'Valid', staging: 'Valid', pilot: 'Valid', prod: 'Valid' },
    { domain: 'Inventory', dev: 'Valid', test: 'Valid', staging: 'Warning', pilot: 'Valid', prod: 'Valid' },
    { domain: 'Checkout', dev: 'Valid', test: 'Valid', staging: 'Valid', pilot: 'Valid', prod: 'Valid' },
  ],

  driftAnalysis: [
    { configKey: 'order.session.timeout', drift: 'None', environment: 'Prod', lastDetected: 'May 13, 2026' },
    { configKey: 'inventory.reserve_ttl_minutes', drift: 'Medium', environment: 'Staging', lastDetected: 'May 12, 2026' },
    { configKey: 'pricing.dynamic.enabled', drift: 'Low', environment: 'Dev', lastDetected: 'May 12, 2026' },
    { configKey: 'logging.retention.days', drift: 'Low', environment: 'Test', lastDetected: 'May 12, 2026' },
    { configKey: 'theme.default', drift: 'Low', environment: 'Pilot', lastDetected: 'May 12, 2026' },
  ],

  recentActivity: [
    { dateTime: 'May 13, 2026 3:30 AM', action: 'Updated', configKey: 'order.processing.timeout', changedBy: 'System', scope: 'Environment', environment: 'Prod', details: 'Automated drift sync' },
    { dateTime: 'May 12, 2026 4:45 PM', action: 'Created', configKey: 'mobile.session.timeout', changedBy: 'Mobile Dev', scope: 'Channel', environment: 'Prod', details: 'New override added' },
    { dateTime: 'May 12, 2026 1:30 PM', action: 'Updated', configKey: 'payment.retry.max', changedBy: 'Payments Eng', scope: 'Tenant', environment: 'Prod', details: 'Value changed to 5' },
    { dateTime: 'May 12, 2026 10:15 AM', action: 'Created', configKey: 'promotion.max_per_order', changedBy: 'Catalog Ops', scope: 'Business Unit', environment: 'Staging', details: 'Business unit override' },
    { dateTime: 'May 12, 2026 9:05 AM', action: 'Updated', configKey: 'theme.default', changedBy: 'Design Sys', scope: 'Platform Default', environment: 'Prod', details: 'Value updated to light' },
  ],

  healthMatrix: [
    { category: 'Platform Core', validation: 98, drift: 100, readiness: 99, ownership: 100, risk: 'Low' },
    { category: 'Order Management', validation: 94, drift: 97, readiness: 95, ownership: 98, risk: 'Low' },
    { category: 'Payments', validation: 100, drift: 100, readiness: 100, ownership: 100, risk: 'Low' },
    { category: 'Catalog', validation: 96, drift: 98, readiness: 97, ownership: 95, risk: 'Low' },
    { category: 'Inventory', validation: 92, drift: 90, readiness: 91, ownership: 92, risk: 'Medium' },
  ],

  governanceGates: [
    { gate: 'Validation Gate', status: 'Pass', lastChecked: 'May 13, 2026 3:30 AM' },
    { gate: 'Security Gate', status: 'Pass', lastChecked: 'May 13, 2026 3:30 AM' },
    { gate: 'Ownership Gate', status: 'Pass', lastChecked: 'May 13, 2026 3:30 AM' },
    { gate: 'Drift Gate', status: 'Warning', lastChecked: 'May 13, 2026 3:30 AM' },
    { gate: 'Readiness Gate', status: 'Pass', lastChecked: 'May 13, 2026 3:30 AM' },
    { gate: 'Exception Gate', status: 'Pass', lastChecked: 'May 13, 2026 3:30 AM' },
  ],
};
