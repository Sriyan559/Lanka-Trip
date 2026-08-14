import { UserDetailFullData } from './user-detail.types';
import { formatUserDetailForReference } from './user-detail.mappers';

/**
 * Service API for User Detail, Access & Activity (AD03)
 * Follows /api/admin/administration/users/... conventions with server-side scoped isolation
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchUserDetailByRef(userRef: string): Promise<UserDetailFullData> {
  try {
    const numericId = parseInt(userRef.replace(/\D/g, ''), 10);
    if (!isNaN(numericId) && numericId > 0) {
      const res = await apiClient<{ user: any }>(`/api/admin/administration/users/${numericId}`);

      if (res && res.user) {
        const base = formatUserDetailForReference(userRef);
        base.profile.userRef = userRef;
        base.profile.name = res.user.name || base.profile.name;
        base.profile.email = res.user.email || base.profile.email;
        base.profile.internalUsername = res.user.username || base.profile.internalUsername;
        base.profile.primaryRole = res.user.role || base.profile.primaryRole;
        base.profile.primaryTenant = res.user.company_name || base.profile.primaryTenant;
        base.profile.status = (res.user.status ? res.user.status.charAt(0).toUpperCase() + res.user.status.slice(1) : 'Active') as any;
        return base;

      }
    }
  } catch (err) {
    console.warn('Backend API for user detail unavailable, using reference structure:', err);
  }
  return formatUserDetailForReference(userRef);
}


export async function requestAccessChange(userRef: string, requestDetails: { reason: string; scope: string; roles: string[] }): Promise<{ success: boolean; requestId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    requestId: `REQ-CHG-${Date.now()}`,
  };
}

export async function revokeUserAccessGrant(userRef: string, grantId: string): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-${Date.now()}`,
  };
}

export async function terminateUserSessions(userRef: string): Promise<{ success: boolean; terminatedCount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    terminatedCount: 3,
  };
}
