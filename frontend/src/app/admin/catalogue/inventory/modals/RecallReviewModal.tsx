"use client";

import React, { useState, useRef } from "react";
import { X, AlertOctagon } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../inventory.module.css";

interface RecallReviewModalProps {
  isOpen: boolean;
  batchNumber?: string;
  onClose: () => void;
  onConfirm: (recallData: any) => void;
}

export function RecallReviewModal({
  isOpen,
  batchNumber = "RECALL-442",
  onClose,
  onConfirm,
}: RecallReviewModalProps) {
  const [targetBatch, setTargetBatch] = useState(batchNumber);
  const [severity, setSeverity] = useState("Class I - Critical Safety Risk");
  const [reason, setReason] = useState(
    "Active safety recall triggered by regulatory authority due to potential ingredient contamination."
  );
  const [affectedUnits, setAffectedUnits] = useState(1100);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <AlertOctagon size={18} color="#991b1b" /> Initiate Product Recall Review
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
            Initiating a recall review will quarantine all matching inventory batches and trace linked customer orders.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Target Batch Number / Code</label>
            <input
              type="text"
              className={styles.formInput}
              value={targetBatch}
              onChange={(e) => setTargetBatch(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Recall Severity Level</label>
            <select
              className={styles.formSelect}
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="Class I - Critical Safety Risk">
                Class I — Critical Safety Risk
              </option>
              <option value="Class II - Moderate Compliance Issue">
                Class II — Moderate Compliance Issue
              </option>
              <option value="Class III - Minor Packaging / Label Error">
                Class III — Minor Packaging / Label Error
              </option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Affected Quantity (Units)</label>
            <input
              type="number"
              className={styles.formInput}
              value={affectedUnits}
              onChange={(e) => setAffectedUnits(Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Recall Reason &amp; Regulatory Case Notes</label>
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
            className={`${styles.btn} ${styles.btnRedSolid}`}
            onClick={() =>
              onConfirm({ targetBatch, severity, affectedUnits, reason })
            }
          >
            Confirm Recall Initiation
          </button>
        </div>
      </div>
    </div>
  );
}
