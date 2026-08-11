'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Send,
  RefreshCcw,
  Clock,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { revenueView, useRevenueReceivables } from '@/contexts/FinanceRevenuePaymentsContext';

const SEVERITY_COLORS: Record<string, string> = {
  Critical: 'bg-red-100 border-l-2 border-red-500 text-red-700',
  High: 'bg-orange-50 border-l-2 border-orange-400 text-orange-700',
  Medium: 'bg-yellow-50 border-l-2 border-yellow-400 text-yellow-700',
  Low: 'bg-blue-50 border-l-2 border-blue-400 text-blue-700',
  Info: 'bg-gray-50 border-l-2 border-gray-300 text-gray-600',
};

const SUMMARY_ITEMS = [
  { label: 'Total Invoiced', value: 'LKR 432.8M', isPositive: true },
  { label: 'Net Sales', value: 'LKR 368.4M', isPositive: true },
  { label: 'Recognized Revenue', value: 'LKR 312.6M', isPositive: true },
  { label: 'Deferred Revenue', value: 'LKR 55.8M', isPositive: false },
  { label: 'Total Receivables', value: 'LKR 124.3M', isPositive: false },
  { label: 'Collections (MTD)', value: 'LKR 89.6M', isPositive: true },
  { label: 'Outstanding Balance', value: 'LKR 34.7M', isPositive: false },
  { label: 'Total Refunds', value: 'LKR 14.2M', isPositive: false },
  { label: 'Overdue Receivables', value: 'LKR 8.1M', isPositive: false },
  { label: 'Disputed Invoices', value: 'LKR 3.6M', isPositive: false },
  { label: 'Discounts Given', value: 'LKR 28.4M', isPositive: null },
  { label: 'Collection Rate', value: '78.0%', isPositive: true },
] as const;

const QUICK_ACTIONS = [
  { label: 'Send Payment Reminders', icon: <Send size={12} />, fn: () => toast.success('Sending payment reminders...') },
  { label: 'Run Revenue Recognition', icon: <RefreshCcw size={12} />, fn: () => toast.success('Running recognition batch...') },
  { label: 'Escalate Overdue', icon: <AlertTriangle size={12} />, fn: () => toast.error('Escalating 64 overdue accounts...') },
  { label: 'Batch Approve Invoices', icon: <Clock size={12} />, fn: () => toast.success('Batch approval initiated...') },
];

export function RightRevenueSidebar() {
  const { data }=useRevenueReceivables(); const live=revenueView(data); const alerts=live.alerts;
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const displayedAlerts = showAllAlerts ? alerts : alerts.slice(0, 4);

  return (
    <aside className="w-full xl:w-72 2xl:w-80 flex-shrink-0 flex flex-col gap-3 text-[11px]">
      {/* Revenue Financial Summary */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
          <span className="text-xs font-bold text-gray-700">Revenue Financial Summary</span>
        </div>
        <div className="p-2 flex flex-col gap-0.5">
          {SUMMARY_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-1 px-1 rounded hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-500 font-medium">{item.label}</span>
              <div className="flex items-center gap-1">
                {item.isPositive === true && <TrendingUp size={10} className="text-emerald-500" />}
                {item.isPositive === false && <TrendingDown size={10} className="text-red-400" />}
                <span
                  className={`font-bold ${
                    item.isPositive === true
                      ? 'text-emerald-700'
                      : item.isPositive === false
                      ? 'text-red-700'
                      : 'text-gray-700'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Period Info */}
        <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span>Period: May 2025</span>
            <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Open</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">Last synced: May 26, 2025 10:15 AM</div>
        </div>
      </div>

      {/* Collection Health */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
        <div className="text-xs font-bold text-gray-700 mb-2">Collection Health</div>
        {/* Donut-style gauge */}
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#f0f0f0" strokeWidth="8" />
              <circle
                cx="32" cy="32" r="26" fill="none"
                stroke="#16a34a" strokeWidth="8"
                strokeDasharray={`${(78 / 100) * 163.4} 163.4`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-extrabold text-gray-900">78%</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-700">Collection Rate</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Target: 75% · Achieved: 78%</div>
            <div className="text-[10px] text-gray-500">↑ 3pp above target</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-1 border-t border-gray-100">
          {[
            { label: 'Current (<30d)', pct: 88, color: '#16a34a' },
            { label: 'At Risk (30-60d)', pct: 62, color: '#d97706' },
            { label: 'Overdue (60d+)', pct: 34, color: '#dc2626' },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-gray-500">{s.label}</span>
                <span className="font-bold" style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Alerts */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 rounded-t-lg flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">Priority Alerts</span>
          <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {alerts.filter((a) => a.severity === 'Critical' || a.severity === 'High').length} critical/high
          </span>
        </div>
        <div className="p-2 flex flex-col gap-1.5">
          {displayedAlerts.map((alert) => (
            <div key={alert.id} className={`p-2 rounded text-[10px] font-medium ${SEVERITY_COLORS[alert.severity]}`}>
              <div className="flex items-start gap-1.5">
                <span className="font-bold flex-shrink-0 text-[9px] uppercase tracking-wide mt-0.5">
                  {alert.severity}
                </span>
                <span>{alert.message}</span>
              </div>
            </div>
          ))}
        </div>
        {alerts.length > 4 && (
          <div className="px-3 py-1.5 border-t border-gray-100">
            <button
              onClick={() => setShowAllAlerts((p) => !p)}
              className="text-[10px] text-[#8f002b] font-bold hover:underline flex items-center gap-1"
            >
              {showAllAlerts ? 'Show fewer' : `Show all ${alerts.length} alerts`}
              <ChevronRight size={10} className={showAllAlerts ? 'rotate-90' : ''} />
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
        <div className="text-xs font-bold text-gray-700 mb-2">Revenue Quick Actions</div>
        <div className="flex flex-col gap-1.5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={action.fn}
              className="w-full text-left px-2.5 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-[11px] font-semibold text-gray-700 flex items-center gap-2 transition-colors border border-gray-100 hover:border-gray-200"
            >
              <span className="text-gray-500">{action.icon}</span>
              {action.label}
              <ChevronRight size={10} className="ml-auto text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Receivables Aging Snapshot */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
        <div className="text-xs font-bold text-gray-700 mb-2">Ageing Snapshot</div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: '0–7 Days', value: 'LKR 42.1M', pct: 34, color: '#16a34a' },
            { label: '8–30 Days', value: 'LKR 28.6M', pct: 23, color: '#2563eb' },
            { label: '31–60 Days', value: 'LKR 18.4M', pct: 15, color: '#d97706' },
            { label: '61–90 Days', value: 'LKR 21.5M', pct: 17, color: '#ea580c' },
            { label: '90+ Days', value: 'LKR 13.7M', pct: 11, color: '#dc2626' },
          ].map((bucket) => (
            <div key={bucket.label}>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-gray-500 font-medium">{bucket.label}</span>
                <span className="font-bold text-gray-900">{bucket.value}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${bucket.pct}%`, background: bucket.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-[10px]">
          <span className="text-gray-500">Total Receivables</span>
          <span className="font-extrabold text-gray-900">LKR 124.3M</span>
        </div>
      </div>
    </aside>
  );
}
