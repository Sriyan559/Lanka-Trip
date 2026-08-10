import { apiClient, downloadApiFile } from './apiClient';
import type { AdvancedFilterState, ProductMasterManagementData } from '@/types/productMaster';

type Envelope<T> = { success: boolean; data: T; message?: string };
export type ProductMasterQuery = Partial<AdvancedFilterState> & { tab?: string; page?: number; pageSize?: number; sort?: string };

function queryString(params: ProductMasterQuery & { ids?: string }) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value !== undefined && value !== '' && value !== 'All' && query.set(key, String(value)));
  return query.size ? `?${query}` : '';
}

export async function getProductMasters(params: ProductMasterQuery, signal?: AbortSignal) {
  return (await apiClient<Envelope<ProductMasterManagementData>>(`/admin/catalogue/product-masters${queryString(params)}`, { signal })).data;
}
export function exportProductMasters(params: ProductMasterQuery, ids: string[] = []) {
  return downloadApiFile(`/admin/catalogue/product-masters/export${queryString({ ...params, ids: ids.join(',') })}`, 'product-masters.csv');
}
export async function bulkProductMasters(action: string, ids: string[], status?: string) {
  return apiClient<Envelope<{ affected: number }>>('/admin/catalogue/product-masters/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ids: ids.map(Number), status }) });
}
export async function saveProductMasterView(payload: Record<string, unknown>) {
  return apiClient<Envelope<unknown>>('/admin/catalogue/product-masters/saved-views', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
}
