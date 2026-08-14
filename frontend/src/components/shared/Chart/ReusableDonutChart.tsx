'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface DonutDataItem {
  name: string;
  value: number;
  color: string;
}

export interface ReusableDonutChartProps {
  data: DonutDataItem[];
  totalLabel?: string;
  totalValue?: string | number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  className?: string;
}

export function ReusableDonutChart({
  data = [],
  totalLabel = 'Total',
  totalValue,
  height = 180,
  innerRadius = 42,
  outerRadius = 60,
  showLegend = true,
  className = '',
}: ReusableDonutChartProps) {
  const sum = data.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
  const hasRealData = sum > 0;

  const displayData: DonutDataItem[] = hasRealData
    ? data
    : [{ name: 'No Data', value: 1, color: '#e2e8f0' }];

  const displayTotalValue =
    totalValue !== undefined ? totalValue : hasRealData ? sum.toLocaleString() : '0';

  return (
    <div className={`w-full flex items-center justify-between gap-2 min-w-0 ${className}`} style={{ height }}>
      {/* Donut graphic container */}
      <div className="relative h-full flex-1 max-w-[140px] flex items-center justify-center min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={hasRealData ? 2 : 0}
              dataKey="value"
              stroke="none"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {hasRealData && (
              <Tooltip
                contentStyle={{
                  fontSize: '11px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-1">
          <span className="text-sm font-extrabold text-gray-900 leading-none">{displayTotalValue}</span>
          <span className="text-[8px] text-gray-400 mt-0.5 uppercase font-bold tracking-wider">{totalLabel}</span>
        </div>
      </div>

      {/* Legend list */}
      {showLegend && (
        <div className="flex-1 flex flex-col gap-1 pr-1 min-w-0">
          {hasRealData ? (
            data.map((item, i) => {
              const pct = sum > 0 ? ((item.value / sum) * 100).toFixed(0) : '0';
              return (
                <div key={i} className="flex items-center justify-between text-[10px] min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-gray-900 whitespace-nowrap pl-1">
                    <span>{item.value}</span>
                    <span className="text-gray-400 text-[9px]">({pct}%)</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-[10px] text-gray-400 italic">No category records</div>
          )}
        </div>
      )}
    </div>
  );
}
export default ReusableDonutChart;

