"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ChevronRight,
  AlertCircle,
  ShieldAlert,
  Shield,
  CheckSquare,
  RotateCcw,
  Search,
  FileText,
} from "lucide-react";
import { ComplaintOperationsRailData } from "./types";

interface ComplaintOperationsRailProps {
  data: ComplaintOperationsRailData;
}

export function ComplaintOperationsRail({ data }: ComplaintOperationsRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full h-auto self-start">
      {/* 0. Complaint & Recovery Operations Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Activity size={14} className="text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900">Complaint &amp; Recovery Operations Health</h4>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${data.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">{data.healthScore}</span>
              <span className="text-[9px] text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Response SLA</span>
              <span className="font-bold text-emerald-700">{data.responseSlaPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Resolution Stability</span>
              <span className="font-bold text-amber-700">{data.resolutionStabilityPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Customer Confidence</span>
              <span className="font-bold text-amber-700">{data.customerConfidencePercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Recovery Effectiveness</span>
              <span className="font-bold text-emerald-700">{data.recoveryEffectivenessPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Communication Continuity</span>
              <span className="font-bold text-emerald-700">{data.communicationContinuityPercent}%</span>
            </div>
          </div>
        </div>

        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View Health Analytics
        </Link>
      </div>

      {/* 1. Complaint Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">1. Complaint Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Open</span><span className="font-bold text-slate-900 text-xs">{data.complaintSummary.open}</span></div>
          <div><span className="text-slate-400 block font-medium">Critical</span><span className="font-bold text-red-600 text-xs">{data.complaintSummary.critical}</span></div>
          <div><span className="text-slate-400 block font-medium">Escalated</span><span className="font-bold text-orange-600 text-xs">{data.complaintSummary.escalated}</span></div>
          <div><span className="text-slate-400 block font-medium">Executive</span><span className="font-bold text-purple-700 text-xs">{data.complaintSummary.executive}</span></div>
          <div><span className="text-slate-400 block font-medium">Reopened</span><span className="font-bold text-blue-700 text-xs">{data.complaintSummary.reopened}</span></div>
        </div>
        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View Complaints
        </Link>
      </div>

      {/* 2. Recovery Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">2. Recovery Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Active Plans</span><span className="font-bold text-slate-900 text-xs">{data.recoverySummary.activePlans}</span></div>
          <div><span className="text-slate-400 block font-medium">Pending</span><span className="font-bold text-amber-700 text-xs">{data.recoverySummary.pending}</span></div>
          <div><span className="text-slate-400 block font-medium">Completed Today</span><span className="font-bold text-emerald-700 text-xs">{data.recoverySummary.completedToday}</span></div>
          <div><span className="text-slate-400 block font-medium">Customer Accepted</span><span className="font-bold text-emerald-700 text-xs">{data.recoverySummary.customerAccepted}</span></div>
          <div><span className="text-slate-400 block font-medium">Customer Rejected</span><span className="font-bold text-red-600 text-xs">{data.recoverySummary.customerRejected}</span></div>
        </div>
        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View Recovery
        </Link>
      </div>

      {/* 3. Remedy Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">3. Remedy Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Pending Approval</span><span className="font-bold text-amber-700 text-xs">{data.remedySummary.pendingApproval}</span></div>
          <div><span className="text-slate-400 block font-medium">Approved</span><span className="font-bold text-emerald-700 text-xs">{data.remedySummary.approved}</span></div>
          <div><span className="text-slate-400 block font-medium">Rejected</span><span className="font-bold text-red-600 text-xs">{data.remedySummary.rejected}</span></div>
          <div><span className="text-slate-400 block font-medium">Cash Refund</span><span className="font-bold text-slate-900 text-xs">{data.remedySummary.cashRefund}</span></div>
          <div><span className="text-slate-400 block font-medium">Goodwill</span><span className="font-bold text-slate-900 text-xs">{data.remedySummary.goodwill}</span></div>
        </div>
        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View Remedies
        </Link>
      </div>

      {/* 4. SLA Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">4. SLA Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Within Target</span><span className="font-bold text-emerald-700 text-xs">{data.slaSummary.withinTargetPercent}%</span></div>
          <div><span className="text-slate-400 block font-medium">At Risk</span><span className="font-bold text-amber-700 text-xs">{data.slaSummary.atRisk}</span></div>
          <div><span className="text-slate-400 block font-medium">Breached</span><span className="font-bold text-red-600 text-xs">{data.slaSummary.breached}</span></div>
          <div><span className="text-slate-400 block font-medium">Avg Complaint Age</span><span className="font-bold text-slate-900 text-xs">{data.slaSummary.avgComplaintAge}</span></div>
        </div>
        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View SLA
        </Link>
      </div>

      {/* 5. Root Cause Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">5. Root Cause Summary</h4>
        <div className="flex flex-col gap-1.5 text-[10px]">
          {data.rootCauseSummary.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-16 font-medium text-slate-600">{item.category}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
              </div>
              <span className="w-8 font-mono text-right text-slate-500">{item.percent}%</span>
            </div>
          ))}
        </div>
        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View Root Cause Analysis
        </Link>
      </div>

      {/* 6. Quick Queues */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">6. Quick Queues</h4>
        <div className="flex flex-col gap-1 text-[11px]">
          {data.quickQueues.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
              <span className="text-slate-700 font-medium">{q.label}</span>
              <span className={`font-bold font-mono px-1.5 py-0.2 rounded text-[10px] ${
                q.variant === "danger"
                  ? "bg-red-100 text-red-800"
                  : q.variant === "warning"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              }`}>{q.count}</span>
            </div>
          ))}
        </div>
        <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-2 block">
          View All Queues
        </Link>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">7. Final Actions</h4>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Review Critical Complaints", icon: AlertCircle },
            { label: "Review Executive Escalations", icon: ShieldAlert },
            { label: "Review Recovery Plans", icon: Shield },
            { label: "Review Remedy Approvals", icon: CheckSquare },
            { label: "Review Reopened Complaints", icon: RotateCcw },
            { label: "Open Complaint Audit", icon: Search },
            { label: "View Root Cause Analysis", icon: FileText },
          ].map((act, idx) => {
            const IconComp = act.icon;
            return (
              <button
                key={idx}
                className="w-full py-1.5 px-2.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5">
                  <IconComp size={13} />
                  <span>{act.label}</span>
                </div>
                <ChevronRight size={13} className="text-red-200" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
