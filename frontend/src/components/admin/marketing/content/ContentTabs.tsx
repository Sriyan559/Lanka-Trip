"use client";

import React from "react";

export function ContentTabs({
  activeTab = "Library",
  onTabChange,
}: {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const tabs = [
    "Library",
    "Templates",
    "Variants",
    "Approvals",
    "Rights & Expiry",
    "Channel Readiness",
    "Usage",
    "Exceptions",
    "Archive",
    "Audit",
  ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-t-xl px-3 pt-2 font-sans border-b border-gray-200 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-4 min-w-max text-[11px] font-bold">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange && onTabChange(tab)}
              className={`pb-2 transition-colors relative whitespace-nowrap ${
                isActive
                  ? "text-[#800020] font-extrabold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800020] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
