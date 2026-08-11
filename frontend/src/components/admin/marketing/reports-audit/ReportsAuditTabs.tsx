"use client";

import React from "react";

export const REPORTS_AUDIT_TABS = [
  { id: "reports", label: "Reports" },
  { id: "scheduled", label: "Scheduled Reports" },
  { id: "exports", label: "Exports" },
  { id: "imports", label: "Imports" },
  { id: "templates", label: "Templates" },
  { id: "mappings", label: "Data Mappings" },
  { id: "transfers", label: "Transfer Jobs" },
  { id: "except_jobs", label: "Except Jobs" },
  { id: "exceptions", label: "Exceptions", badge: 9 },
  { id: "audit", label: "Audit Trail" },
  { id: "access", label: "Access & Evidence" },
  { id: "retention", label: "Retention" },
];

interface ReportsAuditTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ReportsAuditTabs({ activeTab, onTabChange }: ReportsAuditTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {REPORTS_AUDIT_TABS.map((tab) => {
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
