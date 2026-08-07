'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Download,
  ChevronDown,
  AlertTriangle,
  Plus,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  payableId: string;
  supplierName: string;
  supplierId: string;
  approvalStatus: string;
  isSubmitted: boolean;
}

export function SupplierPayableDetailHeader({
  payableId,
  supplierName,
  supplierId,
  approvalStatus,
  isSubmitted,
}: Props) {
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
          onClick={() => router.push('/admin/finance/supplier-payables')}
          className="hover:text-gray-900 transition-colors"
        >
          Supplier Payables
        </button>
        <span>/</span>
        <span className="text-gray-900 font-bold">Supplier Payable Detail</span>
      </nav>

      {/* Title + Actions */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 leading-tight font-mono">
              Supplier Payable Detail
            </h1>
            <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
              {payableId}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                approvalStatus === 'Approved'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {approvalStatus}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
            Review supplier liability, invoice matching, deductions, approvals, payment scheduling,
            reconciliation, disputes and audit operations.{' '}
            <span className="font-semibold text-gray-700">
              {supplierName} ({supplierId})
            </span>
          </p>
        </div>

        {/* Top Global Actions */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => router.push('/admin/finance/supplier-payables')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <ChevronLeft size={13} />
            <span>← Back to Supplier Payables</span>
          </button>

          <button
            onClick={() => toast('Exporting Payable Report...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download size={13} />
            <span>Export Payable Report</span>
          </button>

          {/* More Actions */}
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
                  'Clone Payable',
                  'Print Payable Statement',
                  'Archive Payable',
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
            onClick={() => toast('Opening Payable Exceptions review...')}
            className="px-3 py-1.5 bg-white border border-[#8f002b] text-[#8f002b] hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <AlertTriangle size={13} />
            <span>Review Payable Exceptions</span>
          </button>

          <button
            onClick={() => toast.success('Opening Create Payable Review...')}
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
          >
            <Plus size={14} />
            <span>Create Payable Review</span>
          </button>
        </div>
      </div>

      {/* Payable Action Toolbar */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1.5 border-t border-gray-100 mt-1">
        {[
          { label: 'Request Supplier Update', icon: <FileText size={11} />, style: 'default' },
          { label: 'Submit for Approval', icon: null, style: 'default', disabled: isSubmitted },
          { label: 'Approve with Conditions', icon: null, style: 'default' },
          { label: 'Approve Payable', icon: null, style: 'success' },
          { label: 'Reject Payable', icon: null, style: 'danger' },
          { label: 'Place Payable Hold', icon: null, style: 'default' },
          { label: 'Schedule Payment', icon: null, style: 'default' },
          { label: 'Start Reconciliation', icon: null, style: 'default' },
        ].map(({ label, icon, style, disabled }) => {
          const base =
            'px-2.5 py-1 text-[11px] font-semibold rounded flex items-center gap-1 border transition-colors';
          const cls =
            style === 'success'
              ? `${base} bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700`
              : style === 'danger'
              ? `${base} bg-white text-red-600 border-red-300 hover:bg-red-50`
              : `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-50`;
          return (
            <button
              key={label}
              disabled={!!disabled}
              onClick={() =>
                disabled
                  ? toast.error(`${label}: action not available in current state.`)
                  : toast(`${label}`)
              }
              className={`${cls} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
