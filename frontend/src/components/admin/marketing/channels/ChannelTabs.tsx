"use client";

import React from "react";

export const CHANNEL_TABS = [
  { id: "channels", label: "Channels" },
  { id: "providers", label: "Providers" },
  { id: "senders", label: "Sender Identities" },
  { id: "delivery-health", label: "Delivery Health" },
  { id: "queue", label: "Message Queue" },
  { id: "suppressions", label: "Suppressions" },
  { id: "routing", label: "Routing & Fallback" },
  { id: "limits", label: "Limits & Frequency" },
  { id: "exceptions", label: "Exceptions" },
  { id: "audit", label: "Audit" },
];

interface ChannelTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ChannelTabs({ activeTab, onTabChange }: ChannelTabsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
      <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-gray-600 scrollbar-none py-1">
        {CHANNEL_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "border-[#800020] text-[#800020] font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
