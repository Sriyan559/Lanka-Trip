import { CommunicationsFullData } from './communications.types';
import { DEFAULT_COMMUNICATIONS_DATA } from './communications.constants';

/**
 * Service API for Communications, Notifications & Template Management (AD09)
 * Namespace: /api/admin/administration/communications/...
 */
export async function fetchCommunicationsData(): Promise<CommunicationsFullData> {
  await new Promise((resolve) => setTimeout(resolve, 80));
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
