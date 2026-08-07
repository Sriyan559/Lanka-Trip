'use client';

import React from 'react';
import {
  FN07PaymentSchedule,
  FN07Settlement,
  FN07ReconciliationSummaryRow,
  FN07ActivityEvent,
  FN07AuditSummary,
  FN07QuickQueue,
} from '@/data/mockSupplierPayableDetailData';
import toast from 'react-hot-toast';

/* ── card wrapper ── */
function Card({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1.5 ${className}`}>
      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5 mb-0.5">
        {title}
      </p>
      {children}
    </div>
  );
}

function KV({ label, value, valueClass = '' }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex justify-between items-start border-b border-gray-50 pb-0.5 last:border-0">
      <span className="text-[10px] text-gray-500 shrink-0 pr-2">{label}</span>
      <span className={`text-[10px] font-semibold text-right leading-tight ${valueClass}`}>{value}</span>
    </div>
  );
}

interface Props {
  paymentSchedule: FN07PaymentSchedule;
  settlement: FN07Settlement;
  reconciliationRows: FN07ReconciliationSummaryRow[];
  activityLog: FN07ActivityEvent[];
  auditSummary: FN07AuditSummary;
  quickQueues: FN07QuickQueue[];
}

export function PayableLowerOperationsGrid({
  paymentSchedule,
  settlement,
  reconciliationRows,
  activityLog,
  auditSummary,
  quickQueues,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

      {/* 8. Payment Schedule */}
      <Card title="8. Payment Schedule">
        <KV label="Payment Method" value={paymentSchedule.paymentMethod} />
        <KV label="Preferred Bank" value={paymentSchedule.preferredBank} />
        <KV label="Scheduled Date" value={paymentSchedule.scheduledDate} valueClass="font-mono" />
        <KV
          label="Amount (LKR)"
          value={paymentSchedule.scheduledAmount.toLocaleString()}
          valueClass="font-mono font-bold text-gray-900"
        />
        <KV
          label="Status"
          value={
            <span
              className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${
                paymentSchedule.status === 'Scheduled'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}
            >
              {paymentSchedule.status}
            </span>
          }
        />
        <KV label="Scheduled Date 2" value="—" />
        <KV label="Scheduled Amount" value="—" />
        <KV
          label="Advice Status"
          value={paymentSchedule.adviceStatus}
          valueClass={paymentSchedule.adviceStatus === 'Not Scheduled' ? 'text-red-600' : 'text-emerald-700'}
        />
      </Card>

      {/* 9. Settlements & Payouts */}
      <Card title="9. Settlements & Payouts">
        <KV label="Settlement Type" value={settlement.settlementType} />
        <KV
          label="Payment Status"
          value={
            <span
              className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${
                settlement.paymentStatus === 'Not Started'
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {settlement.paymentStatus}
            </span>
          }
        />
        <KV label="Payout Amount" value={settlement.payoutAmount} />
        <KV label="Bank Transfer ID" value={settlement.bankTransferId} />
        <KV
          label="Advice Status"
          value={settlement.adviceStatus}
          valueClass={settlement.adviceStatus === 'Not Scheduled' ? 'text-red-600' : 'text-emerald-700'}
        />
        {/* Masked bank account */}
        <div className="mt-1 pt-1 border-t border-gray-100">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-500">Bank Account</span>
            <span className="font-mono font-bold text-gray-700">{settlement.maskedAccount}</span>
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5">Sensitive account details masked for security.</p>
        </div>
      </Card>

      {/* 10. Reconciliation Summary */}
      <Card title="10. Reconciliation Summary">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-500 font-semibold pb-1 pr-1">Description</th>
              <th className="text-right text-gray-500 font-semibold pb-1 pr-1">Amount (LKR)</th>
              <th className="text-right text-gray-500 font-semibold pb-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {reconciliationRows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50">
                <td className="py-0.5 pr-1 text-gray-700 font-medium">{row.description}</td>
                <td className="py-0.5 pr-1 text-right font-mono">
                  {row.amount !== null
                    ? <span className={row.description === 'Difference' ? 'text-red-600 font-bold' : ''}>
                        {row.amount.toLocaleString()}
                      </span>
                    : '—'}
                </td>
                <td className="py-0.5 text-right">
                  {row.status && (
                    <span
                      className={`text-[9px] font-bold ${
                        row.status === 'Open' ? 'text-red-600' : 'text-gray-600'
                      }`}
                    >
                      {row.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 11. Recent Payable Activity */}
      <Card title="11. Recent Payable Activity">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-500 font-semibold pb-1 pr-1">Date & Time</th>
              <th className="text-left text-gray-500 font-semibold pb-1 pr-1">Activity</th>
              <th className="text-left text-gray-500 font-semibold pb-1 pr-1">By</th>
              <th className="text-left text-gray-500 font-semibold pb-1">Source</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((ev, idx) => (
              <tr key={idx} className="border-b border-gray-50">
                <td className="py-0.5 pr-1 font-mono text-gray-600 whitespace-nowrap">{ev.dateTime.split(' ').slice(-2).join(' ')}</td>
                <td className="py-0.5 pr-1 text-gray-800 font-medium">{ev.activity}</td>
                <td className="py-0.5 pr-1 text-gray-600">{ev.performedBy}</td>
                <td className="py-0.5 text-gray-400">{ev.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 12. Audit Summary */}
      <Card title="12. Audit Summary">
        <KV
          label="Total Updates (All Fields)"
          value={auditSummary.totalUpdates}
          valueClass="font-mono font-bold"
        />
        <KV
          label="User Updates (By You)"
          value={auditSummary.userUpdates}
          valueClass="font-mono font-bold"
        />
        <KV label="Last Updated By" value={auditSummary.lastUpdatedBy} />
        <KV label="Last Updated On" value={auditSummary.lastUpdatedOn} valueClass="font-mono text-[9px]" />
        <KV
          label="Data Quality Checks"
          value={auditSummary.dataQualityChecks}
          valueClass={auditSummary.dataQualityChecks === 'Passed' ? 'text-emerald-700 font-bold' : 'text-red-600 font-bold'}
        />
        <KV
          label="Attachments Linked"
          value={auditSummary.attachmentsLinked}
          valueClass="font-mono font-bold"
        />
      </Card>

      {/* 13. Quick Actions / Queues */}
      <Card title="13. Quick Actions / Queues">
        <div className="flex flex-col gap-1.5">
          {quickQueues.map((q) => (
            <button
              key={q.label}
              onClick={() => toast(`Opening queue: ${q.label}`)}
              className="flex items-center justify-between px-2 py-1.5 border border-[#8f002b]/30 text-[#8f002b] hover:bg-red-50/50 rounded-lg transition-colors text-[10px] font-bold"
            >
              <span>{q.label}</span>
              <span
                className="text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded min-w-[20px] text-center"
                style={{ backgroundColor: q.color }}
              >
                {q.count}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
