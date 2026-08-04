import { mockMarketplaceDashboard } from "@/mocks/admin/marketplaceDashboard.mock";
import type { MarketplaceDashboardData } from "@/types/marketplaceDashboard";

export async function fetchMarketplaceDashboard(signal?: AbortSignal): Promise<MarketplaceDashboardData> {
  if (signal?.aborted) throw new DOMException("Request aborted", "AbortError");
  return structuredClone(mockMarketplaceDashboard);
}
