import React from "react";
import { InventoryOperationsView } from "./components/InventoryOperationsView";

export default async function ProductInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const productId = resolvedParams?.productId;

  return <InventoryOperationsView productId={productId} />;
}
