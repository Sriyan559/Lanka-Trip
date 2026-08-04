"use client";

import React from "react";
import styles from "../product-approvals.module.css";

export interface KpiMetric {
  id: string;
  label: string;
  value: number | string;
  trend?: string;
  variant?: "neutral" | "red" | "amber";
}

interface ProductApprovalKpisProps {
  metrics?: KpiMetric[];
  onKpiClick?: (id: string) => void;
}

const DEFAULT_KPIS: KpiMetric[] = [
  { id: "new", label: "New Submissions", value: 142, trend: "+12%", variant: "neutral" },
  { id: "under_review", label: "Under Review", value: 38, variant: "neutral" },
  { id: "info_requested", label: "Info Requested", value: 19, variant: "neutral" },
  { id: "approval_today", label: "Approval Today", value: 64, variant: "neutral" },
  { id: "rejected", label: "Rejected", value: 8, variant: "neutral" },
  { id: "brand_auth_issues", label: "Brand Auth Issues", value: 12, variant: "red" },
  { id: "missing_compliance", label: "Missing Compliance", value: 24, variant: "red" },
  { id: "duplicate_warnings", label: "Duplicate Warnings", value: 7, variant: "amber" },
  { id: "high_risk", label: "High Risk", value: 3, variant: "red" },
];

export function ProductApprovalKpis({
  metrics = DEFAULT_KPIS,
  onKpiClick,
}: ProductApprovalKpisProps) {
  return (
    <div className={styles.kpiRow}>
      {metrics.map((kpi) => {
        let cardClass = styles.kpiCard;
        if (kpi.variant === "red") {
          cardClass += ` ${styles.redText} ${styles.redBorder}`;
        } else if (kpi.variant === "amber") {
          cardClass += ` ${styles.orangeText} ${styles.orangeBorder}`;
        }

        return (
          <div
            key={kpi.id}
            className={cardClass}
            onClick={() => onKpiClick?.(kpi.id)}
            role={onKpiClick ? "button" : undefined}
            tabIndex={onKpiClick ? 0 : undefined}
          >
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>
              {kpi.value}
              {kpi.trend && (
                <span className={`${styles.kpiTrend} ${styles.trendUp}`}>
                  {kpi.trend}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
