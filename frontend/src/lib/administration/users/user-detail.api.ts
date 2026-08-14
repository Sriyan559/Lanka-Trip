import { UserDetailFullData } from './user-detail.types';
import { formatUserDetailForReference } from './user-detail.mappers';

/**
 * Service API for User Detail, Access & Activity (AD03)
 * Follows /api/admin/administration/users/... conventions with server-side scoped isolation
 */
export async function fetchUserDetailByRef(userRef: string): Promise<UserDetailFullData> {
  // Simulate standard network delay for realistic enterprise interaction
  await new Promise((resolve) => setTimeout(resolve, 80));
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
