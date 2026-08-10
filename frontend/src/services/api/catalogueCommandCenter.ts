import { apiClient, downloadApiFile } from "./apiClient";
import type { CatalogueCommandCenterData, CompositionResponse, GrowthTrendResponse, PriorityApprovalsResponse } from "@/types/catalogue";

type Envelope<T> = { success?: boolean; data: T };

export type CatalogueQuery = { dateFrom?: string; dateTo?: string };

const query = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value !== undefined && search.set(key, String(value)));
  return search.size ? `?${search}` : "";
};

export async function getCatalogueCommandCenter(params: CatalogueQuery, signal?: AbortSignal) {
  return (await apiClient<Envelope<CatalogueCommandCenterData>>(`/admin/catalogue/command-center${query(params)}`, { signal })).data;
}

export async function getCatalogueTrends(params: CatalogueQuery & { granularity: string }, signal?: AbortSignal) {
  return (await apiClient<Envelope<GrowthTrendResponse>>(`/admin/catalogue/command-center/trends${query(params)}`, { signal })).data;
}

export async function getCatalogueComposition(dimension: string, signal?: AbortSignal) {
  return (await apiClient<Envelope<CompositionResponse>>(`/admin/catalogue/command-center/composition${query({ dimension })}`, { signal })).data;
}

export async function getPriorityApprovals(params: Record<string, string | number | undefined>, signal?: AbortSignal) {
  return (await apiClient<Envelope<PriorityApprovalsResponse>>(`/admin/catalogue/approvals/priority${query(params)}`, { signal })).data;
}

export function exportCatalogueCommandCenter(params: CatalogueQuery, signal?: AbortSignal) {
  return downloadApiFile(`/admin/catalogue/command-center/export${query(params)}`, "catalogue-command-center.csv", signal);
}

export async function importCatalogue(file: File) {
  const form = new FormData(); form.append("file", file);
  return apiClient<Envelope<{ created: number; updated: number; skipped: number; failed: number; validationErrors: unknown[] }>>("/admin/catalogue/import", { method: "POST", body: form });
}
