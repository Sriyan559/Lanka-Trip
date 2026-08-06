"use client";

import React from "react";

export interface DirectoryTab {
  id: string;
  label: string;
  count?: number;
}

export const DIRECTORY_TABS: DirectoryTab[] = [
  { id: "all", label: "All Customers" },
  { id: "active", label: "Active" },
  { id: "new", label: "New" },
  { id: "verified", label: "Verified" },
  { id: "verification-pending", label: "Verification Pending" },
  { id: "incomplete-profiles", label: "Incomplete Profiles" },
  { id: "high-value", label: "High Value" },
  { id: "loyalty-members", label: "Loyalty Members" },
  { id: "dormant", label: "Dormant" },
  { id: "restricted", label: "Restricted" },
  { id: "duplicate-candidates", label: "Duplicate Candidates" },
  { id: "privacy-review", label: "Privacy Review" },
  { id: "archived", label: "Archived" },
  { id: "audit-history", label: "Audit History" },
];

interface CustomerDirectoryTabsProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export function CustomerDirectoryTabs({
  activeTab,
  onSelectTab,
}: CustomerDirectoryTabsProps) {
  return (
    <div className="bg-white border-b border-line px-6 overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-1 min-w-max">
        {DIRECTORY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`py-3 px-3.5 text-[12px] font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? "border-[#671021] text-[#671021] bg-slate-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/30"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive
                      ? "bg-[#671021]/10 text-[#671021]"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
