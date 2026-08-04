"use client";

import React, { useRef } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../inventory.module.css";

interface MoreFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export function MoreFiltersDrawer({
  isOpen,
  onClose,
  onApply,
}: MoreFiltersDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useClickOutside(drawerRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.drawerOverlay} role="dialog" aria-modal="true">
      <div className={styles.drawerContent} ref={drawerRef}>
        <div className={styles.drawerHeader}>
          <h3 className={styles.drawerTitle}>
            <SlidersHorizontal size={18} /> Advanced Inventory Filters
          </h3>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Manufacturing Date Range</label>
            <div className={styles.formRow2}>
              <input type="date" className={styles.formInput} />
              <input type="date" className={styles.formInput} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Expiry Date Range</label>
            <div className={styles.formRow2}>
              <input type="date" className={styles.formInput} />
              <input type="date" className={styles.formInput} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Stock Quantity Threshold</label>
            <div className={styles.formRow2}>
              <input type="number" className={styles.formInput} placeholder="Min Units" />
              <input type="number" className={styles.formInput} placeholder="Max Units" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Risk Level</label>
            <select className={styles.formSelect}>
              <option value="ALL">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="High">High Risk</option>
              <option value="Critical">Critical Risk</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Batch Status</label>
            <select className={styles.formSelect}>
              <option value="ALL">All Batch Statuses</option>
              <option value="Active">Active</option>
              <option value="Near Expiry">Near Expiry</option>
              <option value="Quarantined">Quarantined</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        <div className={styles.drawerFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Reset
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnBurgundy}`}
            onClick={onApply}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
