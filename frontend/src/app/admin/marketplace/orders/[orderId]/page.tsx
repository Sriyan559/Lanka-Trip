import { MarketplaceOrderDetailLiveView } from "@/components/admin/orders/MarketplaceOrderDetailLiveView";

export default async function OrderDetailPage({params}:{params:Promise<{orderId:string}>}) {
  const {orderId}=await params;
  return <MarketplaceOrderDetailLiveView orderId={decodeURIComponent(orderId)}/>;
}
