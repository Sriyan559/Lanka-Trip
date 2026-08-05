"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import styles from "./returns-queue.module.css";

export const RETURNS_PAGE_SIZES = [10, 25, 50, 100] as const;

export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  const lastPage = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, currentPage), lastPage);

  if (lastPage <= 7) {
    return Array.from({ length: lastPage }, (_, index) => index + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", lastPage];
  }

  if (current >= lastPage - 3) {
    return [1, "ellipsis-start", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
  }

  return [1, "ellipsis-start", current - 2, current - 1, current, current + 1, current + 2, "ellipsis-end", lastPage];
}

interface ReturnsPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ReturnsPagination({
  page,
  pageSize,
  total,
  totalPages,
  loading = false,
  onPageChange,
  onPageSizeChange,
}: ReturnsPaginationProps) {
  const lastPage = Math.max(1, totalPages);
  const currentPage = Math.min(Math.max(1, page), lastPage);
  const startRecord = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = total === 0 ? 0 : Math.min(currentPage * pageSize, total);
  const atFirstPage = currentPage === 1;
  const atLastPage = currentPage === lastPage;

  const navigate = (target: number) => {
    if (loading) return;
    const nextPage = Math.min(Math.max(1, target), lastPage);
    if (nextPage !== currentPage) onPageChange(nextPage);
  };

  return (
    <div className={styles.tableFooter} aria-busy={loading}>
      <div aria-live="polite">
        Showing <strong>{startRecord}</strong>–<strong>{endRecord}</strong> of <strong>{total}</strong> cases
      </div>

      <nav className={styles.paginationControls} aria-label="Returns pagination">
        <label className={styles.pageSizeLabel} htmlFor="returns-page-size">
          Rows per page:
          <select
            id="returns-page-size"
            value={pageSize}
            disabled={loading}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className={styles.pageSizeSelect}
          >
            {RETURNS_PAGE_SIZES.map((size) => <option value={size} key={size}>{size}</option>)}
          </select>
        </label>

        <button type="button" className={styles.pageBtn} disabled={atFirstPage || loading} aria-disabled={atFirstPage || loading} aria-label="Go to first page" onClick={() => navigate(1)}>
          <ChevronsLeft size={16} aria-hidden="true" />
        </button>
        <button type="button" className={styles.pageBtn} disabled={atFirstPage || loading} aria-disabled={atFirstPage || loading} aria-label="Go to previous page" onClick={() => navigate(currentPage - 1)}>
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        <div className={styles.pageNumberStrip} aria-label="Page numbers">
          {getPaginationItems(currentPage, lastPage).map((item) =>
            typeof item === "number" ? (
              <button
                type="button"
                key={item}
                className={`${styles.pageBtn} ${item === currentPage ? styles.pageBtnActive : ""}`}
                aria-label={`Go to page ${item}`}
                aria-current={item === currentPage ? "page" : undefined}
                disabled={loading}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ) : (
              <span className={styles.paginationEllipsis} aria-hidden="true" key={item}>…</span>
            )
          )}
        </div>

        <button type="button" className={styles.pageBtn} disabled={atLastPage || loading} aria-disabled={atLastPage || loading} aria-label="Go to next page" onClick={() => navigate(currentPage + 1)}>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
        <button type="button" className={styles.pageBtn} disabled={atLastPage || loading} aria-disabled={atLastPage || loading} aria-label="Go to last page" onClick={() => navigate(lastPage)}>
          <ChevronsRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
