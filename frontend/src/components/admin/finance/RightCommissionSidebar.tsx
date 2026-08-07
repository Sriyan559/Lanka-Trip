'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  AlertTriangle,
  FileText,
  FileCheck,
  FileQuestion,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { FN08_RIGHT_RAIL } from '@/data/mockCommissionData';

const SEVERITY_BADGE_MAP: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const QUEUE_ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText size={12} className="text-blue-600" />,
  FileCheck: <FileCheck size={12} className="text-emerald-600" />,
  FileQuestion: <FileQuestion size={12} className="text-amber-600" />,
  AlertTriangle: <AlertTriangle size={12} className="text-red-600" />,
  Clock: <Clock size={12} className="text-purple-600" />,
};

export function RightCommissionSidebar() {
  const [expandedAlerts, setExpandedAlerts] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* ── 1. Commission Operations Health (Gauge + 10 Metrics) ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            A. Commission Operations Health
          </p>
          <button
            onClick={() => toast('Viewing commission health details...')}
            className="text-[10px] text-blue-600 hover:underline font-semibold"
          >
            View details
          </button>
        </div>

        {/* Circular gauge */}
        <div className="flex items-center justify-center my-1">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray={`${FN08_RIGHT_RAIL.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                {FN08_RIGHT_RAIL.healthScore}
              </span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>
        </div>

        {/* 10 Health metrics */}
        <div className="flex flex-col gap-1 text-[10px]">
          {FN08_RIGHT_RAIL.healthMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-1">
              <span className="text-gray-600 truncate">{m.label}</span>
              <span className="font-bold text-emerald-700 font-mono">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Priority Commission Alerts (8) ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
              B. Priority Commission Alerts ({FN08_RIGHT_RAIL.priorityAlerts.length})
            </p>
          </div>
          <button
            onClick={() => setExpandedAlerts((p) => !p)}
            className="text-[10px] text-blue-600 hover:underline font-semibold"
          >
            {expandedAlerts ? 'View less' : 'View all'}
          </button>
        </div>

        <div className="flex flex-col gap-1.5 text-[10px]">
          {(expandedAlerts
            ? FN08_RIGHT_RAIL.priorityAlerts
            : FN08_RIGHT_RAIL.priorityAlerts.slice(0, 4)
          ).map((alert) => (
            <div
              key={alert.id}
              className={`p-1.5 rounded border flex items-start gap-1.5 ${
                SEVERITY_BADGE_MAP[alert.severity] || SEVERITY_BADGE_MAP['Info']
              }`}
            >
              <AlertTriangle size={11} className="mt-0.5 shrink-0" />
              <span className="leading-tight font-medium">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Commission & Fee Summaries ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-[11px]">
        {/* Commission Summary */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            C. Commission Summary
          </p>
          <button onClick={() => toast('Viewing commission summary...')} className="text-[10px] text-blue-600 hover:underline font-semibold">View</button>
        </div>
        <div className="flex justify-between items-center font-mono">
          <span className="font-bold text-gray-900 text-sm">{FN08_RIGHT_RAIL.commissionSummary.val}</span>
          <span className="text-emerald-700 text-xs font-bold">{FN08_RIGHT_RAIL.commissionSummary.delta}</span>
          <span className="text-gray-600 text-xs">Avg: {FN08_RIGHT_RAIL.commissionSummary.avgRate}</span>
        </div>

        {/* Fee Summary */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-1 pt-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            D. Fee Summary
          </p>
          <button onClick={() => toast('Viewing fee summary...')} className="text-[10px] text-blue-600 hover:underline font-semibold">View</button>
        </div>
        <div className="flex justify-between items-center font-mono">
          <span className="font-bold text-gray-900 text-sm">{FN08_RIGHT_RAIL.feeSummary.val}</span>
          <span className="text-emerald-700 text-xs font-bold">{FN08_RIGHT_RAIL.feeSummary.delta}</span>
          <span className="text-gray-600 text-xs">Fee Rate: {FN08_RIGHT_RAIL.feeSummary.feeRate}</span>
        </div>

        {/* Rule Summary */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-1 pt-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            E. Rule Summary
          </p>
        </div>
        <div className="flex justify-between items-center font-mono text-xs">
          <span className="text-gray-600">Active Rules: <strong className="text-gray-900">{FN08_RIGHT_RAIL.ruleSummary.activeRules}</strong></span>
          <span className="text-red-600 font-bold">Conflicts: {FN08_RIGHT_RAIL.ruleSummary.ruleConflicts}</span>
        </div>

        {/* Settlement & Recon Summaries */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-1 pt-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            G. Settlement &amp; Recon Summary
          </p>
        </div>
        <div className="flex justify-between items-center font-mono text-xs">
          <span className="text-gray-600">Pending: <strong className="text-gray-900">{FN08_RIGHT_RAIL.settlementSummary.pendingVal}</strong></span>
          <span className="text-emerald-700 font-bold">Recon: {FN08_RIGHT_RAIL.reconciliationSummary.reconRate}</span>
        </div>
      </div>

      {/* ── 4. Quick Queues ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
          I. Quick Queues
        </p>

        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          {FN08_RIGHT_RAIL.quickQueues.map((q) => (
            <button
              key={q.label}
              onClick={() => toast(`Opening queue: ${q.label}`)}
              className="flex flex-col items-center p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              {QUEUE_ICON_MAP[q.iconName] || <FileText size={12} />}
              <span className="font-extrabold text-gray-900 mt-1 font-mono text-xs">
                {q.count}
              </span>
              <span className="text-[8px] text-gray-500 font-semibold leading-tight line-clamp-1 mt-0.5">
                {q.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. Final Commission Actions ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-0.5">
          J. Final Commission Actions
        </p>

        {FN08_RIGHT_RAIL.actionButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => toast(`Action: ${btn}`)}
            className="w-full py-1.5 px-2 bg-white border border-[#8f002b]/40 text-[#8f002b] hover:bg-red-50/50 rounded-lg text-xs font-bold transition-colors flex items-center justify-between"
          >
            <span>{btn}</span>
            <ChevronRight size={12} className="text-[#8f002b]/70" />
          </button>
        ))}
      </div>
    </div>
  );
}
