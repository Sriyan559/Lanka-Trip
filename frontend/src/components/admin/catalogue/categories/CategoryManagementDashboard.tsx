"use client";

import React from "react";
import { CategoryKPICards } from "./CategoryKPICards";
import { CategoryTableSection } from "./CategoryTableSection";
import { CategoryHealthSidebar } from "./CategoryHealthSidebar";
import { CategoryBottomPanels } from "./CategoryBottomPanels";

export function CategoryManagementDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <CategoryKPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <CategoryTableSection />
        <CategoryHealthSidebar />
      </div>
      
      <CategoryBottomPanels />
    </div>
  );
}
