'use client';

import React from 'react';
import { X, ExternalLink, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { RevenuePortfolioRow } from '@/types/finance';

interface Props {
  record: RevenuePortfolioRow | null;
  onClose?: () => void;
}

function fmt(n: number) {
  return 'LKR ' + n.toLocaleString();
}

function Badge({ text, className }: { text: string; className: string }) {
  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${className}`}>
      {text}
    </span>
  );
}

const REV_BADGE: Record<string, string> = {
  Recognized: 'bg-emerald-100 text-emerald-800',
  Deferred: 'bg-purple-100 text-purple-700',
  Pending: 'bg-gray-100 text-gray-600',
};

const RECV_BADGE: Record<string, string> = {
  Current: 'bg-emerald-100 text-emerald-800',
  'Due Soon': 'bg-yellow-100 text-yellow-700',
  Overdue: 'bg-red-100 text-red-700',
  'Partially Paid': 'bg-amber-100 text-amber-700',
  Disputed: 'bg-red-200 text-red-900',
};

export function SelectedRevenueRecordPreview({ record, onClose }: Props) {
  if (!record) {
    return (
      <div className="bg-white border border-dashed border-gray-200 rounded-lg p-4 text-center text-[11px] text-gray-400 font-medium">
        Select a revenue record from the portfolio table to view its details
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-700">Record Preview</span>
          <span className="font-mono text-[10px] text-[#8f002b] font-bold">{record.ref}</span>
          <Badge text={record.revenueStatus} className={REV_BADGE[record.revenueStatus] ?? 'bg-gray-100 text-gray-600'} />
          <Badge text={record.receivableStatus} className={RECV_BADGE[record.receivableStatus] ?? 'bg-gray-100 text-gray-600'} />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => toast.success('Opened in revenue detail view')}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
          >
            <ExternalLink size={12} />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-500">
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-4 text-[11px]">
        {/* Left — Account & References */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Account</div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer</span>
                <span className="font-bold text-gray-900">{record.customerAccount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Type</span>
                <span className="font-semibold text-gray-700">{record.accountType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Business Unit</span>
                <span className="font-semibold text-gray-700">{record.bu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Channel</span>
                <span className="font-semibold text-gray-700">{record.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Owner</span>
                <span className="font-semibold text-gray-700">{record.owner}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">References</div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Revenue Ref</span>
                <span className="font-mono font-bold text-[#8f002b] text-[10px]">{record.ref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Order</span>
                <span className="font-mono text-gray-700 text-[10px]">{record.relatedOrder}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Invoice</span>
                <span className="font-mono text-gray-700 text-[10px]">{record.invoiceRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Due Date</span>
                <span className="font-semibold text-gray-700">{record.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center — Financial Breakdown */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Sales Breakdown</div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between">
                <span className="text-gray-500">GMV</span>
                <span className="font-bold text-gray-900">{fmt(record.gmv)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gross Sales</span>
                <span className="font-semibold text-gray-700">{fmt(record.grossSales)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discounts</span>
                <span className="font-semibold text-red-600">−{fmt(record.discounts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-semibold text-gray-600">{fmt(record.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fees</span>
                <span className="font-semibold text-gray-600">{fmt(record.fees)}</span>
              </div>
              {record.refunds > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Refunds</span>
                  <span className="font-semibold text-red-600">−{fmt(record.refunds)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-0.5 mt-0.5">
                <span className="font-bold text-gray-700">Net Sales</span>
                <span className="font-extrabold text-gray-900">{fmt(record.netSales)}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Revenue Recognition</div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Recognized</span>
                <span className={`font-bold ${record.recognizedRevenue > 0 ? 'text-emerald-700' : 'text-gray-400'}`}>
                  {record.recognizedRevenue > 0 ? fmt(record.recognizedRevenue) : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deferred</span>
                <span className={`font-bold ${record.deferredRevenue > 0 ? 'text-purple-700' : 'text-gray-400'}`}>
                  {record.deferredRevenue > 0 ? fmt(record.deferredRevenue) : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Statuses & Actions */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Receivables</div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Receivable</span>
                <span className="font-bold text-gray-900">{fmt(record.receivableAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Collected</span>
                <span className="font-semibold text-emerald-700">{fmt(record.collectedAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Outstanding</span>
                <span className={`font-extrabold ${record.outstandingAmount > 0 ? 'text-red-700' : 'text-gray-400'}`}>
                  {record.outstandingAmount > 0 ? fmt(record.outstandingAmount) : '—'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Statuses</div>
            <div className="flex flex-col gap-1">
              {[
                { label: 'Ageing', value: record.ageingBucket + ' days' },
                { label: 'Collection', value: record.collectionStatus },
                { label: 'Reconciliation', value: record.reconciliationStatus },
                { label: 'Exception', value: record.exceptionStatus },
                { label: 'Approval', value: record.approvalStatus },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="text-gray-700 font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 pt-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Quick Actions</div>
            <div className="flex flex-wrap gap-1.5">
              {record.outstandingAmount > 0 && (
                <button
                  onClick={() => toast.success('Sending payment reminder...')}
                  className="px-2 py-1 text-[10px] font-bold bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  <Send size={10} />
                  Send Reminder
                </button>
              )}
              {record.revenueStatus === 'Deferred' && (
                <button
                  onClick={() => toast.success('Revenue recognition triggered...')}
                  className="px-2 py-1 text-[10px] font-bold bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-1"
                >
                  <CheckCircle size={10} />
                  Recognize Revenue
                </button>
              )}
              {record.reconciliationStatus !== 'Reconciled' && (
                <button
                  onClick={() => toast('Initiating reconciliation...')}
                  className="px-2 py-1 text-[10px] font-bold bg-amber-500 text-white rounded hover:bg-amber-600 flex items-center gap-1"
                >
                  Reconcile
                </button>
              )}
              {record.exceptionStatus !== 'None' && (
                <button
                  onClick={() => toast.error('Reviewing exception...')}
                  className="px-2 py-1 text-[10px] font-bold bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-1"
                >
                  <AlertTriangle size={10} />
                  Review Exception
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
