import { RolesPermissionsFullData, RoleRegistryItem } from './roles-permissions.types';
import { DEFAULT_ROLES_PERMISSIONS_DATA } from './roles-permissions.constants';

/**
 * Service API for Roles, Permissions & Access Profiles (AD04)
 * Namespace: /api/admin/administration/roles-permissions/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchRolesPermissionsData(): Promise<RolesPermissionsFullData> {
  try {
    const res = await apiClient<RolesPermissionsFullData>('/api/admin/administration/roles-permissions');

    if (res && res.roles) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
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
