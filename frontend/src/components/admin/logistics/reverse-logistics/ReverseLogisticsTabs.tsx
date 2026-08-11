"use client";

import React from "react";
import { ReusableTabs, TabItem } from "../shared/ReusableTabs";

export const REVERSE_LOGISTICS_TABS: (string | TabItem)[] = [
  "Overview",
  "All Returns",
  "Approved",
  "Awaiting Collection",
  "Collection Scheduled",
  "Collection Failed",
  "Reverse Shipment Created",
  "In Transit",
  "Awaiting Receipt",
  "Received",
  "Inspection Pending",
  "Restock Eligible",
  "Quarantine",
  "Return to Supplier",
  "Disposal",
  "Exchange",
  "Refund Dependency",
  "On Hold",
  "Exceptions",
  "Reconciliation",
  "SLA Breached",
  "Closed",
  "Audit History",
];

interface ReverseLogisticsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ReverseLogisticsTabs({
  activeTab,
  onTabChange,
  className = "",
}: ReverseLogisticsTabsProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs ${className}`}>
      <ReusableTabs
        tabs={REVERSE_LOGISTICS_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
