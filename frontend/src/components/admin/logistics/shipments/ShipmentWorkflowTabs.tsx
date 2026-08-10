"use client";

import React from "react";

interface ShipmentWorkflowTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ShipmentWorkflowTabs({ activeTab, onTabChange }: ShipmentWorkflowTabsProps) {
  const tabs = [
    "Overview", "All Shipments", "Creation Pending", "Carrier Assignment", "Pickup Scheduled",
    "Awaiting Pickup", "Collected", "In Transit", "At Delivery Hub", "Out for Delivery",
    "Delivered", "Delayed", "Failed Delivery", "Delivery Retry", "Return to Origin",
    "Lost", "Damaged", "On Hold", "Exceptions", "Reconciliation", "SLA Breached", "Audit History"
  ];

  return (
    <div className="border border-line bg-white rounded-xl shadow-xs px-2.5 overflow-x-auto scrollbar-thin">
      <div className="flex gap-1 text-[10px] font-semibold text-muted py-1.5 whitespace-nowrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                isActive
                  ? "bg-primary-900 text-white font-bold shadow-xs"
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
