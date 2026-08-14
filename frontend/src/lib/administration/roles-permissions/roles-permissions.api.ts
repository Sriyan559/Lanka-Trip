import { RolesPermissionsFullData, RoleRegistryItem } from './roles-permissions.types';
import { DEFAULT_ROLES_PERMISSIONS_DATA } from './roles-permissions.constants';

/**
 * Service API for Roles, Permissions & Access Profiles (AD04)
 * Namespace: /api/admin/administration/roles-permissions/...
 */
export async function fetchRolesPermissionsData(): Promise<RolesPermissionsFullData> {
  // Simulate standard network latency
  await new Promise((resolve) => setTimeout(resolve, 80));
  return DEFAULT_ROLES_PERMISSIONS_DATA;
}

export async function createRole(roleData: Partial<RoleRegistryItem>): Promise<{ success: boolean; roleId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    roleId: `R-${Date.now()}`,
  };
}

export async function runAccessReviewCampaign(campaignId: string): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-REV-${Date.now()}`,
  };
}
