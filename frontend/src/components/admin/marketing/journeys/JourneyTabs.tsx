"use client";

import React from "react";

export const JOURNEY_TABS = [
  { id: "journeys", label: "Journeys" },
  { id: "templates", label: "Templates" },
  { id: "triggers", label: "Triggers" },
  { id: "entry-rules", label: "Entry Rules" },
  { id: "automation-rules", label: "Automation Rules" },
  { id: "exceptions", label: "Exceptions" },
  { id: "approval-queue", label: "Approval Queue", badge: 4 },
  { id: "execution-history", label: "Execution History" },
  { id: "audit", label: "Audit" },
] as const;

export type JourneyTabId = (typeof JOURNEY_TABS)[number]["id"];

export function JourneyTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: JourneyTabId;
  onTabChange: (tab: JourneyTabId) => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-white px-3 pt-2 rounded-t-xl shadow-2xs font-sans overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-5 sm:gap-6 min-w-max">
        {JOURNEY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2.5 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
                isActive
                  ? "text-[#800020] border-b-2 border-[#800020]"
                  : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
              }`}
            >
              <span>{tab.label}</span>
              {"badge" in tab && (
                <span className="bg-[#800020] text-white text-[9.5px] font-mono px-1.5 py-0.2 rounded-full">
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
