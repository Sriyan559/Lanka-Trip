"use client";

import React from "react";

interface DataJobTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{label:string;count:number}>;
}

export function DataJobTabs({ activeTab, onTabChange, tabs }: DataJobTabsProps) {

  return (
    <div className="border-b border-line mb-3 overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => onTabChange(tab.label)}
              className={`pb-2.5 text-[12px] font-bold transition-colors relative whitespace-nowrap ${
                isActive
                  ? "text-[#671021] border-b-2 border-[#671021]"
                  : "text-slate-500 hover:text-ink"
              }`}
            >
              {tab.label} <span className="ml-1 text-[10px] text-muted">{tab.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
