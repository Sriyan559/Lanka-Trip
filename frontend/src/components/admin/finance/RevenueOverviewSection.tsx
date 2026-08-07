'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FN02_COLLECTION_TREND,
  FN02_REVENUE_STREAMS,
  FN02_AGEING_BUCKETS,
} from '@/data/mockRevenueData';

const REVENUE_MIX_DATA = [
  { name: 'Recognized', value: 312.6, color: '#16a34a' },
  { name: 'Deferred', value: 55.8, color: '#7c3aed' },
  { name: 'Outstanding', value: 34.7, color: '#dc2626' },
];

const MONTHLY_REVENUE = [
  { month: 'Jan', recognized: 240, deferred: 52, outstanding: 28 },
  { month: 'Feb', recognized: 258, deferred: 51, outstanding: 30 },
  { month: 'Mar', recognized: 265, deferred: 54, outstanding: 33 },
  { month: 'Apr', recognized: 272, deferred: 52, outstanding: 35 },
  { month: 'May', recognized: 285, deferred: 53, outstanding: 36 },
  { month: 'Jun', recognized: 312.6, deferred: 55.8, outstanding: 34.7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-[11px]">
      <div className="font-bold text-gray-700 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-gray-600">{p.name}:</span>
          <span className="font-bold text-gray-900">LKR {p.value}M</span>
        </div>
      ))}
    </div>
  );
};

export function RevenueOverviewSection() {
  return (
    <div className="flex flex-col gap-3">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Revenue Recognition Trend</div>
              <div className="text-[10px] text-gray-500">Recognized vs Deferred vs Outstanding — LKR millions</div>
            </div>
            <div className="flex gap-3 text-[10px] font-semibold">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />Recognized</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />Deferred</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Outstanding</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="recog" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="defer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outstanding" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="recognized" stroke="#16a34a" fill="url(#recog)" strokeWidth={2} name="Recognized" />
              <Area type="monotone" dataKey="deferred" stroke="#7c3aed" fill="url(#defer)" strokeWidth={1.5} name="Deferred" />
              <Area type="monotone" dataKey="outstanding" stroke="#dc2626" fill="url(#outstanding)" strokeWidth={1.5} name="Outstanding" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Mix Donut */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="text-xs font-bold text-gray-800 mb-1">Revenue Mix</div>
          <div className="text-[10px] text-gray-500 mb-2">Current Period (LKR M)</div>
          <div className="flex items-center gap-2">
            <ResponsiveContainer width={110} height={110}>
              <PieChart>
                <Pie data={REVENUE_MIX_DATA} dataKey="value" cx="50%" cy="50%" innerRadius={32} outerRadius={52} strokeWidth={1}>
                  {REVENUE_MIX_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`LKR ${val}M`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5">
              {REVENUE_MIX_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0" style={{ background: d.color }} />
                  <div>
                    <div className="text-[10px] text-gray-600">{d.name}</div>
                    <div className="text-xs font-bold text-gray-900">LKR {d.value}M</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Streams Table + Collections Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Revenue Streams */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="text-xs font-bold text-gray-800 mb-2">Revenue Streams Breakdown</div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1 font-bold text-gray-600 text-[10px]">Stream</th>
                <th className="text-right py-1 font-bold text-gray-600 text-[10px]">Recognized</th>
                <th className="text-right py-1 font-bold text-gray-600 text-[10px]">Deferred</th>
                <th className="text-right py-1 font-bold text-gray-600 text-[10px]">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {FN02_REVENUE_STREAMS.map((s) => (
                <tr key={s.stream}>
                  <td className="py-1 text-gray-800 font-medium">{s.stream}</td>
                  <td className="py-1 text-right text-emerald-700 font-semibold">{s.recognized}</td>
                  <td className="py-1 text-right text-purple-700 font-semibold">{s.deferred}</td>
                  <td className="py-1 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8f002b] rounded-full" style={{ width: `${s.percentage}%` }} />
                      </div>
                      <span className="text-gray-600 text-[10px] w-6 text-right">{s.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Collection Efficiency */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Collection Efficiency</div>
              <div className="text-[10px] text-gray-500">Monthly collected vs outstanding — %</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-emerald-700">78%</div>
              <div className="text-[10px] text-gray-500">Current month</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={FN02_COLLECTION_TREND} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip formatter={(val: any) => [`${val}%`, '']} />
              <Bar dataKey="collected" name="Collected %" fill="#16a34a" radius={[3, 3, 0, 0]} />
              <Bar dataKey="outstanding" name="Outstanding %" fill="#dc2626" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
