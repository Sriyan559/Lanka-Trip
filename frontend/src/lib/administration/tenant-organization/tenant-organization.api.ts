import { TenantOrgFullData, TenantOrgRegistryItem } from './tenant-organization.types';
import { DEFAULT_TENANT_ORG_DATA } from './tenant-organization.constants';

/**
 * Service API for Tenant, Ecosystem & Organizational Structure (AD05)
 * Namespace: /api/admin/administration/tenant-organization/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchTenantOrgData(): Promise<TenantOrgFullData> {
  try {
    const res = await apiClient<TenantOrgFullData>('/api/admin/administration/tenant-organization');

    if (res && res.registry) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_TENANT_ORG_DATA;
}


export async function createTenant(tenantData: Partial<TenantOrgRegistryItem>): Promise<{ success: boolean; tenantId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    tenantId: `TEN-${Date.now()}`,
  };
}

export async function reviewOwnershipGaps(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-OWN-${Date.now()}`,
  };
}
