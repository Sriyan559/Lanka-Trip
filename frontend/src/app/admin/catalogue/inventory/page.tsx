import React from "react";
import { products } from "@/mocks/admin/fixtures";
import { notFound } from "next/navigation";
import { InventoryOperationsView } from "./components/InventoryOperationsView";

export default async function ProductInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const productId = resolvedParams?.productId;

  const productData = productId
    ? products.find((p) => p.id.toString() === productId)
    : null;

  if (productId && !productData) {
    notFound();
  }

  return (
    <InventoryOperationsView
      productId={productId}
      productData={productData}
    />
  );
}
