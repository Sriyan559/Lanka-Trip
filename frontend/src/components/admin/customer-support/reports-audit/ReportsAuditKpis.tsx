'use client';

import React from 'react';
import {
  FileText,
  Clock,
  Download,
  Upload,
  Database,
  Server,
  AlertTriangle,
} from 'lucide-react';

export function ReportsAuditKpis() {
  const kpis = [
    { label: 'Reports Generated', value: '214', trend: '▲ 16% vs last month', isPositive: true, icon: FileText, bg: 'bg-rose-50 text-rose-600' },
    { label: 'Scheduled Reports', value: '32', trend: '▲ 6% vs last month', isPositive: true, icon: Clock, bg: 'bg-rose-50 text-rose-600' },
    { label: 'Export Jobs', value: '146', trend: '▲ 21% vs last month', isPositive: true, icon: Download, bg: 'bg-rose-50 text-rose-600' },
    { label: 'Import Jobs', value: '58', trend: '▲ 8% vs last month', isPositive: true, icon: Upload, bg: 'bg-rose-50 text-rose-600' },
    { label: 'Records Exported', value: '3.42M', trend: '▲ 12% vs last month', isPositive: true, icon: Database, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'Records Imported', value: '618K', trend: '▲ 9% vs last month', isPositive: true, icon: Server, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'Transfer Exceptions', value: '11', trend: '▲ 15% vs last month', isPositive: false, icon: AlertTriangle, bg: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
      {kpis.map((k, i) => {
        const IconComp = k.icon;
        return (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0"
          >
            <div className="min-w-0 flex-1 pr-1">
              <span className="text-[10px] font-medium text-slate-500 block truncate leading-tight">
                {k.label}
              </span>
              <span className="text-xl font-bold text-slate-900 leading-tight block mt-0.5">
                {k.value}
              </span>
              <span
                className={`text-[8px] font-bold block mt-0.5 ${
                  k.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {k.trend}
              </span>
            </div>
            <div className={`p-1.5 rounded-md ${k.bg} shrink-0`}>
              <IconComp size={15} />
            </div>
          </div>
        );
      })}

      {/* 8th Card: Reporting & Audit Health (White Card with Green Gauge) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0">
        <div className="min-w-0 flex-1 pr-1">
          <span className="text-[10px] font-medium text-slate-500 block truncate leading-tight">
            Reporting &amp; Audit Health
          </span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="text-xl font-extrabold text-slate-900 leading-tight">97</span>
            <span className="text-xs text-slate-400 font-bold">/100</span>
          </div>
          <span className="text-[8px] text-emerald-600 font-bold block mt-0.5">
            Excellent
          </span>
        </div>

        {/* Mini circular gauge */}
        <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
          <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray="97, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
