'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { FinancePortfolioRow } from '@/types/finance';
import { MOCK_PORTFOLIO_ROWS } from '@/data/mockFinanceData';

interface Props {
  selectedRef?: string;
  onSelectRecord?: (record: FinancePortfolioRow) => void;
}

export function FinanceOperationsTable({ selectedRef, onSelectRecord }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const rows = MOCK_PORTFOLIO_ROWS;

  const renderBadge = (text: string, type: 'payment' | 'recv' | 'settle' | 'recon' | 'exception' | 'approval') => {
    if (!text || text === '—') return <span className="text-gray-400 font-medium">—</span>;

    let colorClasses = 'bg-gray-100 text-gray-700';

    if (['Paid', 'Captured', 'Settled', 'Reconciled', 'Approved'].includes(text)) {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (['Receivable', 'Payable', 'Scheduled', 'In Review'].includes(text)) {
      colorClasses = 'bg-[#fcf2f5] text-[#8f002b] border-rose-200';
    } else if (['Pending', 'Unpaid'].includes(text)) {
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
    } else if (['Not Reconciled', 'Refund Hold', 'Exception', 'Rejected', 'On Hold'].includes(text)) {
      colorClasses = 'bg-red-50 text-red-700 border-red-200 font-bold';
    }

    return (
      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold border ${colorClasses} leading-tight`}>
        {text}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Row */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50/50 text-xs">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-gray-900">Finance Operations Portfolio</h3>
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded">
            1-10 of 1,248
          </span>
        </div>
        <div className="text-[11px] text-gray-500 font-medium">
          Click any row to view record preview details below
        </div>
      </div>

      {/* Horizontal Scrollable Table Wrapper */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[11px] border-collapse whitespace-nowrap min-w-[2100px]">
          <thead>
            <tr className="bg-gray-100/80 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200 text-[10px]">
              <th className="p-2 sticky left-0 bg-gray-100 z-10 shadow-[1px_0_0_0_#e5e7eb]">Financial Ref</th>
              <th className="p-2">Domain</th>
              <th className="p-2">Type</th>
              <th className="p-2">Related Order</th>
              <th className="p-2">Customer / Supplier / Seller</th>
              <th className="p-2">BU</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Currency</th>
              <th className="p-2 text-right">Gross Amount</th>
              <th className="p-2 text-right">Tax</th>
              <th className="p-2 text-right">Fees</th>
              <th className="p-2 text-right">Commission</th>
              <th className="p-2 text-right">Refund</th>
              <th className="p-2 text-right font-black">Net Amount</th>
              <th className="p-2">Payment Status</th>
              <th className="p-2">Recv/Pay Status</th>
              <th className="p-2">Settlement Status</th>
              <th className="p-2">Reconciliation Status</th>
              <th className="p-2">Exception Status</th>
              <th className="p-2">Approval Status</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Txn Date</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Updated At</th>
              <th className="p-2 text-center">SLA</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
            {rows.map((row) => {
              const isSelected = selectedRef === row.ref;
              return (
                <tr
                  key={row.ref}
                  onClick={() => onSelectRecord && onSelectRecord(row)}
                  className={`cursor-pointer transition-colors hover:bg-rose-50/40 ${
                    isSelected ? 'bg-rose-50/90 font-semibold text-gray-900 border-l-4 border-l-[#8f002b]' : ''
                  }`}
                >
                  <td className="p-2 font-bold text-[#8f002b] sticky left-0 bg-white group-hover:bg-rose-50/40 z-10 shadow-[1px_0_0_0_#e5e7eb]">
                    {row.ref}
                  </td>
                  <td className="p-2 font-bold text-gray-900">{row.domain}</td>
                  <td className="p-2 text-gray-600">{row.type}</td>
                  <td className="p-2 font-medium text-gray-800 hover:underline">{row.relatedOrder}</td>
                  <td className="p-2 font-bold text-gray-900">{row.party}</td>
                  <td className="p-2 text-gray-600">{row.bu}</td>
                  <td className="p-2 text-gray-600">{row.channel}</td>
                  <td className="p-2 font-semibold text-gray-700">{row.currency}</td>
                  <td className="p-2 text-right font-medium text-gray-800">
                    {row.grossAmount ? row.grossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                  </td>
                  <td className="p-2 text-right text-gray-600">
                    {row.tax ? row.tax.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                  </td>
                  <td className="p-2 text-right text-gray-600">
                    {row.fees ? row.fees.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                  </td>
                  <td className="p-2 text-right text-gray-600">
                    {row.commission ? row.commission.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                  </td>
                  <td className="p-2 text-right font-bold text-red-600">
                    {row.refund ? row.refund.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                  </td>
                  <td className="p-2 text-right font-black text-gray-900">
                    {row.netAmount ? row.netAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
                  </td>
                  <td className="p-2">{renderBadge(row.paymentStatus, 'payment')}</td>
                  <td className="p-2">{renderBadge(row.recvPayStatus, 'recv')}</td>
                  <td className="p-2">{renderBadge(row.settlementStatus, 'settle')}</td>
                  <td className="p-2">{renderBadge(row.reconciliationStatus, 'recon')}</td>
                  <td className="p-2">{renderBadge(row.exceptionStatus, 'exception')}</td>
                  <td className="p-2">{renderBadge(row.approvalStatus, 'approval')}</td>
                  <td className="p-2 text-gray-700">{row.owner}</td>
                  <td className="p-2 text-gray-600">{row.txnDate}</td>
                  <td className="p-2 text-gray-600">{row.dueDate}</td>
                  <td className="p-2 text-gray-500">{row.updatedAt}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`font-bold ${
                        row.sla >= 90 ? 'text-emerald-700' : row.sla >= 80 ? 'text-amber-700' : 'text-red-700'
                      }`}
                    >
                      {row.sla}%
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast(`Inspecting record ${row.ref}`);
                        }}
                        className="p-1 text-gray-400 hover:text-[#8f002b] rounded hover:bg-gray-100"
                        title="View detail"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast(`Actions menu for ${row.ref}`);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100"
                        title="More options"
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
      <div className="px-3 py-2 border-t border-gray-200 bg-gray-50/60 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1 font-semibold">
          <span>Page {currentPage} of 125</span>
        </div>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-6 h-6 rounded border text-xs font-bold ${
                currentPage === page
                  ? 'bg-[#8f002b] text-white border-[#8f002b]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-gray-400 font-bold">...</span>
          <button
            onClick={() => setCurrentPage(125)}
            className="px-2 h-6 rounded border border-gray-300 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50"
          >
            125
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(125, p + 1))}
            disabled={currentPage === 125}
            className="p-1 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Page size */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium">Rows per page:</span>
          <select className="bg-white border border-gray-300 rounded px-1.5 py-0.5 text-xs font-bold text-gray-800 focus:outline-none">
            <option value="10">10 / page</option>
            <option value="25">25 / page</option>
            <option value="50">50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
