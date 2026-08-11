"use client";

import React from "react";
import { ReusableTabs } from "../shared/ReusableTabs";

export const EXCEPTION_FILTER_TABS = [
  "Overview",
  "All Exceptions",
  "Critical",
  "High",
  "Claims",
  "Carrier Claims",
  "Supplier Claims",
  "Cost Variances",
  "Unmatched Records",
  "Reconciliation Required",
  "Pending Review",
  "Pending Approval",
  "In Investigation",
  "Awaiting External Response",
  "Recovery Pending",
  "Resolved",
  "Rejected",
  "On Hold",
  "SLA Breached",
  "Audit History",
];

interface ExceptionFilterTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ExceptionFilterTabs({
  activeTab,
  onTabChange,
}: ExceptionFilterTabsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs mb-3">
      <ReusableTabs
        tabs={EXCEPTION_FILTER_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
