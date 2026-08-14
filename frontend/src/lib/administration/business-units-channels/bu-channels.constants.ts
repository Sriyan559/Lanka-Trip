import { BuChannelsFullData } from './bu-channels.types';

export const AD06_METADATA = {
  id: 'AD06',
  name: 'Business Units, Channels & Operating Scope',
  route: '/admin/administration/business-units-channels',
  module: 'Administration',
  domain: 'Business Units',
  primaryDeveloperResponsibility: 'Administration / Business Units / Business Units, Channels & Operating Scope',
};

export const BU_CHANNELS_TABS = [
  { id: 'overview', label: 'Operating Overview' },
  { id: 'business-units', label: 'Business Units' },
  { id: 'channels', label: 'Channels' },
  { id: 'operating-scopes', label: 'Operating Scopes' },
  { id: 'scope-inheritance', label: 'Scope Inheritance' },
  { id: 'regional-availability', label: 'Regional Availability' },
  { id: 'environment-applicability', label: 'Environment Applicability' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'shared-operations', label: 'Shared Operations' },
  { id: 'restrictions', label: 'Restrictions' },
  { id: 'readiness', label: 'Readiness' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const QUICK_FILTERS = [
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'direct', label: 'Direct' },
  { id: 'inherited', label: 'Inherited' },
  { id: 'restricted', label: 'Restricted' },
  { id: 'eligible', label: 'Eligible' },
  { id: 'conditional', label: 'Conditional' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'scope-conflicts', label: 'Scope Conflicts' },
  { id: 'ownership-gaps', label: 'Ownership Gaps' },
  { id: 'pending-changes', label: 'Pending Changes' },
  { id: 'review-due', label: 'Review Due' },
  { id: 'country-restricted', label: 'Country Restricted' },
  { id: 'environment-restricted', label: 'Environment Restricted' },
  { id: 'view-history', label: 'View History' },
];

export const DEFAULT_BU_CHANNELS_DATA: BuChannelsFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    businessUnitRegistry: 'Connected',
    channelRegistry: 'Connected',
    organizationRegistry: 'Connected',
    scopeEngine: 'Healthy',
    regionalRegistry: 'Connected',
    environmentRegistry: 'Healthy',
    ownershipRegistry: 'Connected',
    auditService: 'Connected',
    dataCompleteness: '99%',
    lastEvaluated: 'Aug 13, 2026 2:45 AM',
    access: 'Assigned Administration Scope',
  },

  kpis: {
    businessUnits: { value: 18, trend: '+12%', trendDirection: 'up', sparkline: [10, 12, 14, 15, 17, 18] },
    activeBusinessUnits: { value: 16, trend: '+6%', trendDirection: 'up', sparkline: [12, 13, 14, 14, 15, 16] },
    channels: { value: 8, trend: '+14%', trendDirection: 'up', sparkline: [5, 6, 7, 7, 8, 8] },
    activeChannels: { value: 7, trend: '+13%', trendDirection: 'up', sparkline: [4, 5, 5, 6, 7, 7] },
    operatingScopes: { value: 42, trend: '+10%', trendDirection: 'up', sparkline: [35, 38, 39, 40, 41, 42] },
    restrictedScopes: { value: 4, trend: '-20%', trendDirection: 'down', sparkline: [5, 5, 4, 4, 4, 4] },
    ownershipGaps: { value: 2, trend: '-33%', trendDirection: 'down', sparkline: [3, 3, 2, 2, 2, 2] },
    scopeConflicts: { value: 3, trend: '+25%', trendDirection: 'up', sparkline: [2, 2, 3, 3, 3, 3] },
    pendingChanges: { value: 5, trend: '+25%', trendDirection: 'up', sparkline: [4, 4, 5, 5, 5, 5] },
    operatingHealth: { value: '96 / 100', trend: '+2 pts', trendDirection: 'up', sparkline: [92, 93, 94, 95, 95, 96] },

    sharedChannels: { value: 3, trend: '+0%', trendDirection: 'up', sparkline: [3, 3, 3, 3, 3, 3] },
    directScopes: { value: 18, trend: '+6%', trendDirection: 'up', sparkline: [15, 16, 17, 17, 18, 18] },
    inheritedScopes: { value: 24, trend: '+9%', trendDirection: 'up', sparkline: [20, 22, 22, 23, 23, 24] },
    countryAssignments: { value: 26, trend: '+9%', trendDirection: 'up', sparkline: [22, 24, 25, 25, 26, 26] },
    regionAssignments: { value: 12, trend: '+17%', trendDirection: 'up', sparkline: [8, 9, 10, 11, 11, 12] },
    productionEnabledUnits: { value: 14, trend: '+17%', trendDirection: 'up', sparkline: [10, 11, 12, 13, 13, 14] },
    pilotUnits: { value: 3, trend: '+0%', trendDirection: 'up', sparkline: [3, 3, 3, 3, 3, 3] },
    inactiveUnits: { value: 2, trend: '+33%', trendDirection: 'up', sparkline: [1, 1, 2, 2, 2, 2] },
    reviewsDue: { value: 4, trend: '-11%', trendDirection: 'down', sparkline: [5, 5, 4, 4, 4, 4] },
    operatingExceptions: { value: 3, trend: '+25%', trendDirection: 'up', sparkline: [2, 2, 3, 3, 3, 3] },
  },

  registry: [
    { id: 'r-1', name: 'Beauty Retail', type: 'Business Unit', primaryOwner: 'SL Beauty', lifecycleState: 'Active', eligibilityState: 'Eligible', productionReadiness: 'Direct', scopeType: '-', inheritedFrom: '-', sharedChannel: 'No', ownershipMode: 'Primary', restrictionSources: 'None' },
    { id: 'r-2', name: 'B2B Wholesale', type: 'Business Unit', primaryOwner: 'SL Beauty', lifecycleState: 'Active', eligibilityState: 'Eligible', productionReadiness: 'Direct', scopeType: '-', inheritedFrom: '-', sharedChannel: 'No', ownershipMode: 'Primary', restrictionSources: 'None' },
    { id: 'r-3', name: 'Clinics & Professionals', type: 'Business Unit', primaryOwner: 'SL Beauty', lifecycleState: 'Active', eligibilityState: 'Eligible', productionReadiness: 'Direct', scopeType: '-', inheritedFrom: '-', sharedChannel: 'No', ownershipMode: 'Primary', restrictionSources: 'None' },
    { id: 'r-4', name: 'Wellness & Care', type: 'Operational Group', primaryOwner: 'Beauty Retail', lifecycleState: 'Active', eligibilityState: 'Conditional', productionReadiness: 'Inherited', scopeType: 'B2B Wholesale', inheritedFrom: 'Yes', sharedChannel: 'Yes', ownershipMode: 'Shared', restrictionSources: 'None' },
    { id: 'r-5', name: 'Customer Operations', type: 'Operational Group', primaryOwner: 'SL Beauty', lifecycleState: 'Active', eligibilityState: 'Conditional', productionReadiness: 'Inherited', scopeType: 'Beauty Retail', inheritedFrom: 'Yes', sharedChannel: 'Yes', ownershipMode: 'Shared', restrictionSources: 'None' },
    { id: 'r-6', name: 'Shared Services', type: 'Operational Group', primaryOwner: 'SL Beauty', lifecycleState: 'Active', eligibilityState: 'Eligible', productionReadiness: 'Direct', scopeType: '-', inheritedFrom: '-', sharedChannel: 'Yes', ownershipMode: 'Shared', restrictionSources: 'None' },
  ],

  selectedBu: {
    publicRef: 'BU-BRTL-001',
    buKey: 'beauty-retail',
    parentOrg: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    lifecycleState: 'Active',
    productionReadiness: 'Eligible',
    reviewState: 'Approved',
    lastScopeChange: 'Aug 13, 2026 2:45 AM',
  },

  topologyRoot: {
    id: 't-root',
    name: 'SL Beauty',
    type: 'Business Unit',
    status: 'Active',
    children: [
      {
        id: 't-eco',
        name: 'Beauty Marketplace',
        type: 'Operational Group',
        status: 'Active',
        children: [
          { id: 't-bu-1', name: 'Beauty Retail', type: 'Business Unit', status: 'Active' },
          { id: 't-bu-2', name: 'B2B Wholesale', type: 'Business Unit', status: 'Active' },
          { id: 't-bu-3', name: 'Clinics & Professionals', type: 'Business Unit', status: 'Active' },
        ],
      },
    ],
  },

  scopeInheritance: {
    inherited: 24,
    direct: 12,
    conditional: 4,
    blocked: 2,
    total: 42,
  },

  buPortfolio: [
    { lifecycle: 'Active', units: 16, active: 14, pilot: 0, restricted: 2, inactive: 0 },
    { lifecycle: 'Pilot', units: 3, active: 0, pilot: 3, restricted: 0, inactive: 0 },
    { lifecycle: 'Restricted', units: 2, active: 2, pilot: 0, restricted: 0, inactive: 0 },
    { lifecycle: 'Inactive', units: 2, active: 0, pilot: 0, restricted: 0, inactive: 2 },
  ],

  channelPortfolio: [
    { type: 'Online Store', channels: 2, active: 2, shared: 0 },
    { type: 'Retail POS', channels: 2, active: 2, shared: 1 },
    { type: 'Marketplace', channels: 2, active: 1, shared: 1 },
    { type: 'Mobile App', channels: 1, active: 1, shared: 0 },
    { type: 'Partner Portal', channels: 1, active: 1, shared: 0 },
  ],

  regionalAvailability: [
    { region: 'South Asia', countries: 2, units: 14, channels: 6, scopes: 24 },
    { region: 'International', countries: 6, units: 4, scopes: 12, channels: 2 },
    { region: 'Europe', countries: 10, units: 2, scopes: 8, channels: 2 },
  ],

  countryRestrictions: [
    { country: 'Sri Lanka', restrictedUnits: 0, restrictedChannels: 0, restrictions: 'None' },
    { country: 'Singapore', restrictedUnits: 1, restrictedChannels: 1, restrictions: 'Data Privacy' },
    { country: 'UAE', restrictedUnits: 1, restrictedChannels: 1, restrictions: 'Localization' },
  ],

  environmentMatrix: [
    { environment: 'Production', units: 18, active: 16, channels: 7, availability: '100%' },
    { environment: 'Test', units: 18, active: 14, channels: 6, availability: '100%' },
    { environment: 'Dev', units: 18, active: 12, channels: 6, availability: '100%' },
  ],

  eligibility: {
    eligible: 14,
    conditional: 3,
    blocked: 1,
    total: '14/18',
  },

  channelReadiness: {
    high: 4,
    medium: 2,
    low: 2,
    total: '7/8',
  },

  sharedChannelPortfolio: [
    { bu: 'Beauty Retail', channels: 2, shared: 1 },
    { bu: 'B2B Wholesale', channels: 2, shared: 1 },
    { bu: 'Clinics & Professionals', channels: 2, shared: 1 },
  ],

  sharedRelationships: [
    { id: 'sr-1', primaryOwner: 'Beauty Retail', participatingBu: 'Wellness & Care', connections: 6, sharedChannels: 3, status: 'Active' },
    { id: 'sr-2', primaryOwner: 'B2B Wholesale', participatingBu: 'Clinics & Professionals', connections: 4, sharedChannels: 2, status: 'Active' },
    { id: 'sr-3', primaryOwner: 'Clinics & Professionals', participatingBu: 'Wellness & Care', connections: 2, sharedChannels: 1, status: 'Warning' },
  ],

  ownership: {
    owned: 38,
    shared: 8,
    unassigned: 4,
    coverage: '96%',
  },

  pendingChanges: [
    { id: 'pc-1', change: 'Ecosystem Alignment', count: 2, owner: 'SL Beauty', impact: 'High', requestedBy: 'ops.lead@slbeauty.com', targetDate: 'Aug 18, 2026', status: 'Pending' },
    { id: 'pc-2', change: 'Regional Scope Update', count: 1, owner: 'Beauty Retail', impact: 'Medium', requestedBy: 'retail.lead@slbeauty.com', targetDate: 'Aug 21, 2026', status: 'Pending' },
    { id: 'pc-3', change: 'Channel Sharing Approval', count: 1, owner: 'B2B Wholesale', impact: 'High', requestedBy: 'wholesale.lead@slbeauty.com', targetDate: 'Aug 23, 2026', status: 'Pending' },
  ],

  changeImpact: [
    { riskType: 'Conflict Risk', high: 2, medium: 2, low: 1, total: 5 },
    { riskType: 'Ownership Risk', high: 1, medium: 1, low: 0, total: 2 },
  ],

  conflicts: [
    { id: 'cf-1', conflictType: 'Scope Overlap', description: 'Overlap in regional retail scopes', businessUnit: 'Beauty Retail', severity: 'High', risk: 'Medium', status: 'Under Review' },
    { id: 'cf-2', conflictType: 'Ownership Conflict', description: 'Multiple primary owners assigned', businessUnit: 'Clinics & Professionals', severity: 'Critical', risk: 'High', status: 'Action Required' },
  ],

  exceptions: [
    { id: 'ex-1', exceptionType: 'Restriction Violations', count: 2, trend: [1, 2, 2, 2, 2, 2], severity: 'High' },
    { id: 'ex-2', exceptionType: 'Operating Exceptions', count: 1, trend: [2, 1, 1, 1, 1, 1], severity: 'Medium' },
    { id: 'ex-3', exceptionType: 'Data Exceptions', count: 1, trend: [1, 1, 1, 1, 1, 1], severity: 'Low' },
  ],

  risks: [
    { id: 'rk-1', riskType: 'High Risk Items', count: 2, severity: 'High' },
    { id: 'rk-2', riskType: 'Medium Risk Items', count: 3, severity: 'Medium' },
    { id: 'rk-3', riskType: 'Low Risk Items', count: 5, severity: 'Low' },
  ],

  healthMatrix: [
    { category: 'Structure Integrity', poor: 0, fair: 5, good: 27, excellent: 68 },
    { category: 'Ownership Coverage', poor: 0, fair: 8, good: 32, excellent: 60 },
    { category: 'Operating Readiness', poor: 2, fair: 10, good: 28, excellent: 60 },
    { category: 'Regional Readiness', poor: 0, fair: 6, good: 34, excellent: 60 },
    { category: 'Environment Readiness', poor: 0, fair: 4, good: 36, excellent: 60 },
  ],

  recentActivity: [
    { id: 'act-1', dateTime: 'Aug 13, 2026 02:45 AM', action: 'Scope Updated', entity: 'Beauty Retail', performedBy: 'ops.lead@slbeauty.com', status: 'Success' },
    { id: 'act-2', dateTime: 'Aug 12, 2026 11:15 PM', action: 'Ownership Changed', entity: 'Wellness & Care', performedBy: 'retail.lead@slbeauty.com', status: 'Success' },
    { id: 'act-3', dateTime: 'Aug 12, 2026 04:30 PM', action: 'Channel Shared', entity: 'B2B Wholesale', performedBy: 'wholesale.lead@slbeauty.com', status: 'Success' },
  ],
};
export { BU_CHANNELS_TABS as BU_CHANNELS_TABS_LIST };
