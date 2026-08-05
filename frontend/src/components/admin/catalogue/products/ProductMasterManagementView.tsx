"use client";

import React from "react";
import { TopStatusCards } from "./TopStatusCards";
import { ProductsTableSection } from "./ProductsTableSection";
import { IntelligenceSidebar } from "./IntelligenceSidebar";
import { BottomSummaryPanels } from "./BottomSummaryPanels";

export function ProductMasterManagementView() {
  return (
    <div className="flex flex-col gap-6">
      <TopStatusCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="flex flex-col gap-6">
          <ProductsTableSection />
        </div>
        
        <div className="flex flex-col gap-6">
          <IntelligenceSidebar />
        </div>
      </div>
      
      <BottomSummaryPanels />
    </div>
  );
}
