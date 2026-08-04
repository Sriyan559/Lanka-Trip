"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../batch-detail.module.css";

interface BatchDetailHeaderProps {
  batchId: string;
}

export function BatchDetailHeader({ batchId }: BatchDetailHeaderProps) {
  return (
    <div className={styles.headerTopNav}>
      <Link href="/admin/catalogue/inventory" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Inventory &amp; Expiry Operations
      </Link>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/admin/catalogue" className={styles.bcLink}>
          Catalogue
        </Link>{" "}
        &gt;{" "}
        <Link href="/admin/catalogue/inventory" className={styles.bcLink}>
          Inventory &amp; Expiry Operations
        </Link>{" "}
        &gt; <span className={styles.bcActive}>{batchId}</span>
      </nav>
    </div>
  );
}
