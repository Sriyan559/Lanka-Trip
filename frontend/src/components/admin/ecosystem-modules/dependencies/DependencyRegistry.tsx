'use client';

import React, { useState } from 'react';
import { Save, RefreshCw, Download } from 'lucide-react';
import { CriticalityBadge, DependencyStatusBadge, CompatibilityPercentageBadge } from './DependencyBadges';

export interface DependencyRegistryRow {
  id: string;
  fromModule: string;
  fromType: string;
  toModuleService: string;
  toType: string;
  criticality: 'High' | 'Medium' | 'Low';
  status: 'Required' | 'Compatible' | 'Warning' | 'Blocked';
  compatibility: string | number;
  version: string;
  lastValidated: string;
}

interface DependencyRegistryProps {
  data: DependencyRegistryRow[];
  onApplyFilters?: () => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onRowClick?: (row: DependencyRegistryRow) => void;
  selectedRowId?: string;
}

export function DependencyRegistry({
  data,
  onApplyFilters,
  onClearAll,
  onSaveView,
  onRefresh,
  onExport,
  onRowClick,
  selectedRowId,
}: DependencyRegistryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 mb-3">Dependency Registry</h4>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onApplyFilters}
              className="px-2.5 py-1 bg-red-900 hover:bg-red-950 text-white font-semibold rounded text-[10px] cursor-pointer"
            >
              Apply Filters
            </button>
            <button
              onClick={onClearAll}
              className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded text-[10px] hover:bg-slate-50 cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSaveView}
              className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"
              title="Save View"
            >
              <Save size={10} /> Save View
            </button>
            <button
              onClick={onRefresh}
              className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"
              title="Refresh"
            >
              <RefreshCw size={10} /> Refresh
            </button>
            <button
              onClick={onExport}
              className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"
              title="Export"
            >
              <Download size={10} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-[11px]">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-3 py-2 text-left font-bold text-slate-700">From Module</th>
              <th className="px-3 py-2 text-center font-bold text-slate-700 text-[10px]">From Type</th>
              <th className="px-3 py-2 text-left font-bold text-slate-700">To Module / Service</th>
              <th className="px-3 py-2 text-center font-bold text-slate-700 text-[10px]">To Type</th>
              <th className="px-3 py-2 text-center font-bold text-slate-700">Criticality</th>
              <th className="px-3 py-2 text-center font-bold text-slate-700">Status</th>
              <th className="px-3 py-2 text-center font-bold text-slate-700">Compatibility</th>
              <th className="px-3 py-2 text-center font-bold text-slate-700">Version</th>
              <th className="px-3 py-2 text-right font-bold text-slate-700">Last Validated</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                  selectedRowId === row.id ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-3 py-2 font-semibold text-slate-800">{row.fromModule}</td>
                <td className="px-3 py-2 text-center text-slate-500 font-medium text-[10px]">{row.fromType}</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{row.toModuleService}</td>
                <td className="px-3 py-2 text-center text-slate-500 font-medium text-[10px]">{row.toType}</td>
                <td className="px-3 py-2 text-center">
                  <CriticalityBadge criticality={row.criticality} />
                </td>
                <td className="px-3 py-2 text-center">
                  <DependencyStatusBadge status={row.status} />
                </td>
                <td className="px-3 py-2 text-center">
                  <CompatibilityPercentageBadge compatibility={row.compatibility} />
                </td>
                <td className="px-3 py-2 text-center font-mono text-slate-600 text-[10px]">{row.version}</td>
                <td className="px-3 py-2 text-right text-slate-400 text-[10px]">{row.lastValidated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">{data.length} total dependencies</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50 cursor-pointer font-semibold"
          >
            ‹
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => currentPage + i - 2).map((page) => {
            if (page < 1 || page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 rounded font-semibold ${
                  currentPage === page
                    ? 'bg-red-900 text-white'
                    : 'border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          {totalPages > 5 && <span className="text-slate-400">…</span>}
          {totalPages > 5 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 font-semibold cursor-pointer"
            >
              {totalPages}
            </button>
          )}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50 cursor-pointer font-semibold"
          >
            ›
          </button>
          <span className="ml-2 text-slate-500 font-medium">{itemsPerPage} / page</span>
        </div>
      </div>
    </div>
  );
}
