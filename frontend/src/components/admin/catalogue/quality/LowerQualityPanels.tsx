"use client";

import React from "react";
import {
  MOCK_DUPLICATE_CANDIDATES,
  MOCK_INCOMPLETE_RECORDS,
  MOCK_VALIDATION_FAILURES,
  MOCK_PUBLICATION_READINESS,
  MOCK_RESOLUTION_PERFORMANCE,
  MOCK_GOVERNANCE_SUMMARY,
  MOCK_RECENT_QUALITY_ACTIVITIES,
} from "@/data/catalogueQuality.mock";

interface LowerQualityPanelsProps {
  onOpenCompareDuplicate: () => void;
  showToast: (msg: string) => void;
}

export function LowerQualityPanels({
  onOpenCompareDuplicate,
  showToast,
}: LowerQualityPanelsProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* First Row of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[1.4fr_1.1fr_1.1fr_1.4fr] gap-3.5 items-stretch">
        {/* Card 1: Duplicate Product Candidates */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Duplicate Product Candidates
            </h3>

            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,0.8fr)_auto] gap-x-1 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Candidate Pair</div>
                <div className="text-right">Confidence</div>
                <div className="text-center">Suggested Action</div>
                <div className="text-right">Actions</div>
              </div>

              <div className="divide-y divide-slate-100">
                {MOCK_DUPLICATE_CANDIDATES.map((cand) => (
                  <div
                    key={cand.id}
                    className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,0.8fr)_auto] gap-x-1 py-1.5 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={cand.pairName}>
                      {cand.pairName}
                    </div>
                    <div className="text-right font-mono font-bold text-slate-800">{cand.confidenceScore}%</div>
                    <div className="text-center">
                      <span className="text-slate-600 font-semibold text-[8.5px]">{cand.suggestedAction}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={onOpenCompareDuplicate}
                        className="px-1.5 py-0.5 rounded border border-line bg-white text-[8.5px] font-bold text-[#671021] hover:bg-slate-50"
                      >
                        Review
                      </button>
                      <button
                        onClick={onOpenCompareDuplicate}
                        className="px-1.5 py-0.5 rounded bg-[#671021] text-white text-[8.5px] font-bold hover:bg-[#520d1a]"
                      >
                        Merge
                      </button>
                      <button
                        onClick={() => showToast(`Ignored duplicate candidate ${cand.id}`)}
                        className="px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 text-[8.5px] font-bold hover:bg-slate-100"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Duplicate Product Candidates...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View all 186 candidates &rarr;
          </button>
        </div>

        {/* Card 2: Incomplete Product Records */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Incomplete Product Records
            </h3>

            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,0.6fr)_minmax(0,0.6fr)] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Reason</div>
                <div className="text-right">Records</div>
                <div className="text-right">% of Total</div>
              </div>

              <div className="divide-y divide-slate-100">
                {MOCK_INCOMPLETE_RECORDS.map((inc) => (
                  <div
                    key={inc.id}
                    className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,0.6fr)_minmax(0,0.6fr)] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={inc.reason}>
                      {inc.reason}
                    </div>
                    <div className="text-right font-mono font-bold text-slate-800">{inc.recordsCount}</div>
                    <div className="text-right font-mono text-slate-500">{inc.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Incomplete Records Analysis...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View incomplete records &rarr;
          </button>
        </div>

        {/* Card 3: Validation Failure Summary */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Validation Failure Summary
            </h3>

            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.6fr)_minmax(0,0.8fr)] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Failed Rule</div>
                <div className="text-right">Failures</div>
                <div className="text-right">%</div>
              </div>

              <div className="divide-y divide-slate-100">
                {MOCK_VALIDATION_FAILURES.map((val) => (
                  <div
                    key={val.id}
                    className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.6fr)_minmax(0,0.8fr)] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={val.failedRule}>
                      {val.failedRule}
                    </div>
                    <div className="text-right font-mono font-bold text-slate-800">{val.failuresCount}</div>
                    <div className="flex items-center justify-end gap-1.5 font-mono text-slate-500">
                      <span>{val.percentage}%</span>
                      <div className="w-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${val.percentage * 2}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Validation Failures Manager...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View all validation failures &rarr;
          </button>
        </div>

        {/* Card 4: Publication Readiness Impact */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Publication Readiness Impact
            </h3>

            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] gap-x-1 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Channel</div>
                <div className="text-right">Eligible</div>
                <div className="text-right">Blocked</div>
                <div className="text-right">Missing Media</div>
                <div className="text-right">Policy Issues</div>
              </div>

              <div className="divide-y divide-slate-100">
                {MOCK_PUBLICATION_READINESS.map((pub) => (
                  <div
                    key={pub.id}
                    className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] gap-x-1 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate">{pub.channel}</div>
                    <div className="text-right font-mono font-bold text-emerald-600">{pub.eligible.toLocaleString()}</div>
                    <div className="text-right font-mono font-bold text-rose-600">{pub.blocked}</div>
                    <div className="text-right font-mono text-amber-600">{pub.missingMedia}</div>
                    <div className="text-right font-mono text-slate-600">{pub.policyIssues}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Readiness Dashboard...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View readiness impact &rarr;
          </button>
        </div>
      </div>

      {/* Second Row of 3 Cards: Recent Catalogue Quality Activity receives wide 2.35fr column */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[0.85fr_1.2fr_2.35fr] gap-3.5 items-stretch">
        {/* Card 5: Merge & Resolution Performance */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Merge & Resolution Performance
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
              <div>
                <span className="text-slate-500 font-medium block">Avg merge review time</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">{MOCK_RESOLUTION_PERFORMANCE.avgMergeReviewTime}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Auto-merge approved</span>
                <span className="font-bold text-emerald-600 font-mono text-[12px]">{MOCK_RESOLUTION_PERFORMANCE.autoMergeApproved}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Manual merges</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">{MOCK_RESOLUTION_PERFORMANCE.manualMerges}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Rejected merges</span>
                <span className="font-bold text-rose-600 font-mono text-[12px]">{MOCK_RESOLUTION_PERFORMANCE.rejectedMerges}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Reopened cases</span>
                <span className="font-bold text-amber-600 font-mono text-[12px]">{MOCK_RESOLUTION_PERFORMANCE.reopenedCases}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Rollback rate</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">{MOCK_RESOLUTION_PERFORMANCE.rollbackRate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Performance Dashboard...")}
            className="mt-auto pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View performance dashboard &rarr;
          </button>
        </div>

        {/* Card 6: Quality Governance Summary */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Quality Governance Summary
            </h3>

            <div className="space-y-1.5 text-[10px] mb-3">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Total active rules</span>
                <span className="font-bold text-slate-800 font-mono">{MOCK_GOVERNANCE_SUMMARY.totalActiveRules}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Scheduled validations</span>
                <span className="font-bold text-slate-800 font-mono">{MOCK_GOVERNANCE_SUMMARY.scheduledValidations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Pending approvals</span>
                <span className="font-bold text-amber-600 font-mono">{MOCK_GOVERNANCE_SUMMARY.pendingApprovals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Open quality cases</span>
                <span className="font-bold text-[#671021] font-mono">{MOCK_GOVERNANCE_SUMMARY.openQualityCases.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-line">
                <span className="text-slate-500 font-medium">Audit pass rate</span>
                <span className="font-bold text-emerald-600 font-mono">{MOCK_GOVERNANCE_SUMMARY.auditPassRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Latest run result</span>
                <span className="font-bold text-emerald-600 font-mono">{MOCK_GOVERNANCE_SUMMARY.latestRunResult} Success</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Governance Dashboard...")}
            className="mt-auto pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View governance dashboard &rarr;
          </button>
        </div>

        {/* Card 7: Recent Catalogue Quality Activity (Wide card matching reference image C14) */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate">
              Recent Catalogue Quality Activity
            </h3>

            <div className="w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(150px,1.5fr)_minmax(90px,0.75fr)_minmax(130px,1.15fr)_minmax(150px,1.2fr)_minmax(62px,auto)] gap-x-2 pb-1 mb-1 border-b border-line font-sans font-bold text-[9px] text-slate-700 items-center">
                <div>Activity</div>
                <div>User</div>
                <div>Action</div>
                <div>Date & Time</div>
                <div className="text-right">Result</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {MOCK_RECENT_QUALITY_ACTIVITIES.map((act) => (
                  <div
                    key={act.id}
                    className="grid grid-cols-[minmax(150px,1.5fr)_minmax(90px,0.75fr)_minmax(130px,1.15fr)_minmax(150px,1.2fr)_minmax(62px,auto)] gap-x-2 py-1.5 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={act.activity}>
                      {act.activity}
                    </div>
                    <div className="text-slate-600 whitespace-nowrap truncate" title={act.user}>
                      {act.user}
                    </div>
                    <div className="font-sans text-slate-600 whitespace-nowrap truncate" title={act.action}>
                      {act.action}
                    </div>
                    <div className="text-slate-500 font-mono text-[9px] whitespace-nowrap">{act.dateTime}</div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-emerald-600 font-bold font-sans text-[8.5px]">Success</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Full Activity Log...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View full activity log &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
