'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Plus,
  Layers,
  FileCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function TaxCurrencyConfigHeader() {
  const router = useRouter();
  const [exceptionsOpen, setExceptionsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [createChangeOpen, setCreateChangeOpen] = useState(false);

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
        <span className="text-gray-900 font-bold">Tax &amp; Currency</span>
      </nav>

      {/* Title & Actions Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Tax, Currency &amp; Financial Configuration
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 max-w-4xl leading-relaxed">
            Manage tax rules, jurisdiction coverage, FX configuration, currencies, rounding policies, accounting periods, financial calendars and controlled configuration changes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => toast.success('Exporting Configuration Operations Report...')}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download size={13} />
            <span>Export Configuration Operations Report</span>
          </button>

          {/* Review Configuration Conflicts dropdown */}
          <div className="relative">
            <button
              onClick={() => setExceptionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <AlertTriangle size={13} className="text-amber-500" />
              <span>Review Configuration Conflicts</span>
              <ChevronDown size={12} />
            </button>
            {exceptionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 text-xs font-medium text-gray-700">
                {[
                  '7 Tax Configuration Conflicts',
                  '6 FX Rates Expiring Soon',
                  '14 Manual FX Overrides',
                  '18 Pending Configuration Changes',
                  '11 Configuration Exceptions',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      toast(`Opening conflict queue: ${item}`);
                      setExceptionsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
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
                  'Bulk Approve Tax Rules',
                  'Bulk Update FX Rates',
                  'Bulk Refresh Rates from Provider',
                  'Export Configuration Backup',
                  'Run Impact Simulation Batch',
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
            onClick={() => toast.error('Opening Review Pending Changes Queue...')}
            className="px-3 py-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <FileCheck size={13} />
            <span>Review Pending Changes</span>
          </button>

          {/* Create Configuration Change Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCreateChangeOpen((p) => !p)}
              className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
            >
              <Plus size={14} />
              <span>Create Configuration Change</span>
              <ChevronDown size={12} />
            </button>
            {createChangeOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 text-xs font-medium text-gray-700">
                {[
                  'New Tax Rule',
                  'New Tax Profile',
                  'New FX Rate Override',
                  'New Currency Pair',
                  'New Rounding Policy',
                  'Open Accounting Period',
                  'Close Accounting Period',
                  'New Financial Calendar',
                ].map((changeType) => (
                  <button
                    key={changeType}
                    onClick={() => {
                      toast.success(`Opening creation modal for ${changeType}`);
                      setCreateChangeOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    {changeType}
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
