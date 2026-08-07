'use client';

import React from 'react';
import {
  FN07AmountSummary,
  FN07ApprovalDetails,
  FN07LifecycleDates,
  FN07StatusSnapshot,
} from '@/data/mockSupplierPayableDetailData';

/* ─── KPI Metric strip items ─── */
interface SummaryMetric {
  title: string;
  value: string;
  sub: string;
  subColor?: string;
  bold?: boolean;
}

interface Props {
  amountSummary: FN07AmountSummary;
  approvalDetails: FN07ApprovalDetails;
  statusSnapshot: FN07StatusSnapshot;
  lifecycleDates: FN07LifecycleDates;
  grossLiability: number;
}

function fmtM(n: number) {
  if (Math.abs(n) >= 1_000_000) return `LKR ${(n / 1_000_000).toFixed(3)}M`;
  if (Math.abs(n) >= 1_000) return `LKR ${(n / 1_000).toFixed(0)}K`;
  return `LKR ${n.toLocaleString()}`;
}

function MetricCard({ title, value, sub, subColor, bold }: SummaryMetric) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex flex-col gap-0.5 min-w-0 shadow-sm">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-tight truncate">
        {title}
      </span>
      <span
        className={`text-sm font-extrabold leading-tight font-mono ${
          bold ? 'text-[#8f002b]' : 'text-gray-900'
        }`}
      >
        {value}
      </span>
      <span
        className="text-[10px] font-semibold leading-tight"
        style={{ color: subColor || '#64748b' }}
      >
        {sub}
      </span>
    </div>
  );
}

export function PayableSummaryMetrics({
  amountSummary,
  approvalDetails,
  statusSnapshot,
  lifecycleDates,
  grossLiability,
}: Props) {
  const metrics: SummaryMetric[] = [
    {
      title: 'Gross Liability',
      value: fmtM(grossLiability),
      sub: '100.00% vs AP',
      subColor: '#64748b',
    },
    {
      title: 'Less Total Deductions',
      value: fmtM(amountSummary.totalDeductions),
      sub: `↑ ${((amountSummary.totalDeductions / grossLiability) * 100).toFixed(2)}% vs GL`,
      subColor: '#dc2626',
    },
    {
      title: 'Tax Amount (Info)',
      value: fmtM(amountSummary.taxAmount),
      sub: `${((amountSummary.taxAmount / grossLiability) * 100).toFixed(2)}% (Not deducted)`,
      subColor: '#2563eb',
    },
    {
      title: 'Less Credits',
      value: fmtM(amountSummary.credits),
      sub: `${((amountSummary.credits / grossLiability) * 100).toFixed(2)}% vs GL`,
      subColor: '#ea580c',
    },
    {
      title: 'Net Payable',
      value: fmtM(amountSummary.netPayable),
      sub: `${((amountSummary.netPayable / grossLiability) * 100).toFixed(2)}% vs GL`,
      subColor: '#16a34a',
      bold: true,
    },
    {
      title: 'Withholding Tax (Incl.)',
      value: 'LKR 84K',
      sub: '3.00% Included in Deductions',
      subColor: '#64748b',
    },
    {
      title: 'Reconciliation Status',
      value: amountSummary.reconciliationStatus,
      sub: '85% matched',
      subColor: '#dc2626',
    },
    {
      title: 'Approved Progress',
      value: approvalDetails.approved,
      sub: `${Math.round((approvalDetails.approvedCount / approvalDetails.totalApprovers) * 100)}%`,
      subColor: '#f59e0b',
    },
    {
      title: 'Lifecycle State',
      value: `${statusSnapshot.daysUntilDue} Days`,
      sub: 'to due vs AP',
      subColor: '#f59e0b',
    },
    {
      title: 'Due Date',
      value: '2m',
      sub: lifecycleDates.dueDate,
      subColor: '#dc2626',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-2">
      {metrics.map((m) => (
        <MetricCard key={m.title} {...m} />
      ))}
    </div>
  );
}
