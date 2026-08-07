import {apiClient, downloadApiFile} from "@/services/api/apiClient";

const queryString = filters => {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") params.set(key, String(value));
  });
  return params.size ? `?${params}` : "";
};

export async function fetchMarketplacePolicyViolations(filters = {}, signal) {
  const response = await apiClient(`/admin/marketplace/policy-violations${queryString(filters)}`, {signal});
  if (!response?.data) throw new Error("The policy violations response is missing data.");
  return response.data;
}

export async function exportMarketplacePolicyViolations(filters = {}, signal) {
  await downloadApiFile(`/admin/marketplace/policy-violations/export${queryString(filters)}`, "policy-violations.csv", signal);
}

export async function fetchMarketplacePolicyViolation(caseId, signal) {
  const response = await apiClient(`/admin/marketplace/policy-violations/${encodeURIComponent(caseId)}`, {signal});
  if (!response?.data) throw new Error("The policy case response is missing data.");
  return response.data;
}
