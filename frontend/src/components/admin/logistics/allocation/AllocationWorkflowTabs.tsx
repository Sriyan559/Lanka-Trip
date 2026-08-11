"use client";

import React from "react";

interface AllocationWorkflowTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AllocationWorkflowTabs({ activeTab, onTabChange }: AllocationWorkflowTabsProps) {
  const tabs = [
    "Overview", "All Demand", "Allocation Pending", "Fully Allocated", "Partially Allocated",
    "Allocation Failed", "Reservations", "Expiring Reservations", "Reservation Failed",
    "Shortages", "Transfer Required", "Transfer Requested", "In Transit", "Received",
    "Backordered", "Substitution Review", "On Hold", "Exceptions", "SLA Breached", "Audit History"
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm px-3 py-1.5 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1 text-[10px] font-semibold text-muted whitespace-nowrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-2.5 py-1 rounded-md transition-all ${
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
