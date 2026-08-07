"use client";

import React, { Suspense } from "react";
import { BrandManagementView } from "@/components/admin/catalogue/brands/BrandManagementView";

export default function BrandManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading Brand Management dashboard...</div>}>
      <BrandManagementView />
    </Suspense>
  );
}