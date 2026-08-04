import { marketplaceSellersFixture } from "@/mocks/marketplaceSellers.mock";
import { marketplaceSellerDetailBase } from "@/mocks/marketplaceSellerDetail.mock";

/** No seller-detail endpoint exists; this adapter deliberately identifies its fixture source. */
export async function fetchMarketplaceSellerDetail(sellerId,signal){
  if(signal?.aborted)throw new DOMException("Request aborted","AbortError");
  const seller=marketplaceSellersFixture.sellers.find(item=>item.id===sellerId);
  if(!seller)throw new Error("SELLER_NOT_FOUND");
  return structuredClone({...marketplaceSellerDetailBase,id:seller.id,name:seller.name,type:seller.type,unit:seller.unit,channels:seller.channels,kpis:{listings:seller.listings,orders:seller.orders,gmv:seller.gmv,aov:seller.aov,fulfilment:seller.fulfilment,cancellation:seller.cancellation,returns:seller.returns,rating:seller.rating,sla:seller.sla,findings:seller.findings,settlement:seller.settlement,manager:seller.manager,activity:seller.activity}});
}

export async function recordSellerDetailPreviewAction(sellerId,action,note=""){
  await Promise.resolve();
  return {id:`local-${Date.now()}`,sellerId,action,note,source:"local-preview",at:new Date().toISOString()};
}

