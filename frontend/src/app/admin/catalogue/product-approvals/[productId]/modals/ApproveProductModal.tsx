"use client";

import React, { useState, useRef } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface ApproveProductModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: (comment: string) => void;
}

export function ApproveProductModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: ApproveProductModalProps) {
  const [comment, setComment] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <CheckCircle2 size={18} color="#166534" /> Approve Product for Marketplace
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
            You are about to approve <strong>{productName}</strong>. This product has passed compliance screening and will be made eligible for marketplace publication.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="approve-comment" className={styles.formLabel}>
              Optional Reviewer Comment / Audit Note
            </label>
            <textarea
              id="approve-comment"
              className={styles.formTextarea}
              rows={3}
              placeholder="Add any notes for the audit trail..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGreenSolid}`}
            onClick={() => onConfirm(comment)}
          >
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}
