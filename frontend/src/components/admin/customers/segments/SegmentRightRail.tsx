"use client";

import React from "react";
import { AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw, Download } from "lucide-react";
import { PriorityAlertItem } from "@/types/customer-segments";

interface SegmentRightRailProps {
  priorityAlerts: PriorityAlertItem[];
  showToast: (msg: string) => void;
  onReviewConflicts: () => void;
  onRecalculateSegments: () => void;
  onApproveDrafts: () => void;
  onExportReport: () => void;
}

export function SegmentRightRail({
  priorityAlerts,
  showToast,
  onReviewConflicts,
  onRecalculateSegments,
  onApproveDrafts,
  onExportReport,
}: SegmentRightRailProps) {
  const healthMetrics = [
    { label: "Rule Accuracy", val: 92 },
    { label: "Data Quality", val: 88 },
    { label: "Consent Coverage", val: 84 },
    { label: "Overlap Control", val: 78 },
    { label: "Schedule Reliability", val: 91 },
    { label: "Approval Governance", val: 90 },
    { label: "Revalidation Readiness", val: 72 },
    { label: "Conflict Resolution", val: 76 },
    { label: "Audit Readiness", val: 85 },
  ];

  return (
    <div className="flex flex-col gap-3.5 min-w-0">
      {/* A. Segmentation Health Card */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            A. Segmentation Health
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
            Good / Stable
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
                stroke="#059669"
                strokeWidth="4"
                strokeDasharray="113"
                strokeDashoffset="12"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">89</span>
          </div>
          <div>
            <span className="font-bold text-slate-800 text-[12px] block">89 / 100 Health</span>
            <span className="text-[10px] text-slate-500 block">Segmentation governance optimal</span>
          </div>
        </div>

        {/* Health Bars */}
        <div className="space-y-1.5">
          {healthMetrics.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[9.5px] mb-0.5">
                <span className="text-slate-600 font-medium">{item.label}</span>
                <span className="font-bold text-slate-800 font-mono">{item.val}%</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B. Priority Segment Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
          B. Priority Segment Alerts
        </h4>
        <div className="space-y-1.5">
          {priorityAlerts.map((alt) => (
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
          ))}
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
            <span className="font-bold font-mono text-emerald-600">104 (81.3%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Draft</span>
            <span className="font-bold font-mono text-blue-600">14 (10.9%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Pending Approval</span>
            <span className="font-bold font-mono text-amber-600">8 (6.3%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Scheduled</span>
            <span className="font-bold font-mono text-purple-600">32 (25.0%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Retired</span>
            <span className="font-bold font-mono text-slate-500">7 (5.5%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Error / Failed</span>
            <span className="font-bold font-mono text-rose-600">3 (2.3%)</span>
          </div>
        </div>
      </div>

      {/* D. Segment Type Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          D. Segment Type Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-600">Dynamic</span>
            <span className="font-bold font-mono text-slate-800">82 (64.1%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Static Group</span>
            <span className="font-bold font-mono text-slate-800">46 (35.9%)</span>
          </div>
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
            <span className="font-bold font-mono text-slate-800">186,420</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">New Members</span>
            <span className="font-bold font-mono text-emerald-600">9,185</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Removed Members</span>
            <span className="font-bold font-mono text-rose-600">4,722</span>
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
            <span className="font-bold font-mono text-emerald-600">117 (91.4%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Warning</span>
            <span className="font-bold font-mono text-amber-600">6 (4.7%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Conflict</span>
            <span className="font-bold font-mono text-rose-600">5 (3.9%)</span>
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
            <span className="font-bold font-mono text-purple-600">32 (25.0%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">In Progress</span>
            <span className="font-bold font-mono text-amber-600">6 (4.7%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Failed</span>
            <span className="font-bold font-mono text-rose-600">3 (2.3%)</span>
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
            <span className="font-mono font-bold text-amber-700 bg-amber-100 px-1.5 rounded">8</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Revalidation Due</span>
            <span className="font-mono font-bold text-rose-700 bg-rose-100 px-1.5 rounded">22</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Conflicts to Resolve</span>
            <span className="font-mono font-bold text-rose-700 bg-rose-100 px-1.5 rounded">11</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="font-bold text-slate-700">Scheduled Recalcs</span>
            <span className="font-mono font-bold text-purple-700 bg-purple-100 px-1.5 rounded">32</span>
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
          className="w-full py-2 bg-white border border-line rounded text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer text-center block"
        >
          Approve Drafts
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
