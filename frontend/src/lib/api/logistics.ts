import { request, withQuery } from './client';

export interface LogisticsFilterParams {
  search?: string;
  status?: string;
  logistics_partner_id?: number;
  delayed?: boolean;
  date_from?: string;
  date_to?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

export const logisticsApi = {
  getDashboard: (params: LogisticsFilterParams = {}) =>
    request(withQuery('/admin/logistics/dashboard', params)),

  getReferenceData: () =>
    request('/admin/logistics/reference-data'),

  getShipments: (params: LogisticsFilterParams = {}) =>
    request(withQuery('/admin/logistics/shipments', params)),

  getShipmentDetail: (id: string | number) =>
    request(`/admin/logistics/shipments/${id}`),

  createShipment: (data: Record<string, any>) =>
    request('/admin/logistics/shipments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateShipment: (id: string | number, data: Record<string, any>) =>
    request(`/admin/logistics/shipments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateShipmentStatus: (id: string | number, data: { status: string; notes?: string }) =>
    request(`/admin/logistics/shipments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteShipment: (id: string | number) =>
    request(`/admin/logistics/shipments/${id}`, {
      method: 'DELETE',
    }),
};
