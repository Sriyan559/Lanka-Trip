"use client";

import React from "react";

interface CustomerCommandTabsProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

export function CustomerCommandTabs({
  activeTab,
  onTabChange,
}: CustomerCommandTabsProps) {
  const tabs = [
    { id: "Overview", label: "Overview" },
    { id: "Active", label: "Active" },
    { id: "New", label: "New" },
    { id: "Verified", label: "Verified" },
    { id: "Loyalty", label: "Loyalty" },
    { id: "Dormant", label: "Dormant" },
    { id: "Restricted", label: "Restricted" },
    { id: "High-Value", label: "High-Value" },
    { id: "Service Cases", label: "Service Cases" },
    { id: "Returns & Disputes", label: "Returns & Disputes" },
    { id: "Privacy Requests", label: "Privacy Requests" },
  ];

  return (
    <div className="border-b border-line mb-4 overflow-x-auto scrollbar-none bg-white px-2 rounded-t-lg">
      <nav className="flex items-center gap-6 text-[12px] min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2.5 px-1 relative transition-colors whitespace-nowrap ${
                isActive
                  ? "text-[#671021] font-bold"
                  : "text-slate-600 hover:text-ink font-semibold"
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#671021] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
