"use client";

import React from "react";
import { ProductApprovalsKPICards } from "./ProductApprovalsKPICards";
import { ProductApprovalsTableSection } from "./ProductApprovalsTableSection";
import { ProductApprovalsHealthSidebar } from "./ProductApprovalsHealthSidebar";
import { ProductApprovalsBottomPanels } from "./ProductApprovalsBottomPanels";

export function ProductApprovalsDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ProductApprovalsKPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <ProductApprovalsTableSection />
        <ProductApprovalsHealthSidebar />
      </div>
      
      <ProductApprovalsBottomPanels />
    </div>
  );
}
