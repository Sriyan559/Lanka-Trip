"use client";

import React from "react";
import { AttributeKPICards } from "./AttributeKPICards";
import { AttributesTableSection } from "./AttributesTableSection";
import { AttributeHealthSidebar } from "./AttributeHealthSidebar";
import { AttributeBottomPanels } from "./AttributeBottomPanels";

export function AttributeManagementDashboard() {
  return (
    <div className="flex flex-col">
      <AttributeKPICards />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 mb-6">
        <AttributesTableSection />
        <AttributeHealthSidebar />
      </div>

      <AttributeBottomPanels />
    </div>
  );
}
