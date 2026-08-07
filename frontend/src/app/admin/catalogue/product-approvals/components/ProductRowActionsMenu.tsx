"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { MoreVertical, Eye, UserPlus, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approvals.module.css";

interface ProductRowActionsMenuProps {
  productId: string;
  onAssignReviewer?: (id: string) => void;
  onRequestInfo?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function ProductRowActionsMenu({
  productId,
  onAssignReviewer,
  onRequestInfo,
  onApprove,
  onReject,
}: ProductRowActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className={styles.actionMenuWrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.iconMenuBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Actions menu"
        aria-expanded={isOpen}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Link
            href={`/admin/catalogue/product-approvals/${productId}`}
            className={styles.dropdownMenuItem}
            onClick={() => setIsOpen(false)}
          >
            <Eye size={14} /> View Details
          </Link>
          <button
            type="button"
            className={styles.dropdownMenuItem}
            onClick={() => {
              setIsOpen(false);
              onAssignReviewer?.(productId);
            }}
          >
            <UserPlus size={14} /> Assign Reviewer
          </button>
          <button
            type="button"
            className={styles.dropdownMenuItem}
            onClick={() => {
              setIsOpen(false);
              onRequestInfo?.(productId);
            }}
          >
            <HelpCircle size={14} /> Request Information
          </button>
          <div className={styles.dropdownDivider} />
          <button
            type="button"
            className={`${styles.dropdownMenuItem} ${styles.successItem}`}
            onClick={() => {
              setIsOpen(false);
              onApprove?.(productId);
            }}
          >
            <CheckCircle2 size={14} /> Approve Product
          </button>
          <button
            type="button"
            className={`${styles.dropdownMenuItem} ${styles.dangerItem}`}
            onClick={() => {
              setIsOpen(false);
              onReject?.(productId);
            }}
          >
            <XCircle size={14} /> Reject Product
          </button>
        </div>
      )}
    </div>
  );
}
