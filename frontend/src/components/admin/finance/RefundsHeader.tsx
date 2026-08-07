'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Plus,
  ShieldAlert,
  Layers,
  FileCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function RefundsHeader() {
  const router = useRouter();
  const [exceptionsOpen, setExceptionsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 pb-2 border-b border-gray-200">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
        <button
          onClick={() => router.push('/admin/finance')}
          className="hover:text-gray-900 transition-colors"
        >
          Finance
        </button>
        <span>/</span>
        <span className="text-gray-900 font-bold">Refunds &amp; Customer Compensation</span>
      </nav>

      {/* Title & Actions Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Refunds &amp; Customer Compensation
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 max-w-4xl leading-relaxed">
            End-to-end visibility and orchestration across refund requests, customer
            compensation, settlement impact, reconciliation and customer resolution across the Beauty ecosystem.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => toast.success('Exporting Refund Operations Report...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download size={13} />
            <span>Export Refund Operations Report</span>
          </button>

          {/* Review Refund Exceptions dropdown */}
          <div className="relative">
            <button
              onClick={() => setExceptionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <AlertTriangle size={13} />
              <span>Review Refund Exceptions</span>
              <ChevronDown size={12} />
            </button>
            {exceptionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 text-xs font-medium text-gray-700">
                {[
                  '5 Critical Refund Exceptions',
                  '12 SLA Breaches Pending Action',
                  '8 Failed Disbursements to Retry',
                  '10 Reconciliation Mismatches',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      toast(`Opening exception queue: ${item}`);
                      setExceptionsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bulk Actions dropdown */}
          <div className="relative">
            <button
              onClick={() => setBulkOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Layers size={13} />
              <span>Bulk Actions</span>
              <ChevronDown size={12} />
            </button>
            {bulkOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 text-xs font-medium text-gray-700">
                {[
                  'Bulk Approve Selected',
                  'Bulk Release Refunds',
                  'Bulk Reissue Failed Refunds',
                  'Export Selected Records',
                  'Assign Batch Reviewer',
                ].map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      toast(`Triggered: ${a}`);
                      setBulkOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => toast('Opening Refund Approvals Queue...')}
            className="px-3 py-1.5 bg-white border border-amber-400 text-amber-800 hover:bg-amber-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <FileCheck size={13} />
            <span>Review Refund Approvals</span>
          </button>

          <button
            onClick={() => toast.success('Initiating Create Refund Review modal...')}
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
          >
            <Plus size={14} />
            <span>Create Refund Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}
