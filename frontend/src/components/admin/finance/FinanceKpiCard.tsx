'use client';

import React from 'react';
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  Inbox,
  Send,
  Percent,
  Clock,
  FileQuestion,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from 'lucide-react';
import { FinanceKpi } from '@/types/finance';

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  Inbox,
  Send,
  Percent,
  Clock,
  FileQuestion,
  ShieldAlert,
};

export function FinanceKpiCard({ kpi }: { kpi: FinanceKpi }) {
  const IconComponent = ICON_MAP[kpi.iconName] || DollarSign;

  // Mini SVG Sparkline generator
  const renderSparkline = (data: number[], isPositive: boolean, status: string) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 64;
    const height = 22;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    let strokeColor = '#16a34a'; // green
    if (status === 'warning') strokeColor = '#d97706'; // amber
    if (status === 'negative') strokeColor = '#dc2626'; // red

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm hover:shadow transition-shadow flex flex-col justify-between relative group min-w-0">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-1 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 rounded px-1 py-0.5 shrink-0">
            {kpi.num}.
          </span>
          <div className="p-1 rounded bg-rose-50 text-[#8f002b] shrink-0">
            <IconComponent size={13} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-gray-900 truncate leading-tight flex items-center gap-1">
              {kpi.title}
              {kpi.hasWarningIcon && <AlertTriangle size={11} className="text-red-500 shrink-0 inline" />}
            </span>
            <span className="text-[10px] text-gray-500 truncate leading-tight">{kpi.subLabel}</span>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-500 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Info size={12} />
        </button>
      </div>

      {/* Metric & Trend Row */}
      <div className="flex items-end justify-between gap-1 mt-1">
        <div>
          <div className="text-base font-extrabold text-gray-900 tracking-tight leading-none">
            {kpi.value}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span
              className={`inline-flex items-center text-[10px] font-bold px-1 rounded ${
                kpi.status === 'positive'
                  ? 'bg-emerald-50 text-emerald-700'
                  : kpi.status === 'warning'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {kpi.isPositive ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
              {kpi.isPositive ? '▲' : '▼'} {kpi.delta}
            </span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="shrink-0">{renderSparkline(kpi.sparkline, kpi.isPositive, kpi.status)}</div>
      </div>
    </div>
  );
}
