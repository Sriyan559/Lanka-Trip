"use client";

import React from "react";
import { ImportExportKPICards } from "./ImportExportKPICards";
import { ImportExportTableSection } from "./ImportExportTableSection";
import { ImportExportHealthSidebar } from "./ImportExportHealthSidebar";
import { ImportExportChartsSection } from "./ImportExportChartsSection";
import { ImportExportBottomPanels } from "./ImportExportBottomPanels";

export function ImportExportDashboard() {
  return (
    <div className="flex flex-col">
      <ImportExportKPICards />
      <ImportExportChartsSection />
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 mb-6">
         <ImportExportTableSection />
         <ImportExportHealthSidebar />
      </div>
      
      <ImportExportBottomPanels />
    </div>
  );
}
