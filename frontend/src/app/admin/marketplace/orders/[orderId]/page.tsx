import {MarketplaceRecordDetailView} from "@/components/admin/marketplace/shared/MarketplaceRecordDetailView";
export default async function Page({params}:{params:Promise<{orderId:string}>}){const{orderId}=await params;return <MarketplaceRecordDetailView kind="order" id={decodeURIComponent(orderId)}/>}
