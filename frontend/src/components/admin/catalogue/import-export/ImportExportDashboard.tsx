"use client";

import React from "react";
import { ImportExportKPICards } from "./ImportExportKPICards";
import { ImportExportTableSection } from "./ImportExportTableSection";
import { ImportExportHealthSidebar } from "./ImportExportHealthSidebar";
import { ImportExportChartsSection } from "./ImportExportChartsSection";
import { ImportExportBottomPanels } from "./ImportExportBottomPanels";

export function ImportExportDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 w-full items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <ImportExportKPICards />
        <ImportExportChartsSection />
        <ImportExportTableSection />
        <ImportExportBottomPanels />
      </div>
      <div className="flex flex-col gap-6 shrink-0">
        <ImportExportHealthSidebar />
      </div>
    </div>
  );
}
