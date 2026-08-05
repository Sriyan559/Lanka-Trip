"use client";

import React from "react";
import styles from "./return-detail.module.css";

export const RETURN_DETAIL_TABS = [
  { id: "overview", label: "Case Overview" },
  { id: "items", label: "Returned Items" },
  { id: "evidence", label: "Customer Evidence" },
  { id: "eligibility", label: "Eligibility Assessment" },
  { id: "inspection", label: "Product Inspection" },
  { id: "batch", label: "Batch & Authenticity" },
  { id: "refund", label: "Refund Calculation" },
  { id: "responsibility", label: "Responsibility & Recovery" },
  { id: "logistics", label: "Return Logistics" },
  { id: "communications", label: "Communications" },
  { id: "issues", label: "Operational Issues" },
  { id: "audit", label: "Audit History" },
];

interface ReturnCaseTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  evidenceCount?: number;
  issuesCount?: number;
}

export function ReturnCaseTabs({
  activeTab,
  onTabChange,
  evidenceCount = 3,
  issuesCount = 2,
}: ReturnCaseTabsProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % RETURN_DETAIL_TABS.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + RETURN_DETAIL_TABS.length) % RETURN_DETAIL_TABS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = RETURN_DETAIL_TABS.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = RETURN_DETAIL_TABS[nextIndex];
    onTabChange(nextTab.id);
    const tabList = event.currentTarget.parentElement;
    (tabList?.querySelector(`#tab-${nextTab.id}`) as HTMLButtonElement | null)?.focus();
  };

  return (
    <div className={styles.tabsContainer} role="tablist" aria-label="Return Case Sections">
      {RETURN_DETAIL_TABS.map((tab, index) => {
        const isActive = activeTab === tab.id;
        let badge: number | undefined = undefined;
        if (tab.id === "evidence") badge = evidenceCount;
        if (tab.id === "issues") badge = issuesCount;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            tabIndex={isActive ? 0 : -1}
          >
            <span>{tab.label}</span>
            {badge !== undefined && (
              <span className={`${styles.tabBadge} ${isActive ? styles.tabBadgeActive : ""}`}>
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
