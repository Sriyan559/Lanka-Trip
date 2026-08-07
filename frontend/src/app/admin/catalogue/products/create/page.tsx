"use client";

import React, { Suspense } from "react";
import { ProductMasterFormWorkspace } from "@/components/admin/catalogue/products/form/ProductMasterFormWorkspace";

function CreateProductFormContent() {
  return <ProductMasterFormWorkspace mode="create" />;
}

export default function CreateProductMasterPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading form workspace...</div>}>
      <CreateProductFormContent />
    </Suspense>
  );
}