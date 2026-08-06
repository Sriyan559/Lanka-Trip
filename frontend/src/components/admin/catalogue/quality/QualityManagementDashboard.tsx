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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 w-full items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <QualityKPICards />
        <QualityChartsSection />
        <CatalogueQualityScorecard />
        <QualityIssuesTableSection />
        <QualityBottomPanels />
      </div>
      <div className="flex flex-col gap-6 shrink-0">
        <QualityHealthSidebar />
      </div>
    </div>
  );
}
