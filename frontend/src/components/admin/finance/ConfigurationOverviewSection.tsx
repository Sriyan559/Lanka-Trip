'use client';

import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FN12_TREND_DATA,
  FN12_DONUT_DATA,
  FN12_STATUS_SUMMARY,
} from '@/data/mockTaxCurrencyConfigData';

export function ConfigurationOverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* 1. Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Tax &amp; Configuration Change Trend (Last 30 Days)
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <ComposedChart data={FN12_TREND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 8 }} />
            <YAxis tick={{ fontSize: 8 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 8 }} />
            <Line type="monotone" dataKey="activeRules" name="Active Rules" stroke="#2563eb" strokeWidth={2} dot={{ r: 2 }} />
            <Bar dataKey="taxCalc" name="Tax Calc" fill="#16a34a" opacity={0.8} barSize={6} />
            <Line type="monotone" dataKey="exceptions" name="Exceptions" stroke="#dc2626" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="changes" name="Changes" stroke="#8b5cf6" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="approved" name="Approved" stroke="#0ea5e9" strokeWidth={1.5} dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Donut Distribution */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Tax Rule Distribution
        </p>
        <div className="flex items-center gap-2">
          <div className="shrink-0 relative">
            <PieChart width={100} height={100}>
              <Pie
                data={FN12_DONUT_DATA}
                cx={45}
                cy={45}
                innerRadius={28}
                outerRadius={45}
                paddingAngle={2}
                dataKey="amount"
              >
                {FN12_DONUT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-extrabold text-gray-900 font-mono leading-tight">126</span>
              <span className="text-[8px] text-gray-400 font-medium leading-none">Total Rules</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 text-[9px] flex-1 min-w-0">
            {FN12_DONUT_DATA.slice(0, 7).map((seg) => (
              <div key={seg.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-gray-600 truncate">{seg.name}</span>
                </div>
                <span className="font-mono font-bold text-gray-900 shrink-0">{seg.amount} ({seg.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Status Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Configuration Status Summary
        </p>
        <div className="flex flex-col gap-1 text-[9px] overflow-y-auto max-h-[160px]">
          {FN12_STATUS_SUMMARY.map((s) => (
            <div key={s.status} className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-semibold">{s.status}</span>
                <span className="font-mono font-bold text-gray-900">{s.count.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    backgroundColor: s.color,
                    width: `${Math.min(100, (s.count / 642) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
