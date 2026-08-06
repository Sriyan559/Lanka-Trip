"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  AlertTriangle,
  Clock,
  ExternalLink,
  CheckCircle2,
  GitMerge,
  ShieldAlert,
} from "lucide-react";
import { CatalogueQualityIssue } from "@/types/catalogueQuality";

interface QualityIssuesTableProps {
  issues: CatalogueQualityIssue[];
  totalCount: number;
  selectedJobId: string;
  onSelectJob: (id: string) => void;
  selectedRowIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAllOnPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortColumn: keyof CatalogueQualityIssue;
  sortDirection: "asc" | "desc";
  onSort: (col: keyof CatalogueQualityIssue) => void;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onOpenCase: (issue: CatalogueQualityIssue) => void;
  onOpenCompareDuplicate: () => void;
  showToast: (msg: string) => void;
}

export function QualityIssuesTable({
  issues,
  totalCount,
  selectedJobId,
  onSelectJob,
  selectedRowIds,
  onSelectRow,
  onSelectAllOnPage,
  sortColumn,
  sortDirection,
  onSort,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onOpenCase,
  onOpenCompareDuplicate,
  showToast,
}: QualityIssuesTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const isAllOnPageSelected =
    issues.length > 0 && issues.every((item) => selectedRowIds.includes(item.id));

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-rose-100 text-rose-800 border-rose-200 font-bold";
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200 font-semibold";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 font-medium";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Merge Review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "In Review":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "In Progress":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Pending Review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Escalated":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "New":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-line rounded-lg shadow-sm mb-4 overflow-hidden">
      {/* Table Container with Controlled Horizontal Scroll */}
      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[1300px]">
          <thead>
            <tr className="bg-slate-50 border-b border-line text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllOnPageSelected}
                  onChange={onSelectAllOnPage}
                  className="rounded border-slate-300 text-[#671021] focus:ring-[#671021]"
                />
              </th>
              <th
                onClick={() => onSort("caseId")}
                className="py-2.5 px-2 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Case ID</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th
                onClick={() => onSort("issueType")}
                className="py-2.5 px-2 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Issue Type</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th className="py-2.5 px-2">Entity / Product</th>
              <th className="py-2.5 px-2">Public ID / SKU</th>
              <th className="py-2.5 px-2">Brand</th>
              <th className="py-2.5 px-2">Category</th>
              <th className="py-2.5 px-2">Channels</th>
              <th
                onClick={() => onSort("severity")}
                className="py-2.5 px-2 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Severity</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th className="py-2.5 px-2">Business Impact</th>
              <th className="py-2.5 px-2">Owner</th>
              <th className="py-2.5 px-2">SLA</th>
              <th
                onClick={() => onSort("status")}
                className="py-2.5 px-2 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Status</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th className="py-2.5 px-2">Updated At</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-[11px]">
            {issues.map((item) => {
              const isSelected = selectedRowIds.includes(item.id);
              const isFocused = selectedJobId === item.caseId;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectJob(item.caseId)}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    isFocused ? "bg-red-50/20" : ""
                  }`}
                >
                  <td className="py-2 px-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectRow(item.id)}
                      className="rounded border-slate-300 text-[#671021] focus:ring-[#671021]"
                    />
                  </td>

                  {/* Case ID */}
                  <td className="py-2 px-2 font-mono font-bold text-[#671021] whitespace-nowrap">
                    <button onClick={() => onOpenCase(item)} className="hover:underline">
                      {item.caseId}
                    </button>
                  </td>

                  {/* Issue Type */}
                  <td className="py-2 px-2 font-semibold text-slate-800 whitespace-nowrap">
                    {item.issueType}
                  </td>

                  {/* Entity / Product */}
                  <td className="py-2 px-2 font-bold text-slate-900 max-w-[160px] truncate" title={item.entityName}>
                    {item.entityName}
                  </td>

                  {/* Public ID / SKU */}
                  <td className="py-2 px-2 font-mono text-slate-500 text-[10px] whitespace-nowrap">
                    <span>{item.publicId}</span>
                    <span className="text-slate-300 mx-1">/</span>
                    <span className="font-bold text-slate-700">{item.sku}</span>
                  </td>

                  {/* Brand */}
                  <td className="py-2 px-2 text-slate-600 font-medium whitespace-nowrap">{item.brand}</td>

                  {/* Category */}
                  <td className="py-2 px-2 text-slate-600 font-medium whitespace-nowrap">{item.category}</td>

                  {/* Channels */}
                  <td className="py-2 px-2 text-slate-500 text-[10px] whitespace-nowrap">
                    {item.channels.join(", ")}
                  </td>

                  {/* Severity */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[9.5px] border ${getSeverityBadge(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </td>

                  {/* Business Impact */}
                  <td className="py-2 px-2 text-slate-600 whitespace-nowrap">{item.businessImpact}</td>

                  {/* Owner */}
                  <td className="py-2 px-2 font-medium text-slate-700 whitespace-nowrap">{item.owner}</td>

                  {/* SLA */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    {item.isSlaBreached ? (
                      <span className="flex items-center gap-1 font-mono font-bold text-rose-600 text-[10.5px]">
                        <Clock size={11} /> {item.sla} (Breached)
                      </span>
                    ) : (
                      <span className="font-mono text-slate-600 text-[10.5px]">{item.sla}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[9.5px] border ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Updated At */}
                  <td className="py-2 px-2 font-mono text-slate-500 text-[9.5px] whitespace-nowrap">
                    {item.updatedAt}
                  </td>

                  {/* Action */}
                  <td className="py-2 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 relative">
                      <button
                        onClick={() => onOpenCase(item)}
                        className="px-2.5 py-1 rounded bg-white border border-line text-[10.5px] font-bold text-[#671021] hover:bg-slate-50 shadow-xs"
                      >
                        Open Case
                      </button>

                      <button
                        onClick={() => setActiveMenuId((prev) => (prev === item.id ? null : item.id))}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {/* 3-Dot Row Menu */}
                      {activeMenuId === item.id && (
                        <div className="absolute right-0 top-7 w-44 bg-white rounded-md border border-line shadow-lg z-30 py-1 text-[11px] text-left">
                          <button
                            onClick={() => {
                              onOpenCase(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-slate-700"
                          >
                            Open Case Details
                          </button>

                          {item.issueType.includes("Duplicate") && (
                            <button
                              onClick={() => {
                                onOpenCompareDuplicate();
                                setActiveMenuId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-slate-700"
                            >
                              Compare Duplicate
                            </button>
                          )}

                          <button
                            onClick={() => {
                              showToast(`Assigned owner to ${item.caseId}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-slate-700"
                          >
                            Assign Owner
                          </button>

                          <button
                            onClick={() => {
                              showToast(`Escalated case ${item.caseId}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-rose-700"
                          >
                            Escalate Case
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 bg-slate-50 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <div className="text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">1</span> to{" "}
          <span className="font-bold text-slate-800">{issues.length}</span> of{" "}
          <span className="font-bold text-slate-800">{totalCount.toLocaleString()}</span> issues
        </div>

        <div className="flex items-center gap-2">
          {/* Pagination buttons */}
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-1 rounded border border-line bg-white hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3, 4, 5].map((pg) => (
              <button
                key={pg}
                onClick={() => onPageChange(pg)}
                className={`w-7 h-7 rounded text-[11px] font-bold ${
                  currentPage === pg
                    ? "bg-[#671021] text-white"
                    : "bg-white border border-line text-slate-700 hover:bg-slate-100"
                }`}
              >
                {pg}
              </button>
            ))}
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => onPageChange(208)}
              className="px-2 h-7 rounded border border-line bg-white text-slate-700 font-bold hover:bg-slate-100"
            >
              208
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="p-1 rounded border border-line bg-white hover:bg-slate-100"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Rows Per Page Selector */}
          <div className="flex items-center gap-1.5 ml-3">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="h-7 px-2 bg-white border border-line rounded text-[11px] font-bold text-slate-700 focus:outline-none"
            >
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
