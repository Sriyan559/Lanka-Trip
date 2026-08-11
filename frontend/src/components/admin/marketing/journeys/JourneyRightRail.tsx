"use client";

import React from "react";
import Link from "next/link";
import { JourneyRightRailData } from "@/data/customerJourneys.mock";
import {
  Plus,
  ShieldAlert,
  SlidersHorizontal,
  FileText,
  CheckSquare,
  Activity,
} from "lucide-react";

export function JourneyRightRail({
  railData,
  onRecalculateSelected,
}: {
  railData: JourneyRightRailData;
  onRecalculateSelected?: () => void;
}) {
  const {
    healthScore,
    metrics,
    journeySummary,
    customerFlow,
    deliverySummary,
    exceptionsSummary,
    approvalSummary,
    quickQueues,
  } = railData;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 font-sans">
      {/* 1. AUTOMATION OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Automation Operations Health</h3>
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

      {/* 2. JOURNEY SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Journey Summary
        </h3>

        <div className="space-y-1 text-xs font-medium">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Journeys</span>
            <span className="font-bold text-gray-900 font-mono">{journeySummary.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Running</span>
            <span className="font-bold text-emerald-700 font-mono">{journeySummary.running}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Scheduled</span>
            <span className="font-bold text-blue-700 font-mono">{journeySummary.scheduled}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Draft</span>
            <span className="font-bold text-gray-700 font-mono">{journeySummary.draft}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Paused</span>
            <span className="font-bold text-amber-700 font-mono">{journeySummary.paused}</span>
          </div>
        </div>
      </div>

      {/* 3. CUSTOMER FLOW SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Customer Flow Summary
        </h3>

        <div className="space-y-1 text-xs font-medium">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Customers</span>
            <span className="font-bold text-gray-900 font-mono">{customerFlow.active}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Entered Today</span>
            <span className="font-bold text-blue-700 font-mono">{customerFlow.enteredToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed Today</span>
            <span className="font-bold text-gray-800 font-mono">{customerFlow.completedToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Converted Today</span>
            <span className="font-bold text-emerald-700 font-mono">{customerFlow.convertedToday}</span>
          </div>
        </div>
      </div>

      {/* 4. DELIVERY SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Delivery Summary
        </h3>

        <div className="space-y-1.5 text-xs font-medium">
          {deliverySummary.map((d) => (
            <div key={d.channel} className="flex items-center justify-between">
              <span className="text-gray-700">{d.channel}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900 font-mono text-[11px]">{d.score}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    d.status === "Clear" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span
                  className={`text-[9.5px] font-bold ${
                    d.status === "Clear" ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {d.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. EXCEPTIONS SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Exceptions Summary
        </h3>

        <div className="grid grid-cols-4 gap-1 text-center font-sans text-xs">
          <div>
            <span className="text-gray-400 block text-[8.5px]">Open</span>
            <span className="font-extrabold text-amber-700 text-xs">{exceptionsSummary.open}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[8.5px]">Critical</span>
            <span className="font-extrabold text-rose-600 text-xs">{exceptionsSummary.critical}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[8.5px]">Warnings</span>
            <span className="font-extrabold text-amber-600 text-xs">{exceptionsSummary.warnings}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[8.5px]">Info</span>
            <span className="font-extrabold text-blue-600 text-xs">{exceptionsSummary.info}</span>
          </div>
        </div>
      </div>

      {/* 6. APPROVAL SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Approval Summary
        </h3>

        <div className="grid grid-cols-2 gap-1 text-center font-sans text-xs">
          <div>
            <span className="text-gray-400 block text-[9px]">Pending Approvals</span>
            <span className="font-extrabold text-indigo-700 text-xs">{approvalSummary.pending}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px]">Overdue Approvals</span>
            <span className="font-extrabold text-rose-600 text-xs">{approvalSummary.overdue}</span>
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

      {/* 8. FINAL JOURNEY ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5">
          Final Journey Actions
        </h3>

        <div className="flex flex-col gap-1.5">
          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Journey</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Review Approval Queue</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Review Journey Exceptions</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open Collision Analysis</span>
          </button>

          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors">
            <Activity className="w-3.5 h-3.5" />
            <span>View Automation Health</span>
          </button>

          <Link
            href="/admin/marketing/reports-audit"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/30 hover:bg-rose-50/50 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Audit Trail</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
