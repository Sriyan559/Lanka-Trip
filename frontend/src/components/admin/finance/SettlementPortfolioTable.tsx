'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { SettlementPortfolioRow } from '@/types/finance';

interface Props {
  rows: SettlementPortfolioRow[];
  selectedRowId?: string;
  onSelectRow?: (row: SettlementPortfolioRow) => void;
}

export function SettlementPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
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

  const getPayoutBadge = (st: string) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'On Hold':
        return 'bg-amber-50 text-amber-700 border-amber-200';
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

  const getSlaBadge = (st: string) => {
    switch (st) {
      case 'On Track':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'At Risk':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Breached':
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
            Settlements &amp; Payouts Portfolio
          </h2>
          <span className="text-[10px] bg-rose-100 text-[#8f002b] font-bold px-2 py-0.5 rounded-full">
            2,020 records
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
              <th className="p-2">Settlement Reference</th>
              <th className="p-2">Settlement Type</th>
              <th className="p-2">Settlement Batch</th>
              <th className="p-2">Beneficiary</th>
              <th className="p-2">Beneficiary Type</th>
              <th className="p-2 text-right">Gross Earnings (LKR)</th>
              <th className="p-2 text-right">Net Settlement (LKR)</th>
              <th className="p-2 text-right">Paid Amount (LKR)</th>
              <th className="p-2 text-right">Outstanding (LKR)</th>
              <th className="p-2">Currency</th>
              <th className="p-2 text-center">Approval Status</th>
              <th className="p-2 text-center">Payout Status</th>
              <th className="p-2 text-center">Hold Status</th>
              <th className="p-2 text-center">Reconciliation Status</th>
              <th className="p-2 text-center">SLA</th>
              <th className="p-2">Scheduled Date</th>
              <th className="p-2">Completion Date</th>
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
                        router.push(`/admin/finance/settlements-payouts/${row.id}`);
                      }}
                      className="text-[#8f002b] hover:underline flex items-center gap-0.5"
                    >
                      <span>{row.id}</span>
                      <ExternalLink size={10} />
                    </button>
                  </td>
                  <td className="p-2 font-semibold text-gray-700">{row.settlementType}</td>
                  <td className="p-2 font-mono text-gray-600 text-[10px]">{row.settlementBatch}</td>
                  <td className="p-2 font-semibold text-gray-900">{row.beneficiaryName}</td>
                  <td className="p-2 text-gray-700">{row.beneficiaryType}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">
                    {row.grossEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-700">
                    {row.netSettlement.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-800">
                    {row.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-600">
                    {row.outstandingAmount > 0 ? row.outstandingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                  </td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.currency}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getApprovalBadge(row.approvalStatus)}`}>
                      {row.approvalStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getPayoutBadge(row.payoutStatus)}`}>
                      {row.payoutStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.holdStatus}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.reconciliationStatus}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getSlaBadge(row.sla)}`}>
                      {row.sla}
                    </span>
                  </td>
                  <td className="p-2 text-gray-700">{row.scheduledDate}</td>
                  <td className="p-2 text-gray-700">{row.completionDate}</td>
                  <td className="p-2 text-gray-700">{row.owner}</td>
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
        <div>Showing 1 to 5 of 2,020 records</div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3, 4, 5, '...', 404].map((p, idx) => (
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
