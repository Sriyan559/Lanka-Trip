import { apiClient, downloadApiFile } from "./apiClient";
import type { BrandManagementData } from "@/types/brandManagement";

type Envelope<T> = { success: true; data: T };
const query = (params: Record<string, unknown> = {}) => {
  const value = new URLSearchParams();
  Object.entries(params).forEach(([key, item]) => { if (item !== undefined && item !== null && item !== "" && item !== "All") value.set(key, String(item)); });
  return value.size ? `?${value}` : "";
};
export const getBrandManagement = async (params: Record<string, unknown>, signal?: AbortSignal) =>
  (await apiClient<Envelope<BrandManagementData>>(`/admin/catalogue/brands${query(params)}`, { signal })).data;
export const createBrand = (payload: unknown) => apiClient("/admin/sl-beauty/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
export const updateBrand = (id: string, payload: unknown) => apiClient(`/admin/sl-beauty/brands/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
export const archiveBrand = (id: string) => apiClient(`/admin/sl-beauty/brands/${id}`, { method: "DELETE" });
export const importBrands = (file: File) => { const body = new FormData(); body.append("file", file); return apiClient<Envelope<{ created: number; updated: number }>>("/admin/catalogue/brands/import", { method: "POST", body }); };
export const exportBrands = (params: Record<string, unknown>) => downloadApiFile(`/admin/catalogue/brands/export${query(params)}`, "brand-management.csv");
export const getBrandAuthorizations = (brandId: string) => apiClient<{ success: true; authorizations: { data: unknown[] } }>(`/admin/brand-authorizations?brand_id=${encodeURIComponent(brandId)}&per_page=100`);
export const decideBrandAuthorization = (id: string, decision: string, notes?: string) => apiClient(`/admin/brand-authorizations/${id}/decisions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ decision, notes }) });
