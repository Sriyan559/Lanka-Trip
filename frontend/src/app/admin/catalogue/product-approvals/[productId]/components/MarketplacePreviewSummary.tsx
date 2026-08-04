"use client";

import React from "react";
import { Tag, FileText, CheckCircle2, Info, Camera, AlertOctagon } from "lucide-react";
import styles from "../product-approval-detail.module.css";

interface MarketplacePreviewSummaryProps {
  name: string;
  price: string;
  description: string;
  category: string;
  variantsCount: number;
  brand: string;
  imageUrl?: string;

  onPreviewMarketplace: () => void;
}

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80";

export function MarketplacePreviewSummary({
  name,
  price,
  description,
  category,
  variantsCount,
  brand,
  imageUrl,
  onPreviewMarketplace,
}: MarketplacePreviewSummaryProps) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>Marketplace Preview Summary</h2>
      <div className={styles.marketPreviewCard}>
        <div className={styles.previewTopRow}>
          <img
            src={imageUrl || DEFAULT_IMG}
            alt="Preview"
            className={styles.previewImage}
          />
          <div className={styles.previewInfo}>
            <div className={styles.previewHeader}>
              <h3 className={styles.previewTitle}>{name} - 30ml</h3>
              <div className={styles.previewPrice}>{price}</div>
            </div>
            <div className={styles.previewDesc}>{description}</div>
            <div className={styles.previewTags}>
              <span className={styles.previewTagItem}>
                <Tag size={14} color="#68707d" /> {category}
              </span>
              <span className={styles.previewTagItem}>
                <FileText size={14} color="#68707d" /> {variantsCount} Variants
              </span>
              <span className={styles.previewTagItem}>
                <CheckCircle2 size={14} color="#68707d" /> {brand}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.previewBottomBar}>
          <div className={styles.previewStatusesGrid}>
            <div className={styles.statusBlock}>
              <div className={styles.statusLabel}>
                <Info size={14} /> Marketplace Visibility
              </div>
              <div className={styles.statusVal}>Hidden – Pending Approval</div>
            </div>

            <div className={styles.statusBlock}>
              <div className={styles.statusLabel}>
                <FileText size={14} /> Available Variants
              </div>
              <div className={styles.statusVal}>{variantsCount}</div>
            </div>

            <div className={styles.statusBlock}>
              <div className={styles.statusLabel}>
                <Camera size={14} /> Primary Image Status
              </div>
              <div className={styles.statusVal}>Available</div>
            </div>

            <div className={styles.statusBlock}>
              <div className={styles.statusLabel}>
                <AlertOctagon size={14} /> Publication Eligibility
              </div>
              <div className={`${styles.statusVal} ${styles.redText}`}>
                Not Ready
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.btnGhost}
            onClick={onPreviewMarketplace}
          >
            Preview Marketplace Listing
          </button>
        </div>
      </div>
    </div>
  );
}
