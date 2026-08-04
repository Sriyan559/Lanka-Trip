"use client";

import React, { useState, useRef } from "react";
import { X, HelpCircle } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface RequestInfoModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: (category: string, message: string) => void;
}

export function RequestInfoModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: RequestInfoModalProps) {
  const [category, setCategory] = useState("Ingredients & Safety");
  const [message, setMessage] = useState(
    "Please upload certified lab test results for the 15% Vitamin C concentration and provide a high-resolution back packaging image."
  );
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <HelpCircle size={18} color="#c2410c" /> Request Additional Information
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
            Send an information request for <strong>{productName}</strong> to the supplier.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="info-category" className={styles.formLabel}>
              Information Category
            </label>
            <select
              id="info-category"
              className={styles.formSelect}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Ingredients & Safety">Ingredients &amp; Safety</option>
              <option value="Product Copy & Claims">Product Copy &amp; Claims</option>
              <option value="Brand Authorization">Brand Authorization</option>
              <option value="High-Res Packaging Images">High-Res Packaging Images</option>
              <option value="Pricing & Variant Data">Pricing &amp; Variant Data</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="info-msg" className={styles.formLabel}>
              Message to Supplier
            </label>
            <textarea
              id="info-msg"
              className={styles.formTextarea}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnAmberSolid}`}
            onClick={() => onConfirm(category, message)}
          >
            Send Request to Supplier
          </button>
        </div>
      </div>
    </div>
  );
}
