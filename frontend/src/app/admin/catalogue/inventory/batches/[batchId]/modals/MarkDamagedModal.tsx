"use client";

import React, { useState, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../batch-detail.module.css";

interface MarkDamagedModalProps {
  isOpen: boolean;
  batchNumber?: string;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

export function MarkDamagedModal({
  isOpen,
  batchNumber = "BT-2024-0098",
  onClose,
  onConfirm,
}: MarkDamagedModalProps) {
  const [damagedQty, setDamagedQty] = useState(15);
  const [reason, setReason] = useState("Bottles broken during forklift handling at warehouse rack A-16.");

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <AlertTriangle size={18} color="#dc2626" /> Mark Stock as Damaged
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
            <label className={styles.formLabel}>Damaged Quantity (Units)</label>
            <input
              type="number"
              className={styles.formInput}
              value={damagedQty}
              onChange={(e) => setDamagedQty(Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Damage Reason &amp; Incident Notes</label>
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
            className={`${styles.btn} ${styles.btnRedSolid}`}
            onClick={() => onConfirm({ damagedQty, reason })}
          >
            Confirm Mark Damaged
          </button>
        </div>
      </div>
    </div>
  );
}
