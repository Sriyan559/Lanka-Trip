'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Download, ChevronDown, AlertTriangle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  settlementId: string;
}

export function SettlementDetailHeader({ settlementId }: Props) {
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

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
        <button
          onClick={() => router.push('/admin/finance/settlements-payouts')}
          className="hover:text-gray-900 transition-colors"
        >
          Settlements &amp; Payouts
        </button>
        <span>/</span>
        <span className="text-gray-900 font-bold font-mono">{settlementId}</span>
      </nav>

      {/* Title & Top Global Actions */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 leading-tight flex items-center gap-2">
            <span>FN10 — Settlement / Payout Detail</span>
            <span className="text-xs font-mono font-bold text-[#8f002b] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {settlementId}
            </span>
          </h1>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => router.push('/admin/finance/settlements-payouts')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <ChevronLeft size={13} />
            <span>Back to Settlements &amp; Payouts</span>
          </button>

          <button
            onClick={() => toast.success('Exporting Settlement Report...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download size={13} />
            <span>Export Settlement Report</span>
          </button>

          {/* More Actions dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>More Actions</span>
              <ChevronDown size={12} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 text-xs font-medium text-gray-700">
                {[
                  'View Audit Trail',
                  'Print Settlement Statement',
                  'Export Source Linkage',
                  'Reevaluate Settlement Rules',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      toast(item);
                      setMoreOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => toast('Opening Settlement Exception review...')}
            className="px-3 py-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <AlertTriangle size={13} />
            <span>Review Settlement Exception</span>
          </button>

          <button
            onClick={() => toast.success('Opening Create Settlement Review...')}
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
          >
            <Plus size={14} />
            <span>Create Settlement Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}
