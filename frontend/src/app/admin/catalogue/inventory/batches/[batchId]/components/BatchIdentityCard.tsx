"use client";

import React from "react";
import Link from "next/link";
import styles from "../batch-detail.module.css";

interface BatchIdentityCardProps {
  batchData: any;
}

export function BatchIdentityCard({ batchData }: BatchIdentityCardProps) {
  return (
    <div className={styles.dataCard}>
      <h3 className={styles.cardSectionTitle}>Batch Identity</h3>
      <div className={styles.dataListStack}>
        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Product SKU</span>
          <span className={styles.dataVal}>{batchData.productSku}</span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Public Product Ref</span>
          <span className={styles.dataVal}>
            <Link
              href={`/admin/catalogue/approvals/${batchData.productId}`}
              className={styles.linkText}
            >
              {batchData.productRef}
            </Link>
          </span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Database Product ID</span>
          <span className={styles.dataVal}>{batchData.productId}</span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Brand</span>
          <span className={styles.dataValBold}>{batchData.brand}</span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Supplier</span>
          <span className={styles.dataVal}>
            <Link href="/admin/brands-suppliers" className={styles.linkText}>
              {batchData.supplier}
            </Link>
          </span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Batch Number</span>
          <span className={styles.dataValBold}>{batchData.batchId}</span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Database Batch ID</span>
          <span className={styles.dataVal}>98</span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Compliance Cert</span>
          <span className={`${styles.dataVal} ${styles.greenCertText}`}>
            {batchData.complianceCert}
          </span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Country of Origin</span>
          <span className={styles.dataVal}>{batchData.country}</span>
        </div>
        <div className={styles.rowDivider} />

        <div className={styles.dataRow}>
          <span className={styles.dataLabel}>Classification</span>
          <span className={styles.dataVal}>{batchData.classification}</span>
        </div>
      </div>
    </div>
  );
}
