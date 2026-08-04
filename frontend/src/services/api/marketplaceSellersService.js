import { marketplaceSellersFixture } from "@/mocks/marketplaceSellers.mock";

/** No marketplace sellers API exists in this repository; the source is intentionally explicit. */
export async function fetchMarketplaceSellers(signal) {
  if (signal?.aborted) throw new DOMException("Request aborted", "AbortError");
  return structuredClone(marketplaceSellersFixture);
}

export async function recordSellerPreviewAction(action, sellerIds = []) {
  await Promise.resolve();
  return { id: `local-${Date.now()}`, action, sellerIds, source: "local-preview", at: new Date().toISOString() };
}

