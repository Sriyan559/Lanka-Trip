"use client";

import React from "react";
import { TopKPICards } from "./dashboard/TopKPICards";
import { CatalogueCharts } from "./dashboard/CatalogueCharts";
import { CatalogueHealthSidebar } from "./dashboard/CatalogueHealthSidebar";
import { ProductApprovalSection } from "./dashboard/ProductApprovalSection";
import { QualityAndReadinessSection } from "./dashboard/QualityAndReadinessSection";
import { InventoryAndExpirySection } from "./dashboard/InventoryAndExpirySection";
import { RecentActivitySection } from "./dashboard/RecentActivitySection";

export function CatalogueCommandCenterDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <TopKPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="flex flex-col gap-6">
          <CatalogueCharts />
          <ProductApprovalSection />
          <QualityAndReadinessSection />
        </div>
        
        <div className="flex flex-col gap-6">
          <CatalogueHealthSidebar />
        </div>
      </div>
      
      <InventoryAndExpirySection />
      <RecentActivitySection />
    </div>
  );
}
