import { RolesPermissionsFullData } from './roles-permissions.types';

export const AD04_METADATA = {
  id: 'AD04',
  name: 'Roles, Permissions & Access Profiles',
  route: '/admin/administration/roles-permissions',
  module: 'Administration',
  domain: 'Access Control',
  primaryDeveloperResponsibility: 'Administration / Access Control / Roles, Permissions & Access Profiles',
};

export const ROLES_PERMISSIONS_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'role-registry', label: 'Role Registry' },
  { id: 'permission-sets', label: 'Permission Sets' },
  { id: 'access-profiles', label: 'Access Profiles' },
  { id: 'scope-templates', label: 'Scope Templates' },
  { id: 'assignment-rules', label: 'Assignment Rules' },
  { id: 'inheritance', label: 'Inheritance' },
  { id: 'privileged-roles', label: 'Privileged Roles' },
  { id: 'sod-conflicts', label: 'SoD Conflicts' },
  { id: 'role-assignments', label: 'Role Assignments' },
  { id: 'role-reviews', label: 'Role Reviews' },
  { id: 'analytics', label: 'Analytics' },
] as const;

export const QUICK_FILTERS = [
  { id: 'privileged', label: 'Privileged', count: 28 },
  { id: 'high-risk', label: 'High Risk', count: 18 },
  { id: 'due-for-review', label: 'Due for Review', count: 14 },
  { id: 'over-permissive', label: 'Over-Permissive', count: 6 },
  { id: 'rule-based', label: 'Rule-Based Assignments', count: 48 },
  { id: 'unused', label: 'Unused', count: 24 },
  { id: 'access-profile-linked', label: 'Access Profile Linked', count: 110 },
  { id: 'critical-privileges', label: 'Critical Privileges', count: 12 },
];

export const DEFAULT_ROLES_PERMISSIONS_DATA: RolesPermissionsFullData = {
  kpis: {
    totalRoles: 344,
    activeRoles: 286,
    permissionSets: 612,
    accessProfiles: 124,
    scopeTemplates: 88,
    assignmentRules: 48,
    privilegedRoles: 28,
    segregationConflicts: 6,
    dueForReview: 14,
    overPermissiveRoles: 6,
    authHealthScore: 96,
  },

  healthMetrics: [
    { label: 'Least Privilege', value: 91 },
    { label: 'SoD Compliance', value: 94 },
    { label: 'Access Reviews', value: 95 },
    { label: 'Ownership Coverage', value: 78 },
    { label: 'Dormant Cleanup', value: 10 },
  ],

  roles: [
    {
      id: 'R-01',
      name: 'Store Manager',
      code: 'R-STORE-MGR',
      category: 'Operations',
      businessUnit: 'Retail Ops',
      privilege: 'High',
      riskLevel: 'Medium',
      lifecycle: 'Active',
      assignmentSource: 'Direct',
      members: 142,
      modified: 'May 18, 2025',
      description: 'Manages physical store operations, cash reconciliation, inventory adjustments and store associate permissions.',
      accessProfilesCount: 2,
    },
    {
      id: 'R-02',
      name: 'Buyer',
      code: 'R-BUYER',
      category: 'Merchandising',
      businessUnit: 'Merchandising',
      privilege: 'High',
      riskLevel: 'Medium',
      lifecycle: 'Active',
      assignmentSource: 'Direct',
      members: 38,
      modified: 'May 18, 2025',
      description: 'Product procurement, supplier PO creation, pricing negotiation and merchandise catalog planning.',
      accessProfilesCount: 1,
    },
    {
      id: 'R-03',
      name: 'Finance Analyst',
      code: 'R-FIN-ANL',
      category: 'Finance',
      businessUnit: 'Finance',
      privilege: 'Medium',
      riskLevel: 'Medium',
      lifecycle: 'Active',
      assignmentSource: 'Group / Membership',
      members: 64,
      modified: 'May 18, 2025',
      description: 'Financial ledger reconciliation, payout auditing, tax ledger analytics and cost center reviews.',
      accessProfilesCount: 3,
    },
    {
      id: 'R-04',
      name: 'Customer Care Rep',
      code: 'R-CSR',
      category: 'Customer Service',
      businessUnit: 'Contact Center',
      privilege: 'Low',
      riskLevel: 'Low',
      lifecycle: 'Active',
      assignmentSource: 'Group / Membership',
      members: 186,
      modified: 'May 17, 2025',
      description: 'Customer inquiry resolution, order status check, return authorizations and dispute mediation.',
      accessProfilesCount: 1,
    },
    {
      id: 'R-05',
      name: 'Content Manager',
      code: 'R-CONTENT-MGR',
      category: 'Marketing',
      businessUnit: 'Digital',
      privilege: 'Medium',
      riskLevel: 'Low',
      lifecycle: 'Active',
      assignmentSource: 'Direct',
      members: 22,
      modified: 'May 17, 2025',
      description: 'CMS page publishing, promotional banners, product description updates and media asset management.',
      accessProfilesCount: 2,
    },
  ],

  selectedRole: {
    id: 'R-01',
    name: 'Store Manager',
    code: 'R-STORE-MGR',
    category: 'Operations',
    businessUnit: 'Retail Operations',
    privilege: 'High',
    riskLevel: 'Medium',
    lifecycle: 'Active',
    assignmentSource: 'Direct',
    members: 142,
    modified: 'May 18, 2025 11:42 AM',
    accessProfilesCount: 2,
  },

  permissionSets: [
    { id: 'PS-01', permissionSet: 'Store Operations Full Access', category: 'Operations', privilege: 'High', riskLevel: 'Medium' },
    { id: 'PS-02', permissionSet: 'Inventory Management', category: 'Inventory', privilege: 'Medium', riskLevel: 'Medium' },
    { id: 'PS-03', permissionSet: 'Returns Processing', category: 'Operations', privilege: 'Medium', riskLevel: 'Low' },
    { id: 'PS-04', permissionSet: 'Price Override', category: 'Pricing', privilege: 'High', riskLevel: 'High' },
    { id: 'PS-05', permissionSet: 'Associate Management', category: 'HR', privilege: 'Medium', riskLevel: 'Medium' },
  ],

  effectivePermissionsByRole: [
    { id: 'EP-01', roleName: 'Store Manager', totalPermissions: 624, high: 96, medium: 312, low: 188, critical: 28 },
    { id: 'EP-02', roleName: 'Buyer', totalPermissions: 518, high: 64, medium: 246, low: 160, critical: 20 },
    { id: 'EP-03', roleName: 'Finance Analyst', totalPermissions: 402, high: 40, medium: 202, low: 144, critical: 16 },
    { id: 'EP-04', roleName: 'Customer Care Rep', totalPermissions: 186, high: 12, medium: 78, low: 92, critical: 4 },
    { id: 'EP-05', roleName: 'Content Manager', totalPermissions: 154, high: 8, medium: 56, low: 84, critical: 6 },
  ],

  accessProfiles: [
    { id: 'AP-01', name: 'Store Operations Profile', description: 'For store operations roles', linkedRoles: 6, members: 256 },
    { id: 'AP-02', name: 'Finance Access Profile', description: 'Finance and accounting roles', linkedRoles: 5, members: 128 },
    { id: 'AP-03', name: 'Digital Content Profile', description: 'Digital & marketing content roles', linkedRoles: 4, members: 68 },
    { id: 'AP-04', name: 'Customer Service Profile', description: 'Customer support roles', linkedRoles: 3, members: 186 },
    { id: 'AP-05', name: 'Analytics Read-Only Profile', description: 'Read-only analytics access', linkedRoles: 2, members: 74 },
  ],

  scopeTemplates: [
    { id: 'ST-01', name: 'Store Scope Template', scopeType: 'Location', appliesTo: 'Stores', linkedRoles: 8 },
    { id: 'ST-02', name: 'Region Scope Template', scopeType: 'Geography', appliesTo: 'Regions', linkedRoles: 6 },
    { id: 'ST-03', name: 'BU Scope Template', scopeType: 'Business Unit', appliesTo: 'Business Units', linkedRoles: 7 },
    { id: 'ST-04', name: 'Global Scope Template', scopeType: 'Global', appliesTo: 'All Entities', linkedRoles: 4 },
  ],

  assignmentRules: [
    { id: 'AR-01', ruleName: 'Store Manager Rule', appliesTo: 'Roles', conditionSummary: 'Job Title = Store Manager', members: 142 },
    { id: 'AR-02', ruleName: 'Buyer Rule', appliesTo: 'Roles', conditionSummary: 'Dept = Merchandising', members: 38 },
    { id: 'AR-03', ruleName: 'Finance Analyst Rule', appliesTo: 'Roles', conditionSummary: 'Dept = Finance', members: 64 },
    { id: 'AR-04', ruleName: 'New Hire Base Access', appliesTo: 'Users', conditionSummary: 'Employee Type = New Hire', members: 210 },
    { id: 'AR-05', ruleName: 'Channel Access Rule', appliesTo: 'Roles', conditionSummary: 'Channel in [Retail, Online]', members: 98 },
  ],

  hierarchyRoot: {
    id: 'root',
    title: 'Global Admin',
    userCount: 8,
    color: '#741d35',
    children: [
      { id: 'h-1', title: 'Operations Admin', userCount: 42, roleCount: 12 },
      { id: 'h-2', title: 'Finance Admin', userCount: 38, roleCount: 8 },
      { id: 'h-3', title: 'Merchandising Admin', userCount: 29, roleCount: 10 },
      { id: 'h-4', title: 'Customer Service Admin', userCount: 53, roleCount: 6 },
    ],
  },

  inheritanceAnalysis: {
    rolesWithInherited: '118 (34%)',
    totalInherited: '2,184',
    avgInheritedPerRole: 18.5,
    orphanedChildRoles: 3,
    inheritanceDepth: '5 levels',
  },

  privilegedRoles: [
    { id: 'PR-01', roleName: 'Global Admin', privilege: 'Critical' as any, members: 6, lastReviewed: 'May 01, 2025', nextReview: 'Aug 01, 2025' },
    { id: 'PR-02', roleName: 'Security Admin', privilege: 'Critical' as any, members: 4, lastReviewed: 'May 03, 2025', nextReview: 'Aug 03, 2025' },
    { id: 'PR-03', roleName: 'Finance Admin', privilege: 'High', members: 8, lastReviewed: 'Apr 28, 2025', nextReview: 'Jul 28, 2025' },
    { id: 'PR-04', roleName: 'IT Admin', privilege: 'High', members: 5, lastReviewed: 'Apr 25, 2025', nextReview: 'Jul 25, 2025' },
    { id: 'PR-05', roleName: 'Data Admin', privilege: 'High', members: 7, lastReviewed: 'May 02, 2025', nextReview: 'Aug 02, 2025' },
  ],

  privilegedActions: [
    { id: 'PA-01', actionName: 'User Provisioning', category: 'Identity', usage30d: 312, riskLevel: 'High' },
    { id: 'PA-02', actionName: 'Role Management', category: 'Identity', usage30d: 284, riskLevel: 'High' },
    { id: 'PA-03', actionName: 'Permission Set Update', category: 'Authorization', usage30d: 96, riskLevel: 'Medium' },
    { id: 'PA-04', actionName: 'Modify Security Settings', category: 'Platform', usage30d: 42, riskLevel: 'Critical' },
    { id: 'PA-05', actionName: 'Data Export', category: 'Data', usage30d: 128, riskLevel: 'Medium' },
  ],

  sodConflicts: {
    total: 6,
    critical: 2,
    high: 2,
    medium: 1,
    low: 1,
  },

  roleAssignments: [
    { id: 'RAS-01', source: 'Direct', rolesCount: 98, membersCount: 412, percentOfUsers: 32, trend: 'up' },
    { id: 'RAS-02', source: 'Group / Membership', rolesCount: 124, membersCount: 568, percentOfUsers: 44, trend: 'up' },
    { id: 'RAS-03', source: 'Rule-Based', rolesCount: 86, membersCount: 314, percentOfUsers: 24, trend: 'up' },
    { id: 'RAS-04', source: 'Temporary', rolesCount: 12, membersCount: 64, percentOfUsers: 5, trend: 'up' },
  ],

  reviewCampaigns: [
    { id: 'RC-01', campaignName: 'Q2 2025 Role Review', status: 'In Progress', startDate: 'May 01, 2025', endDate: 'Jun 15, 2025', scope: 'All Roles', completion: 48 },
    { id: 'RC-02', campaignName: 'Privileged Access Review', status: 'In Progress', startDate: 'May 01, 2025', endDate: 'May 31, 2025', scope: 'Privileged Roles', completion: 72 },
    { id: 'RC-03', campaignName: 'Dormant Access Cleanup', status: 'Planned', startDate: 'Jun 01, 2025', endDate: 'Jun 30, 2025', scope: 'All Roles', completion: 0 },
    { id: 'RC-04', campaignName: 'Annual Access Review', status: 'Planned', startDate: 'Jul 01, 2025', endDate: 'Jul 31, 2025', scope: 'All Roles', completion: 0 },
  ],

  dormantRoles: [
    { id: 'DR-01', roleName: 'Legacy CMS Editor', daysInactive: 186, members: 4, riskLevel: 'Low' },
    { id: 'DR-02', roleName: 'Old Reports Viewer', daysInactive: 164, members: 6, riskLevel: 'Low' },
    { id: 'DR-03', roleName: 'Promo Manager (Old)', daysInactive: 152, members: 2, riskLevel: 'Low' },
    { id: 'DR-04', roleName: 'Discontinued Role X', daysInactive: 130, members: 1, riskLevel: 'Low' },
  ],

  overPermissiveRoles: [
    { id: 'OP-01', roleName: 'Store Manager', privilege: 'High', riskLevel: 'Medium', score: 86 },
    { id: 'OP-02', roleName: 'Regional Manager', privilege: 'High', riskLevel: 'Medium', score: 78 },
    { id: 'OP-03', roleName: 'Finance Admin', privilege: 'High', riskLevel: 'Medium', score: 76 },
    { id: 'OP-04', roleName: 'Marketing Manager', privilege: 'Medium', riskLevel: 'Low', score: 68 },
  ],

  permissionGaps: [
    { id: 'PG-01', permission: 'Export Sales Data', impactedRoles: 12, priority: 'High' },
    { id: 'PG-02', permission: 'Approve Discounts > 20%', impactedRoles: 8, priority: 'Medium' },
    { id: 'PG-03', permission: 'Refund Without Receipt', impactedRoles: 6, priority: 'Medium' },
    { id: 'PG-04', permission: 'Access Customer PII', impactedRoles: 5, priority: 'High' },
    { id: 'PG-05', permission: 'Edit Tax Configuration', impactedRoles: 4, priority: 'High' },
  ],

  privilegeHeatmap: [
    { risk: 'High Risk', critical: 6, high: 28, medium: 24, low: 10 },
    { risk: 'Medium Risk', critical: 4, high: 32, medium: 64, low: 24 },
    { risk: 'Low Risk', critical: 0, high: 18, medium: 80, low: 54 },
  ],
};
