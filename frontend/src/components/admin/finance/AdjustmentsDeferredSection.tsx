'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ArrowDownCircle, PlusCircle, MinusCircle, FileCheck } from 'lucide-react';

const DEFERRED_ENTRIES = [
  { ref: 'DEF-2025-0045', account: 'Ceylon Beauty Spa', amount: 'LKR 471,936', deferredOn: 'May 22, 2025', recognitionDate: 'Jun 15, 2025', reason: 'Awaiting delivery confirmation', status: 'Pending' },
  { ref: 'DEF-2025-0044', account: 'Beauté Collective', amount: 'LKR 404,352', deferredOn: 'Mar 10, 2025', recognitionDate: 'Jun 30, 2025', reason: 'Disputed — pending resolution', status: 'On Hold' },
  { ref: 'DEF-2025-0043', account: 'Ceylon Beauty Spa', amount: 'LKR 128,000', deferredOn: 'Apr 30, 2025', recognitionDate: 'May 31, 2025', reason: 'Contract milestone not yet met', status: 'Pending' },
];

const ADJUSTMENTS = [
  { ref: 'ADJ-2025-0091', account: 'Nails By Nimasha', type: 'Refund', amount: '−LKR 8,640', reason: 'Service cancellation', approvedBy: 'Kasun Silva', date: 'May 24, 2025', status: 'Processed' },
  { ref: 'ADJ-2025-0090', account: 'Petal & Bloom Spa', type: 'Discount Credit', amount: '−LKR 25,920', reason: 'Promotional adjustment', approvedBy: 'Sanduni Ranasinghe', date: 'May 20, 2025', status: 'Processed' },
  { ref: 'ADJ-2025-0089', account: 'Luxe Hair Studio', type: 'Penalty Reversal', amount: '+LKR 5,200', reason: 'Late payment waiver approved', approvedBy: 'Tharaka Jayasuriya', date: 'May 18, 2025', status: 'Pending Approval' },
  { ref: 'ADJ-2025-0088', account: 'Urban Glow Salon', type: 'Refund', amount: '−LKR 17,280', reason: 'Product return — full refund', approvedBy: 'Ishanka Madushan', date: 'May 16, 2025', status: 'Processed' },
];

const STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'On Hold': 'bg-orange-100 text-orange-700',
  Processed: 'bg-emerald-100 text-emerald-700',
  'Pending Approval': 'bg-blue-100 text-blue-700',
  Recognized: 'bg-emerald-100 text-emerald-800',
};

export function AdjustmentsDeferredSection() {
  return (
    <div className="flex flex-col gap-3">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: <ArrowDownCircle size={16} className="text-purple-600" />, label: 'Total Deferred Revenue', value: 'LKR 55.8M', sub: '3 entries pending recognition', color: 'border-purple-100' },
          { icon: <MinusCircle size={16} className="text-red-500" />, label: 'Total Refunds (MTD)', value: 'LKR 14.2M', sub: '68 refund transactions', color: 'border-red-100' },
          { icon: <PlusCircle size={16} className="text-emerald-600" />, label: 'Revenue Recognized (YTD)', value: 'LKR 312.6M', sub: 'Up 8.1% vs. prior year', color: 'border-emerald-100' },
          { icon: <FileCheck size={16} className="text-blue-600" />, label: 'Pending Approvals', value: '12', sub: 'Adjustments awaiting sign-off', color: 'border-blue-100' },
        ].map((s) => (
          <div key={s.label} className={`bg-white border ${s.color} rounded-lg p-3 shadow-sm`}>
            <div className="flex items-center gap-2 mb-1">
              {s.icon}
              <div className="text-[10px] font-bold text-gray-500">{s.label}</div>
            </div>
            <div className="text-lg font-extrabold text-gray-900">{s.value}</div>
            <div className="text-[10px] text-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Deferred Revenue Entries */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Deferred Revenue Entries</div>
              <div className="text-[10px] text-gray-500">Revenue awaiting recognition</div>
            </div>
            <button
              onClick={() => toast.success('Running revenue recognition batch...')}
              className="px-2 py-1 text-[10px] font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Run Recognition
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {DEFERRED_ENTRIES.map((entry) => (
              <div key={entry.ref} className="border border-gray-100 rounded-lg p-2 bg-gray-50 hover:bg-white transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-500">{entry.ref}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${STATUS_BADGE[entry.status]}`}>{entry.status}</span>
                </div>
                <div className="text-xs font-bold text-gray-900 mt-0.5">{entry.account}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{entry.reason}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-[10px] text-gray-500">
                    Deferred: <span className="font-semibold text-gray-700">{entry.deferredOn}</span>
                    &nbsp;·&nbsp;
                    Recognize by: <span className="font-semibold text-gray-700">{entry.recognitionDate}</span>
                  </div>
                  <div className="text-xs font-extrabold text-purple-700">{entry.amount}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              Total deferred: <span className="font-bold text-purple-700">LKR 55.8M</span>
            </span>
            <button className="text-[10px] text-[#8f002b] font-bold hover:underline">View all →</button>
          </div>
        </div>

        {/* Adjustments Register */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-gray-800">Adjustments Register</div>
              <div className="text-[10px] text-gray-500">Refunds, credits, and manual adjustments</div>
            </div>
            <button
              onClick={() => toast.success('Opening adjustment form...')}
              className="px-2 py-1 text-[10px] font-bold bg-[#8f002b] text-white rounded-lg hover:bg-[#741d35]"
            >
              + New Adjustment
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-1 text-left text-[10px] font-bold text-gray-500">Ref</th>
                  <th className="py-1 text-left text-[10px] font-bold text-gray-500">Account</th>
                  <th className="py-1 text-left text-[10px] font-bold text-gray-500">Type</th>
                  <th className="py-1 text-right text-[10px] font-bold text-gray-500">Amount</th>
                  <th className="py-1 text-left text-[10px] font-bold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ADJUSTMENTS.map((adj) => (
                  <tr key={adj.ref} className="hover:bg-gray-50">
                    <td className="py-1.5 font-mono text-[10px] text-gray-500">{adj.ref}</td>
                    <td className="py-1.5">
                      <div className="font-semibold text-gray-800 text-[11px]">{adj.account}</div>
                      <div className="text-[10px] text-gray-400">{adj.date}</div>
                    </td>
                    <td className="py-1.5 text-gray-600">{adj.type}</td>
                    <td className={`py-1.5 text-right font-bold font-mono ${adj.amount.startsWith('−') ? 'text-red-600' : 'text-emerald-600'}`}>
                      {adj.amount}
                    </td>
                    <td className="py-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${STATUS_BADGE[adj.status]}`}>
                        {adj.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="text-[10px] text-gray-500 flex justify-between">
              <span>12 adjustments pending approval</span>
              <button className="text-[#8f002b] font-bold hover:underline">Batch approve →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
