"use client";

import React from "react";

export type ReturnsTabId =
  | "active-cases"
  | "return-requests"
  | "pickup-reverse-logistics"
  | "inspection"
  | "refund-pending"
  | "refund-exceptions"
  | "disputes"
  | "eligibility-issues"
  | "rejected-returns"
  | "sla-risk"
  | "escalated"
  | "resolved"
  | "audit";

interface ReturnsRefundTabsProps {
  activeTab: ReturnsTabId;
  onTabChange: (tab: ReturnsTabId) => void;
}

const TABS: { id: ReturnsTabId; label: string }[] = [
  { id: "active-cases", label: "Active Cases" },
  { id: "return-requests", label: "Return Requests" },
  { id: "pickup-reverse-logistics", label: "Pickup & Reverse Logistics" },
  { id: "inspection", label: "Inspection" },
  { id: "refund-pending", label: "Refund Pending" },
  { id: "refund-exceptions", label: "Refund Exceptions" },
  { id: "disputes", label: "Disputes" },
  { id: "eligibility-issues", label: "Eligibility Issues" },
  { id: "rejected-returns", label: "Rejected Returns" },
  { id: "sla-risk", label: "SLA Risk" },
  { id: "escalated", label: "Escalated" },
  { id: "resolved", label: "Resolved" },
  { id: "audit", label: "Audit" },
];

export function ReturnsRefundTabs({ activeTab, onTabChange }: ReturnsRefundTabsProps) {
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
