"use client";

import React, { useState, useRef } from "react";
import { X, UserPlus, Check } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface ReviewerOption {
  id: string;
  name: string;
  role: string;
  workload: string;
}

const REVIEWERS: ReviewerOption[] = [
  { id: "elena", name: "Elena Vance", role: "Compliance Officer", workload: "46% (3 active reviews)" },
  { id: "marcus", name: "Marcus Chen", role: "Senior Regulatory Lead", workload: "78% (6 active reviews)" },
  { id: "sarah", name: "Sarah Jenkins", role: "Category Specialist", workload: "25% (2 active reviews)" },
];

interface AssignReviewerModalProps {
  isOpen: boolean;
  productName: string;
  currentReviewer: string;
  onClose: () => void;
  onConfirm: (reviewerName: string) => void;
}

export function AssignReviewerModal({
  isOpen,
  productName,
  currentReviewer,
  onClose,
  onConfirm,
}: AssignReviewerModalProps) {
  const [selectedReviewer, setSelectedReviewer] = useState(
    currentReviewer || "Elena Vance"
  );
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <UserPlus size={18} color="#202128" /> Assign Reviewer
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
            Select a reviewer for <strong>{productName}</strong>.
          </p>

          <div className={styles.reviewerSelectList}>
            {REVIEWERS.map((r) => {
              const isSelected = selectedReviewer === r.name;
              return (
                <div
                  key={r.id}
                  className={`${styles.reviewerOptionCard} ${
                    isSelected ? styles.selectedReviewerCard : ""
                  }`}
                  onClick={() => setSelectedReviewer(r.name)}
                >
                  <div>
                    <div className={styles.revOptName}>{r.name}</div>
                    <div className={styles.revOptRole}>{r.role} — Workload: {r.workload}</div>
                  </div>
                  {isSelected && <Check size={18} color="#741d35" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => onConfirm(selectedReviewer)}
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
