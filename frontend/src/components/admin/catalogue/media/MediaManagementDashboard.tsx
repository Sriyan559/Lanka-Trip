"use client";

import React from "react";
import { MediaKPICards } from "./MediaKPICards";
import { MediaLibrarySection } from "./MediaLibrarySection";
import { MediaHealthSidebar } from "./MediaHealthSidebar";
import { MediaBottomPanels } from "./MediaBottomPanels";
import { MediaPreviewSidebar } from "./MediaPreviewSidebar";

export function MediaManagementDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 w-full items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <MediaKPICards />
        <MediaLibrarySection />
        <MediaBottomPanels />
      </div>
      <div className="flex flex-col gap-6 shrink-0">
        <MediaHealthSidebar />
        <MediaPreviewSidebar />
      </div>
    </div>
  );
}
