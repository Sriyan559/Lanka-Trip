"use client";

import React from "react";

export type ComplaintTabId =
  | "complaints"
  | "escalations"
  | "critical"
  | "executive-review"
  | "recovery-plans"
  | "remedy-approvals"
  | "reopened"
  | "root-cause"
  | "customer-acceptance"
  | "closed"
  | "audit";

interface ComplaintsTabsProps {
  activeTab: ComplaintTabId;
  onTabChange: (tab: ComplaintTabId) => void;
}

const TABS: { id: ComplaintTabId; label: string }[] = [
  { id: "complaints", label: "Complaints" },
  { id: "escalations", label: "Escalations" },
  { id: "critical", label: "Critical" },
  { id: "executive-review", label: "Executive Review" },
  { id: "recovery-plans", label: "Recovery Plans" },
  { id: "remedy-approvals", label: "Remedy Approvals" },
  { id: "reopened", label: "Reopened" },
  { id: "root-cause", label: "Root Cause" },
  { id: "customer-acceptance", label: "Customer Acceptance" },
  { id: "closed", label: "Closed" },
  { id: "audit", label: "Audit" },
];

export function ComplaintsTabs({ activeTab, onTabChange }: ComplaintsTabsProps) {
  return (
    <div className="w-full border-b border-slate-200 mb-4 overflow-x-auto custom-scrollbar scrollbar-none">
      <div className="flex items-center gap-6 text-xs font-semibold whitespace-nowrap min-w-max">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2 transition-colors relative ${
                isActive
                  ? "text-[#800020] font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
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
