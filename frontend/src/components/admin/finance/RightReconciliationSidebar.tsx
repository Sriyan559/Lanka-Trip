'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  AlertTriangle,
  FileText,
  FileCheck,
  Lock,
  ShieldAlert,
  CheckCircle,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { FN13_RIGHT_RAIL } from '@/data/mockReconciliationControlsData';

const SEVERITY_BADGE_MAP: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const QUEUE_ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock size={12} className="text-amber-600" />,
  FileCheck: <FileCheck size={12} className="text-[#8f002b]" />,
  AlertTriangle: <AlertTriangle size={12} className="text-red-600" />,
  Lock: <Lock size={12} className="text-purple-600" />,
  ShieldAlert: <ShieldAlert size={12} className="text-orange-600" />,
  CheckCircle: <CheckCircle size={12} className="text-emerald-600" />,
};

export function RightReconciliationSidebar() {
  const [expandedAlerts, setExpandedAlerts] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* ── 1. Financial Control Intelligence ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Financial Control Intelligence
          </p>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            {FN13_RIGHT_RAIL.healthState}
          </span>
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
                strokeDasharray={`${FN13_RIGHT_RAIL.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                {FN13_RIGHT_RAIL.healthScore}
              </span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Priority Financial Alerts ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
              Priority Financial Alerts ({FN13_RIGHT_RAIL.priorityAlerts.length})
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
            ? FN13_RIGHT_RAIL.priorityAlerts
            : FN13_RIGHT_RAIL.priorityAlerts.slice(0, 4)
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

      {/* ── 3. Quick Summaries Block ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-[10px]">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide border-b border-gray-100 pb-1">
          Financial Control Summaries
        </p>

        <div className="divide-y divide-gray-100">
          <div className="py-1">
            <p className="font-bold text-gray-700 text-[9px] uppercase tracking-wide mb-0.5">Reconciliation</p>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Records</span>
              <span className="font-mono font-bold text-gray-900">{FN13_RIGHT_RAIL.reconciliationSummary.totalRecords}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Coverage</span>
              <span className="font-mono font-bold text-emerald-700">{FN13_RIGHT_RAIL.reconciliationSummary.coverage}</span>
            </div>
          </div>
          <div className="py-1">
            <p className="font-bold text-gray-700 text-[9px] uppercase tracking-wide mb-0.5">Financial Exposure</p>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Exposure</span>
              <span className="font-mono font-bold text-red-600">{FN13_RIGHT_RAIL.financialExposureSummary.totalExposure}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">High Risk</span>
              <span className="font-mono font-bold text-red-700">{FN13_RIGHT_RAIL.financialExposureSummary.highRisk}</span>
            </div>
          </div>
          <div className="py-1">
            <p className="font-bold text-gray-700 text-[9px] uppercase tracking-wide mb-0.5">Exceptions &amp; Controls</p>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Exceptions</span>
              <span className="font-mono font-bold text-amber-700">{FN13_RIGHT_RAIL.exceptionSummary.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Breached Controls</span>
              <span className="font-mono font-bold text-red-600">{FN13_RIGHT_RAIL.controlSummary.breached}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Quick Queues ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
          Quick Queues
        </p>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          {FN13_RIGHT_RAIL.quickQueues.map((q) => (
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

      {/* ── 5. Period-Close Readiness Checklist ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-[10px]">
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Period-Close Readiness
          </p>
          <span className="font-mono font-bold text-emerald-700">{FN13_RIGHT_RAIL.readinessScore}%</span>
        </div>
        <div className="flex flex-col gap-1">
          {FN13_RIGHT_RAIL.readinessChecklist.map((c) => (
            <div key={c.label} className="flex justify-between items-center">
              <span className="text-gray-600">{c.label}</span>
              <span className={`px-1 rounded text-[8px] font-bold ${
                c.status === 'Good' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
              }`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Final Reconciliation Actions ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-0.5">
          Final Reconciliation Actions
        </p>

        {FN13_RIGHT_RAIL.actionButtons.map((btn) => (
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
