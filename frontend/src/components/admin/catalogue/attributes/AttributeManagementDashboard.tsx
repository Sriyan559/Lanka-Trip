"use client";

import React from "react";
import { AttributeKPICards } from "./AttributeKPICards";
import { AttributesTableSection } from "./AttributesTableSection";
import { AttributePreviewSidebar } from "./AttributePreviewSidebar";
import { AttributeHealthSidebar } from "./AttributeHealthSidebar";
import { AttributeBottomPanels } from "./AttributeBottomPanels";

export function AttributeManagementDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 w-full items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <AttributeKPICards />
        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          <div className="flex-1 min-w-0">
            <AttributesTableSection />
          </div>
          <div className="w-full xl:w-[320px] shrink-0">
            <AttributePreviewSidebar />
          </div>
        </div>
        <AttributeBottomPanels />
      </div>
      <div className="flex flex-col gap-6 shrink-0">
        <AttributeHealthSidebar />
      </div>
    </div>
  );
}
