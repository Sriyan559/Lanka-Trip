"use client";

import React from "react";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function CategoryBottomPanels() {
  const SCORECARD: ProgressItem[] = [
    { label: "Hierarchy Integrity", pct: 92, color: "bg-[#059669]" },
    { label: "Attribute Completeness", pct: 86, color: "bg-[#059669]" },
    { label: "Product Mapping Quality", pct: 88, color: "bg-[#059669]" },
    { label: "Channel Eligibility", pct: 94, color: "bg-[#059669]" },
    { label: "Compliance Readiness", pct: 78, color: "bg-[#d97706]" },
    { label: "SEO Readiness", pct: 85, color: "bg-[#059669]" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SharedProgressList 
        title="Category Health Scorecard" 
        items={SCORECARD} 
        layout="horizontal"
      />
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm col-span-2 flex items-center justify-center">
         <span className="text-muted text-sm font-medium">Other Bottom Panels (Data Tables, Matrices, etc.)</span>
      </div>
    </div>
  );
}
