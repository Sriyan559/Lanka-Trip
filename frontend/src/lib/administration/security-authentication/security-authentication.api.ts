import { SecurityFullData } from './security-authentication.types';
import { DEFAULT_SECURITY_DATA } from './security-authentication.constants';

/**
 * Service API for Security, Authentication & Session Control (AD10)
 * Namespace: /api/admin/administration/security-authentication/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchSecurityData(): Promise<SecurityFullData> {
  try {
    const res = await apiClient<SecurityFullData>('/api/admin/administration/security-authentication');

    if (res && res.kpis) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_SECURITY_DATA;
}


export async function createSecurityPolicy(policyName: string, type: string): Promise<{ success: boolean; policyRef: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    policyRef: `POL-AUTH-${Date.now()}`,
  };
}

export async function registerAuthProvider(name: string, protocol: string): Promise<{ success: boolean; providerId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    providerId: `PRV-${Date.now()}`,
  };
}

export async function reviewHighRiskSessions(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-RISK-${Date.now()}`,
  };
}
