'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, RefreshCw } from 'lucide-react';
import type { RefundPortfolioRow } from '@/types/finance';
import type { RefundTableMeta } from '@/services/api/financeRefundsService';

interface Props {
  rows: RefundPortfolioRow[];
  meta: RefundTableMeta | null;
  selectedRowId?: string;
  onSelectRow?: (row: RefundPortfolioRow) => void;
  onSortChange?: (sort: string, direction: 'asc' | 'desc') => void;
  onPageChange?: (page: number) => void;
  currentSort?: string;
  currentDirection?: 'asc' | 'desc';
  loading?: boolean;
  refreshing?: boolean;
  error?: Error | null;
}

const COL_SORT_KEYS: Record<string, string> = {
  'Refund ID': 'id',
  'Date Requested': 'dateRequested',
  'Refund Amount (LKR)': 'refundAmount',
  'Compensation (LKR)': 'compensationAmount',
  'Eligibility': 'eligibility',
  'Approval': 'approval',
  'Processing': 'processing',
};

export function RefundPortfolioTable({
  rows,
  meta,
  selectedRowId,
  onSelectRow,
  onSortChange,
  onPageChange,
  currentSort = 'dateRequested',
  currentDirection = 'desc',
  loading,
  refreshing,
  error,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedIds.size === rows.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(rows.map((r) => r.id)));
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const handleSort = (col: string) => {
    const key = COL_SORT_KEYS[col];
    if (!key || !onSortChange) return;
    const newDir = currentSort === key && currentDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(key, newDir);
  };

  const SortIcon = ({ col }: { col: string }) => {
    const key = COL_SORT_KEYS[col];
    if (!key) return null;
    if (currentSort !== key) return <ArrowUpDown size={10} className="text-gray-400 inline ml-0.5" />;
    return currentDirection === 'asc'
      ? <ArrowUp size={10} className="text-[#8f002b] inline ml-0.5" />
      : <ArrowDown size={10} className="text-[#8f002b] inline ml-0.5" />;
  };

  /* Badge helpers */
  const eligBadge = (st: string) => {
    if (st === 'Eligible') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (st === 'Under Review') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (st === 'Not Eligible') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };
  const apprBadge = (st: string) => {
    if (st === 'Approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (st === 'Pending Approval') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (st === 'Rejected') return 'bg-red-50 text-red-700 border-red-200';
    if (st === 'Pending Review' || st === 'Under Review') return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };
  const procBadge = (st: string) => {
    if (st === 'Completed') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (st === 'Processing') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (st === 'Failed') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };
  const reconBadge = (st: string) => {
    if (st === 'Reconciled') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (st === 'Pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (st === 'Exception') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };
  const slaClass = (sla: string) => {
    const n = parseInt(sla, 10);
    if (isNaN(n)) return 'text-gray-600';
    if (n >= 90) return 'text-emerald-700 font-bold';
    if (n >= 75) return 'text-amber-700 font-bold';
    return 'text-red-700 font-bold';
  };

  /* Pagination logic */
  const page     = meta?.page ?? 1;
  const lastPage = meta?.lastPage ?? 1;
  const total    = meta?.total ?? 0;
  const perPage  = meta?.perPage ?? 15;
  const from     = Math.min((page - 1) * perPage + 1, total);
  const to       = Math.min(page * perPage, total);

  const pageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(lastPage - 1, page + 1); i++) pages.push(i);
      if (page < lastPage - 2) pages.push('...');
      pages.push(lastPage);
    }
    return pages;
  };

  const COLUMNS = [
    'Refund ID', 'Order ID', 'Customer Name', 'Customer ID', 'Reason Code',
    'Payment Method', 'Product / Seller', 'Refund Type',
    'Refund Amount (LKR)', 'Compensation (LKR)',
    'Eligibility', 'Approval', 'Processing',
    'Settlement Method', 'Gateway', 'Location / Region',
    'Reconciliation Status', 'Date Requested', 'SLA', 'CSAT', 'Actions',
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Refunds &amp; Customer Compensation Portfolio
          </h2>
          <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {loading ? '…' : `${total.toLocaleString()} records`}
          </span>
          {refreshing && (
            <RefreshCw size={10} className="text-blue-400 animate-spin" />
          )}
        </div>
        {selectedIds.size > 0 && (
          <span className="text-xs font-semibold text-[#8f002b]">
            {selectedIds.size} records selected
          </span>
        )}
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="px-4 py-3 bg-red-50 border-b border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
          <span>⚠</span> {error.message}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse min-w-[1600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-wider">
              <th className="p-2 w-8 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.size === rows.length && rows.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-[#8f002b] focus:ring-[#8f002b]"
                />
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className={`p-2 whitespace-nowrap ${COL_SORT_KEYS[col] ? 'cursor-pointer hover:text-gray-900 hover:bg-gray-100 select-none transition-colors' : ''} ${['Refund Amount (LKR)', 'Compensation (LKR)'].includes(col) ? 'text-right' : ''} ${['Eligibility', 'Approval', 'Processing', 'Reconciliation Status', 'SLA', 'CSAT', 'Actions'].includes(col) ? 'text-center' : ''}`}
                  onClick={() => handleSort(col)}
                >
                  {col} <SortIcon col={col} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading && rows.length === 0 ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={COLUMNS.length + 1} className="p-2">
                    <div className="h-4 bg-gray-100 rounded w-full" />
                  </td>
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="text-center text-gray-400 text-xs py-8">
                  No refund records match your current filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isSelected = selectedRowId === row.id || selectedIds.has(row.id);
                return (
                  <tr
                    key={row.id}
                    onClick={() => onSelectRow?.(row)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 font-medium ${isSelected ? 'bg-red-50/40' : ''}`}
                  >
                    <td className="p-2 text-center" onClick={(e) => toggleSelectOne(row.id, e)}>
                      <input type="checkbox" checked={selectedIds.has(row.id)} onChange={() => {}} className="rounded border-gray-300 text-[#8f002b] focus:ring-[#8f002b]" />
                    </td>
                    <td className="p-2 font-mono font-bold text-[#8f002b]">{row.id}</td>
                    <td className="p-2 font-mono text-gray-600">{row.orderId}</td>
                    <td className="p-2 font-semibold text-gray-900 max-w-[120px] truncate" title={row.customerName}>{row.customerName}</td>
                    <td className="p-2 font-mono text-gray-500 text-[10px]">{row.customerId}</td>
                    <td className="p-2 font-mono text-[10px] text-gray-600">{row.reasonCode}</td>
                    <td className="p-2 text-gray-700">{row.paymentMethod}</td>
                    <td className="p-2 text-gray-600 max-w-[140px] truncate" title={row.productSeller}>{row.productSeller}</td>
                    <td className="p-2 font-semibold text-gray-800">{row.refundType}</td>
                    <td className="p-2 text-right font-mono font-bold text-gray-900">
                      {(row.refundAmount ?? 0) > 0 ? row.refundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                    </td>
                    <td className="p-2 text-right font-mono font-semibold text-purple-700">
                      {(row.compensationAmount ?? 0) > 0 ? row.compensationAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                    </td>
                    <td className="p-2 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${eligBadge(row.eligibility)}`}>{row.eligibility}</span>
                    </td>
                    <td className="p-2 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${apprBadge(row.approval)}`}>{row.approval}</span>
                    </td>
                    <td className="p-2 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${procBadge(row.processing)}`}>{row.processing}</span>
                    </td>
                    <td className="p-2 text-gray-700">{row.settlementMethod}</td>
                    <td className="p-2 text-gray-600 font-medium">{row.gateway}</td>
                    <td className="p-2 text-gray-600">{row.locationRegion}</td>
                    <td className="p-2 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${reconBadge(row.reconciliationStatus)}`}>{row.reconciliationStatus}</span>
                    </td>
                    <td className="p-2 font-mono text-[10px] text-gray-500">
                      {row.dateRequested ? new Date(row.dateRequested).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '–'}
                    </td>
                    <td className={`p-2 text-center text-[10px] ${slaClass(row.sla)}`}>{row.sla}</td>
                    <td className="p-2 text-center font-mono font-semibold text-gray-700">{row.csat?.toFixed(1) ?? '–'}</td>
                    <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => onSelectRow?.(row)} className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-900 transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 gap-2">
        <span className="font-medium">
          {total > 0 ? `Showing ${from.toLocaleString()} – ${to.toLocaleString()} of ${total.toLocaleString()} records` : 'No records'}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1 || loading}
            className="p-1 border border-gray-300 rounded hover:bg-white text-gray-600 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>
          {pageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={`dots-${i}`} className="px-1.5 text-gray-400">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange?.(p as number)}
                className={`px-2.5 py-1 text-xs font-semibold rounded border transition-colors ${
                  page === p ? 'bg-[#8f002b] text-white border-[#8f002b]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= lastPage || loading}
            className="p-1 border border-gray-300 rounded hover:bg-white text-gray-600 disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <span className="text-gray-500 font-medium">Page {page} of {lastPage}</span>
      </div>
    </div>
  );
}
