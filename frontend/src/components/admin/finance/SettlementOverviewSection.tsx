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
  FN09_TREND_DATA,
  FN09_DONUT_DATA,
  FN09_STATUS_SUMMARY,
} from '@/data/mockSettlementData';

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-gray-200 rounded shadow-lg p-2 text-[10px] font-medium">
      <p className="font-bold text-gray-800 mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-mono font-bold">LKR {p.value}M</span>
        </div>
      ))}
    </div>
  );
};

export function SettlementOverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* 1. Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Settlement &amp; Payout Trend (Last 30 Days)
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <ComposedChart data={FN09_TREND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 8 }} />
            <YAxis tick={{ fontSize: 8 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 8 }} />
            <Line type="monotone" dataKey="liability" name="Settlement Liability" stroke="#16a34a" strokeWidth={2} dot={{ r: 2 }} />
            <Bar dataKey="approved" name="Approved Settlements" fill="#8b5cf6" opacity={0.8} radius={[2, 2, 0, 0]} barSize={8} />
            <Line type="monotone" dataKey="scheduled" name="Scheduled Payouts" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="submitted" name="Submitted Payouts" stroke="#0ea5e9" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="completed" name="Completed Payouts" stroke="#059669" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="failed" name="Failed Payouts" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 2 }} />
            <Line type="monotone" dataKey="held" name="Held Value" stroke="#f59e0b" strokeWidth={1.5} dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Donut Distribution */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Beneficiary Type Distribution
        </p>
        <div className="flex items-center gap-3">
          <div className="shrink-0 relative">
            <PieChart width={110} height={110}>
              <Pie
                data={FN09_DONUT_DATA}
                cx={50}
                cy={50}
                innerRadius={32}
                outerRadius={50}
                paddingAngle={2}
                dataKey="amount"
              >
                {FN09_DONUT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] text-gray-400 font-semibold leading-none">Total</span>
              <span className="text-sm font-extrabold text-gray-900 font-mono leading-tight">1,246</span>
              <span className="text-[8px] text-gray-400 font-medium leading-none">LKR 312.4M</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-[10px] flex-1 min-w-0">
            {FN09_DONUT_DATA.map((seg) => (
              <div key={seg.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-gray-600 truncate flex-1">{seg.name}</span>
                <span className="text-gray-400 shrink-0">{seg.percentage}%</span>
                <span className="font-mono font-bold text-gray-900 shrink-0">
                  {seg.amount.toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Status Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Settlement &amp; Payout Status Summary
        </p>
        <div className="flex flex-col gap-1.5 text-[10px] overflow-y-auto max-h-[160px]">
          {FN09_STATUS_SUMMARY.map((s) => (
            <div key={s.status} className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-semibold">{s.status}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-gray-500">{s.count.toLocaleString()}</span>
                  <span className="font-bold text-gray-900">{s.amount}</span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    backgroundColor: s.color,
                    width: `${Math.min(100, (s.count / 1026) * 100)}%`,
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
