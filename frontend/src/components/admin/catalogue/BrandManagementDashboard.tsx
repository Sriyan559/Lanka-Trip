"use client";

import React from "react";
import { BrandKPICards } from "./brands/BrandKPICards";
import { BrandsTableSection } from "./brands/BrandsTableSection";
import { BrandHealthSidebar } from "./brands/BrandHealthSidebar";
import { BrandBottomPanels } from "./brands/BrandBottomPanels";

export function BrandManagementDashboard() {
  return (
    <div className="flex flex-col">
      <BrandKPICards />
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 mb-6">
         <BrandsTableSection />
         <BrandHealthSidebar />
      </div>

      <BrandBottomPanels />
    </div>
  );
}
