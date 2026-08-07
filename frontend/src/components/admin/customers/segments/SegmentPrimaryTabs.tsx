"use client";

import React from "react";

interface SegmentPrimaryTabsProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export function SegmentPrimaryTabs({ activeTab, onSelectTab }: SegmentPrimaryTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "all-segments", label: "All Segments" },
    { id: "dynamic", label: "Dynamic" },
    { id: "static-groups", label: "Static Groups" },
    { id: "lifecycle", label: "Lifecycle" },
    { id: "value", label: "Value" },
    { id: "loyalty", label: "Loyalty" },
    { id: "behavioral", label: "Behavioral" },
    { id: "engagement", label: "Engagement" },
    { id: "risk", label: "Risk" },
    { id: "consent-eligible", label: "Consent Eligible" },
    { id: "b2b-groups", label: "B2B Groups" },
    { id: "drafts", label: "Drafts" },
    { id: "pending-approval", label: "Pending Approval" },
    { id: "conflicts", label: "Conflicts" },
    { id: "revalidation", label: "Revalidation" },
    { id: "retired", label: "Retired" },
    { id: "audit-history", label: "Audit History" },
  ];

  return (
    <div className="w-full border-b border-line mb-4 overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-1 min-w-max pb-0.5">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTab(t.id)}
              className={`px-3 py-2 text-[11.5px] font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-[#671021] bg-rose-50/50 rounded-t-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {t.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#671021] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
