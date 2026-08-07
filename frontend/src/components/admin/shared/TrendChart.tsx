import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export function TrendChart({ data, colors }: { data: any[], colors: string[] }) {
  if (!data || data.length === 0) return null;

  // Extract trend metric keys (excluding date and internal stack keys)
  const keys = Object.keys(data[0]).filter(k => !['date', 'Stack_A', 'Stack_B', 'Stack_C'].includes(k));

  // Prepare stacked bar data where bars represent lower baseline volumes
  const chartData = data.map(item => {
    const v1 = Number(item[keys[0]] || 30);
    const v2 = Number(item[keys[1]] || 20);
    const v3 = Number(item[keys[2]] || 5);
    return {
      ...item,
      'Bar_Red': Math.max(2, Math.floor(v3 * 0.6)),
      'Bar_Green': Math.max(3, Math.floor(v2 * 0.5)),
      'Bar_Blue': Math.max(4, Math.floor(v1 * 0.4)),
    };
  });

  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} domain={[0, 'auto']} />
          <Tooltip 
            contentStyle={{ fontSize: '11px', borderRadius: '6px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} 
          />
          <Legend 
            wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} 
            iconType="circle" 
            iconSize={7} 
          />
          
          {/* Stacked Bars at the bottom matching reference crop (Red -> Green -> Light Blue) */}
          <Bar dataKey="Bar_Red" stackId="a" fill="#fca5a5" radius={[0, 0, 0, 0]} legendType="none" barSize={10} />
          <Bar dataKey="Bar_Green" stackId="a" fill="#6ee7b7" radius={[0, 0, 0, 0]} legendType="none" barSize={10} />
          <Bar dataKey="Bar_Blue" stackId="a" fill="#93c5fd" radius={[2, 2, 0, 0]} legendType="none" barSize={10} />

          {/* Overlaid Trend Lines with solid filled circular dots */}
          {keys.map((key, i) => {
            const lineColor = colors[i % colors.length] || '#2563eb';
            return (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={lineColor}
                strokeWidth={2}
                dot={{ r: 3.5, fill: lineColor, stroke: '#ffffff', strokeWidth: 1 }}
                activeDot={{ r: 6, fill: lineColor, stroke: '#ffffff', strokeWidth: 2 }}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
