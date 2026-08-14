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
  innerRadius,
  outerRadius,
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

  // Calculate proportional inner & outer radii based on container height if not explicitly provided
  const computedOuter = outerRadius ?? Math.min(Math.round(height * 0.38), 85);
  const computedInner = innerRadius ?? Math.max(Math.round(computedOuter * 0.64), 20);

  // Dynamic center text sizes based on chart height
  const valueFontSize = height <= 120 ? 'text-xs' : height <= 150 ? 'text-sm' : 'text-base';
  const labelFontSize = height <= 120 ? 'text-[7px]' : height <= 150 ? 'text-[8px]' : 'text-[9px]';

  return (
    <div
      className={`w-full flex items-center justify-between gap-3 min-w-0 ${className}`}
      style={{ height }}
    >
      {/* Donut graphic container */}
      <div
        className={`relative h-full flex items-center justify-center shrink-0 min-w-0 ${
          showLegend ? '' : 'w-full'
        }`}
        style={showLegend ? { width: Math.min(height * 1.1, 200) } : undefined}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={computedInner}
              outerRadius={computedOuter}
              paddingAngle={hasRealData ? 2.5 : 0}
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
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  backgroundColor: '#ffffff',
                  padding: '6px 10px',
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-1">
          <span className={`${valueFontSize} font-black text-gray-900 leading-none tracking-tight`}>
            {displayTotalValue}
          </span>
          <span className={`${labelFontSize} text-gray-400 mt-0.5 uppercase font-bold tracking-wider`}>
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Legend list */}
      {showLegend && (
        <div className="flex-1 flex flex-col gap-1.5 justify-center pr-1 min-w-0">
          {hasRealData ? (
            data.map((item, i) => {
              const pct = sum > 0 ? ((item.value / sum) * 100).toFixed(0) : '0';
              return (
                <div key={i} className="flex items-center justify-between text-xs min-w-0 gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 font-medium truncate text-[11px] leading-tight" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-gray-900 text-[11px] whitespace-nowrap pl-1 shrink-0">
                    <span>{item.value.toLocaleString()}</span>
                    <span className="text-gray-400 text-[10px] font-normal">({pct}%)</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xs text-gray-400 italic">No category records</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReusableDonutChart;

