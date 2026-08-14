/**
 * Types for Administration -> Users & Identity -> User Detail, Access & Activity (AD03)
 */

export type AccountStatus = 'Active' | 'Suspended' | 'Locked' | 'Pending Review' | 'Deprovisioned';
export type PrivilegeLevel = 'Full' | 'High' | 'Medium' | 'Low' | 'Standard';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type AccessPosture = 'Allowed' | 'Conditional' | 'Approval Req.' | 'Denied';

export interface UserHealthBreakdown {
  dimension: string;
  score: number;
  maxScore: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  lastChecked: string;
  owner: string;
}

export interface UserProfileData {
  userRef: string;
  name: string;
  preferredName: string;
  email: string;
  internalUsername: string;
  personId: string;
  title: string;
  department: string;
  manager: string;
  location: string;
  employmentType: string;
  securityDomain: string;
  accountType: string;
  primaryTenant: string;
  primaryEcosystem: string;
  primaryRole: string;
  adminScope: string;
  privilegeLevel: PrivilegeLevel;
  status: AccountStatus;
  healthScore: number;
  createdDate: string;
  lastUpdated: string;
}

export interface AccountLifecycleData {
  createdOn: string;
  activatedOn: string;
  adminAssignedOn: string;
  privilegedApprovedOn: string;
  initialSignOn: string;
  lastRoleChange: string;
  lastAccessChange: string;
  lastReview: string;
  nextReview: string;
  accountExpiry: string;
  activeEligibility: string;
  accountAgeDays: number;
  activeDurationDays: number;
}

export interface TenantMembershipRecord {
  id: string;
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  channel: string;
  membershipType: 'Primary' | 'Secondary' | 'Federated' | 'Guest';
  role: string;
  scope: string;
  grantedBy: string;
  grantedOn: string;
  status: 'Active' | 'Conditional' | 'Pending' | 'Expired';
}

export interface ScopeInheritanceRecord {
  id: string;
  tenantEcosystem: string;
  membershipType: string;
  platformChannel: string;
  accessToScope: string;
  productionEnvironment: 'Direct Access' | 'Inherited Access' | 'Conditional Access' | 'Restricted';
}

export interface AssignedRoleRecord {
  id: string;
  roleName: string;
  roleType: string;
  scope: string;
  primary: boolean;
  grantedOn: string;
  status: 'Active' | 'Pending Review' | 'Expired';
}

export interface EffectiveAccessMatrixRecord {
  id: string;
  accessCategory: string;
  view: AccessPosture;
  configure: AccessPosture;
  request: AccessPosture;
  approve: AccessPosture;
  productionAccess: AccessPosture;
  export: AccessPosture;
  audit: AccessPosture;
}

export interface PrivilegedPermissionRecord {
  id: string;
  permission: string;
  scopeResource: string;
  stepUp: 'Yes' | 'No';
  approval: 'Yes' | 'No';
  lastUsed: string;
  risk: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Conditional' | 'Disabled';
}

export interface AccessAttributionRecord {
  id: string;
  sourceType: 'Direct Role' | 'Inherited' | 'Condition' | 'Temporary';
  sourceName: string;
  inheritedFrom: string;
  confidence: 'High' | 'Medium' | 'Low';
  expiry: string;
  status: 'Active' | 'Expiring Soon' | 'Pending';
}

export interface AuthPostureItem {
  id: string;
  method: string;
  status: string;
  registered: string;
  lastUsed: string;
  health: 'Healthy' | 'Warning' | 'Needs Attention';
}

export interface MFAMethodRecord {
  id: string;
  method: string;
  enrolled: boolean;
  verified: boolean;
  lastUsed: string;
  status: 'Active' | 'Bound Security' | 'Backup' | 'Inactive';
}

export interface SignInEventRecord {
  id: string;
  timestamp: string;
  location: string;
  method: string;
  mfa: string;
  environment: string;
  deviceChannel: string;
  risk: 'Low' | 'Medium' | 'High';
  sessionEnd: 'Still Active' | 'Ended' | 'Revoked';
}

export interface TemporaryGrantRecord {
  id: string;
  grantAccess: string;
  reason: string;
  approver: string;
  start: string;
  ends: string;
  autoRevoke: boolean;
  status: 'Active' | 'Expiring' | 'Revoked' | 'Expired';
}

export interface RestrictionControlRecord {
  id: string;
  controlCategory: string;
  status: 'Conditional' | 'Enforced' | 'Active' | 'Exempt';
  details?: string;
}

export interface GovernanceGateRecord {
  id: string;
  name: string;
  status: 'Pass' | 'Fail' | 'Warning' | 'Approved' | 'Compliant';
}

export interface OwnedResourceRecord {
  id: string;
  resourceType: string;
  scope: string;
  transferRequired: boolean;
  review: string;
}

export interface AdminActivityRecord {
  id: string;
  timestamp: string;
  action: string;
  scope: string;
  details: string;
  device: string;
}

export interface UserActivityAuditRecord {
  id: string;
  auditId: string;
  timestamp: string;
  event: string;
  scope: string;
  resourcePath: string;
  outcome: 'Success' | 'Denied' | 'Challenged' | 'Failed';
}

export interface AccessApprovalRecord {
  id: string;
  approvalType: string;
  approver: string;
  enactedOn: string;
  expires: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired';
}

export interface UserDetailFullData {
  profile: UserProfileData;
  healthBreakdown: UserHealthBreakdown[];
  lifecycle: AccountLifecycleData;
  memberships: TenantMembershipRecord[];
  scopeInheritance: ScopeInheritanceRecord[];
  assignedRoles: AssignedRoleRecord[];
  effectiveAccess: EffectiveAccessMatrixRecord[];
  privilegedPermissions: PrivilegedPermissionRecord[];
  accessAttributions: AccessAttributionRecord[];
  authPosture: AuthPostureItem[];
  mfaMethods: MFAMethodRecord[];
  signInEvents: SignInEventRecord[];
  temporaryGrants: TemporaryGrantRecord[];
  restrictions: RestrictionControlRecord[];
  governanceGates: GovernanceGateRecord[];
  ownedResources: OwnedResourceRecord[];
  adminActivities: AdminActivityRecord[];
  userActivities: UserActivityAuditRecord[];
  ecosystemGates: { gate: string; status: string }[];
  accessApprovals: AccessApprovalRecord[];
  activityTrends: {
    date: string;
    login: number;
    configChanges: number;
    approvalActions: number;
    exports: number;
    privilegeActions: number;
  }[];
  accessChangeTrends: {
    date: string;
    added: number;
    removed: number;
    modified: number;
  }[];
}
