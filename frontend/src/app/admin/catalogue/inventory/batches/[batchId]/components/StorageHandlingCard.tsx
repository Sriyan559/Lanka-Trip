"use client";

import React from "react";
import { Package, Info } from "lucide-react";
import styles from "../batch-detail.module.css";

interface StorageHandlingCardProps {
  batchData: any;
}

export function StorageHandlingCard({ batchData }: StorageHandlingCardProps) {
  return (
    <div className={styles.dataCard}>
      <h3 className={styles.cardHeaderTitleWithIcon}>
        <div className={styles.iconBoxSquare}>
          <Package size={16} color="#ffffff" />
        </div>
        Storage &amp; Handling
      </h3>

      <div className={styles.storage2ColGrid}>
        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>LOCATION CODE</div>
          <div className={styles.storageValBold}>CMB-MAIN</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>LOCATION TYPE</div>
          <div className={styles.storageValBold}>Main Hub</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>BIN / SHELF</div>
          <div className={styles.storageValBold}>A-16-08</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>REQUIRED TEMP</div>
          <div className={styles.storageValBold}>18°C - 28°C</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>HUMIDITY</div>
          <div className={styles.storageValBold}>Below 60%</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>FRAGILE</div>
          <div className={styles.storageValBold}>Yes</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>LIGHT SENSITIVE</div>
          <div className={styles.storageValBold}>Yes</div>
        </div>

        <div className={styles.storageBlock}>
          <div className={styles.storageLabel}>COMPLIANCE</div>
          <div className={`${styles.storageValBold} ${styles.greenCertText}`}>
            Verified
          </div>
        </div>
      </div>

      <div className={styles.handlingNoticeBar}>
        <Info size={15} color="#68707d" />
        <span>
          Handling <strong>Keep upright</strong>
        </span>
      </div>
    </div>
  );
}
