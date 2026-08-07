'use client';

import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_PRIORITY_ALERTS, MOCK_HEALTH_SCORECARD } from '@/data/mockFinanceData';

export function RightFinanceOperationsSidebar() {
  const alerts = MOCK_PRIORITY_ALERTS;
  const healthItems = MOCK_HEALTH_SCORECARD;

  return (
    <aside className="w-full xl:w-72 shrink-0 flex flex-col gap-3">
      {/* A. Finance Operations Health */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-gray-100">
          <h3 className="text-xs font-extrabold text-gray-900">Finance Operations Health</h3>
          <button
            onClick={() => toast('Opening full health audit')}
            className="text-[10px] text-[#8f002b] font-bold hover:underline"
          >
            View details
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Circular Gauge */}
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
                className="text-[#8f002b]"
                strokeDasharray="91, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-sm font-black text-gray-900 leading-none">91</span>
              <span className="text-[8px] text-gray-400 font-bold leading-none mt-0.5">/100</span>
            </div>
          </div>

          {/* Health Metrics List */}
          <div className="flex-1 space-y-0.5 text-[10px]">
            {healthItems.slice(0, 5).map((h) => (
              <div key={h.label} className="flex items-center justify-between text-gray-600">
                <span className="truncate">{h.label}</span>
                <span className="font-bold text-gray-900 ml-1">{h.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* B. Priority Finance Alerts */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-gray-100">
          <h3 className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
            <span>Priority Finance Alerts</span>
            <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {alerts.length}
            </span>
          </h3>
          <button
            onClick={() => toast('Displaying all 8 priority alerts')}
            className="text-[10px] text-[#8f002b] font-bold hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {alerts.map((a) => {
            let badgeStyle = 'bg-gray-100 text-gray-700';
            if (a.severity === 'Critical') badgeStyle = 'bg-red-600 text-white font-black';
            if (a.severity === 'High') badgeStyle = 'bg-red-100 text-red-700 font-bold';
            if (a.severity === 'Medium') badgeStyle = 'bg-amber-100 text-amber-800 font-semibold';
            if (a.severity === 'Low') badgeStyle = 'bg-amber-50 text-amber-700';

            return (
              <div
                key={a.id}
                onClick={() => toast.error(a.message)}
                className="p-1.5 rounded border border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-white cursor-pointer transition-colors flex items-start gap-2 text-xs"
              >
                <span className={`text-[9px] px-1 py-0.5 rounded shrink-0 uppercase ${badgeStyle}`}>
                  {a.severity}
                </span>
                <span className="text-[11px] font-medium text-gray-800 leading-snug line-clamp-2 flex-1">
                  {a.message}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* C. Revenue & Payment Summaries */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col">
          <span className="text-[10px] text-gray-500 font-semibold uppercase">Net Revenue</span>
          <span className="text-xs font-extrabold text-gray-900 mt-0.5">368.4M</span>
          <span className="text-[9px] font-bold text-emerald-700 mt-0.5 flex items-center">
            <ArrowUpRight size={10} /> ▲ 8.1%
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col">
          <span className="text-[10px] text-gray-500 font-semibold uppercase">GMV</span>
          <span className="text-xs font-extrabold text-gray-900 mt-0.5">486.2M</span>
          <span className="text-[9px] font-bold text-emerald-700 mt-0.5 flex items-center">
            <ArrowUpRight size={10} /> ▲ 12.4%
          </span>
        </div>
      </div>

      {/* D. Liability & Settlement Summaries */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col">
          <span className="text-[10px] text-gray-500 font-semibold uppercase">AR Outstanding</span>
          <span className="text-xs font-extrabold text-gray-900 mt-0.5">22.8M</span>
          <span className="text-[9px] font-bold text-amber-700 mt-0.5 flex items-center">
            <ArrowUpRight size={10} /> ▲ 5.8%
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col">
          <span className="text-[10px] text-gray-500 font-semibold uppercase">AP Outstanding</span>
          <span className="text-xs font-extrabold text-gray-900 mt-0.5">68.4M</span>
          <span className="text-[9px] font-bold text-amber-700 mt-0.5 flex items-center">
            <ArrowUpRight size={10} /> ▲ 6.2%
          </span>
        </div>
      </div>

      {/* E. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide pb-1 border-b border-gray-100 mb-2">
          Quick Queues
        </h4>
        <div className="grid grid-cols-5 gap-1 text-center">
          <button
            onClick={() => toast('Opening Exceptions Queue')}
            className="p-1 rounded bg-red-50 hover:bg-red-100 border border-red-100 text-red-800 transition-colors"
          >
            <span className="block text-[9px] font-bold text-red-600">Exceptions</span>
            <span className="text-xs font-black">126</span>
          </button>
          <button
            onClick={() => toast('Opening Approvals Queue')}
            className="p-1 rounded bg-amber-50 hover:bg-amber-100 border border-amber-100 text-amber-800 transition-colors"
          >
            <span className="block text-[9px] font-bold text-amber-700">Approvals</span>
            <span className="text-xs font-black">186</span>
          </button>
          <button
            onClick={() => toast('Opening Receivables Queue')}
            className="p-1 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 transition-colors"
          >
            <span className="block text-[9px] font-semibold text-gray-500">Recv.</span>
            <span className="text-xs font-extrabold">142</span>
          </button>
          <button
            onClick={() => toast('Opening Payables Queue')}
            className="p-1 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 transition-colors"
          >
            <span className="block text-[9px] font-semibold text-gray-500">Payables</span>
            <span className="text-xs font-extrabold">96</span>
          </button>
          <button
            onClick={() => toast('Opening Settlements Queue')}
            className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-800 transition-colors"
          >
            <span className="block text-[9px] font-bold text-emerald-700">Settle</span>
            <span className="text-xs font-black">38</span>
          </button>
        </div>
      </div>

      {/* F. Final Finance Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col gap-1.5">
        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide pb-1 border-b border-gray-100 mb-0.5">
          Final Finance Actions
        </h4>

        <button
          onClick={() => toast.error('Reviewing 126 Critical Exceptions')}
          className="w-full py-1.5 px-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold rounded flex items-center justify-between transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <AlertCircle size={13} />
            Review Critical Exception
          </span>
          <ChevronRight size={12} />
        </button>

        <button
          onClick={() => toast('Opening Finance Queue')}
          className="w-full py-1.5 px-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded flex items-center justify-between transition-colors"
        >
          <span>Open Finance Queue</span>
          <ChevronRight size={12} className="text-gray-400" />
        </button>

        <button
          onClick={() => toast('Navigating to Reconciliation Dashboard')}
          className="w-full py-1.5 px-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded flex items-center justify-between transition-colors"
        >
          <span>View Reconciliation Dashboard</span>
          <ChevronRight size={12} className="text-gray-400" />
        </button>

        <button
          onClick={() => toast.success('Launching Manual Entry Form')}
          className="w-full py-1.5 px-2 bg-white border border-gray-300 text-[#8f002b] hover:bg-rose-50 text-xs font-bold rounded flex items-center justify-between transition-colors"
        >
          <span>Launch Manual Entry</span>
          <ChevronRight size={12} className="text-[#8f002b]" />
        </button>

        <button
          onClick={() => toast('Viewing Audit Trail')}
          className="w-full py-1.5 px-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded flex items-center justify-between transition-colors"
        >
          <span>View Audit Trail</span>
          <ChevronRight size={12} className="text-gray-400" />
        </button>
      </div>
    </aside>
  );
}
