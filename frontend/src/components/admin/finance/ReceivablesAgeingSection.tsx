'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { revenueView, useRevenueReceivables } from '@/contexts/FinanceRevenuePaymentsContext';

const OVERDUE_ACCOUNTS = [
  { name: 'Beauté Collective', amount: 'LKR 204,352', days: 92, bucket: '90+', risk: 'Critical' },
  { name: 'Luxe Hair Studio', amount: 'LKR 361,440', days: 61, bucket: '61-90', risk: 'High' },
  { name: 'Tranquil Beauty Hub', amount: 'LKR 153,264', days: 31, bucket: '31-60', risk: 'Medium' },
  { name: 'Glam Studio Lanka', amount: 'LKR 86,848', days: 18, bucket: '8-30', risk: 'Low' },
];

const RISK_COLORS: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700',
  High: 'bg-orange-100 text-orange-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-blue-100 text-blue-700',
};

export function ReceivablesAgeingSection() {
  const {data}=useRevenueReceivables(); const live=revenueView(data);const colors=['#16a34a','#2563eb','#d97706','#ea580c','#dc2626'];const total=live.aging.reduce((s:number,b:any)=>s+Number(b.amount),0);const buckets=live.aging.map((b:any,i:number)=>({label:`${b.bucket} Days`,amount:`${live.context?.baseCurrency??'LKR'} ${Number(b.amount).toLocaleString()}`,count:live.rows.filter(r=>r.ageingBucket===b.bucket).length,percentage:total?Math.round(Number(b.amount)/total*100):0,color:colors[i]}));const AGEING_CHART_DATA=buckets.map((b:any)=>({bucket:b.label,count:b.count,fill:b.color}));
  return (
    <div className="flex flex-col gap-3">
      {/* Ageing Summary Cards */}
      <div className="grid grid-cols-5 gap-2">
        {buckets.map((bucket:any) => (
          <div
            key={bucket.label}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
          >
            <div className="text-[10px] font-bold text-gray-500 mb-1">{bucket.label}</div>
            <div className="text-sm font-extrabold text-gray-900">{bucket.amount}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{bucket.count} invoices</div>
            {/* Mini progress bar */}
            <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${bucket.percentage}%`, background: bucket.color }}
              />
            </div>
            <div className="text-[10px] font-bold mt-0.5" style={{ color: bucket.color }}>
              {bucket.percentage}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Table Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Ageing Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="text-xs font-bold text-gray-800 mb-1">Ageing Distribution by Count</div>
          <div className="text-[10px] text-gray-500 mb-2">Number of invoices per ageing bucket</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={AGEING_CHART_DATA} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bucket" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(val: any) => [`${val} invoices`, 'Count']} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {AGEING_CHART_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overdue Accounts */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Overdue Accounts — Priority List</div>
              <div className="text-[10px] text-gray-500">Accounts requiring immediate collection action</div>
            </div>
            <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
              4 accounts
            </span>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            {OVERDUE_ACCOUNTS.map((acc) => (
              <div
                key={acc.name}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-gray-900">{acc.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {acc.days} days overdue · Bucket: {acc.bucket}d
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-red-700">{acc.amount}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${RISK_COLORS[acc.risk]}`}>
                    {acc.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <div className="text-[10px] text-gray-500">
              Total overdue:{' '}
              <span className="font-bold text-red-700">LKR 805,904</span>
            </div>
            <button className="text-[10px] text-[#8f002b] font-bold hover:underline">
              View all overdue →
            </button>
          </div>
        </div>
      </div>

      {/* Ageing Detail Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">Receivables Ageing Detail</span>
          <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-semibold">Summary View</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]" style={{ minWidth: 700 }}>
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">Ageing Bucket</th>
                <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600">Invoice Count</th>
                <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600">Total Amount</th>
                <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600">% of Total</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">Risk Level</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">Action Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {buckets.map((bucket:any) => {
                const riskMap: Record<string, { level: string; action: string; color: string }> = {
                  '0–7 Days': { level: 'Normal', action: 'Monitor', color: 'bg-emerald-100 text-emerald-700' },
                  '8–30 Days': { level: 'Low', action: 'Send Reminder', color: 'bg-blue-100 text-blue-700' },
                  '31–60 Days': { level: 'Medium', action: 'Follow Up', color: 'bg-yellow-100 text-yellow-700' },
                  '61–90 Days': { level: 'High', action: 'Escalate', color: 'bg-orange-100 text-orange-700' },
                  '90+ Days': { level: 'Critical', action: 'Legal Action', color: 'bg-red-100 text-red-700' },
                };
                const info = riskMap[bucket.label] ?? { level: '—', action: '—', color: 'bg-gray-100 text-gray-500' };
                return (
                  <tr key={bucket.label} className="hover:bg-gray-50">
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: bucket.color }} />
                        <span className="font-semibold text-gray-800">{bucket.label}</span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-right font-bold text-gray-900">{bucket.count}</td>
                    <td className="px-3 py-1.5 text-right font-bold text-gray-900">{bucket.amount}</td>
                    <td className="px-3 py-1.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${bucket.percentage}%`, background: bucket.color }} />
                        </div>
                        <span className="text-gray-700 font-semibold">{bucket.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${info.color}`}>{info.level}</span>
                    </td>
                    <td className="px-3 py-1.5 text-gray-600">{info.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
