"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../product-approval-detail.module.css";

interface ProductDetailHeaderProps {
  productRef: string;
}

export function ProductDetailHeader({ productRef }: ProductDetailHeaderProps) {
  return (
    <div className={styles.headerTop}>
      <Link href="/admin/catalogue/product-approvals" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Product Approval Queue
      </Link>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <span>CATALOGUE</span> &gt; <span>PRODUCT APPROVAL QUEUE</span> &gt;{" "}
        <span className={styles.breadcrumbActive}>{productRef}</span>
      </nav>
    </div>
  );
}
