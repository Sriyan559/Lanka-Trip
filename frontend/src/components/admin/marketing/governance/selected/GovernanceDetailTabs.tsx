"use client";

import React from "react";

export const GOVERNANCE_DETAIL_TABS = [
  { id: "overview", label: "Overview" },
  { id: "policies", label: "Policies" },
  { id: "approvals", label: "Approvals" },
  { id: "consent", label: "Consent" },
  { id: "frequency", label: "Frequency" },
  { id: "channels", label: "Channels" },
  { id: "content", label: "Content & Rights" },
  { id: "restrictions", label: "Restrictions" },
  { id: "exceptions", label: "Exceptions" },
  { id: "evidence", label: "Evidence" },
  { id: "audit", label: "Audit" },
  { id: "sla", label: "SLA" },
  { id: "notes", label: "Notes" },
];

interface GovernanceDetailTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function GovernanceDetailTabs({ activeTab, onTabChange }: GovernanceDetailTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {GOVERNANCE_DETAIL_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "border-[#800020] text-[#800020] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
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
