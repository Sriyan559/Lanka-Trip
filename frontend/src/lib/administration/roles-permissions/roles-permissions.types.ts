/**
 * Type definitions for Administration -> Roles, Permissions & Access Profiles (AD04)
 */

export type RoleCategory = 'Operations' | 'Merchandising' | 'Finance' | 'Customer Care' | 'Customer Service' | 'Marketing' | 'Security' | 'IT' | 'Executive' | string;
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type PrivilegeLevel = 'Critical' | 'Full' | 'High' | 'Medium' | 'Low' | 'Standard';
export type LifecycleStatus = 'Active' | 'Conditional' | 'Deprecated' | 'Suspended' | 'Retired' | 'Draft';
export type AssignmentSource = 'Direct' | 'Group / Membership' | 'Rule-Based' | 'Temporary';

export interface RoleRegistryItem {
  id: string;
  name: string;
  code: string;
  category: RoleCategory;
  businessUnit: string;
  privilege: PrivilegeLevel;
  riskLevel: RiskLevel;
  lifecycle: LifecycleStatus;
  assignmentSource: AssignmentSource;
  members: number;
  modified: string;
  description?: string;
  accessProfilesCount?: number;
}

export interface PermissionRegistryItem {
  id: string;
  permissionSet: string;
  category: string;
  privilege: PrivilegeLevel;
  riskLevel: RiskLevel;
  actionsCount?: number;
}

export interface EffectivePermissionByRole {
  id: string;
  roleName: string;
  totalPermissions: number;
  high: number;
  medium: number;
  low: number;
  critical: number;
}

export interface AccessProfileItem {
  id: string;
  name: string;
  description: string;
  linkedRoles: number;
  members: number;
}

export interface ScopeTemplateItem {
  id: string;
  name: string;
  scopeType: string;
  appliesTo: string;
  linkedRoles: number;
}

export interface RoleAssignmentRuleItem {
  id: string;
  ruleName: string;
  appliesTo: string;
  conditionSummary: string;
  members: number;
}

export interface RoleHierarchyNode {
  id: string;
  title: string;
  roleCount?: number;
  userCount: number;
  color?: string;
  children?: RoleHierarchyNode[];
}

export interface PrivilegedRoleItem {
  id: string;
  roleName: string;
  privilege: PrivilegeLevel;
  members: number;
  lastReviewed: string;
  nextReview: string;
}

export interface PrivilegedAdminAction {
  id: string;
  actionName: string;
  category: string;
  usage30d: number;
  riskLevel: RiskLevel;
}

export interface RoleAssignmentSummaryRow {
  id: string;
  source: AssignmentSource;
  rolesCount: number;
  membersCount: number;
  percentOfUsers: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface RoleReviewCampaignItem {
  id: string;
  campaignName: string;
  status: 'In Progress' | 'Planned' | 'Completed';
  startDate: string;
  endDate: string;
  scope: string;
  completion: number;
}

export interface DormantRoleItem {
  id: string;
  roleName: string;
  daysInactive: number;
  members: number;
  riskLevel: RiskLevel;
}

export interface OverPermissiveRoleItem {
  id: string;
  roleName: string;
  privilege: PrivilegeLevel;
  riskLevel: RiskLevel;
  score: number;
}

export interface PermissionGapItem {
  id: string;
  permission: string;
  impactedRoles: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface RolesPermissionsFullData {
  kpis: {
    totalRoles: number;
    activeRoles: number;
    permissionSets: number;
    accessProfiles: number;
    scopeTemplates: number;
    assignmentRules: number;
    privilegedRoles: number;
    segregationConflicts: number;
    dueForReview: number;
    overPermissiveRoles: number;
    authHealthScore: number;
  };
  healthMetrics: { label: string; value: number }[];
  roles: RoleRegistryItem[];
  selectedRole: RoleRegistryItem;
  permissionSets: PermissionRegistryItem[];
  effectivePermissionsByRole: EffectivePermissionByRole[];
  accessProfiles: AccessProfileItem[];
  scopeTemplates: ScopeTemplateItem[];
  assignmentRules: RoleAssignmentRuleItem[];
  hierarchyRoot: RoleHierarchyNode;
  inheritanceAnalysis: {
    rolesWithInherited: string;
    totalInherited: string;
    avgInheritedPerRole: number;
    orphanedChildRoles: number;
    inheritanceDepth: string;
  };
  privilegedRoles: PrivilegedRoleItem[];
  privilegedActions: PrivilegedAdminAction[];
  sodConflicts: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  roleAssignments: RoleAssignmentSummaryRow[];
  reviewCampaigns: RoleReviewCampaignItem[];
  dormantRoles: DormantRoleItem[];
  overPermissiveRoles: OverPermissiveRoleItem[];
  permissionGaps: PermissionGapItem[];
  privilegeHeatmap: {
    risk: string;
    critical: number;
    high: number;
    medium: number;
    low: number;
  }[];
}
