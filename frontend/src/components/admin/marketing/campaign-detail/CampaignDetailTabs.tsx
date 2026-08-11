"use client";

import React from "react";

export const MK03_TABS = [
  { id: "overview", label: "Overview" },
  { id: "audience", label: "Audience" },
  { id: "channels", label: "Channels" },
  { id: "content", label: "Content & Creative" },
  { id: "budget", label: "Budget" },
  { id: "performance", label: "Performance" },
  { id: "attribution", label: "Attribution" },
  { id: "governance", label: "Governance" },
  { id: "approvals", label: "Approvals" },
  { id: "promotions", label: "Linked Promotions" },
  { id: "activity", label: "Activity" },
  { id: "audit", label: "Audit" },
] as const;

export type Mk03TabId = (typeof MK03_TABS)[number]["id"];

export function CampaignDetailTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: Mk03TabId;
  onTabChange: (tab: Mk03TabId) => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-white px-3 pt-2 rounded-t-xl shadow-2xs font-sans overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-4 sm:gap-6 min-w-max">
        {MK03_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2.5 text-xs font-bold transition-all relative ${
                isActive
                  ? "text-[#800020] border-b-2 border-[#800020]"
                  : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
