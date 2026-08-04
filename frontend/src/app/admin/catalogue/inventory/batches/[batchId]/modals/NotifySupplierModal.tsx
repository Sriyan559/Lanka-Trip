"use client";

import React, { useState, useRef } from "react";
import { X, Mail } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../batch-detail.module.css";

interface NotifySupplierModalProps {
  isOpen: boolean;
  batchNumber?: string;
  supplierName?: string;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

export function NotifySupplierModal({
  isOpen,
  batchNumber = "BT-2024-0098",
  supplierName = "Luxe Distribution Pvt Ltd",
  onClose,
  onConfirm,
}: NotifySupplierModalProps) {
  const [recipient, setRecipient] = useState("compliance@luxedistribution.lk");
  const [subject, setSubject] = useState(`Batch Notice: Inquiry regarding Batch ${batchNumber}`);
  const [message, setMessage] = useState(
    `Dear Compliance Team,\n\nPlease provide updated batch audit documentation for ${batchNumber}. Our quality check flags a minor packaging discrepancy.\n\nRegards,\nSL Beauty Compliance Team`
  );

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <Mail size={18} color="#202128" /> Notify Supplier ({supplierName})
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
            <label className={styles.formLabel}>Recipient Email</label>
            <input
              type="email"
              className={styles.formInput}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Subject</label>
            <input
              type="text"
              className={styles.formInput}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Message Body</label>
            <textarea
              className={styles.formTextarea}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            onClick={() => onConfirm({ recipient, subject, message })}
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}
