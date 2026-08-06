import { apiClient } from "@/services/api/apiClient";
import type { ListingRow } from "@/types/marketplaceListings";
export type MarketplaceListingDetailResponse = { listing: ListingRow; health: { availability: "available" | "unavailable"; reason?: string }; sla: { availability: "available" | "unavailable"; reason?: string } };
export async function fetchMarketplaceListingDetail(listingId: string, signal?: AbortSignal): Promise<MarketplaceListingDetailResponse> { const response = await apiClient<{ success: true; data: MarketplaceListingDetailResponse }>(`/admin/marketplace/listings/${encodeURIComponent(listingId)}`, { signal }); return response.data; }
