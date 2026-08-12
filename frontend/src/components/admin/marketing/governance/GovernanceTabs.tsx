"use client";

import React from "react";

export const GOVERNANCE_TABS = [
  { id: "overview", label: "Governance Overview" },
  { id: "policies", label: "Policies" },
  { id: "approvals", label: "Approvals", badge: 15 },
  { id: "consent", label: "Consent & Eligibility" },
  { id: "frequency", label: "Frequency & Contact Rules" },
  { id: "channels", label: "Channel Rules" },
  { id: "content", label: "Content & Rights" },
  { id: "restrictions", label: "Market & Product Restrictions" },
  { id: "exceptions", label: "Exceptions", badge: 12 },
  { id: "escalations", label: "Escalations" },
  { id: "versions", label: "Versions" },
  { id: "audit", label: "Audit" },
];

interface GovernanceTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function GovernanceTabs({ activeTab, onTabChange }: GovernanceTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {GOVERNANCE_TABS.map((tab) => {
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
