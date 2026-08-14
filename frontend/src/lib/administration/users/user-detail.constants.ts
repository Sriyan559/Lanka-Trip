import { UserDetailFullData } from './user-detail.types';

/**
 * Screen configuration constants for AD03
 */
export const AD03_METADATA = {
  id: 'AD03',
  name: 'User Detail, Access & Activity',
  route: '/admin/administration/users/[userRef]',
  module: 'Administration',
  domain: 'Users & Identity',
  primaryDeveloperResponsibility: 'Administration / Users & Identity / User Detail, Access & Activity',
};

export const USER_DETAIL_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'profile', label: 'Profile' },
  { id: 'memberships', label: 'Memberships' },
  { id: 'roles-access', label: 'Roles & Access' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'temporary-access', label: 'Temporary Access' },
  { id: 'restrictions', label: 'Restrictions' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'activity', label: 'Activity' },
  { id: 'security', label: 'Security' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

/**
 * Default Mock Data for Priya Kumar (USR-2026-00842) matching the Visual Truth reference
 */
export const DEFAULT_USER_DETAIL: UserDetailFullData = {
  profile: {
    userRef: 'USR-2026-00842',
    name: 'Priya Kumar',
    preferredName: 'Priya',
    email: 'priya.kumar@slbeauty.com',
    internalUsername: 'priya.kumar@slbeauty.internal',
    personId: '+1 618 555-0162',
    title: 'Administrator',
    department: 'Platform Engineering',
    manager: 'Sofia Nair',
    location: 'Mumbai, India',
    employmentType: 'Full-Time',
    securityDomain: 'Security Operations',
    accountType: 'Administrator',
    primaryTenant: 'SL Beauty',
    primaryEcosystem: 'Beauty Marketplace',
    primaryRole: 'All Platform Administrator',
    adminScope: 'All Platform + Production',
    privilegeLevel: 'High',
    status: 'Active',
    healthScore: 96,
    createdDate: 'Jan 14, 2026',
    lastUpdated: 'Aug 13, 2026 1:52 AM',
  },

  healthBreakdown: [
    { dimension: 'Identity', score: 100, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:45 AM', owner: 'Identity Team' },
    { dimension: 'Authentication', score: 100, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:44 AM', owner: 'Security Operations' },
    { dimension: 'MFA Hygiene', score: 100, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:44 AM', owner: 'Security Operations' },
    { dimension: 'Role Posture', score: 96, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:45 AM', owner: 'Access Governance' },
    { dimension: 'Access Hygiene', score: 96, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:44 AM', owner: 'Access Governance' },
    { dimension: 'Session Security', score: 96, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:44 AM', owner: 'Security Operations' },
    { dimension: 'Review Currency', score: 96, maxScore: 100, rating: 'Excellent', lastChecked: 'Aug 13, 1:45 AM', owner: 'Access Governance' },
    { dimension: 'Data Hygiene', score: 92, maxScore: 100, rating: 'Good', lastChecked: 'Aug 13, 1:45 AM', owner: 'Data Governance' },
    { dimension: 'Risk Hygiene', score: 90, maxScore: 100, rating: 'Good', lastChecked: 'Aug 13, 1:45 AM', owner: 'Risk & Compliance' },
  ],

  lifecycle: {
    createdOn: 'Jan 14, 2026',
    activatedOn: 'Jan 14, 2026 9:45 AM',
    adminAssignedOn: 'Jan 14, 2026',
    privilegedApprovedOn: 'Jan 14, 2026',
    initialSignOn: 'Jan 14, 2026 9:12 AM',
    lastRoleChange: 'Jan 16, 2026 10:05 AM',
    lastAccessChange: 'Aug 13, 2026 10:15 AM',
    lastReview: 'Sep 18, 2026',
    nextReview: 'Sep 18, 2026',
    accountExpiry: '—',
    activeEligibility: 'Mar 16, 2028',
    accountAgeDays: 213,
    activeDurationDays: 213,
  },

  memberships: [
    {
      id: 'MEM-01',
      tenant: 'SL Beauty',
      ecosystem: 'Beauty',
      businessUnit: 'Platform',
      channel: 'Platform',
      membershipType: 'Primary',
      role: 'All Platform Administrator',
      scope: 'Platform',
      grantedBy: 'Security Admin',
      grantedOn: 'Jan 14, 2026',
      status: 'Active',
    },
    {
      id: 'MEM-02',
      tenant: 'SL Beauty',
      ecosystem: 'Marketplace',
      businessUnit: 'Enterprise Services',
      channel: 'Internal',
      membershipType: 'Primary',
      role: 'Platform Lead',
      scope: 'Platform',
      grantedBy: 'Platform Lead',
      grantedOn: 'Feb 12, 2026',
      status: 'Active',
    },
    {
      id: 'MEM-03',
      tenant: 'Beauty Marketplace',
      ecosystem: 'Analytics',
      businessUnit: 'Internal',
      channel: 'Direct',
      membershipType: 'Secondary',
      role: 'Analytics Read Access',
      scope: 'Analytics',
      grantedBy: 'Analytics Lead',
      grantedOn: 'Mar 5, 2026',
      status: 'Active',
    },
  ],

  scopeInheritance: [
    {
      id: 'SC-01',
      tenantEcosystem: 'SL Beauty',
      membershipType: 'Primary',
      platformChannel: 'Platform',
      accessToScope: 'Administrator',
      productionEnvironment: 'Conditional Access',
    },
    {
      id: 'SC-02',
      tenantEcosystem: 'Beauty Marketplace',
      membershipType: 'Direct',
      platformChannel: 'Analytics',
      accessToScope: 'Viewer',
      productionEnvironment: 'Conditional Access',
    },
    {
      id: 'SC-03',
      tenantEcosystem: 'All Platform',
      membershipType: 'Inherited Access',
      platformChannel: 'Platform',
      accessToScope: 'Contributor',
      productionEnvironment: 'Direct Access',
    },
  ],

  assignedRoles: [
    { id: 'ROL-01', roleName: 'All Platform Administrator', roleType: 'Operational', scope: 'All Platform', primary: true, grantedOn: 'Jan 14, 2026', status: 'Active' },
    { id: 'ROL-02', roleName: 'Release Regulator', roleType: 'Operational', scope: 'Platform', primary: false, grantedOn: 'Feb 12, 2026', status: 'Active' },
    { id: 'ROL-03', roleName: 'Integration Reviewer', roleType: 'Operational', scope: 'Analytics', primary: false, grantedOn: 'Jul 28, 2026', status: 'Active' },
    { id: 'ROL-04', roleName: 'Analytics Read Access', roleType: 'Read Only', scope: 'Analytics', primary: false, grantedOn: 'Mar 5, 2026', status: 'Active' },
  ],

  effectiveAccess: [
    { id: 'EA-01', accessCategory: 'All Platform (Admin)', view: 'Allowed', configure: 'Allowed', request: 'Conditional', approve: 'Conditional', productionAccess: 'Approval Req.', export: 'Allowed', audit: 'Allowed' },
    { id: 'EA-02', accessCategory: 'UAM (Identity)', view: 'Allowed', configure: 'Allowed', request: 'Conditional', approve: 'Approval Req.', productionAccess: 'Conditional', export: 'Allowed', audit: 'Allowed' },
    { id: 'EA-03', accessCategory: 'Integrations', view: 'Allowed', configure: 'Allowed', request: 'Allowed', approve: 'Conditional', productionAccess: 'Conditional', export: 'Allowed', audit: 'Allowed' },
    { id: 'EA-04', accessCategory: 'Monitoring', view: 'Allowed', configure: 'Allowed', request: 'Allowed', approve: 'Conditional', productionAccess: 'Conditional', export: 'Allowed', audit: 'Allowed' },
    { id: 'EA-05', accessCategory: 'Mobile Health', view: 'Allowed', configure: 'Allowed', request: 'Denied', approve: 'Denied', productionAccess: 'Denied', export: 'Allowed', audit: 'Allowed' },
    { id: 'EA-06', accessCategory: 'Production Management', view: 'Allowed', configure: 'Allowed', request: 'Conditional', approve: 'Approval Req.', productionAccess: 'Conditional', export: 'Allowed', audit: 'Allowed' },
  ],

  privilegedPermissions: [
    { id: 'PP-01', permission: 'Production Configuration', scopeResource: 'All Platform (Production)', stepUp: 'Yes', approval: 'Yes', lastUsed: 'Aug 13, 2026', risk: 'High', status: 'Active' },
    { id: 'PP-02', permission: 'Release Manager', scopeResource: 'Release Regulator', stepUp: 'Yes', approval: 'Yes', lastUsed: 'Jul 1, 2026', risk: 'High', status: 'Active' },
    { id: 'PP-03', permission: 'Integration Deployment', scopeResource: 'Integration Platform', stepUp: 'Yes', approval: 'Yes', lastUsed: 'Aug 9, 2026', risk: 'High', status: 'Active' },
    { id: 'PP-04', permission: 'System Exports', scopeResource: 'Platform Analytics', stepUp: 'Yes', approval: 'Yes', lastUsed: 'Jun 30, 2026', risk: 'Medium', status: 'Active' },
    { id: 'PP-05', permission: 'Session Administration', scopeResource: 'UAM (Admin)', stepUp: 'Yes', approval: 'Yes', lastUsed: 'Aug 7, 2026', risk: 'Medium', status: 'Active' },
  ],

  accessAttributions: [
    { id: 'AT-01', sourceType: 'Direct Role', sourceName: 'All Platform Administrator', inheritedFrom: 'Administrator', confidence: 'High', expiry: '—', status: 'Active' },
    { id: 'AT-02', sourceType: 'Direct Role', sourceName: 'Release Regulator', inheritedFrom: 'Platform Ops', confidence: 'High', expiry: '—', status: 'Active' },
    { id: 'AT-03', sourceType: 'Inherited', sourceName: 'Analytics Read Access', inheritedFrom: 'SL Beauty', confidence: 'High', expiry: '—', status: 'Active' },
    { id: 'AT-04', sourceType: 'Condition', sourceName: 'Temporary Grant', inheritedFrom: 'Production Release Window', confidence: 'High', expiry: 'Aug 31, 2026', status: 'Active' },
  ],

  authPosture: [
    { id: 'AP-01', method: 'Passwordless', status: 'TOTP App', registered: 'Jan 14, 2026', lastUsed: 'Aug 13, 2026 1:39 AM', health: 'Healthy' },
    { id: 'AP-02', method: 'MFA Policy', status: 'FIDO2 App', registered: 'Jan 14, 2026', lastUsed: 'Aug 13, 2026 1:21 AM', health: 'Healthy' },
    { id: 'AP-03', method: 'Session Policy', status: '90 days', registered: '—', lastUsed: '—', health: 'Healthy' },
    { id: 'AP-04', method: 'Device Trust', status: 'Trusted devices only', registered: '—', lastUsed: '—', health: 'Healthy' },
    { id: 'AP-05', method: 'Login Protection', status: 'Risk adaptive', registered: '—', lastUsed: '—', health: 'Healthy' },
  ],

  mfaMethods: [
    { id: 'MFA-01', method: 'Authenticator App (TOTP)', enrolled: true, verified: true, lastUsed: 'Aug 13, 2026 1:39 AM', status: 'Active' },
    { id: 'MFA-02', method: 'Security Key (FIDO2)', enrolled: true, verified: true, lastUsed: 'Aug 13, 2026 1:21 AM', status: 'Active' },
    { id: 'MFA-03', method: 'Recovery Codes', enrolled: true, verified: false, lastUsed: '—', status: 'Bound Security' },
  ],

  signInEvents: [
    { id: 'EV-01', timestamp: 'Aug 13, 2026 1:21 AM', location: 'Mumbai, IN', method: 'Session', mfa: 'TOTP', environment: 'Production', deviceChannel: 'Chrome / Windows', risk: 'Low', sessionEnd: 'Still Active' },
    { id: 'EV-02', timestamp: 'Aug 13, 2026 1:00 AM', location: 'Mumbai, IN', method: 'Session', mfa: 'TOTP', environment: 'Production', deviceChannel: 'Chrome / Windows', risk: 'Low', sessionEnd: 'Still Active' },
    { id: 'EV-03', timestamp: 'Aug 12, 2026 2:44 PM', location: 'Bengaluru, IN', method: 'Session', mfa: 'TOTP', environment: 'Staging', deviceChannel: 'Edge / Windows', risk: 'Low', sessionEnd: 'Ended' },
    { id: 'EV-04', timestamp: 'Aug 12, 2026 1:11 PM', location: 'Bengaluru, IN', method: 'Session', mfa: 'TOTP', environment: 'Production', deviceChannel: 'Chrome / Windows', risk: 'Low', sessionEnd: 'Ended' },
    { id: 'EV-05', timestamp: 'Aug 11, 2026 9:12 PM', location: 'Mumbai, IN', method: 'Session', mfa: 'TOTP', environment: 'Production', deviceChannel: 'Safari / iOS', risk: 'Medium', sessionEnd: 'Ended' },
  ],

  temporaryGrants: [
    { id: 'TG-01', grantAccess: 'Release Access', reason: 'UAT Support', approver: 'Platform Admin', start: 'Aug 10, 2026', ends: 'Aug 20, 2026', autoRevoke: true, status: 'Active' },
    { id: 'TG-02', grantAccess: 'Admin Console', reason: 'Onboarding', approver: 'All Platform', start: 'Aug 8, 2026', ends: 'Aug 18, 2026', autoRevoke: true, status: 'Active' },
    { id: 'TG-03', grantAccess: 'Monitoring (Prod)', reason: 'Engineering Lead', approver: 'Platform Ops', start: 'Aug 1, 2026', ends: 'Aug 14, 2026', autoRevoke: true, status: 'Active' },
  ],

  restrictions: [
    { id: 'RES-01', controlCategory: 'Environment Restrictions', status: 'Conditional', details: 'Direct production deploy requires branch lock approval' },
    { id: 'RES-02', controlCategory: 'Production Access', status: 'Conditional', details: 'Read/write limited to active change tickets' },
    { id: 'RES-03', controlCategory: 'Session Timeouts', status: 'Enforced', details: '15-minute idle inactivity timeout for privileged scope' },
    { id: 'RES-04', controlCategory: 'MFA Step-Up Requirement', status: 'Enforced', details: 'Prompted on elevated configuration and export actions' },
    { id: 'RES-05', controlCategory: 'Privileged Access Justification', status: 'Enforced', details: 'Audited log justification required for production override' },
  ],

  governanceGates: [
    { id: 'GG-01', name: 'Membership Gates', status: 'Pass' },
    { id: 'GG-02', name: 'Role Gates', status: 'Pass' },
    { id: 'GG-03', name: 'Scope Valid', status: 'Pass' },
    { id: 'GG-04', name: 'MFA Status', status: 'Pass' },
    { id: 'GG-05', name: 'SOD Healthy', status: 'Pass' },
    { id: 'GG-06', name: 'Temporary Access Valid', status: 'Pass' },
    { id: 'GG-07', name: 'Ownership Valid', status: 'Pass' },
    { id: 'GG-08', name: 'Re-evaluation Audit Valid', status: 'Pass' },
    { id: 'GG-09', name: 'Revocation Audit Valid', status: 'Pass' },
  ],

  ownedResources: [
    { id: 'OR-01', resourceType: 'Scheduled Reports', scope: 'Platform / Production', transferRequired: false, review: 'All Platform' },
    { id: 'OR-02', resourceType: 'Approval Queues', scope: 'Release Approval', transferRequired: false, review: 'Release Regulator' },
    { id: 'OR-03', resourceType: 'Configuration Domains', scope: 'All Gateway Configuration', transferRequired: false, review: 'All Platform' },
    { id: 'OR-04', resourceType: 'Workflow Ownership', scope: 'Release Workflow', transferRequired: false, review: 'All Platform' },
  ],

  adminActivities: [
    { id: 'ACT-01', timestamp: 'Aug 13, 2026 1:47 AM', action: 'Access Review', scope: 'All Platform', details: 'SOD Issues Reviewed', device: 'Chrome / Windows' },
    { id: 'ACT-02', timestamp: 'Aug 13, 2026 1:35 AM', action: 'Access Change', scope: 'All Platform', details: 'Granted: Analytics Read Access', device: 'Chrome / Windows' },
    { id: 'ACT-03', timestamp: 'Aug 12, 2026 1:11 PM', action: 'Configuration Update', scope: 'Integrations', details: 'Integration Credential Updated', device: 'Edge / Windows' },
    { id: 'ACT-04', timestamp: 'Aug 11, 2026 11:02 PM', action: 'Approval', scope: 'Release Regulator', details: 'Approved release workflow', device: 'Chrome / Windows' },
    { id: 'ACT-05', timestamp: 'Aug 11, 2026 10:19 PM', action: 'Access Grant', scope: 'Platform', details: 'Granted production access', device: 'Edge / Windows' },
  ],

  userActivities: [
    { id: 'UA-01', auditId: 'AUD-2026-08101', timestamp: 'Aug 13, 2026 1:45 AM', event: 'Login', scope: 'Platform', resourcePath: '—', outcome: 'Success' },
    { id: 'UA-02', auditId: 'AUD-2026-08114', timestamp: 'Aug 13, 2026 1:13 AM', event: 'Access Change', scope: 'Platform', resourcePath: 'Analytics Read Access', outcome: 'Success' },
    { id: 'UA-03', auditId: 'AUD-2026-08122', timestamp: 'Aug 12, 2026 7:11 PM', event: 'Config Update', scope: 'Integrations', resourcePath: 'Integration Credentials', outcome: 'Success' },
    { id: 'UA-04', auditId: 'AUD-2026-08149', timestamp: 'Aug 12, 2026 2:44 PM', event: 'Review Action', scope: 'Release Regulator', resourcePath: 'Release Workflow', outcome: 'Success' },
    { id: 'UA-05', auditId: 'AUD-2026-08170', timestamp: 'Aug 11, 2026 10:19 PM', event: 'Access Grant', scope: 'Platform', resourcePath: 'Production Access', outcome: 'Success' },
  ],

  ecosystemGates: [
    { gate: 'Privileged Administration Review', status: 'Approved' },
    { gate: 'Security Administration Review', status: 'Approved' },
    { gate: 'SoD (Admin Overlap)', status: 'Compliant' },
    { gate: 'Session Hygiene', status: 'Compliant' },
    { gate: 'MFA Enforcement', status: 'Compliant' },
  ],

  accessApprovals: [
    { id: 'AA-01', approvalType: 'Initial Admin Approval', approver: 'Sofia Nair', enactedOn: 'Jan 14, 2026 9:45 AM', expires: '—', status: 'Approved' },
    { id: 'AA-02', approvalType: 'Integration Grant Approval', approver: 'Rohan Deshpande', enactedOn: 'Feb 12, 2026 10:01 AM', expires: '—', status: 'Approved' },
    { id: 'AA-03', approvalType: 'Platform Leads Approval', approver: 'Sonia Varma', enactedOn: 'Mar 5, 2026 1:14 PM', expires: '—', status: 'Approved' },
    { id: 'AA-04', approvalType: 'Production Access Approval', approver: 'Aaran Mehta', enactedOn: 'Aug 13, 2026 2:14 PM', expires: 'Aug 20, 2026', status: 'Approved' },
    { id: 'AA-05', approvalType: 'Temporary Access Approval', approver: 'Rohan Deshpande', enactedOn: 'Aug 8, 2026 9:22 AM', expires: 'Aug 18, 2026', status: 'Approved' },
  ],

  activityTrends: [
    { date: 'Jul 15', login: 110, configChanges: 24, approvalActions: 18, exports: 6, privilegeActions: 8 },
    { date: 'Jul 20', login: 125, configChanges: 32, approvalActions: 22, exports: 10, privilegeActions: 14 },
    { date: 'Jul 25', login: 140, configChanges: 28, approvalActions: 30, exports: 12, privilegeActions: 18 },
    { date: 'Jul 30', login: 130, configChanges: 40, approvalActions: 26, exports: 8, privilegeActions: 16 },
    { date: 'Aug 4', login: 155, configChanges: 45, approvalActions: 34, exports: 14, privilegeActions: 22 },
    { date: 'Aug 9', login: 142, configChanges: 38, approvalActions: 28, exports: 9, privilegeActions: 19 },
    { date: 'Aug 13', login: 160, configChanges: 52, approvalActions: 38, exports: 16, privilegeActions: 25 },
  ],

  accessChangeTrends: [
    { date: 'Jul 15', added: 120, removed: 40, modified: 60 },
    { date: 'Jul 20', added: 135, removed: 45, modified: 70 },
    { date: 'Jul 25', added: 150, removed: 50, modified: 85 },
    { date: 'Jul 30', added: 140, removed: 55, modified: 78 },
    { date: 'Aug 4', added: 165, removed: 48, modified: 92 },
    { date: 'Aug 9', added: 155, removed: 52, modified: 88 },
    { date: 'Aug 13', added: 170, removed: 60, modified: 102 },
  ],
};
