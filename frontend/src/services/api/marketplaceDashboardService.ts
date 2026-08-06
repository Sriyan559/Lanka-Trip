import { apiClient, downloadApiFile } from "@/services/api/apiClient";
import type { MarketplaceDashboardData, MarketplaceDashboardFilters } from "@/types/marketplaceDashboard";

const query = (filters: MarketplaceDashboardFilters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
  return params.toString() ? `?${params}` : "";
};

export async function fetchMarketplaceDashboard(filters: MarketplaceDashboardFilters = {}, signal?: AbortSignal): Promise<MarketplaceDashboardData> {
  const response = await apiClient<{ success: true; data: MarketplaceDashboardData }>(`/admin/marketplace/dashboard${query(filters)}`, { signal });
  if (!response?.data) throw new Error("The marketplace dashboard response is missing its data.");
  return response.data;
}

export async function exportMarketplaceDashboard(filters: MarketplaceDashboardFilters = {}, signal?: AbortSignal): Promise<void> {
  await downloadApiFile(`/admin/marketplace/dashboard/export${query(filters)}`, "marketplace-dashboard.csv", signal);
}
