"use client";

import React from "react";
import { ProductMasterDetailView } from "@/components/admin/catalogue/products/detail/ProductMasterDetailView";
import { useParams } from "next/navigation";

export default function ProductMasterDetail() {
  const params = useParams();
  const productId = params.productId as string;

  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      <ProductMasterDetailView productId={productId} />
    </div>
  );
}