"use client";

import React from "react";

interface FulfilmentWorkflowTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FulfilmentWorkflowTabs({ activeTab, onTabChange }: FulfilmentWorkflowTabsProps) {
  const tabs = [
    "Overview", "All Fulfilment Orders", "New", "Unassigned", "Allocation Pending",
    "Partially Allocated", "Allocation Failed", "Picking", "Picking Exception", "Packing",
    "Quality Review", "Ready for Dispatch", "Shipment Created", "On Hold", "Blocked",
    "Partially Fulfilled", "Completed", "Cancelled", "SLA Breached", "Audit History"
  ];

  return (
    <div className="border-b border-line bg-white rounded-xl shadow-sm px-4 overflow-x-auto scrollbar-none">
      <div className="flex gap-1.5 text-[11px] font-semibold text-muted py-2.5 whitespace-nowrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? "bg-primary-900 text-white font-bold shadow-sm"
                  : "hover:bg-canvas hover:text-ink text-muted"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
