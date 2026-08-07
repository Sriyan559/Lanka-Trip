"use client";

import React from "react";
import Link from "next/link";
import styles from "../product-approval-detail.module.css";

interface ProductIdentityCardProps {
  productRef: string;
  sku: string;
  brand: string;
  supplier: string;
  createdAt: string;
  dbId: string;
  barcode: string;
  manufacturer: string;
  status: string;
  updatedAt: string;
  category: string;
  type: string;
  subcategory: string;
  countryOfOrigin: string;
}

export function ProductIdentityCard({
  productRef,
  sku,
  brand,
  supplier,
  createdAt,
  dbId,
  barcode,
  manufacturer,
  status,
  updatedAt,
  category,
  type,
  subcategory,
  countryOfOrigin,
}: ProductIdentityCardProps) {
  return (
    <div className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>Product Identity</h2>
      <div className={styles.identityGrid5Col}>
        {/* Row 1 */}
        <div className={styles.idField}>
          <div className={styles.idLabel}>Product Reference</div>
          <div className={styles.idValue}>{productRef}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>SKU</div>
          <div className={styles.idValue}>{sku}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Brand</div>
          <div className={styles.idValue}>{brand}</div>
          <Link
            href="/admin/verification/brand-authorizations"
            className={styles.subMetaLink}
          >
            View Brand
          </Link>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Supplier</div>
          <div className={styles.idValue}>{supplier}</div>
          <Link
            href="/admin/verification/suppliers"
            className={styles.subMetaLink}
          >
            View Supplier Case
          </Link>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Created At</div>
          <div className={styles.idValue}>{createdAt}</div>
        </div>

        {/* Row 2 */}
        <div className={styles.idField}>
          <div className={styles.idLabel}>Database Product ID</div>
          <div className={styles.idValue}>{dbId}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Barcode (GTIN)</div>
          <div className={styles.idValue}>{barcode}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Manufacturer</div>
          <div className={styles.idValue}>{manufacturer}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Status</div>
          <div className={styles.badgeWrapper}>
            <span className={`${styles.badge} ${styles.green}`}>{status}</span>
          </div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Updated At</div>
          <div className={styles.idValue}>{updatedAt}</div>
        </div>

        {/* Row 3 */}
        <div className={styles.idField}>
          <div className={styles.idLabel}>Category</div>
          <div className={styles.idValue}>{category}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Type</div>
          <div className={styles.idValue}>{type}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Subcategory</div>
          <div className={styles.idValue}>{subcategory}</div>
        </div>

        <div className={styles.idField}>
          <div className={styles.idLabel}>Country of Origin</div>
          <div className={styles.idValue}>{countryOfOrigin}</div>
        </div>

        <div className={styles.idField} />
      </div>
    </div>
  );
}
