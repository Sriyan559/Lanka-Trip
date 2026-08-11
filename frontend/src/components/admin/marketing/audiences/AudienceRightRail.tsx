"use client";

import React from "react";
import Link from "next/link";
import { AudienceRightRailData } from "@/data/marketingAudience.mock";
import {
  Plus,
  RefreshCw,
  ShieldAlert,
  SlidersHorizontal,
  FileText,
} from "lucide-react";

export function AudienceRightRail({
  railData,
  onRecalculateSelected,
}: {
  railData: AudienceRightRailData;
  onRecalculateSelected?: () => void;
}) {
  const {
    healthScore,
    metrics,
    audienceSummary,
    customerReach,
    eligibility,
    refreshSummary,
    governanceSummary,
    quickQueues,
  } = railData;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 font-sans">
      {/* 1. AUDIENCE OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Audience Operations Health</h3>
          <span className="text-[10px] text-gray-400 font-medium">View details</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Health Donut Circle */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-gray-900 leading-none">
                {healthScore}
              </span>
              <span className="text-[8px] font-bold text-gray-400">/100</span>
            </div>
          </div>

          {/* Metric list */}
          <div className="flex-1 min-w-0 space-y-1 text-[10px]">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {m.label}
                </span>
                <span className="font-bold text-gray-900 font-mono">{m.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AUDIENCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Audience Summary
        </h3>

        <div className="space-y-1 text-xs font-medium">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Saved</span>
            <span className="font-bold text-gray-900 font-mono">{audienceSummary.totalSaved}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Active</span>
            <span className="font-bold text-emerald-700 font-mono">{audienceSummary.active}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Draft</span>
            <span className="font-bold text-gray-700 font-mono">{audienceSummary.draft}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Archived</span>
            <span className="font-bold text-gray-500 font-mono">{audienceSummary.archived}</span>
          </div>
        </div>
      </div>

      {/* 3. CUSTOMER REACH SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Customer Reach Summary
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans">
          <div>
            <span className="text-gray-400 block text-[9px]">Marketable</span>
            <span className="font-bold text-gray-900 text-xs">{customerReach.marketable}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Suppressed</span>
            <span className="font-bold text-rose-600 text-xs">{customerReach.suppressed}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Reach Potential</span>
            <span className="font-bold text-emerald-700 text-xs">{customerReach.potential}</span>
          </div>
        </div>
      </div>

      {/* 4. ELIGIBILITY SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Eligibility Summary
        </h3>

        <div className="space-y-1 text-xs font-medium">
          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="font-bold text-gray-900 font-mono">{eligibility.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">SMS</span>
            <span className="font-bold text-gray-900 font-mono">{eligibility.sms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Push</span>
            <span className="font-bold text-gray-900 font-mono">{eligibility.push}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Paid Media</span>
            <span className="font-bold text-gray-900 font-mono">{eligibility.paidMedia}</span>
          </div>
        </div>
      </div>

      {/* 5. REFRESH SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Refresh Summary
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans text-xs">
          <div>
            <span className="text-gray-400 block text-[9px]">Healthy</span>
            <span className="font-extrabold text-emerald-700 text-xs">{refreshSummary.healthy}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Needs Refresh</span>
            <span className="font-extrabold text-amber-600 text-xs">{refreshSummary.needsRefresh}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Failed</span>
            <span className="font-extrabold text-rose-600 text-xs">{refreshSummary.failed}</span>
          </div>
        </div>
      </div>

      {/* 6. GOVERNANCE SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Governance Summary
        </h3>

        <div className="grid grid-cols-3 gap-1 text-center font-sans text-xs">
          <div>
            <span className="text-gray-400 block text-[9px]">Clear</span>
            <span className="font-extrabold text-emerald-700 text-xs">{governanceSummary.clear}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Warnings</span>
            <span className="font-extrabold text-amber-600 text-xs">{governanceSummary.warnings}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Blocked</span>
            <span className="font-extrabold text-rose-600 text-xs">{governanceSummary.blocked}</span>
          </div>
        </div>
      </div>

      {/* 7. QUICK QUEUES */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Quick Queues
        </h3>

        <div className="space-y-1.5 text-xs font-medium">
          {quickQueues.map((qq) => (
            <div key={qq.label} className="flex items-center justify-between">
              <span className="text-gray-700 flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    qq.severity === "red"
                      ? "bg-rose-500"
                      : qq.severity === "purple"
                      ? "bg-purple-500"
                      : "bg-amber-500"
                  }`}
                />
                {qq.label}
              </span>
              <span className="font-bold text-gray-900 font-mono text-[11px]">{qq.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. FINAL AUDIENCE ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Final Audience Actions
        </h3>

        <div className="flex flex-col gap-1.5">
          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Audience</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Segment</span>
          </button>

          <button
            onClick={onRecalculateSelected}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate Selected</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Review Suppressions</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open Overlap Analysis</span>
          </button>

          <Link
            href="/admin/marketing/reports-audit"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Audience Audit</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
