"use client";

import React from "react";
import Link from "next/link";
import { ReportingRailData } from "@/data/marketingReportsAudit.mock";
import {
  FileText,
  CalendarPlus,
  Download,
  Upload,
  AlertTriangle,
  ShieldCheck,
  Clock,
  BookOpen,
} from "lucide-react";

interface ReportingOperationsRailProps {
  railData: ReportingRailData;
  onCreateScheduledReport?: () => void;
  onFilterQueue?: (queueKey: string) => void;
}

export function ReportingOperationsRail({
  railData,
  onCreateScheduledReport,
  onFilterQueue,
}: ReportingOperationsRailProps) {
  const {
    healthScore,
    healthLabel,
    reportingSummary,
    exportSummary,
    importSummary,
    auditSummary,
    retentionSummary,
    exceptionsSummary,
    quickQueues,
  } = railData;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. REPORTING & AUDIT HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Reporting & Audit Health</h3>

        {/* Radial Score Gauge */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-gray-100"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-emerald-600 transition-all duration-500 ease-out"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-gray-900 leading-none">
                {healthScore}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">/100</span>
            </div>
          </div>
          <span className="mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {healthLabel}
          </span>
        </div>
      </div>

      {/* 2. REPORTING SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Reporting Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Reports Generated</span>
          <span className="font-bold text-gray-900">{reportingSummary.reportsGenerated}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Scheduled Reports</span>
          <span className="font-bold text-gray-900">{reportingSummary.scheduledReports}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Active Schedules</span>
          <span className="font-bold text-emerald-700">{reportingSummary.activeSchedules}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Failed Reports</span>
          <span className="font-bold text-rose-700">{reportingSummary.failedReports}</span>
        </div>
      </div>

      {/* 3. EXPORT SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Export Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Jobs</span>
          <span className="font-bold text-gray-900">{exportSummary.jobs}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Completed</span>
          <span className="font-bold text-emerald-700">{exportSummary.completed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Running</span>
          <span className="font-bold text-blue-700">{exportSummary.running}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Failed</span>
          <span className="font-bold text-rose-700">{exportSummary.failed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Records Exported</span>
          <span className="font-mono text-gray-900 font-bold">{exportSummary.recordsExported}</span>
        </div>
      </div>

      {/* 4. IMPORT SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Import Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Jobs</span>
          <span className="font-bold text-gray-900">{importSummary.jobs}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Completed</span>
          <span className="font-bold text-emerald-700">{importSummary.completed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warnings</span>
          <span className="font-bold text-amber-700">{importSummary.warnings}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Failed</span>
          <span className="font-bold text-rose-700">{importSummary.failed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Records Imported</span>
          <span className="font-mono text-gray-900 font-bold">{importSummary.recordsImported}</span>
        </div>
      </div>

      {/* 5. AUDIT SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Audit Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Events</span>
          <span className="font-mono text-gray-900 font-bold">{auditSummary.events}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">User Actions</span>
          <span className="font-mono text-gray-700 font-bold">{auditSummary.userActions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">System Actions</span>
          <span className="font-mono text-gray-700 font-bold">{auditSummary.systemActions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Critical Audit Gaps</span>
          <span className="font-bold text-emerald-700">{auditSummary.criticalGaps}</span>
        </div>
      </div>

      {/* 6. RETENTION SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Retention Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Expiring Soon</span>
          <span className="font-bold text-orange-700">{retentionSummary.expiringSoon}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Expired</span>
          <span className="font-bold text-rose-700">{retentionSummary.expired}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">On Hold</span>
          <span className="font-bold text-amber-700">{retentionSummary.onHold}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Policy Exceptions</span>
          <span className="font-bold text-purple-700">{retentionSummary.policyExceptions}</span>
        </div>
      </div>

      {/* 7. EXCEPTIONS SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Exceptions Summary
        </h3>
        <div className="grid grid-cols-4 gap-1 text-center text-xs">
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Open</span>
            <span className="font-bold text-rose-700">{exceptionsSummary.open}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">High</span>
            <span className="font-bold text-rose-700">{exceptionsSummary.high}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Warnings</span>
            <span className="font-bold text-amber-700">{exceptionsSummary.warnings}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Info</span>
            <span className="font-bold text-gray-600">{exceptionsSummary.information}</span>
          </div>
        </div>
      </div>

      {/* 8. QUICK QUEUES */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Quick Queues
        </h3>

        <button
          onClick={() => onFilterQueue?.("failedExports")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-rose-600" />
            <span>Failed Exports</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.failedExports}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("failedImports")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Upload className="w-3.5 h-3.5 text-rose-600" />
            <span>Failed Imports</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.failedImports}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("privacyReviews")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Privacy Reviews</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[10px]">
            {quickQueues.privacyReviews}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("approvalRequired")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Approval Required</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[10px]">
            {quickQueues.approvalRequired}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("mappingWarnings")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Mapping Warnings</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
            {quickQueues.mappingWarnings}
          </span>
        </button>

        <button
          onClick={() => onFilterQueue?.("retentionExpiring")}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>Retention Expiring</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-orange-600 text-white font-bold text-[10px]">
            {quickQueues.retentionExpiring}
          </span>
        </button>
      </div>

      {/* 9. FINAL REPORTING ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Reporting Actions
        </h3>

        <button
          onClick={onCreateScheduledReport}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg bg-[#800020] text-white font-bold transition-colors cursor-pointer"
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>+ Create Scheduled Report</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Generate Report</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Marketing Data</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import Marketing Data</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Transfer Exceptions</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Review Audit Trail</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Review Retention Queue</span>
        </button>
      </div>
    </aside>
  );
}
