'use client';

import React, { useState } from 'react';
import { PaymentTransactionDetailVM } from '@/data/mockPaymentDetailData';

type Tab = 'authorization' | 'capture' | 'method' | 'gateway' | 'risk';

const TABS: { id: Tab; label: string }[] = [
  { id: 'authorization', label: 'Authorization' },
  { id: 'capture', label: 'Capture' },
  { id: 'method', label: 'Payment Method' },
  { id: 'gateway', label: 'Gateway / Processor' },
  { id: 'risk', label: 'Risk & Auth Assessment' },
];

interface FieldRowProps {
  label: string;
  value: React.ReactNode;
}

const FR = ({ label, value }: FieldRowProps) => (
  <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0 gap-3">
    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide shrink-0">
      {label}
    </span>
    <span className="text-[11px] font-semibold text-gray-800 text-right leading-tight">{value}</span>
  </div>
);

const StatusPill = ({ label }: { label: string }) => {
  const lv = label.toLowerCase();
  const cls = lv.includes('success') || lv.includes('passed') || lv.includes('match') || lv.includes('active') || lv.includes('low') || lv.includes('stable') || lv.includes('eligible') || lv.includes('consistent') || lv.includes('completed') || lv.includes('none') || lv.includes('not required')
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : lv.includes('pending') || lv.includes('medium') || lv.includes('partial')
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : lv.includes('fail') || lv.includes('high') || lv.includes('critical')
    ? 'bg-red-50 text-red-700 border-red-200'
    : 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border ${cls}`}>
      {label}
    </span>
  );
};

interface Props {
  record: PaymentTransactionDetailVM;
}

export function PaymentDetailTabs({ record }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('authorization');

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col">
      {/* Tab row */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={[
              'px-4 py-2.5 text-[11px] font-semibold whitespace-nowrap border-b-2 transition-colors',
              activeTab === t.id
                ? 'border-[#8f002b] text-[#8f002b] bg-red-50/40'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === 'authorization' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Authorization Details
              </p>
              <div className="divide-y divide-gray-100">
                <FR label="Authorization ID" value={<span className="font-mono text-[10px]">{record.authorizationId}</span>} />
                <FR label="3D Secure" value={<StatusPill label={record.threeDS} />} />
                <FR label="Billing Address Match" value={<StatusPill label={record.billingMatch} />} />
                <FR label="CVV Result" value={<StatusPill label={record.cvvResult} />} />
                <FR label="Auth Requested" value={record.authRequestedTime} />
                <FR label="Auth Responded" value={record.authRespondedTime} />
                <FR label="Auth Expiry" value={record.authExpiry} />
                <FR label="Retry Count" value={record.retryCount} />
                <FR label="Auth Risk State" value={<StatusPill label={record.authRiskState} />} />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Authorization Events
              </p>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Event', 'Time', 'Status', 'Details'].map((h) => (
                      <th key={h} className="text-left py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wide pr-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {record.authEvents.map((ev, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-1.5 pr-3 font-medium text-gray-700">{ev.event}</td>
                      <td className="py-1.5 pr-3 font-mono text-gray-500 text-[10px]">{ev.time}</td>
                      <td className="py-1.5 pr-3">
                        <StatusPill label={ev.status} />
                      </td>
                      <td className="py-1.5 text-gray-500">{ev.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'capture' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Capture Details
              </p>
              <div className="divide-y divide-gray-100">
                <FR label="Capture ID" value={<span className="font-mono text-[10px]">{record.captureId}</span>} />
                <FR label="Capture Type" value={record.captureType} />
                <FR label="Requested Amount" value={`LKR ${record.requestedCaptureAmount.toFixed(2)}M`} />
                <FR label="Remaining Auth" value={`LKR ${record.remainingAuthorization.toFixed(2)}M`} />
                <FR label="Capture Requested" value={record.captureRequestedTime} />
                <FR label="Capture Completed" value={record.captureCompletedTime} />
                <FR label="Gateway Response" value={<StatusPill label={record.captureGatewayResponse} />} />
                <FR label="Settlement Eligibility" value={<StatusPill label={record.settlementEligibility} />} />
                <FR label="Duplicate Protection" value={<StatusPill label={record.duplicateProtection} />} />
                <FR label="Idempotency Ref" value={<span className="font-mono text-[10px]">{record.idempotencyRef}</span>} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Capture State Summary
                </p>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-semibold">
                    <span className="text-gray-600">Authorized</span>
                    <span className="text-gray-900">LKR {record.authorizedAmount.toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold">
                    <span className="text-gray-600">Captured</span>
                    <span className="text-emerald-700">LKR {record.capturedAmount.toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold">
                    <span className="text-gray-600">Remaining Auth</span>
                    <span className="text-amber-700">LKR {record.remainingAuthorization.toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-700">Net Collected</span>
                    <span className="text-[#8f002b] font-extrabold">LKR {record.netCollected.toFixed(2)}M</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase">Capture Rate</p>
                  <span className="text-[11px] font-bold text-emerald-700">
                    {((record.capturedAmount / record.authorizedAmount) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(record.capturedAmount / record.authorizedAmount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'method' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Payment Method Details
              </p>
              <div className="divide-y divide-gray-100">
                <FR label="Method Type" value={record.methodType} />
                <FR label="Network" value={record.network} />
                <FR label="Masked Card" value={<span className="font-mono">{record.maskedCard}</span>} />
                <FR label="Token Status" value={<StatusPill label={record.tokenStatus} />} />
                <FR label="Card Expiry" value={record.cardExpiry} />
                <FR label="Billing Country" value={record.billingCountry} />
                <FR label="Risk Count" value={record.riskCount} />
                <FR label="Prior Success / Failures" value={record.priorSuccessFailures} />
                <FR label="Refund Compatibility" value={<StatusPill label={record.refundCompatibility} />} />
                <FR label="Risk Classification" value={<StatusPill label={record.methodRiskClassification} />} />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                Method Capability Flags
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Refund Compatible', on: record.canRefund },
                  { label: 'Retry Eligible', on: record.canRetry },
                  { label: 'Void Eligible', on: record.canVoid },
                  { label: 'Reversal Eligible', on: record.canReverse },
                  { label: 'Capture Eligible', on: record.canCapture },
                  { label: 'Reconcile Eligible', on: record.canReconcile },
                ].map(({ label, on }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] font-semibold ${
                      on
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${on ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gateway' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Gateway Details
              </p>
              <div className="divide-y divide-gray-100">
                <FR label="Gateway" value={record.gateway} />
                <FR label="Merchant Alias" value={record.merchantAlias} />
                <FR label="Request Time" value={record.gatewayRequestTime} />
                <FR label="Response Time" value={record.gatewayResponseTime} />
                <FR label="Processing Time" value={record.processingTime} />
                <FR label="Gateway Response" value={<StatusPill label={record.gatewayResponse} />} />
                <FR label="Raw Response Code" value={<span className="font-mono">{record.rawResponseCode}</span>} />
                <FR label="Reconciliation Source" value={record.reconciliationSource} />
                <FR label="Gateway Health" value={<StatusPill label={record.gatewayHealthStatus} />} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Gateway Support Flags
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Retry Support', on: record.retrySupport },
                  { label: 'Void Support', on: record.voidSupport },
                  { label: 'Reversal Support', on: record.reversalSupport },
                  { label: 'Settlement Batch', on: record.settlementBatchSupport },
                ].map(({ label, on }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] font-semibold ${
                      on
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${on ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Risk & Fraud Signals
              </p>
              <div className="divide-y divide-gray-100">
                <FR
                  label="Risk Score"
                  value={
                    <span className="inline-flex items-center gap-1">
                      <span className="font-extrabold text-emerald-700 text-base">{record.paymentRiskScore}</span>
                      <span className="text-[10px] text-gray-500">/ 100</span>
                      <StatusPill label={record.riskScoreLabel} />
                    </span>
                  }
                />
                <FR label="Device Risk" value={<StatusPill label={record.deviceRisk} />} />
                <FR label="Account Risk" value={<StatusPill label={record.accountRisk} />} />
                <FR label="Fraud Signals" value={<StatusPill label={record.fraudSignals} />} />
                <FR label="Duplicate Check" value={<StatusPill label={record.duplicateCheck} />} />
                <FR label="Shared Method Signal" value={<StatusPill label={record.sharedMethodSignal} />} />
                <FR label="3DS Status" value={<StatusPill label={record.threeDSStatus} />} />
                <FR label="Velocity Check" value={<StatusPill label={record.velocityCheck} />} />
                <FR label="Geo Consistency" value={<StatusPill label={record.geoConsistency} />} />
                <FR label="Customer Restriction" value={<StatusPill label={record.customerRestriction} />} />
                <FR label="Manual Review Status" value={<StatusPill label={record.manualReviewStatus} />} />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">
                Risk Score Gauge
              </p>
              <div className="flex flex-col items-center py-3">
                <div className="relative w-32 h-16">
                  {/* Semi-circle */}
                  <svg viewBox="0 0 100 50" className="w-full h-auto">
                    <path
                      d="M5,50 A45,45 0 0,1 95,50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5,50 A45,45 0 0,1 95,50"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(record.paymentRiskScore / 100) * 141} 141`}
                    />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 text-center">
                    <span className="text-2xl font-extrabold text-emerald-700">{record.paymentRiskScore}</span>
                    <p className="text-[9px] text-gray-500">Risk Score</p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-600 mt-2 text-center max-w-xs leading-tight">
                  This transaction has a <strong className="text-emerald-700">{record.riskScoreLabel}</strong> risk profile.
                  All authentication checks passed with no fraud signals detected.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
