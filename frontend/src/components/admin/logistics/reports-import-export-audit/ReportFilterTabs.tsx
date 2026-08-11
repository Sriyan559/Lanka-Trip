"use client";

import React from "react";
import { ReusableTabs } from "../shared/ReusableTabs";

export const REPORT_FILTER_TABS = [
  "Overview",
  "Reports",
  "Scheduled Reports",
  "Report Templates",
  "Imports",
  "Exports",
  "Pending Review",
  "Pending Approval",
  "Running",
  "Completed",
  "Partial",
  "Failed",
  "Quarantined",
  "Reconciliation",
  "Audit Events",
  "Access History",
  "Evidence Packages",
  "Legal / Retention Holds",
  "Retention",
  "Archived",
];

interface ReportFilterTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ReportFilterTabs({ activeTab, onTabChange }: ReportFilterTabsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs mb-3">
      <ReusableTabs
        tabs={REPORT_FILTER_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
