'use client';

import React from 'react';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { FN10FullDetailRecord } from '@/data/mockSettlementDetailData';

const SEVERITY_BADGE_MAP: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
};

interface Props {
  record: FN10FullDetailRecord;
}

export function RightSettlementDetailSidebar({ record }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* 1. Settlement / Payout Health Score (Gauge + 10 metrics) */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Settlement / Payout Health Score
          </p>
        </div>

        {/* Circular Gauge */}
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
                strokeDasharray={`${record.railHealthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                {record.railHealthScore}
              </span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>
        </div>

        {/* 10 Health metrics */}
        <div className="flex flex-col gap-1 text-[10px]">
          {record.railHealthMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-1">
              <span className="text-gray-600 truncate">{m.label}</span>
              <span className="font-bold text-emerald-700 font-mono">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Priority Alerts */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
              Priority Alerts ({record.railAlerts.length})
            </p>
          </div>
          <span className="text-[9px] text-blue-600 font-semibold cursor-pointer">View All</span>
        </div>

        <div className="flex flex-col gap-1.5 text-[10px]">
          {record.railAlerts.slice(0, 4).map((alert) => (
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

      {/* 3. Quick Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5 text-[10px]">
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Quick Summary
          </p>
          <span className="text-[9px] text-blue-600 font-semibold cursor-pointer">View Summary</span>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Total Settlements</span>
            <span className="font-bold text-gray-900 font-mono">{record.railQuickSummary.totalSettlements}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Total Payouts (LKR)</span>
            <span className="font-bold text-gray-900 font-mono">{record.railQuickSummary.totalPayouts}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Overdue Payouts</span>
            <span className="font-bold text-red-600 font-mono">{record.railQuickSummary.overduePayouts}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Due This Week</span>
            <span className="font-bold text-amber-700 font-mono">{record.railQuickSummary.dueThisWeek}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">On-Track Workflows</span>
            <span className="font-bold text-emerald-700 font-mono">{record.railQuickSummary.onTrackWorkflows}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">On-Track Verification</span>
            <span className="font-bold text-emerald-700 font-mono">{record.railQuickSummary.onTrackVerification}</span>
          </div>
        </div>
      </div>

      {/* 4. Record Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-0.5 border-b border-gray-100 pb-1">
          Record Actions
        </p>

        {[
          'Review Settlement Exception',
          'View Approval Chain',
          'Review Beneficiary Validation',
          'View Linked Sources',
          'View Audit Trail',
        ].map((btn) => (
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
