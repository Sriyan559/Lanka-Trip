import { TenantOrgFullData } from './tenant-organization.types';

export const AD05_METADATA = {
  id: 'AD05',
  name: 'Tenant, Ecosystem & Organizational Structure',
  route: '/admin/administration/tenant-organization',
  module: 'Administration',
  domain: 'Tenant & Org',
  primaryDeveloperResponsibility: 'Administration / Tenant & Org / Tenant, Ecosystem & Organizational Structure',
};

export const TENANT_ORG_TABS = [
  { id: 'overview', label: 'Structure Overview' },
  { id: 'tenants', label: 'Tenants' },
  { id: 'ecosystems', label: 'Ecosystems' },
  { id: 'organizations', label: 'Organizations' },
  { id: 'hierarchy', label: 'Hierarchy' },
  { id: 'legal-entities', label: 'Legal Entities' },
  { id: 'operating-entities', label: 'Operating Entities' },
  { id: 'regional-structure', label: 'Regional Structure' },
  { id: 'sector-structure', label: 'Sector Structure' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'scope-inheritance', label: 'Scope Inheritance' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const QUICK_FILTERS = [
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'organization', label: 'Organization' },
  { id: 'legal-entity', label: 'Legal Entity' },
  { id: 'operating-entity', label: 'Operating Entity' },
  { id: 'pending-review', label: 'Pending Review' },
  { id: 'scope-deviations', label: 'Scope Deviations' },
  { id: 'high-risk', label: 'High Risk' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'due-for-review', label: 'Due for Review' },
  { id: 'region-restricted', label: 'Region Restricted' },
  { id: 'multi-region', label: 'Multi-Region' },
  { id: 'orphaned-nodes', label: 'Orphaned Nodes' },
];

export const DEFAULT_TENANT_ORG_DATA: TenantOrgFullData = {
  context: {
    platform: 'Retail Eco System',
    activeTenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    country: 'Production',
    countries: 'Sri Lanka',
    tenantRegistry: 'Connected',
    ecosystemRegistry: 'Connected',
    organizationRegistry: 'Connected',
    membershipRegistry: 'Connected',
    scopeEngine: 'Healthy',
    regionalRegistry: 'Connected',
    auditService: 'Connected',
    dataCompleteness: '99%',
    lastEvaluated: 'Aug 13, 2026 2:45 AM',
    access: 'Assigned Administration Scope',
  },

  kpis: {
    tenants: { value: 12, trend: '+0 vs last 30 days' },
    activeEcosystems: { value: 14, trend: '+1 vs last 30 days' },
    organizations: { value: 28, trend: '+2 vs last 30 days' },
    businessUnits: { value: 18, trend: '+2 vs last 30 days' },
    channels: { value: 8, trend: '+0 vs last 30 days' },
    regions: { value: 6, trend: '+0 vs last 30 days' },
    countries: { value: 2, trend: '+0 vs last 30 days' },
    legalEntities: { value: 9, trend: '+0 vs last 30 days' },
    operatingEntities: { value: 19, trend: '+1 vs last 30 days' },
    operatingAreas: { value: 31, trend: '+1 vs last 30 days' },
    parentRelationships: { value: 31, trend: '+1 vs last 30 days' },
    inheritedScopes: { value: 42, trend: '+2 vs last 30 days' },
    directScopes: { value: 26, trend: '+1 vs last 30 days' },
    countryAssignments: { value: 24, trend: '+1 vs last 30 days' },
    sectorAssignments: { value: 10, trend: '+0 vs last 30 days' },
    inactiveStructures: { value: 3, trend: '-1 vs last 30 days' },
    pendingChanges: { value: 2, trend: '+0 vs last 30 days' },
    exceptions: { value: 2, trend: '+1 vs last 30 days' },
    reviewsDue: { value: 4, trend: '-1 vs last 30 days' },
    organizationHealth: { value: '97 / 100', trend: '+1 vs last 30 days' },
  },

  registry: [
    { id: 'r-1', name: 'TEN-2026-00001', type: 'Tenant', keyRef: 'sl-beauty', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: 'LE-0001', operatingEntity: 'OE-0001', parentOrg: '-', status: 'Active', health: 100, risk: 'Low', lastUpdated: 'Aug 13, 2026' },
    { id: 'r-2', name: 'ECO-2026-00001', type: 'Ecosystem', keyRef: 'beauty-mkt', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: '-', operatingEntity: '-', parentOrg: 'SL Beauty', status: 'Active', health: 98, risk: 'Low', lastUpdated: 'Aug 13, 2026' },
    { id: 'r-3', name: 'ORG-2026-00001', type: 'Organization', keyRef: 'beauty-retail', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: 'LE-0001', operatingEntity: 'OE-0001', parentOrg: 'SL Beauty', status: 'Active', health: 99, risk: 'Low', lastUpdated: 'Aug 13, 2026' },
    { id: 'r-4', name: 'ORG-2026-00002', type: 'Organization', keyRef: 'beauty-wholesale', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: 'LE-0002', operatingEntity: 'OE-0002', parentOrg: 'SL Beauty', status: 'Active', health: 97, risk: 'Low', lastUpdated: 'Aug 13, 2026' },
    { id: 'r-5', name: 'ORG-2026-00003', type: 'Organization', keyRef: 'clinic-prof', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: 'LE-0001', operatingEntity: 'OE-0003', parentOrg: 'SL Beauty', status: 'Active', health: 97, risk: 'Medium', lastUpdated: 'Aug 12, 2026' },
    { id: 'r-6', name: 'ORG-2026-00004', type: 'Organization', keyRef: 'beauty-media', ecosystem: 'Beauty Marketplace', region: 'International', country: 'Singapore', legalEntity: 'LE-0003', operatingEntity: 'OE-0004', parentOrg: 'SL Beauty', status: 'Active', health: 96, risk: 'Low', lastUpdated: 'Aug 12, 2026' },
    { id: 'r-7', name: 'ORG-2026-00005', type: 'Organization', keyRef: 'wellness-services', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: 'LE-0002', operatingEntity: 'OE-0005', parentOrg: 'SL Beauty', status: 'Active', health: 96, risk: 'Low', lastUpdated: 'Aug 12, 2026' },
    { id: 'r-8', name: 'ORG-2026-00006', type: 'Organization', keyRef: 'shared-services', ecosystem: 'Beauty Marketplace', region: 'South Asia', country: 'Sri Lanka', legalEntity: 'LE-0001', operatingEntity: 'OE-0006', parentOrg: 'SL Beauty', status: 'Active', health: 98, risk: 'Low', lastUpdated: 'Aug 13, 2026' },
  ],

  selectedTenant: {
    tenantRef: 'TEN-3031-00001',
    ecosystemKey: 'beauty-mkt',
    organizationKey: 'sl-beauty-org',
    publicRef: 'SL Beauty (Public)',
    environment: 'Production',
    legalEntityCount: 9,
    operatingEntityCount: 19,
    adminScope: 'Enterprise Wide',
    regionCountry: 'South Asia / Sri Lanka',
    healthScore: 97,
    lastEvaluated: 'Aug 13, 2026 2:45 AM',
  },

  hierarchyRoot: {
    id: 'h-root',
    name: 'SL Beauty (Tenant)',
    type: 'Tenant',
    status: 'Active',
    children: [
      {
        id: 'h-eco',
        name: 'Retail Ecosystem',
        type: 'Ecosystem',
        status: 'Active',
        children: [
          {
            id: 'h-org-1',
            name: 'Beauty Marketplace',
            type: 'Organization',
            status: 'Active',
            children: [
              { id: 'h-bu-1', name: 'Wellness & Care', type: 'Business Unit', status: 'Active' },
              { id: 'h-bu-2', name: 'Customer Operations', type: 'Business Unit', status: 'Active' },
              { id: 'h-bu-3', name: 'Shared Services', type: 'Business Unit', status: 'Active' },
            ],
          },
          { id: 'h-org-2', name: 'B2B Wholesale', type: 'Organization', status: 'Active' },
          { id: 'h-org-3', name: 'Clinic & Professionals', type: 'Organization', status: 'Active' },
        ],
      },
    ],
  },

  relationships: [
    { id: 'rel-1', relationshipType: 'Parent - Child', count: 31, valid: 29, conflicts: 1, orphaned: 1, total: 31 },
    { id: 'rel-2', relationshipType: 'Legal Entity Assignment', count: 24, valid: 23, conflicts: 1, orphaned: 0, total: 24 },
    { id: 'rel-3', relationshipType: 'Operating Entity Assignment', count: 19, valid: 18, conflicts: 1, orphaned: 0, total: 19 },
    { id: 'rel-4', relationshipType: 'Regional Assignment', count: 12, valid: 12, conflicts: 0, orphaned: 0, total: 12 },
    { id: 'rel-5', relationshipType: 'Sector Assignment', count: 10, valid: 10, conflicts: 0, orphaned: 0, total: 10 },
  ],

  integrity: {
    valid: 31,
    conflicts: 2,
    orphaned: 1,
    circular: 0,
  },

  tenantPortfolio: [
    { id: 'tp-1', name: 'SL Beauty', subCount1: 2, subCount2: 4, health: 99 },
    { id: 'tp-2', name: 'Beauty International', subCount1: 1, subCount2: 4, health: 95 },
    { id: 'tp-3', name: 'Singapore Global', subCount1: 1, subCount2: 3, health: 96 },
  ],

  ecosystemPortfolio: [
    { id: 'ep-1', name: 'Beauty Marketplace', subCount1: 6, subCount2: 10, health: 97 },
    { id: 'ep-2', name: 'Professional Network', subCount1: 4, subCount2: 8, health: 95 },
    { id: 'ep-3', name: 'Wellness Community', subCount1: 3, subCount2: 6, health: 92 },
    { id: 'ep-4', name: 'Other Ecosystems', subCount1: 2, subCount2: 4, health: 92 },
  ],

  legalEntities: [
    { id: 'le-1', key: 'LE-0001', name: 'SL Beauty (Pvt) Ltd', country: 'Sri Lanka', status: 'Active', health: 99 },
    { id: 'le-2', key: 'LE-0002', name: 'Beauty Holdings Ltd', country: 'Sri Lanka', status: 'Active', health: 97 },
    { id: 'le-3', key: 'LE-0003', name: 'Wellness Enterprise Ltd', country: 'Sri Lanka', status: 'Active', health: 96 },
    { id: 'le-4', key: 'LE-0004', name: 'Global Beauty Inc', country: 'UAE', status: 'Active', health: 94 },
  ],

  operatingEntities: [
    { id: 'oe-1', key: 'OE-0001', name: 'Operations Pvt Ltd', country: 'Sri Lanka', status: 'Active', health: 99 },
    { id: 'oe-2', key: 'OE-0002', name: 'Wholesale Operators', country: 'Sri Lanka', status: 'Active', health: 97 },
    { id: 'oe-3', key: 'OE-0003', name: 'Wellness Services Pvt Ltd', country: 'Sri Lanka', status: 'Active', health: 96 },
    { id: 'oe-4', key: 'OE-0004', name: 'Shared Services Pvt Ltd', country: 'Sri Lanka', status: 'Active', health: 98 },
  ],

  scopeInheritance: {
    inherited: 41,
    direct: 2,
    overridden: 1,
    coverage: 97,
  },

  ownershipRecords: [
    { id: 'ow-1', ownerType: 'Users', total: 42, inherited: 26, direct: 12, overridden: 2, unassigned: 2 },
    { id: 'ow-2', ownerType: 'Teams', total: 26, inherited: 18, direct: 6, overridden: 1, unassigned: 1 },
    { id: 'ow-3', ownerType: 'Roles', total: 18, inherited: 12, direct: 4, overridden: 1, unassigned: 1 },
  ],

  ownershipCoverage: {
    fullyOwned: 58,
    partiallyOwned: 1,
    unowned: 1,
    coverage: 97,
  },

  lifecycleMatrix: [
    { stage: 'Draft', tenants: 1, ecosystems: 0, organizations: 2 },
    { stage: 'Proposed', tenants: 1, ecosystems: 1, organizations: 3 },
    { stage: 'Under Review', tenants: 2, ecosystems: 1, organizations: 4 },
    { stage: 'Approved', tenants: 9, ecosystems: 12, organizations: 16 },
    { stage: 'Retired', tenants: 0, ecosystems: 0, organizations: 1 },
  ],

  pendingChanges: [
    { id: 'pc-1', changeType: 'Structural Changes', count: 2, high: 1, medium: 1, low: 0 },
    { id: 'pc-2', changeType: 'Ownership Changes', count: 2, high: 1, medium: 0, low: 1 },
    { id: 'pc-3', changeType: 'Scope Changes', count: 3, high: 1, medium: 1, low: 1 },
    { id: 'pc-4', changeType: 'Scope Inheritance Updates', count: 3, high: 1, medium: 1, low: 1 },
  ],

  structureReviews: [
    { id: 'sr-1', reviewType: 'Quarterly Structure Review', dueDate: 'Aug 18, 2026', status: 'Scheduled', health: 98 },
    { id: 'sr-2', reviewType: 'Regional Structure Review', dueDate: 'Aug 21, 2026', status: 'Scheduled', health: 96 },
    { id: 'sr-3', reviewType: 'Ownership Governance Review', dueDate: 'Aug 23, 2026', status: 'Scheduled', health: 95 },
    { id: 'sr-4', reviewType: 'Scope Inheritance Review', dueDate: 'Aug 27, 2026', status: 'Scheduled', health: 95 },
  ],

  exceptions: [
    { id: 'ex-1', exceptionType: 'Ownership Conflicts', count: 2, critical: 0, high: 1, medium: 1, low: 0 },
    { id: 'ex-2', exceptionType: 'Structure Conflicts', count: 2, critical: 0, high: 1, medium: 1, low: 0 },
    { id: 'ex-3', exceptionType: 'Scope Deviations', count: 1, critical: 0, high: 0, medium: 1, low: 0 },
    { id: 'ex-4', exceptionType: 'Data Quality', count: 1, critical: 0, high: 0, medium: 1, low: 0 },
  ],

  risks: [
    { id: 'rk-1', riskCategory: 'Ownership Gaps', high: 2, medium: 1, low: 1, total: 4 },
    { id: 'rk-2', riskCategory: 'Structure Conflicts', high: 1, medium: 2, low: 1, total: 4 },
    { id: 'rk-3', riskCategory: 'Regional Restrictions', high: 1, medium: 1, low: 1, total: 3 },
    { id: 'rk-4', riskCategory: 'Inactive Structures', high: 0, medium: 1, low: 2, total: 3 },
  ],

  governanceGates: [
    { gate: 'Ownership Assigned', status: 'Passed' },
    { gate: 'Scope Inheritance Valid', status: 'Passed' },
    { gate: 'Regional Mapping', status: 'Passed' },
    { gate: 'Legal Entity Mapped', status: 'Passed' },
    { gate: 'Lifecycle Valid', status: 'Passed' },
  ],

  healthMatrix: [
    { category: 'Structure Integrity', tenants: 99, ecosystems: 98, organizations: 99, overall: 99 },
    { category: 'Ownership Coverage', tenants: 97, ecosystems: 96, organizations: 97, overall: 97 },
    { category: 'Regional Readiness', tenants: 96, ecosystems: 95, organizations: 96, overall: 96 },
    { category: 'Lifecycle Hygiene', tenants: 98, ecosystems: 98, organizations: 98, overall: 98 },
    { category: 'Scope Integrity', tenants: 97, ecosystems: 97, organizations: 97, overall: 97 },
    { category: 'Review Coverage', tenants: 95, ecosystems: 95, organizations: 95, overall: 95 },
  ],

  recentActivity: [
    { id: 'act-1', dateTime: 'Aug 13, 2026 02:32 AM', entity: 'SL Beauty', type: 'Tenant', action: 'Updated', performedBy: 'enterprise.admin@slbeauty.com', impact: '6 Countries', status: 'Success' },
    { id: 'act-2', dateTime: 'Aug 12, 2026 11:18 PM', entity: 'Beauty Retail', type: 'Organization', action: 'Ownership Changed', performedBy: 'ops.lead@slbeauty.com', impact: 'Users: 124', status: 'Success' },
    { id: 'act-3', dateTime: 'Aug 12, 2026 04:56 PM', entity: 'B2B Wholesale', type: 'Organization', action: 'Scope Inheritance Updated', performedBy: 'wholesale.lead@slbeauty.com', impact: '3 Scopes', status: 'Success' },
    { id: 'act-4', dateTime: 'Aug 12, 2026 01:31 PM', entity: 'Clinic & Professionals', type: 'Organization', action: 'Hierarchy Updated', performedBy: 'professional.lead@slbeauty.com', impact: 'Parent Ref.', status: 'Success' },
    { id: 'act-5', dateTime: 'Aug 11, 2026 09:05 PM', entity: 'Beauty Marketplace', type: 'Ecosystem', action: 'Channel Added', performedBy: 'ecosystem.team@slbeauty.com', impact: '1 Channel', status: 'Success' },
  ],
};
