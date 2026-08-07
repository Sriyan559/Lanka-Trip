'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { ConfigurationPortfolioRow } from '@/types/finance';

interface Props {
  rows: ConfigurationPortfolioRow[];
  selectedRowId?: string;
  onSelectRow?: (row: ConfigurationPortfolioRow) => void;
}

export function ConfigurationPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
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

  const getDomainBadge = (dom: string) => {
    switch (dom) {
      case 'Tax':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Withholding':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'FX':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Accounting Period':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Rounding':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityBadge = (pri: string) => {
    switch (pri) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
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
            Tax, Currency &amp; Financial Configuration Portfolio
          </h2>
          <span className="text-[10px] bg-rose-100 text-[#8f002b] font-bold px-2 py-0.5 rounded-full">
            642 records
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
              <th className="p-2">Configuration Ref</th>
              <th className="p-2">Domain</th>
              <th className="p-2">Type</th>
              <th className="p-2">Name</th>
              <th className="p-2">Jurisdiction / Currency</th>
              <th className="p-2">Scope</th>
              <th className="p-2">BU</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Region</th>
              <th className="p-2">Country</th>
              <th className="p-2">Party Type</th>
              <th className="p-2">Product / Service Scope</th>
              <th className="p-2 text-right">Rate / %</th>
              <th className="p-2">Calculation Method</th>
              <th className="p-2 text-center">Priority</th>
              <th className="p-2">Effective From</th>
              <th className="p-2">Effective To</th>
              <th className="p-2">Version</th>
              <th className="p-2">Source</th>
              <th className="p-2 text-center">Approval Status</th>
              <th className="p-2 text-center">Activation Status</th>
              <th className="p-2 text-center">Conflict Status</th>
              <th className="p-2 text-center">Dependency Health</th>
              <th className="p-2 text-center">Exception Status</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Reviewer</th>
              <th className="p-2">Approver</th>
              <th className="p-2">Updated At</th>
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
                  <td className="p-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getDomainBadge(row.domain)}`}>
                      {row.domain}
                    </span>
                  </td>
                  <td className="p-2 font-semibold text-gray-700">{row.type}</td>
                  <td className="p-2 font-bold text-gray-900">{row.name}</td>
                  <td className="p-2 font-mono text-gray-700 text-[10px]">{row.jurisdictionOrCurrency}</td>
                  <td className="p-2 text-gray-700">{row.scope}</td>
                  <td className="p-2 text-gray-700">{row.businessUnit}</td>
                  <td className="p-2 text-gray-700">{row.channel}</td>
                  <td className="p-2 text-gray-700">{row.region}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.country}</td>
                  <td className="p-2 text-gray-700">{row.partyType}</td>
                  <td className="p-2 text-gray-700">{row.productScope}</td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-700">{row.rateOrPct}</td>
                  <td className="p-2 text-gray-700">{row.calculationMethod}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getPriorityBadge(row.priority)}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="p-2 text-gray-700">{row.effectiveFrom}</td>
                  <td className="p-2 text-gray-700">{row.effectiveTo}</td>
                  <td className="p-2 font-mono text-gray-600 text-[10px]">{row.version}</td>
                  <td className="p-2 text-gray-700">{row.source}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.approvalStatus}</td>
                  <td className="p-2 text-center">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {row.activationStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.conflictStatus}</td>
                  <td className="p-2 text-center font-semibold text-emerald-700">{row.dependencyHealth}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.exceptionStatus}</td>
                  <td className="p-2 text-gray-700">{row.owner}</td>
                  <td className="p-2 text-gray-700">{row.reviewer}</td>
                  <td className="p-2 text-gray-700">{row.approver}</td>
                  <td className="p-2 text-gray-700 text-[10px]">{row.updatedAt}</td>
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
        <div>Showing 1 to 6 of 642 records</div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3, 4, 5, '...', 65].map((p, idx) => (
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
