"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const trendData = [
  { name: 'Jul 6', created: 400, submitted: 300, approved: 200, rejected: 100, published: 150 },
  { name: 'Jul 13', created: 600, submitted: 400, approved: 250, rejected: 120, published: 200 },
  { name: 'Jul 20', created: 800, submitted: 550, approved: 350, rejected: 150, published: 300 },
  { name: 'Jul 27', created: 1200, submitted: 800, approved: 600, rejected: 180, published: 500 },
  { name: 'Aug 3', created: 1800, submitted: 1300, approved: 1100, rejected: 250, published: 900 },
];

const compositionData = [
  { name: 'Skincare', value: 4159, color: '#8b2c45' },
  { name: 'Haircare', value: 2784, color: '#3f2b96' },
  { name: 'Fragrance', value: 2078, color: '#10b981' },
  { name: 'Makeup', value: 1046, color: '#f59e0b' },
  { name: 'Personal Care', value: 1000, color: '#6366f1' },
  { name: 'Others', value: 873, color: '#94a3b8' },
];

export function CatalogueCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[13px] font-bold text-ink">Catalogue Growth & Approval Trend</h3>
          <div className="flex items-center gap-1 bg-canvas p-0.5 rounded text-[11px] font-medium text-muted">
            <button className="px-2 py-1 rounded">Daily</button>
            <button className="px-2 py-1 rounded bg-white text-ink shadow-sm">Weekly</button>
            <button className="px-2 py-1 rounded">Monthly</button>
            <button className="px-2 py-1 rounded">Quarterly</button>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip />
              <Area type="monotone" dataKey="created" stackId="1" stroke="#8b2c45" fill="#8b2c45" fillOpacity={0.1} />
              <Area type="monotone" dataKey="submitted" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              <Area type="monotone" dataKey="approved" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
              <Area type="monotone" dataKey="published" stackId="1" stroke="#3f2b96" fill="#3f2b96" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-6">Catalogue Composition</h3>
        <div className="flex h-[250px]">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={compositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-3">
            {compositionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted">{item.name}</span>
                </div>
                <div className="font-semibold text-ink">
                  {Math.round((item.value / 12840) * 100)}% <span className="text-muted font-normal ml-1">({item.value.toLocaleString()})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
