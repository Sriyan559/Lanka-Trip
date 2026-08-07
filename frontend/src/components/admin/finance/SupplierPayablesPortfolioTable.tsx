'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { SupplierPayableRow } from '@/types/finance';

interface Props {
  rows: SupplierPayableRow[];
  selectedRowId?: string;
  onSelectRow?: (row: SupplierPayableRow) => void;
}

export function SupplierPayablesPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
  const router = useRouter();
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
  const getMatchBadge = (st: string) => {
    switch (st) {
      case 'Fully Matched':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Partial Match':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Unmatched':
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

  const getDueBadge = (st: string) => {
    switch (st) {
      case 'Current':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Due Soon':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue':
      case 'Past Due':
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Table Header Strip */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Supplier Payables Portfolio
          </h2>
          <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            5,842 records
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
        <table className="w-full text-left text-[11px] border-collapse min-w-[2100px]">
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
              <th className="p-2">Payable Ref</th>
              <th className="p-2">Payable Type</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Supplier ID</th>
              <th className="p-2 text-center">Tier</th>
              <th className="p-2">Invoice Ref</th>
              <th className="p-2">PO</th>
              <th className="p-2">GR</th>
              <th className="p-2">BU</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Curr.</th>
              <th className="p-2 text-right">Gross</th>
              <th className="p-2 text-right">Discounts</th>
              <th className="p-2 text-right">Credits</th>
              <th className="p-2 text-right">Returns/Deductions</th>
              <th className="p-2 text-right">Commission Offset</th>
              <th className="p-2 text-right">Mkt. Fees</th>
              <th className="p-2 text-right">Tax</th>
              <th className="p-2 text-right">Withholding</th>
              <th className="p-2 text-right">Net Payable</th>
              <th className="p-2 text-right">Paid Amount</th>
              <th className="p-2 text-right">Outstanding</th>
              <th className="p-2 text-center">Match Status</th>
              <th className="p-2 text-center">Approval Status</th>
              <th className="p-2 text-center">Due Status</th>
              <th className="p-2">Due Date</th>
              <th className="p-2 text-center">Payment Schedule</th>
              <th className="p-2 text-center">Payout Status</th>
              <th className="p-2 text-center">Hold</th>
              <th className="p-2 text-center">Dispute</th>
              <th className="p-2 text-center">Recon Status</th>
              <th className="p-2 text-center">Exception</th>
              <th className="p-2">Owner</th>
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
                  <td className="p-2 font-mono font-bold">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/finance/supplier-payables/${row.id}`);
                      }}
                      className="text-[#8f002b] hover:underline flex items-center gap-0.5"
                    >
                      <span>{row.id}</span>
                      <ExternalLink size={10} />
                    </button>
                  </td>
                  <td className="p-2 font-semibold text-gray-800">{row.payableType}</td>
                  <td className="p-2 font-semibold text-gray-900">{row.supplierName}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.supplierId}</td>
                  <td className="p-2 text-center font-bold text-[10px] text-amber-700">{row.supplierTier}</td>
                  <td className="p-2 font-mono text-gray-600">{row.invoiceRef}</td>
                  <td className="p-2 font-mono text-gray-600">{row.poRef}</td>
                  <td className="p-2 font-mono text-gray-600">{row.grRef}</td>
                  <td className="p-2 text-gray-700">{row.businessUnit}</td>
                  <td className="p-2 text-gray-700">{row.channel}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.currency}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">
                    {row.grossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-500">
                    {row.discounts > 0 ? `(${row.discounts.toLocaleString('en-US')})` : '—'}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-500">
                    {row.credits > 0 ? `(${row.credits.toLocaleString('en-US')})` : '—'}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-500">
                    {row.returnsDeduction > 0 ? `(${row.returnsDeduction.toLocaleString('en-US')})` : '—'}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-500">
                    {row.commissionOffset > 0 ? `(${row.commissionOffset.toLocaleString('en-US')})` : '—'}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-500">
                    {row.marketplaceFees > 0 ? `(${row.marketplaceFees.toLocaleString('en-US')})` : '—'}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-600">
                    {row.taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-600">
                    {row.withholdingTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono font-extrabold text-[#8f002b]">
                    {row.netPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-700">
                    {row.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono font-bold text-amber-700">
                    {row.outstandingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getMatchBadge(row.matchStatus)}`}>
                      {row.matchStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getApprovalBadge(row.approvalStatus)}`}>
                      {row.approvalStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getDueBadge(row.dueStatus)}`}>
                      {row.dueStatus}
                    </span>
                  </td>
                  <td className="p-2 font-mono text-[10px] text-gray-500">{row.dueDate}</td>
                  <td className="p-2 text-center font-semibold text-blue-700">{row.paymentSchedule}</td>
                  <td className="p-2 text-center font-semibold text-emerald-700">{row.payoutStatus}</td>
                  <td className="p-2 text-center text-[10px] font-semibold">{row.hold}</td>
                  <td className="p-2 text-center text-[10px] font-semibold">{row.dispute}</td>
                  <td className="p-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getReconBadge(row.reconciliationStatus)}`}>
                      {row.reconciliationStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center text-[10px] font-semibold text-red-600">{row.exceptionReason || '—'}</td>
                  <td className="p-2 text-gray-600 font-medium">{row.owner}</td>
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => router.push(`/admin/finance/supplier-payables/${row.id}`)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-900 transition-colors"
                      title="Open Detail View (FN07)"
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
          <span>Showing 1 to 10 of 5,842 records</span>
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
