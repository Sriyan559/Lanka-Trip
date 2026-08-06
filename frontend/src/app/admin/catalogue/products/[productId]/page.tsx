"use client";

import React from "react";
import { ProductMasterDetailView } from "@/components/admin/catalogue/products/detail/ProductMasterDetailView";
import { useParams } from "next/navigation";

export default function ProductMasterDetailPage() {
  const params = useParams();
  const productId = (params?.productId as string) || "PROD-2024-00421";

  return <ProductMasterDetailView productId={productId} />;
}