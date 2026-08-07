'use client';

import React from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  FN07PayableIdentity,
  FN07LinkedRecord,
  FN07AmountSummary,
  FN07StatusSnapshot,
  FN07LifecycleDates,
} from '@/data/mockSupplierPayableDetailData';

/* ── helpers ── */
function Row({ label, value, valueClass = '' }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex justify-between items-start py-0.5 border-b border-gray-50 last:border-0">
      <span className="text-[10px] text-gray-500 shrink-0 pr-2">{label}</span>
      <span className={`text-[10px] font-semibold text-right leading-tight ${valueClass}`}>{value}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-1 mb-1.5">
      {children}
    </p>
  );
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-0 ${className}`}>
      {children}
    </div>
  );
}

interface Props {
  identity: FN07PayableIdentity;
  linkedRecords: FN07LinkedRecord;
  amountSummary: FN07AmountSummary;
  statusSnapshot: FN07StatusSnapshot;
  lifecycleDates: FN07LifecycleDates;
}

const RISK_COLOR: Record<string, string> = {
  Low: 'text-emerald-700',
  Medium: 'text-amber-700',
  High: 'text-red-700',
};

const STATUS_BADGE: Record<string, string> = {
  'Pending Approval': 'bg-amber-100 text-amber-800 border-amber-300',
  'Due in 5 Days': 'bg-amber-100 text-amber-800 border-amber-300',
  'No Active Hold': 'bg-emerald-50 text-emerald-700 border-emerald-300',
  'Payment Not Scheduled': 'bg-red-50 text-red-700 border-red-200',
  'Not Reconciled': 'bg-red-50 text-red-700 border-red-200',
  Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  Reconciled: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function PayableIdentitySummary({ identity, linkedRecords, amountSummary, statusSnapshot, lifecycleDates }: Props) {
  const snapshotBadges = [
    statusSnapshot.approvalStatus,
    `Due in ${statusSnapshot.daysUntilDue} Days`,
    statusSnapshot.hold,
    statusSnapshot.paymentSchedule,
    statusSnapshot.reconciliation,
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2">

      {/* 13A — Payable Identity */}
      <Panel>
        <SectionTitle>Payable Identity</SectionTitle>
        <Row label="Supplier ID" value={<span className="font-mono text-[10px]">{identity.supplierId}</span>} />
        <Row label="Supplier Name" value={identity.supplierName} valueClass="text-gray-900 font-bold" />
        <Row label="Supplier Type" value={identity.supplierType} />
        <Row label="Supplier Group" value={identity.supplierGroup} />
        <Row label="Currency" value={identity.currency} />
        <Row label="Risk Status" value={identity.riskStatus} valueClass={RISK_COLOR[identity.riskStatus]} />
        <Row
          label="Compliance Status"
          value={identity.complianceStatus}
          valueClass={identity.complianceStatus === 'Valid' ? 'text-emerald-700' : 'text-red-700'}
        />
        <Row label="Created By" value={identity.createdBy} />
        <Row label="Created On" value={identity.createdOn} />
      </Panel>

      {/* 13B — Linked Records */}
      <Panel>
        <SectionTitle>Linked Records</SectionTitle>
        <Row
          label="Purchase Order"
          value={
            <button
              onClick={() => toast(`Opening PO: ${linkedRecords.poRef}`)}
              className="text-blue-600 hover:underline font-mono text-[10px] flex items-center gap-0.5"
            >
              {linkedRecords.poRef} <ExternalLink size={9} />
            </button>
          }
        />
        <Row
          label="Goods Receipt"
          value={
            <button
              onClick={() => toast(`Opening GR: ${linkedRecords.grRef}`)}
              className="text-blue-600 hover:underline font-mono text-[10px] flex items-center gap-0.5"
            >
              {linkedRecords.grRef} <ExternalLink size={9} />
            </button>
          }
        />
        <Row label="Goods Return" value={linkedRecords.grReturn} valueClass="text-gray-400" />
        <Row
          label="Settlement Batch"
          value={<span className="font-mono text-[10px]">{linkedRecords.settlementBatch}</span>}
        />
        <Row
          label="Payable Reference"
          value={<span className="font-mono text-[10px]">{linkedRecords.payableRef}</span>}
        />
        <Row
          label="Supplier Statement"
          value={linkedRecords.supplierStatement}
          valueClass={linkedRecords.supplierStatement === 'Linked' ? 'text-emerald-700' : 'text-red-600'}
        />
      </Panel>

      {/* 13C — Amount Summary */}
      <Panel>
        <SectionTitle>Amount Summary</SectionTitle>
        <Row
          label="Gross Liability"
          value={`LKR ${(amountSummary.grossLiability / 1_000_000).toFixed(3)}M`}
          valueClass="font-mono text-gray-900 font-bold"
        />
        <Row
          label="Total Deductions"
          value={`(${amountSummary.totalDeductions.toLocaleString()})`}
          valueClass="font-mono text-red-600"
        />
        <Row
          label="Tax Amount (Info)"
          value={amountSummary.taxAmount.toLocaleString()}
          valueClass="font-mono text-blue-600"
        />
        <Row
          label="Credits"
          value={`(${amountSummary.credits.toLocaleString()})`}
          valueClass="font-mono text-red-500"
        />
        <div className="flex justify-between items-center py-1.5 border-t border-gray-200 mt-1">
          <span className="text-[10px] font-bold text-gray-900">Net Payable</span>
          <span className="text-sm font-extrabold font-mono text-emerald-700">
            LKR {(amountSummary.netPayable / 1_000_000).toFixed(3)}M
          </span>
        </div>
        <Row
          label="Reconciliation Status"
          value={amountSummary.reconciliationStatus}
          valueClass={amountSummary.reconciliationStatus === 'Not Complete' ? 'text-red-600' : 'text-emerald-700'}
        />
      </Panel>

      {/* 13D — Status Snapshot */}
      <Panel>
        <SectionTitle>Status Snapshot</SectionTitle>
        <div className="flex flex-col gap-1.5 mt-0.5">
          {snapshotBadges.map((badge) => (
            <span
              key={badge}
              className={`px-2 py-0.5 text-[10px] font-bold rounded border text-center ${
                STATUS_BADGE[badge] || 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </Panel>

      {/* 13E — Lifecycle Dates */}
      <Panel>
        <div className="flex items-center justify-between mb-1 border-b border-gray-200 pb-1">
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Lifecycle Dates</p>
          <button
            onClick={() => toast('Refreshing lifecycle dates...')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={11} />
          </button>
        </div>
        <Row label="Invoice Date" value={lifecycleDates.invoiceDate} />
        <Row label="Posting Date" value={lifecycleDates.postingDate} />
        <Row label="Due Date" value={lifecycleDates.dueDate} valueClass="text-red-700 font-bold font-mono" />
        <Row label="Cash Discount Date" value={lifecycleDates.cashDiscountDate} />
        <Row label="Payment Terms" value={lifecycleDates.paymentTerms} />
        <Row
          label="Discount Available"
          value={`LKR ${lifecycleDates.discountAmount.toLocaleString()} (${lifecycleDates.discountPct.toFixed(2)}%)`}
          valueClass="text-emerald-700"
        />
      </Panel>
    </div>
  );
}
