"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import styles from "../product-approval-detail.module.css";

interface ReviewMetricsGridProps {
  contentCompleteness?: number;
  complianceCompleteness?: number;
  authStatus?: string;
  authId?: string;
  variantReadiness?: number;
  mediaReadiness?: number;
  duplicateRisk?: string;
  riskScore?: number;
  riskLabel?: string;
  openIssuesCount?: number;
  submissionVersion?: string;
  slaDeadline?: string;
  slaDaysLeft?: string;

  onViewIssues?: () => void;
}

export function ReviewMetricsGrid({
  contentCompleteness = 85,
  complianceCompleteness = 72,
  authStatus = "Valid",
  authId = "AUTH-2023-0892",
  variantReadiness = 100,
  mediaReadiness = 80,
  duplicateRisk = "Low",
  riskScore = 38,
  riskLabel = "Medium Risk",
  openIssuesCount = 3,
  submissionVersion = "v2",
  slaDeadline = "Oct 31, 2024",
  slaDaysLeft = "5 days left",
  onViewIssues,
}: ReviewMetricsGridProps) {
  return (
    <div className={styles.metricsGrid5Col}>
      {/* 1. Content Completeness */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Content Completeness</div>
        <div className={styles.metricValue}>{contentCompleteness}%</div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${styles.black}`}
            style={{ width: `${contentCompleteness}%` }}
          />
        </div>
      </div>

      {/* 2. Compliance Completeness */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Compliance Completeness</div>
        <div className={`${styles.metricValue} ${styles.orange}`}>
          {complianceCompleteness}%
        </div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${styles.orange}`}
            style={{ width: `${complianceCompleteness}%` }}
          />
        </div>
      </div>

      {/* 3. Brand Authorization */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Brand Authorization</div>
        <div className={`${styles.metricValue} ${styles.greenValGroup}`}>
          <CheckCircle2 size={18} className={styles.greenCheckIcon} />{" "}
          {authStatus}
        </div>
        <div className={styles.authSubText}>{authId}</div>
        <Link
          href="/admin/verification/brand-authorizations"
          className={styles.metaLink}
          style={{ fontSize: 11, marginTop: 2 }}
        >
          View Brand Authorization Case
        </Link>
      </div>

      {/* 4. Variant Readiness */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Variant Readiness</div>
        <div className={styles.metricValue}>{variantReadiness}%</div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${styles.green}`}
            style={{ width: `${variantReadiness}%` }}
          />
        </div>
      </div>

      {/* 5. Media Readiness */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Media Readiness</div>
        <div className={styles.metricValue}>{mediaReadiness}%</div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${styles.black}`}
            style={{ width: `${mediaReadiness}%` }}
          />
        </div>
      </div>

      {/* 6. Duplicate Risk */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Duplicate Risk</div>
        <div className={`${styles.metricValue} ${styles.green}`}>
          {duplicateRisk}
        </div>
      </div>

      {/* 7. Risk Score */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Risk Score</div>
        <div className={styles.metricValue}>
          {riskScore} <span className={styles.riskScoreSub}>/ 100</span>
          <span className={styles.riskBadgeText}>{riskLabel}</span>
        </div>
      </div>

      {/* 8. Open Issues */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Open Issues</div>
        <div className={`${styles.metricValue} ${styles.red}`}>
          {openIssuesCount}
        </div>
        <button
          type="button"
          className={styles.textLinkBtn}
          onClick={onViewIssues}
        >
          View Issues
        </button>
      </div>

      {/* 9. Submission Version */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>Submission Version</div>
        <div className={styles.metricValue}>{submissionVersion}</div>
      </div>

      {/* 10. SLA Deadline */}
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>SLA Deadline</div>
        <div className={styles.slaDateText}>{slaDeadline}</div>
        <div className={styles.slaDaysText}>({slaDaysLeft})</div>
      </div>
    </div>
  );
}
