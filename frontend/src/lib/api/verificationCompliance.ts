import { request, withQuery } from './client';

export interface VerificationFilterParams {
  search?: string;
  status?: string;
  page?: number;
  per_page?: number;
}

export const verificationComplianceApi = {
  getDocumentsDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/documents/dashboard', params)),

  getProductSafetyDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/product-safety/dashboard', params)),

  getAuthenticityDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/authenticity/dashboard', params)),

  getRecallsDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/recalls/dashboard', params)),

  getGovernanceDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/governance/dashboard', params)),

  getReportsDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/reports/dashboard', params)),

  getImportExportAuditDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/import-export-audit/dashboard', params)),
};
