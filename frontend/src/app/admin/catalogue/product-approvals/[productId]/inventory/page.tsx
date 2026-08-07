import React from "react";
import { products } from "@/mocks/admin/fixtures";
import { notFound } from "next/navigation";
import { InventoryOperationsView } from "../../../inventory/components/InventoryOperationsView";

export default async function ProductApprovalInventoryPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = products.find((p) => p.id.toString() === productId);
  const productData = product || products[0];

  if (!productData) {
    notFound();
  }

  return (
    <InventoryOperationsView
      productId={productId || productData.id}
      productData={productData}
    />
  );
}
