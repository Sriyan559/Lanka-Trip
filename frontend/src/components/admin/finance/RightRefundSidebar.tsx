'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  AlertTriangle,
  Clock,
  FileCheck,
  ShieldAlert,
  FileQuestion,
  RotateCcw,
} from 'lucide-react';
import type {
  RefundAlert,
  RefundQuickSummaryItem,
  RefundQueueItem,
  RefundHealthMetric,
} from '@/services/api/financeRefundsService';

const SEVERITY_BADGE_MAP: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const QUEUE_ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock size={12} className="text-amber-600" />,
  FileCheck: <FileCheck size={12} className="text-blue-600" />,
  AlertTriangle: <AlertTriangle size={12} className="text-red-600" />,
  ShieldAlert: <ShieldAlert size={12} className="text-purple-600" />,
  FileQuestion: <FileQuestion size={12} className="text-orange-600" />,
  RotateCcw: <RotateCcw size={12} className="text-gray-600" />,
};

interface Props {
  healthScore: number | null;
  healthMetrics: RefundHealthMetric[];
  alerts: RefundAlert[];
  quickSummary: RefundQuickSummaryItem[];
  quickQueues: RefundQueueItem[];
  actionButtons: string[];
  loading?: boolean;
  onQueueClick?: (label: string) => void;
  onAlertClick?: () => void;
  onActionClick?: (btn: string) => void;
}

export function RightRefundSidebar({
  healthScore,
  healthMetrics,
  alerts,
  quickSummary,
  quickQueues,
  actionButtons,
  loading,
  onQueueClick,
  onAlertClick,
  onActionClick,
}: Props) {
  const [expandedAlerts, setExpandedAlerts] = useState(false);

  const score = healthScore ?? 0;
  const scoreColor =
    score >= 90 ? 'text-emerald-500' : score >= 75 ? 'text-amber-500' : score > 0 ? 'text-red-500' : 'text-gray-300';
  const strokeColor =
    score >= 90 ? 'text-emerald-500' : score >= 75 ? 'text-amber-500' : score > 0 ? 'text-red-500' : 'text-gray-200';

  return (
    <div className="flex flex-col gap-3">

      {/* ── 1. Refund Operations Health ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Refund Operations Health
          </p>
          <span className="text-[10px] text-gray-400 font-medium">
            {loading && !healthScore ? 'Loading…' : score > 0 ? 'Live' : 'No data'}
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
                className={strokeColor}
                strokeDasharray={`${score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-xl font-extrabold leading-none ${scoreColor}`}>
                {loading && !healthScore ? '–' : score}
              </span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>
        </div>

        {/* 10 health metrics */}
        <div className="flex flex-col gap-1 text-[10px]">
          {loading && healthMetrics.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded animate-pulse" />
              ))
            : healthMetrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-1">
                  <span className="text-gray-600 truncate">{m.label}</span>
                  <span className={`font-bold font-mono ${m.pct >= 90 ? 'text-emerald-700' : m.pct >= 75 ? 'text-amber-700' : 'text-red-600'}`}>
                    {m.pct != null ? `${m.pct}%` : '–'}
                  </span>
                </div>
              ))}
        </div>
      </div>

      {/* ── 2. Priority Refund Alerts ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {alerts.some((a) => ['Critical', 'High'].includes(a.severity)) && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
              Priority Refund Alerts ({alerts.length})
            </p>
          </div>
          {alerts.length > 4 && (
            <button
              onClick={() => setExpandedAlerts((p) => !p)}
              className="text-[10px] text-blue-600 hover:underline font-semibold"
            >
              {expandedAlerts ? 'View less' : 'View all'}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5 text-[10px]">
          {loading && alerts.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-50 rounded border border-gray-200 animate-pulse" />
              ))
            : alerts.length === 0
            ? <p className="text-gray-400 text-center py-2">No active refund alerts.</p>
            : (expandedAlerts ? alerts : alerts.slice(0, 4)).map((alert) => (
                <button
                  key={alert.id}
                  onClick={onAlertClick}
                  className={`p-1.5 rounded border flex items-start gap-1.5 w-full text-left hover:opacity-90 transition-opacity ${
                    SEVERITY_BADGE_MAP[alert.severity] ?? SEVERITY_BADGE_MAP['Info']
                  }`}
                >
                  <AlertTriangle size={11} className="mt-0.5 shrink-0" />
                  <span className="leading-tight font-medium">{alert.message}</span>
                </button>
              ))}
        </div>
      </div>

      {/* ── 3. Refund Quick Summary ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
          Refund Quick Summary
        </p>
        <div className="divide-y divide-gray-100 text-[11px]">
          {loading && quickSummary.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-50 animate-pulse my-1" />
              ))
            : quickSummary.map((item) => (
                <div key={item.label} className="flex justify-between py-1">
                  <span className="text-gray-500 text-[10px]">{item.label}</span>
                  <span className="font-bold text-gray-900 font-mono">{item.value}</span>
                </div>
              ))}
        </div>
      </div>

      {/* ── 4. Quick Queues ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Quick Queues</p>
        <div className="grid grid-cols-5 gap-1 text-[10px]">
          {loading && quickQueues.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-50 rounded-lg border border-gray-200 animate-pulse" />
              ))
            : quickQueues.map((q) => (
                <button
                  key={q.label}
                  onClick={() => onQueueClick?.(q.label)}
                  className="flex flex-col items-center p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  {QUEUE_ICON_MAP[q.iconName] ?? <RotateCcw size={12} />}
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

      {/* ── 5. Final Refund Actions ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-0.5">
          Final Refund Actions
        </p>
        {(actionButtons.length > 0
          ? actionButtons
          : ['Review Refund Exceptions', 'Open Refund Queue', 'View Reconciliation Dashboard', 'Launch Refund Review', 'View Audit Trail']
        ).map((btn) => (
          <button
            key={btn}
            onClick={() => onActionClick?.(btn)}
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
