'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { CommissionPortfolioRow } from '@/types/finance';

interface Props {
  rows: CommissionPortfolioRow[];
  selectedRowId?: string;
  onSelectRow?: (row: CommissionPortfolioRow) => void;
}

export function CommissionPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
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

  const getCalculationBadge = (st: string) => {
    switch (st) {
      case 'Calculated':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Adjusted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Reversed':
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
            Marketplace Commissions Portfolio
          </h2>
          <span className="text-[10px] bg-rose-100 text-[#8f002b] font-bold px-2 py-0.5 rounded-full">
            12,800 records
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <span>Columns ▼</span>
          <span>Export ▼</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[10px]">
          <thead>
            <tr className="bg-gray-100/70 border-b border-gray-200 font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
              <th className="p-2 text-center w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.size === rows.length && rows.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-[#8f002b] focus:ring-[#8f002b]"
                />
              </th>
              <th className="p-2">Commission Reference</th>
              <th className="p-2">Record Type</th>
              <th className="p-2">Related Order</th>
              <th className="p-2">Supplier / Seller</th>
              <th className="p-2">Supplier / Seller ID</th>
              <th className="p-2">Category</th>
              <th className="p-2">Brand</th>
              <th className="p-2">BU</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Currency</th>
              <th className="p-2 text-right">Gross Sale</th>
              <th className="p-2 text-right">Commission Base</th>
              <th className="p-2">Commission Rule</th>
              <th className="p-2 text-right">Rule %</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Commission Amount</th>
              <th className="p-2 text-right">Platform Fee</th>
              <th className="p-2 text-right">Processing Fee</th>
              <th className="p-2 text-right">Fulfilment Fee</th>
              <th className="p-2 text-right">Logistics Fee</th>
              <th className="p-2 text-right">Promo Cont.</th>
              <th className="p-2 text-right">Penalty</th>
              <th className="p-2 text-right">Waiver / Exemption</th>
              <th className="p-2 text-right">Approved Amount</th>
              <th className="p-2 text-right">Tax</th>
              <th className="p-2 text-right">Reversal</th>
              <th className="p-2 text-right">Compensation</th>
              <th className="p-2 text-center">Calc. Status</th>
              <th className="p-2 text-center">Approval Status</th>
              <th className="p-2 text-center">Settlement Status</th>
              <th className="p-2 text-center">Recon Status</th>
              <th className="p-2 text-center">Dispute Status</th>
              <th className="p-2">SLA</th>
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
                  <td className="p-2 font-mono font-bold text-[#8f002b]">
                    <div className="flex items-center gap-1">
                      <span>{row.id}</span>
                      <ExternalLink size={10} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="p-2 font-semibold text-gray-700">{row.recordType}</td>
                  <td className="p-2 font-mono text-blue-600 font-bold">{row.orderId}</td>
                  <td className="p-2 font-semibold text-gray-900">{row.partyName}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.partyId}</td>
                  <td className="p-2 text-gray-700">{row.category}</td>
                  <td className="p-2 text-gray-700">{row.brand}</td>
                  <td className="p-2 text-gray-700">{row.businessUnit}</td>
                  <td className="p-2 text-gray-700">{row.channel}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.currency}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">
                    {row.grossSale.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-800">
                    {row.commissionBase.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 font-mono text-xs text-purple-700 font-bold">{row.commissionRule}</td>
                  <td className="p-2 text-right font-mono text-gray-700">{row.rulePct.toFixed(2)}%</td>
                  <td className="p-2 text-right font-mono text-gray-700">{row.ratePct.toFixed(2)}%</td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-700">
                    {row.commissionAmount.toFixed(2)}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.platformFee.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.processingFee.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.fulfilmentFee.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.logisticsFee.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.promoContribution.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.penalty.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.waiverExemption.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">{row.approvedAmount.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.tax.toFixed(2)}</td>
                  <td className="p-2 text-right font-mono text-red-600 font-bold">
                    {row.reversal !== 0 ? row.reversal.toFixed(2) : '0.00'}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.compensation.toFixed(2)}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getCalculationBadge(row.calculationStatus)}`}>
                      {row.calculationStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getApprovalBadge(row.approvalStatus)}`}>
                      {row.approvalStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {row.settlementStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.reconciliationStatus}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.disputeStatus}</td>
                  <td className="p-2 font-mono font-bold text-emerald-700">{row.sla}</td>
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toast(`Options for ${row.id}`)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500"
                    >
                      <MoreHorizontal size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 bg-gray-50/50 text-xs font-medium text-gray-600">
        <div>Showing 1 to 5 of 12,800 records</div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3, 4, 5, '...', 1280].map((p, idx) => (
            <button
              key={idx}
              onClick={() => typeof p === 'number' && setCurrentPage(p)}
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                currentPage === p ? 'bg-[#8f002b] text-white' : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1 border border-gray-300 rounded hover:bg-white"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>10 / page</span>
        </div>
      </div>
    </div>
  );
}
