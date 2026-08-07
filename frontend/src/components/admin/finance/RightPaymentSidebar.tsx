'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  AlertTriangle,
  Lock,
  Layers,
  FileCheck,
  Plus,
  Play,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { FN03_ALERTS, FN03_HEALTH_SCORECARD } from '@/data/mockPaymentData';

const SEVERITY_STYLES: Record<string, string> = {
  Critical: 'bg-red-50 text-red-700 border-l-2 border-l-red-500',
  High: 'bg-orange-50 text-orange-700 border-l-2 border-l-orange-500',
  Medium: 'bg-yellow-50 text-yellow-800 border-l-2 border-l-yellow-500',
  Low: 'bg-blue-50 text-blue-700 border-l-2 border-l-blue-500',
  Info: 'bg-gray-50 text-gray-700 border-l-2 border-l-gray-400',
};

export function RightPaymentSidebar() {
  const [showAlertsAll, setShowAlertsAll] = useState(false);

  return (
    <aside className="w-full xl:w-72 2xl:w-80 shrink-0 flex flex-col gap-3 text-xs font-sans">
      {/* 1. Payment Operations Health Gauge (90/100) */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-900">Payment Operations Health</h2>
          <button
            onClick={() => toast('Health scorecard metrics view opened')}
            className="text-[10px] text-[#8f002b] font-bold hover:underline"
          >
            View details
          </button>
        </div>

        <div className="flex items-center gap-3 my-1">
          {/* Circular Score Gauge */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="90, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-gray-900 leading-none">90</span>
              <span className="text-[8px] text-gray-400 font-bold">/100</span>
            </div>
          </div>

          {/* Key Indicators List */}
          <div className="flex-1 flex flex-col gap-1 text-[10px]">
            {FN03_HEALTH_SCORECARD.slice(0, 5).map((h) => (
              <div key={h.label} className="flex justify-between items-center">
                <span className="text-gray-600 truncate">{h.label}</span>
                <span className="font-bold text-gray-900 ml-1">{h.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Priority Payment Alerts */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-900">Priority Payment Alerts ({FN03_ALERTS.length})</h2>
          <button
            onClick={() => setShowAlertsAll(!showAlertsAll)}
            className="text-[10px] text-[#8f002b] font-bold hover:underline"
          >
            {showAlertsAll ? 'Show less' : 'View all'}
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {(showAlertsAll ? FN03_ALERTS : FN03_ALERTS.slice(0, 4)).map((alert) => (
            <div
              key={alert.id}
              className={`p-2 rounded text-[10px] font-medium flex items-start gap-1.5 ${
                SEVERITY_STYLES[alert.severity] || 'bg-gray-50 text-gray-700'
              }`}
            >
              <span className="font-bold uppercase tracking-tight shrink-0">{alert.severity}</span>
              <span className="leading-tight">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Payment Status Summary Rail Panel */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1 text-[10px]">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-gray-900 text-xs">Payment Status Summary</h3>
          <button onClick={() => toast('Status summary filtered')} className="text-[#8f002b] font-bold hover:underline">
            View
          </button>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Success</span>
          <span className="font-bold text-emerald-700">296.5K</span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Pending Capture</span>
          <span className="font-bold text-amber-700">842</span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Failed</span>
          <span className="font-bold text-red-700">4,720</span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Declined</span>
          <span className="font-bold text-red-700">3,120</span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Reversed</span>
          <span className="font-bold text-orange-700">126</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Voided</span>
          <span className="font-bold text-gray-700">98</span>
        </div>
      </div>

      {/* 4. Payment Method Summary Rail Panel */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1 text-[10px]">
        <h3 className="font-bold text-gray-900 text-xs mb-1">Payment Method Summary</h3>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Card</span>
          <span className="font-bold text-gray-900">224.9M <span className="text-gray-400 font-normal">(52.6%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Wallet</span>
          <span className="font-bold text-gray-900">97.6M <span className="text-gray-400 font-normal">(22.8%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Bank Transfer</span>
          <span className="font-bold text-gray-900">61.2M <span className="text-gray-400 font-normal">(14.3%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">COD</span>
          <span className="font-bold text-gray-900">26.6M <span className="text-gray-400 font-normal">(6.2%)</span></span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Other</span>
          <span className="font-bold text-gray-900">17.6M <span className="text-gray-400 font-normal">(4.1%)</span></span>
        </div>
      </div>

      {/* 5. Gateway Summary Rail Panel */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1 text-[10px]">
        <h3 className="font-bold text-gray-900 text-xs mb-1">Gateway Summary</h3>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Visa</span>
          <span className="font-bold text-gray-900">226.4M <span className="text-gray-400 font-normal">(52.8%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Mastercard</span>
          <span className="font-bold text-gray-900">112.3M <span className="text-gray-400 font-normal">(26.2%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">mCash</span>
          <span className="font-bold text-gray-900">40.7M <span className="text-gray-400 font-normal">(9.5%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">eZ Cash</span>
          <span className="font-bold text-gray-900">25.4M <span className="text-gray-400 font-normal">(5.9%)</span></span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">HNB</span>
          <span className="font-bold text-gray-900">13.3M <span className="text-gray-400 font-normal">(3.1%)</span></span>
        </div>
      </div>

      {/* 6. Failure Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1 text-[10px]">
        <h3 className="font-bold text-gray-900 text-xs mb-1">Failure Summary</h3>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Total Failures</span>
          <span className="font-bold text-red-700">4,720</span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Failure Rate</span>
          <span className="font-bold text-red-700">1.48%</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Top Reason</span>
          <span className="font-bold text-gray-900">Do Not Honor (2,210)</span>
        </div>
      </div>

      {/* 7. Risk Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1 text-[10px]">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-gray-900 text-xs">Risk Summary</h3>
          <button onClick={() => toast('Risk summary filtered')} className="text-[#8f002b] font-bold hover:underline">
            View
          </button>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">High Risk</span>
          <span className="font-bold text-red-700">8,342</span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Medium Risk</span>
          <span className="font-bold text-amber-700">12,854</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Low Risk</span>
          <span className="font-bold text-emerald-700">297,224</span>
        </div>
      </div>

      {/* 8. Reconciliation Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1 text-[10px]">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-gray-900 text-xs">Reconciliation Summary</h3>
          <button onClick={() => toast('Reconciliation queue filtered')} className="text-[#8f002b] font-bold hover:underline">
            View
          </button>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Reconciled</span>
          <span className="font-bold text-emerald-700">296.5K <span className="text-gray-400 font-normal">(89.4%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Pending</span>
          <span className="font-bold text-amber-700">25.3K <span className="text-gray-400 font-normal">(7.6%)</span></span>
        </div>
        <div className="flex justify-between py-0.5 border-b border-gray-50">
          <span className="text-gray-600">Mismatched</span>
          <span className="font-bold text-red-700">9.1K <span className="text-gray-400 font-normal">(2.7%)</span></span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Unreconciled</span>
          <span className="font-bold text-red-700">1.2K <span className="text-gray-400 font-normal">(0.3%)</span></span>
        </div>
      </div>

      {/* 9. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
        <h3 className="font-bold text-gray-900 text-xs">Quick Queues</h3>
        <div className="grid grid-cols-5 gap-1 text-center">
          <button
            onClick={() => toast('Filtering Pending Review Queue')}
            className="p-1.5 bg-gray-50 hover:bg-[#8f002b]/10 hover:border-[#8f002b] border border-gray-200 rounded flex flex-col items-center gap-0.5 transition-colors"
          >
            <Clock size={12} className="text-amber-600" />
            <span className="text-[8px] text-gray-500 font-medium truncate w-full">Pending Review</span>
            <span className="text-xs font-extrabold text-gray-900">842</span>
          </button>

          <button
            onClick={() => toast('Filtering Failed Payments Queue')}
            className="p-1.5 bg-gray-50 hover:bg-[#8f002b]/10 hover:border-[#8f002b] border border-gray-200 rounded flex flex-col items-center gap-0.5 transition-colors"
          >
            <AlertTriangle size={12} className="text-red-600" />
            <span className="text-[8px] text-gray-500 font-medium truncate w-full">Failed Payments</span>
            <span className="text-xs font-extrabold text-red-700">4,720</span>
          </button>

          <button
            onClick={() => toast('Filtering Duplicate Queue')}
            className="p-1.5 bg-gray-50 hover:bg-[#8f002b]/10 hover:border-[#8f002b] border border-gray-200 rounded flex flex-col items-center gap-0.5 transition-colors"
          >
            <Layers size={12} className="text-amber-600" />
            <span className="text-[8px] text-gray-500 font-medium truncate w-full">Duplicate Queue</span>
            <span className="text-xs font-extrabold text-gray-900">84</span>
          </button>

          <button
            onClick={() => toast('Filtering Holds Queue')}
            className="p-1.5 bg-gray-50 hover:bg-[#8f002b]/10 hover:border-[#8f002b] border border-gray-200 rounded flex flex-col items-center gap-0.5 transition-colors"
          >
            <Lock size={12} className="text-amber-600" />
            <span className="text-[8px] text-gray-500 font-medium truncate w-full">Holds Queue</span>
            <span className="text-xs font-extrabold text-gray-900">42</span>
          </button>

          <button
            onClick={() => toast('Filtering Reconciliation Queue')}
            className="p-1.5 bg-gray-50 hover:bg-[#8f002b]/10 hover:border-[#8f002b] border border-gray-200 rounded flex flex-col items-center gap-0.5 transition-colors"
          >
            <FileCheck size={12} className="text-purple-600" />
            <span className="text-[8px] text-gray-500 font-medium truncate w-full">Recon Queue</span>
            <span className="text-xs font-extrabold text-gray-900">1,248</span>
          </button>
        </div>
      </div>

      {/* 10. Final Payment Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-1.5">
        <h3 className="font-bold text-gray-900 text-xs mb-0.5">Final Payment Actions</h3>
        <button
          onClick={() => toast.success('Open Payment Queue dialog')}
          className="w-full py-1.5 px-3 border border-[#8f002b] text-[#8f002b] hover:bg-[#8f002b] hover:text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 size={12} />
          <span>Open Payment Queue</span>
        </button>

        <button
          onClick={() => toast.error('Reviewing Failed Payments')}
          className="w-full py-1.5 px-3 border border-[#8f002b] text-[#8f002b] hover:bg-[#8f002b] hover:text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <AlertTriangle size={12} />
          <span>Review Failed Payments</span>
        </button>

        <button
          onClick={() => toast('Reviewing Active Holds Queue')}
          className="w-full py-1.5 px-3 border border-[#8f002b] text-[#8f002b] hover:bg-[#8f002b] hover:text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <Lock size={12} />
          <span>Review Holds</span>
        </button>

        <button
          onClick={() => toast.success('Reconciliation batch initiated')}
          className="w-full py-1.5 px-3 border border-[#8f002b] text-[#8f002b] hover:bg-[#8f002b] hover:text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <RotateCcw size={12} />
          <span>Start Reconciliation</span>
        </button>

        <button
          onClick={() => toast.success('Manual Entry form opened')}
          className="w-full py-1.5 px-3 border border-[#8f002b] text-[#8f002b] hover:bg-[#8f002b] hover:text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <Plus size={12} />
          <span>Launch Manual Entry</span>
        </button>

        <button
          onClick={() => toast('Audit trail history loaded')}
          className="w-full py-1.5 px-3 border border-[#8f002b] text-[#8f002b] hover:bg-[#8f002b] hover:text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <ExternalLink size={12} />
          <span>View Audit Trail</span>
        </button>
      </div>
    </aside>
  );
}
