"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { MoreVertical, ExternalLink, RefreshCw, Eye, AlertOctagon, History } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../inventory.module.css";
import type { InventoryRowData } from "@/types/inventoryOperations";

export type { InventoryRowData } from "@/types/inventoryOperations";

interface InventoryTableProps {
  rows: InventoryRowData[];
  totalRows: number;
  currentPage: number;
  onPageChange: (page: number) => void;

  onRecordAdjustment: (row: InventoryRowData) => void;
  onStartRecall: (row: InventoryRowData) => void;
  lastPage: number;
}

export function InventoryTable({
  rows,
  totalRows,
  currentPage,
  onPageChange,
  onRecordAdjustment,
  onStartRecall,
  lastPage,
}: InventoryTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className={styles.tableCardContainer}>
      <div className={styles.tableScrollWrapper}>
        <table className={styles.inventoryCustomTable}>
          <thead>
            <tr>
              <th>Product &amp; Variant</th>
              <th>
                Product ID
                <br />
                <span className={styles.thSubText}>(Public Reference)</span>
              </th>
              <th>
                Database
                <br />
                Product ID
              </th>
              <th>Brand</th>
              <th>Supplier</th>
              <th>SKU</th>
              <th>Batch Number</th>
              <th>Variant</th>
              <th>
                Inventory
                <br />
                Location
              </th>
              <th>
                Available
                <br />
                Stock
              </th>
              <th>
                Reserved
                <br />
                Stock
              </th>
              <th>
                Quarantined
                <br />
                Stock
              </th>
              <th>
                Manufacturing
                <br />
                Date
              </th>
              <th>Expiry Date</th>
              <th>
                Remaining
                <br />
                Shelf Life
              </th>
              <th>
                Batch
                <br />
                Status
              </th>
              <th>
                Recall
                <br />
                Status
              </th>
              <th>
                Risk
                <br />
                Score
              </th>
              <th>Action</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={20} className={styles.emptyCell}>
                  No inventory records match your selected filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <InventoryTableRow
                  key={row.id}
                  row={row}
                  isMenuOpen={openMenuId === row.id}
                  onToggleMenu={() =>
                    setOpenMenuId(openMenuId === row.id ? null : row.id)
                  }
                  onCloseMenu={() => setOpenMenuId(null)}
                  onRecordAdjustment={() => onRecordAdjustment(row)}
                  onStartRecall={() => onStartRecall(row)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination */}
      <div className={styles.tableFooterRow}>
        <div className={styles.tableCountText}>
          Showing {totalRows===0?0:(currentPage-1)*25+1} to {Math.min(currentPage*25,totalRows)} of {totalRows} variants
        </div>
        <div className={styles.paginationControls}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
          <button
            type="button"
            className={`${styles.pageBtn} ${styles.pageBtnActive}`}
          >
            {currentPage}
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= lastPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryTableRow({
  row,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onRecordAdjustment,
  onStartRecall,
}: {
  row: InventoryRowData;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onRecordAdjustment: () => void;
  onStartRecall: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, onCloseMenu);

  return (
    <tr>
      {/* Product & Variant */}
      <td>
        <div className={styles.productCellGroup}>
          <img
            src={row.imageUrl}
            alt={row.name}
            className={styles.productCellImg}
          />
          <div>
            <div className={styles.productCellTitle}>{row.name}</div>
            <div className={styles.productCellVariant}>{row.variant}</div>
          </div>
        </div>
      </td>

      {/* Product ID (Public Ref) */}
      <td>
        <div className={styles.idPrimaryText}>{row.dbId}</div>
        <div className={styles.idSubText}>({row.publicRef})</div>
      </td>

      {/* Database Product ID */}
      <td className={styles.tdCenter}>{row.dbId}</td>

      {/* Brand */}
      <td className={styles.tdBoldText}>{row.brand}</td>

      {/* Supplier */}
      <td className={styles.tdSupplierText}>{row.supplier}</td>

      {/* SKU */}
      <td className={styles.tdSkuText}>{row.sku}</td>

      {/* Batch Number */}
      <td className={styles.tdBatchText}>{row.batchNumber}</td>

      {/* Variant */}
      <td className={styles.tdCenter}>-</td>

      {/* Inventory Location */}
      <td className={styles.tdLocationText}>{row.location}</td>

      {/* Available Stock */}
      <td
        className={
          row.availableStock < 50
            ? styles.stockValRed
            : styles.stockValGreen
        }
      >
        {row.availableStock.toLocaleString()}
      </td>

      {/* Reserved Stock */}
      <td>{row.reservedStock===null?'N/A':row.reservedStock}</td>

      {/* Quarantined Stock */}
      <td className={(row.quarantinedStock??0) > 0 ? styles.stockValPurple : ""}>
        {row.quarantinedStock===null?'N/A':row.quarantinedStock.toLocaleString()}
      </td>

      {/* Manufacturing Date */}
      <td>{row.mfgDate??'N/A'}</td>

      {/* Expiry Date */}
      <td>{row.expDate??'N/A'}</td>

      {/* Remaining Shelf Life */}
      <td>
        <div className={styles.shelfLifeVal}>{row.shelfLife??'N/A'}</div>
        <div
          className={
            row.shelfLifeStatus === "Critical"
              ? styles.shelfLifeCritical
              : styles.shelfLifeHealthy
          }
        >
          {row.shelfLifeStatus}
        </div>
      </td>

      {/* Batch Status */}
      <td>
        <span
          className={`${styles.badge} ${
            row.batchStatus === "Active"
              ? styles.badgeGreen
              : row.batchStatus === "Near Expiry"
              ? styles.badgeAmber
              : styles.badgePurple
          }`}
        >
          {row.batchStatus}
        </span>
      </td>

      {/* Recall Status */}
      <td>
        <span
          className={`${styles.badge} ${
            row.recallStatus === "None"
              ? styles.badgeNeutral
              : row.recallStatus === "Active Recall"
              ? styles.badgeRed
              : styles.badgeAmber
          }`}
        >
          {row.recallStatus}
        </span>
      </td>

      {/* Risk Score */}
      <td>
        <span
          className={`${styles.badge} ${
            row.riskScore === "Low"
              ? styles.badgeGreen
              : row.riskScore === "High"
              ? styles.badgeRed
              : styles.badgeDarkRed
          }`}
        >
          {row.riskScore}
        </span>
      </td>

      {/* Action: Open Batch */}
      <td>
        {row.batchNumber==='Unavailable'?<button type="button" disabled title="No inventory batch domain exists" className={styles.openBatchBtn}>Open Batch</button>:<Link href={`/admin/catalogue/inventory/batches/${row.batchNumber}`} role="button" className={styles.openBatchBtn}>Open Batch</Link>}
      </td>

      {/* 3-Dot Actions Dropdown */}
      <td>
        <div className={styles.menuWrapper} ref={menuRef}>
          <button
            type="button"
            className={styles.iconMenuBtn}
            onClick={onToggleMenu}
            aria-label="Row Actions"
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className={styles.rowDropdownMenu}>
              <button disabled type="button" className={styles.menuItem} title="No inventory batch domain exists"><Eye size={14}/> View Batch Details</button>

              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  onCloseMenu();
                  onRecordAdjustment();
                }}
              >
                <RefreshCw size={14} /> Record Stock Adjustment
              </button>

              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  onCloseMenu();
                  onCloseMenu();
                }}
                disabled
                title="No stock movement ledger exists"
              >
                <History size={14} /> View Inventory Movements
              </button>

              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  onCloseMenu();
                  onStartRecall();
                }}
              >
                <AlertOctagon size={14} /> Start Recall Review
              </button>

              <div className={styles.menuDivider} />

              <Link
                href={`/admin/catalogue/product-approvals/${row.productId}`}
                className={styles.menuItem}
                onClick={onCloseMenu}
              >
                <ExternalLink size={14} /> View Product Approval Detail
              </Link>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
