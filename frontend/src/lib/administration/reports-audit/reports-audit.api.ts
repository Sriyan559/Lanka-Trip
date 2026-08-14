import { MOCK_REPORTS_AUDIT_DATA } from './reports-audit.constants';
import { ReportsAuditFullData } from './reports-audit.types';

export async function fetchReportsAuditData(): Promise<ReportsAuditFullData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 80));
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
