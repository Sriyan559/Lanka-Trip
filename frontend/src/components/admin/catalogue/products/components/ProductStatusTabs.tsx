"use client";

import React from "react";
import type { ProductStatusTab } from "@/types/productMaster";

interface ProductStatusTabsProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  tabs: ProductStatusTab[];
}

export const ProductStatusTabs: React.FC<ProductStatusTabsProps> = ({
  activeTab,
  onSelectTab,
  tabs,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 px-4 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`px-3 py-1.5 rounded transition-all font-semibold shrink-0 flex items-center gap-1.5 relative ${
              isSelected
                ? "text-[#741d35] font-bold bg-[#f5ebed]/60 border-b-2 border-[#741d35]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] ${
                isSelected
                  ? "bg-[#741d35] text-white"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              {tab.count.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
};
