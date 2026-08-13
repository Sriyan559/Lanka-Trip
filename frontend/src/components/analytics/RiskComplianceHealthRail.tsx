"use client";

import React from "react";
import { RiskComplianceHealthRailData } from "@/data/analytics/riskComplianceData";
import { CircularScore } from "./charts/CircularScore";

interface RiskComplianceHealthRailProps {
  data: RiskComplianceHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function RiskComplianceHealthRail({
  data,
  className = "",
  onActionClick,
}: RiskComplianceHealthRailProps) {
  const {
    healthScore,
    label,
    subtext,
    enterpriseRiskSummary,
    complianceSummary,
    fraudSummary,
    productSupplierRiskSummary,
    governanceSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Risk Analytics Report",
    "Review Critical Risks",
    "Review Compliance Exceptions",
    "Review Fraud Alerts",
    "Review Product Safety Risks",
    "Review Supplier Compliance",
    "Review Policy Violations",
    "Review Control Failures",
    "Run Risk Forecast",
    "Open Risk Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Risk &amp; Compliance Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={84} strokeWidth={7} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block">{label}</span>
        <span className="text-[10px] text-slate-500 block mt-0.5">{subtext}</span>
      </div>

      {/* 1. Enterprise Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          1. Enterprise Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Open Risk Items</span>
          <span className="font-bold text-slate-900">{enterpriseRiskSummary.openRiskItems}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Critical Risks</span>
          <span className="font-bold text-rose-700">{enterpriseRiskSummary.criticalRisks}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">High Risks</span>
          <span className="font-bold text-amber-700">{enterpriseRiskSummary.highRisks}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Medium Risks</span>
          <span className="font-bold text-slate-900">{enterpriseRiskSummary.mediumRisks}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Low Risks</span>
          <span className="font-bold text-slate-900">{enterpriseRiskSummary.lowRisks}</span>
        </div>
        <div className="flex justify-between py-0.5 font-bold">
          <span className="text-slate-700">Financial Exposure</span>
          <span className="text-rose-700">{enterpriseRiskSummary.financialExposure}</span>
        </div>
      </div>

      {/* 2. Compliance Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          2. Compliance Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Compliance Score</span>
          <span className="font-bold text-emerald-700">{complianceSummary.complianceScore}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Open Cases</span>
          <span className="font-bold text-slate-900">{complianceSummary.openCases}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Pending Reviews</span>
          <span className="font-bold text-amber-700">{complianceSummary.pendingReviews}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Critical Cases</span>
          <span className="font-bold text-rose-700">{complianceSummary.criticalCases}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Compliance SLA</span>
          <span className="font-bold text-emerald-700">{complianceSummary.complianceSla}</span>
        </div>
      </div>

      {/* 3. Fraud Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          3. Fraud Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Fraud Alerts</span>
          <span className="font-bold text-rose-700">{fraudSummary.fraudAlerts}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Confirmed</span>
          <span className="font-bold text-rose-700">{fraudSummary.confirmed}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Suspected</span>
          <span className="font-bold text-amber-700">{fraudSummary.suspected}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Blocked</span>
          <span className="font-bold text-slate-900">{fraudSummary.blocked}</span>
        </div>
        <div className="flex justify-between py-0.5 font-bold">
          <span className="text-slate-700">Exposure</span>
          <span className="text-rose-700">{fraudSummary.exposure}</span>
        </div>
      </div>

      {/* 4. Product / Supplier Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          4. Product / Supplier Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">High-Risk Products</span>
          <span className="font-bold text-rose-700">{productSupplierRiskSummary.highRiskProducts}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">High-Risk Sellers</span>
          <span className="font-bold text-rose-700">{productSupplierRiskSummary.highRiskSellers}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Safety Alerts</span>
          <span className="font-bold text-amber-700">{productSupplierRiskSummary.safetyAlerts}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Certification Warnings</span>
          <span className="font-bold text-amber-700">{productSupplierRiskSummary.certificationWarnings}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Authenticity Cases</span>
          <span className="font-bold text-slate-900">{productSupplierRiskSummary.authenticityCases}</span>
        </div>
      </div>

      {/* 5. Governance Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          5. Governance Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Audit Findings</span>
          <span className="font-bold text-slate-900">{governanceSummary.auditFindings}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Control Failures</span>
          <span className="font-bold text-rose-700">{governanceSummary.controlFailures}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Policy Violations</span>
          <span className="font-bold text-slate-900">{governanceSummary.policyViolations}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Policies Overdue</span>
          <span className="font-bold text-amber-700">{governanceSummary.policiesOverdue}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Remediation Overdue</span>
          <span className="font-bold text-rose-700">{governanceSummary.remediationOverdue}</span>
        </div>
      </div>

      {/* 6. Quick Queues */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          D. Quick Queues
        </h4>
        <div className="space-y-1 text-[11px]">
          {quickQueues.map((qq, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5">
              <span className="text-slate-600 font-medium truncate">{qq.label}</span>
              <span
                className={`font-extrabold text-[11px] px-1.5 rounded ${
                  qq.type === "danger"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : qq.type === "warning"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Final Actions */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          F. Final Actions
        </h4>
        <div className="space-y-1.5">
          {actionButtons.map((btnText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btnText)}
              className={`w-full py-1.5 px-2.5 font-semibold text-[11px] border rounded transition-colors text-center cursor-pointer shadow-2xs ${
                idx === 0 || idx === 8
                  ? "bg-burgundy text-white border-burgundy hover:bg-burgundy-dark font-bold"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              {btnText}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
