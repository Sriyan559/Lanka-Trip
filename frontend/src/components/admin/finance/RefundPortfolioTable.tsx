'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { RefundPortfolioRow } from '@/types/finance';

interface Props {
  rows: RefundPortfolioRow[];
  selectedRowId?: string;
  onSelectRow?: (row: RefundPortfolioRow) => void;
}

export function RefundPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSelectAll = () => {
    if (selectedIds.size === rows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(rows.map((r) => r.id)));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  /* Badge Color Helpers */
  const getEligibilityBadge = (st: string) => {
    switch (st) {
      case 'Eligible':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Not Eligible':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getApprovalBadge = (st: string) => {
    switch (st) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending Approval':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Pending Review':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProcessingBadge = (st: string) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getReconBadge = (st: string) => {
    switch (st) {
      case 'Reconciled':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Exception':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSlaBadge = (sla: string) => {
    const num = parseInt(sla, 10);
    if (isNaN(num)) return 'text-gray-600';
    if (num >= 90) return 'text-emerald-700 font-bold';
    if (num >= 75) return 'text-amber-700 font-bold';
    return 'text-red-700 font-bold';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Table Header Strip */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Refunds &amp; Customer Compensation Portfolio
          </h2>
          <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            1,245 records
          </span>
        </div>
        {selectedIds.size > 0 && (
          <span className="text-xs font-semibold text-[#8f002b]">
            {selectedIds.size} records selected
          </span>
        )}
      </div>

      {/* Overflow Scroll Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse min-w-[1500px]">
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
              <th className="p-2">Refund ID</th>
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer Name</th>
              <th className="p-2">Customer ID</th>
              <th className="p-2">Reason Code</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Product / Seller</th>
              <th className="p-2">Refund Type</th>
              <th className="p-2 text-right">Refund Amount (LKR)</th>
              <th className="p-2 text-right">Compensation (LKR)</th>
              <th className="p-2 text-center">Eligibility</th>
              <th className="p-2 text-center">Approval</th>
              <th className="p-2 text-center">Processing</th>
              <th className="p-2">Settlement Method</th>
              <th className="p-2">Gateway</th>
              <th className="p-2">Location / Region</th>
              <th className="p-2 text-center">Reconciliation Status</th>
              <th className="p-2">Date Requested</th>
              <th className="p-2 text-center">SLA</th>
              <th className="p-2 text-center w-10">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => {
              const isSelected = selectedRowId === row.id || selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow && onSelectRow(row)}
                  className={[
                    'hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 font-medium',
                    isSelected ? 'bg-red-50/40' : '',
                  ].join(' ')}
                >
                  <td className="p-2 text-center" onClick={(e) => toggleSelectOne(row.id, e)}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => {}}
                      className="rounded border-gray-300 text-[#8f002b] focus:ring-[#8f002b]"
                    />
                  </td>
                  <td className="p-2 font-mono font-bold text-[#8f002b]">{row.id}</td>
                  <td className="p-2 font-mono text-gray-600">{row.orderId}</td>
                  <td className="p-2 font-semibold text-gray-900">{row.customerName}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.customerId}</td>
                  <td className="p-2 font-mono text-[10px] text-gray-600">{row.reasonCode}</td>
                  <td className="p-2 text-gray-700">{row.paymentMethod}</td>
                  <td className="p-2 text-gray-600 max-w-[140px] truncate" title={row.productSeller}>
                    {row.productSeller}
                  </td>
                  <td className="p-2 font-semibold text-gray-800">{row.refundType}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">
                    {row.refundAmount > 0 ? row.refundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                  </td>
                  <td className="p-2 text-right font-mono font-semibold text-purple-700">
                    {row.compensationAmount > 0 ? row.compensationAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                  </td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getEligibilityBadge(row.eligibility)}`}>
                      {row.eligibility}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getApprovalBadge(row.approval)}`}>
                      {row.approval}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getProcessingBadge(row.processing)}`}>
                      {row.processing}
                    </span>
                  </td>
                  <td className="p-2 text-gray-700">{row.settlementMethod}</td>
                  <td className="p-2 text-gray-600 font-medium">{row.gateway}</td>
                  <td className="p-2 text-gray-600">{row.locationRegion}</td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getReconBadge(row.reconciliationStatus)}`}>
                      {row.reconciliationStatus}
                    </span>
                  </td>
                  <td className="p-2 font-mono text-[10px] text-gray-500">{row.dateRequested}</td>
                  <td className={`p-2 text-center text-[10px] ${getSlaBadge(row.sla)}`}>{row.sla}</td>
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toast(`Options for ${row.id}`)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 gap-2">
        <div className="flex items-center gap-1 font-medium">
          <span>Showing 1 to 10 of 1,245 records</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-white text-gray-600 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={14} />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={[
                'px-2.5 py-1 text-xs font-semibold rounded border transition-colors',
                currentPage === page
                  ? 'bg-[#8f002b] text-white border-[#8f002b]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
              ].join(' ')}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-gray-400">...</span>
          <button
            onClick={() => setCurrentPage(125)}
            className="px-2.5 py-1 text-xs font-semibold rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            125
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1 border border-gray-300 rounded hover:bg-white text-gray-600"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-500 font-medium">Rows per page:</span>
          <select className="border border-gray-300 rounded px-1.5 py-0.5 bg-white text-xs text-gray-800 font-semibold">
            <option>10 / page</option>
            <option>25 / page</option>
            <option>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
