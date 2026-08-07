'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DataPoint {
  date: string;
  requested: number;
  captured: number;
  failed: number;
}

interface Props {
  data: DataPoint[];
}

export function PaymentAmountTrendChart({ data }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
        Payment Amount Trend (LKR M)
      </p>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 9, fill: '#64748b' }} unit="M" width={40} />
            <Tooltip
              contentStyle={{ fontSize: 10 }}
              formatter={(val: any) => [`LKR ${val}M`, '']}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Area
              type="monotone"
              dataKey="requested"
              name="Requested"
              stroke="#2563eb"
              fill="#dbeafe"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="captured"
              name="Captured"
              stroke="#16a34a"
              fill="#dcfce7"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="failed"
              name="Failed"
              stroke="#dc2626"
              fill="#fee2e2"
              strokeWidth={1.5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
