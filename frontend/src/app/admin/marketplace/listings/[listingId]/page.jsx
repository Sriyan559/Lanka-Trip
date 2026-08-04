import { ListingDetailView } from "@/components/admin/marketplace/listings/detail/ListingDetailView";

export default function ListingDetailPage({ params }) {
  return <ListingDetailView listingId={params.listingId} />;
}
