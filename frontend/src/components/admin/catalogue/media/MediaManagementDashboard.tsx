"use client";

import React from "react";
import { MediaKPICards } from "./MediaKPICards";
import { MediaLibrarySection } from "./MediaLibrarySection";
import { MediaHealthSidebar } from "./MediaHealthSidebar";
import { MediaBottomPanels } from "./MediaBottomPanels";

export function MediaManagementDashboard() {
  return (
    <div className="flex flex-col">
      <MediaKPICards />
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6">
         <MediaLibrarySection />
         <MediaHealthSidebar />
      </div>

      <MediaBottomPanels />
    </div>
  );
}
