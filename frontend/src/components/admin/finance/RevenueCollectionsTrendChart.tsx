'use client';

import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MOCK_TREND_CHART_DATA } from '@/data/mockFinanceData';

export function RevenueCollectionsTrendChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between h-full">
      {/* Title & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-xs font-bold text-gray-900">
            Revenue, Collection & Refund Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span>
          </h3>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={MOCK_TREND_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} unit="M" />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', fontSize: '11px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              formatter={(value: any) => [`LKR ${value}M`, '']}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            />
            {/* Series Lines */}
            <Line
              type="monotone"
              dataKey="revenue"
              name="Net Revenue (LKR M)"
              stroke="#8f002b"
              strokeWidth={2}
              dot={{ r: 2.5, fill: '#8f002b' }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="collections"
              name="Collections (LKR M)"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 2.5, fill: '#16a34a' }}
            />
            <Line
              type="monotone"
              dataKey="refunds"
              name="Refunds (LKR M)"
              stroke="#f59e0b"
              strokeWidth={1.75}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="failed"
              name="Failed Payments (LKR M)"
              stroke="#dc2626"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="gmv"
              name="GMV (LKR M)"
              stroke="#9ca3af"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
