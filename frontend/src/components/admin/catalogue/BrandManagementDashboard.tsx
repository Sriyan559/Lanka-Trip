"use client";

import React from "react";
import { BrandKPICards } from "./brands/BrandKPICards";
import { BrandsTableSection } from "./brands/BrandsTableSection";
import { BrandHealthSidebar } from "./brands/BrandHealthSidebar";
import { BrandBottomPanels } from "./brands/BrandBottomPanels";

export function BrandManagementDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 w-full items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <BrandKPICards />
        <BrandsTableSection />
        <BrandBottomPanels />
      </div>
      <div className="flex flex-col gap-6 shrink-0 w-full lg:w-[320px]">
        <BrandHealthSidebar />
      </div>
    </div>
  );
}
