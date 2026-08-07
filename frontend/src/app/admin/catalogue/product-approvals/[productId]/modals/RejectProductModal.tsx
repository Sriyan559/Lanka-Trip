"use client";

import React, { useState, useRef } from "react";
import { X, XCircle } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface RejectProductModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: (reasonCategory: string, notes: string) => void;
}

export function RejectProductModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: RejectProductModalProps) {
  const [reasonCategory, setReasonCategory] = useState("Unsubstantiated Clinical Claims");
  const [notes, setNotes] = useState(
    "Product rejected due to unverified anti-aging claims and missing safety certificates."
  );
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <XCircle size={18} color="#991b1b" /> Reject Product Submission
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
            You are rejecting <strong>{productName}</strong>. This decision will prevent publication on the marketplace and send notification to the supplier.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="reject-category" className={styles.formLabel}>
              Rejection Reason Category
            </label>
            <select
              id="reject-category"
              className={styles.formSelect}
              value={reasonCategory}
              onChange={(e) => setReasonCategory(e.target.value)}
            >
              <option value="Unsubstantiated Clinical Claims">Unsubstantiated Clinical Claims</option>
              <option value="Prohibited Ingredient Present">Prohibited Ingredient Present</option>
              <option value="Invalid Brand Authorization">Invalid Brand Authorization</option>
              <option value="Counterfeit / Duplicate Risk">Counterfeit / Duplicate Risk</option>
              <option value="Incomplete Documentation">Incomplete Documentation</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reject-notes" className={styles.formLabel}>
              Rejection Notes for Supplier &amp; Audit Trail
            </label>
            <textarea
              id="reject-notes"
              className={styles.formTextarea}
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnRedSolid}`}
            onClick={() => onConfirm(reasonCategory, notes)}
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}
