'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Plus,
  Layers,
  Lock,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function ReconciliationControlsHeader() {
  const router = useRouter();
  const [exceptionsOpen, setExceptionsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [createReviewOpen, setCreateReviewOpen] = useState(false);

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
        <span className="text-gray-900 font-bold">Reconciliation &amp; Controls</span>
      </nav>

      {/* Title & Actions Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Reconciliation, Exceptions &amp; Financial Controls
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 max-w-4xl leading-relaxed">
            Monitor reconciliation coverage, unmatched records, financial exceptions, control breaches, financial holds, certifications and governed control operations across the Finance network.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => toast.success('Exporting Reconciliation Operations Report...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download size={13} />
            <span>Export Reconciliation Operations Report</span>
          </button>

          {/* Review Critical Exceptions */}
          <div className="relative">
            <button
              onClick={() => setExceptionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <AlertTriangle size={13} className="text-red-600" />
              <span>Review Critical Exceptions</span>
              <ChevronDown size={12} />
            </button>
            {exceptionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 text-xs font-medium text-gray-700">
                {[
                  '24 Critical Exceptions',
                  '12 Active Control Breaches',
                  '9 Reconciliation SLA Breaches',
                  '38 Active Financial Holds',
                  '6 Pending Balance Certifications',
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
                  'Bulk Auto-Match Selected',
                  'Bulk Certify Balances',
                  'Bulk Release Holds',
                  'Export Selected Reconciliations',
                  'Assign Exception Owner',
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
            onClick={() => toast.error('Opening Review Control Breaches Queue...')}
            className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Lock size={13} />
            <span>Review Control Breaches</span>
          </button>

          <button
            onClick={() => toast.success('Triggering Reconciliation Engine Run...')}
            className="px-3 py-1.5 bg-white border border-[#8f002b] text-[#8f002b] hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <RefreshCw size={13} />
            <span>Run Reconciliation</span>
          </button>

          {/* Create Reconciliation Review Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCreateReviewOpen((p) => !p)}
              className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
            >
              <Plus size={14} />
              <span>Create Reconciliation Review</span>
              <ChevronDown size={12} />
            </button>
            {createReviewOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 text-xs font-medium text-gray-700">
                {[
                  'Manual Match Review',
                  'Exception Case Review',
                  'Control Breach Review',
                  'Financial Hold Review',
                  'Balance Certification Review',
                  'Variance Override Request',
                  'Custom Reconciliation Job',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      toast.success(`Opening creation modal for ${item}`);
                      setCreateReviewOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
