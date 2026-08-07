'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Download,
  ChevronDown,
  AlertOctagon,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  transactionId: string;
}

export function PaymentDetailHeader({ transactionId }: Props) {
  const router = useRouter();
  const [moreOpen, setMoreOpen] = React.useState(false);

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
          onClick={() => router.push('/admin/finance/payments')}
          className="hover:text-gray-900 transition-colors"
        >
          Payments &amp; Transactions
        </button>
        <span>/</span>
        <span className="text-gray-900 font-bold">Payment Transaction Detail</span>
      </nav>

      {/* Main row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Payment Transaction Detail
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 max-w-3xl leading-relaxed">
            Review a single payment record, authorization, capture, settlement linkage,
            reconciliation, exceptions, approvals and audit operations.
          </p>
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => router.push('/admin/finance/payments')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <ChevronLeft size={13} />
            <span>Back to Payments</span>
          </button>

          <button
            onClick={() => toast.success('Exporting transaction report PDF...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download size={13} />
            <span>Export Transaction Report</span>
          </button>

          {/* More Actions dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <span>More Actions</span>
              <ChevronDown size={12} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 text-xs font-medium text-gray-700">
                {['View Audit Log', 'Copy Transaction ID', 'Flag for Review', 'Link to Dispute'].map((a) => (
                  <button
                    key={a}
                    onClick={() => { toast(a); setMoreOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => toast.error(`Reviewing exception for ${transactionId}`)}
            className="px-3 py-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <AlertOctagon size={13} />
            <span>Review Payment Exception</span>
          </button>

          <button
            onClick={() => toast.success('Creating payment review record...')}
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
          >
            <Plus size={14} />
            <span>Create Payment Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}
