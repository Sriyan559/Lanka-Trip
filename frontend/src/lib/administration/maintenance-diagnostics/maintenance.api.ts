import { MaintenanceDiagnosticsFullData } from './maintenance.types';
import { DEFAULT_MAINTENANCE_DATA } from './maintenance.constants';

/**
 * Service API for Maintenance, Diagnostics, System Jobs & Operational Administration (AD13)
 * Namespace: /api/admin/administration/maintenance/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchMaintenanceData(): Promise<MaintenanceDiagnosticsFullData> {
  try {
    const res = await apiClient<MaintenanceDiagnosticsFullData>('/api/admin/administration/maintenance-diagnostics');

    if (res && res.kpis) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_MAINTENANCE_DATA;
}


export async function createMaintenanceTask(name: string, type: string): Promise<{ success: boolean; taskRef: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true, taskRef: `MAINT-${Date.now()}` };
}

export async function runHealthChecks(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true, auditId: `HC-${Date.now()}` };
}

export async function reviewFailedJobs(): Promise<{ success: boolean; jobRef: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true, jobRef: `JOB-FAIL-${Date.now()}` };
}

export async function clearRetryQueue(): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true };
}
