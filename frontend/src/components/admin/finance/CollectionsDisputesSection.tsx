'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronRight,
  Send,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { revenueView, useRevenueReceivables } from '@/contexts/FinanceRevenuePaymentsContext';

const COLLECTION_QUEUE = [
  { name: 'Beauté Collective', amount: 'LKR 204,352', days: 92, status: 'Dispute Open', priority: 'P1' },
  { name: 'Luxe Hair Studio', amount: 'LKR 361,440', days: 61, status: 'Final Notice', priority: 'P1' },
  { name: 'Tranquil Beauty Hub', amount: 'LKR 153,264', days: 31, status: 'Follow Up', priority: 'P2' },
  { name: 'Glam Studio Lanka', amount: 'LKR 86,848', days: 18, status: 'First Reminder', priority: 'P3' },
];

const DISPUTES = [
  { ref: 'DISP-2025-0043', account: 'Beauté Collective', amount: 'LKR 204,352', raisedOn: 'May 18, 2025', reason: 'Service quality dispute', status: 'Open' },
  { ref: 'DISP-2025-0042', account: 'Luxe Hair Studio', amount: 'LKR 38,880', raisedOn: 'May 12, 2025', reason: 'Incorrect invoice amount', status: 'In Review' },
  { ref: 'DISP-2025-0041', account: 'Tranquil Beauty Hub', amount: 'LKR 12,000', raisedOn: 'May 05, 2025', reason: 'Duplicate charge', status: 'Resolved' },
];

const STATUS_ICON: Record<string, React.ReactNode> = {
  'Dispute Open': <XCircle size={12} className="text-red-500" />,
  'Final Notice': <AlertTriangle size={12} className="text-orange-500" />,
  'Follow Up': <Clock size={12} className="text-yellow-500" />,
  'First Reminder': <Send size={12} className="text-blue-500" />,
};

const DISPUTE_BADGE: Record<string, string> = {
  Open: 'bg-red-100 text-red-700',
  'In Review': 'bg-amber-100 text-amber-700',
  Resolved: 'bg-emerald-100 text-emerald-700',
};

const ACT_COLORS: Record<string, string> = {
  payment: '#16a34a',
  invoice: '#7c3aed',
  plan: '#2563eb',
  adjustment: '#d97706',
};

export function CollectionsDisputesSection() {
  const { data } = useRevenueReceivables();
  const activity = revenueView(data).activity;
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Summary Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Total Collected (MTD)', value: 'LKR 89.6M', delta: '↑11.2%', color: 'text-emerald-700' },
          { label: 'Open Disputes', value: '43', delta: '↑3 new', color: 'text-red-700' },
          { label: 'Collection Rate', value: '78%', delta: '↑2.1pp', color: 'text-blue-700' },
          { label: 'Avg Days to Collect', value: '24 days', delta: '↓3 days', color: 'text-purple-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="text-[10px] font-bold text-gray-500 mb-0.5">{s.label}</div>
            <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500">{s.delta} vs prior month</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Collection Queue */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Collection Queue</div>
              <div className="text-[10px] text-gray-500">Active accounts requiring collection action</div>
            </div>
            <button
              onClick={() => toast.success('Sending bulk reminders...')}
              className="px-2 py-1 text-[10px] font-bold bg-[#8f002b] text-white rounded-lg hover:bg-[#741d35] flex items-center gap-1"
            >
              <Send size={10} />
              Send All Reminders
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {COLLECTION_QUEUE.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                    {item.priority}
                  </span>
                  {STATUS_ICON[item.status]}
                  <div>
                    <div className="text-xs font-bold text-gray-900">{item.name}</div>
                    <div className="text-[10px] text-gray-500">{item.days} days overdue · {item.status}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-red-700">{item.amount}</div>
                  <button
                    onClick={() => toast(`Following up on ${item.name}`)}
                    className="text-[10px] text-[#8f002b] hover:underline font-semibold flex items-center gap-0.5"
                  >
                    Action <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disputes Register */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Disputes Register</div>
              <div className="text-[10px] text-gray-500">Active and recent dispute cases</div>
            </div>
            <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
              43 total
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {DISPUTES.map((d) => (
              <div
                key={d.ref}
                onClick={() => setSelectedDispute(d.ref === selectedDispute ? null : d.ref)}
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedDispute === d.ref ? 'border-[#8f002b] bg-[#fdf2f5]' : 'border-gray-100 bg-gray-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-gray-500">{d.ref}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${DISPUTE_BADGE[d.status]}`}>{d.status}</span>
                  </div>
                  <span className="text-xs font-extrabold text-red-700">{d.amount}</span>
                </div>
                <div className="text-xs font-semibold text-gray-800 mt-0.5">{d.account}</div>
                <div className="text-[10px] text-gray-500">{d.reason} · Raised {d.raisedOn}</div>
                {selectedDispute === d.ref && (
                  <div className="mt-1.5 pt-1.5 border-t border-gray-100 flex gap-2">
                    <button onClick={() => toast.success('Resolving dispute...')} className="text-[10px] px-2 py-1 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700">
                      Resolve
                    </button>
                    <button onClick={() => toast('Escalating dispute...')} className="text-[10px] px-2 py-1 bg-orange-100 text-orange-700 rounded font-bold hover:bg-orange-200">
                      Escalate
                    </button>
                    <button onClick={() => toast('Opening dispute chat...')} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-700 rounded font-bold hover:bg-gray-200">
                      View Chat
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
        <div className="text-xs font-bold text-gray-800 mb-2">Recent Collection Activity</div>
        <div className="flex flex-col gap-0">
          {activity.map((item, idx) => (
            <div key={item.id} className="flex gap-3 relative">
              {/* Timeline line */}
              {idx < activity.length - 1 && (
                <div className="absolute left-[15px] top-5 w-px h-full bg-gray-100" />
              )}
              {/* Icon */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 z-10"
                style={{ background: ACT_COLORS[item.type] + '20', border: `1.5px solid ${ACT_COLORS[item.type]}` }}
              >
                {item.type === 'payment' && <CheckCircle size={11} style={{ color: ACT_COLORS[item.type] }} />}
                {item.type === 'invoice' && <AlertTriangle size={11} style={{ color: ACT_COLORS[item.type] }} />}
                {item.type === 'plan' && <Clock size={11} style={{ color: ACT_COLORS[item.type] }} />}
                {item.type === 'adjustment' && <XCircle size={11} style={{ color: ACT_COLORS[item.type] }} />}
              </div>
              {/* Content */}
              <div className="pb-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-gray-800">{item.title}</div>
                  <div className="text-[10px] text-gray-400 font-medium">{item.time}</div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5 flex flex-wrap gap-x-2">
                  {item.ref && <span className="font-mono">{item.ref}</span>}
                  {item.amount && <span className="font-bold text-gray-700">{item.amount}</span>}
                  {item.user && <span>by {item.user}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
