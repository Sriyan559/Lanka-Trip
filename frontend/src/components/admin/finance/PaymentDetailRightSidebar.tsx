'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  DollarSign,
  RefreshCcw,
  Lock,
  Unlock,
  Undo2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PaymentTransactionDetailVM } from '@/data/mockPaymentDetailData';
import { FN04_ALERTS, FN04_STATUS_SUMMARY, FN04_INTELLIGENCE_SCORES } from '@/data/mockPaymentDetailData';

interface Props {
  record: PaymentTransactionDetailVM;
}

const SEVERITY_MAP: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-blue-50 text-blue-700 border-blue-200',
  Info: 'bg-gray-100 text-gray-600 border-gray-200',
};

export function PaymentDetailRightSidebar({ record }: Props) {
  const [expandedAlerts, setExpandedAlerts] = useState(false);

  return (
    <div className="flex flex-col gap-3">

      {/* ── Payment Operation Actions ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
          Payment Actions
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            {
              label: 'Capture Payment',
              icon: <DollarSign size={12} />,
              disabled: !record.canCapture,
              variant: 'primary',
              action: () => toast.success('Initiating capture...'),
            },
            {
              label: 'Issue Refund',
              icon: <RotateCcw size={12} />,
              disabled: !record.canRefund,
              variant: 'secondary',
              action: () => toast.success('Opening refund workflow...'),
            },
            {
              label: 'Void Authorization',
              icon: <Undo2 size={12} />,
              disabled: !record.canVoid,
              variant: 'secondary',
              action: () => toast('Voiding authorization...'),
            },
            {
              label: 'Reverse Transaction',
              icon: <RefreshCcw size={12} />,
              disabled: !record.canReverse,
              variant: 'secondary',
              action: () => toast.success('Initiating reversal...'),
            },
            {
              label: 'Place on Hold',
              icon: <Lock size={12} />,
              disabled: !record.canHold,
              variant: 'secondary',
              action: () => toast('Payment placed on hold'),
            },
            {
              label: 'Release Hold',
              icon: <Unlock size={12} />,
              disabled: !record.canReleaseHold,
              variant: 'secondary',
              action: () => toast.success('Hold released'),
            },
            {
              label: 'Reconcile Payment',
              icon: <ShieldCheck size={12} />,
              disabled: !record.canReconcile,
              variant: 'primary',
              action: () => toast.success('Opening reconciliation panel...'),
            },
            {
              label: 'Retry Failed Auth',
              icon: <RefreshCcw size={12} />,
              disabled: !record.canRetry,
              variant: 'secondary',
              action: () => toast('Retrying authorization...'),
            },
          ].map(({ label, icon, disabled, variant, action }) => (
            <button
              key={label}
              onClick={action}
              disabled={disabled}
              className={[
                'w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors',
                disabled
                  ? 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed'
                  : variant === 'primary'
                  ? 'bg-[#8f002b] text-white hover:bg-[#741d35] shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm',
              ].join(' ')}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Payment Status Distribution ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
          Status Distribution
        </p>
        <div className="flex flex-col gap-1">
          {FN04_STATUS_SUMMARY.map((s) => (
            <div key={s.status} className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-gray-600 w-28 truncate">{s.status}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] shrink-0">
                <span className="font-bold text-gray-700">{s.count.toLocaleString()}</span>
                <span className="text-gray-400">{s.pct.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Priority Alerts ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Priority Alerts
          </p>
          <button
            onClick={() => setExpandedAlerts((p) => !p)}
            className="text-[10px] text-blue-600 hover:underline font-semibold"
          >
            {expandedAlerts ? 'Less' : 'View All'}
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          {(expandedAlerts ? FN04_ALERTS : FN04_ALERTS.slice(0, 4)).map((a) => (
            <div
              key={a.id}
              className={`flex items-start gap-1.5 text-[10px] px-2 py-1.5 rounded border ${SEVERITY_MAP[a.severity] ?? SEVERITY_MAP['Info']}`}
            >
              <AlertTriangle size={10} className="mt-0.5 shrink-0" />
              <span className="leading-tight">{a.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Intelligence Scorecard ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-1 mb-2">
          <TrendingUp size={12} className="text-[#8f002b]" />
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Payment Intelligence Scorecard
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {FN04_INTELLIGENCE_SCORES.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-gray-600 w-36 truncate shrink-0">
                {s.label}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${s.score}%`,
                    backgroundColor:
                      s.score >= 90 ? '#16a34a' : s.score >= 75 ? '#d97706' : '#dc2626',
                  }}
                />
              </div>
              <span
                className={`text-[10px] font-bold shrink-0 ${
                  s.score >= 90 ? 'text-emerald-700' : s.score >= 75 ? 'text-amber-700' : 'text-red-700'
                }`}
              >
                {s.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
          Quick Navigation
        </p>
        <div className="flex flex-col gap-0.5">
          {[
            { label: 'Related Order', val: record.relatedOrder },
            { label: 'Invoice', val: record.invoice },
            { label: 'Customer', val: `${record.customer} (${record.customerId})` },
            { label: 'Payment Gateway Log', val: record.gatewayTxnId },
            { label: 'Settlement Batch', val: 'BATCH-2025-0526' },
            { label: 'Reconciliation Report', val: 'RECON-2025-0526' },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => toast(`Navigating to ${label}...`)}
              className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 text-left transition-colors"
            >
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="text-[11px] font-semibold text-gray-700 font-mono">{val}</p>
              </div>
              <ChevronRight size={11} className="text-gray-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
