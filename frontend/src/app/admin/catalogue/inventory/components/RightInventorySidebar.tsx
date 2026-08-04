"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  X,
  Info,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import styles from "../inventory.module.css";

interface RightInventorySidebarProps {
  productId?: string;
  productRef?: string;
  dbId?: string;
  productName?: string;
  brand?: string;
  supplier?: string;

  onClearFilter?: () => void;
  onSelectQuickQueueBatch?: (batchId: string) => void;
}

export function RightInventorySidebar({
  productId,
  productRef = "PROD-2024-00421",
  dbId = "421",
  productName = "Radiance Vitamin C Serum",
  brand = "Estée Lauder",
  supplier = "Luxe Distribution Pvt Ltd",
  onClearFilter,
  onSelectQuickQueueBatch,
}: RightInventorySidebarProps) {
  const [contextOpen, setContextOpen] = useState(true);

  return (
    <aside className={styles.rightSidebarContainer}>
      {/* 1. Product Context Card (renders ONLY when productId filter is present) */}
      {productId && (
        <div className={styles.sideCard}>
          <div className={styles.sideCardHeader}>
            <span className={styles.cardSectionLabel}>Product Context</span>
            <button
              type="button"
              className={styles.collapseToggleBtn}
              onClick={() => setContextOpen((p) => !p)}
              aria-label="Toggle Context"
            >
              {contextOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {contextOpen && (
            <div className={styles.sideContextBody}>
              <div className={styles.sideContextRow}>
                <span className={styles.sideContextLabel}>Product Reference</span>
                <span className={styles.sideContextVal}>{productRef}</span>
              </div>
              <div className={styles.sideContextRow}>
                <span className={styles.sideContextLabel}>Database Product ID</span>
                <span className={styles.sideContextVal}>{dbId}</span>
              </div>
              <div className={styles.sideContextRow}>
                <span className={styles.sideContextLabel}>Product</span>
                <span className={styles.sideContextValBold}>{productName}</span>
              </div>
              <div className={styles.sideContextRow}>
                <span className={styles.sideContextLabel}>Brand</span>
                <span className={styles.sideContextVal}>{brand}</span>
              </div>
              <div className={styles.sideContextRow}>
                <span className={styles.sideContextLabel}>Supplier</span>
                <span className={styles.sideContextVal}>{supplier}</span>
              </div>

              <div className={styles.sideContextActions}>
                <Link
                  href={`/admin/catalogue/product-approvals/${productId}`}
                  className={styles.sideRedLink}
                >
                  <ExternalLink size={13} /> View Product Approval Detail
                </Link>
                <button
                  type="button"
                  className={styles.sideRedLinkBtn}
                  onClick={onClearFilter}
                >
                  <X size={13} /> Clear Filter
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Expiry Exposure (Units & Value at Risk) */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>Expiry Exposure</span>
          <span className={styles.sideCardSubHeader}>
            (Units &amp; Value at Risk) <Info size={13} />
          </span>
        </div>

        <div className={styles.exposureStack}>
          {/* Critical 30 Days */}
          <div className={styles.exposureItem}>
            <div className={styles.exposureTop}>
              <span className={styles.exposureTitle}>Critical — 30 Days</span>
              <span className={styles.exposureUnitsVal}>
                3,120 <span className={styles.unitMuted}>units</span>
              </span>
            </div>
            <div className={styles.exposureBarTrack}>
              <div
                className={`${styles.exposureBarFill} ${styles.bgRed}`}
                style={{ width: "25%" }}
              />
            </div>
            <div className={styles.exposurePriceVal}>LKR 42,650.00</div>
          </div>

          {/* Moderate 60 Days */}
          <div className={styles.exposureItem}>
            <div className={styles.exposureTop}>
              <span className={styles.exposureTitle}>Moderate — 60 Days</span>
              <span className={styles.exposureUnitsVal}>
                8,450 <span className={styles.unitMuted}>units</span>
              </span>
            </div>
            <div className={styles.exposureBarTrack}>
              <div
                className={`${styles.exposureBarFill} ${styles.bgOrange}`}
                style={{ width: "50%" }}
              />
            </div>
            <div className={styles.exposurePriceVal}>LKR 128,200.00</div>
          </div>

          {/* Planned 90 Days */}
          <div className={styles.exposureItem}>
            <div className={styles.exposureTop}>
              <span className={styles.exposureTitle}>Planned — 90 Days</span>
              <span className={styles.exposureUnitsVal}>
                15,200 <span className={styles.unitMuted}>units</span>
              </span>
            </div>
            <div className={styles.exposureBarTrack}>
              <div
                className={`${styles.exposureBarFill} ${styles.bgAmber}`}
                style={{ width: "75%" }}
              />
            </div>
            <div className={styles.exposurePriceVal}>LKR 310,400.00</div>
          </div>

          <div className={styles.exposureTotalRow}>
            <span>
              Total Value at Risk <span className={styles.unitMuted}>(Calculated)</span>
            </span>
            <span className={styles.exposureTotalVal}>LKR 481,450.00</span>
          </div>
        </div>
      </div>

      {/* 3. Inventory Alerts */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>Inventory Alerts</span>
        </div>

        <div className={styles.alertsList}>
          <div className={styles.alertItemRow}>
            <div className={styles.alertLabelGroup}>
              <AlertTriangle size={14} color="#dc2626" />
              <span>Negative Stock Detected</span>
            </div>
            <span className={styles.alertCount}>3 records</span>
            <button type="button" className={styles.alertViewLink}>
              View
            </button>
          </div>

          <div className={styles.alertItemRow}>
            <div className={styles.alertLabelGroup}>
              <AlertCircle size={14} color="#dc2626" />
              <span>Stock Mismatch</span>
            </div>
            <span className={styles.alertCount}>8 records</span>
            <button type="button" className={styles.alertViewLink}>
              View
            </button>
          </div>

          <div className={styles.alertItemRow}>
            <div className={styles.alertLabelGroup}>
              <AlertTriangle size={14} color="#dc2626" />
              <span>Missing Batch Number</span>
            </div>
            <span className={styles.alertCount}>12 records</span>
            <button type="button" className={styles.alertViewLink}>
              View
            </button>
          </div>

          <div className={styles.alertItemRow}>
            <div className={styles.alertLabelGroup}>
              <AlertTriangle size={14} color="#d97706" />
              <span>Missing Expiry Date</span>
            </div>
            <span className={styles.alertCount}>5 records</span>
            <button type="button" className={styles.alertViewLink}>
              View
            </button>
          </div>

          <div className={styles.alertItemRow}>
            <div className={styles.alertLabelGroup}>
              <AlertTriangle size={14} color="#d97706" />
              <span>Unusual Adjustment</span>
            </div>
            <span className={styles.alertCount}>2 records</span>
            <button type="button" className={styles.alertViewLink}>
              View
            </button>
          </div>
        </div>

        <div className={styles.alertsFooter}>
          <button type="button" className={styles.viewAllAlertsBtn}>
            View all alerts
          </button>
        </div>
      </div>

      {/* 4. Recall Status Center Card */}
      <div className={styles.recallDarkCard}>
        <div className={styles.recallHeaderTop}>
          <AlertTriangle size={18} color="#ffffff" />
          <span className={styles.recallTitle}>Recall Status Center</span>
        </div>

        <div className={styles.recallGrid4}>
          <div className={styles.recallMetricBlock}>
            <div className={styles.recallMetricLabel}>Active Recall Cases</div>
            <div className={styles.recallMetricVal}>2</div>
          </div>
          <div className={styles.recallMetricBlock}>
            <div className={styles.recallMetricLabel}>Customers Linked</div>
            <div className={styles.recallMetricVal}>1,185</div>
          </div>
          <div className={styles.recallMetricBlock}>
            <div className={styles.recallMetricLabel}>Orders Linked</div>
            <div className={styles.recallMetricVal}>4,210</div>
          </div>
          <div className={styles.recallMetricBlock}>
            <div className={styles.recallMetricLabel}>Suppliers Awaiting Response</div>
            <div className={styles.recallMetricVal}>3</div>
          </div>
        </div>

        <div className={styles.recallRecalledRow}>
          <span>Recalled Products</span>
          <span className={styles.recallRecalledVal}>12</span>
        </div>

        <button
          type="button"
          className={styles.btnOpenRecallDashboard}
          onClick={() => alert("Opening Recall Dashboard...")}
        >
          <ExternalLink size={15} /> Open Recall Dashboard
        </button>
      </div>

      {/* 5. Quick Queue Card */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>Quick Queue</span>
        </div>

        <div className={styles.quickQueueList}>
          <button
            type="button"
            className={styles.qqRowBtn}
            onClick={() => onSelectQuickQueueBatch?.("BT-2024-0112")}
          >
            <span className={styles.qqLabel}>Oldest Near-Expiry Batch</span>
            <span className={styles.qqValText}>
              BT-2024-0112 <ChevronRight size={14} />
            </span>
          </button>

          <button
            type="button"
            className={styles.qqRowBtn}
            onClick={() => onSelectQuickQueueBatch?.("RECALL-442")}
          >
            <span className={styles.qqLabel}>Highest-Risk Batch</span>
            <span className={styles.qqValText}>
              RECALL-442 <ChevronRight size={14} />
            </span>
          </button>

          <button
            type="button"
            className={styles.qqRowBtn}
            onClick={() => onSelectQuickQueueBatch?.("BT-2024-0198")}
          >
            <span className={styles.qqLabel}>Largest Inventory Discrepancy</span>
            <span className={styles.qqValText}>
              BT-2024-0198 <ChevronRight size={14} />
            </span>
          </button>

          <button
            type="button"
            className={styles.qqRowBtn}
            onClick={() => onSelectQuickQueueBatch?.("BT-2024-0211")}
          >
            <span className={styles.qqLabel}>Batch Awaiting Supplier Response</span>
            <span className={styles.qqValText}>
              BT-2024-0211 <ChevronRight size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* 6. Inventory Health Card */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>Inventory Health</span>
          <Info size={14} color="#68707d" />
        </div>

        <div className={styles.healthRow}>
          <span className={styles.healthLabel}>Inventory Accuracy</span>
          <span className={styles.healthValBold}>98.4%</span>
        </div>
        <div className={styles.healthBarTrack}>
          <div className={styles.healthBarFill} style={{ width: "98.4%" }} />
        </div>

        <div className={styles.healthSubRow}>
          <span className={styles.healthLabel}>Low-Stock Products</span>
          <span className={styles.healthSubVal}>36</span>
        </div>
        <div className={styles.healthSubRow}>
          <span className={styles.healthLabel}>Out-of-Stock Products</span>
          <span className={styles.healthSubVal}>18</span>
        </div>
        <div className={styles.healthSubRow}>
          <span className={styles.healthLabel}>Unresolved Adjustments</span>
          <span className={styles.healthSubVal}>5</span>
        </div>
      </div>
    </aside>
  );
}
