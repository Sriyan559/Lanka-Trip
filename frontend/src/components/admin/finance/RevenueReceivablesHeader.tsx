'use client';

import React, { useState } from 'react';
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Plus,
  ShieldAlert,
  Receipt,
  Send,
  RefreshCcw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function RevenueReceivablesHeader() {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 pb-2 border-b border-gray-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
        <span>Finance</span>
        <span>/</span>
        <span>Sales, Revenue &amp; Receivables</span>
      </div>

      {/* Main Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Sales, Revenue &amp; Receivables
          </h1>
          <p className="text-xs text-gray-600 font-medium max-w-4xl mt-0.5 leading-relaxed">
            Comprehensive portfolio for sales recognition, revenue accounting, receivables management,
            ageing analysis, collections tracking, adjustments, and dispute resolution.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export */}
          <button
            onClick={() => toast.success('Exporting Revenue & Receivables Report...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Download size={13} className="text-gray-500" />
            <span>Export Revenue Report</span>
          </button>

          {/* Collection Actions */}
          <div className="relative">
            <button
              onClick={() => setCollectionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Send size={13} className="text-blue-500" />
              <span>Collection Actions</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>
            {collectionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs font-medium text-gray-700">
                <button
                  onClick={() => { toast.success('Sending payment reminders...'); setCollectionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700"
                >
                  Send Payment Reminders
                </button>
                <button
                  onClick={() => { toast.success('Escalating overdue accounts...'); setCollectionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                >
                  <span>Escalate Overdue Accounts</span>
                  <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-bold">64</span>
                </button>
                <button
                  onClick={() => { toast('Generating dunning letters...'); setCollectionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Generate Dunning Letters
                </button>
                <button
                  onClick={() => { toast('Running auto-matching...'); setCollectionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Auto-match Receipts
                </button>
              </div>
            )}
          </div>

          {/* Revenue Actions */}
          <div className="relative">
            <button
              onClick={() => setActionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <RefreshCcw size={13} className="text-gray-500" />
              <span>Revenue Actions</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>
            {actionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs font-medium text-gray-700">
                <button
                  onClick={() => { toast.success('Running revenue recognition...'); setActionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Run Revenue Recognition
                </button>
                <button
                  onClick={() => { toast('Reversing deferred entries...'); setActionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Reverse Deferred Revenue
                </button>
                <button
                  onClick={() => { toast.success('Batch approval submitted...'); setActionsOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Batch Approve Invoices
                </button>
              </div>
            )}
          </div>

          {/* Exceptions */}
          <button
            onClick={() => toast.error('Reviewing revenue exceptions...')}
            className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <AlertTriangle size={13} className="text-red-600" />
            <span>43 Exceptions</span>
          </button>

          {/* Create Invoice */}
          <button
            onClick={() => toast.success('Opening invoice creation form...')}
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
