'use client';

import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { paymentsView, usePaymentsManagement } from '@/contexts/FinanceRevenuePaymentsContext';

const COLORS=['#2563eb','#7c3aed','#16a34a','#d97706','#64748b','#dc2626'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-[11px]">
      <div className="font-bold text-gray-700 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-gray-600">{p.name}:</span>
          <span className="font-bold text-gray-900">
            {p.name === 'Payment Value' ? `LKR ${p.value}M` : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function PaymentOverviewSection() {
  const { data }=usePaymentsManagement(); const live=paymentsView(data);
  const volume=live.trend.map((r:any)=>({date:r.period,attempts:Number(r.attempts),authorizations:Number(r.success),captures:Number(r.success),failures:Math.max(0,Number(r.attempts)-Number(r.success)),reversals:0,value:Number(r.amount)/1_000_000}));
  const methodTotal=live.methods.reduce((s:number,r:any)=>s+Number(r.amount),0); const methods=live.methods.map((r:any,i:number)=>({name:r.method,value:Number(r.amount)/1_000_000,percentage:methodTotal?Math.round(Number(r.amount)/methodTotal*100):0,color:COLORS[i%COLORS.length]}));
  const statusTotal=live.statuses.reduce((s:number,r:any)=>s+Number(r.count),0); const statuses=live.statuses.map((r:any,i:number)=>({id:r.status,status:r.status,count:Number(r.count),percentage:statusTotal?Math.round(Number(r.count)/statusTotal*100):0,color:COLORS[i%COLORS.length]}));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Panel 1: Payment Volume & Success Trend */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-xs font-bold text-gray-900">
              Payment Volume &amp; Success Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span>
            </h3>
            <p className="text-[10px] text-gray-500">Transaction counts and processed value</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[9px] font-semibold text-gray-600 my-1 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" /> Attempts
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Authorizations
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-purple-500 inline-block" /> Captures
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-red-500 inline-block" /> Failures
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" /> Reversals
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-0.5 bg-gray-600 inline-block" /> Payment Value (LKR)
          </span>
        </div>

        <div className="h-40 w-full mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={volume} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="attempts" fill="#3b82f6" name="Attempts" barSize={5} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="authorizations" fill="#10b981" name="Authorizations" barSize={5} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="captures" fill="#8b5cf6" name="Captures" barSize={5} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="failures" fill="#ef4444" name="Failures" barSize={5} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="reversals" fill="#f59e0b" name="Reversals" barSize={5} radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="value" stroke="#374151" strokeWidth={2} dot={{ r: 2 }} name="Payment Value" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Panel 2: Payment Method Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-900">Payment Method Distribution</h3>
          <p className="text-[10px] text-gray-500 mb-2">Volume and share by payment channel</p>
        </div>

        <div className="flex items-center gap-3 my-auto">
          {/* Donut Chart with Center Text */}
          <div className="relative w-32 h-32 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={methods}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={56}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {methods.map((entry:any, index:number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`LKR ${val}M`, 'Value']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">LKR</span>
              <span className="text-xs font-extrabold text-gray-900 leading-tight">428.1M</span>
              <span className="text-[8px] text-gray-500 font-medium">Captured Value</span>
            </div>
          </div>

          {/* Breakdown Legend Table */}
          <div className="flex-1 min-w-0">
            <table className="w-full text-[10px]">
              <tbody className="divide-y divide-gray-100">
                {methods.map((m:any) => (
                  <tr key={m.name}>
                    <td className="py-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                      <span className="font-semibold text-gray-800 truncate">{m.name}</span>
                    </td>
                    <td className="py-1 text-right font-bold text-gray-900">{m.percentage}%</td>
                    <td className="py-1 text-right text-gray-500 font-mono">{m.value}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Panel 3: Payment Status Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-900">Payment Status Summary</h3>
          <p className="text-[10px] text-gray-500 mb-1.5">Breakdown across transaction execution stages</p>
        </div>

        <div className="overflow-y-auto max-h-44 scrollbar-thin">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-1 text-left font-bold">Status</th>
                <th className="pb-1 text-right font-bold">Count</th>
                <th className="pb-1 text-right font-bold w-24">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {statuses.map((row:any) => (
                <tr key={row.id} className="hover:bg-gray-50/50">
                  <td className="py-1 font-semibold text-gray-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                    <span className="truncate">{row.status}</span>
                  </td>
                  <td className="py-1 text-right font-bold text-gray-900 font-mono">
                    {row.count.toLocaleString()}
                  </td>
                  <td className="py-1 text-right">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden inline-flex">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${row.percentage}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
