import { request, withQuery } from './client';

export interface DashboardFilterParams {
  search?: string;
  status?: string;
  page?: number;
  per_page?: number;
}

export const brandsSuppliersApi = {
  getSuppliersDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/suppliers/dashboard', params)),

  getSupplierDetail: (id: string | number) =>
    request(`/admin/brands-suppliers/suppliers/${id}`),

  createSupplier: (data: Record<string, any>) =>
    request('/admin/brands-suppliers/suppliers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateSupplier: (id: string | number, data: Record<string, any>) =>
    request(`/admin/brands-suppliers/suppliers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getContractsDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/contracts/dashboard', params)),

  getCatalogueCoverageDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/catalogue-coverage/dashboard', params)),

  getPerformanceDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/performance/dashboard', params)),

  getRiskComplianceDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/risk-compliance/dashboard', params)),

  getUsersAccessDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/users-access/dashboard', params)),

  getImportExportAuditDashboard: (params: DashboardFilterParams = {}) =>
    request(withQuery('/admin/brands-suppliers/import-export-audit/dashboard', params)),
};
