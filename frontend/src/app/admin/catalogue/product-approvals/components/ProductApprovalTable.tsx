"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../product-approvals.module.css";
import { ProductRowActionsMenu } from "./ProductRowActionsMenu";

export interface ProductApprovalItem {
  id: string;
  name: string;
  sku: string;
  type: string;
  version: string;
  productId: string;
  brand: string;
  supplier: string;
  category: string;
  variantsCount: number;
  sellingPrice: string;
  authorizationStatus: "Valid" | "Pending" | "Invalid";
  authorizationId: string;
  contentCompleteness: number;
  complianceStatus: string;
  complianceVariant: "green" | "amber" | "red";
  duplicateRisk: "Low" | "Medium" | "High";
  riskLevel: "Low" | "Medium" | "High";
  submittedDate: string;
  assignedReviewer: string;
  reviewStatus: string;
  reviewStatusVariant: "blue" | "green" | "amber" | "neutral" | "red";
  imageUrl?: string;
  isAssignedToMe?: boolean;
}

interface ProductApprovalTableProps {
  products: ProductApprovalItem[];
  filterAuthId?: string;
  onApproveProduct?: (id: string) => void;
  onRejectProduct?: (id: string) => void;
  onAssignReviewer?: (id: string) => void;
  onRequestInfo?: (id: string) => void;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&q=80";

export function ProductApprovalTable({
  products,
  filterAuthId = "AUTH-2023-0892",
  onApproveProduct,
  onRejectProduct,
  onAssignReviewer,
  onRequestInfo,
}: ProductApprovalTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedProducts.map((p) => p.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableScrollWrapper}>
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th style={{ width: 36, textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={
                    paginatedProducts.length > 0 &&
                    selectedIds.size === paginatedProducts.length
                  }
                  onChange={toggleSelectAll}
                  aria-label="Select all products"
                />
              </th>
              <th>Product &amp; Identity</th>
              <th>Product ID</th>
              <th>Brand &amp; Supplier</th>
              <th>Category</th>
              <th style={{ textAlign: "center" }}>Variants</th>
              <th>Selling Price</th>
              <th>Brand Authorization</th>
              <th style={{ textAlign: "center" }}>Content Completeness</th>
              <th>Compliance Status</th>
              <th>Duplicate Risk</th>
              <th>Risk Level</th>
              <th>Submitted Date</th>
              <th>Assigned Reviewer</th>
              <th>Review Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={16} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <p className={styles.emptyTitle}>No matching products found</p>
                    <p className={styles.emptySub}>
                      Try adjusting your search terms or filter criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedProducts.map((item) => {
                const isSelected = selectedIds.has(item.id);

                return (
                  <tr
                    key={item.id}
                    className={isSelected ? styles.selectedRow : undefined}
                  >
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(item.id)}
                        aria-label={`Select ${item.name}`}
                      />
                    </td>
                    <td>
                      <div className={styles.productCell}>
                        <img
                          src={item.imageUrl || DEFAULT_IMAGE}
                          alt={item.name}
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4 className={styles.productName}>{item.name}</h4>
                          <div className={styles.productMeta}>
                            SKU: {item.sku}
                            <br />
                            Type: {item.type}
                            <br />
                            Version: {item.version}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.productIdText}>{item.productId}</div>
                    </td>
                    <td>
                      <div className={styles.brandName}>{item.brand}</div>
                      <div className={styles.supplierName}>{item.supplier}</div>
                    </td>
                    <td>
                      <div className={styles.categoryText}>{item.category}</div>
                    </td>
                    <td style={{ textAlign: "center", fontWeight: 700 }}>
                      {item.variantsCount}
                    </td>
                    <td style={{ fontWeight: 650 }}>{item.sellingPrice}</td>
                    <td>
                      <div
                        className={`${styles.badge} ${
                          item.authorizationStatus === "Valid"
                            ? styles.valid
                            : item.authorizationStatus === "Pending"
                            ? styles.pending
                            : styles.danger
                        }`}
                        style={{ marginBottom: 4 }}
                      >
                        {item.authorizationStatus}
                      </div>
                      <div className={styles.authIdText}>
                        {item.authorizationId}
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className={styles.completenessVal}>
                        {item.contentCompleteness}%
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${item.contentCompleteness}%` }}
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        className={`${styles.badge} ${
                          item.complianceVariant === "green"
                            ? styles.valid
                            : item.complianceVariant === "red"
                            ? styles.danger
                            : styles.pending
                        }`}
                      >
                        {item.complianceStatus}
                      </div>
                    </td>
                    <td style={{ fontWeight: 650 }}>{item.duplicateRisk}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          item.riskLevel === "High"
                            ? styles.danger
                            : item.riskLevel === "Medium"
                            ? styles.medium
                            : styles.valid
                        }`}
                      >
                        {item.riskLevel}
                      </span>
                    </td>
                    <td style={{ fontWeight: 650, whiteSpace: "nowrap" }}>
                      {item.submittedDate}
                    </td>
                    <td style={{ fontWeight: 650, whiteSpace: "nowrap" }}>
                      {item.assignedReviewer}
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          item.reviewStatusVariant === "green"
                            ? styles.valid
                            : item.reviewStatusVariant === "amber"
                            ? styles.pending
                            : item.reviewStatusVariant === "red"
                            ? styles.danger
                            : styles.blue
                        }`}
                      >
                        {item.reviewStatus}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <Link
                          href={`/admin/catalogue/product-approvals/${item.id}`}
                        >
                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnDarkRed}`}
                            style={{ padding: "6px 12px", fontSize: 12 }}
                          >
                            Open Review
                          </button>
                        </Link>
                        <ProductRowActionsMenu
                          productId={item.id}
                          onApprove={onApproveProduct}
                          onReject={onRejectProduct}
                          onAssignReviewer={onAssignReviewer}
                          onRequestInfo={onRequestInfo}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <div>
          Showing {paginatedProducts.length} product
          {paginatedProducts.length !== 1 ? "s" : ""} submitted under{" "}
          <strong className={styles.authHighlight}>{filterAuthId}</strong>
        </div>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`${styles.pageBtn} ${
                pageNum === currentPage ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
