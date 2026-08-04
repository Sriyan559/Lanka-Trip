"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../product-approvals.module.css";

interface ProductApprovalHeaderProps {
  onReviewNext?: () => void;
  onBulkAssign?: () => void;
  onViewHistory?: () => void;
  onImportReview?: () => void;
}

export function ProductApprovalHeader({
  onReviewNext,
  onBulkAssign,
  onViewHistory,
  onImportReview,
}: ProductApprovalHeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <Link href="/admin/verification/brand-authorizations" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Brand Authorization Case
      </Link>

      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Product Approval Queue</h1>
          <p className={styles.pageDescription}>
            Review submitted products for catalogue accuracy, brand authorization, legal/regulatory, attribute completeness, ingredient and safety compliance, content readiness and distributor/supplier validation before publishing to marketplace.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onReviewNext}
          >
            Review Next Product
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={onBulkAssign}
          >
            Bulk Assign
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={onViewHistory}
          >
            View Approval History
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={onImportReview}
          >
            Product Import Review
          </button>
        </div>
      </div>
    </div>
  );
}
