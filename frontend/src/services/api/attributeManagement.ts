import { apiClient, downloadApiFile } from "./apiClient";
import type { AttributeManagementData, AttributeMutationPayload, AttributeQuery, CatalogueAttribute } from "@/types/attributeManagement";

type Envelope<T> = { success: true; data: T };
const queryString = (params: Record<string, unknown> = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  return query.size ? `?${query}` : "";
};

export const getAttributeManagement = async (query: AttributeQuery, signal?: AbortSignal) =>
  (await apiClient<Envelope<AttributeManagementData>>(`/admin/catalogue/attributes${queryString(query as unknown as Record<string, unknown>)}`, { signal })).data;
export const getAttribute = async (id: string) => (await apiClient<Envelope<CatalogueAttribute>>(`/admin/catalogue/attributes/${id}`)).data;
export const createAttribute = async (payload: AttributeMutationPayload) => (await apiClient<Envelope<CatalogueAttribute>>("/admin/catalogue/attributes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })).data;
export const updateAttribute = async (id: string, payload: Partial<AttributeMutationPayload>) => (await apiClient<Envelope<CatalogueAttribute>>(`/admin/catalogue/attributes/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })).data;
export const updateAttributeValues = async (id: string, values: string[]) => (await apiClient<Envelope<CatalogueAttribute>>(`/admin/catalogue/attributes/${id}/values`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ values }) })).data;
export const archiveAttribute = (id: string) => apiClient(`/admin/catalogue/attributes/${id}`, { method: "DELETE" });
export const bulkAttributes = (ids: string[], action: "activate" | "deactivate" | "archive") => apiClient<Envelope<{ updated: number }>>("/admin/catalogue/attributes/bulk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: ids.map(Number), action }) });
export const mergeAttributes = (sourceId: string, targetId: string) => apiClient(`/admin/catalogue/attributes/${sourceId}/merge`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target_id: Number(targetId) }) });
export const importAttributes = async (file: File) => { const body = new FormData(); body.append("file", file); return (await apiClient<Envelope<{ created: number; updated: number; skipped: number; failed: number; warnings: string[]; validationErrors: unknown[] }>>("/admin/catalogue/attributes/import", { method: "POST", body })).data; };
export const exportAttributes = (query: AttributeQuery) => downloadApiFile(`/admin/catalogue/attributes/export${queryString(query as unknown as Record<string, unknown>)}`, "attribute-management.csv");
