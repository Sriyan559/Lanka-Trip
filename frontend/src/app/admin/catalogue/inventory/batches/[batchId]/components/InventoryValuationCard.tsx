"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import styles from "../batch-detail.module.css";

interface InventoryValuationCardProps {
  batchData: any;
}

export function InventoryValuationCard({ batchData }: InventoryValuationCardProps) {
  return (
    <div className={styles.dataCard}>
      <h3 className={styles.cardHeaderTitleWithIcon}>
        <div className={styles.iconBoxSquare}>
          <TrendingUp size={16} color="#ffffff" />
        </div>
        Inventory Valuation
      </h3>

      <div className={styles.dataListStack}>
        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Average Unit Cost (LKR)</span>
          <span className={styles.dataVal}>LKR {batchData.avgUnitCost}</span>
        </div>
        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Available Stock Value</span>
          <span className={styles.dataVal}>LKR {batchData.availableValue}</span>
        </div>
        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Reserved Stock Value</span>
          <span className={styles.dataVal}>LKR {batchData.reservedValue}</span>
        </div>
        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Quarantined Stock Value</span>
          <span className={styles.dataVal}>LKR {batchData.quarantinedValue}</span>
        </div>
        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>In-Transit Stock Value</span>
          <span className={styles.dataVal}>LKR {batchData.inTransitValue}</span>
        </div>
      </div>

      {/* Dark Burgundy Total Box */}
      <div className={styles.darkBurgundyTotalBox}>
        <div className={styles.darkBoxLabel}>TOTAL BATCH VALUE - CALCULATED</div>
        <div className={styles.darkBoxValue}>LKR {batchData.totalValue}</div>
      </div>
    </div>
  );
}
