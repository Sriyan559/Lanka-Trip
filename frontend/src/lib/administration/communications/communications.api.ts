import { CommunicationsFullData } from './communications.types';
import { DEFAULT_COMMUNICATIONS_DATA } from './communications.constants';

/**
 * Service API for Communications, Notifications & Template Management (AD09)
 * Namespace: /api/admin/administration/communications/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchCommunicationsData(): Promise<CommunicationsFullData> {
  try {
    const res = await apiClient<CommunicationsFullData>('/api/admin/administration/communications');

    if (res && res.kpis) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_COMMUNICATIONS_DATA;
}


export async function createNotificationTemplate(name: string, channel: string): Promise<{ success: boolean; templateRef: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    templateRef: `TMP-NEW-${Date.now()}`,
  };
}

export async function registerProvider(name: string, channel: string): Promise<{ success: boolean; providerId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    providerId: `PRV-${Date.now()}`,
  };
}

export async function createNotificationRule(eventKey: string): Promise<{ success: boolean; ruleRef: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    ruleRef: `NR-NEW-${Date.now()}`,
  };
}

export async function reviewDeliveryFailures(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-FAIL-${Date.now()}`,
  };
}
