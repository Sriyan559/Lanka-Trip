"use client";

import React from "react";
import { QualityKPICards } from "./QualityKPICards";
import { QualityChartsSection } from "./QualityChartsSection";
import { CatalogueQualityScorecard } from "./CatalogueQualityScorecard";
import { QualityIssuesTableSection } from "./QualityIssuesTableSection";
import { QualityHealthSidebar } from "./QualityHealthSidebar";
import { QualityBottomPanels } from "./QualityBottomPanels";

export function QualityManagementDashboard() {
  return (
    <div className="flex flex-col">
      <QualityKPICards />
      <QualityChartsSection />
      <CatalogueQualityScorecard />
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 mb-6">
         <QualityIssuesTableSection />
         <QualityHealthSidebar />
      </div>

      <QualityBottomPanels />
    </div>
  );
}
