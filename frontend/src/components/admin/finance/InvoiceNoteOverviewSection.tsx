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
  FN11_TREND_DATA,
  FN11_DONUT_DATA,
  FN11_STATUS_SUMMARY,
  FN11_HEALTH_METRICS,
} from '@/data/mockInvoicesNotesData';

export function InvoiceNoteOverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      {/* A. Invoice & Note Value Trend */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Invoice &amp; Note Value Trend (Last 30 Days)
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <ComposedChart data={FN11_TREND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 8 }} />
            <YAxis tick={{ fontSize: 8 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 8 }} />
            <Line type="monotone" dataKey="invoiceVal" name="Invoice Value" stroke="#2563eb" strokeWidth={2} dot={{ r: 2 }} />
            <Bar dataKey="creditVal" name="Credit Note" fill="#f59e0b" opacity={0.8} barSize={6} />
            <Line type="monotone" dataKey="debitVal" name="Debit Note" stroke="#dc2626" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="paymentsApplied" name="Payments" stroke="#16a34a" strokeWidth={1.5} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="outstanding" name="Outstanding" stroke="#8b5cf6" strokeWidth={1.5} dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* B. Document Type Distribution */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Document Type Distribution
        </p>
        <div className="flex items-center gap-2">
          <div className="shrink-0 relative">
            <PieChart width={100} height={100}>
              <Pie
                data={FN11_DONUT_DATA}
                cx={45}
                cy={45}
                innerRadius={28}
                outerRadius={45}
                paddingAngle={2}
                dataKey="amount"
              >
                {FN11_DONUT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-extrabold text-gray-900 font-mono leading-tight">18,420</span>
              <span className="text-[8px] text-gray-400 font-medium leading-none">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 text-[9px] flex-1 min-w-0">
            {FN11_DONUT_DATA.slice(0, 7).map((seg) => (
              <div key={seg.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-gray-600 truncate">{seg.name}</span>
                </div>
                <span className="font-mono font-bold text-gray-900 shrink-0">{seg.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C. Document Status Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Document Status Summary
        </p>
        <div className="flex flex-col gap-1 text-[9px] overflow-y-auto max-h-[160px]">
          {FN11_STATUS_SUMMARY.map((s) => (
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
                    width: `${Math.min(100, (s.count / 6842) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* D. Document Operations Health Scorecard */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Document Operations Health Scorecard
        </p>
        <div className="flex flex-col gap-1 text-[10px]">
          {FN11_HEALTH_METRICS.map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-1">
              <span className="text-gray-600 truncate">{m.label}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-10 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${m.score}%` }} />
                </div>
                <span className="font-bold text-emerald-700 font-mono min-w-[24px] text-right">{m.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
