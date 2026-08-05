"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChevronDown, MoreVertical } from "lucide-react";

const trendData = [
  { name: 'Jul 6', total: 1000, active: 800, pending: 200, rejected: 100 },
  { name: 'Jul 13', total: 1100, active: 850, pending: 220, rejected: 120 },
  { name: 'Jul 20', total: 1250, active: 950, pending: 250, rejected: 150 },
  { name: 'Jul 27', total: 1350, active: 1050, pending: 260, rejected: 140 },
  { name: 'Aug 3', total: 1500, active: 1200, pending: 280, rejected: 160 },
];

const compositionData = [
  { name: 'Skincare', value: 4108, color: '#0284c7' }, // Blue
  { name: 'Haircare', value: 3210, color: '#059669' }, // Green
  { name: 'Fragrance', value: 2054, color: '#d97706' }, // Yellow/Orange
  { name: 'Makeup', value: 1540, color: '#ea580c' }, // Orange
  { name: 'Bath & Body', value: 1028, color: '#dc2626' }, // Red
  { name: 'Other', value: 900, color: '#8b5cf6' }, // Purple
];

export function CatalogueCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Trend Chart */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-bold text-ink">Catalogue Growth & Approval Trend</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-[11px] font-semibold text-ink border border-line px-2 py-1 rounded hover:bg-slate-50">
              Last 30 Days <ChevronDown size={12} />
            </button>
            <button className="text-muted hover:text-ink"><MoreVertical size={14} /></button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-[#0284c7]"></div>
             <span className="text-[11px] font-semibold text-muted">Total Masters</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-[#059669]"></div>
             <span className="text-[11px] font-semibold text-muted">Active Products</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-[#ea580c]"></div>
             <span className="text-[11px] font-semibold text-muted">Pending Approval</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-[#dc2626]"></div>
             <span className="text-[11px] font-semibold text-muted">Rejected</span>
          </div>
        </div>

        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} tickCount={7} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="total" stroke="#0284c7" strokeWidth={2} dot={{ r: 3, fill: '#0284c7', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="active" stroke="#059669" strokeWidth={2} dot={{ r: 3, fill: '#059669', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="pending" stroke="#ea580c" strokeWidth={2} dot={{ r: 3, fill: '#ea580c', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="rejected" stroke="#dc2626" strokeWidth={2} dot={{ r: 3, fill: '#dc2626', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Composition Chart */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[14px] font-bold text-ink">Catalogue Composition</h3>
          <button className="text-muted hover:text-ink"><MoreVertical size={14} /></button>
        </div>
        
        <div className="flex items-center h-[240px]">
          <div className="flex-1 relative h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={compositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
               <span className="text-[20px] font-bold text-ink leading-none">12,840</span>
               <span className="text-[10px] font-semibold text-muted">Total Products</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-4 pl-4">
            {compositionData.map((item) => {
              const percentage = Math.round((item.value / 12840) * 100);
              return (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-ink">{item.name}</span>
                  </div>
                  <div className="flex gap-4 min-w-[80px] justify-end">
                    <span className="font-bold text-ink">{item.value.toLocaleString()}</span>
                    <span className="text-muted font-semibold w-8 text-right">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
