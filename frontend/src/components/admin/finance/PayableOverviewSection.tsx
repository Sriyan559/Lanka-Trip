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
  FN06_TREND_DATA,
  FN06_DONUT_DATA,
  FN06_STATUS_SUMMARY,
} from '@/data/mockSupplierPayableData';

export function PayableOverviewSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
      {/* ── Left: Payable, Payment & Overdue Trend (6 cols) ── */}
      <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col gap-2 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
            Payable, Payment &amp; Overdue Trend (Last 30 Days)
          </p>
          <span className="text-[10px] text-gray-400 font-medium">LKR Millions</span>
        </div>

        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FN06_TREND_DATA} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} width={30} unit="M" />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6, padding: '4px 8px' }} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 2 }} />
              <Bar dataKey="exceptions" name="Exceptions" fill="#f59e0b" barSize={12} radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="total" name="Total Payables" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="scheduled" name="Scheduled Payments" stroke="#16a34a" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="paid" name="Paid Amount" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="overdue" name="Overdue Payables" stroke="#dc2626" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Middle: Payable Type Distribution Donut (3 cols) ── */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col justify-between shadow-sm">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
          Payable Type Distribution
        </p>

        <div className="flex items-center justify-between gap-2">
          {/* Donut chart */}
          <div className="relative w-28 h-28 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={FN06_DONUT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={44}
                  dataKey="amount"
                  paddingAngle={2}
                >
                  {FN06_DONUT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xs font-extrabold text-gray-900 leading-none">
                68.4M
              </span>
              <span className="text-[8px] font-semibold text-gray-400 uppercase">Total Payables</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="flex-1 flex flex-col gap-1 text-[10px]">
            {FN06_DONUT_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold shrink-0">
                  <span className="text-gray-800 font-mono">{item.amount}M</span>
                  <span className="text-gray-400 text-[9px]">({item.percentage.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Payable Status Summary (3 cols) ── */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
            Payable Status Summary
          </p>
          <span className="text-[9px] font-semibold text-gray-400">Count &amp; Amount</span>
        </div>

        <div className="flex flex-col gap-1 text-[10px] mt-1">
          {FN06_STATUS_SUMMARY.map((row) => (
            <div key={row.status} className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-medium text-gray-600 truncate">{row.status}</span>
                  <span className="font-bold text-gray-800">{row.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((row.count / 1026) * 100, 100)}%`,
                      backgroundColor: row.color,
                    }}
                  />
                </div>
              </div>
              <span className="font-mono font-semibold text-gray-500 w-12 text-right shrink-0">
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
