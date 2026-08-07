'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { ReconciliationRecordRow } from '@/types/finance';

interface Props {
  rows: ReconciliationRecordRow[];
  selectedRowId?: string;
  onSelectRow?: (row: ReconciliationRecordRow) => void;
}

export function ReconciliationControlsPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
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

  const getMatchBadge = (st: string) => {
    switch (st) {
      case 'Matched':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Partially Matched':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Unmatched':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
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
            Reconciliation &amp; Financial Controls Portfolio
          </h2>
          <span className="text-[10px] bg-rose-100 text-[#8f002b] font-bold px-2 py-0.5 rounded-full">
            Showing 1 to 5 of 5,632 records
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
              <th className="p-2">Reconciliation Ref</th>
              <th className="p-2">Domain</th>
              <th className="p-2">Type</th>
              <th className="p-2">Internal Record</th>
              <th className="p-2">External Record</th>
              <th className="p-2">Source System</th>
              <th className="p-2">Target System</th>
              <th className="p-2">BU</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Currency</th>
              <th className="p-2 text-right">Expected Amount</th>
              <th className="p-2 text-right">Actual Amount</th>
              <th className="p-2 text-right">Variance Amount</th>
              <th className="p-2 text-right">Variance %</th>
              <th className="p-2">Variance Type</th>
              <th className="p-2 text-center">Match Status</th>
              <th className="p-2 text-center">Reconciliation Status</th>
              <th className="p-2 text-center">Exception Status</th>
              <th className="p-2 text-center">Control Status</th>
              <th className="p-2 text-center">Hold Status</th>
              <th className="p-2 text-center">Certification Status</th>
              <th className="p-2 text-center">Severity</th>
              <th className="p-2 text-right">Financial Exposure</th>
              <th className="p-2">Owner</th>
              <th className="p-2 text-center w-10">Action</th>
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
                  <td className="p-2 text-gray-800 font-semibold">{row.domain}</td>
                  <td className="p-2 text-gray-700">{row.type}</td>
                  <td className="p-2 font-mono text-gray-600 text-[10px]">{row.internalRecord}</td>
                  <td className="p-2 font-mono text-gray-600 text-[10px]">{row.externalRecord}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.sourceSystem}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.targetSystem}</td>
                  <td className="p-2 text-gray-700">{row.businessUnit}</td>
                  <td className="p-2 text-gray-700">{row.channel}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.currency}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">
                    {row.expectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-800">
                    {row.actualAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`p-2 text-right font-mono font-bold ${row.varianceAmount !== 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {row.varianceAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`p-2 text-right font-mono font-bold ${row.variancePct !== 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {row.variancePct.toFixed(2)}%
                  </td>
                  <td className="p-2 text-gray-700">{row.varianceType}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getMatchBadge(row.matchStatus)}`}>
                      {row.matchStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.reconciliationStatus}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                      row.exceptionStatus === '—' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {row.exceptionStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-emerald-700">{row.controlStatus}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.holdStatus}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.certificationStatus}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getSeverityBadge(row.severity)}`}>
                      {row.severity}
                    </span>
                  </td>
                  <td className="p-2 text-right font-mono text-gray-800">{row.financialExposure.toFixed(2)}</td>
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
        <div>Showing 1 to 5 of 5,632 records</div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3, 4, 5, '...', 363].map((p, idx) => (
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
          <span>15 / page</span>
        </div>
      </div>
    </div>
  );
}
