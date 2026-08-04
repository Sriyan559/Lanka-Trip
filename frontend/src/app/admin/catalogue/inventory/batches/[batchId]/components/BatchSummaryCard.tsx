"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  MoreVertical,
  ExternalLink,
  Eye,
  History,
  AlertTriangle,
  Printer,
  Copy,
} from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../batch-detail.module.css";

interface BatchSummaryCardProps {
  batchData: any;
  onRecordAdjustment: () => void;
  onTransferStock: () => void;
  onQuarantineBatch: () => void;
  onInitiateRecall: () => void;
  onMarkDamaged: () => void;
  onNotifySupplier: () => void;
  onExportRecord: () => void;
  onSuspendMarketplace: () => void;
}

export function BatchSummaryCard({
  batchData,
  onRecordAdjustment,
  onTransferStock,
  onQuarantineBatch,
  onInitiateRecall,
  onMarkDamaged,
  onNotifySupplier,
  onExportRecord,
  onSuspendMarketplace,
}: BatchSummaryCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  const handleCopyRef = () => {
    navigator.clipboard.writeText(batchData.batchId);
    alert(`Copied batch reference ${batchData.batchId} to clipboard!`);
    setMenuOpen(false);
  };

  return (
    <div className={styles.summaryCard}>
      {/* Top Main Section */}
      <div className={styles.summaryHeaderTop}>
        <img
          src={
            batchData.imageUrl ||
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80"
          }
          alt={batchData.productName}
          className={styles.productThumbnail}
        />
        <div className={styles.summaryInfoArea}>
          <div className={styles.titleAndTagsRow}>
            <div className={styles.productTitleGroup}>
              <h1 className={styles.productNameTitle}>{batchData.productName}</h1>
              <span className={styles.badgeActive}>{batchData.status}</span>
            </div>

            <div className={styles.locationRiskTagsGroup}>
              <div className={styles.tagLocation}>
                <MapPin size={13} /> {batchData.locationName}
              </div>
              <div className={styles.tagRisk}>
                <ShieldCheck size={13} color="#059669" /> {batchData.risk}
              </div>
            </div>
          </div>

          <div className={styles.identityMetaGrid}>
            <div>
              <span className={styles.metaLabel}>ID:</span>{" "}
              <span className={styles.metaVal}>{batchData.productId}</span>
            </div>
            <div>
              <span className={styles.metaLabel}>SKU:</span>{" "}
              <span className={styles.metaVal}>{batchData.productSku}</span>
            </div>
            <div>
              <span className={styles.metaLabel}>Batch:</span>{" "}
              <span className={styles.metaValBold}>{batchData.batchId}</span>
            </div>
          </div>

          <div className={styles.summaryDatesGrid}>
            <div className={styles.dateBlock}>
              <div className={styles.dateLabel}>MFG DATE</div>
              <div className={styles.dateVal}>{batchData.mfgDate}</div>
            </div>
            <div className={styles.dateBlock}>
              <div className={styles.dateLabel}>EXPIRY DATE</div>
              <div className={styles.dateVal}>{batchData.expiryDate}</div>
            </div>
            <div className={styles.dateBlock}>
              <div className={styles.dateLabel}>SHELF LIFE</div>
              <div className={styles.dateVal}>{batchData.shelfLife}</div>
            </div>
            <div className={styles.dateBlock}>
              <div className={styles.dateLabel}>RECALL STATUS</div>
              <div className={`${styles.dateVal} ${styles.greenText}`}>
                {batchData.recallStatus}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className={styles.actionToolbarRow}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnBurgundy}`}
          onClick={onRecordAdjustment}
        >
          Record Stock Adjustment
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onTransferStock}
        >
          Transfer Stock
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onQuarantineBatch}
        >
          Quarantine Batch
        </button>

        <button
          type="button"
          className={`${styles.btnSecondary} ${styles.btnRedOutline}`}
          onClick={onInitiateRecall}
        >
          Initiate Recall
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onMarkDamaged}
        >
          Mark Damaged
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onNotifySupplier}
        >
          Notify Supplier
        </button>

        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onExportRecord}
        >
          Export Batch Record
        </button>

        {/* 3-Dot More Actions Menu */}
        <div className={styles.menuWrapper} ref={menuRef}>
          <button
            type="button"
            className={styles.iconMenuBtn}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="More Actions"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <Link
                href={`/admin/catalogue/product-approvals/${batchData.productId}`}
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <ExternalLink size={14} /> View Product Approval Detail
              </Link>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setMenuOpen(false);
                  alert("Navigating to Supplier Case...");
                }}
              >
                <Eye size={14} /> View Supplier Case
              </button>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setMenuOpen(false);
                  alert("Viewing Inventory Movements for batch...");
                }}
              >
                <History size={14} /> View Inventory Movements
              </button>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setMenuOpen(false);
                  alert("Viewing Audit History...");
                }}
              >
                <History size={14} /> View Audit History
              </button>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setMenuOpen(false);
                  onSuspendMarketplace();
                }}
              >
                <AlertTriangle size={14} /> Suspend Marketplace Availability
              </button>
              <div className={styles.menuDivider} />
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setMenuOpen(false);
                  window.print();
                }}
              >
                <Printer size={14} /> Print Batch Summary
              </button>
              <button
                type="button"
                className={styles.menuItem}
                onClick={handleCopyRef}
              >
                <Copy size={14} /> Copy Batch Reference
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
