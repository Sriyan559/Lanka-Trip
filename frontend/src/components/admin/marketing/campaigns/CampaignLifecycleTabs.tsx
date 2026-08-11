"use client";

import React from "react";

const TABS = [
  { id: "All Campaigns", label: "All Campaigns" },
  { id: "Active", label: "Active" },
  { id: "Scheduled", label: "Scheduled" },
  { id: "Awaiting Approval", label: "Awaiting Approval" },
  { id: "Draft", label: "Draft" },
  { id: "Paused", label: "Paused" },
  { id: "Completed", label: "Completed" },
  { id: "Cancelled", label: "Cancelled" },
  { id: "Exceptions", label: "Exceptions" },
  { id: "Archived", label: "Archived" },
];

interface CampaignLifecycleTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function CampaignLifecycleTabs({
  activeTab,
  onTabChange,
}: CampaignLifecycleTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-100 py-1.5 text-xs font-semibold text-gray-600 scrollbar-none whitespace-nowrap">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1 rounded-lg shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? "bg-rose-50 text-[#800020] font-bold border border-rose-200/80 shadow-2xs"
                  : "hover:text-gray-900 hover:bg-gray-50"
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
