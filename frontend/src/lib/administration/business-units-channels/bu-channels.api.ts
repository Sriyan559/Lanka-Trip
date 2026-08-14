import { BuChannelsFullData, BuChannelRegistryItem } from './bu-channels.types';
import { DEFAULT_BU_CHANNELS_DATA } from './bu-channels.constants';

/**
 * Service API for Business Units, Channels & Operating Scope (AD06)
 * Namespace: /api/admin/administration/business-units/...
 */
export async function fetchBuChannelsData(): Promise<BuChannelsFullData> {
  await new Promise((resolve) => setTimeout(resolve, 80));
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
