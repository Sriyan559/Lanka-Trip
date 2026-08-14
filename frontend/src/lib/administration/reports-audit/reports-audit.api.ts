import { MOCK_REPORTS_AUDIT_DATA } from './reports-audit.constants';
import { ReportsAuditFullData } from './reports-audit.types';

import { apiClient } from '@/services/api/apiClient';

export async function fetchReportsAuditData(): Promise<ReportsAuditFullData> {
  try {
    const res = await apiClient<ReportsAuditFullData>('/api/admin/administration/reports-audit');

    if (res && res.auditRecords) {


      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return MOCK_REPORTS_AUDIT_DATA;
}


export async function generateAdministrationReport(type: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return true;
}

export async function createExportJob(name: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return true;
}

export async function reviewAuditExceptions(): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return true;
}

export async function exportAuditRegistry(): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return true;
}
