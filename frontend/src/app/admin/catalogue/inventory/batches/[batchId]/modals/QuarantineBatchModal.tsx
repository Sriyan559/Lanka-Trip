"use client";

import React, { useState, useRef } from "react";
import { X, ShieldAlert } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../batch-detail.module.css";

interface QuarantineBatchModalProps {
  isOpen: boolean;
  batchNumber?: string;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

export function QuarantineBatchModal({
  isOpen,
  batchNumber = "BT-2024-0098",
  onClose,
  onConfirm,
}: QuarantineBatchModalProps) {
  const [reason, setReason] = useState("Suspected packaging seal defect during routine QA inspection.");
  const [qty, setQty] = useState(500);
  const [notifySupplier, setNotifySupplier] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <ShieldAlert size={18} color="#b45309" /> Quarantine Batch
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
          <p className={styles.modalText}>
            Quarantining this batch will restrict sales availability until quality audit clearance is completed.
          </p>

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
            <label className={styles.formLabel}>Quantity to Quarantine (Units)</label>
            <input
              type="number"
              className={styles.formInput}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Quarantine Reason &amp; Compliance Notes</label>
            <textarea
              className={styles.formTextarea}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={notifySupplier}
                onChange={(e) => setNotifySupplier(e.target.checked)}
              />
              <span>Send automated notification to supplier (Luxe Distribution Pvt Ltd)</span>
            </label>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnDarkNeutral}`}
            onClick={() => onConfirm({ reason, qty, notifySupplier })}
          >
            Confirm Quarantine
          </button>
        </div>
      </div>
    </div>
  );
}
