'use client';

import React, { useState } from 'react';
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Plus,
  ShieldAlert,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { usePaymentsManagement } from '@/contexts/FinanceRevenuePaymentsContext';
import { API_BASE, withQuery } from '@/lib/api/client';

export function PaymentsHeader() {
  const {data,filters,setFilters}=usePaymentsManagement();const canMutate=data?.permissions.canMutate??false;
  const [exceptionsOpen, setExceptionsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 pb-2 border-b border-gray-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
        <span>Finance</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">Payments &amp; Transactions</span>
      </div>

      {/* Main Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Payments &amp; Transaction Management
          </h1>
          <p className="text-xs text-gray-600 font-medium max-w-4xl mt-0.5 leading-relaxed">
            Monitor transaction authorization, capture, payment exceptions, gateway performance, duplicates, holds, settlement linkage and governed payment operations across the beauty marketplace.
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export Payment Operations Report */}
          <button
            disabled={!data?.permissions.canExport}
            onClick={() => {window.location.href=`${API_BASE}${withQuery('/admin/finance/payments/export',filters)}`}}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Download size={13} className="text-gray-500" />
            <span>Export Payment Operations Report</span>
          </button>

          {/* Review Payment Exceptions */}
          <div className="relative">
            <button
              onClick={() => setExceptionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <AlertTriangle size={13} className="text-amber-500" />
              <span>Review Payment Exceptions</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>

            {exceptionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs font-medium text-gray-700">
                <button
                  onClick={() => { toast.error('Filtering 126 Critical Exceptions'); setExceptionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-700 flex items-center justify-between"
                >
                  <span>126 Critical Exceptions</span>
                  <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-bold">Urgent</span>
                </button>
                <button
                  onClick={() => { toast('4,720 Failed Payments loaded'); setExceptionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                >
                  <span>Failed Payments Queue</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold">4.7K</span>
                </button>
              </div>
            )}
          </div>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              disabled={!canMutate} title={!canMutate?'Bulk payment mutations are not configured':undefined}
              onClick={() => setBulkOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Layers size={13} className="text-gray-500" />
              <span>Bulk Actions</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>

            {bulkOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs font-medium text-gray-700">
                <button
                  onClick={() => { toast.success('Bulk capture process triggered'); setBulkOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Bulk Capture Invoices
                </button>
                <button
                  onClick={() => { toast.success('Bulk retry initiated'); setBulkOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Retry Eligible Failures
                </button>
              </div>
            )}
          </div>

          {/* Review Failed Payments */}
          <button
            onClick={() => setFilters({status:'failed'})}
            className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <ShieldAlert size={13} className="text-red-600" />
            <span>Review Failed Payments</span>
          </button>

          {/* Create Payment Review */}
          <button
            disabled={!canMutate} title={!canMutate?'Payment review workflow is not configured':undefined}
            onClick={() => toast.error('Payment review workflow is unavailable')}
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} className="text-white" />
            <span>Create Payment Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}
