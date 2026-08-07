"use client";

import React from "react";
import { Search } from "lucide-react";
import styles from "../product-approvals.module.css";

export type QuickViewKey =
  | "assigned_to_me"
  | "new_submissions"
  | "high_risk"
  | "info_requested"
  | "globally_pending"
  | "ready_for_approval";

interface ProductApprovalFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  reviewerFilter: string;
  onReviewerChange: (reviewer: string) => void;
  riskFilter: string;
  onRiskChange: (risk: string) => void;
  activeQuickView: QuickViewKey;
  onQuickViewChange: (view: QuickViewKey) => void;
}

export function ProductApprovalFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  reviewerFilter,
  onReviewerChange,
  riskFilter,
  onRiskChange,
  activeQuickView,
  onQuickViewChange,
}: ProductApprovalFiltersProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterControls}>
        <div className={styles.searchBox}>
          <Search size={16} color="#68707d" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search product name, SKU, brand, supplier, or product ID..."
            aria-label="Search products"
          />
        </div>

        <select
          className={styles.dropdown}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by Status"
        >
          <option value="all">Status: All Submissions</option>
          <option value="Under Review">Under Review</option>
          <option value="Compliance Review">Compliance Review</option>
          <option value="Info Requested">Info Requested</option>
          <option value="Ready for Final Approval">Ready for Final Approval</option>
          <option value="New Submission">New Submission</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          className={styles.dropdown}
          value={reviewerFilter}
          onChange={(e) => onReviewerChange(e.target.value)}
          aria-label="Filter by Reviewer"
        >
          <option value="all">Under: All Reviewers</option>
          <option value="me">Assigned to Me (Elena Vance)</option>
          <option value="Elena Vance">Elena Vance</option>
          <option value="Marcus Chen">Marcus Chen</option>
          <option value="unassigned">Unassigned</option>
        </select>

        <select
          className={styles.dropdown}
          value={riskFilter}
          onChange={(e) => onRiskChange(e.target.value)}
          aria-label="Filter by Risk Level"
        >
          <option value="all">Risk Level: All Levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className={styles.quickViews}>
        <span className={styles.quickViewsLabel}>Quick Views:</span>
        <button
          type="button"
          className={`${styles.pill} ${
            activeQuickView === "assigned_to_me" ? styles.activeDarkRed : ""
          }`}
          onClick={() => onQuickViewChange("assigned_to_me")}
        >
          Assigned to Me
        </button>
        <button
          type="button"
          className={`${styles.pill} ${
            activeQuickView === "new_submissions" ? styles.activeDarkRed : ""
          }`}
          onClick={() => onQuickViewChange("new_submissions")}
        >
          New Submissions
        </button>
        <button
          type="button"
          className={`${styles.pill} ${styles.riskRed} ${
            activeQuickView === "high_risk" ? styles.riskRedActive : ""
          }`}
          onClick={() => onQuickViewChange("high_risk")}
        >
          High Risk
        </button>
        <button
          type="button"
          className={`${styles.pill} ${
            activeQuickView === "info_requested" ? styles.activeDarkRed : ""
          }`}
          onClick={() => onQuickViewChange("info_requested")}
        >
          Information Requested
        </button>
        <button
          type="button"
          className={`${styles.pill} ${
            activeQuickView === "globally_pending" ? styles.activeDarkRed : ""
          }`}
          onClick={() => onQuickViewChange("globally_pending")}
        >
          Globally Pending
        </button>
        <button
          type="button"
          className={`${styles.pill} ${
            activeQuickView === "ready_for_approval" ? styles.activeDarkRed : ""
          }`}
          onClick={() => onQuickViewChange("ready_for_approval")}
        >
          Ready for Final Approval
        </button>
      </div>
    </div>
  );
}
