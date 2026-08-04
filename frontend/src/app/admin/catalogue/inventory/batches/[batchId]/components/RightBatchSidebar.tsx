"use client";

import React from "react";
import { CheckCircle, Info } from "lucide-react";
import styles from "../batch-detail.module.css";

interface RightBatchSidebarProps {
  onRecordAdjustment: () => void;
  onTransferStock: () => void;
  onQuarantineBatch: () => void;
  onInitiateRecall: () => void;
  onMarkDamaged: () => void;
  onNotifySupplier: () => void;
  onExportRecord: () => void;
  onSuspendMarketplace: () => void;
}

export function RightBatchSidebar({
  onRecordAdjustment,
  onTransferStock,
  onQuarantineBatch,
  onInitiateRecall,
  onMarkDamaged,
  onNotifySupplier,
  onExportRecord,
  onSuspendMarketplace,
}: RightBatchSidebarProps) {
  const healthScore = 92;
  // SVG Gauge calculations for a circle with r=36, circumference ~ 226
  const strokeDashoffset = 226 - (226 * healthScore) / 100;

  return (
    <aside className={styles.rightSidebarStack}>
      {/* 1. Batch Health Card */}
      <div className={styles.sideCard}>
        <h3 className={styles.cardSectionLabelHeader}>Batch Health</h3>

        {/* Circular Ring Gauge */}
        <div className={styles.gaugeCenterWrapper}>
          <div className={styles.gaugeCircleRelative}>
            <svg width="100" height="100" viewBox="0 0 100 100" className={styles.gaugeSvg}>
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#059669"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="238.76"
                strokeDashoffset={238.76 - (238.76 * healthScore) / 100}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className={styles.gaugeInnerContent}>
              <span className={styles.gaugeNumberText}>{healthScore}</span>
              <span className={styles.gaugeLabelText}>Score</span>
            </div>
          </div>
        </div>

        {/* Consumed / Remaining */}
        <div className={styles.shelfLifeMetricsRow}>
          <div>
            <div className={styles.metricLabelMuted}>SHELF-LIFE CONSUMED</div>
            <div className={styles.metricValBold}>16.7%</div>
          </div>
          <div className={styles.alignTextRight}>
            <div className={styles.metricLabelMuted}>SHELF-LIFE REMAINING</div>
            <div className={styles.metricValBold}>30 Months</div>
          </div>
        </div>

        {/* Automated Recommendations */}
        <div className={styles.recommendationsSection}>
          <div className={styles.recSectionHeader}>AUTOMATED RECOMMENDATIONS</div>
          <div className={styles.recItemRow}>
            <CheckCircle size={15} color="#059669" className={styles.flexShrink0} />
            <span>Continue normal marketplace sale</span>
          </div>
          <div className={styles.recItemRow}>
            <div className={styles.orangeCircleIndicator} />
            <span>Complete receipt of the 450 in-transit units.</span>
          </div>
        </div>

        {/* Batch Validation Statuses */}
        <div className={styles.validationStatusesList}>
          <div className={styles.valStatusRow}>
            <div className={styles.valStatusLeft}>
              <CheckCircle size={14} color="#059669" />
              <span>Batch Status:</span>
            </div>
            <span className={styles.valStatusGreen}>Active</span>
          </div>

          <div className={styles.valStatusRow}>
            <div className={styles.valStatusLeft}>
              <CheckCircle size={14} color="#059669" />
              <span>Risk Status:</span>
            </div>
            <span className={styles.valStatusGreen}>Low</span>
          </div>

          <div className={styles.valStatusRow}>
            <div className={styles.valStatusLeft}>
              <CheckCircle size={14} color="#059669" />
              <span>Storage Compliance:</span>
            </div>
            <span className={styles.valStatusGreen}>Verified</span>
          </div>

          <div className={styles.valStatusRow}>
            <div className={styles.valStatusLeft}>
              <CheckCircle size={14} color="#059669" />
              <span>Stock Reconciliation:</span>
            </div>
            <span className={styles.valStatusGreen}>Matched</span>
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className={styles.sidebarActionsStack}>
          <button
            type="button"
            className={`${styles.btnBlock} ${styles.btnBlockBurgundy}`}
            onClick={onRecordAdjustment}
          >
            Record Stock Adjustment
          </button>

          <button
            type="button"
            className={styles.btnBlockSecondary}
            onClick={onTransferStock}
          >
            Transfer Stock
          </button>

          <button
            type="button"
            className={styles.btnBlockSecondary}
            onClick={onQuarantineBatch}
          >
            Quarantine Batch
          </button>

          <button
            type="button"
            className={`${styles.btnBlockSecondary} ${styles.btnRedOutline}`}
            onClick={onInitiateRecall}
          >
            Initiate Recall
          </button>

          <button
            type="button"
            className={styles.btnBlockSecondary}
            onClick={onMarkDamaged}
          >
            Mark Damaged
          </button>

          <button
            type="button"
            className={styles.btnBlockSecondary}
            onClick={onNotifySupplier}
          >
            Notify Supplier
          </button>

          <button
            type="button"
            className={styles.btnBlockSecondary}
            onClick={onExportRecord}
          >
            Export Batch Record
          </button>

          <button
            type="button"
            className={`${styles.btnBlockSecondary} ${styles.marginTop6}`}
            onClick={onSuspendMarketplace}
          >
            Suspend Marketplace Availability
          </button>
        </div>

        {/* Audit History Notice Box */}
        <div className={styles.auditNoticeBox}>
          <Info size={16} color="#68707d" className={styles.flexShrink0} />
          <div>
            All stock adjustments, transfers, quarantine actions, recalls, damage records, marketplace suspensions and overrides require a reason and are recorded in the <strong>audit history</strong>.
          </div>
        </div>
      </div>
    </aside>
  );
}
