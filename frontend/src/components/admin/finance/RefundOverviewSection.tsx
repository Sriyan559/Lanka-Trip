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
import type { RefundTrendPoint, RefundTypeItem, RefundStatusItem } from '@/services/api/financeRefundsService';

interface Props {
  trendData: RefundTrendPoint[];
  donutData: RefundTypeItem[];
  statusSummary: RefundStatusItem[];
  loading?: boolean;
  onStatusClick?: (status: string) => void;
}

export function RefundOverviewSection({ trendData, donutData, statusSummary, loading, onStatusClick }: Props) {
  const totalDonutCount = donutData.reduce((acc, curr) => acc + curr.count, 0);
  const maxStatusCount = Math.max(...statusSummary.map((s) => s.count), 1);

  const emptyDonut = [{ name: 'No Data', count: 1, color: '#e2e8f0' }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
      {/* ── Left: Trend Chart ── */}
      <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
            Refund &amp; Compensation Trend
          </p>
          <span className="text-[10px] text-gray-400 font-medium">Daily Resolution Volume</span>
        </div>

        <div className="h-44 relative">
          {loading && trendData.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gray-50 rounded animate-pulse" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 9, fill: '#64748b' }} width={30} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6, padding: '4px 8px' }} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 2 }} />
                <Bar dataKey="requests" name="Refund Requests" fill="#3b82f6" barSize={12} radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey="completed" name="Completed" stroke="#16a34a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="compPaid" name="Compensation Paid" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="failed" name="Failed" stroke="#dc2626" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="slaBreaches" name="SLA Breaches" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
          {!loading && trendData.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-xs text-gray-400">No refund data for the selected period.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Middle: Donut ── */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col justify-between">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
          Refund Type Distribution
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="relative w-28 h-28 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={totalDonutCount > 0 ? donutData : emptyDonut}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={44}
                  dataKey="count"
                  paddingAngle={2}
                >
                  {(totalDonutCount > 0 ? donutData : emptyDonut).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xs font-extrabold text-gray-900 leading-none">
                {totalDonutCount.toLocaleString()}
              </span>
              <span className="text-[8px] font-semibold text-gray-400 uppercase">Total</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1 text-[10px]">
            {loading && donutData.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-3 bg-gray-100 rounded animate-pulse" />
                ))
              : donutData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold shrink-0">
                      <span className="text-gray-800">{item.count}</span>
                      <span className="text-gray-400 text-[9px]">({item.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* ── Right: Status Summary ── */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
            Refund Status Summary
          </p>
          <span className="text-[9px] font-semibold text-gray-400">Count &amp; Amount</span>
        </div>

        <div className="flex flex-col gap-1 text-[10px] mt-1">
          {loading && statusSummary.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
              ))
            : statusSummary.length === 0
            ? <p className="text-gray-400 text-center py-4">No status data available.</p>
            : statusSummary.map((row) => (
                <button
                  key={row.id}
                  onClick={() => onStatusClick?.(row.status)}
                  className="flex items-center gap-2 text-left w-full group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-medium text-gray-600 truncate group-hover:text-gray-900 transition-colors">{row.status}</span>
                      <span className="font-bold text-gray-800">{row.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min((row.count / maxStatusCount) * 100, 100)}%`,
                          backgroundColor: row.color,
                        }}
                      />
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-gray-500 w-12 text-right shrink-0">
                    {row.amount.replace(/^[A-Z]+ /, '')}
                  </span>
                </button>
              ))}
        </div>
      </div>
    </div>
  );
}
