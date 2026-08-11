"use client";

import React from "react";

interface AttributeStatusTabsProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
  counts: {
    all: number;
    active: number;
    required: number;
    variant: number;
    dataQuality: number;
    duplicates: number;
    invalidCombos: number | null;
  };
}

export const AttributeStatusTabs: React.FC<AttributeStatusTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    { name: "All Attributes", key: "all", count: counts.all },
    { name: "Active", key: "active", count: counts.active },
    { name: "Required", key: "required", count: counts.required },
    { name: "Variant Attributes", key: "variant", count: counts.variant },
    { name: "Data Quality Issues", key: "dataQuality", count: counts.dataQuality },
    { name: "Duplicates", key: "duplicates", count: counts.duplicates },
    { name: "Invalid Combinations", key: "invalidCombos", count: counts.invalidCombos },
  ];

  return (
    <div className="border-b border-gray-200 bg-white px-2 flex items-center overflow-x-auto no-scrollbar min-w-0">
      <div className="flex gap-1 py-1 text-xs">
        {tabs.map((t) => {
          const isActive = activeTab.toLowerCase() === t.key.toLowerCase() || activeTab === t.name;

          return (
            <button
              key={t.key}
              onClick={() => onTabChange(t.name)}
              className={`px-3 py-2 rounded-t font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-[#741d35] border-b-2 border-[#741d35] bg-gray-50/80 font-bold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span>{t.name}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? "bg-[#741d35] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {t.count ?? "N/A"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
