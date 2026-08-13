"use client";

import React from "react";
import { CustomerSupportHealthRailData } from "@/data/analytics/customerSupportData";
import { CircularScore } from "./charts/CircularScore";

interface CustomerSupportHealthRailProps {
  data: CustomerSupportHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function CustomerSupportHealthRail({
  data,
  className = "",
  onActionClick,
}: CustomerSupportHealthRailProps) {
  const {
    healthScore,
    label,
    subtext,
    serviceSummary,
    experienceSummary,
    qualitySummary,
    workforceSummary,
    supportCostSummary,
    riskSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Support Analytics Report",
    "Review Service Risks",
    "Review SLA Exceptions",
    "Review Backlog Risks",
    "Review Low CSAT Cases",
    "Review Quality Gaps",
    "Review Capacity Gaps",
    "Run Support Forecast",
    "Open Support Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* 1. Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Support Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={84} strokeWidth={7} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block">{label}</span>
        <span className="text-[10px] text-slate-500 block mt-0.5">{subtext}</span>
      </div>

      {/* 2. Service Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Service Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Open Cases</span>
          <span className="font-bold text-slate-900">{serviceSummary.openCases}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">New Cases</span>
          <span className="font-bold text-slate-900">{serviceSummary.newCases}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Backlog</span>
          <span className="font-bold text-slate-900">{serviceSummary.backlog}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">First Response</span>
          <span className="font-bold text-slate-900">{serviceSummary.firstResponse}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Avg Resolution</span>
          <span className="font-bold text-slate-900">{serviceSummary.avgResolution}</span>
        </div>
      </div>

      {/* 3. Experience Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Experience Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">SLA Compliance</span>
          <span className="font-bold text-emerald-700">{experienceSummary.slaCompliance}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">CSAT</span>
          <span className="font-bold text-emerald-700">{experienceSummary.csat}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">CES</span>
          <span className="font-bold text-slate-900">{experienceSummary.ces}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Repeat Contact</span>
          <span className="font-bold text-slate-900">{experienceSummary.repeatContact}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Escalation Rate</span>
          <span className="font-bold text-slate-900">{experienceSummary.escalationRate}</span>
        </div>
      </div>

      {/* 4. Quality Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quality Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">QA Score</span>
          <span className="font-bold text-emerald-700">{qualitySummary.qaScore}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Evaluated Cases</span>
          <span className="font-bold text-slate-900">{qualitySummary.evaluatedCases}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Coaching Due</span>
          <span className="font-bold text-amber-700">{qualitySummary.coachingDue}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Knowledge Gaps</span>
          <span className="font-bold text-slate-900">{qualitySummary.knowledgeGaps}</span>
        </div>
      </div>

      {/* 5. Workforce Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Workforce Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Active</span>
          <span className="font-bold text-slate-900">{workforceSummary.active}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Available</span>
          <span className="font-bold text-slate-900">{workforceSummary.available}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">At Capacity</span>
          <span className="font-bold text-amber-700">{workforceSummary.atCapacity}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Overloaded</span>
          <span className="font-bold text-rose-700">{workforceSummary.overloaded}</span>
        </div>
      </div>

      {/* 6. Support Cost Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Support Cost Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Total Cost</span>
          <span className="font-bold text-slate-900">{supportCostSummary.totalCost}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cost / Case</span>
          <span className="font-bold text-slate-900">{supportCostSummary.costPerCase}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cost / Resolved</span>
          <span className="font-bold text-slate-900">{supportCostSummary.costPerResolved}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Recovery Cost</span>
          <span className="font-bold text-slate-900">{supportCostSummary.recoveryCost}</span>
        </div>
      </div>

      {/* 7. Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">SLA Risk</span>
          <span className="font-bold text-amber-700">{riskSummary.slaRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Backlog Risk</span>
          <span className="font-bold text-amber-700">{riskSummary.backlogRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Quality Risk</span>
          <span className="font-bold text-amber-700">{riskSummary.qualityRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Escalation Risk</span>
          <span className="font-bold text-rose-700">{riskSummary.escalationRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Data Risk</span>
          <span className="font-bold text-slate-900">{riskSummary.dataRisk}</span>
        </div>
      </div>

      {/* 8. Quick Queues */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quick Queues
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

      {/* 9. Final Actions */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Final Actions
        </h4>
        <div className="space-y-1.5">
          {actionButtons.map((btnText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btnText)}
              className={`w-full py-1.5 px-2.5 font-semibold text-[11px] border rounded transition-colors text-center cursor-pointer shadow-2xs ${
                idx === 0
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
