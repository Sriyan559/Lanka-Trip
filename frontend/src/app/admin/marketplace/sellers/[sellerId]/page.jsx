import { SellerPerformanceDetailView } from "@/components/admin/marketplace/sellers/detail/SellerPerformanceDetailView";

export default function SellerPerformanceDetailPage({params}){
  return <SellerPerformanceDetailView sellerId={params.sellerId}/>;
}
