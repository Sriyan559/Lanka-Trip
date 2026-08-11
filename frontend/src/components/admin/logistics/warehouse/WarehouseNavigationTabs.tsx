"use client";

import React from "react";

interface WarehouseNavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function WarehouseNavigationTabs({ activeTab, onTabChange }: WarehouseNavigationTabsProps) {
  const tabs = [
    { name: "Overview" },
    { name: "All Facilities" },
    { name: "Warehouses" },
    { name: "Fulfilment Centres" },
    { name: "Regional Hubs" },
    { name: "Supplier Operated" },
    { name: "3PL Facilities" },
    { name: "Operational" },
    { name: "High Capacity", count: 5, badge: "bg-amber-100 text-amber-800" },
    { name: "Critical Capacity", count: 2, badge: "bg-rose-100 text-rose-800" },
    { name: "Maintenance", count: 3 },
    { name: "On Hold", count: 1 },
    { name: "Limited Service", count: 1 },
    { name: "Offline", count: 1 },
    { name: "SLA Breached", count: 0 },
    { name: "Audit History" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm px-3 py-1.5 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1 text-[10px] font-semibold text-muted whitespace-nowrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                isActive
                  ? "bg-primary-900 text-white font-bold shadow-sm"
                  : "hover:bg-canvas hover:text-ink text-muted"
              }`}
            >
              <span>{tab.name}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                    tab.badge || (isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700")
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
