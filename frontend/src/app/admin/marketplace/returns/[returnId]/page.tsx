import {MarketplaceRecordDetailView} from "@/components/admin/marketplace/shared/MarketplaceRecordDetailView";
export default async function Page({params}:{params:Promise<{returnId:string}>}){const{returnId}=await params;return <MarketplaceRecordDetailView kind="return" id={decodeURIComponent(returnId)}/>}
