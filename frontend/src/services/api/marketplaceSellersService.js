import { apiClient, downloadApiFile } from "@/services/api/apiClient";

const queryString = filters => {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") params.set(key, String(value));
  });
  return params.size ? `?${params}` : "";
};

export async function fetchMarketplaceSellers(filters = {}, signal) {
  const response = await apiClient(`/admin/marketplace/sellers${queryString(filters)}`, { signal });
  if (!response?.data) throw new Error("The marketplace sellers response is missing data.");
  return response.data;
}

export async function exportMarketplaceSellers(filters = {}, signal) {
  await downloadApiFile(`/admin/marketplace/sellers/export${queryString(filters)}`, "marketplace-sellers.csv", signal);
}
