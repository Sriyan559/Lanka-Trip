"use client";

import React from "react";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onSelectTab?: (tab: string) => void;
  className?: string;
}

export function TabNavigation({
  tabs = [],
  activeTab,
  onSelectTab,
  className = "",
}: TabNavigationProps) {
  return (
    <div
      className={`an02-tab-bar bg-white border border-slate-200 rounded-lg p-1 overflow-x-auto flex items-center gap-1 text-xs whitespace-nowrap scrollbar-thin ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab?.(tab)}
            className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer text-xs ${
              isActive
                ? "bg-burgundy text-white font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
