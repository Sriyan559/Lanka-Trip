"use client";

import React, { useState, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../batch-detail.module.css";

interface SuspendMarketplaceModalProps {
  isOpen: boolean;
  batchNumber?: string;
  productName?: string;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

export function SuspendMarketplaceModal({
  isOpen,
  batchNumber = "BT-2024-0098",
  productName = "Radiance Vitamin C Serum (30 ml)",
  onClose,
  onConfirm,
}: SuspendMarketplaceModalProps) {
  const [reason, setReason] = useState("Temporary suspension pending batch quality audit review.");
  const [indefinite, setIndefinite] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <AlertTriangle size={18} color="#b42318" /> Suspend Marketplace Availability
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
            Suspending marketplace availability will unpublish batch units of <strong>{productName}</strong> ({batchNumber}) from customer storefront searches and checkout options.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Suspension Reason &amp; Audit Notes</label>
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
                checked={indefinite}
                onChange={(e) => setIndefinite(e.target.checked)}
              />
              <span>Suspend indefinitely until manual clearance</span>
            </label>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnRedSolid}`}
            onClick={() => onConfirm({ reason, indefinite })}
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
}
