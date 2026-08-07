"use client";

import React, { useState } from "react";
import { CustomerSegment } from "@/types/customer-segments";
import { ChevronLeft, ChevronRight, Eye, Edit2, AlertCircle } from "lucide-react";

interface SegmentPortfolioTableProps {
  segments: CustomerSegment[];
  selectedSegmentId: string;
  onSelectSegment: (segment: CustomerSegment) => void;
  onActionClick: (action: string, segment: CustomerSegment) => void;
}

export function SegmentPortfolioTable({
  segments,
  selectedSegmentId,
  onSelectSegment,
  onActionClick,
}: SegmentPortfolioTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const toggleSelectAll = () => {
    if (selectedIds.length === segments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(segments.map((s) => s.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-white border border-line rounded-lg shadow-2xs mb-4 overflow-hidden">
      {/* Header Bar */}
      <div className="px-3.5 py-2.5 border-b border-line flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
            Customer Segment Portfolio
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            Showing 1 to {segments.length} of 128 segments
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
                  checked={selectedIds.length === segments.length && segments.length > 0}
                  onChange={toggleSelectAll}
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
            {segments.map((seg) => {
              const isSelectedRow = selectedSegmentId === seg.id;
              const isChecked = selectedIds.includes(seg.id);

              return (
                <tr
                  key={seg.id}
                  onClick={() => onSelectSegment(seg)}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    isSelectedRow ? "bg-rose-50/40" : ""
                  }`}
                >
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelectRow(seg.id)}
                      className="rounded border-slate-300"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-2 font-bold text-slate-800 underline decoration-dotted underline-offset-2">
                    {seg.name}
                  </td>

                  {/* ID */}
                  <td className="p-2 font-mono text-[9.5px] text-slate-500">{seg.code}</td>

                  {/* Type */}
                  <td className="p-2 font-medium">{seg.type}</td>

                  {/* Membership */}
                  <td className="p-2 text-slate-600">{seg.membershipType}</td>

                  {/* Scope */}
                  <td className="p-2 text-slate-600">{seg.customerScope}</td>

                  {/* Entry Rule */}
                  <td className="p-2 font-mono text-[9.5px] text-slate-600 truncate max-w-[160px]" title={seg.entryRuleSummary}>
                    {seg.entryRuleSummary}
                  </td>

                  {/* Exit Rule */}
                  <td className="p-2 font-mono text-[9.5px] text-slate-600 truncate max-w-[160px]" title={seg.exitRuleSummary}>
                    {seg.exitRuleSummary}
                  </td>

                  {/* Customers */}
                  <td className="p-2 text-right font-bold font-mono text-ink">
                    {seg.customerCount.toLocaleString()}
                  </td>

                  {/* New */}
                  <td className="p-2 text-right font-mono text-emerald-700 font-bold">
                    {seg.newMembersCount.toLocaleString()}
                  </td>

                  {/* Removed */}
                  <td className="p-2 text-right font-mono text-rose-700 font-bold">
                    {seg.removedMembersCount.toLocaleString()}
                  </td>

                  {/* Avg LTV */}
                  <td className="p-2 text-right font-mono text-slate-800 font-bold">
                    {seg.avgLtvFormatted}
                  </td>

                  {/* Order Freq */}
                  <td className="p-2 text-right font-mono">{seg.orderFrequency}</td>

                  {/* Retention */}
                  <td className="p-2 text-right font-mono font-bold text-slate-800">
                    {seg.retentionRatePct}%
                  </td>

                  {/* Consent */}
                  <td className="p-2 font-semibold text-emerald-700">{seg.consentEligibility}</td>

                  {/* Risk */}
                  <td className="p-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        seg.riskLevel === "Low"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : seg.riskLevel === "Medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {seg.riskLevel}
                    </span>
                  </td>

                  {/* Overlap */}
                  <td className="p-2 text-center font-mono font-bold text-slate-700">{seg.overlapCount}</td>

                  {/* Conflict */}
                  <td className="p-2">
                    <span
                      className={`text-[9.5px] font-bold ${
                        seg.conflictStatus === "None"
                          ? "text-slate-500"
                          : seg.conflictStatus === "Warning"
                          ? "text-amber-600"
                          : "text-rose-600"
                      }`}
                    >
                      {seg.conflictStatus}
                    </span>
                  </td>

                  {/* Schedule */}
                  <td className="p-2 text-slate-600 font-mono text-[9.5px]">{seg.recalculationSchedule}</td>

                  {/* Last Recalculated */}
                  <td className="p-2 text-slate-500 font-mono text-[9px]">{seg.lastRecalculated}</td>

                  {/* Owner */}
                  <td className="p-2 font-medium text-slate-700">{seg.owner}</td>

                  {/* Version */}
                  <td className="p-2 font-mono text-[9.5px] text-slate-500">{seg.version}</td>

                  {/* Status */}
                  <td className="p-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[9.5px]">
                      {seg.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onActionClick("edit", seg)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-[#671021] cursor-pointer"
                      title="Edit Segment"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-3.5 py-2 border-t border-line flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-slate-600 bg-slate-50/50">
        <div>
          Showing 1 to {segments.length} of 128 items
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1 border border-line rounded bg-white disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 py-0.5 bg-[#671021] text-white rounded font-bold text-[10px]">
            1
          </span>
          <button type="button" className="px-2 py-0.5 hover:bg-slate-100 rounded font-bold text-[10px]">
            2
          </button>
          <button type="button" className="px-2 py-0.5 hover:bg-slate-100 rounded font-bold text-[10px]">
            3
          </button>
          <span>...</span>
          <button type="button" className="px-2 py-0.5 hover:bg-slate-100 rounded font-bold text-[10px]">
            22
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1 border border-line rounded bg-white cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="px-2 py-0.5 bg-white border border-line rounded text-[10px] font-bold">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
