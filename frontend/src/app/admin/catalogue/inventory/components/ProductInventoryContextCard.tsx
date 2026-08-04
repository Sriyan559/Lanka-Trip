"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import styles from "../inventory.module.css";

interface ProductInventoryContextCardProps {
  productRef?: string;
  dbId?: string;
  productName?: string;
  brand?: string;
  supplier?: string;
  productId?: string;

  onClearFilter?: () => void;
}

export function ProductInventoryContextCard({
  productRef = "PROD-2024-00421",
  dbId = "421",
  productName = "Radiance Vitamin C Serum",
  brand = "Estée Lauder",
  supplier = "Luxe Distribution Pvt Ltd",
  productId,
  onClearFilter,
}: ProductInventoryContextCardProps) {
  return (
    <div className={styles.contextPanelCard}>
      <div className={styles.contextPanelLeft}>
        <div className={styles.contextCardTitle}>Product Inventory Context</div>
        <div className={styles.contextMetaRow}>
          <div className={styles.contextMetaBlock}>
            <span className={styles.contextMetaLabel}>Product Reference</span>
            <span className={styles.contextMetaVal}>{productRef}</span>
          </div>

          <div className={styles.contextMetaBlock}>
            <span className={styles.contextMetaLabel}>Database Product ID</span>
            <span className={styles.contextMetaVal}>{dbId}</span>
          </div>

          <div className={styles.contextMetaBlock}>
            <span className={styles.contextMetaLabel}>Product</span>
            <span className={styles.contextMetaValBold}>{productName}</span>
          </div>

          <div className={styles.contextMetaBlock}>
            <span className={styles.contextMetaLabel}>Brand</span>
            <span className={styles.contextMetaVal}>{brand}</span>
          </div>

          <div className={styles.contextMetaBlock}>
            <span className={styles.contextMetaLabel}>Supplier</span>
            <span className={styles.contextMetaVal}>{supplier}</span>
          </div>
        </div>
      </div>

      <div className={styles.contextPanelRight}>
        {productId && (
          <Link
            href={`/admin/catalogue/product-approvals/${productId}`}
            className={styles.contextRedLink}
          >
            <ExternalLink size={14} /> View Product Approval Detail
          </Link>
        )}
        <button
          type="button"
          className={styles.contextRedLinkBtn}
          onClick={onClearFilter}
        >
          <X size={14} /> Clear Product Filter
        </button>
      </div>
    </div>
  );
}
