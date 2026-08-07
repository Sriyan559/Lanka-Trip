import { apiClient } from "@/services/api/apiClient";

export async function fetchMarketplaceSellerDetail(sellerId, signal) {
  const response=await apiClient(`/admin/marketplace/sellers/${encodeURIComponent(sellerId)}`,{signal});
  if(!response?.data)throw new Error("The seller detail response is missing data.");
  return response.data;
}
