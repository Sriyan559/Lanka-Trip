"use client";

import React, { useState, useRef } from "react";
import { X, PauseCircle } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface SuspendReviewModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function SuspendReviewModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: SuspendReviewModalProps) {
  const [reason, setReason] = useState(
    "Review suspended pending brand authorization verification case resolution."
  );
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <PauseCircle size={18} color="#374151" /> Suspend Product Review
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
            Temporarily suspend review for <strong>{productName}</strong>. SLA timer will be paused.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="suspend-reason" className={styles.formLabel}>
              Suspension Reason &amp; Internal Note
            </label>
            <textarea
              id="suspend-reason"
              className={styles.formTextarea}
              rows={4}
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
            className={`${styles.btn} ${styles.btnGraySolid}`}
            onClick={() => onConfirm(reason)}
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
}
