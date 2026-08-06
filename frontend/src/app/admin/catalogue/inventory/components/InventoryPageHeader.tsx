"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Activity,
  MapPin,
  Plus,
  FileText,
  AlertOctagon,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import styles from "../inventory.module.css";

interface InventoryPageHeaderProps {
  productId?: string;
  productRef?: string;
  dbId?: string;

  onCreateBatch: () => void;
  onRecordAdjustment: () => void;
  onStartRecall: () => void;
}

export function InventoryPageHeader({
  productId,
  productRef = "PROD-2024-00421",
  dbId = "421",
  onCreateBatch,
  onRecordAdjustment,
  onStartRecall,
}: InventoryPageHeaderProps) {
  return (
    <div className={styles.headerContainer}>
      {/* Top Back Link & Breadcrumb */}
      <div className={styles.headerTopNav}>
        {productId ? (
          <Link
            href={`/admin/catalogue/approvals/${productId}`}
            className={styles.backLink}
          >
            <ArrowLeft size={16} />
            Back to Product Approval Detail
          </Link>
        ) : (
          <Link href="/admin/catalogue" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Catalogue
          </Link>
        )}

        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <span>Catalogue</span> &gt;{" "}
          {productId ? (
            <>
              <Link href="/admin/catalogue/approvals" className={styles.breadcrumbLink}>
                Product Approval Queue
              </Link>{" "}
              &gt; <span className={styles.breadcrumbText}>{productRef}</span> &gt;{" "}
              <span className={styles.breadcrumbActive}>Inventory &amp; Batches</span>
            </>
          ) : (
            <span className={styles.breadcrumbActive}>Inventory Operations</span>
          )}
        </nav>
      </div>

      {/* Main Page Title Header & Top Action Row */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Inventory &amp; Expiry Operations</h1>
          <p className={styles.pageDescription}>
            Monitor product inventory, available and reserved stock, expiry exposure, quarantine status, recall readiness and inventory discrepancies across verified suppliers and approved products.
          </p>

          <div className={styles.headerRefMeta}>
            <div>
              <span className={styles.refMetaLabel}>Product Reference</span>
              <div className={styles.refMetaVal}>{productRef}</div>
            </div>
            <div>
              <span className={styles.refMetaLabel}>Database Product ID</span>
              <div className={styles.refMetaVal}>{dbId}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => alert("Exporting Expiry Report PDF/CSV...")}
          >
            <Download size={14} /> Export Expiry Report
          </button>

          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => alert("Viewing inventory movement logs...")}
          >
            <Activity size={14} /> View Inventory Movements
          </button>

          <div className={styles.dropdownBtnWrapper}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => alert("Opening inventory location manager...")}
            >
              <MapPin size={14} /> Manage Inventory Locations <ChevronDown size={14} />
            </button>
          </div>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnBurgundy}`}
            onClick={onCreateBatch}
          >
            <Plus size={14} /> Create Batch
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnDarkNeutral}`}
            onClick={onRecordAdjustment}
          >
            <FileText size={14} /> Record Stock Adjustments
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnRedSolid}`}
            onClick={onStartRecall}
          >
            <AlertOctagon size={14} /> Start Recall Review
          </button>
        </div>
      </div>
    </div>
  );
}
