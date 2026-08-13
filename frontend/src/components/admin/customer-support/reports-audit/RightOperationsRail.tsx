'use client';

import React from 'react';
import {
  RotateCw,
  Plus,
  Download,
  Upload,
  AlertTriangle,
  Shield,
  FileText,
  Lock,
} from 'lucide-react';

interface RightOperationsRailProps {
  onGenerateReport?: () => void;
  onCreateScheduled?: () => void;
  onExportData?: () => void;
  onImportData?: () => void;
  onReviewExceptions?: () => void;
  onReviewAuditTrail?: () => void;
  onReviewRetention?: () => void;
  onOpenAccessEvidence?: () => void;
}

export function RightOperationsRail({
  onGenerateReport,
  onCreateScheduled,
  onExportData,
  onImportData,
  onReviewExceptions,
  onReviewAuditTrail,
  onReviewRetention,
  onOpenAccessEvidence,
}: RightOperationsRailProps) {
  return (
    <div className="w-full space-y-2 text-xs">
      {/* 1. Reporting & Audit Health */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 text-xs">Reporting &amp; Audit Health</h4>
          <RotateCw size={12} className="text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* Circular Gauge */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="97, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">97</span>
              <span className="text-[9px] text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-emerald-600 text-xs block">Excellent</span>
            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
              System Health
            </span>
          </div>
        </div>
      </div>

      {/* 2. Reporting Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Reporting Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Generated</span>
          <span className="font-bold text-slate-900">214</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Scheduled</span>
          <span className="font-bold text-slate-900">32</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Active</span>
          <span className="font-bold text-emerald-600">26</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Failed</span>
          <span className="font-bold text-rose-600">4</span>
        </div>
      </div>

      {/* 3. Export Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Export Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total</span>
          <span className="font-bold text-slate-900">146</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Completed</span>
          <span className="font-bold text-emerald-600">137</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Failed</span>
          <span className="font-bold text-rose-600">4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Pending</span>
          <span className="font-bold text-amber-600">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Volume</span>
          <span className="font-bold text-slate-900">3.42M</span>
        </div>
      </div>

      {/* 4. Import Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Import Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total</span>
          <span className="font-bold text-slate-900">58</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Completed</span>
          <span className="font-bold text-emerald-600">51</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Failed</span>
          <span className="font-bold text-rose-600">4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Pending</span>
          <span className="font-bold text-amber-600">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Volume</span>
          <span className="font-bold text-slate-900">618K</span>
        </div>
      </div>

      {/* 5. Audit Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Audit Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Audit Events</span>
          <span className="font-bold text-slate-900">18.4K</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Users</span>
          <span className="font-bold text-slate-900">6.2K</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Actions</span>
          <span className="font-bold text-slate-900">11.1K</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Critical</span>
          <span className="font-bold text-emerald-600">0</span>
        </div>
      </div>

      {/* 6. Retention Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Retention Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">In Retention</span>
          <span className="font-bold text-slate-900">2.43M</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Expiring</span>
          <span className="font-bold text-amber-600">148</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Expired</span>
          <span className="font-bold text-rose-600">32</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Policy Exceptions</span>
          <span className="font-bold text-slate-900">12</span>
        </div>
      </div>

      {/* 7. Exceptions Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Exceptions Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-[#881337] font-bold">Blocking</span>
          <span className="font-bold text-rose-600">11</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">High</span>
          <span className="font-bold text-amber-600">4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Medium</span>
          <span className="font-bold text-amber-600">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Warning</span>
          <span className="font-bold text-amber-600">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Info</span>
          <span className="font-bold text-blue-600">2</span>
        </div>
      </div>

      {/* 8. Quick Queues */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-0.5 text-[10px]">
        <h5 className="font-bold text-slate-900 text-[10px] mb-0.5">Quick Queues</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed Exports</span>
          <span className="font-bold text-rose-600">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Failed Imports</span>
          <span className="font-bold text-rose-600">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Transfer Exceptions</span>
          <span className="font-bold text-amber-600">11</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Retention Expiring</span>
          <span className="font-bold text-amber-600">6</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Audit Warnings</span>
          <span className="font-bold text-amber-600">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Pending Transfers</span>
          <span className="font-bold text-blue-600">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> New Audit Evidence</span>
          <span className="font-bold text-slate-900">4</span>
        </div>
      </div>

      {/* 9. Final Actions */}
      <div className="space-y-1 pt-1">
        <button
          type="button"
          onClick={onGenerateReport}
          className="w-full py-1.5 px-2.5 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Generate Report</span>
        </button>

        <button
          type="button"
          onClick={onCreateScheduled}
          className="w-full py-1.5 px-2.5 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create Scheduled Report</span>
        </button>

        <button
          type="button"
          onClick={onExportData}
          className="w-full py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Download size={13} className="text-slate-500" /> Export Support Data</span>
        </button>

        <button
          type="button"
          onClick={onImportData}
          className="w-full py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Upload size={13} className="text-slate-500" /> Import Support Data</span>
        </button>

        <button
          type="button"
          onClick={onReviewExceptions}
          className="w-full py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><AlertTriangle size={13} className="text-amber-500" /> Review Transfer Exceptions</span>
        </button>

        <button
          type="button"
          onClick={onReviewAuditTrail}
          className="w-full py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Shield size={13} className="text-slate-500" /> Review Audit Trail</span>
        </button>

        <button
          type="button"
          onClick={onReviewRetention}
          className="w-full py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><FileText size={13} className="text-slate-500" /> Review Retention Queue</span>
        </button>

        <button
          type="button"
          onClick={onOpenAccessEvidence}
          className="w-full py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Lock size={13} className="text-slate-500" /> Open Access Evidence</span>
        </button>
      </div>
    </div>
  );
}
