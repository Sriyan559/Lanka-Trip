"use client";

import React from "react";

interface DataJobTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DataJobTabs({ activeTab, onTabChange }: DataJobTabsProps) {
  const tabs = [
    "All Jobs",
    "Imports",
    "Exports",
    "Pending Review",
    "Scheduled",
    "Failed",
    "Completed",
    "Templates",
  ];

  return (
    <div className="border-b border-line mb-3 overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-2.5 text-[12px] font-bold transition-colors relative whitespace-nowrap ${
                isActive
                  ? "text-[#671021] border-b-2 border-[#671021]"
                  : "text-slate-500 hover:text-ink"
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
