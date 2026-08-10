import React from 'react';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export function TrendChart({ data, colors }: { data: any[], colors: string[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full min-h-[220px] flex items-center justify-center border border-dashed border-gray-200 rounded-md bg-gray-50/50">
        <span className="text-xs text-gray-400 font-medium">No activity for this period</span>
      </div>
    );
  }

  // Extract trend metric keys (excluding date and internal keys)
  const keys = Object.keys(data[0]).filter(k => !['date'].includes(k));

  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
