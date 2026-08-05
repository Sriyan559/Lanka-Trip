import {marketplaceCommissionsFixture} from "@/mocks/marketplaceCommissions.mock";

/** No commissions API exists in this repository; the source remains explicit. */
export async function fetchMarketplaceCommissions(signal){if(signal?.aborted)throw new DOMException("Request aborted","AbortError");return structuredClone(marketplaceCommissionsFixture)}
export async function recordCommissionPreviewAction(action,ruleIds=[]){await Promise.resolve();return{id:`local-${Date.now()}`,action,ruleIds,source:"local-preview",at:new Date().toISOString()}}

