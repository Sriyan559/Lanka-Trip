"use client";

import React from "react";

export type DeliveryTabId =
  | "active-cases"
  | "awaiting-dispatch"
  | "shipment-delay"
  | "tracking-issues"
  | "failed-delivery"
  | "address-customer-issues"
  | "supplier-fulfilment"
  | "carrier-exceptions"
  | "sla-at-risk"
  | "escalated"
  | "resolved"
  | "audit";

interface DeliverySupportTabsProps {
  activeTab: DeliveryTabId;
  onTabChange: (tab: DeliveryTabId) => void;
}

const TABS: { id: DeliveryTabId; label: string }[] = [
  { id: "active-cases", label: "Active Cases" },
  { id: "awaiting-dispatch", label: "Awaiting Dispatch" },
  { id: "shipment-delay", label: "Shipment Delay" },
  { id: "tracking-issues", label: "Tracking Issues" },
  { id: "failed-delivery", label: "Failed Delivery" },
  { id: "address-customer-issues", label: "Address & Customer Issues" },
  { id: "supplier-fulfilment", label: "Supplier Fulfilment" },
  { id: "carrier-exceptions", label: "Carrier Exceptions" },
  { id: "sla-at-risk", label: "SLA At Risk" },
  { id: "escalated", label: "Escalated" },
  { id: "resolved", label: "Resolved" },
  { id: "audit", label: "Audit" },
];

export function DeliverySupportTabs({ activeTab, onTabChange }: DeliverySupportTabsProps) {
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
