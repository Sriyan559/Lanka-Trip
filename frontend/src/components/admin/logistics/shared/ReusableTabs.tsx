import React from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface ReusableTabsProps {
  tabs: (string | TabItem)[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ReusableTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: ReusableTabsProps) {
  return (
    <div
      className={`flex items-center gap-1 border-b border-gray-200 overflow-x-auto no-scrollbar scroll-smooth ${className}`}
    >
      {tabs.map((tab) => {
        const id = typeof tab === "string" ? tab : tab.id;
        const label = typeof tab === "string" ? tab : tab.label;
        const count = typeof tab === "object" ? tab.count : undefined;
        const isActive = activeTab.toLowerCase() === id.toLowerCase();

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              isActive
                ? "border-rose-700 text-rose-700 bg-rose-50/40"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            <span>{label}</span>
            {count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-rose-100 text-rose-800 font-bold"
                    : "bg-gray-100 text-gray-600 font-medium"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
