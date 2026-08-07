"use client";

import React from "react";
import { ProductApprovalDetailView } from "@/components/admin/catalogue/product-approvals/detail/ProductApprovalDetailView";

export default function ProductApprovalDetailPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas">
      <ProductApprovalDetailView />
    </div>
  );
}