"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MoreVertical,
  AlertTriangle,
  Info,
  UserPlus,
  Save,
  Eye,
  Copy,
  PauseCircle,
  Building2,
  FileCheck,
  History,
  Tag,
  Calendar,
  UserCheck,
  Clock,
  Database,
  Hash,
} from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../product-approval-detail.module.css";

interface ProductSummaryCardProps {
  productId: string;
  productRef: string;
  name: string;
  sku: string;
  brand: string;
  supplier: string;
  category: string;
  status: string;
  riskLevel: string;
  reviewAge: string;
  dbId: string;
  submittedDate: string;
  assignedReviewer: string;
  submissionVersion: string;
  imageUrl?: string;

  onRequestInfo: () => void;
  onReject: () => void;
  onApprove: () => void;
  onAssignReviewer: () => void;
  onSuspend: () => void;
  onPreviewMarketplace: () => void;
}

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80";

export function ProductSummaryCard({
  productId,
  productRef,
  name,
  sku,
  brand,
  supplier,
  category,
  status,
  riskLevel,
  reviewAge,
  dbId,
  submittedDate,
  assignedReviewer,
  submissionVersion,
  imageUrl,

  onRequestInfo,
  onReject,
  onApprove,
  onAssignReviewer,
  onSuspend,
  onPreviewMarketplace,
}: ProductSummaryCardProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMoreOpen(false));

  return (
    <div className={styles.summaryCard}>
      {/* Top Header Row */}
      <div className={styles.summaryHeaderTop}>
        <div className={styles.productMetaHeader}>
          <img
            src={imageUrl || DEFAULT_IMG}
            alt={name}
            className={styles.productImageLg}
          />
          <div className={styles.productMetaDetails}>
            <div className={styles.titleArea}>
              <h1 className={styles.productTitle}>{name}</h1>
              <span className={`${styles.badge} ${styles.pink}`}>{status}</span>
            </div>

            <div className={styles.metaGrid}>
              <div>
                <span className={styles.metaLabel}>SKU: </span>
                <span className={styles.metaValue}>{sku}</span>
              </div>
              <div>
                <span className={styles.metaLabel}>Brand: </span>
                <span className={styles.metaValue}>{brand}</span>
              </div>
              <div>
                <span className={styles.metaLabel}>Supplier: </span>
                <span className={styles.metaValue}>{supplier}</span>
              </div>
              <div>
                <Link
                  href="/admin/verification/suppliers"
                  className={styles.metaLink}
                >
                  View Supplier Case
                </Link>
              </div>
              <div className={styles.categoryMetaRow}>
                <span className={styles.metaLabel}>Category &gt; </span>
                <span className={styles.categoryLink}>{category}</span>
              </div>
            </div>

            <div className={styles.tagsRow}>
              <div className={styles.tagItem}>
                <AlertTriangle size={14} color="#d97706" /> {riskLevel} Risk
              </div>
              <div className={styles.tagItem}>
                <Info size={14} color="#68707d" /> Review Age: {reviewAge}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btn}
            onClick={onRequestInfo}
          >
            Request Additional Information
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnDanger}`}
            onClick={onReject}
          >
            Reject Product
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onApprove}
          >
            Approve Product
          </button>

          {/* More Actions 3-dot Dropdown */}
          <div className={styles.moreActionsWrapper} ref={menuRef}>
            <button
              type="button"
              className={styles.squareIconBtn}
              onClick={() => setMoreOpen((p) => !p)}
              aria-label="More Actions"
              aria-expanded={moreOpen}
            >
              <MoreVertical size={16} />
            </button>

            {moreOpen && (
              <div className={styles.moreDropdownMenu}>
                <button
                  type="button"
                  className={styles.moreMenuItem}
                  onClick={() => {
                    setMoreOpen(false);
                    onAssignReviewer();
                  }}
                >
                  <UserPlus size={14} /> Assign Reviewer
                </button>
                <button
                  type="button"
                  className={styles.moreMenuItem}
                  onClick={() => {
                    setMoreOpen(false);
                    alert("Review progress saved.");
                  }}
                >
                  <Save size={14} /> Save Review
                </button>
                <button
                  type="button"
                  className={styles.moreMenuItem}
                  onClick={() => {
                    setMoreOpen(false);
                    onPreviewMarketplace();
                  }}
                >
                  <Eye size={14} /> Preview Marketplace Listing
                </button>
                <button
                  type="button"
                  className={styles.moreMenuItem}
                  onClick={() => {
                    setMoreOpen(false);
                    alert("Comparing potential duplicate products...");
                  }}
                >
                  <Copy size={14} /> Compare Duplicate
                </button>
                <button
                  type="button"
                  className={styles.moreMenuItem}
                  onClick={() => {
                    setMoreOpen(false);
                    onSuspend();
                  }}
                >
                  <PauseCircle size={14} /> Suspend Review
                </button>

                <div className={styles.moreDropdownDivider} />

                <Link
                  href="/admin/verification/suppliers"
                  className={styles.moreMenuItem}
                  onClick={() => setMoreOpen(false)}
                >
                  <Building2 size={14} /> View Supplier
                </Link>
                <Link
                  href="/admin/verification/brand-authorizations"
                  className={styles.moreMenuItem}
                  onClick={() => setMoreOpen(false)}
                >
                  <FileCheck size={14} /> View Brand Authorization
                </Link>
                <button
                  type="button"
                  className={styles.moreMenuItem}
                  onClick={() => {
                    setMoreOpen(false);
                    alert("Viewing audit history log...");
                  }}
                >
                  <History size={14} /> View Audit History
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Review Metadata Row */}
      <div className={styles.metadataRow}>
        <div className={styles.metaBlock}>
          <div className={styles.metaBlockLabel}>
            <Hash size={13} className={styles.metaIcon} /> Product Reference
          </div>
          <div className={styles.metaBlockVal}>{productRef}</div>
        </div>

        <div className={styles.metaBlock}>
          <div className={styles.metaBlockLabel}>
            <Database size={13} className={styles.metaIcon} /> Database Product ID
          </div>
          <div className={styles.metaBlockVal}>{dbId}</div>
        </div>

        <div className={styles.metaBlock}>
          <div className={styles.metaBlockLabel}>
            <Calendar size={13} className={styles.metaIcon} /> Submitted Date
          </div>
          <div className={styles.metaBlockVal}>{submittedDate}</div>
        </div>

        <div className={styles.metaBlock}>
          <div className={styles.metaBlockLabel}>
            <UserCheck size={13} className={styles.metaIcon} /> Assigned Reviewer
          </div>
          <div className={styles.metaBlockVal}>{assignedReviewer}</div>
        </div>

        <div className={styles.metaBlock}>
          <div className={styles.metaBlockLabel}>
            <Clock size={13} className={styles.metaIcon} /> Review Status
          </div>
          <div className={styles.metaBlockVal}>
            {status} {submissionVersion}
          </div>
        </div>
      </div>
    </div>
  );
}
