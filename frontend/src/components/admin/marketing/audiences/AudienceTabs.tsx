"use client";

import React from "react";

export const AUDIENCE_TABS = [
  { id: "audiences", label: "Audiences" },
  { id: "segments", label: "Segments" },
  { id: "rules", label: "Targeting Rules" },
  { id: "suppressions", label: "Suppressions" },
  { id: "overlap", label: "Overlap Analysis" },
  { id: "eligibility", label: "Eligibility" },
  { id: "refresh", label: "Refresh & Sync" },
  { id: "audit", label: "Audit" },
] as const;

export type AudienceTabId = (typeof AUDIENCE_TABS)[number]["id"];

export function AudienceTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: AudienceTabId;
  onTabChange: (tab: AudienceTabId) => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-white px-3 pt-2 rounded-t-xl shadow-2xs font-sans overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-5 sm:gap-7 min-w-max">
        {AUDIENCE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2.5 text-xs font-bold transition-all relative ${
                isActive
                  ? "text-[#800020] border-b-2 border-[#800020]"
                  : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
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
