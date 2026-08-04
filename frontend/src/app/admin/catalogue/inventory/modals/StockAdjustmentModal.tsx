"use client";

import React, { useState, useRef } from "react";
import { X, RefreshCw } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../inventory.module.css";

interface StockAdjustmentModalProps {
  isOpen: boolean;
  batchNumber?: string;
  onClose: () => void;
  onConfirm: (adjustment: any) => void;
}

export function StockAdjustmentModal({
  isOpen,
  batchNumber = "BT-2024-0098",
  onClose,
  onConfirm,
}: StockAdjustmentModalProps) {
  const [targetBatch, setTargetBatch] = useState(batchNumber);
  const [adjType, setAdjType] = useState("Damaged Stock Removal");
  const [qty, setQty] = useState(50);
  const [reason, setReason] = useState(
    "Damaged outer carton packaging during transit to Colombo Main Hub."
  );

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <RefreshCw size={18} color="#202128" /> Record Stock Adjustment
          </h3>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Target Batch Number</label>
            <input
              type="text"
              className={styles.formInput}
              value={targetBatch}
              onChange={(e) => setTargetBatch(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Adjustment Type</label>
            <select
              className={styles.formSelect}
              value={adjType}
              onChange={(e) => setAdjType(e.target.value)}
            >
              <option value="Damaged Stock Removal">Damaged Stock Removal</option>
              <option value="Quarantine Transfer">Quarantine Transfer</option>
              <option value="Physical Audit Reconciliation">
                Physical Audit Reconciliation
              </option>
              <option value="Sample / Tester Disposal">Sample / Tester Disposal</option>
              <option value="Supplier Return">Supplier Return</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Adjustment Quantity (Units)</label>
            <input
              type="number"
              className={styles.formInput}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Reason &amp; Audit Note</label>
            <textarea
              className={styles.formTextarea}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnDarkNeutral}`}
            onClick={() =>
              onConfirm({ targetBatch, adjType, qty, reason })
            }
          >
            Confirm Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}
