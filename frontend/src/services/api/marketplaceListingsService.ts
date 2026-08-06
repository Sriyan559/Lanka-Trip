import { apiClient, downloadApiFile } from "@/services/api/apiClient";
import type { MarketplaceListingsData, MarketplaceListingsFilters } from "@/types/marketplaceListings";

const query = (filters: MarketplaceListingsFilters) => { const params = new URLSearchParams(); Object.entries(filters).forEach(([key, value]) => { if (value !== undefined && value !== "" && value !== "all") params.set(key, String(value)); }); return params.toString() ? `?${params}` : ""; };
export async function fetchMarketplaceListings(filters: MarketplaceListingsFilters = {}, signal?: AbortSignal): Promise<MarketplaceListingsData> { const response = await apiClient<{ success: true; data: MarketplaceListingsData }>(`/admin/marketplace/listings${query(filters)}`, { signal }); if (!response?.data) throw new Error("The marketplace listings response is missing data."); return response.data; }
export async function exportMarketplaceListings(filters: MarketplaceListingsFilters = {}, signal?: AbortSignal): Promise<void> { await downloadApiFile(`/admin/marketplace/listings/export${query(filters)}`, "marketplace-listings.csv", signal); }
