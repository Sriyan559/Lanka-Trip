"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  ShieldAlert,
  AlertTriangle,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import styles from "../product-approvals.module.css";
import { QuickViewKey } from "./ProductApprovalFilters";

interface RightContextSidebarProps {
  authId?: string;
  supplierName?: string;
  brandName?: string;
  onFilterBlockingIssue?: (issueType: string) => void;
  onInvestigateRisks?: () => void;
  onSelectQuickQueue?: (viewKey: QuickViewKey) => void;
}

export function RightContextSidebar({
  authId = "AUTH-2023-0892",
  supplierName = "Luxe Distribution Pvt Ltd",
  brandName = "Estée Lauder",
  onFilterBlockingIssue,
  onInvestigateRisks,
  onSelectQuickQueue,
}: RightContextSidebarProps) {
  return (
    <aside className={styles.sidebarContext}>
      {/* A. Authorization Filter Context */}
      <div className={styles.sideCard}>
        <h3 className={styles.sideCardTitle}>Authorization Filter Context</h3>
        <div className={styles.contextRow}>
          <span className={styles.contextLabel}>Authorization ID:</span>
          <span className={styles.contextValue}>{authId}</span>
        </div>
        <div className={styles.contextRow}>
          <span className={styles.contextLabel}>Supplier:</span>
          <span className={styles.contextValue}>{supplierName}</span>
        </div>
        <div className={styles.contextRow}>
          <span className={styles.contextLabel}>Brand:</span>
          <span className={styles.contextValue}>{brandName}</span>
        </div>
        <Link href="/admin/verification/brand-authorizations" className={styles.ghostLink}>
          <button type="button" className={styles.btnGhost}>
            View Authorization Case
          </button>
        </Link>
      </div>

      {/* B. Approval Efficiency */}
      <div className={styles.sideCard}>
        <h3 className={styles.sideCardTitle}>Approval Efficiency</h3>
        <div className={styles.effRow}>
          <span className={styles.contextLabel}>Avg Time to Approve</span>
          <strong>4.3h</strong>
        </div>
        <div className={styles.effRow}>
          <span className={styles.contextLabel}>Approval Today</span>
          <strong>64</strong>
        </div>
        <div className={styles.effRow}>
          <span className={styles.contextLabel}>Oldest Pending</span>
          <strong className={styles.redTextVal}>3 days</strong>
        </div>

        <div className={styles.workloadHeader}>
          <span className={styles.contextLabel}>Reviewer Workload</span>
          <strong>46%</strong>
        </div>
        <div className={styles.workloadBar}>
          <div className={styles.workloadFill} style={{ width: "46%" }} />
        </div>
        <div className={styles.workloadSub}>
          6 reviewers active, 4 at capacity or above
        </div>
      </div>

      {/* C. Blocking Issues */}
      <div className={styles.sideCard}>
        <h3 className={styles.sideCardTitle}>Blocking Issues</h3>
        <div className={styles.issueList}>
          <button
            type="button"
            className={styles.issueItem}
            onClick={() => onFilterBlockingIssue?.("Missing Ingredients")}
          >
            <div className={styles.issueLeft}>
              <FileText size={15} className={styles.mutedIcon} />
              <span>Missing Ingredients</span>
            </div>
            <div className={styles.issueRight}>
              <span className={styles.issueCount}>4</span>
              <ChevronRight size={14} />
            </div>
          </button>

          <button
            type="button"
            className={styles.issueItem}
            onClick={() => onFilterBlockingIssue?.("Safety Warnings")}
          >
            <div className={styles.issueLeft}>
              <ShieldAlert size={15} className={styles.mutedIcon} />
              <span>Safety Warnings</span>
            </div>
            <div className={styles.issueRight}>
              <span className={styles.issueCount}>4</span>
              <ChevronRight size={14} />
            </div>
          </button>

          <button
            type="button"
            className={styles.issueItem}
            onClick={() => onFilterBlockingIssue?.("Invalid Brand Authorization")}
          >
            <div className={styles.issueLeft}>
              <AlertTriangle size={15} className={styles.mutedIcon} />
              <span>Invalid Brand Authorization</span>
            </div>
            <div className={styles.issueRight}>
              <span className={styles.issueCount}>3</span>
              <ChevronRight size={14} />
            </div>
          </button>

          <button
            type="button"
            className={styles.issueItem}
            onClick={() => onFilterBlockingIssue?.("Product Images")}
          >
            <div className={styles.issueLeft}>
              <ImageIcon size={15} className={styles.mutedIcon} />
              <span>Product Images</span>
            </div>
            <div className={styles.issueRight}>
              <span className={styles.issueCount}>6</span>
              <ChevronRight size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* D. Risk Alerts */}
      <div className={`${styles.sideCard} ${styles.riskAlertCard}`}>
        <h3 className={`${styles.sideCardTitle} ${styles.redCardTitle}`}>
          <AlertCircle size={16} color="#b42318" /> Risk Alerts
        </h3>
        <div className={styles.riskList}>
          <div className={styles.riskItem}>
            <div className={styles.riskHeader}>
              <div className={styles.redIconGroup}>
                <span className={styles.riskDot} />
                <span>Duplicate Products</span>
              </div>
              <span className={styles.riskCount}>7</span>
            </div>
            <div className={styles.riskSub}>Potential duplicates detected</div>
          </div>

          <div className={styles.riskItem}>
            <div className={styles.riskHeader}>
              <div className={styles.redIconGroup}>
                <span className={styles.riskDot} />
                <span>Suspicious Pricing</span>
              </div>
              <span className={styles.riskCount}>4</span>
            </div>
            <div className={styles.riskSub}>Prices below market trend</div>
          </div>

          <div className={styles.riskItem}>
            <div className={styles.riskHeader}>
              <div className={styles.redIconGroup}>
                <span className={styles.riskDot} />
                <span>Recall Match</span>
              </div>
              <span className={styles.riskCount}>2</span>
            </div>
            <div className={styles.riskSub}>Active recall match in marketplace</div>
          </div>
        </div>

        <button
          type="button"
          className={styles.btnRisk}
          onClick={onInvestigateRisks}
        >
          Investigate Risks
        </button>
      </div>

      {/* E. Quick Queue */}
      <div className={styles.sideCard}>
        <h3 className={styles.sideCardTitle}>Quick Queue</h3>
        <div className={styles.quickQueueGrid}>
          <button
            type="button"
            className={styles.qqCard}
            onClick={() => onSelectQuickQueue?.("globally_pending")}
          >
            <div className={styles.qqLabel}>Global Pending</div>
            <div className={styles.qqValue}>12 Products</div>
          </button>

          <button
            type="button"
            className={styles.qqCard}
            onClick={() => onSelectQuickQueue?.("high_risk")}
          >
            <div className={styles.qqLabel}>Highest Risk</div>
            <div className={styles.qqValue}>3 Products</div>
          </button>

          <button
            type="button"
            className={styles.qqCard}
            onClick={() => onSelectQuickQueue?.("ready_for_approval")}
          >
            <div className={styles.qqLabel}>Final Approval</div>
            <div className={styles.qqValue}>18 Products</div>
          </button>

          <button
            type="button"
            className={styles.qqCard}
            onClick={() => onSelectQuickQueue?.("info_requested")}
          >
            <div className={styles.qqLabel}>Information Req.</div>
            <div className={styles.qqValue}>7 Products</div>
          </button>
        </div>
      </div>
    </aside>
  );
}
