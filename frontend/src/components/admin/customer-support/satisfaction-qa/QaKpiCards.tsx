'use client';

import React from 'react';
import {
  Smile,
  ThumbsUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';

export function QaKpiCards() {
  const kpis = [
    { label: 'CSAT', value: '92%', trend: '▲ 1.2%', isPositiveTrend: true, icon: Smile, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'CES', value: '4.3 /5', trend: '▲ 0.1', isPositiveTrend: true, icon: ThumbsUp, bg: 'bg-blue-50 text-blue-600' },
    { label: 'QA Score', value: '95%', trend: '▲ 0.5%', isPositiveTrend: true, icon: Award, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'FCR', value: '81%', trend: '▼ 2.1%', isPositiveTrend: false, icon: CheckCircle2, bg: 'bg-indigo-50 text-indigo-600' },
    { label: 'Low-CSAT Cases', value: '38', trend: '▼ 8.0%', isPositiveTrend: false, icon: AlertTriangle, bg: 'bg-rose-50 text-rose-600' },
    { label: 'QA Evaluations Pending', value: '24', trend: '▼ 4.0%', isPositiveTrend: false, icon: Clock, bg: 'bg-amber-50 text-amber-600' },
    { label: 'Critical Quality Defects', value: '7', trend: '▼ 12.5%', isPositiveTrend: false, icon: ShieldAlert, bg: 'bg-rose-50 text-rose-600' },
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
                  k.isPositiveTrend ? 'text-emerald-600' : 'text-rose-600'
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

      {/* 8th Card: Service Excellence Health (Dark Crimson Card) */}
      <div className="bg-[#881337] text-white rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0">
        <div className="min-w-0 flex-1 pr-1">
          <span className="text-[10px] font-semibold text-rose-100 block truncate leading-tight">
            Service Excellence
          </span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="text-xl font-extrabold leading-tight">94</span>
            <span className="text-xs text-rose-200 font-bold">/100</span>
          </div>
        </div>

        {/* Mini circular gauge */}
        <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#70102e]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-white"
              strokeDasharray="94, 100"
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
