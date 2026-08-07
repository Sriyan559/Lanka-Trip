import {apiClient, downloadApiFile} from "@/services/api/apiClient";

const queryString = filters => {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {if (value !== undefined && value !== null && value !== "") params.set(key, String(value));});
  return params.size ? `?${params}` : "";
};

export async function fetchMarketplaceCommissions(filters = {}, signal) {
  const response = await apiClient(`/admin/marketplace/commissions${queryString(filters)}`, {signal});
  if (!response?.data) throw new Error("The marketplace commissions response is missing data.");
  return response.data;
}

export async function exportMarketplaceCommissions(filters = {}, signal) {
  await downloadApiFile(`/admin/marketplace/commissions/export${queryString(filters)}`, "marketplace-commissions.csv", signal);
}
