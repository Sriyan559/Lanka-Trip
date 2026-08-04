"use client";

import React, { useState, useRef } from "react";
import { X, ShieldAlert } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface ApproveConditionsModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: (conditions: string, deadline: string) => void;
}

export function ApproveConditionsModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: ApproveConditionsModalProps) {
  const [conditions, setConditions] = useState(
    "Submit missing safety certificate and back-packaging image within 14 days."
  );
  const [deadline, setDeadline] = useState("2024-11-15");
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <ShieldAlert size={18} color="#064e3b" /> Approve with Conditions
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
            Grant conditional approval for <strong>{productName}</strong>. The supplier must meet the required conditions before full publication.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="cond-text" className={styles.formLabel}>
              Required Conditions &amp; Action Items
            </label>
            <textarea
              id="cond-text"
              className={styles.formTextarea}
              rows={3}
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cond-deadline" className={styles.formLabel}>
              Compliance Deadline
            </label>
            <input
              id="cond-deadline"
              type="date"
              className={styles.formInput}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnDarkGreenSolid}`}
            onClick={() => onConfirm(conditions, deadline)}
          >
            Confirm Conditional Approval
          </button>
        </div>
      </div>
    </div>
  );
}
