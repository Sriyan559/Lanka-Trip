"use client";

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

export type TabKey =
  | "overview"
  | "content"
  | "beauty_profile"
  | "ingredients_safety"
  | "variants"
  | "media"
  | "brand_auth"
  | "batch_expiry"
  | "pricing_inventory"
  | "audit_logs"
  | "supplier_docs";

interface ProductDetailTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export function ProductDetailTabs({
  activeTab,
  onTabChange,
}: ProductDetailTabsProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  useClickOutside(moreRef, () => setMoreOpen(false));

  const mainTabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "content", label: "Product Content" },
    { key: "beauty_profile", label: "Beauty Profile" },
    { key: "ingredients_safety", label: "Ingredients & Safety" },
    { key: "variants", label: "Variants" },
    { key: "media", label: "Images & Media" },
    { key: "brand_auth", label: "Brand Authorization" },
    { key: "batch_expiry", label: "Batch & Expiry" },
    { key: "pricing_inventory", label: "Pricing & Inventory" },
  ];

  return (
    <div className={styles.tabsContainer}>
      <nav aria-label="Product approval sections" className={styles.tabsList}>
        {mainTabs.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              className={`${styles.tabItem} ${isActive ? styles.tabActive : ""}`}
              onClick={() => onTabChange(t.key)}
              aria-selected={isActive}
              role="tab"
            >
              {t.label}
            </button>
          );
        })}

        {/* More Tab Dropdown */}
        <div className={styles.moreTabWrapper} ref={moreRef}>
          <button
            type="button"
            className={`${styles.tabItem} ${styles.moreTabBtn} ${
              activeTab === "audit_logs" || activeTab === "supplier_docs"
                ? styles.tabActive
                : ""
            }`}
            onClick={() => setMoreOpen((p) => !p)}
            aria-label="More sections"
            aria-expanded={moreOpen}
          >
            More <ChevronDown size={14} />
          </button>

          {moreOpen && (
            <div className={styles.moreTabDropdown}>
              <button
                type="button"
                className={styles.moreTabDropdownItem}
                onClick={() => {
                  setMoreOpen(false);
                  onTabChange("audit_logs");
                }}
              >
                Audit &amp; Change History
              </button>
              <button
                type="button"
                className={styles.moreTabDropdownItem}
                onClick={() => {
                  setMoreOpen(false);
                  onTabChange("supplier_docs");
                }}
              >
                Supplier Certificates &amp; Documents
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
