"use client";

import React from "react";
import styles from "../batch-detail.module.css";

interface StockSummaryCardProps {
  batchData: any;
}

export function StockSummaryCard({ batchData }: StockSummaryCardProps) {
  const available = Number(batchData.available || 2450);
  const reserved = Number(batchData.reserved || 200);
  const quarantined = Number(batchData.quarantined || 0);
  const damaged = Number(batchData.damaged || 0);
  const recalled = Number(batchData.recalled || 0);
  const inTransit = Number(batchData.inTransit || 450);
  const totalPhysical = Number(batchData.totalPhysical || 3100);

  return (
    <div className={styles.dataCard}>
      <h3 className={styles.cardSectionTitle}>Stock Summary</h3>
      <div className={styles.dataListStack}>
        <div className={styles.dataStripRow}>
          <span className={styles.dataLabel}>Available</span>
          <span className={styles.dataValBold}>{available.toLocaleString()}</span>
        </div>

        <div className={styles.dataStripRow}>
          <span className={styles.dataLabel}>Reserved</span>
          <span className={styles.dataVal}>{reserved.toLocaleString()}</span>
        </div>

        <div className={styles.dataStripRow}>
          <span className={styles.dataLabel}>Quarantined</span>
          <span className={styles.dataVal}>{quarantined}</span>
        </div>

        <div className={styles.dataStripRow}>
          <span className={styles.dataLabel}>Damaged</span>
          <span className={styles.dataVal}>{damaged}</span>
        </div>

        <div className={styles.dataStripRow}>
          <span className={styles.dataLabel}>Recalled</span>
          <span className={styles.dataVal}>{recalled}</span>
        </div>

        <div className={styles.dataStripRow}>
          <span className={styles.dataLabel}>In Transit</span>
          <span className={styles.dataVal}>{inTransit.toLocaleString()}</span>
        </div>

        {/* Available to Sell - Light green highlighted strip */}
        <div className={`${styles.dataStripRow} ${styles.stripGreenHighlight}`}>
          <span className={styles.labelGreenBold}>Available to Sell</span>
          <span className={styles.valGreenBold}>{available.toLocaleString()}</span>
        </div>

        {/* Total Physical */}
        <div className={styles.dataStripRow}>
          <span className={styles.labelDarkBold}>Total Physical</span>
          <span className={styles.valDarkBold}>{totalPhysical.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
