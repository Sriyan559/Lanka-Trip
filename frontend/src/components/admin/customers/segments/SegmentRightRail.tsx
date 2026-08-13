"use client";

import React from "react";
import { AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw, Download } from "lucide-react";
import {
  PriorityAlertItem,
  SegmentMembershipSummary,
  SegmentConflictSummary,
  SegmentRecalculationSummary,
  SegmentQuickQueues,
} from "@/types/customer-segments";

interface SegmentRightRailProps {
  priorityAlerts: PriorityAlertItem[];
  membershipSummary?: SegmentMembershipSummary | null;
  conflictSummary?: SegmentConflictSummary | null;
  recalculationSummary?: SegmentRecalculationSummary | null;
  quickQueues?: SegmentQuickQueues | null;
  typeDistribution?: { name: string; value: number }[];
  segmentationHealth?: number | null;
  totalSegments?: number;
  activeSegments?: number;
  pendingApproval?: number;
  draftSegments?: number;
  showToast: (msg: string) => void;
  onReviewConflicts: () => void;
  onRecalculateSegments: () => void;
  onApproveDrafts: () => void;
  onExportReport: () => void;
}

export function SegmentRightRail({
  priorityAlerts,
  membershipSummary,
  conflictSummary,
  recalculationSummary,
  quickQueues,
  typeDistribution = [],
  segmentationHealth = null,
  totalSegments = 0,
  activeSegments = 0,
  pendingApproval = 0,
  draftSegments = 0,
  showToast,
  onReviewConflicts,
  onRecalculateSegments,
  onApproveDrafts,
  onExportReport,
}: SegmentRightRailProps) {
  const healthScoreStr = segmentationHealth !== null ? `${segmentationHealth}` : "—";

  const totalInSegments = membershipSummary?.totalInSegments ?? 0;
  const newMembers = membershipSummary?.newMembers ?? 0;
  const removedMembers = membershipSummary?.removedMembers ?? 0;

  const noConflict = conflictSummary?.noConflict ?? max(0, totalSegments - (quickQueues?.conflictsToResolve ?? 0));
  const conflictWarning = conflictSummary?.warning ?? 0;
  const conflictCount = conflictSummary?.conflict ?? (quickQueues?.conflictsToResolve ?? 0);

  const recalScheduled = recalculationSummary?.scheduled ?? (quickQueues?.scheduledRecals ?? 0);
  const recalInProgress = recalculationSummary?.inProgress ?? 0;
  const recalFailed = recalculationSummary?.failed ?? 0;

  const qPending = quickQueues?.pendingApprovals ?? pendingApproval;
  const qReval = quickQueues?.revalidationDue ?? 0;
  const qConflicts = quickQueues?.conflictsToResolve ?? conflictCount;
  const qRecals = quickQueues?.scheduledRecals ?? recalScheduled;

  return (
    <div className="flex flex-col gap-3.5 min-w-0">
      {/* A. Segmentation Health Card */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            A. Segmentation Health
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
            {segmentationHealth !== null ? "Good / Stable" : "Unmeasured"}
          </span>
        </div>

        {/* Circular Score */}
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-3">
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke={segmentationHealth !== null ? "#059669" : "#cbd5e1"}
                strokeWidth="4"
                strokeDasharray="113"
                strokeDashoffset={segmentationHealth !== null ? 113 - (113 * segmentationHealth) / 100 : 113}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">{healthScoreStr}</span>
          </div>
          <div>
            <span className="font-bold text-slate-800 text-[12px] block">
              {segmentationHealth !== null ? `${segmentationHealth} / 100 Health` : "— / 100 Health"}
            </span>
            <span className="text-[10px] text-slate-500 block">
              {segmentationHealth !== null ? "Segmentation governance optimal" : "Health score unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* B. Priority Segment Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
          B. Priority Segment Alerts
        </h4>
        <div className="space-y-1.5">
          {priorityAlerts.length === 0 ? (
            <div className="p-3 text-center text-slate-400 font-mono text-[10.5px]">
              No priority segment alerts
            </div>
          ) : (
            priorityAlerts.map((alt) => (
              <div
                key={alt.id}
                className={`p-2 rounded border flex items-center justify-between gap-2 text-[10px] ${
                  alt.severity === "critical"
                    ? "bg-rose-50 border-rose-200 text-rose-800"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-4 h-4 rounded-full font-bold flex items-center justify-center text-[9px] ${
                      alt.severity === "critical" ? "bg-rose-600 text-white" : "bg-amber-500 text-white"
                    }`}
                  >
                    {alt.count}
                  </span>
                  <span className="font-bold">{alt.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast(`Executing alert action: ${alt.message}`)}
                  className="text-[9px] font-bold underline cursor-pointer flex-shrink-0"
                >
                  {alt.actionText}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* C. Segment Status Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          C. Segment Status Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-600">Active</span>
            <span className="font-bold font-mono text-emerald-600">{activeSegments}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Draft</span>
            <span className="font-bold font-mono text-blue-600">{draftSegments}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Pending Approval</span>
            <span className="font-bold font-mono text-amber-600">{pendingApproval}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Scheduled</span>
            <span className="font-bold font-mono text-purple-600">{recalScheduled}</span>
          </div>
        </div>
      </div>

      {/* D. Segment Type Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          D. Segment Type Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          {typeDistribution.length === 0 ? (
            <span className="text-slate-400 font-mono text-[9.5px]">No segment types configured</span>
          ) : (
            typeDistribution.map((item) => (
              <div key={item.name} className="flex justify-between">
                <span className="text-slate-600">{item.name}</span>
                <span className="font-bold font-mono text-slate-800">{item.value}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* E. Membership Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          E. Membership Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-600">Total in Segments</span>
            <span className="font-bold font-mono text-slate-800">{totalInSegments.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">New Members</span>
            <span className="font-bold font-mono text-emerald-600">+{newMembers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Removed Members</span>
            <span className="font-bold font-mono text-rose-600">-{removedMembers.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* F. Conflict Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          F. Conflict Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-600">No Conflict</span>
            <span className="font-bold font-mono text-emerald-600">{noConflict}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Warning</span>
            <span className="font-bold font-mono text-amber-600">{conflictWarning}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Conflict</span>
            <span className="font-bold font-mono text-rose-600">{conflictCount}</span>
          </div>
        </div>
      </div>

      {/* G. Recalculation Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          G. Recalculation Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-600">Scheduled</span>
            <span className="font-bold font-mono text-purple-600">{recalScheduled}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">In Progress</span>
            <span className="font-bold font-mono text-amber-600">{recalInProgress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Failed</span>
            <span className="font-bold font-mono text-rose-600">{recalFailed}</span>
          </div>
        </div>
      </div>

      {/* H. Quick Queues */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          H. Quick Queues
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Pending Approvals</span>
            <span className="font-mono font-bold text-amber-700 bg-amber-100 px-1.5 rounded">{qPending}</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Revalidation Due</span>
            <span className="font-mono font-bold text-rose-700 bg-rose-100 px-1.5 rounded">{qReval}</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Conflicts to Resolve</span>
            <span className="font-mono font-bold text-rose-700 bg-rose-100 px-1.5 rounded">{qConflicts}</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Scheduled Recalcs</span>
            <span className="font-mono font-bold text-purple-700 bg-purple-100 px-1.5 rounded">{qRecals}</span>
          </div>
        </div>
      </div>

      {/* I. Final Segment Actions */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px] space-y-2">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          I. Final Segment Actions
        </h4>

        <button
          type="button"
          onClick={onReviewConflicts}
          className="w-full py-2 bg-[#671021] text-white rounded font-bold hover:bg-[#520d1a] transition-colors cursor-pointer text-center block"
        >
          Review Conflicts
        </button>

        <button
          type="button"
          onClick={onRecalculateSegments}
          className="w-full py-2 bg-[#671021] text-white rounded font-bold hover:bg-[#520d1a] transition-colors cursor-pointer text-center block"
        >
          Recalculate Segments
        </button>

        <button
          type="button"
          onClick={onApproveDrafts}
          className={`w-full py-2 border rounded font-bold transition-colors text-center block ${
            pendingApproval > 0
              ? "bg-white border-line text-slate-700 hover:bg-slate-50 cursor-pointer"
              : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={pendingApproval === 0}
        >
          Approve Drafts {pendingApproval > 0 ? `(${pendingApproval})` : ""}
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="w-full py-2 bg-white border border-line rounded text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer text-center block"
        >
          Export Segment Report
        </button>
      </div>
    </div>
  );
}

function max(a: number, b: number) {
  return a > b ? a : b;
}
