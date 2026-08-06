import { apiClient } from "@/services/api/apiClient";

export async function fetchMarketplaceSellerDetail(sellerId, filters = {}, signal) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, String(value)); });
  const response = await apiClient(`/admin/marketplace/sellers/${encodeURIComponent(sellerId)}${params.size ? `?${params}` : ""}`, { signal });
  if (!response?.data) throw new Error("SELLER_NOT_FOUND");
  return response.data;
}
