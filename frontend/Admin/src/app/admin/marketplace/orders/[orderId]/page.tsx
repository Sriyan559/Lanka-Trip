import { notFound } from "next/navigation";
import { OrderDetailView } from "@/features/admin/orders/components/OrderDetailView";
import { fetchOrderDetail } from "@/services/api/orderService";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const orderDetail = await fetchOrderDetail(decodeURIComponent(orderId));

  if (!orderDetail) {
    notFound();
  }

  return <OrderDetailView order={orderDetail} />;
}
