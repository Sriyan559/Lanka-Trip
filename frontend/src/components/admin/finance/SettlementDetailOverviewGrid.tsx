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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FN10FullDetailRecord } from '@/data/mockSettlementDetailData';

interface Props {
  record: FN10FullDetailRecord;
}

export function SettlementDetailOverviewGrid({ record }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
      {/* A. Settlement & Amount Trend */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1">
          Settlement &amp; Amount Trend (Last 30 Days)
        </p>
        <ResponsiveContainer width="100%" height={120}>
          <ComposedChart data={record.trendData} margin={{ top: 2, right: 2, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 8 }} />
            <YAxis tick={{ fontSize: 8 }} />
            <Tooltip />
            <Line type="monotone" dataKey="netSettlement" name="Net Settlement (LKR)" stroke="#16a34a" strokeWidth={2} dot={{ r: 2 }} />
            <Bar dataKey="topSources" name="Top Sources" fill="#2563eb" opacity={0.7} barSize={6} />
            <Line type="monotone" dataKey="holdAmount" name="Hold Amount" stroke="#ea580c" strokeWidth={1} dot={{ r: 1.5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* B. Beneficiary Type Distribution */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1">
          Beneficiary Type Distribution
        </p>
        <div className="flex items-center gap-2">
          <div className="shrink-0 relative">
            <PieChart width={80} height={80}>
              <Pie
                data={record.donutData}
                cx={38}
                cy={38}
                innerRadius={24}
                outerRadius={38}
                paddingAngle={2}
                dataKey="amount"
              >
                {record.donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[7px] text-gray-400 font-semibold leading-none">LKR</span>
              <span className="text-[11px] font-extrabold text-gray-900 font-mono leading-tight">2.28M</span>
              <span className="text-[7px] text-gray-400 leading-none">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 text-[9px] flex-1 min-w-0">
            {record.donutData.map((seg) => (
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

      {/* C. Settlement & Payout Status Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1">
          Settlement &amp; Payout Status Summary
        </p>
        <div className="flex flex-col gap-1 text-[9px]">
          {record.statusSummary.map((s) => (
            <div key={s.label} className="flex justify-between items-center">
              <span className="text-gray-600">{s.label}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${Math.min(100, (s.count / 214) * 100)}%` }} />
                </div>
                <span className="font-mono font-bold text-gray-900 min-w-[20px] text-right">{s.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* D. Holding Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-[10px]">
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1">
          Holding Summary
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-gray-600 font-medium">
            <span>Total Holds</span>
            <span className="font-bold text-gray-900 font-mono">{record.holdingSummary.totalHoldsCount} (21%)</span>
          </div>
          {record.holdingSummary.items.map((item) => (
            <div key={item.label} className="flex justify-between text-gray-500 text-[9px]">
              <span>{item.label}</span>
              <span className="font-mono text-gray-700">{item.count} ({item.pct}%)</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-gray-100 pt-1 mt-0.5 text-gray-800 font-bold">
            <span>Total Holds Value</span>
            <span className="font-mono text-[#8f002b]">{record.holdingSummary.totalValue}</span>
          </div>
        </div>
      </div>

      {/* E. Payment Schedule (This Settlement) */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-[10px]">
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1">
          Payment Schedule (This Settlement)
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Scheduled Value</span>
            <span className="font-mono font-bold text-gray-900">{record.paymentSchedule.scheduledValue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Scheduled Payouts</span>
            <span className="font-mono font-bold text-gray-900">{record.paymentSchedule.scheduledPayouts}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payout Cycle</span>
            <span className="text-gray-400 font-mono">{record.paymentSchedule.payoutCycle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Next Payout</span>
            <span className="text-gray-400 font-mono">{record.paymentSchedule.nextPayout}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Payout</span>
            <span className="text-gray-400 font-mono">{record.paymentSchedule.lastPayout}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-1 mt-0.5">
            <span className="text-gray-500">Est. Payout Amount</span>
            <span className="text-gray-400 font-mono">{record.paymentSchedule.estPayoutAmount}</span>
          </div>
        </div>
      </div>

      {/* F. Lifecycle Scores */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-[10px]">
        <div className="flex items-center justify-between border-b border-gray-100 pb-1">
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">
            Lifecycle Scores
          </p>
          <span className="text-[9px] text-blue-600 font-semibold cursor-pointer">View Details</span>
        </div>
        <div className="flex flex-col gap-1">
          {record.lifecycleScores.map((sc) => (
            <div key={sc.label} className="flex justify-between items-center">
              <span className="text-gray-600 truncate">{sc.label}</span>
              <span className="font-mono font-bold text-emerald-700">{sc.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
