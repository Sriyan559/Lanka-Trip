"use client";

import React from "react";

export const PAID_MEDIA_TABS = [
  { id: "campaigns", label: "Campaigns" },
  { id: "platforms", label: "Platforms" },
  { id: "ad-accounts", label: "Ad Accounts" },
  { id: "audience-activation", label: "Audience Activation" },
  { id: "creative-readiness", label: "Creative Readiness" },
  { id: "spend-pacing", label: "Spend & Pacing" },
  { id: "acquisition", label: "Acquisition" },
  { id: "tracking", label: "Tracking" },
  { id: "exceptions", label: "Exceptions", badge: 11 },
  { id: "governance", label: "Governance" },
  { id: "audit", label: "Audit" },
];

interface PaidMediaTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PaidMediaTabs({ activeTab, onTabChange }: PaidMediaTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {PAID_MEDIA_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "border-[#800020] text-[#800020] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
