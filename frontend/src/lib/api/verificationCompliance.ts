import { request, withQuery } from './client';

export interface VerificationFilterParams {
  search?: string;
  status?: string;
  category?: string;
  risk_level?: string;
  entity_type?: string;
  supplier?: string;
  issuer?: string;
  mandatory_status?: string;
  assigned_to_me?: boolean;
  sla_breached?: boolean;
  expiring_soon?: boolean;
  integrity_alert?: boolean;
  replacement_due?: boolean;
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

export const verificationComplianceApi = {
  getSupplierVerificationDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/supplier-verification/dashboard', params)),

  getDocumentsDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/documents/dashboard', params)),

  getDocumentDetail: (id: string | number) =>
    request(`/admin/verification-compliance/documents/${id}`),

  verifyDocument: (id: string | number, payload: any = {}) =>
    request(`/admin/verification-compliance/documents/${id}/verify`, { method: 'POST', body: JSON.stringify(payload) }),

  verifyDocumentWithConditions: (id: string | number, payload: any = {}) =>
    request(`/admin/verification-compliance/documents/${id}/verify-with-conditions`, { method: 'POST', body: JSON.stringify(payload) }),

  requestDocumentReplacement: (id: string | number, payload: any = {}) =>
    request(`/admin/verification-compliance/documents/${id}/request-replacement`, { method: 'POST', body: JSON.stringify(payload) }),

  requestDocumentEvidence: (id: string | number, payload: any = {}) =>
    request(`/admin/verification-compliance/documents/${id}/request-evidence`, { method: 'POST', body: JSON.stringify(payload) }),

  rejectDocument: (id: string | number, payload: any = {}) =>
    request(`/admin/verification-compliance/documents/${id}/reject`, { method: 'POST', body: JSON.stringify(payload) }),

  revalidateDocument: (id: string | number, payload: any = {}) =>
    request(`/admin/verification-compliance/documents/${id}/revalidate`, { method: 'POST', body: JSON.stringify(payload) }),

  approveBatchDocuments: (ids: (string | number)[]) =>
    request('/admin/verification-compliance/documents/approve-batch', { method: 'POST', body: JSON.stringify({ ids }) }),

  exportDocumentAudit: () =>
    request('/admin/verification-compliance/documents/export-audit'),

  getProductSafetyDashboard: (params: VerificationFilterParams = {}) =>
    request(withQuery('/admin/verification-compliance/product-safety/dashboard', params)),

  exportProductSafetyReport: () =>
    request('/admin/verification-compliance/product-safety/export-report'),

  approveProductSafety: (id: string | number) =>
    request(`/admin/verification-compliance/product-safety/products/${id}/approve`, { method: 'POST' }),

  blockProductPublication: (id: string | number) =>
    request(`/admin/verification-compliance/product-safety/products/${id}/block-publication`, { method: 'POST' }),

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
