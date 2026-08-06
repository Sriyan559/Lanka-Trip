"use client";

import React from "react";
import { CategoryStatusTab } from "@/types/categoryManagement";

interface CategoryStatusTabsProps {
  tabs: CategoryStatusTab[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
}

export const CategoryStatusTabs: React.FC<CategoryStatusTabsProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 px-3 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xs mb-4 text-xs">
      {tabs.map((tab) => {
        const isSelected = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`px-3 py-1.5 rounded transition-all font-semibold shrink-0 relative flex items-center gap-1.5 ${
              isSelected
                ? "text-[#741d35] font-bold bg-[#f5ebed]/70 border-b-2 border-[#741d35]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                isSelected ? "bg-[#741d35] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
