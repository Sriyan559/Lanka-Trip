"use client";

import React from "react";

interface BrandStatusTabsProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
  counts: Record<string, number | null>;
}

export const BrandStatusTabs: React.FC<BrandStatusTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    { name: "All Brands", key: "all", count: counts.all },
    { name: "Active", key: "active", count: counts.active },
    { name: "Verified", key: "verified", count: counts.verified },
    { name: "Pending", key: "pending", count: counts.pending },
    { name: "Conditional", key: "conditional", count: counts.conditional },
    { name: "Expiring", key: "expiring", count: counts.expiring },
    { name: "Unauthorized Use", key: "unauthorized", count: counts.unauthorized },
    { name: "Archived", key: "archived", count: counts.archived },
  ];

  return (
    <div className="border-b border-gray-200 bg-white px-2 flex items-center overflow-x-auto no-scrollbar">
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
                {t.count === null ? "N/A" : t.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
