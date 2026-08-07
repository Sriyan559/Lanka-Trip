'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
  percentage?: string;
}

interface DonutChartCardProps {
  title: string;
  data: DataItem[];
  totalLabel: string;
  totalValue: number | string;
}

export function DonutChartCard({ title, data, totalLabel, totalValue }: DonutChartCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col shadow-sm h-full">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-center flex-1">
        <div className="w-1/2 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#111827', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-900">{totalValue}</span>
            <span className="text-[10px] text-gray-500">{totalLabel}</span>
          </div>
        </div>
        <div className="w-1/2 pl-4 flex flex-col gap-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{item.value}</span>
                {item.percentage && (
                  <span className="text-gray-400 text-[10px] w-8 text-right">({item.percentage})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
