"use client";

import React from "react";

export const ATTRIBUTION_TABS = [
  { id: "overview", label: "Executive Overview" },
  { id: "attribution", label: "Attribution" },
  { id: "campaigns", label: "Campaign Performance" },
  { id: "channels", label: "Channel Performance" },
  { id: "acquisition", label: "Acquisition" },
  { id: "journeys", label: "Journeys" },
  { id: "webapp", label: "Web & App" },
  { id: "content", label: "Content" },
  { id: "lifecycle", label: "Customer Lifecycle" },
  { id: "comparison", label: "Model Comparison" },
  { id: "exceptions", label: "Exceptions", badge: 11 },
  { id: "audit", label: "Audit" },
];

interface AttributionTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AttributionTabs({ activeTab, onTabChange }: AttributionTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {ATTRIBUTION_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "border-[#800020] text-[#800020] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
