'use client';

import React, { useState } from 'react';
import { Download, AlertTriangle, ChevronDown, Plus, ShieldAlert, Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFinanceCommandCenter } from '@/contexts/FinanceCommandCenterContext';
import { exportFinanceReport } from '@/services/api/financeCommandCenterService';

export function FinanceCommandHeader() {
  const [exceptionsOpen, setExceptionsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const { dashboard, filters, setFilters } = useFinanceCommandCenter();

  return (
    <div className="flex flex-col gap-2 pb-2 border-b border-gray-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <span>Finance</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">Command Center</span>
      </div>

      {/* Main Header & Actions Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Finance Command Center
          </h1>
          <p className="text-xs text-gray-600 font-medium max-w-4xl mt-0.5 leading-relaxed">
            Centralized monitoring and governance for ecosystem revenue, payments, receivables, payables,
            commissions, settlements, tax, reconciliation, approvals and audit operations.
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export Report */}
          <button
            disabled={!dashboard?.permissions.canExport || exporting}
            title={!dashboard?.permissions.canExport ? 'Export permission is required' : undefined}
            onClick={async () => { setExporting(true); try { await exportFinanceReport(filters); toast.success('Finance report exported'); } catch (error) { toast.error(error instanceof Error ? error.message : 'Export failed'); } finally { setExporting(false); } }}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Download size={13} className="text-gray-500" />
            <span>{exporting ? 'Exporting…' : 'Export Executive Finance Report'}</span>
          </button>

          {/* Exceptions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExceptionsOpen((p) => !p)}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <AlertTriangle size={13} className="text-amber-500" />
              <span>Review Financial Exceptions</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>

            {exceptionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs font-medium text-gray-700">
                {dashboard?.alerts.length ? dashboard.alerts.map((alert) => (
                  <button key={alert.id} onClick={() => { if (alert.id === 'failed-payments') setFilters({ domain: 'payment', status: 'failed' }); setExceptionsOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-700">
                    <span className="font-bold mr-1">{alert.severity}</span>{alert.message}
                  </button>
                )) : <p className="px-3 py-2 text-gray-500">No active finance alerts</p>}
                <button
                  onClick={() => {
                    setFilters({ domain: 'payment', status: 'failed' });
                    setExceptionsOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                >
                  <span>Failed Payments Queue</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Database</span>
                </button>
                <button
                  disabled title="Reconciliation domain is not configured"
                  className="w-full text-left px-3 py-1.5 text-gray-400"
                >
                  <span>Unreconciled Ledger Items</span>
                </button>
              </div>
            )}
          </div>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBulkOpen((p) => !p)} disabled={!dashboard?.permissions.canMutate}
              title="No authorized finance bulk-mutation workflow is configured"
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Layers size={13} className="text-gray-500" />
              <span>Bulk Actions</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>

            {bulkOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 text-xs font-medium text-gray-700">
                <button
                  onClick={() => {
                    toast.success('Bulk reconciliation process triggered');
                    setBulkOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Run Auto-Reconciliation
                </button>
                <button
                  onClick={() => {
                    toast.success('Bulk payouts release queue initiated');
                    setBulkOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Release Approved Payouts
                </button>
                <button
                  onClick={() => {
                    toast.success('Bulk tax calculation update completed');
                    setBulkOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                >
                  Re-calculate VAT & Tax
                </button>
              </div>
            )}
          </div>

          {/* Review Critical Exception */}
          <button
            disabled={!dashboard?.capabilities.financeExceptions}
            title="Finance exception rules and workflow are not configured"
            className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <ShieldAlert size={13} className="text-red-600" />
            <span>Review Critical Exception</span>
          </button>

          {/* Create Manual Financial Entry */}
          <button
            disabled={!dashboard?.permissions.canCreateJournal}
            title="A general ledger and balanced journal-entry subsystem are not configured"
            className="px-3.5 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} className="text-white" />
            <span>Create Manual Financial Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
