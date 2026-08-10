"use client";

import React from "react";

interface FulfilmentDetailTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FulfilmentDetailTabs({ activeTab, onTabChange }: FulfilmentDetailTabsProps) {
  const tabs = [
    "Overview", "Order", "Items", "Inventory Allocation", "Reservations",
    "Transfers", "Picking", "Packing", "Quality Checks", "Dispatch",
    "Shipment", "Holds", "Exceptions", "Linked Records", "Communications",
    "Activity", "Audit History"
  ];

  return (
    <div className="border-b border-line bg-white rounded-xl shadow-sm px-4 overflow-x-auto scrollbar-none">
      <div className="flex gap-1 text-[11px] font-semibold text-muted py-2 whitespace-nowrap">
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
