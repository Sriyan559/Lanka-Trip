import { SysConfigFullData, ConfigurationRegistryItem } from './sys-config.types';
import { DEFAULT_SYS_CONFIG_DATA } from './sys-config.constants';

/**
 * Service API for System Configuration & Global Settings (AD07)
 * Namespace: /api/admin/administration/configuration/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchSystemConfigurationData(): Promise<SysConfigFullData> {
  try {
    const res = await apiClient<SysConfigFullData>('/api/admin/administration/system-configuration');

    if (res && res.kpis) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_SYS_CONFIG_DATA;
}


export async function requestConfigurationChange(configId: string, newValue: string): Promise<{ success: boolean; changeRequestId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    changeRequestId: `CR-${Date.now()}`,
  };
}

export async function reviewConfigurationDrift(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-DRIFT-${Date.now()}`,
  };
}
