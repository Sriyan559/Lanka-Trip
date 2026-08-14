'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
  strokeWidth?: number;
  dashed?: boolean;
}

export interface ResponsiveLineChartProps {
  data: Record<string, any>[];
  series: ChartSeries[];
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function ResponsiveLineChart({
  data = [],
  series = [],
  xAxisKey = 'date',
  height = 180,
  showGrid = true,
  showLegend = true,
  className = '',
  emptyMessage = 'No activity data recorded for this window',
}: ResponsiveLineChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className={`w-full min-w-0 flex flex-col ${className}`}>
      {!hasData ? (
        <div
          className="w-full flex items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded text-xs text-gray-400"
          style={{ height }}
        >
          {emptyMessage}
        </div>
      ) : (
        <div className="w-full min-w-0" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 10, left: -25, bottom: 0 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
              <XAxis
                dataKey={xAxisKey}
                tick={{ fontSize: 9, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                tick={{ fontSize: 9, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 'auto']}
              />
              <Tooltip
                contentStyle={{
                  fontSize: '11px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  backgroundColor: '#ffffff',
                }}
              />
              {showLegend && (
                <Legend
                  wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }}
                  iconType="circle"
                  iconSize={6}
                />
              )}
              {series.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={s.strokeWidth || 1.8}
                  strokeDasharray={s.dashed ? '4 4' : undefined}
                  dot={{ r: 2.5, fill: s.color, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 5, fill: s.color, stroke: '#ffffff', strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
export default ResponsiveLineChart;

