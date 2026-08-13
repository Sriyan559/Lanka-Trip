"use client";

import React from "react";
import { CustomerSegment } from "@/types/customer-segments";
import { ChevronLeft, ChevronRight, Eye, Edit2, AlertCircle } from "lucide-react";

interface SegmentPortfolioTableProps {
  segments: CustomerSegment[];
  selectedSegmentId: string;
  onSelectSegment: (segment: CustomerSegment) => void;
  onActionClick: (action: string, segment: CustomerSegment) => void;
  selectedRowIds?: string[];
  onToggleSelectRow?: (id: string) => void;
  onToggleSelectAll?: () => void;
  totalCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function SegmentPortfolioTable({
  segments,
  selectedSegmentId,
  onSelectSegment,
  onActionClick,
  selectedRowIds = [],
  onToggleSelectRow,
  onToggleSelectAll,
  totalCount = 0,
  currentPage = 1,
  onPageChange,
}: SegmentPortfolioTableProps) {
  const isAllSelected = segments.length > 0 && selectedRowIds.length === segments.length;

  return (
    <div className="bg-white border border-line rounded-lg shadow-2xs mb-4 overflow-hidden">
      {/* Header Bar */}
      <div className="px-3.5 py-2.5 border-b border-line flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
            Customer Segment Portfolio
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            Showing {segments.length > 0 ? 1 : 0} to {segments.length} of {totalCount || segments.length} segments
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[10.5px] border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-slate-100/70 text-slate-700 font-bold border-b border-line text-[10px] font-mono uppercase tracking-wider">
              <th className="p-2 w-8 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300"
                />
              </th>
              <th className="p-2">Segment Name</th>
              <th className="p-2">Segment ID</th>
              <th className="p-2">Type</th>
              <th className="p-2">Membership</th>
              <th className="p-2">Scope</th>
              <th className="p-2 min-w-[160px]">Entry Rule Summary</th>
              <th className="p-2 min-w-[160px]">Exit Rule Summary</th>
              <th className="p-2 text-right">Customers</th>
              <th className="p-2 text-right">New</th>
              <th className="p-2 text-right">Removed</th>
              <th className="p-2 text-right">Avg LTV</th>
              <th className="p-2 text-right">Order Freq</th>
              <th className="p-2 text-right">Retention</th>
              <th className="p-2">Consent</th>
              <th className="p-2">Risk</th>
              <th className="p-2 text-center">Overlap</th>
              <th className="p-2">Conflict</th>
              <th className="p-2">Schedule</th>
              <th className="p-2">Last Recalculated</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Ver</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {segments.length === 0 ? (
              <tr>
                <td colSpan={24} className="py-12 text-center text-slate-400 font-mono text-[12px]">
                  No segment records found
                </td>
              </tr>
            ) : (
              segments.map((seg) => {
                const isSelectedRow = selectedSegmentId === seg.id;
                const isChecked = selectedRowIds.includes(seg.id);

                return (
                  <tr
                    key={seg.id}
                    onClick={() => onSelectSegment(seg)}
                    className={`cursor-pointer transition-colors ${
                      isSelectedRow
                        ? "bg-amber-50/80 font-medium"
                        : isChecked
                        ? "bg-slate-50 font-medium"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSelectRow?.(seg.id)}
                        className="rounded border-slate-300 text-[#671021] focus:ring-[#671021]"
                      />
                    </td>
                    <td className="p-2 font-bold text-ink hover:underline">{seg.name}</td>
                    <td className="p-2 font-mono text-slate-500">{seg.code || seg.id}</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-slate-100 text-slate-700">
                        {seg.type}
                      </span>
                    </td>
                    <td className="p-2 text-slate-600">{seg.membershipType}</td>
                    <td className="p-2 text-slate-600">{seg.customerScope}</td>
                    <td className="p-2 text-slate-600 truncate max-w-[180px]" title={seg.entryRuleSummary || ''}>
                      {seg.entryRuleSummary !== null ? seg.entryRuleSummary : "—"}
                    </td>
                    <td className="p-2 text-slate-600 truncate max-w-[180px]" title={seg.exitRuleSummary || ''}>
                      {seg.exitRuleSummary !== null ? seg.exitRuleSummary : "—"}
                    </td>
                    <td className="p-2 text-right font-mono font-bold">{seg.customerCount.toLocaleString()}</td>
                    <td className="p-2 text-right font-mono text-emerald-700">+{seg.newMembersCount}</td>
                    <td className="p-2 text-right font-mono text-rose-700">-{seg.removedMembersCount}</td>
                    <td className="p-2 text-right font-mono font-semibold">{seg.avgLtvFormatted}</td>
                    <td className="p-2 text-right font-mono">{seg.orderFrequency !== null ? `${seg.orderFrequency}x` : "—"}</td>
                    <td className="p-2 text-right font-mono font-bold text-emerald-700">{seg.retentionRatePct !== null ? `${seg.retentionRatePct}%` : "—"}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        seg.consentEligibility === 'Eligible'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {seg.consentEligibility !== null ? seg.consentEligibility : "Not configured"}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                        seg.riskLevel === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {seg.riskLevel !== null ? seg.riskLevel : "Unassigned"}
                      </span>
                    </td>
                    <td className="p-2 text-center font-mono font-semibold">{seg.overlapCount}</td>
                    <td className="p-2">
                      <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                        seg.conflictStatus === 'Conflict'
                          ? 'bg-rose-100 text-rose-700'
                          : seg.conflictStatus === 'Warning'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {seg.conflictStatus}
                      </span>
                    </td>
                    <td className="p-2 text-slate-500 font-mono text-[9.5px]">{seg.recalculationSchedule !== null ? seg.recalculationSchedule : "Not scheduled"}</td>
                    <td className="p-2 text-slate-500 font-mono text-[9.5px]">{seg.lastRecalculated !== null ? seg.lastRecalculated : "—"}</td>
                    <td className="p-2 text-slate-600">{seg.owner !== null ? seg.owner : "Unassigned"}</td>
                    <td className="p-2 font-mono text-slate-500">{seg.version !== null ? seg.version : "—"}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                        seg.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : seg.status === 'Draft'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {seg.status}
                      </span>
                    </td>
                    <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onActionClick("View", seg)}
                          className="p-1 text-slate-500 hover:text-ink hover:bg-slate-100 rounded"
                          title="View Details"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => onActionClick("Edit", seg)}
                          className="p-1 text-slate-500 hover:text-[#671021] hover:bg-slate-100 rounded"
                          title="Edit Rules"
                        >
                          <Edit2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-3.5 py-2 border-t border-line bg-slate-50/50 flex items-center justify-between text-[10.5px]">
        <span className="text-slate-500 font-mono">
          Showing {segments.length > 0 ? 1 : 0} to {segments.length} of {totalCount || segments.length} entries
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-1 border border-line rounded bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-2 font-mono font-bold text-ink">{currentPage}</span>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={segments.length < 25}
            className="p-1 border border-line rounded bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
