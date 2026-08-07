'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Settings2 } from 'lucide-react';

export interface TrendData {
  name: string;
  [key: string]: string | number;
}

interface TrendSeries {
  key: string;
  name: string;
  color: string;
  type: 'line' | 'bar' | 'area';
}

interface TrendChartCardProps {
  title: string;
  data: TrendData[];
  series: TrendSeries[];
  timeRange?: string;
}

export function TrendChartCard({ title, data, series, timeRange = 'Last 30 Days' }: TrendChartCardProps) {
  const hasBar = series.some(s => s.type === 'bar');
  const ChartComponent = hasBar ? BarChart : AreaChart;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">({timeRange})</span>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-700 bg-white outline-none hover:border-gray-400">
            <option>{timeRange}</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>
      
      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {/* @ts-ignore */}
          <ChartComponent data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#6b7280' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#6b7280' }} 
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            />
            <Legend 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            {series.map((s, idx) => {
              if (s.type === 'bar') {
                return <Bar key={idx} dataKey={s.key} name={s.name} fill={s.color} radius={[2, 2, 0, 0]} maxBarSize={40} />;
              }
              return (
                <Area 
                  key={idx} 
                  type="monotone" 
                  dataKey={s.key} 
                  name={s.name} 
                  stroke={s.color} 
                  fill={s.color} 
                  fillOpacity={0.1} 
                  strokeWidth={2} 
                />
              );
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
