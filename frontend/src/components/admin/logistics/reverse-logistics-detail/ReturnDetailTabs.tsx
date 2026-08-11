"use client";

import React from "react";
import { ReusableTabs } from "../shared/ReusableTabs";

export const RETURN_DETAIL_SUB_TABS = [
  "Overview",
  "Eligibility",
  "Order",
  "Customer",
  "Product",
  "Collection",
  "Reverse Shipment",
  "Tracking",
  "Warehouse Receipt",
  "Inspection",
  "Condition",
  "Disposition",
  "Restock",
  "Quarantine",
  "Supplier Return",
  "Exchange",
  "Refund Dependency",
  "Costs",
  "Holds",
  "Exceptions",
  "Reconciliation",
  "SLA",
  "Linked Records",
  "Communications",
  "Activity",
  "Audit History",
];

interface ReturnDetailTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ReturnDetailTabs({
  activeTab,
  onTabChange,
  className = "",
}: ReturnDetailTabsProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs ${className}`}>
      <ReusableTabs
        tabs={RETURN_DETAIL_SUB_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
