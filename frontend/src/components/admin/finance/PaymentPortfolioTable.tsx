'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  ArrowUpDown,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PaymentPortfolioRow } from '@/types/finance';
import { paymentsView, usePaymentsManagement } from '@/contexts/FinanceRevenuePaymentsContext';

function StatusBadge({ status, type }: { status: string; type?: 'auth' | 'cap' | 'resp' | 'risk' | 'dup' | 'hold' | 'settle' | 'recon' | 'sla' }) {
  let color = 'bg-gray-100 text-gray-700';

  if (['Authorized', 'Captured', 'Success', 'Approved (100)', 'Low', 'No', 'Settled', 'Reconciled', 'On Track'].includes(status)) {
    color = 'bg-emerald-100 text-emerald-800 font-bold';
  } else if (['Pending', 'Pending / Capture', 'Medium', 'Partially Captured', 'Candidate', 'Active', 'At Risk'].includes(status)) {
    color = 'bg-amber-100 text-amber-800 font-bold';
  } else if (['Failed', 'Declined', 'High', 'Yes', 'Breached', 'Unreconciled', 'Unsettled'].includes(status)) {
    color = 'bg-red-100 text-red-700 font-bold';
  }

  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap ${color}`}>
      {status}
    </span>
  );
}

interface Props {
  selectedId?: string;
  onSelectRow: (row: PaymentPortfolioRow) => void;
}

export function PaymentPortfolioTable({ selectedId, onSelectRow }: Props) {
  const { data } = usePaymentsManagement();
  const portfolio = paymentsView(data).rows;
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<keyof PaymentPortfolioRow>('id');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: keyof PaymentPortfolioRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const navigateToDetail = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toast.loading(`Opening Payment Detail (${id})...`, { id: 'nav-fn04' });
    setTimeout(() => {
      toast.dismiss('nav-fn04');
      router.push(`/admin/finance/payments/${id}`);
    }, 400);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
      {/* Table Title Bar */}
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-900">Payments &amp; Transaction Portfolio</h2>
          <span className="text-[10px] text-gray-500 font-medium">Showing {portfolio.length} of {data?.meta.total ?? portfolio.length} records</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.success('Exporting visible page...')}
            className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-[11px] font-semibold rounded shadow-sm flex items-center gap-1"
          >
            <ExternalLink size={11} />
            <span>Export Page</span>
          </button>
        </div>
      </div>

      {/* Scrollable Data Table Container */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse text-[11px]" style={{ minWidth: '1700px' }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
              <th className="py-2 px-2 w-8 text-center">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="py-2 px-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">
                  <span>Transaction ID</span>
                  <ArrowUpDown size={10} />
                </div>
              </th>
              <th className="py-2 px-2">Payment Reference</th>
              <th className="py-2 px-2">Related Order</th>
              <th className="py-2 px-2">Invoice Reference</th>
              <th className="py-2 px-2">Customer</th>
              <th className="py-2 px-2 text-center">Currency</th>
              <th className="py-2 px-2 text-right cursor-pointer hover:bg-gray-100" onClick={() => handleSort('grossAmount')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Gross Amount</span>
                  <ArrowUpDown size={10} />
                </div>
              </th>
              <th className="py-2 px-2">Payment Method</th>
              <th className="py-2 px-2">Gateway</th>
              <th className="py-2 px-2">Auth Status</th>
              <th className="py-2 px-2">Capture Status</th>
              <th className="py-2 px-2">Payment Response</th>
              <th className="py-2 px-2">Risk Level</th>
              <th className="py-2 px-2">Duplicate Status</th>
              <th className="py-2 px-2">Hold</th>
              <th className="py-2 px-2">Settlement Status</th>
              <th className="py-2 px-2">Reconciliation Status</th>
              <th className="py-2 px-2">SLA</th>
              <th className="py-2 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {portfolio.map((row) => {
              const isSelected = row.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow(row)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#fdf2f5] border-l-4 border-l-[#8f002b]' : 'hover:bg-gray-50/80'
                  }`}
                >
                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="py-2 px-2 font-mono font-bold">
                    <button
                      onClick={(e) => navigateToDetail(row.id, e)}
                      className="text-[#8f002b] hover:underline flex items-center gap-1 text-left"
                    >
                      <span>{row.id}</span>
                    </button>
                  </td>
                  <td className="py-2 px-2 font-mono text-gray-600">{row.ref}</td>
                  <td className="py-2 px-2 font-mono text-gray-600">{row.relatedOrder}</td>
                  <td className="py-2 px-2 font-mono text-gray-600">{row.invoiceRef}</td>
                  <td className="py-2 px-2 font-bold text-gray-900 truncate max-w-[130px]" title={row.customer}>
                    {row.customer}
                  </td>
                  <td className="py-2 px-2 text-center text-gray-500 font-mono">{row.currency}</td>
                  <td className="py-2 px-2 text-right font-mono font-bold text-gray-900">
                    {row.grossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 px-2 text-gray-700">{row.paymentMethod}</td>
                  <td className="py-2 px-2 text-gray-700">{row.gateway}</td>
                  <td className="py-2 px-2"><StatusBadge status={row.authStatus} type="auth" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.captureStatus} type="cap" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.paymentResponse} type="resp" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.riskLevel} type="risk" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.duplicateStatus} type="dup" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.hold} type="hold" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.settlementStatus} type="settle" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.reconciliationStatus} type="recon" /></td>
                  <td className="py-2 px-2"><StatusBadge status={row.sla} type="sla" /></td>
                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onSelectRow(row)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Quick Preview"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={(e) => navigateToDetail(row.id, e)}
                        className="p-1 hover:bg-gray-200 rounded text-[#8f002b]"
                        title="Open FN04 Detail Page"
                      >
                        <ExternalLink size={12} />
                      </button>
                      <button
                        onClick={() => toast('Payment options menu opened')}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="More Actions"
                      >
                        <MoreHorizontal size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 text-gray-600">
          <span>Rows per page:</span>
          <select className="border border-gray-300 rounded px-1 py-0.5 text-xs bg-white">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-gray-400">|</span>
          <span className="font-medium text-gray-700">1 - 10 of 8,542</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-1 border rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={13} />
          </button>
          <button className="px-2 py-0.5 rounded text-xs font-bold bg-[#8f002b] text-white">1</button>
          <button className="px-2 py-0.5 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100">2</button>
          <button className="px-2 py-0.5 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100">3</button>
          <button className="px-2 py-0.5 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100">4</button>
          <button className="px-2 py-0.5 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100">5</button>
          <span className="text-gray-400">...</span>
          <button className="px-2 py-0.5 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100">855</button>
          <button
            onClick={() => setPage(page + 1)}
            className="p-1 border rounded bg-white text-gray-600 hover:bg-gray-100"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
