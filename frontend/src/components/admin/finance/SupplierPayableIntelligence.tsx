'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  FN07RightRailHealthMetric,
  FN07RightRailAlert,
} from '@/data/mockSupplierPayableDetailData';

const SEVERITY_COLOR: Record<string, string> = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
};

interface Props {
  healthScore: number;
  healthMetrics: FN07RightRailHealthMetric[];
  alerts: FN07RightRailAlert[];
  quickSummary: { label: string; value: string }[];
}

export function SupplierPayableIntelligence({ healthScore, healthMetrics, alerts, quickSummary }: Props) {
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  return (
    <div className="flex flex-col gap-3">

      {/* ── Create Payable Review CTA ── */}
      <button
        onClick={() => toast.success('Opening Create Payable Review...')}
        className="w-full py-2 bg-[#8f002b] text-white text-xs font-bold rounded-lg hover:bg-[#741d35] transition-colors shadow"
      >
        Create Payable Review
      </button>

      {/* ── Supplier Payable Intelligence ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Supplier Payable Intelligence
          </p>
          <button
            onClick={() => toast('Viewing payable intelligence details...')}
            className="text-[10px] text-blue-600 hover:underline font-semibold"
          >
            View Details
          </button>
        </div>

        {/* Circular gauge */}
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 shrink-0">
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
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-gray-900 leading-none">{healthScore}</span>
              <span className="text-[8px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-emerald-700">Health Score: Excellent</span>
            <span className="text-[10px] text-gray-500">
              Health Check: {healthMetrics.length}/{healthMetrics.length} Healthy
            </span>
          </div>
        </div>

        {/* Health check list */}
        <div className="flex flex-col gap-1 text-[10px]">
          {healthMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                <span className="text-gray-600">{m.label}</span>
              </div>
              <span className="font-bold text-emerald-700 font-mono">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Priority Payable Alerts ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
              Priority Payable Alerts
            </p>
          </div>
          <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
            {alerts.length} Active
          </span>
        </div>

        <div className="flex flex-col gap-1 text-[10px]">
          {(showAllAlerts ? alerts : alerts.slice(0, 4)).map((alert) => (
            <div
              key={alert.id}
              className={`p-1.5 rounded border flex items-start gap-1.5 ${
                SEVERITY_COLOR[alert.severity] || SEVERITY_COLOR['Info']
              }`}
            >
              <AlertTriangle size={10} className="mt-0.5 shrink-0" />
              <span className="font-semibold uppercase text-[8px] shrink-0">{alert.severity}</span>
              <span className="leading-tight">{alert.message}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAllAlerts((p) => !p)}
          className="text-[10px] text-blue-600 hover:underline font-semibold text-left mt-0.5"
        >
          {showAllAlerts ? 'View less' : `View All Alerts →`}
        </button>
      </div>

      {/* ── Payable Quick Summary ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide border-b border-gray-100 pb-1">
          Payable Quick Summary
        </p>
        {quickSummary.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center text-[10px]">
            <span className="text-gray-500">{label}</span>
            <span className="font-bold text-gray-900 font-mono">{value}</span>
          </div>
        ))}
      </div>

      {/* ── Find Payable Actions ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide border-b border-gray-100 pb-1 mb-0.5">
          Find Payable Actions
        </p>
        {[
          'View Payable Statement',
          'View Approval Chain',
          'Run Data Checks',
          'Run Payable Hold',
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => toast(`Action: ${btn}`)}
            className="w-full py-1.5 px-2 bg-white border border-[#8f002b]/40 text-[#8f002b] hover:bg-red-50/50 rounded-lg text-[10px] font-bold transition-colors flex items-center justify-between"
          >
            <span>{btn}</span>
            <ChevronRight size={11} className="text-[#8f002b]/60" />
          </button>
        ))}
      </div>
    </div>
  );
}
