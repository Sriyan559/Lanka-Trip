"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { ProductMasterFormWorkspace } from "@/components/admin/catalogue/products/form/ProductMasterFormWorkspace";

function EditProductFormContent() {
  const params = useParams();
  const productId = (params.productId as string) || "PROD-2024-00421";

  return <ProductMasterFormWorkspace mode="edit" productId={productId} />;
}

export default function EditProductMasterPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading form workspace...</div>}>
      <EditProductFormContent />
    </Suspense>
  );
}