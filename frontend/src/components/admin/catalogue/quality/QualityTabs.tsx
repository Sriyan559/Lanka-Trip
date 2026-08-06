"use client";

import React from "react";

interface QualityTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function QualityTabs({ activeTab, onTabChange }: QualityTabsProps) {
  const tabs = [
    "Overview",
    "Duplicate Products",
    "Incomplete Records",
    "Validation Failures",
    "Publication Blockers",
    "Quality Cases",
    "Audit Trail",
  ];

  return (
    <div className="w-full border-b border-line mb-4 bg-white px-2 rounded-t-lg">
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-[12px] font-medium">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`py-2.5 px-1 relative transition-colors whitespace-nowrap ${
                isActive
                  ? "text-[#671021] font-bold border-b-2 border-[#671021]"
                  : "text-slate-600 hover:text-ink font-semibold"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
