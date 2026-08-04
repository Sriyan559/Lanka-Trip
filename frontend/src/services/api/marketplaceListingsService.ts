import { mockMarketplaceListings } from "@/mocks/admin/marketplaceListings.mock";
import type { MarketplaceListingsData } from "@/types/marketplaceListings";

/** The repository has no listings API yet. This explicit fixture adapter avoids a silent network fallback. */
export async function fetchMarketplaceListings(signal?: AbortSignal): Promise<MarketplaceListingsData> {
  if (signal?.aborted) throw new DOMException("Request aborted", "AbortError");
  return structuredClone(mockMarketplaceListings);
}
