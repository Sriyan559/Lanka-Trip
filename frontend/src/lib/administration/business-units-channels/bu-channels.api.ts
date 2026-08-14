import { BuChannelsFullData, BuChannelRegistryItem } from './bu-channels.types';
import { DEFAULT_BU_CHANNELS_DATA } from './bu-channels.constants';

/**
 * Service API for Business Units, Channels & Operating Scope (AD06)
 * Namespace: /api/admin/administration/business-units/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchBuChannelsData(): Promise<BuChannelsFullData> {
  try {
    const res = await apiClient<BuChannelsFullData>('/api/admin/administration/business-units-channels');

    if (res && res.registry) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_BU_CHANNELS_DATA;
}


export async function createBusinessUnit(buData: Partial<BuChannelRegistryItem>): Promise<{ success: boolean; buId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    buId: `BU-${Date.now()}`,
  };
}

export async function reviewScopeConflicts(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-SCO-${Date.now()}`,
  };
}
