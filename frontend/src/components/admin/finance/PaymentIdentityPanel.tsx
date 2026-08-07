'use client';

import React from 'react';
import { PaymentTransactionDetailVM } from '@/data/mockPaymentDetailData';

/* ─── Helpers ─── */
const Chip = ({
  label,
  color,
}: {
  label: string;
  color: 'green' | 'blue' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange';
}) => {
  const MAP: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-600 border-gray-200',
    purple: 'bg-violet-50 text-violet-700 border-violet-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold uppercase rounded border ${MAP[color]}`}
    >
      {label}
    </span>
  );
};

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0 gap-2">
      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide shrink-0">
        {label}
      </span>
      <span className="text-[11px] font-semibold text-gray-800 text-right">{value}</span>
    </div>
  );
}

interface Props {
  record: PaymentTransactionDetailVM;
}

/* ─── Derive status chip color ─── */
function statusColor(s: string): 'green' | 'blue' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' {
  const v = s.toLowerCase();
  if (v.includes('success') || v.includes('authorized') || v.includes('captured') || v.includes('completed')) return 'green';
  if (v.includes('pending')) return 'yellow';
  if (v.includes('failed') || v.includes('rejected')) return 'red';
  if (v.includes('partial')) return 'orange';
  if (v.includes('low')) return 'green';
  if (v.includes('medium')) return 'yellow';
  if (v.includes('high')) return 'red';
  return 'gray';
}

export function PaymentIdentityPanel({ record }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
      {/* Header strip */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
              Payment Reference
            </p>
            <p className="text-base font-extrabold text-gray-900 tracking-tight font-mono">
              {record.paymentRef}
            </p>
          </div>
          <Chip label={record.paymentStatus} color={statusColor(record.paymentStatus)} />
        </div>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {record.customer} &middot; {record.txnDate} &middot; v{record.recordVersion}
        </p>
      </div>

      {/* Three columns: Identity | Amounts | Statuses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Identity */}
        <div className="space-y-0 divide-y divide-gray-100">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide pb-1">
            Identity &amp; Linking
          </p>
          <FieldRow label="Payment Ref" value={record.paymentRef} />
          <FieldRow label="Gateway Txn ID" value={<span className="font-mono">{record.gatewayTxnId}</span>} />
          <FieldRow label="Customer" value={record.customer} />
          <FieldRow label="Customer ID" value={record.customerId} />
          <FieldRow label="Order" value={record.relatedOrder} />
          <FieldRow label="Invoice" value={record.invoice} />
          <FieldRow label="Gateway" value={record.gateway} />
          <FieldRow label="Method" value={record.paymentMethod} />
          <FieldRow label="Txn Date" value={record.txnDate} />
          <FieldRow label="Updated" value={record.updatedAt} />
        </div>

        {/* Amounts */}
        <div className="space-y-0">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide pb-1 border-b border-gray-100">
            Amount Breakdown (LKR M)
          </p>
          <table className="w-full mt-1">
            <tbody>
              {[
                { label: 'Requested', val: record.requestedAmount.toFixed(2) + 'M' },
                { label: 'Authorized', val: record.authorizedAmount.toFixed(2) + 'M' },
                { label: 'Captured', val: record.capturedAmount.toFixed(2) + 'M' },
                { label: 'Refunded', val: record.refundedAmount.toFixed(2) },
                { label: 'Reversed', val: record.reversedAmount.toFixed(2) },
                { label: 'Gateway Fee', val: '-' + record.gatewayFee.toFixed(2) + 'M' },
                { label: 'Net Collected', val: record.netCollected.toFixed(2) + 'M', bold: true },
              ].map(({ label, val, bold }) => (
                <tr key={label} className={`border-b border-gray-100 last:border-0 ${bold ? 'bg-gray-50' : ''}`}>
                  <td className="py-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                    {label}
                  </td>
                  <td className={`py-1 text-[11px] text-right ${bold ? 'font-extrabold text-[#8f002b]' : 'font-semibold text-gray-800'}`}>
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statuses */}
        <div className="space-y-0">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide pb-1 border-b border-gray-100">
            State Overview
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            {[
              { label: 'Payment Status', val: record.paymentStatus },
              { label: 'Authorization', val: record.authorizationState },
              { label: 'Capture', val: record.captureState },
              { label: 'Settlement', val: record.settlementState },
              { label: 'Reconciliation', val: record.reconciliationState },
              { label: 'Risk Level', val: record.riskLevel },
              { label: 'SLA', val: record.sla },
              { label: 'Owner', val: record.owner },
              { label: 'Reviewer', val: record.reviewer },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                  {label}
                </span>
                <Chip label={val} color={statusColor(val)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
