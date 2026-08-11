"use client";

import React from "react";
import { ReusableTabs, TabItem } from "../shared/ReusableTabs";

export const DELIVERY_CONFIGURATION_TABS: (string | TabItem)[] = [
  "Overview",
  "Delivery Zones",
  "Delivery Services",
  "Carrier Eligibility",
  "Rate Rules",
  "Capacity Rules",
  "Cut-Off Rules",
  "SLA Rules",
  "Surcharges",
  "Blackout Rules",
  { id: "Draft", label: "Draft", count: 12 },
  { id: "Pending Review", label: "Pending Review", count: 8 },
  { id: "Pending Approval", label: "Pending Approval", count: 18 },
  { id: "Active", label: "Active", count: 236 },
  { id: "Scheduled", label: "Scheduled", count: 34 },
  { id: "Expiring", label: "Expiring", count: 14 },
  { id: "Suspended", label: "Suspended", count: 6 },
  { id: "Conflicts", label: "Conflicts", count: 8 },
  { id: "Exceptions", label: "Exceptions", count: 9 },
  "Audit History",
];

interface DeliveryConfigurationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function DeliveryConfigurationTabs({
  activeTab,
  onTabChange,
  className = "",
}: DeliveryConfigurationTabsProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs ${className}`}>
      <ReusableTabs
        tabs={DELIVERY_CONFIGURATION_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
