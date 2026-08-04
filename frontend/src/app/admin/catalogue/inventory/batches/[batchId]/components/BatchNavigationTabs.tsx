"use client";

import React from "react";
import styles from "../batch-detail.module.css";

interface BatchNavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  "Batch Overview",
  "Movement History",
  "Inventory Locations",
  "Expiry & Shelf Life",
  "Quality & Compliance",
  "Recall Management",
  "Linked Orders",
  "Supplier Communication",
  "Audit History",
];

export function BatchNavigationTabs({
  activeTab,
  onTabChange,
}: BatchNavigationTabsProps) {
  return (
    <div className={styles.tabsContainer} role="tablist" aria-label="Batch Detail Tabs">
      <div className={styles.tabsScrollWrapper}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
