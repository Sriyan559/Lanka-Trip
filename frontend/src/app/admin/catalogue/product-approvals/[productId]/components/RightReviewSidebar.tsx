"use client";

import React from "react";
import {
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  XCircle,
  PauseCircle,
  UserCheck,
  ShieldAlert,
  Info,
} from "lucide-react";
import styles from "../product-approval-detail.module.css";
import { TabKey } from "./ProductDetailTabs";

interface RightReviewSidebarProps {
  progressPercent?: number;
  stepsCompleted?: number;
  totalSteps?: number;
  reviewerName?: string;
  reviewerRole?: string;
  reviewerAvatar?: string;
  recommendationText?: string;
  updatedTimestamp?: string;

  onOpenTab: (tab: TabKey) => void;
  onApprove: () => void;
  onApproveConditions: () => void;
  onRequestInfo: () => void;
  onReject: () => void;
  onSuspend: () => void;
}

export function RightReviewSidebar({
  progressPercent = 78,
  stepsCompleted = 14,
  totalSteps = 18,
  reviewerName = "Elena Vance",
  reviewerRole = "Compliance Officer",
  reviewerAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80",
  recommendationText = "Approve with conditions. Submit the missing safety certificate and back-packaging image. Remove the unsupported clinical claim before publication.",
  updatedTimestamp = "Oct 26, 2024 10:25 AM",

  onOpenTab,
  onApprove,
  onApproveConditions,
  onRequestInfo,
  onReject,
  onSuspend,
}: RightReviewSidebarProps) {
  return (
    <aside className={styles.sidebarReviewPanel}>
      {/* 1. REVIEW PROGRESS Card */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>REVIEW PROGRESS</span>
        </div>
        <div className={styles.progressStatRow}>
          <div className={styles.progressBigVal}>{progressPercent}%</div>
          <div className={styles.progressStepsText}>
            {stepsCompleted} / {totalSteps} STEPS
          </div>
        </div>
        <div className={styles.mainProgressBar}>
          <div
            className={styles.mainProgressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.stageProgressRow}>
          <div className={`${styles.stageSegment} ${styles.stageDone}`} />
          <div className={`${styles.stageSegment} ${styles.stageDone}`} />
          <div className={`${styles.stageSegment} ${styles.stageActive}`} />
          <div className={`${styles.stageSegment} ${styles.stagePending}`} />
        </div>
      </div>

      {/* 2. BLOCKING ISSUES (3) Card */}
      <div className={`${styles.sideCard} ${styles.redBorderCard}`}>
        <div className={styles.redCardTitleRow}>
          <AlertCircle size={16} color="#b42318" />
          <span className={styles.redCardTitle}>BLOCKING ISSUES (3)</span>
        </div>
        <div className={styles.blockingList}>
          {/* Issue 1 */}
          <div className={styles.blockingItem}>
            <div className={styles.blockingItemHeader}>
              <div className={styles.blockingTitle}>
                Missing safety evidence for 15% Vitamin C
              </div>
              <button
                type="button"
                className={styles.reviewActionLink}
                onClick={() => onOpenTab("ingredients_safety")}
              >
                Review <ChevronRight size={13} />
              </button>
            </div>
            <div className={styles.blockingSubText}>
              Lab results must be uploaded to Ingredients &amp; Safety.
            </div>
          </div>

          {/* Issue 2 */}
          <div className={styles.blockingItem}>
            <div className={styles.blockingItemHeader}>
              <div className={styles.blockingTitle}>
                Unsupported anti-aging claim
              </div>
              <button
                type="button"
                className={styles.reviewActionLink}
                onClick={() => onOpenTab("content")}
              >
                Review <ChevronRight size={13} />
              </button>
            </div>
            <div className={styles.blockingSubText}>
              Review marketing copy on Product Content.
            </div>
          </div>

          {/* Issue 3 */}
          <div className={styles.blockingItem}>
            <div className={styles.blockingItemHeader}>
              <div className={styles.blockingTitle}>
                Back packaging image missing
              </div>
              <button
                type="button"
                className={styles.reviewActionLink}
                onClick={() => onOpenTab("media")}
              >
                Review <ChevronRight size={13} />
              </button>
            </div>
            <div className={styles.blockingSubText}>
              High-resolution back photo required.
            </div>
          </div>
        </div>

        <div className={styles.blockingFooter}>
          <button
            type="button"
            className={styles.viewAllIssuesBtn}
            onClick={() => onOpenTab("ingredients_safety")}
          >
            View all issues
          </button>
        </div>
      </div>

      {/* 3. AUTOMATED VALIDATION Card */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>AUTOMATED VALIDATION</span>
        </div>
        <div className={styles.validationList}>
          <div className={styles.validationRow}>
            <div className={styles.validationLabelGroup}>
              <CheckCircle2 size={14} className={styles.greenIcon} />
              <span>Brand Authorization</span>
            </div>
            <span className={`${styles.valStatusText} ${styles.greenVal}`}>
              Valid
            </span>
          </div>

          <div className={styles.validationRow}>
            <div className={styles.validationLabelGroup}>
              <CheckCircle2 size={14} className={styles.greenIcon} />
              <span>Product Category Covered</span>
            </div>
            <span className={`${styles.valStatusText} ${styles.greenVal}`}>
              Yes
            </span>
          </div>

          <div className={styles.validationRow}>
            <div className={styles.validationLabelGroup}>
              <CheckCircle2 size={14} className={styles.greenIcon} />
              <span>Duplicate Barcode</span>
            </div>
            <span className={`${styles.valStatusText} ${styles.greenVal}`}>
              None
            </span>
          </div>

          <div className={styles.validationRow}>
            <div className={styles.validationLabelGroup}>
              <CheckCircle2 size={14} className={styles.greenIcon} />
              <span>Prohibited Ingredients</span>
            </div>
            <span className={`${styles.valStatusText} ${styles.greenVal}`}>
              Clear
            </span>
          </div>

          <div className={styles.validationRow}>
            <div className={styles.validationLabelGroup}>
              <CheckCircle2 size={14} className={styles.greenIcon} />
              <span>Active Recall</span>
            </div>
            <span className={`${styles.valStatusText} ${styles.greenVal}`}>
              None
            </span>
          </div>

          <div className={styles.validationRow}>
            <div className={styles.validationLabelGroup}>
              <Info size={14} className={styles.amberIcon} />
              <span>Batch Eligibility</span>
            </div>
            <span className={`${styles.valStatusText} ${styles.amberVal}`}>
              Pending Batch Submission
            </span>
          </div>
        </div>
      </div>

      {/* 4. REVIEWER RECOMMENDATION Card */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>REVIEWER RECOMMENDATION</span>
        </div>
        <div className={styles.reviewerHeader}>
          <img
            src={reviewerAvatar}
            alt={reviewerName}
            className={styles.reviewerAvatar}
          />
          <div>
            <div className={styles.reviewerName}>{reviewerName}</div>
            <div className={styles.reviewerRole}>{reviewerRole}</div>
          </div>
        </div>
        <p className={styles.recommendationBody}>{recommendationText}</p>
        <div className={styles.updatedTimeText}>Updated: {updatedTimestamp}</div>
      </div>

      {/* 5. FINAL PRODUCT DECISION Card */}
      <div className={styles.sideCard}>
        <div className={styles.sideCardHeader}>
          <span className={styles.cardSectionLabel}>FINAL PRODUCT DECISION</span>
          <Info size={14} color="#68707d" />
        </div>
        <div className={styles.decisionButtonsStack}>
          <button
            type="button"
            className={`${styles.decisionBtn} ${styles.btnApproveSolid}`}
            onClick={onApprove}
          >
            <CheckCircle2 size={16} /> Approve Product
          </button>

          <button
            type="button"
            className={`${styles.decisionBtn} ${styles.btnApproveConditions}`}
            onClick={onApproveConditions}
          >
            <ShieldAlert size={16} /> Approve with Conditions
          </button>

          <button
            type="button"
            className={`${styles.decisionBtn} ${styles.btnRequestInfo}`}
            onClick={onRequestInfo}
          >
            <HelpCircle size={16} /> Request Additional Information
          </button>

          <button
            type="button"
            className={`${styles.decisionBtn} ${styles.btnRejectSolid}`}
            onClick={onReject}
          >
            <XCircle size={16} /> Reject Product
          </button>

          <button
            type="button"
            className={`${styles.decisionBtn} ${styles.btnSuspendSolid}`}
            onClick={onSuspend}
          >
            <PauseCircle size={16} /> Suspend Review
          </button>
        </div>

        <p className={styles.decisionExplanatoryNote}>
          All approval, rejection, suspension and override decisions require a
          reason and are recorded in the audit history.
        </p>
      </div>
    </aside>
  );
}
