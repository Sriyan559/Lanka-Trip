import React from "react";
import { InventoryOperationsView } from "../../../inventory/components/InventoryOperationsView";

export default async function ProductApprovalInventoryPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return <InventoryOperationsView productId={productId} />;
}
