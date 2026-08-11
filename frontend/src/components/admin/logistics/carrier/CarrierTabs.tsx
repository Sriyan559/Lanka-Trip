"use client";

import React from "react";
import { ReusableTabs, TabItem } from "../shared/ReusableTabs";

export const CARRIER_TABS: (string | TabItem)[] = [
  "Overview",
  "All Carriers",
  "Active",
  "Approved",
  "Pending Review",
  "Limited Service",
  "Suspended",
  "Compliance Review",
  "Capacity Restricted",
  "Tracking Issues",
  "Pickup SLA Breach",
  "Delivery SLA Breach",
  "Claims",
  "COD / Reconciliation",
  "On Hold",
  "Exceptions",
  "Audit History",
];

interface CarrierTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function CarrierTabs({
  activeTab,
  onTabChange,
  className = "",
}: CarrierTabsProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs ${className}`}>
      <ReusableTabs
        tabs={CARRIER_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
