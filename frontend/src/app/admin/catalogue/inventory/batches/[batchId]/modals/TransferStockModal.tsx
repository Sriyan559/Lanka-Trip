"use client";

import React, { useState, useRef } from "react";
import { X, ArrowRightLeft } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../batch-detail.module.css";

interface TransferStockModalProps {
  isOpen: boolean;
  batchNumber?: string;
  onClose: () => void;
  onConfirm: (transferData: any) => void;
}

export function TransferStockModal({
  isOpen,
  batchNumber = "BT-2024-0098",
  onClose,
  onConfirm,
}: TransferStockModalProps) {
  const [sourceLoc, setSourceLoc] = useState("CMB-MAIN (Colombo Main Hub)");
  const [destLoc, setDestLoc] = useState("KND-HUB (Kandy Regional Hub)");
  const [qty, setQty] = useState(250);
  const [reason, setReason] = useState("Regional warehouse rebalancing for Q3 demand.");

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <ArrowRightLeft size={18} color="#202128" /> Transfer Batch Stock
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
            <label className={styles.formLabel}>Batch Reference</label>
            <input
              type="text"
              className={styles.formInput}
              value={batchNumber}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Source Location</label>
            <input
              type="text"
              className={styles.formInput}
              value={sourceLoc}
              onChange={(e) => setSourceLoc(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Destination Location</label>

            <select
              className={styles.formSelect}
              value={destLoc}
              onChange={(e) => setDestLoc(e.target.value)}
            >
              <option value="KND-HUB (Kandy Regional Hub)">
                KND-HUB (Kandy Regional Hub)
              </option>
              <option value="GAL-SUP (Galle Supplier Hub)">
                GAL-SUP (Galle Supplier Hub)
              </option>
              <option value="JAF-HUB (Jaffna Regional Hub)">
                JAF-HUB (Jaffna Regional Hub)
              </option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Transfer Quantity (Units)</label>
            <input
              type="number"
              className={styles.formInput}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Transfer Reason &amp; Notes</label>
            <textarea
              className={styles.formTextarea}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnBurgundy}`}
            onClick={() => onConfirm({ sourceLoc, destLoc, qty, reason })}
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
