import {marketplacePromotionsFixture} from "@/mocks/marketplacePromotions.mock";

export async function fetchMarketplacePromotions(signal){if(signal?.aborted)throw new DOMException("Request aborted","AbortError");return structuredClone(marketplacePromotionsFixture)}
export async function recordPromotionPreviewAction(action,promotionIds=[],note=""){await Promise.resolve();return{id:`local-${Date.now()}`,action,promotionIds,note,source:"local-preview",at:new Date().toISOString()}}
