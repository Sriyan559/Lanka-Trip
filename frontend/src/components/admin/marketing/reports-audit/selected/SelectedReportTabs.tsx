"use client";

import React from "react";

export const SELECTED_REPORT_TABS = [
  { id: "overview", label: "Overview" },
  { id: "sections", label: "Sections" },
  { id: "scope", label: "Data Scope" },
  { id: "schedule", label: "Schedule" },
  { id: "delivery", label: "Delivery" },
  { id: "history", label: "History" },
  { id: "access", label: "Access" },
  { id: "audit", label: "Audit" },
];

interface SelectedReportTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SelectedReportTabs({ activeTab, onTabChange }: SelectedReportTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {SELECTED_REPORT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "border-[#800020] text-[#800020] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
